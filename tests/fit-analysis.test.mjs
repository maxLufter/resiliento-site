import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { decodeFit } from '../src/lib/fit-decode.ts';
import { extractFitFromZip } from '../src/lib/fit-zip.ts';
import { analyzeMessages, brandedTitle, paceFor, stravaDescription } from '../src/lib/fit-analysis.ts';

const fixture=name=>{
  const b=readFileSync(new URL(`./fixtures/${name}`,import.meta.url));
  return b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength);
};
// These are SDK-simulator files, never an athlete's personal activity.
test('native FIT: all nine performed station types survive the SESSION text budget',()=>{
  const a=decodeFit(fixture('resiliento-all-stations.fit'));
  assert.equal(a.recognized,true);assert.equal(a.splits.length,21);assert.equal(a.stations.length,9);
  assert.deepEqual(a.phases.map(p=>p.phase),[1,2,3,4,5]);
  assert.equal(a.stations.find(s=>s.station===6).distanceVolume,1200);
  assert.equal(a.stations.find(s=>s.station===8).count.value,12);
  assert.equal(a.stations.find(s=>s.station===2).count.coverage,0);
  assert.equal(a.stations.find(s=>s.station===8).metres.coverage,0);
  assert.equal(a.pace,null); // Deliberately short test laps must not imply an impossible pace.
  assert.ok(a.totalSeconds>a.workoutSeconds);
  for(const station of a.stations)assert.ok(stravaDescription(a).includes(station.name));
});
test('native FIT: PM5 measurements and legacy manual zero retain independent meaning',()=>{
  const quick=decodeFit(fixture('resiliento-quick.fit'));
  assert.equal(quick.title,'Resiliento - Run · Ski · Run');
  const ski=quick.stations[0];assert.equal(ski.metres.sources[0],'PM5');
  assert.equal(ski.countUnit,'strokes');assert.ok(ski.watts.length>0);assert.ok(ski.ergPaces.length>0);
  const legacy=decodeFit(fixture('resiliento-legacy-zero.fit'));
  const wb=legacy.stations.find(s=>s.station===8);
  assert.equal(wb.count.coverage,1);assert.equal(wb.count.value,0);
  assert.equal(wb.count.sources[0],'Manual');assert.equal(wb.metres.coverage,0);
});
test('invalid CRC, trailing bytes and incomplete FIT files are rejected',()=>{
  const bytes=new Uint8Array(fixture('resiliento-quick.fit'));
  assert.throws(()=>decodeFit(bytes.buffer.slice(0,-1)),/incomplete/);
  const appended=new Uint8Array(bytes.length+1);appended.set(bytes);
  assert.throws(()=>decodeFit(appended.buffer),/concatenated/);
  bytes[bytes.length-3]^=1;
  assert.throws(()=>decodeFit(bytes.buffer),/checksum/);
  assert.throws(()=>decodeFit(new ArrayBuffer(30)),/original/);
  assert.throws(()=>decodeFit(new ArrayBuffer(26*1024*1024)),/25 MB/);
});

