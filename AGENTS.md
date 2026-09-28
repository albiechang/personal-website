# Albert Chang Professional Record

## Project overview

Eleventy-generated static portfolio for Albert Chang. The site is a durable Professional Record for Albert's future self first, recruiters second, and collaborators third. Projects are the primary evidence of his engineering practice and professional interests.

Read `CONTEXT.md` and relevant files in `docs/adr/` before changing domain language or architecture. Product work is specified and tracked under `.scratch/`; follow `docs/agents/issue-tracker.md`.

## Architecture

- Eleventy generates deployable HTML in `_site/`; never commit generated output.
- Project authoring lives in `src/projects/*.md`. Shared Project metadata drives Featured Projects, the Project Collection, and each Project Page.
- Nunjucks layouts live in `src/_layouts/`; reusable fragments live in `src/_includes/`.
- Site-wide structured data lives in `src/_data/`.
- Static CSS and images live in `src/assets/` and are copied through unchanged.
- `eleventy.config.js` owns collections, passthrough copies, and deploy-path configuration.
- `tests/acceptance/` exercises the generated production site through a real browser. Test public behavior, not template structure.

## Commands

```sh
npm install
npm run dev
npm run build
npm run test:acceptance
```

`npm run dev` starts Eleventy's development server. `npm run build` creates a clean production site in `_site/`. The acceptance command builds that production output, serves it locally, and runs Playwright against public routes.

To exercise a future GitHub Pages project-site prefix locally, set `SITE_PATH_PREFIX` before building. Do not invent a production URL or Git remote.

## Design system

- Light Color Mode only.
- Interaction accent: Carnegie Red `#C41230`, used sparingly.
- Canvas: warm near-white; primary surface: white; soft surface: UC San Diego Sand `#F5F0E6`.
- Main text: soft charcoal; muted text: CMU Iron Gray `#6D6E71`; borders: CMU Steel Gray `#E0E0E0`.
- UC San Diego Navy `#182B49` is a rare contextual accent.
- Main type: Source Sans 3. Technical labels, dates, and tags use restrained system monospace.
- Tokens are semantic custom properties in `src/assets/css/site.css`; do not hard-code palette values inside components.

## Content and interaction rules

- Use the glossary terms from `CONTEXT.md`, including Project, Featured Project, Project Collection, Project Page, and Professional Record.
- Keep placeholder content explicit and honest. Do not invent achievements, employers, collaborators, outcomes, or credentials.
- Keep Project Pages compositionally flexible. Shared layouts provide the global shell and essential metadata, not a required case-study outline.
- Project Cards are full semantic links with an always-visible title. Summaries appear on pointer hover and keyboard focus, and remain hidden on compact touch/mobile layouts.
- Keep email and LinkedIn controls accessible and outside primary navigation.
- Preserve semantic HTML, skip navigation, visible focus, touch-friendly targets, reflow, and reduced-motion support.
- Do not add analytics, a contact form, authentication, a CMS, university marks, or employer logos.

## Current placeholders

- The Brand Line, portrait, About narrative, Experience Timeline data, Education Journey details, and real Project content still need Albert's verified input.
- `src/_data/site.js` currently links the LinkedIn control to LinkedIn's home page until the final public profile URL is supplied.
- `src/projects/renewable-infrastructure-field-notes.md` is explicitly a demonstration Project and must not be presented as completed real work.
