# 03: Deliver the Experience Timeline and Education Journey

**What to build:** Complete the professional-history surfaces: a concise factual Experience Timeline on the homepage and a deeper Education Journey that connects academic decisions, leadership, service, and canonical academic Projects.

**Blocked by:** 01: Build the Eleventy foundation and first complete Project path.

**Status:** completed

- [x] Store Experience entries as structured data supporting a marker reference, company, role, location, start date, and end date or current-state label.
- [x] Render Experience most-recent-first and keep every entry present and readable before any JavaScript enhancement runs.
- [x] Use one consistent geometric placeholder marker and a stable slot that Albert can later populate with uploaded graphics.
- [x] Add a thin Carnegie Red timeline progression and subtle active-marker enhancement that follows natural scrolling without pinning, snapping, hiding, or hijacking content.
- [x] Disable nonessential timeline movement under reduced-motion preferences.
- [x] Keep Experience factual; do not add job-description bullets, role-to-role narrative, or a separate Experience page.
- [x] Replace the homepage Education placeholder with a concise preview and a clear path to the full Education Journey.
- [x] Provide a dedicated Education Journey with an introductory narrative area, easy-to-scan degree and institution facts, formative stages or decisions, leadership and service, selected academic Projects, and optional relevant honors or coursework.
- [x] Link academic work to canonical Project Pages rather than duplicating the Project narrative.
- [x] Use restrained Carnegie Red details for Carnegie Mellon context and restrained UC San Diego Navy details for UC San Diego context.
- [x] Use plain-text institution names without logos, seals, mascots, tartan, or recreated official graphics.
- [x] Ensure the Education Journey remains coherent when optional honors, coursework, leadership, or Project sections are absent.
- [x] Extend the public-site tests to cover timeline ordering and visibility, reduced-motion behavior, Education navigation, optional Education sections, and canonical academic Project links.

## Comments

- Completed on 2026-09-27. Verified with `npm run test:acceptance` (production build plus 10 Playwright browser tests; all passed), a deployment-aware `SITE_PATH_PREFIX=/portfolio/ npm run build`, and `git diff --check`. Final Standards and Spec re-reviews were clean after fixes. Implementation and review-fix commits: `f577d0a`, `9afdc94`, and `97e521c`.
