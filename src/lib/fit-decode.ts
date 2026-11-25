import { Decoder, Stream } from '@garmin/fitsdk';
import { analyzeMessages, type Raw } from './fit-analysis.ts';

export const MAX_FIT_BYTES = 25 * 1024 * 1024;
export function decodeFit(buffer: ArrayBuffer) {
  if(buffer.byteLength>MAX_FIT_BYTES) throw new Error('Choose a FIT file smaller than 25 MB.');
  if(buffer.byteLength<14) throw new Error('This file is too short to be a FIT activity.');
  const bytes=new Uint8Array(buffer); const header=bytes[0];
  if(![12,14].includes(header) || String.fromCharCode(...bytes.slice(8,12))!=='.FIT') throw new Error('Choose an original .fit activity, not a ZIP or GPX file.');
  const size=new DataView(buffer).getUint32(4,true);
  if(buffer.byteLength!==header+size+2) throw new Error('The FIT file is incomplete or contains multiple concatenated files. Export the original activity again.');
  if(!new Decoder(Stream.fromArrayBuffer(buffer)).checkIntegrity()) throw new Error('The FIT checksum is invalid. Export the original activity again.');
  const {messages,errors}=new Decoder(Stream.fromArrayBuffer(buffer)).read({applyScaleAndOffset:true,expandSubFields:true,expandComponents:true,convertTypesToStrings:false,convertDateTimesToDates:true,mergeHeartRates:true,includeUnknownData:true});
  if(errors.length) throw new Error('The FIT activity could not be decoded. The original file has not been changed.');
  return analyzeMessages(messages as unknown as Raw);
}
