# Personal Portfolio MVP

Status: ready-for-agent

## Problem Statement

Albert needs a durable Professional Record that documents his work and development for his future self while also helping recruiters and collaborators understand what he does. The current prototype is a placeholder-heavy collection of manually duplicated HTML pages with stale navigation, broken Project links, no reusable content model, no visualization boundary, and a visual identity that does not represent his focus on Community-Centered Engineering and renewable-energy project development.

The replacement must be easy to extend without making every Project Page a carbon copy. It must support rich and potentially interactive Project Visualization formats, tell the Education Journey with more depth than a resume, present professional experience as a concise factual timeline, and remain fast, accessible, understated, and maintainable on GitHub Pages.

## Solution

Replace the current prototype with a fresh Eleventy-generated static portfolio. Markdown and structured metadata will make Projects easy to add, shared layouts will provide a coherent site shell, and flexible page composition will let each Project use the narrative, media, and Project Visualization appropriate to the work.

The light visual system will be soft and editorial, using Carnegie Red as the primary accent, warm neutral surfaces influenced by UC San Diego, clear Source Sans 3 typography, and a lightweight abstract power-line Visual Motif that quietly connects sections. The homepage will prioritize Featured Projects and a high-level Experience Timeline, with deeper routes for the Project Collection, individual Project Pages, and the Education Journey.

The MVP will ship with honest placeholders for content and media that Albert intends to provide later. It will include a GitHub Pages build workflow, accessible interaction patterns, responsive behavior, rich-media safeguards, discoverability metadata, and a real-browser acceptance seam.

## User Stories

