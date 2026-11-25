import { duration, type Analysis } from './fit-analysis';
import { drawStationIcon } from './station-icons';

const images=new Map<string,Promise<HTMLImageElement>>();
function asset(src:string) {
  if(!images.has(src)) images.set(src,new Promise((resolve,reject)=>{const image=new Image();image.onload=()=>resolve(image);image.onerror=()=>{images.delete(src);reject(new Error('Could not load the Resiliento logo. Reload and try again.'));};image.src=src;}));
  return images.get(src)!;
}

const INK='#0b0d10', WHITE='#f8f9fa', MUTED='#a6aab0', MINT='#ffed00';
const COLORS=['#68717e',MINT,WHITE,'#9ba4b1','#535d6c','#38bdf8'];

/** A fixed 4:5 composition for a social feed; detailed analytics stay in the report. */
export async function workoutCard(a: Analysis, title: string): Promise<Blob> {
  const [,mark,wordmark,background]=await Promise.all([document.fonts.ready,asset('/hybrid-tracker/resiliento-mark.svg'),asset('/hybrid-tracker/resiliento-wordmark.svg'),asset('/hybrid-tracker/watch-background.png').catch(()=>null)]);
  const canvas=document.createElement('canvas');canvas.width=1080;canvas.height=1350;
  const c=canvas.getContext('2d');if(!c)throw new Error('Image export is unavailable in this browser.');
  const styles=getComputedStyle(document.documentElement);
  const display=styles.getPropertyValue('--font-montserrat').trim()||'sans-serif';
  const body=styles.getPropertyValue('--font-inter').trim()||'sans-serif';
  const font=(size:number,weight=400,face=body)=>{c.font=`${weight} ${size}px ${face}`;};
  const text=(value:string,x:number,y:number,size=24,color=WHITE,weight=400,align:CanvasTextAlign='left')=>{font(size,weight);c.fillStyle=color;c.textAlign=align;c.fillText(value,x,y);c.textAlign='left';};
  const fit=(value:string,width:number,size:number,weight=600,face=body)=>{font(size,weight,face);if(c.measureText(value).width<=width)return value;while(value.length&&c.measureText(value+'…').width>width)value=value.slice(0,-1);return value+'…';};
  const rule=(x:number,y:number,w:number,color='#343941')=>{c.fillStyle=color;c.fillRect(x,y,w,1);};
  c.fillStyle=INK;c.fillRect(0,0,1080,1350);
  // Same sled-push photograph as the watch, cropped into the hero composition.
  c.save();c.beginPath();c.rect(0,0,1080,735);c.clip();
  if(background) c.drawImage(background,0,80,454,374,240,35,960,790);
  const shade=c.createLinearGradient(0,0,1080,0);shade.addColorStop(0,'rgba(11,13,16,1)');shade.addColorStop(.4,'rgba(11,13,16,.88)');shade.addColorStop(1,'rgba(11,13,16,.10)');c.fillStyle=shade;c.fillRect(0,0,1080,735);
  const fade=c.createLinearGradient(0,0,0,735);fade.addColorStop(0,'rgba(11,13,16,.66)');fade.addColorStop(.35,'rgba(11,13,16,0)');fade.addColorStop(.7,'rgba(11,13,16,.16)');fade.addColorStop(1,INK);c.fillStyle=fade;c.fillRect(0,0,1080,735);c.restore();
  c.drawImage(mark,64,53,58,58);c.drawImage(wordmark,140,62,330,41);
  text(a.recognized?'HYBRID WORKOUT':'WORKOUT REPORT',1016,90,18,MUTED,500,'right');
  rule(64,127,952);
  const name=title.replace(/^Resiliento\s*[-·:]\s*/i,'').trim()||'Hybrid workout';
  font(54,700,display);const words=name.split(/\s+/);const lines:string[]=[];let line='';
  for(const word of words){if(c.measureText((line+' '+word).trim()).width>952&&line){lines.push(line);line=word;}else line=(line+' '+word).trim();}if(line)lines.push(line);
  for(const [i,value] of lines.slice(0,2).entries()){
    font(54,700,display);c.fillStyle=WHITE;
    const truncated=fit(value,i===1&&lines.length>2?915:952,54,700,display);
    c.fillText(i===1&&lines.length>2&&!truncated.endsWith('…')?truncated+'…':truncated,64,211+i*66);
  }
  const hasWarmup=a.phases.some(p=>p.phase===5);
  text('WORKOUT TIME',68,326,20,MUTED,500);
  font(a.workoutSeconds>=3600?135:158,700,display);c.fillStyle=WHITE;c.fillText(duration(a.workoutSeconds),57,475,670);
  text(hasWarmup?'ACTIVE TIME · WARMUP EXCLUDED':'ACTIVE TIME',68,518,18,MUTED,500);
  const phases=a.phases.filter(p=>p.phase!==5);const seconds=phases.reduce((t,p)=>t+p.seconds,0);
  const centerX=871,centerY=416,radius=111;
  c.strokeStyle='#353b44';c.lineWidth=15;c.beginPath();c.arc(centerX,centerY,radius,0,Math.PI*2);c.stroke();
  let angle=-Math.PI/2;
  for(const phase of phases){if(!seconds||phase.seconds<=0)continue;const sweep=phase.seconds/seconds*Math.PI*2;c.strokeStyle=COLORS[phase.phase];c.lineWidth=15;c.beginPath();c.arc(centerX,centerY,radius,angle+.02,angle+Math.max(.02,sweep-.02));c.stroke();angle+=sweep;}
  text(String(a.splits.filter(s=>s.phase!==5).length),centerX,426,57,WHITE,600,'center');text('STAGES',centerX,459,17,MUTED,500,'center');
  rule(64,568,952);
  const run=phases.find(p=>p.phase===1);const station=phases.find(p=>p.phase===2);
  const metrics=[{label:'RUN',value:run?duration(run.seconds):'—',detail:run?`${run.laps} ${run.laps===1?'split':'splits'}`:''},
    {label:'STATIONS',value:station?duration(station.seconds):'—',detail:station?`${a.stations.length} ${a.stations.length===1?'exercise':'exercises'}`:''},
    a.pace?{label:'RUN PACE',value:duration(a.pace.seconds),detail:`/km · ${a.pace.source}`}:{label:'RUNS',value:String(run?.laps??0),detail:run?.laps===1?'recorded split':'recorded splits'},
    a.nativeHr?{label:'HEART RATE',value:String(a.nativeHr),detail:'bpm average'}:{label:'RECORDED',value:duration(a.totalSeconds),detail:hasWarmup?'including warmup':'total activity time'}];
  metrics.forEach((m,i)=>{const x=68+i*244;drawStationIcon(c,i===0?0:i===1?9:i===2?0:a.nativeHr?11:10,x,585,26,MINT);text(m.label,x+37,609,18,MUTED,500);text(m.value,x,662,42,i===2&&a.pace?MINT:WHITE,600);text(m.detail,x,697,19,MUTED);});
  text('THE SESSION',68,766,19,MUTED,500);
  const visible=a.splits.filter(s=>s.phase!==5);let x=68;const gap=visible.length>50?0:3;const barWidth=944-gap*Math.max(0,visible.length-1);
  visible.forEach(s=>{const width=seconds?barWidth*s.seconds/seconds:0;c.fillStyle=COLORS[s.phase];c.fillRect(x,790,width,22);x+=width+gap;});
  let legendX=68;
  for(const phase of phases){c.fillStyle=COLORS[phase.phase];c.fillRect(legendX,840,10,10);text(phase.name,legendX+20,852,20,MUTED);font(20);legendX+=c.measureText(phase.name).width+58;}
  const rows=a.stations.length?a.stations.map(s=>{
    const actual=[];
    if(s.metres.coverage)actual.push(`${s.metres.sources.some(v=>v.includes('estimate'))?'~':''}${s.metres.value} m`);
    if(s.count.coverage)actual.push(`${s.count.sources.some(v=>v.includes('estimate'))?'~':''}${s.count.value} ${s.countUnit}`);
    if(s.weights.length)actual.push(`${s.station===6?'2 × ':''}${s.weights[0]}${s.weights.length>1?'–'+s.weights.at(-1):''} kg`);
    return {station:s.station||9,name:s.name,time:duration(s.seconds),detail:actual.join(' · '),partial:(s.metres.coverage>0&&s.metres.coverage<s.laps)||(s.count.coverage>0&&s.count.coverage<s.laps)};
  }):visible.map(s=>({station:s.phase===1?0:10,name:s.phase===1?`Run ${visible.filter(v=>v.index<=s.index&&v.phase===1).length}`:`Split ${s.index}`,time:duration(s.seconds),detail:s.gpsPace?`${duration(s.gpsPace)}/km · GPS`:s.targetPace?`${duration(s.targetPace)}/km · Target`:'',partial:false}));
  const mainSplits=visible.filter(s=>s.phase===1||s.phase===2);
  const showSplits=mainSplits.length>0&&mainSplits.length<=4;
  const runCount=mainSplits.filter(m=>m.phase===1).length;
  let runIndex=0;
  const displayRows=showSplits?mainSplits.map(s=>({station:s.phase===1?0:(s.station||9),name:s.phase===1?(runCount>1?`Run ${++runIndex}`:'Run'):s.name,time:duration(s.seconds),detail:s.phase===1?(s.gpsPace!==null?`${duration(s.gpsPace)}/km · GPS`:s.targetPace!==null?`${duration(s.targetPace)}/km · Target`:''):[s.metres?`${s.metres.source.includes('estimate')?'~':''}${s.metres.value} m`:'',s.count?`${s.count.source.includes('estimate')?'~':''}${s.count.value} ${[1,5].includes(s.station)?'strokes':s.station===6?'steps':'reps'}`:'',s.weight!==null?`${s.station===6?'2 × ':''}${s.weight} kg`:''].filter(Boolean).join(' · '),partial:false})):rows;
  text(showSplits?'YOUR SPLITS':a.stations.length?'STATION BREAKDOWN':'SPLIT BREAKDOWN',68,919,19,MUTED,500);
  const shown=displayRows.slice(0,10);const fullRows=showSplits||displayRows.length<=4;const rowHeight=fullRows?76:61;const columnWidth=fullRows?944:450;
  shown.forEach((row,i)=>{const col=fullRows?0:i%2,y=(fullRows?971:964)+(fullRows?i:Math.floor(i/2))*rowHeight,x=68+col*494;
    drawStationIcon(c,row.station,x,y-(fullRows?29:24),fullRows?44:35,MINT);text(fit(row.name,fullRows?640:264,fullRows?30:24,500),x+54,y,fullRows?30:24,WHITE,500);text(row.time,x+columnWidth,y,fullRows?34:28,MINT,600,'right');
    if(row.detail)text(fit(row.detail+(row.partial?' *':''),columnWidth-54,21,400),x+54,y+(fullRows?27:23),21,MUTED);
  });
  rule(64,1262,952);
  text('resiliento.app',68,1305,21,WHITE,500);
  const notes:string[]=[];
  if(displayRows.length>10) notes.push(`+${displayRows.length-10} more in full report`);
  if(shown.some(r=>r.partial)) notes.push('* partial');
  if(shown.some(r=>r.detail.includes('~'))) notes.push('~ estimate');
  if(shown.some(r=>r.detail.includes('kg'))) notes.push('load prescribed');
  if(notes.length) text(fit(notes.join(' · '),760,17,400),1016,1305,17,MUTED,400,'right');
  return new Promise((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(new Error('Could not generate the image.')),'image/png'));
}
