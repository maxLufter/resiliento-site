const MAX_FIT_BYTES = 25 * 1024 * 1024;
const EOCD_SIG = 0x06054b50;
const CD_SIG = 0x02014b50;
const LFH_SIG = 0x04034b50;

/** Extracts a single original .fit activity from a Garmin Connect ZIP in browser memory. */
export async function extractFitFromZip(buffer: ArrayBuffer): Promise<{ bytes: ArrayBuffer; name: string }> {
  if (buffer.byteLength > MAX_FIT_BYTES) throw new Error('Choose a ZIP archive smaller than 25 MB.');
  if (buffer.byteLength < 22) throw new Error('This file is too short to be a ZIP archive.');
  const bytes = new Uint8Array(buffer);
  const view = new DataView(buffer);
  const minOffset = Math.max(0, bytes.length - 65535 - 22);
  let eocdOffset = -1;
  for (let i = bytes.length - 22; i >= minOffset; i--) {
    if (view.getUint32(i, true) === EOCD_SIG && i + 22 + view.getUint16(i + 20, true) === bytes.length) {
      eocdOffset = i;
      break;
    }
  }
  if (eocdOffset < 0) throw new Error('The ZIP archive is incomplete or corrupted. Export the original activity again.');
  const entryCount = view.getUint16(eocdOffset + 10, true);
  const cdSize = view.getUint32(eocdOffset + 12, true);
  const cdOffset = view.getUint32(eocdOffset + 16, true);
  if (entryCount === 0xffff || cdSize === 0xffffffff || cdOffset === 0xffffffff) {
    throw new Error('ZIP64 archives are not supported. Unzip and open the .fit activity directly.');
  }
  if (cdOffset + cdSize > eocdOffset) throw new Error('The ZIP directory is invalid. Export the original activity again.');

  const decoder = new TextDecoder();
  const candidates: { name: string; method: number; flags: number; compSize: number; uncompSize: number; localOffset: number }[] = [];
  let cursor = cdOffset;
  for (let i = 0; i < entryCount; i++) {
    if (cursor + 46 > cdOffset + cdSize || view.getUint32(cursor, true) !== CD_SIG) {
      throw new Error('The ZIP archive could not be read. Export the original activity again.');
    }
    const flags = view.getUint16(cursor + 8, true);
    const method = view.getUint16(cursor + 10, true);
    const compSize = view.getUint32(cursor + 20, true);
    const uncompSize = view.getUint32(cursor + 24, true);
    const nameLen = view.getUint16(cursor + 28, true);
    const extraLen = view.getUint16(cursor + 30, true);
    const commentLen = view.getUint16(cursor + 32, true);
    const localOffset = view.getUint32(cursor + 42, true);
    const totalLen = 46 + nameLen + extraLen + commentLen;
    if (cursor + totalLen > cdOffset + cdSize) throw new Error('The ZIP archive is truncated.');
    const name = decoder.decode(bytes.subarray(cursor + 46, cursor + 46 + nameLen));
    cursor += totalLen;
    if (!name.endsWith('/') && !name.startsWith('__MACOSX/') && /\.fit$/i.test(name)) {
      candidates.push({ name, method, flags, compSize, uncompSize, localOffset });
    }
  }
  if (candidates.length === 0) throw new Error('No .fit activity found inside this ZIP archive.');
  if (candidates.length > 1) throw new Error('Choose a ZIP archive containing one .fit activity.');

  const entry = candidates[0];
  if ((entry.flags & 1) !== 0) throw new Error('Encrypted ZIP archives are not supported.');
  if (entry.uncompSize > MAX_FIT_BYTES || entry.compSize > MAX_FIT_BYTES) {
    throw new Error('Choose a FIT activity smaller than 25 MB.');
  }
  if (entry.localOffset + 30 > bytes.length || view.getUint32(entry.localOffset, true) !== LFH_SIG) {
    throw new Error('The ZIP entry header is invalid.');
  }
  const lfhNameLen = view.getUint16(entry.localOffset + 26, true);
  const lfhExtraLen = view.getUint16(entry.localOffset + 28, true);
  const dataStart = entry.localOffset + 30 + lfhNameLen + lfhExtraLen;
  if (dataStart + entry.compSize > bytes.length) throw new Error('The compressed FIT entry is incomplete.');
  const payload = bytes.slice(dataStart, dataStart + entry.compSize);
  const cleanName = entry.name.split('/').pop() || 'activity.fit';

  if (entry.method === 0) return { bytes: payload.buffer, name: cleanName };
  if (entry.method !== 8) throw new Error('Unsupported ZIP compression method. Unzip and open the .fit file directly.');
  if (typeof DecompressionStream !== 'function') {
    throw new Error('ZIP extraction is unavailable in this browser. Unzip and open the .fit file directly.');
  }

  const stream = new Blob([payload]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_FIT_BYTES) throw new Error('Extracted FIT activity exceeds the 25 MB size limit.');
      chunks.push(value);
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes('25 MB')) throw error;
    throw new Error('The compressed FIT data could not be extracted. Export the original activity again.');
  }
  const out = new Uint8Array(total);
  let pos = 0;
  for (const chunk of chunks) { out.set(chunk, pos); pos += chunk.byteLength; }
  return { bytes: out.buffer, name: cleanName };
}
