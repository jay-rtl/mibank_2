# Intro timing update — local preview only

## Implemented

Removed the Skip intro button and its listener/styles. Normal-motion duration is now 3 seconds total: 2.2 seconds of entrance/reading time plus a 0.8-second exit. Entrance pacing was adjusted so the welcome text and tagline settle before exit. Escape, reduced-motion (900ms static welcome), direct-anchor bypass and no-JavaScript fallback remain.

Files: src/components/WelcomeIntro.astro, src/styles/welcome.css, scripts/welcome-intro-audit.mjs, scripts/client-concept-audit.mjs.

## Design review

The intro retains the borderless warm-white design and typography. There is no visible Skip control. Rendered desktop/tablet/mobile intro screenshots were refreshed by the test suite at 1440, 768 and 390px; no document overflow or axe violations were reported. No other layout was changed.

## Audit matrix

| Category | Status | Evidence / scope |
| --- | --- | --- |
| Functionality | PASS | Updated intro suite: 43/43 assertions. Automatic dismissal at 3 seconds, Escape, slideshow restart after intro, anchor bypass and no-JS paths passed. |
| SEO | PASS | Built homepage retains title and noindex/nofollow metadata; change only affects the decorative intro. |
| Responsive/Visual | PASS | Chrome emulation at 1440, 768 and 390px; no overflow. Screenshot capture confirms the control is removed. |
| Accessibility — intro | PASS | Axe scans at three widths reported zero violations; Escape and reduced-motion fallback passed. Not a full-site conformance claim. |
| Security/Privacy | NOT APPLICABLE | No data handling, dependencies, external services or permissions added by this intro change. |
| Performance | NOT TESTED | Lighthouse not rerun for this scoped change; duration verified through Playwright's clock. Earlier homepage scores refer to the previous intro duration. |
| Code/Regression | PASS | Production build generated 39 pages. Updated intro suite reported zero runtime errors and failed responses. Broader site suites were not rerun for this isolated edit. |

## Tests run

- ASTRO_TELEMETRY_DISABLED=1, DEPLOY_BASE=/, npm run build — successful, 39 pages.
- node scripts/welcome-intro-audit.mjs — Windows installed Chrome, Playwright headless; 43/43 checks passed, three axe scans with no violations, no captured page errors or failed responses.
- Built HTML inspection with Cheerio — 0 Skip buttons, 1 intro, expected homepage title and preview noindex/nofollow.
- Invoke-WebRequest http://127.0.0.1:4321/ -UseBasicParsing — HTTP 200.

## Outstanding items

No known outstanding issue in this intro edit. The earlier client-content, legacy media accessibility and cross-browser review items in CLIENT_CONCEPT_AUDIT.md remain. Physical devices and browser engines other than Chrome were not tested here.

## Launch readiness

READY FOR REVIEW. Changes are local only; nothing was pushed or deployed.

## Next action

Refresh http://127.0.0.1:4321/ to view the shorter intro.