1. As Albert, I want a Professional Record that can evolve over time, so that I can document my professional direction beyond a static resume.
2. As Albert, I want the site to present Projects as the main evidence of my work, so that visitors understand what I have actually built, studied, and contributed.
3. As a recruiter, I want to understand Albert's professional focus quickly, so that I can decide whether his experience is relevant without searching through multiple pages.
4. As a recruiter, I want to see a high-level Experience Timeline, so that I can scan Albert's organizations, roles, locations, and dates efficiently.
5. As a collaborator, I want to explore Albert's public Projects, so that I can understand his interests, methods, and potential areas of collaboration.
6. As a visitor, I want a concise first-person introduction, so that I can understand who Albert is without reading promotional copy.
7. As a visitor, I want Albert's positioning to explain Community-Centered Engineering and renewable-energy development, so that the portfolio has a clear professional point of view.
8. As a visitor, I want Projects to appear immediately after the hero, so that evidence follows Albert's positioning.
9. As a visitor, I want a sticky but quiet navigation header, so that I can move between Projects, Experience, Education, and About without losing my place.
10. As a visitor, I want persistent email and LinkedIn controls outside the main navigation, so that I can contact Albert from any part of the site.
11. As a keyboard user, I want the contact controls to have visible focus states and accessible labels, so that I can use them without a pointer.
12. As a mobile visitor, I want contact controls to remain reachable without covering content or device controls, so that persistent access does not obstruct the site.
13. As a visitor, I want the homepage to show a curated set of Featured Projects, so that Albert can emphasize the work most representative of his current direction.
14. As a visitor, I want one clear link from Featured Projects to the full Project Collection, so that individual cards are not cluttered with repeated calls to action.
15. As a visitor, I want the complete Project Collection in a clean, uniform grid, so that varied work remains easy to browse.
16. As a desktop visitor, I want a Project Card summary to appear on hover, so that I can learn more before opening the Project.
17. As a keyboard user, I want the same Project Card summary available on focus, so that hover is not the only discovery mechanism.
18. As a touch visitor, I want Project Cards to remain concise with representative media and a title, so that the grid stays readable without hover-dependent text.
19. As a visitor, I want subtle card feedback, so that clickable Projects are recognizable without dramatic motion.
20. As a visitor, I want Project Cards to use a consistent image ratio, so that the Project Collection remains orderly.
21. As Albert, I want to control each Project image's focal point, so that uniform crops do not hide the important subject.
22. As Albert, I want to add a Project by creating one Markdown entry and its assets, so that I do not have to duplicate layouts or edit several indexes.
23. As Albert, I want structured Project metadata, so that cards, routes, dates, roles, tags, and links remain consistent.
24. As Albert, I want a Project Page to require only essential identifying information, so that Projects with different kinds of evidence are not forced into the same narrative.
25. As Albert, I want each Project Page to compose text, imagery, video, diagrams, galleries, and interactive material flexibly, so that the design follows the Project.
26. As Albert, I want the option to give a Project a custom composition, so that unusual work is not constrained by standard content blocks.
27. As a visitor, I want every Project Page to provide a clear route back to the Project Collection, so that exploration never becomes a dead end.
28. As a visitor, I want ongoing Projects labeled clearly, so that partial work is not mistaken for a finished result.
29. As Albert, I want older Projects retained in the Project Collection after they stop being Featured Projects, so that the site remains a durable record.
30. As Albert, I want every Project to be public, so that the portfolio does not require authentication or confidential-data handling.
31. As Albert, I want a Project to optionally attach a self-contained Project Visualization, so that CAD, modeling, and other engineering work can be explained in the most suitable medium.
32. As a visitor, I want Project Visualization code and data to load only when needed, so that unrelated pages remain fast.
33. As a visitor, I want a useful static or textual alternative to every Project Visualization, so that the Project remains understandable without scripts or advanced graphics.
34. As a visitor on a slow connection, I want large media to load on demand, so that the page becomes usable before optional content arrives.
35. As a visitor, I want videos to avoid sound autoplay, so that opening a Project does not create an intrusive experience.
36. As a visitor who cannot consume a video directly, I want captions or a transcript, so that the information remains available.
37. As a visitor, I want the Experience Timeline ordered most-recent-first, so that current work is easiest to find.
38. As a visitor, I want Experience Timeline entries to show a uniform marker, company, role, location, and dates, so that the section stays factual and scannable.
39. As Albert, I want to replace neutral timeline markers with uploaded graphics later, so that the layout does not need to change when final assets arrive.
40. As a visitor, I want all Experience Timeline entries visible without deliberate hiding or scroll hijacking, so that animation never controls access to information.
41. As a visitor, I want the timeline line to progress subtly with scrolling, so that chronology is reinforced without becoming a spectacle.
42. As a visitor, I want an Education preview on the homepage, so that Albert's academic path is visible without dominating the initial experience.
43. As a visitor, I want a dedicated Education Journey page, so that formative decisions, leadership, service, and academic work have enough room.
44. As a visitor, I want degree and institution facts to remain easy to scan, so that narrative depth does not obscure qualifications.
45. As a visitor, I want Education content to link to canonical Project Pages rather than duplicate them, so that academic Projects have one authoritative home.
46. As a visitor, I want honors and coursework shown only when relevant, so that the Education Journey emphasizes meaningful evidence.
47. As a visitor, I want subtle Carnegie Mellon and UC San Diego color cues in Education, so that Albert's background influences the design without implying institutional sponsorship.
48. As Albert, I want no university logos, seals, mascots, or recreated official graphics, so that the portfolio remains personal and avoids misuse of institutional marks.
49. As a visitor, I want About to read as one connected first-person narrative, so that values, objectives, and career interests feel human rather than corporate.
50. As Albert, I want room for a future Brand Line, so that the MVP can ship before final personal-brand language is written.
51. As a visitor, I want a small portrait rather than an oversized hero image, so that Albert feels present without displacing the work.
52. As Albert, I want a neutral portrait placeholder now, so that a real photograph can be added later without redesigning the hero.
53. As a visitor, I want one lightweight power-line Visual Motif to connect homepage sections, so that distinct ideas feel related.
54. As a visitor, I want the Visual Motif kept away from text and important controls, so that it remains secondary to content.
55. As a mobile visitor, I want a simplified version of the Visual Motif, so that the idea survives without crowding the smaller layout.
56. As a visitor who prefers reduced motion, I want the timeline, Visual Motif, and card effects to become static, so that the site respects my system preference.
57. As a visitor, I want a soft light Color Mode with warm neutral surfaces, so that the portfolio feels welcoming rather than industrial.
58. As a visitor, I want Carnegie Red used sparingly for active states and emphasis, so that it feels energized without dominating the page.
59. As a visitor, I want clear typographic hierarchy using Source Sans 3, so that long and short content is easy to scan.
60. As a visitor, I want restrained monospaced details for dates, tags, and technical labels, so that the site gains technical character without resembling a terminal.
61. As a visitor, I want editorial whitespace with Projects reserved for card treatment, so that the site does not become a wall of boxed content.
62. As a mobile visitor, I want the Project Collection to use one column, so that cards remain legible.
63. As a tablet visitor, I want the Project Collection to use two columns, so that it uses available space without becoming cramped.
64. As a wide-screen visitor, I want the Project Collection to use three columns, so that browsing remains efficient.
65. As a visitor, I want the footer to contain Albert's name, Brand Line placeholder, contact links, and a restrained copyright line, so that each page ends with a consistent identity.
66. As a visitor, I want no contact form, so that the site offers direct contact without unnecessary data collection.
67. As a privacy-conscious visitor, I want no analytics in the MVP, so that browsing is not tracked without a defined purpose.
68. As a search visitor, I want meaningful page titles and descriptions, so that search results explain each page accurately.
69. As a visitor sharing a link, I want suitable social preview metadata, so that the shared page has useful context.
70. As a crawler or visitor, I want canonical URLs and a sitemap, so that the static site is discoverable and avoids duplicate URL ambiguity.
71. As a visitor, I want internal links to remain valid after deployment to GitHub Pages, so that repository or custom-domain routing does not break navigation.
72. As Albert, I want the site generated by Eleventy, so that Markdown content and shared layouts produce static HTML with minimal client JavaScript.
73. As Albert, I want GitHub Actions to build and publish the site, so that generated output does not need to be committed manually.
74. As Albert, I want the local project initialized as a Git repository without inventing a remote, so that the implementation can be versioned before the eventual GitHub repository is known.
75. As an implementer, I want honest structural placeholders, so that the MVP demonstrates layout states without fabricating Albert's accomplishments.
76. As an implementer, I want representative placeholder Projects with varied titles, media, statuses, and visualization states, so that the framework is exercised before real content arrives.
77. As Albert, I want the old prototype removed rather than archived, so that the new repository contains one authoritative site.
78. As Albert, I want the existing glossary, ADR, tracker configuration, and new specification preserved, so that deleting the prototype does not erase the decisions guiding the rebuild.
79. As an implementer, I want one production-site acceptance seam, so that tests verify public behavior instead of template internals.
80. As Albert, I want the first release to be complete and responsive before final content polish, so that later work can focus on substance rather than rebuilding the foundation.