function data(laps,descriptions={}) {
  const fields={0:'rh_segment_type',2:'rh_station_id',3:'rh_round_index',4:'rh_target_value',5:'rh_target_unit',6:'rh_run_distance_m',7:'rh_distance_source',10:'rh_target_weight_kg',15:'rh_station_source',16:'rh_station_distance_m',17:'rh_station_count',18:'rh_station_power_w',19:'rh_station_pace_500_s',20:'rh_station_count_source',27:'rh_stage_label'};
  const map=Object.fromEntries(Object.entries(fields).map(([n],i)=>[n,`${i+70}`]));
  return {sessionMesgs:[{numLaps:laps.length,totalTimerTime:laps.reduce((t,l)=>t+(l.seconds??60),0),totalDistance:999}],
    developerDataIdMesgs:[{developerDataIndex:0,applicationId:Buffer.from('5d680cdcea104211b25568aa60065d6e','hex')}],
    fieldDescriptionMesgs:Object.entries(fields).map(([n,name])=>({developerDataIndex:0,nativeMesgNum:19,fieldDefinitionNumber:+n,fieldName:name,key:+map[n],...descriptions})),
    lapMesgs:laps.map(l=>({totalTimerTime:l.seconds??60,avgHeartRate:l.hr,developerFields:Object.fromEntries(Object.entries(l.fields).map(([n,v])=>[map[n],v]))}))};
}
test('pace eligibility uses time and distance bounds before source selection and drift',()=>{
  assert.equal(paceFor(9,100),null);assert.equal(paceFor(10,29),null);assert.equal(paceFor(89,1000),null);
  assert.equal(paceFor(90,1000),90);assert.equal(paceFor(1800,1000),1800);assert.equal(paceFor(1801,1000),null);
  const runs=[{seconds:150,fields:{0:1,4:500,5:1}},{seconds:5,fields:{0:1,4:500,5:1}},{seconds:180,fields:{0:1,4:500,5:1}}];
  const a=analyzeMessages(data(runs));
  assert.deepEqual(a.pace,{seconds:330,source:'Target',coverage:2,total:3,drift:60});
  runs[0].fields[6]=400;runs[0].fields[7]=1;
  assert.deepEqual(analyzeMessages(data(runs)).pace,{seconds:375,source:'GPS',coverage:1,total:3,drift:null});
});
test('partial actuals, independent sources, changing carry loads and custom units',()=>{
  const a=analyzeMessages(data([
    {fields:{0:2,2:6,5:1,4:200,10:24,15:1,16:10,17:30,20:3}},
    {fields:{0:2,2:6,5:1,4:200,10:16,15:1,16:50}},
    {fields:{0:2,2:6,5:1,4:200,10:24}},
    {fields:{0:2,2:9,5:2,27:'Custom · 12 reps',15:1,17:0}},
    {fields:{0:2,2:9,5:1,27:'Custom · 20 m',15:1,16:15}},
  ]));
  const carry=a.stations[0];assert.equal(carry.metres.value,60);assert.equal(carry.metres.coverage,2);
  assert.equal(carry.distanceVolume,2080);assert.equal(carry.distanceVolumeCoverage,2);
  assert.equal(carry.count.coverage,0);assert.deepEqual(carry.count.sources,[]);assert.equal(carry.countUnit,'steps');
  assert.equal(carry.repVolumeCoverage,0);assert.equal(a.stations.length,3);
  assert.equal(a.stations[1].count.value,0);assert.equal(a.stations[1].count.coverage,1);
});
test('inapplicable station values and invalid sentinels never become results',()=>{
  const a=analyzeMessages(data([
    {fields:{0:2,2:8,5:2,4:100,15:1,16:50,17:65535,18:200,19:100}},
    {fields:{0:2,2:2,5:1,4:50,15:1,17:10,16:0,10:65535}},
    {fields:{0:1,5:1,4:500,6:4294967295,7:1}},
    {fields:{0:3,15:1,16:40,17:50,18:200}},
  ]));
  assert.equal(a.splits[0].metres,null);assert.equal(a.splits[0].count,null);assert.equal(a.splits[0].watts,null);
  assert.equal(a.splits[1].count,null);assert.equal(a.splits[1].metres.value,0);assert.equal(a.splits[1].weight,null);
  assert.equal(a.splits[2].runMetres,null);assert.equal(a.splits[3].metres,null);
});
test('unknown identities get generic data; decoder descriptor keys and associations are respected',()=>{
  const messages=data([{fields:{0:2,2:8,5:2,17:50,15:1}}]);
  messages.developerDataIdMesgs[0].applicationId=Buffer.alloc(16,7);
  const a=analyzeMessages(messages);assert.equal(a.recognized,false);assert.equal(a.stations.length,0);
  assert.equal(a.nativeMetres,999);assert.ok(a.warnings.length);
  assert.equal(analyzeMessages(data([{fields:{0:2,2:8,5:2}}],{nativeMesgNum:18})).recognized,false);
  assert.throws(()=>analyzeMessages({sessionMesgs:[{},{}]}),/one saved/);
  assert.throws(()=>analyzeMessages({sessionMesgs:[{numLaps:2}],lapMesgs:[{}]}),/incomplete lap/);
});
test('branding is idempotent and text export never presents prescriptions as actuals',()=>{
  assert.equal(brandedTitle('Run · Ski · Run'),'Resiliento - Run · Ski · Run');
  assert.equal(brandedTitle('Resiliento - Run · Ski · Run'),'Resiliento - Run · Ski · Run');
  const a=analyzeMessages(data([{fields:{0:2,2:2,4:50,5:1,10:152}}]));
  const description=stravaDescription(a);assert.ok(description.includes('prescribed load 152 kg'));
  assert.ok(!description.includes('50 m'));assert.ok(description.includes('actual result not recorded'));
});

