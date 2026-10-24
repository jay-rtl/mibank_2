# MiBank client concept — new repository deployment

Target repository: https://github.com/jay-rtl/mibank_2
Target preview URL: https://jay-rtl.github.io/mibank_2/

The user explicitly authorized deployment to this new repository. The existing jay-rtl/mibank repository is excluded from all push and configuration operations. Its main branch was recorded before this deployment at 7f09adea695118d19b4d51b4b1575b5c8f20563c.

The concept includes the light/yellow design, edited hero, original routes/content, local search, automatic slideshow, GSAP scroll reveals, and the three-second welcome intro without a Skip button. Full implementation and content caveats are documented in CLIENT_CONCEPT_AUDIT.md and INTRO_UPDATE_AUDIT.md.

Pre-publish checks: npm run check passed with no diagnostics; npm run build generated 39 pages; DEPLOY_BASE=/mibank_2 node scripts/prepare-deploy.mjs and node scripts/deployment-audit.mjs passed all 39 generated pages with no broken/unprefixed local links, external resources or missing preview noindex directives. The workflow derives its base path from the repository name.

GitHub publication and live browser verification are pending at the point of this initial commit. Final results will be appended after GitHub Pages finishes. The informational redesign remains noindex and does not add real banking transactions.
