// Shared 48-unit exercise pictograms for the report and exported canvas.
export const STATION_PATHS: Record<number,string[]> = {
  0:['M28 13a4 4 0 1 0 0-8a4 4 0 1 0 0 8','M24 17l-8 9 10 5 4 11M24 17l8 9 9 2M26 31l-10 8H7M16 26l-8-1'],
  1:['M22 14a4 4 0 1 0 0-8a4 4 0 1 0 0 8','M21 18l5 10-10 3-5 11M26 28l3 13M22 19l8-4 3-9M19 20l7-4 3-10','M39 6v33M33 42h13M40 30a5 5 0 1 0 0 10a5 5 0 1 0 0-10'],
  2:['M20 14a4 4 0 1 0 0-8a4 4 0 1 0 0 8','M17 19l8 7 9-5M17 19l-5 11-8 10M12 30l11 5 2 7','M35 16l3 25M30 42h16M37 26h7v13'],
  3:['M13 13a4 4 0 1 0 0-8a4 4 0 1 0 0 8','M13 18l-5 10 10 5v9M8 28L3 41M13 18l9 6 8-2','M30 22l9 13M38 27v13M31 42h15M38 33h7v7'],
  4:['M25 12a4 4 0 1 0 0-8a4 4 0 1 0 0 8','M23 17l-4 11 11 4 5 10M19 28l-9 4-2 10M23 17l-10-6-6-1M23 17l11-4 7-5','M4 45h8M36 45h8'],
  5:['M16 16a4 4 0 1 0 0-8a4 4 0 1 0 0 8','M19 21l-7 9 12 4 6-7 7 3M19 21l8 6 9-3','M5 40h39M12 34h9M39 28a6 6 0 1 0 0 12a6 6 0 1 0 0-12'],
  6:['M24 12a4 4 0 1 0 0-8a4 4 0 1 0 0 8','M24 17v14l-7 12M24 31l7 12M18 18l-4 12M30 18l4 12','M9 34h10v9H9zM11 34v-3a3 3 0 0 1 6 0v3M29 34h10v9H29zM31 34v-3a3 3 0 0 1 6 0v3'],
  7:['M27 12a4 4 0 1 0 0-8a4 4 0 1 0 0 8','M16 17h22v7H16zM25 24l-5 8 13 1 5 10M20 32l-7 10H4'],
  8:['M23 20a3 3 0 1 0 0-6a3 3 0 1 0 0 6','M24 10a4 4 0 1 0 0-8a4 4 0 1 0 0 8','M20 24l-6-8 7-6M26 24l7-8-6-6M22 24l-5 10 12 1 6 9M17 34l-5 9','M42 3v42'],
  9:['M6 18v12M11 14v20M37 14v20M42 18v12M11 24h26'],
  10:['M24 6a18 18 0 1 0 0 36a18 18 0 1 0 0-36','M24 14v12l8 5'],
  11:['M24 41L7 24C-3 9 14-1 24 12C34-1 51 9 41 24Z'],
};

export function drawStationIcon(c:CanvasRenderingContext2D,id:number,x:number,y:number,size:number,color:string) {
  c.save();c.translate(x,y);c.scale(size/48,size/48);c.strokeStyle=color;c.lineWidth=2.1;c.lineCap='round';c.lineJoin='round';
  for(const path of STATION_PATHS[id]||STATION_PATHS[9]) c.stroke(new Path2D(path));
  c.restore();
}
