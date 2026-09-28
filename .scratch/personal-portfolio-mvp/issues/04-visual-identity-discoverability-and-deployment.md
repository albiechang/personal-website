# 04: Finish the visual identity, discoverability, and deployment path

**What to build:** Connect the completed content with the subtle power-line Visual Motif, finish the soft cross-route visual treatment, and make the Professional Record discoverable and ready for GitHub Pages deployment without assuming a final repository or domain.

**Blocked by:** 02: Complete the Project system and Project Visualization support; 03: Deliver the Experience Timeline and Education Journey.

**Status:** completed

- [x] Implement one original lightweight abstract power line that appears to connect homepage sections in sequence.
- [x] Use thin neutral strokes, rounded geometry, sparse nodes, and rare Carnegie Red energized details without recreating university or utility-company artwork.
- [x] Keep the Visual Motif in margins and open space rather than behind readable content or controls.
- [x] Use shorter fragments of the Visual Motif on the Project Collection, Project Pages, and Education Journey.
- [x] Simplify the motif substantially on small screens and make it static under reduced-motion preferences.
- [x] Limit motion to subtle section activation, timeline progression, and hover/focus feedback; do not introduce page-transition spectacle or scroll hijacking.
- [x] Finish the soft editorial treatment across all routes using warm surfaces, thin borders, small radii, restrained shadows, clear hierarchy, and generous but not wasteful whitespace.
- [x] Verify that palette combinations used for text and controls meet contrast requirements and never use color as the only indication of state.
- [x] Generate unique page titles, descriptions, canonical URLs, social preview metadata, and sitemap entries for every public route.
- [x] Make internal URLs and assets aware of a configurable GitHub Pages base path.
- [x] Add production broken-link validation covering homepage anchors, Project routes, Education, external contact controls, canonical URLs, and generated sitemap entries.
- [x] Provide a GitHub Actions workflow that installs dependencies, runs required checks, builds the generated site, and publishes the output to GitHub Pages.
- [x] Keep generated output out of version control and avoid inventing a remote repository, account name, final production URL, or custom domain.
- [x] Verify the workflow and production build remain configurable for a future user site, project site, or custom-domain site.
- [x] Extend responsive screenshots and public-site checks to cover Visual Motif placement, deep-page fragments, metadata, deployment-aware links, and reduced-motion rendering.

## Comments

- Completed on 2026-09-27. Verified with `npm test` (clean production build, production broken-link validation, and 15 Playwright acceptance tests), deployment-aware builds and link validation for both `SITE_PATH_PREFIX=/portfolio/` and an empty prefix, `CHECK_EXTERNAL_LINKS=1 npm run check:links`, and `git diff --check`. Final Standards and Spec re-reviews were clean after all findings were fixed. Implementation and review-fix commits: `03d65be`, `e4e91ea`, and `260a8de`.
