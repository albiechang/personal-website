# 01: Build the Eleventy foundation and first complete Project path

**What to build:** Replace the legacy prototype with a fresh, versioned Eleventy Professional Record that already works end to end: a responsive global shell, an honest placeholder homepage, and one Markdown-authored Project discoverable as a Featured Project, in the Project Collection, and on its own flexible Project Page.

**Blocked by:** None (can start immediately).

**Status:** completed

- [x] Initialize local Git version control without inventing or creating a remote.
- [x] Preserve the glossary, ADRs, agent configuration, specification, and issue files while removing the old prototype rather than archiving it.
- [x] Establish npm-based development, production-build, and acceptance-test commands for an Eleventy static site.
- [x] Update repository instructions so they describe the new Eleventy project rather than the deleted prototype.
- [x] Render a responsive homepage shell containing the hero, clearly marked Brand Line and portrait placeholders, agreed professional-positioning sentence, Projects and Experience actions, About narrative placeholder, Education preview placeholder, and footer.
- [x] Provide a compact sticky navigation header using the Albert Chang text wordmark and clear Projects, Experience, Education, and About destinations.
- [x] Provide persistent, accessible email and LinkedIn controls outside the primary navigation, with safe placement on desktop and mobile.
- [x] Establish semantic light Color Mode tokens using the approved Carnegie Red, warm neutrals, UCSD Sand, CMU grays, and rare UCSD Navy.
- [x] Use Source Sans 3 for the main hierarchy and a restrained system monospace for dates, tags, and technical labels.
- [x] Author one honest demonstration Project in Markdown with the required title, summary, date, role, and tags.
- [x] Surface the same Project as a Featured Project, in the complete Project Collection, and on a clean Project Page without duplicating its metadata.
- [x] Make the Project Card a semantic link with representative media, an always-visible title, a desktop hover/keyboard-focus summary, and a concise touch/mobile presentation without repeated action text.
- [x] Give the Project Page a global shell, essential metadata, and clear navigation back to the Project Collection without imposing a universal case-study outline.
- [x] Establish the agreed production-site test seam by building, serving, and exercising representative public routes in a real browser.
- [x] Verify keyboard navigation, visible focus, skip navigation, responsive layout, and a clean production build.

## Comments

- Completed on 2026-09-27. Verified from a fresh dependency install with `npm ci`, then ran `npm run test:acceptance` (production build plus 3 Playwright browser tests; all passed). Standards and specification reviews passed after fixes. Implementation commit: `264d526`. No Git remote was created.
