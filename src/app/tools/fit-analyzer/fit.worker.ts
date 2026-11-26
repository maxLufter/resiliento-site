import { decodeFit } from '@/lib/fit-decode';
import { extractFitFromZip } from '@/lib/fit-zip';

type WorkerRequest = ArrayBuffer | { buffer: ArrayBuffer; name?: string };

// File bytes never leave this worker. Nothing is posted to a server.
self.onmessage = async (event: MessageEvent<WorkerRequest>) => {
  try {
    const raw = event.data instanceof ArrayBuffer ? { buffer: event.data, name: 'activity.fit' } : event.data;
    const head = new Uint8Array(raw.buffer, 0, Math.min(4, raw.buffer.byteLength));
    const isZip = /\.zip$/i.test(raw.name || '') || (head[0] === 0x50 && head[1] === 0x4b && (head[2] === 0x03 || head[2] === 0x05));
    const extracted = isZip
      ? await extractFitFromZip(raw.buffer)
      : { bytes: raw.buffer, name: (raw.name || 'activity.fit').replace(/\.zip$/i, '.fit') };
    const analysis = decodeFit(extracted.bytes);
    self.postMessage({ analysis, fitBytes: extracted.bytes, fitName: extracted.name }, { transfer: [extracted.bytes] });
  } catch (error) {
    self.postMessage({ error: error instanceof Error ? error.message : 'Could not read this FIT file.' });
  }
};