test('retired wrist counts cannot enter laps, aggregates, rep volume or share text',()=>{
  const a=analyzeMessages(data([1,4,5,6,7,8].map(station=>({fields:{0:2,2:station,5:2,4:100,10:20,15:3,17:999,20:3}}))));
  assert.ok(a.splits.every(s=>s.count===null));
  assert.ok(a.stations.every(s=>s.count.coverage===0&&s.repVolume===0&&s.repVolumeCoverage===0));
  assert.ok(!stravaDescription(a).includes('999'));
  assert.ok(a.warnings.some(w=>w.includes('wrist counts')));
  const mixed=analyzeMessages(data([{fields:{0:2,2:7,5:1,4:50,10:20,15:1,16:25,17:999,20:3}}]));
  assert.equal(mixed.splits[0].metres.value,25);assert.equal(mixed.splits[0].count,null);
  assert.equal(mixed.stations[0].distanceVolume,500);assert.equal(mixed.stations[0].repVolume,0);
  const legacy=analyzeMessages(data([{fields:{0:2,2:8,5:2,15:3,17:118}}]));
  assert.equal(legacy.splits[0].count,null); // Source fallback in older FITs is filtered too.
});

test('dirty string buffers, weighted custom names, volume allowlists, record rh_phase and strict sources',()=>{
  const start=new Date('2026-11-25T10:00:00.000Z');
  const lapAt=(sec,fields,elapsed=sec+60,hr=150,maxHr=170)=>({
    startTime:new Date(start.getTime()+sec*1000),totalTimerTime:60,totalElapsedTime:elapsed-sec,
    avgHeartRate:hr,maxHeartRate:maxHr,fields
  });
  const fields={0:'rh_segment_type',2:'rh_station_id',3:'rh_round_index',4:'rh_target_value',5:'rh_target_unit',10:'rh_target_weight_kg',15:'rh_station_source',16:'rh_station_distance_m',17:'rh_station_count',20:'rh_station_count_source',27:'rh_stage_label'};
  const map=Object.fromEntries(Object.entries(fields).map(([n],i)=>[n,`${i+70}`]));
  const rawLaps=[
    {...lapAt(0,{0:5,3:0},60,120,25),startTime:start},
    lapAt(60,{0:2,2:9,5:2,10:24,15:1,17:20,20:1,27:['KB Swings / 24 kg','80 m']}),
    lapAt(120,{0:2,2:5,5:1,10:20,15:1,16:500,17:30,20:1}),
    lapAt(180,{0:1,4:1000,5:1}),
    lapAt(239,{0:2,2:4,5:2,10:15,15:1,16:80,17:25,20:1}),
    lapAt(299,{0:2,2:8,5:2,15:1,17:40,20:4}),
  ];
  const msg={
    developerDataIdMesgs:[
      {developerDataIndex:0,applicationId:Buffer.from('9a829a1003e94e8ebf293998e96ae04e','hex')},
      {developerDataIndex:1,applicationId:[null]},
    ],
    fieldDescriptionMesgs:[
      ...Object.entries(fields).map(([n,name])=>({developerDataIndex:0,nativeMesgNum:19,fieldDefinitionNumber:+n,fieldName:name,key:+map[n]})),
      {developerDataIndex:0,nativeMesgNum:18,fieldDefinitionNumber:28,fieldName:'rh_workout_name',key:101},
      {developerDataIndex:0,nativeMesgNum:18,fieldDefinitionNumber:29,fieldName:'rh_division',key:102},
      {developerDataIndex:0,nativeMesgNum:20,fieldDefinitionNumber:32,fieldName:'rh_phase',key:103},
    ],
    sessionMesgs:[{startTime:start,numLaps:rawLaps.length,totalTimerTime:360,totalElapsedTime:360,developerFields:{101:['Race\u0000old','stale'],102:'Men Open'}}],
    lapMesgs:rawLaps.map(l=>({...l,developerFields:Object.fromEntries(Object.entries(l.fields).map(([n,v])=>[map[n],v]))})),
    recordMesgs:[
      {timestamp:new Date(start.getTime()+65*1000),heartRate:155,developerFields:{103:3}},
      {timestamp:new Date(start.getTime()+238*1000),heartRate:171,developerFields:{}},
      {timestamp:new Date(start.getTime()+239*1000),heartRate:172,developerFields:{}},
    ],
  };
  const a=analyzeMessages(msg);
  assert.equal(a.recognized,true);
  assert.equal(a.title,'Resiliento - Race');
  assert.equal(a.division,'Men Open');
  assert.equal(a.splits[0].round,null);
  assert.equal(a.splits[0].maxHr,null);
  assert.equal(a.splits[1].name,'KB Swings');
  assert.equal(a.stations.find(s=>s.name==='KB Swings')?.repVolume,480);
  assert.equal(a.stations.find(s=>s.station===5)?.distanceVolume,0);
  assert.equal(a.stations.find(s=>s.station===4)?.distanceVolume,0);
  assert.equal(a.stations.find(s=>s.station===4)?.repVolume,0);
  assert.equal(a.splits[5].count,null); // Invalid countSource=4 must not inherit distance source=1.
  assert.equal(a.records[0].phase,3);
  assert.equal(a.records[1].phase,1);
  assert.equal(a.records[2].phase,2);
});