## Implementation Decisions

- Replace the old prototype completely. Remove the old standalone pages, duplicated project template, old CSS, old JavaScript, obsolete launch configuration, and stale prototype-specific instructions once the new structure is established. Preserve the domain glossary, ADRs, agent configuration, tracker files, and this specification.
- Initialize the folder as a Git repository during implementation. Do not invent or create a remote repository; that remains pending Albert's GitHub account and repository name.
- Use Eleventy for static-site generation in accordance with ADR 0001. The output is static HTML, CSS, assets, and narrowly scoped browser JavaScript.
- Use npm for the build workflow and expose clear development, production-build, and acceptance-test commands.
- Generate deployment output rather than committing it. Provide a GitHub Pages workflow that builds and publishes the generated site.
- Keep GitHub Pages base-path handling configurable so the site can later support a user site, project site, or custom domain without rewriting internal links.
- Use Markdown with frontmatter as the authoring interface for Projects.
- A Project supports title, short summary, date or date range, role, tags, representative media, featured state, project status, collaborators, external links, focal-point metadata, and an optional Project Visualization identifier.
- Title, summary, date or date range, role, and tags are the minimum Project metadata required for a valid Project Page. Other fields remain optional where their absence is meaningful.
- Generate Featured Projects from the same Project collection as the complete Project Collection. Featured status is editorial emphasis rather than a separate content type.
- Curate Featured Projects manually. Order the complete Project Collection newest-first.
- Keep Project Page composition flexible. Provide reusable primitives for prose, figures, galleries, video, diagrams, data presentations, and Project Visualizations, but do not require one universal sequence.
- Permit a Project to opt into a custom page composition while retaining the global shell, essential metadata, and navigation back to the Project Collection.
- Give each Project Visualization an isolated boundary containing its own script, style, data, mount point, and fallback content.
- Load Project Visualization assets only on the relevant Project Page and defer expensive initialization until the visualization approaches the viewport.
- Prefer browser-native ES modules, SVG, Canvas, and video. Permit project-local third-party libraries when the Project justifies them; do not promote them to global dependencies by default.
- Ensure meaningful Project content remains present when JavaScript is unavailable or a visualization fails.
- Use structured site data for the Experience Timeline. Each entry supports a marker reference, company, role, location, start date, and end date or current-state label.
- Keep Experience factual. Do not add a career-arc narrative, role-to-role transition copy, job-description bullets, or separate Experience page in the MVP.
- Order Experience most-recent-first. Render every entry in the document from the start; scrolling may enhance the timeline line and active marker but must not reveal or gate the content.
- Provide one uniform geometric timeline marker initially and a stable marker slot for Albert's future graphics.
- Use a dedicated Education Journey route in addition to the homepage preview.
- Structure Education around a short journey introduction, easy-to-scan institution and degree facts, formative stages or decisions, leadership and service, selected academic Projects, and optional relevant honors or coursework.
- Link academic work to canonical Project Pages instead of duplicating Project narratives in Education.
- Use plain-text institution names. Do not use university logos, seals, mascots, tartan, or recreated institutional design assets.
- Use small Carnegie Red details for Carnegie Mellon context and small UC San Diego Navy details for UC San Diego context.
- Use a homepage route containing, in order: hero, Featured Projects, Experience Timeline, About, Education preview, and footer.
- Use a separate Project Collection route, individual clean Project routes, and a dedicated Education route. Homepage navigation uses anchors for its sections and full routes for deeper pages.
- Use a compact sticky navigation header with the Albert Chang text wordmark and clear Projects, Experience, Education, and About destinations.
- Keep persistent email and LinkedIn controls outside the primary navigation. Present them as a compact, card-like contact rail near the lower-right edge on larger screens and as a safe-area-aware compact pair on mobile.
- Give contact controls accessible names and visible hover/focus treatment. Email uses a mail action and LinkedIn uses the final profile URL once supplied.
- Use one section-level “View all projects” action on the homepage and a short collection-level invitation on the Project Collection page. Do not repeat “View project” on every Project Card.
- Use a uniform Project Card grid: three columns at wide widths, two at medium widths, and one on mobile.
- Use a consistent approximately 4:3 representative-media area with configurable focal position.
- Always overlay the Project title on the representative media.
- On hover and keyboard focus, reveal the short Project summary with a subtle border, image-scale, or related state change.
- On touch/mobile layouts, do not show the Project summary or a repeated per-card action label. The image, title, and subtle interactive treatment must provide the concise card presentation.
- Make the full Project Card a semantic link with a clear accessible name.
- Use a small portrait placeholder in the hero. The eventual portrait remains visually subordinate to the positioning and Projects.
- Include a clearly marked Brand Line placeholder and the agreed positioning sentence: “A community-centered engineer developing renewable-energy projects that turn climate goals into practical infrastructure.”
- Use first-person, concise, reflective writing in placeholder structures and future content. Avoid resume fragments, fabricated claims, and marketing superlatives.
- Use one connected About narrative for values, objectives, career interests, and limited personal context rather than a grid of value cards.
- Use a footer containing Albert's name, Brand Line placeholder, email and LinkedIn links, and a restrained copyright line. Do not add a newsletter, contact form, or full duplicate navigation.
- Use semantic color tokens from the start so a future dark Color Mode can be added without rewriting components, but ship only the light Color Mode.
- The light palette uses Carnegie Red #C41230 as the primary interaction accent, a warm near-white canvas, white primary surfaces, UC San Diego Sand #F5F0E6 as the soft surface, soft charcoal main text, CMU Iron Gray #6D6E71 for muted text, CMU Steel Gray #E0E0E0 for borders, and UC San Diego Navy #182B49 as a rare contextual accent.
- Verify that every token pairing used for text and interactive controls has sufficient contrast. Color must not be the only indication of state.
- Use Source Sans 3 for headings and body copy. Create hierarchy through size, weight, spacing, and measure rather than adding multiple decorative typefaces.
- Use a quiet system monospace for dates, tags, measurements, and technical labels.
- Keep the layout editorial, warm, and spacious without using a full-viewport empty hero.
- Reserve card treatment for Projects and genuinely self-contained controls. Use small radii, thin borders, soft surfaces, and little or no resting shadow.
- Use #C41230 primarily for active lines, focus states, links, small labels, selected emphasis, and energized points. Avoid large red background fields in the MVP.
- Implement the Visual Motif as one original lightweight abstract power line that appears to connect homepage sections in sequence.
- Draw the Visual Motif with thin neutral lines, rounded geometry, sparse nodes, and rare red energized details. Keep it in margins and open space, never behind readable content or controls.
- Use shorter fragments of the same Visual Motif on deeper pages.
- Simplify the Visual Motif significantly on small screens and make it static under reduced-motion preferences.
- Use restrained, purposeful motion only: timeline progress, brief Visual Motif activation at section changes, and hover/focus feedback.
- Do not hijack, pin, snap, or lock the visitor's scroll. Do not intentionally hide timeline items.
- Use progressive enhancement so navigation, content, Project Cards, the Experience Timeline, and Project Page fallbacks remain useful without JavaScript.
- Use honest neutral line-art or geometric placeholders for missing portraits, Project media, and timeline graphics. Do not fabricate employer logos, university marks, outcomes, or project imagery.
- Videos do not autoplay with sound. They support a poster image and captions or a transcript.
- Project Visualizations include a descriptive heading or summary, direct labeling where appropriate, keyboard-operable controls, and a useful textual or static fallback. Hover is supplementary rather than the sole information channel.
- Include semantic HTML, skip navigation, logical heading order, descriptive links, alt-text support, visible focus treatment, touch-friendly targets, reduced-motion support, and layouts that tolerate zoom and reflow.
- Generate unique page titles, descriptions, canonical URLs, social preview metadata, and a sitemap.
- Do not add analytics, advertising, third-party trackers, authentication, a CMS, or a contact form.
- Update repository instructions after the new structure exists so they describe the Eleventy site rather than the removed prototype.

