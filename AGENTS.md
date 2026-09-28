# Personal Portfolio Website

## Project overview

Vanilla HTML/CSS/JS personal portfolio site for Albert Chang. Hosted on GitHub Pages. Target audience: recruiters and general visitors.

## File structure

```
/
├── index.html              ← Home + About (merged into one scrollable page)
├── education.html
├── experience.html
├── projects.html
├── projects/
│   └── project-one.html   ← Template; duplicate for each project
├── css/
│   ├── style.css           ← CSS variables, typography, reset, utilities, buttons
│   ├── layout.css          ← Navbar, responsive shell
│   └── components.css      ← Hero, about, timeline, project cards, contact icons
├── js/
│   ├── nav.js              ← Hamburger toggle, active link detection
│   └── transitions.js      ← Fade-in on load, fade-out on navigate
├── assets/
│   ├── images/             ← Photo, project screenshots
│   └── icons/
└── .Codex/
    └── launch.json         ← Dev server: python -m http.server 3000
```

## Design system

**Theme:** Light  
**Accent color:** `#182B49` (navy blue) — used for headings, buttons, tags, active nav underlines  
**Background:** `#f7f7f5`  
**Surface / cards:** `#ffffff`  
**Surface 2:** `#eeede9`  
**Text:** `#111111`  
**Text muted:** `#5a5a5a`  
**Font:** Inter (Google Fonts), fallback to system sans-serif  
**Border radius:** 10px on cards  
**All CSS values live in `:root` variables in `css/style.css`** — change the palette there, not inline.

## Navigation

- **Top navbar** (fixed): logo left, page links center, email + LinkedIn icons right
- No sidebar (removed by user preference)
- No Contact page (removed by user preference) — email and LinkedIn icons are persistent in the navbar on every page
- **Mobile** (<768px): hamburger menu, links hidden
- Active page detection is automatic via `js/nav.js` (matches `location.pathname` to link `href`)

## Pages

| Page | File | Notes |
|---|---|---|
| Home + About | `index.html` | Single scrollable page; hero → about section with `#about` anchor |
| Education | `education.html` | Timeline + supplementary cards for extracurriculars/honors |
| Experience | `experience.html` | Chronological timeline, most recent first |
| Projects | `projects.html` | Responsive card grid (3→2→1 col) |
| Project detail | `projects/project-one.html` | Template — duplicate and rename for each project |

`about.html` has been removed and consolidated into `index.html`.  
`contact.html` has been removed.

## Content placeholders (still need real data)

- `index.html`: tagline, bio paragraphs, interests list, photo (`assets/images/photo.jpg`)
- `education.html`: institution names, degrees, dates, descriptions, extracurricular/honor cards
- `experience.html`: company names, roles, dates, descriptions
- `projects.html` + `projects/*.html`: project names, images, descriptions, tags, GitHub/demo links
- All pages: LinkedIn URL (`yourhandle` → real handle), email already set to `albert.chang@vde.com`

## Dev server

```
python -m http.server 3000
```

Configured in `.Codex/launch.json` for the preview panel. Open `http://localhost:3000`.

## Key decisions

- No JS framework — plain HTML/CSS/JS only
- No contact form — icon links only (email + LinkedIn in navbar)
- Page transitions: fade out (180ms) on navigate, fade in on load via `js/transitions.js`
- Timeline component shared between Education and Experience pages for visual consistency
- Project cards link to individual detail pages under `projects/`

## Agent skills

### Issue tracker

Issues and specs are tracked as local Markdown under `.scratch/`. See `docs/agents/issue-tracker.md`.

### Triage labels

The repo uses the five default canonical triage labels. See `docs/agents/triage-labels.md`.

### Domain docs

This is a single-context repository. See `docs/agents/domain.md`.
