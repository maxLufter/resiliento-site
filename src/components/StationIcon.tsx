import { STATION_PATHS } from '@/lib/station-icons';
export function StationIcon({station,size=30,className=''}:{station:number;size?:number;className?:string}) {
  return <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
    {(STATION_PATHS[station]||STATION_PATHS[9]).map((d,i)=><path key={i} d={d}/>)}
  </svg>;
}
