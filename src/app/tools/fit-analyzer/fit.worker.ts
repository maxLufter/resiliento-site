import { decodeFit } from '@/lib/fit-decode';

// File bytes never leave this worker. Nothing is posted to a server.
self.onmessage = (event: MessageEvent<ArrayBuffer>) => {
  try { self.postMessage({analysis:decodeFit(event.data)}); }
  catch(error) { self.postMessage({error:error instanceof Error?error.message:'Could not read this FIT file.'}); }
};
