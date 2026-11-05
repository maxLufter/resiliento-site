/**
 * IndexNow ping script.
 * Run after deploy to notify participating search engines of updated URLs.
 *
 * Usage:  node scripts/indexnow.mjs
 */

import { toolCatalog } from '../src/lib/tool-catalog.ts';

const KEY = "1a8a5d28fb9e40ba924b9c111dc8269f";
const HOST = "resiliento.app";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const URLS = [
  `https://${HOST}`,
  `https://${HOST}/waitlist`,
  `https://${HOST}/hybrid-training-engine`,
  `https://${HOST}/adaptive-training-planner`,
  `https://${HOST}/mobility-for-hybrid-athletes`,
  `https://${HOST}/hyrox`,
  `https://${HOST}/triathlon`,
  `https://${HOST}/running`,
  `https://${HOST}/tools`,
  ...toolCatalog.map(tool => `https://${HOST}/tools/${tool.slug}`),
  `https://${HOST}/guides/hyrox-world-triathlon`,
];

async function ping() {
  const keyResponse = await fetch(KEY_LOCATION, { signal: AbortSignal.timeout(30000) });
  if (!keyResponse.ok || (await keyResponse.text()).trim() !== KEY) {
    throw new Error('Public IndexNow verification file is missing or mismatched. No URLs submitted.');
  }
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: URLS,
  };

  for (const engine of [
    "https://api.indexnow.org/indexnow",
  ]) {
    try {
      const res = await fetch(engine, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(30000),
      });
      console.log(`${engine} → ${res.status} ${res.statusText}; ${URLS.length} URLs submitted. This is not confirmation of indexing.`);
      if (!res.ok) process.exitCode = 1;
    } catch (err) {
      console.error(`${engine} → ERROR: ${err.message}`);
      process.exitCode = 1;
    }
  }
}

ping().catch(error => { console.error(error.message); process.exitCode = 1; });