test('Store UUIDs and partial-lap rh_phase recovery work for Beta 7 buffer-limited FITs',()=>{
  const start=new Date('2026-11-26T05:24:54.000Z');
  const fields={0:'rh_segment_type',2:'rh_station_id',3:'rh_round_index',4:'rh_target_value',5:'rh_target_unit'};
  const map=Object.fromEntries(Object.entries(fields).map(([n],i)=>[n,`${i+70}`]));
  const msg={
    developerDataIdMesgs:[{developerDataIndex:0,applicationId:Buffer.from('8da17e8cd6274135b08b01cb04a32d95','hex')}],
    fieldDescriptionMesgs:[
      ...Object.entries(fields).map(([n,name])=>({developerDataIndex:0,nativeMesgNum:19,fieldDefinitionNumber:+n,fieldName:name,key:+map[n]})),
      {developerDataIndex:0,nativeMesgNum:18,fieldDefinitionNumber:28,fieldName:'rh_workout_name',key:101},
      {developerDataIndex:0,nativeMesgNum:20,fieldDefinitionNumber:32,fieldName:'rh_phase',key:103},
    ],
    sessionMesgs:[{startTime:start,numLaps:3,totalTimerTime:180,totalElapsedTime:180,developerFields:{101:'Free training'}}],
    lapMesgs:[
      {startTime:start,totalTimerTime:60,totalElapsedTime:60,avgHeartRate:127,developerFields:{}},
      {startTime:new Date(start.getTime()+60000),totalTimerTime:60,totalElapsedTime:60,avgHeartRate:150,developerFields:{}},
      {startTime:new Date(start.getTime()+120000),totalTimerTime:60,totalElapsedTime:60,avgHeartRate:155,developerFields:{[map[0]]:2,[map[2]]:8,[map[4]]:100,[map[5]]:2}},
    ],
    recordMesgs:[
      {timestamp:new Date(start.getTime()+10000),heartRate:127,developerFields:{103:5}},
      {timestamp:new Date(start.getTime()+70000),heartRate:150,developerFields:{103:1}},
      {timestamp:new Date(start.getTime()+130000),heartRate:155,developerFields:{103:2}},
    ],
  };
  const a=analyzeMessages(msg);
  assert.equal(a.recognized,true);
  assert.equal(a.splits[0].phase,5);assert.equal(a.splits[0].name,'Warmup');
  assert.equal(a.splits[1].phase,1);assert.equal(a.splits[1].name,'Run');
  assert.equal(a.splits[2].phase,2);assert.equal(a.splits[2].name,'Wall Balls');
  assert.ok(a.warnings.some(w=>w.includes('recovered from per-second records')));

  // Production Store UUID is also recognized.
  msg.developerDataIdMesgs[0].applicationId=Buffer.from('6a76f5948546411ea4c7fc59eef1606b','hex');
  assert.equal(analyzeMessages(msg).recognized,true);
});

