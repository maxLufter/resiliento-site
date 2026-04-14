/**
 * IndexNow ping script.
 * Run after deploy to notify Bing/Yandex of updated URLs.
 *
 * Usage:  node scripts/indexnow.mjs
 */

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
];

async function ping() {
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: URLS,
  };

  for (const engine of [
    "https://api.indexnow.org/indexnow",
    "https://yandex.com/indexnow",
  ]) {
    try {
      const res = await fetch(engine, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
      });
      console.log(`${engine} → ${res.status} ${res.statusText}`);
    } catch (err) {
      console.error(`${engine} → ERROR: ${err.message}`);
    }
  }
}

ping();
