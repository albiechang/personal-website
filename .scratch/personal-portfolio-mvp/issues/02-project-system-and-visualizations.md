# 02: Complete the Project system and Project Visualization support

**What to build:** Turn the first Project path into a durable, varied Project system: a complete responsive Project Collection, flexible Project Pages, accessible rich media, and optional isolated Project Visualizations that do not burden unrelated pages.

**Blocked by:** 01: Build the Eleventy foundation and first complete Project path.

**Status:** ready-for-agent

- [ ] Add representative Projects that exercise long and short titles, different dates, featured and non-featured states, ongoing status, optional links, collaborators, and absent optional metadata without fabricating accomplishments.
- [ ] Curate Featured Projects manually and order the complete Project Collection newest-first.
- [ ] Render the Project Collection as a clean three-column, two-column, and one-column grid at representative wide, medium, and mobile widths.
- [ ] Use a consistent approximately 4:3 representative-media area with per-Project focal-point control.
- [ ] Keep titles permanently visible; reveal summaries on desktop pointer hover and keyboard focus; omit summaries and repeated card actions on touch/mobile layouts.
- [ ] Provide one homepage-level “View all projects” action and one concise collection-level invitation rather than per-card action labels.
- [ ] Communicate ongoing Project status clearly and retain older non-featured Projects in the collection.
- [ ] Provide reusable composition primitives for prose, figures, galleries, video, diagrams, data presentations, and other Project-specific evidence.
- [ ] Demonstrate at least two meaningfully different Project Page compositions while retaining the shared shell, essential metadata, and collection navigation.
- [ ] Allow a Project to opt into a custom composition without forking the global navigation, typography, spacing, or contact behavior.
- [ ] Allow a Project to declare an optional Project Visualization identifier that loads only the relevant module, styles, and data.
- [ ] Defer expensive Project Visualization initialization until its region approaches the viewport.
- [ ] Supply meaningful static or textual fallback content when JavaScript is disabled, initialization fails, or advanced graphics are unavailable.
- [ ] Ensure visualization controls are keyboard operable, important information is not encoded by color alone, and hover is never the sole information channel.
- [ ] Ensure videos do not autoplay with sound and support poster images plus captions or transcripts.
- [ ] Verify that Projects without visualizations do not load visualization assets and that unrelated pages remain free of those dependencies.
- [ ] Extend public-site tests to cover Project ordering, status, varied page compositions, card interaction modes, rich-media defaults, isolated loading, and visualization fallbacks.

