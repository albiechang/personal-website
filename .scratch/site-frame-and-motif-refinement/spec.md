# Site Frame and Motif Refinement

Status: Implemented

## Purpose

Refine the Professional Record's visual structure so the power-flow motif remains recognizable but never crosses readable content or controls. Introduce a restrained site frame that makes the content boundary an intentional part of the visual system.

This specification refines the visual-system portions of `.scratch/personal-portfolio-mvp/spec.md` and `.scratch/homepage-structure-refresh/spec.md`. It does not change the site's domain model or architecture.

## Frame

- A continuous frame spans the header, main content, and footer on every public page.
- The frame has a maximum width of `64rem` and is centered in the viewport.
- Both vertical edges use the semantic border color and a thin one-pixel rule.
- The warm canvas color remains the same inside and outside the frame; the frame must not look like a raised card.
- Header and section dividers stop at the frame edges rather than extending across the viewport.
- Inner spacing scales from approximately `1.25rem` on compact screens to `3rem` on wide screens.

## Power-flow motif

- The existing single-conductor idea and scroll-responsive energized flow remain recognizable.
- The motif is confined to a reserved rail inside the left frame border and must never overlap readable content, media, or controls.
- The line uses thinner strokes, gentle bends, sparse marks, and lower opacity than the original treatment.
- The neutral conductor is approximately 70% opaque; the Carnegie Red energized portion is approximately 85% opaque.
- On the homepage, three small nodes represent the transitions between Hero, Experience, About, and Education.
- Deeper pages use a short, quiet fragment in the same left rail rather than a full-height sequence.
- On compact screens, the motif becomes an almost-straight faint line with one node.
- Reduced-motion rendering retains a static, meaningful state without animated transitions.

## Contact controls

- Email and LinkedIn controls sit horizontally in the sticky top bar.
- Primary navigation runs horizontally on the right side of the header, followed by the contact controls.
- On compact screens, the contact controls share the first row with the wordmark while navigation occupies a second horizontal row.
- Controls must not cover navigation or document content.

## Acceptance criteria

- The frame remains centered and no wider than `64rem` on wide viewports.
- The motif's rendered bounds remain entirely before the readable content start edge.
- The homepage exposes three motif nodes; deeper pages expose a short fragment.
- Horizontal header and section dividers terminate at the frame edges.
- Desktop, tablet, and mobile layouts have no horizontal overflow.
- The site remains usable at browser zoom and narrow reflow widths.
- Navigation and contact controls remain reachable, visible, and clear of content in the sticky top bar.
- Reduced-motion users receive no motif animation.
- Automated accessibility checks report no detectable violations.