import { deflateRawSync } from 'node:zlib';
function makeZip(entries) {
  const locals=[];const centrals=[];let offset=0;
  for(const e of entries){
    const name=Buffer.from(e.name,'utf8');
    const comp=e.deflate?deflateRawSync(e.data):e.data;
    const method=e.deflate?8:0;const flags=e.encrypted?1:0;
    const lfh=Buffer.alloc(30);
    lfh.writeUInt32LE(0x04034b50,0);lfh.writeUInt16LE(20,4);lfh.writeUInt16LE(flags,6);lfh.writeUInt16LE(method,8);
    lfh.writeUInt32LE(comp.length,18);lfh.writeUInt32LE(e.data.length,22);lfh.writeUInt16LE(name.length,26);
    locals.push(lfh,name,comp);
    const cd=Buffer.alloc(46);
    cd.writeUInt32LE(0x02014b50,0);cd.writeUInt16LE(20,4);cd.writeUInt16LE(20,6);cd.writeUInt16LE(flags,8);cd.writeUInt16LE(method,10);
    cd.writeUInt32LE(comp.length,20);cd.writeUInt32LE(e.data.length,24);cd.writeUInt16LE(name.length,28);cd.writeUInt32LE(offset,42);
    centrals.push(cd,name);
    offset+=lfh.length+name.length+comp.length;
  }
  const cdBuf=Buffer.concat(centrals);
  const eocd=Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50,0);eocd.writeUInt16LE(entries.length,8);eocd.writeUInt16LE(entries.length,10);
  eocd.writeUInt32LE(cdBuf.length,12);eocd.writeUInt32LE(offset,16);
  return Buffer.concat([...locals,cdBuf,eocd]);
}

test('extractFitFromZip extracts stored and deflated Garmin FIT exports and rejects malformed ZIPs',async ()=>{
  const quickBytes=readFileSync(new URL('./fixtures/resiliento-quick.fit',import.meta.url));
  for(const deflate of [false,true]){
    const zip=makeZip([{name:'12345_ACTIVITY.fit',data:quickBytes,deflate}]);
    const extracted=await extractFitFromZip(zip.buffer.slice(zip.byteOffset,zip.byteOffset+zip.byteLength));
    assert.equal(extracted.name,'12345_ACTIVITY.fit');
    assert.equal(decodeFit(extracted.bytes).recognized,true);
  }
  const emptyZip=makeZip([]);
  await assert.rejects(()=>extractFitFromZip(emptyZip.buffer.slice(emptyZip.byteOffset,emptyZip.byteOffset+emptyZip.byteLength)),/No \.fit/);
  const noFit=makeZip([{name:'notes.txt',data:Buffer.from('hi'),deflate:false}]);
  await assert.rejects(()=>extractFitFromZip(noFit.buffer.slice(noFit.byteOffset,noFit.byteOffset+noFit.byteLength)),/No \.fit/);
  const multiFit=makeZip([{name:'a.fit',data:quickBytes,deflate:false},{name:'b.fit',data:quickBytes,deflate:false}]);
  await assert.rejects(()=>extractFitFromZip(multiFit.buffer.slice(multiFit.byteOffset,multiFit.byteOffset+multiFit.byteLength)),/one \.fit/);
  const encZip=makeZip([{name:'a.fit',data:quickBytes,deflate:false,encrypted:true}]);
  await assert.rejects(()=>extractFitFromZip(encZip.buffer.slice(encZip.byteOffset,encZip.byteOffset+encZip.byteLength)),/Encrypted/);
});