## Testing Decisions

- Use the generated production site as the single primary automated seam. Tests observe the public site rather than Eleventy templates, CSS class names, internal collection functions, or exact source structure.
- The acceptance command builds the production site, serves the generated output, and exercises representative routes through a real browser.
- Verify that the homepage, Project Collection, representative Project Pages, and Education Journey route generate successfully and return usable documents.
- Verify that Featured Projects and the complete Project Collection reflect structured Project metadata, ordering, and featured state.
- Verify that a minimally valid Project generates a Project Page and that Projects with different content compositions are not required to share an exact section sequence.
- Verify that ongoing Project status is communicated where present.
- Verify that every Project Page links back to the Project Collection.
- Verify Project Card behavior with pointer hover, keyboard focus, and a touch/mobile viewport, including the absence of summaries and repeated action labels on mobile.
- Verify responsive Project Collection column behavior at representative wide, medium, and mobile viewport widths.
- Verify sticky navigation destinations, homepage anchors, deep-page navigation, the homepage collection-level action, and persistent email/LinkedIn controls.
- Verify keyboard navigation order, visible focus behavior, semantic names, skip navigation, headings, and touch target usability.
- Verify Experience Timeline ordering and required facts and confirm that all entries remain visible before scroll enhancement runs.
- Verify reduced-motion rendering disables nonessential timeline, Visual Motif, and card movement.
- Verify that a Project without a Project Visualization has no irrelevant visualization assets.
- Verify that a Project with a Project Visualization loads only its own module, exposes fallback content, and remains understandable when scripting is disabled or initialization fails.
- Verify media defaults: no sound autoplay, deferred large media, poster support, and a captions/transcript path.
- Verify unique page titles, descriptions, canonical URLs, social metadata, sitemap entries, and correct deployment-aware internal URLs.
- Run an automated broken-link check against the generated site.
- Run automated accessibility checks against representative routes, then supplement them with keyboard and screen-reader-oriented manual checks because automation cannot establish full accessibility.
- Capture representative desktop, tablet, and mobile screenshots from the same served production-site seam for visual review of hierarchy, card layout, soft palette, content reflow, contact controls, and Visual Motif placement.
- Treat visual screenshots as review evidence rather than pixel-perfect implementation contracts; tests should fail on broken behavior, not harmless antialiasing or minor spacing changes.
- Verify a clean production build from a fresh dependency installation.
- There is no useful test prior art in the current prototype; this acceptance seam is intentionally new.

