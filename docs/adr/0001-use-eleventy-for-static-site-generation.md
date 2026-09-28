# Use Eleventy for static site generation

Build the portfolio with Eleventy, using Markdown and frontmatter for Projects, shared layouts for site-wide structure, and isolated browser modules for project-specific visualizations. Eleventy was chosen over Astro because the initial site benefits more from minimal framework surface and zero client JavaScript by default than from an integrated TypeScript asset pipeline, and over a custom generator because content collections, layouts, routing, and GitHub Pages path handling should not become locally maintained infrastructure.
