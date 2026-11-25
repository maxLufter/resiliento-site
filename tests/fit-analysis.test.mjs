import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { decodeFit } from '../src/lib/fit-decode.ts';
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
  assert.deepEqual(carry.count.sources,['Wrist estimate']);assert.equal(carry.countUnit,'steps');
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
