import { duration, PHASE_COLORS, type Analysis } from './fit-analysis';

export async function workoutCard(a: Analysis, title: string): Promise<Blob> {
  await document.fonts.ready;
  const shown=a.stations.slice(0,12);
  const canvas=document.createElement('canvas');
  canvas.width=1080; canvas.height=900+shown.length*105+(a.stations.length>12?60:0);
  const ctx=canvas.getContext('2d');
  if(!ctx) throw new Error('Image export is unavailable in this browser.');
  ctx.fillStyle='#050908';ctx.fillRect(0,0,canvas.width,canvas.height);
  const line=(value:string,x:number,y:number,size=28,color='#f8fafc',bold=false)=>{
    ctx.font=`${bold?700:400} ${size}px sans-serif`;ctx.fillStyle=color;ctx.fillText(value,x,y);
  };
  const fitText=(value:string,max:number,size:number)=>{
    ctx.font=`700 ${size}px sans-serif`;
    while(ctx.measureText(value).width>max && value.length>1) value=value.slice(0,-2)+'…';
    return value;
  };
  line('RESILIENTO',64,90,32,'#16edb9',true);
  line('HYBRID WORKOUT REPORT',64,133,20,'#94a3b8');
  line(fitText(title,950,44),64,220,44,'#f8fafc',true);
  line('WORKOUT TIME',64,300,22,'#94a3b8');
  line(duration(a.workoutSeconds),64,405,100,'#f8fafc',true);
  line('Warmup excluded · active time',68,450,24,'#94a3b8');
  if(a.pace) {
    line('RUN PACE',650,300,22,'#94a3b8');
    line(duration(a.pace.seconds)+'/km',650,370,48,'#16edb9',true);
    line(`${a.pace.source} · ${a.pace.coverage}/${a.pace.total} runs`,650,415,25,'#94a3b8');
  } else if(a.nativeHr) {
    line('AVERAGE HEART RATE',650,300,22,'#94a3b8');line(`${a.nativeHr} bpm`,650,370,48,'#16edb9',true);
  }
  let x=64;
  const total=a.phases.reduce((t,p)=>t+p.seconds,0);
  for(const p of a.phases) {const w=total?952*p.seconds/total:0;ctx.fillStyle=PHASE_COLORS[p.phase];ctx.fillRect(x,510,w,18);x+=w;}
  let y=585;
  for(const p of a.phases) {line(`${p.name}  ${duration(p.seconds)}`,64+(a.phases.indexOf(p)%3)*325,y,25,PHASE_COLORS[p.phase]);if(a.phases.indexOf(p)%3===2)y+=45;}
  y=720;
  line('STATIONS',64,y,23,'#94a3b8');y+=48;
  if(!shown.length) line('See the full report for your lap breakdown.',64,y,28);
  for(const s of shown) {
    ctx.fillStyle='#17211e';ctx.fillRect(64,y+37,952,1);
    line(fitText(s.name,550,30),64,y,30,'#f8fafc',true);line(duration(s.seconds),870,y,30,'#16edb9',true);
    const parts=[];
    if(s.metres.coverage) parts.push(`${s.metres.sources.some(x=>x.includes('estimate'))?'~':''}${s.metres.value} m (${s.metres.coverage}/${s.laps})`);
    if(s.count.coverage) parts.push(`${s.count.sources.some(x=>x.includes('estimate'))?'~':''}${s.count.value} ${s.countUnit} (${s.count.coverage}/${s.laps})`);
    if(s.weights.length) parts.push(`Load ${s.station===6?'2 × ':''}${s.weights.join('/')} kg`);
    line(fitText(parts.join(' · ')||'Actual result not recorded',940,23),64,y+32,23,'#94a3b8');y+=105;
  }
  if(a.stations.length>shown.length) line(`+${a.stations.length-shown.length} station groups in the full report`,64,y,24,'#94a3b8');
  line('Measured results only · ~ GPS/wrist estimate · load is prescribed',64,canvas.height-92,21,'#94a3b8');
  line('resiliento.app/tools/fit-analyzer',64,canvas.height-48,23,'#16edb9');
  return new Promise((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(new Error('Could not generate the image.')),'image/png'));
}