## Out of Scope

- Final Brand Line or personal slogan.
- Final biography, values narrative, objectives, career-interest copy, or other polished personal content.
- Final Experience, Education, and Project data beyond honest representative placeholders.
- Final portrait, Project imagery, timeline icons, or other uploaded graphics.
- Detailed narrative flow for each real Project Page.
- Private, authenticated, or confidential Projects.
- A dark Color Mode or theme toggle.
- Project filtering, search, or taxonomy-driven navigation.
- A CMS or browser-based content editor.
- Analytics, advertising, visitor tracking, or marketing automation.
- A contact form, newsletter, comments, or accounts.
- University logos, seals, mascots, tartan, or other official institutional artwork.
- Employer logos in the Experience Timeline.
- A separate Experience page.
- A downloadable resume until the final file is provided.
- A custom domain, GitHub remote repository, or final production URL.
- Complex global visualization frameworks or dependencies without a concrete Project need.
- Invented Project outcomes, collaborators, employers, or technical claims.
- A full archive-management interface; older Projects remain ordinary Project entries.

## Further Notes

- The portfolio's audience priority is Albert's future self first, recruiters second, and collaborators third. The work remains the primary evidence even though the site is also a long-lived record.
- The current prototype is not a source of components or visual design. It may be inspected only to identify files that must be removed.
- Deleting the old prototype is intentional and will not preserve a legacy archive. The implementation must establish version control before or as part of the replacement work so subsequent changes are recoverable.
- The existing AGENTS instructions describe the old prototype and must be updated during implementation. The domain glossary, ADR, agent configuration, and this specification are the authoritative sources for the new build.
- The exact accent #C41230 is also Carnegie Mellon's official Carnegie Red. UC San Diego Sand and rare Navy usage provide subtle biographical context without presenting the portfolio as university-branded.
- The Visual Motif may conceptually connect distinct ideas like one conductor, but it must not reproduce Carnegie Mellon's official tartan or UC San Diego's official graphic assets.
- The Project Collection begins without filters. Filtering should be reconsidered only when the real collection becomes difficult to scan.
- Light Color Mode tokens should be named semantically rather than after specific hues so a later dark mode can be designed cleanly.
- Email, LinkedIn, portrait, final Brand Line, and final media remain replaceable content inputs rather than layout dependencies.
- The eventual GitHub Pages configuration must account for whether the final site is a user site, a project site, or a custom-domain site.

