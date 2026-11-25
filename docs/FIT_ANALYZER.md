# Browser FIT analyzer

Route: `/tools/fit-analyzer`. FIT decoding uses Garmin's official `@garmin/fitsdk` in a Web Worker. No activity API, credentials, persistence or workout telemetry is used. Website visit analytics remain enabled globally and receive no activity values. Maximum input size is 25 MiB; header, exact length, CRC, single-session grain and lap completeness are checked before normalization.

Developer descriptors are resolved by identity, native message, field ID/name and decoder key. Production/Beta identities are supported. Zero-ID sideload files require the Resiliento core schema and show an explicit notice. Unrelated files receive native FIT analytics without invented station results. LAP values are canonical; truncated SESSION text is not reverse-parsed. Targets stay separate from actuals, manual zero survives, source applicability follows the watch schema. Running pace follows the watch's 10s / 30m / 90–1800s/km checks and GPS-first/Target fallback.

Exports: original FIT bytes unchanged, complete normalized JSON, branded title and station description, 1080×1350 PNG with local preview. The PNG uses the existing Resiliento vector logo/wordmark and shared exercise pictograms. The background photograph and yellow accents match the watch interface. It excludes routes and HR traces. Large layouts show at most 10 station groups and explicitly count additional groups; full reports/text retain all. Estimates and partial coverage remain marked.

Strava is manual: edit an already synced activity or upload the original FIT at https://www.strava.com/upload/select, paste title/description, attach PNG. Users set Hybrid Racing in Strava. No direct upload or photo API is promised.

Validation: `npm test` includes native simulator FITs for nine station types, PM5, older schema/manual zero, CRC/length failures, identity mapping, pace bounds, partial observations, source semantics and changing carry loads. Build with `npm run build`. Browser QA covers actual worker decoding, all nine station cards, real previously exported FIT, live card preview and PNG download. Personal FITs and exported cards are never committed.
