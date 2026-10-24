# MiBank client concept - GitHub Pages deployment

## Implemented

Published the current client concept to https://jay-rtl.github.io/mibank_2/ from the complete source at https://github.com/jay-rtl/mibank_2.

Deployed source commit: 7f9df1966dcc4f336d9d21fba2c3ec5a2c6ed67e.
Successful workflow: https://github.com/jay-rtl/mibank_2/actions/runs/39980512898 (rerun attempt 2).

The publication includes the light/yellow redesign, edited hero, original routes/content, local search, four-slide auto-slideshow, GSAP scrub reveals, and three-second intro without a Skip button. The workflow derives DEPLOY_BASE from the repository name. GitHub Pages uses Actions and HTTPS enforcement.

Source was copied into an isolated checkout under .deployment-tools/mibank_2 before committing and pushing. No push, Pages configuration or branch operation targeted jay-rtl/mibank. Its main commit remained 7f09adea695118d19b4d51b4b1575b5c8f20563c before and after deployment. The existing local origin remote still points to the original repository; the isolated checkout's origin is mibank_2.

The first workflow passed installation, type checks and build, then stopped at Pages configuration because Pages had not yet been enabled. Pages was enabled through the repository API; rerun attempt 2 passed build and deployment. No source workaround was needed.

## Design review

The live homepage was rendered and inspected in Chrome at 1440px and 390px. The supplied concept's typography, yellow accents, photographic composition, white navigation and responsive quick actions are present. Desktop/mobile runtime checks confirm no document overflow. Existing design/motion review and image provenance are documented in CLIENT_CONCEPT_AUDIT.md and source/concept-assets.json. The intro timing change is documented in INTRO_UPDATE_AUDIT.md.

## Audit matrix

| Category / scope | Status | Evidence / limitation |
| --- | --- | --- |
| Functionality - live preview | PASS | 79 live assertions passed. All 37 migrated routes returned HTTP 200; nested refresh, navigation, automatic slideshow, absent Skip control, site search base path, 49 news items/search/reset, map popup, original PDF download and four video playback checks passed. No captured runtime errors or failed responses. |
| SEO - preview deployment | PASS | All published migrated pages retained noindex and the concept body class. Local 39-page deployment audit found no unprefixed/broken resources or missing noindex. Preview robots disallow indexing and sitemap intentionally contains no production URLs. |
| SEO - production bank launch | NOT TESTED | Production canonical/indexability, social image, current business claims and search indexing are not approved for this independent preview. |
| Responsive/Visual - Chrome | PASS | Live desktop/mobile screenshots inspected at 1440 and 390px; no overflow in live checks. Earlier local concept checks also covered 900 and 768px. |
| Responsive/Visual - physical devices and other engines | NOT TESTED | No physical-device, Safari or Firefox testing performed. |
| Accessibility - tested live scope | PASS | Live media archive axe WCAG 2 A/AA, 2.1 AA and 2.2 AA scans at 1440 and 390px reported zero violations. Live motion checks passed; local reduced-motion, no-JS and keyboard/intro checks are in the earlier reports. Not a certification or full-site conformance claim. |
| Accessibility - legacy media | FAIL | Source video captions/transcripts remain unavailable; this predates the redesign. PDF accessibility and complete screen-reader flows were not verified. |
| Security/Privacy - publication scope | PASS | Pages API confirms HTTPS enforcement. No new credentials, trackers, storage or transaction backend added. Earlier production dependency scan reported 0 vulnerabilities; selected credential scan found no matches. No old-repository mutations performed. |
| Security/Privacy - broader assurance | NOT TESTED | No penetration test or professional legal/privacy approval. An HTTPS preview is not a security or legal certification. |
| Performance - live lab | PASS | Single Lighthouse mobile run, intro bypassed: 91/100; FCP 1.5s, LCP 2.0s, Speed Index 4.4s, TBT 280ms, CLS 0. |
| Performance - field and real devices | NOT TESTED | No field INP/Core Web Vitals or real-device frame rate measurement. Lab run used CPU/network simulation and overlapped other browser verification on this machine. |
| Code/Regression | PASS | Local Astro check: no diagnostics. Local build: 39 pages. Deployment-path audit: all 39 generated pages passed. GitHub Ubuntu/Node 24 installation, check, build and Pages publish passed. Live browser suite: 79/79 assertions. |

## Tests run

Local environment: Windows, Node 24.18.0, installed Google Chrome with Playwright; ASTRO_TELEMETRY_DISABLED=1. CI environment: GitHub-hosted ubuntu-latest, Node 24.

- npm run check - 0 errors, warnings or hints.
- DEPLOY_BASE=/mibank_2 npm run build - 39 pages generated successfully.
- DEPLOY_BASE=/mibank_2 node scripts/prepare-deploy.mjs - prefixed deployable links, assets and srcsets.
- DEPLOY_BASE=/mibank_2 node scripts/deployment-audit.mjs - 39 pages; no broken/unprefixed paths, original-domain links, external resources or missing noindex directives. Evidence: audit/deployment-static-results.json.
- node scripts/concept-deployment-audit.mjs https://jay-rtl.github.io/mibank_2 - 79/79 assertions; two axe scans with no violations; no captured runtime errors or failed responses. Evidence: audit/concept-deployed-results.json.
- node scripts/performance.mjs https://jay-rtl.github.io/mibank_2/#preview audit/concept-live-lighthouse-mobile.json - 91/100 simulated mobile; metrics above. Simulation: 412x823, 150ms RTT, 1638.4Kbps throughput, 4x CPU slowdown. No performance guarantee.
- Live Chrome screenshot captures at 1440x1000 and 390x844 - inspected homepage; local evidence in audit/screenshots/concept-live-1440.png and concept-live-390.png.
- GitHub API GET /repos/jay-rtl/mibank_2/pages - workflow Pages enabled, correct URL, https_enforced=true.
- GitHub API GET /repos/jay-rtl/mibank/git/ref/heads/main before/after - identical original commit.
- Local root build was restored with DEPLOY_BASE=/ after deployment preparation so http://127.0.0.1:4321/ remains available.

## Outstanding items

No known deployment-path defect remains. Existing content/production gaps remain: client approval of edited/generated imagery, current MiBank product terms/contact details/branch counts, source video captions/transcripts, four upstream-unavailable PDFs with explanatory fallbacks, document accessibility, broader device/browser/screen-reader testing, and professional review before any actual banking launch. See CLIENT_CONCEPT_AUDIT.md for details.

## Launch readiness

READY FOR REVIEW - the authorized independent informational preview is live. This is not a designation that it is ready for a production banking launch. No real transactions or application submission processing were introduced; preview noindex remains intentional.

## Next action

Share https://jay-rtl.github.io/mibank_2/ with the client for review. The original https://jay-rtl.github.io/mibank/ repository and site were not updated by this deployment.
