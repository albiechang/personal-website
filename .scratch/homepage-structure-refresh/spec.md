# Homepage Structure Refresh

Status: implemented

Supersedes part of: `../personal-portfolio-mvp/spec.md`

## Context

After completing the portfolio MVP, Albert chose to make the homepage a concise professional overview rather than a second entrance to the Project Collection. He also supplied verified identity and Experience inputs and refined the hero and persistent contact presentation. This specification records those post-MVP decisions after implementation so the repository has an honest source for the current design.

## Requirements

- Present homepage content in this order: hero, Experience Timeline, About, and Education preview.
- Keep Project previews off the homepage. Visitors reach the Project Collection through the persistent Projects destination in primary navigation.
- Order primary navigation as Projects, Experience, About, and Education.
- Use the Brand Line “Connecting energy systems to the people they serve.”
- Link persistent and footer LinkedIn controls to `https://www.linkedin.com/in/albertcc05/`.
- Keep the positioning statement in the hero at a quieter scale than the original MVP treatment and omit the “See experience” action.
- Present Email and LinkedIn as separate, vertically arranged icon controls with accessible names, visible focus, touch-friendly targets, and responsive placement that does not cover content.
- Keep the Experience Timeline compact and most-recent-first, using Albert's verified organization, role, location, and date inputs without job-description copy.
- Adjust the homepage Visual Motif to connect the four remaining sections without becoming prominent content.

## Verified Experience inputs

1. VDE Americas — Performance Engineer — Remote — May 2024–Present
2. Smartville — Manufacturing Engineer — Carlsbad, CA — June 2023–June 2024
3. Global TIES — Instructional Assistant — La Jolla, CA — September 2022–June 2024
4. National Renewable Energy Laboratory — Mechanical Engineering Intern — Golden, CO — June–August 2022
5. UCSD Bookstore — Computer Repair Technician — La Jolla, CA — September 2021–June 2024
6. MSi — RMA Technician — City of Industry, CA — November 2020–September 2021

## Acceptance criteria

- The generated homepage exposes the four sections in the required visible heading order and contains no Featured Projects region or collection-level project action.
- The Project Collection remains reachable through primary navigation from every public route.
- Contact controls remain keyboard-operable, visibly focused, icon-only, separately bounded, and vertically ordered on wide screens.
- Every verified Experience entry is present before JavaScript runs, and reduced motion leaves the timeline static.
- The production build, link validation, accessibility checks, responsive checks, and representative route tests pass.

## Unchanged boundaries

The Eleventy architecture, flexible Project Page system, Project Collection, Education Journey, light design system, accessibility requirements, GitHub Pages strategy, and privacy constraints from the MVP remain in force. This refresh does not require a new architectural decision record.
