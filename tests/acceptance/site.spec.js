const { test, expect } = require("@playwright/test");
const { execFileSync } = require("node:child_process");
const path = require("node:path");
const httpServer = require("http-server");

let server;

async function tabUntilFocused(page, target, maximumTabs = 20) {
  for (let index = 0; index < maximumTabs; index += 1) {
    await page.keyboard.press("Tab");
    if (await target.evaluate((element) => element === document.activeElement)) return;
  }
  throw new Error("Keyboard focus did not reach the expected control");
}

test.beforeAll(async () => {
  server = httpServer.createServer({ root: "_site", cache: -1 });
  await new Promise((resolve) => server.listen(4173, "127.0.0.1", resolve));
});

test.afterAll(() => {
  server.close();
});

test("visitor can understand and navigate the Professional Record homepage", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Albert Chang/);
  await expect(page.getByRole("link", { name: "Skip to main content" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 1, name: /community-centered engineer/i })).toBeVisible();
  await expect(page.getByText("Brand Line — placeholder").first()).toBeVisible();
  await expect(page.getByText("Portrait placeholder")).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Primary" })).toContainText("Projects");
  await expect(page.getByRole("link", { name: "Email Albert Chang" })).toHaveAttribute("href", /^mailto:/);
  await expect(page.getByRole("link", { name: "Albert Chang on LinkedIn" })).toHaveAttribute("href", /^https:/);
  await expect(page.getByRole("contentinfo")).toContainText("Albert Chang");
});

test("deep routes stay script-free and reduced-motion rendering stays static", async ({ page }) => {
  const deepRouteScripts = [];
  page.on("request", (request) => {
    if (new URL(request.url()).pathname.endsWith(".js")) deepRouteScripts.push(request.url());
  });
  await page.goto("/projects/");
  expect(deepRouteScripts).toEqual([]);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
});

test("every public route has unique discoverability metadata and sitemap coverage", async ({ page }) => {
  const routes = [
    "/",
    "/projects/",
    "/education/",
    "/projects/grid-resilience-scenario-explorer/",
    "/projects/renewable-infrastructure-field-notes/",
    "/projects/solar-notes/",
    "/projects/water-systems-design-notebook/",
    "/projects/minimal-project-record/"
  ];
  const titles = new Set();
  const descriptions = new Set();

  for (const route of routes) {
    await page.goto(route);
    const title = await page.title();
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    titles.add(title);
    descriptions.add(description);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `http://localhost:8080${route}`);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", title);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute("content", description);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", `http://localhost:8080${route}`);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary");
  }

  expect(titles.size).toBe(routes.length);
  expect(descriptions.size).toBe(routes.length);

  const sitemapResponse = await page.request.get("/sitemap.xml");
  expect(sitemapResponse.ok()).toBe(true);
  const sitemap = await sitemapResponse.text();
  for (const route of routes) expect(sitemap).toContain(`<loc>http://localhost:8080${route}</loc>`);
});

test("production URLs and assets honor a GitHub Pages project-site prefix", async ({ page }) => {
  const outputRoot = "test-results/deployment-aware";
  const output = `${outputRoot}/portfolio`;
  const eleventyCommand = path.resolve(path.dirname(require.resolve("@11ty/eleventy")), "..", "cmd.cjs");
  execFileSync(process.execPath, [eleventyCommand, "--output", output], {
    cwd: process.cwd(),
    env: {
      ...process.env,
      SITE_PATH_PREFIX: "/portfolio/",
      SITE_URL: "https://portfolio.example.test"
    },
    stdio: "pipe"
  });
  const variantServer = httpServer.createServer({ root: outputRoot, cache: -1 });
  await new Promise((resolve) => variantServer.listen(4175, "127.0.0.1", resolve));

  try {
    await page.goto("http://127.0.0.1:4175/portfolio/");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://portfolio.example.test/portfolio/");
    await expect(page.locator('link[rel="stylesheet"]').last()).toHaveAttribute("href", "/portfolio/assets/css/site.css");
    await expect(page.getByRole("link", { name: "View all projects" })).toHaveAttribute("href", "/portfolio/projects/");
    await expect(page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Experience" })).toHaveAttribute("href", "/portfolio/#experience");
    const localResources = await page.evaluate(() => performance.getEntriesByType("resource")
      .map((entry) => new URL(entry.name))
      .filter((url) => url.origin === location.origin)
      .map((url) => url.pathname));
    expect(localResources.length).toBeGreaterThan(0);
    expect(localResources.every((resource) => resource.startsWith("/portfolio/"))).toBe(true);

    const sitemap = await (await page.request.get("http://127.0.0.1:4175/portfolio/sitemap.xml")).text();
    expect(sitemap).toContain("<loc>https://portfolio.example.test/portfolio/projects/</loc>");
    expect(sitemap).not.toContain("portfolio/portfolio");
  } finally {
    variantServer.close();
  }

  const customDomainOutput = "test-results/deployment-aware-custom-domain";
  execFileSync(process.execPath, [eleventyCommand, "--output", customDomainOutput], {
    cwd: process.cwd(),
    env: { ...process.env, SITE_PATH_PREFIX: "", SITE_URL: "https://portfolio.example.test" },
    stdio: "pipe"
  });
  execFileSync(process.execPath, ["scripts/check-links.js", customDomainOutput], {
    cwd: process.cwd(),
    env: { ...process.env, SITE_PATH_PREFIX: "", SITE_URL: "https://portfolio.example.test" },
    stdio: "pipe"
  });
});

test("visual review captures cover motif placement across routes, viewports, and motion preferences", async ({ page }) => {
  const captures = [
    { name: "homepage-desktop", route: "/", width: 1440, height: 1000 },
    { name: "projects-tablet", route: "/projects/", width: 900, height: 900 },
    { name: "education-mobile", route: "/education/", width: 390, height: 844 }
  ];

  for (const capture of captures) {
    await page.setViewportSize({ width: capture.width, height: capture.height });
    await page.goto(capture.route);
    await page.screenshot({ path: `test-results/visual-review/${capture.name}.png`, fullPage: true });
  }

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");
  expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
  await page.screenshot({ path: "test-results/visual-review/homepage-reduced-motion.png", fullPage: true });
});

test("editorial palette keeps text and controls readable without color-only states", async ({ page }) => {
  await page.goto("/");

  const contrastResults = await page.evaluate(() => {
    const channels = (value) => value.match(/[\d.]+/g).slice(0, 3).map(Number);
    const luminance = (value) => {
      const normalized = channels(value).map((channel) => {
        const ratio = channel / 255;
        return ratio <= 0.04045 ? ratio / 12.92 : ((ratio + 0.055) / 1.055) ** 2.4;
      });
      return (0.2126 * normalized[0]) + (0.7152 * normalized[1]) + (0.0722 * normalized[2]);
    };
    const ratio = (foreground, background) => {
      const values = [luminance(foreground), luminance(background)].sort((left, right) => right - left);
      return (values[0] + 0.05) / (values[1] + 0.05);
    };
    return [".intro", ".eyebrow", ".button", ".section-shell h2", ".contact-rail a"].map((selector) => {
      const element = document.querySelector(selector);
      const style = getComputedStyle(element);
      let background = style.backgroundColor;
      if (background === "rgba(0, 0, 0, 0)") background = getComputedStyle(document.body).backgroundColor;
      return { selector, ratio: ratio(style.color, background) };
    });
  });

  for (const result of contrastResults) expect(result.ratio, result.selector).toBeGreaterThanOrEqual(4.5);
  await expect(page.getByText("Current entry placeholder")).toBeVisible();
  const projectsLink = page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Projects" });
  await projectsLink.focus();
  await expect(projectsLink).toHaveCSS("outline-style", "solid");
});

test("Experience Timeline is newest-first, complete without scripts, and respects reduced motion", async ({ page, browser }) => {
  await page.goto("/");

  const timeline = page.getByRole("list", { name: "Experience Timeline" });
  const entries = timeline.getByRole("listitem");
  await expect(entries).toHaveCount(2);
  await expect(entries.nth(0)).toContainText("Current entry placeholder");
  await expect(entries.nth(1)).toContainText("Earlier entry placeholder");
  for (const entry of [entries.nth(0), entries.nth(1)]) {
    await expect(entry.getByText(/Organization name pending confirmation/)).toBeVisible();
    await expect(entry.getByText(/Role pending confirmation/)).toBeVisible();
    await expect(entry.getByText(/Location pending confirmation/)).toBeVisible();
    await expect(entry.getByText(/date pending confirmation/i)).toBeVisible();
    const marker = entry.locator(".experience-marker");
    await expect(marker).toHaveCount(1);
    await expect(marker).toHaveCSS("width", "12px");
    await expect(marker).toHaveCSS("height", "12px");
  }

  const noScriptContext = await browser.newContext({ javaScriptEnabled: false });
  const noScriptPage = await noScriptContext.newPage();
  await noScriptPage.goto("http://127.0.0.1:4173/");
  await expect(noScriptPage.getByRole("list", { name: "Experience Timeline" }).getByRole("listitem")).toHaveCount(2);
  await expect(noScriptPage.getByText("Earlier entry placeholder")).toBeVisible();
  await noScriptContext.close();

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  const reducedTimeline = page.getByRole("list", { name: "Experience Timeline" });
  expect(await reducedTimeline.evaluate((element) => getComputedStyle(element, "::after").display)).toBe("none");
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect(reducedTimeline.locator(".is-active")).toHaveCount(0);
});

test("Education preview leads to a coherent Education Journey with canonical Project links", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("region", { name: "Education Journey preview" })).toContainText("Carnegie Mellon University");
  await page.getByRole("link", { name: "Explore the Education Journey" }).click();
  await expect(page).toHaveURL(/\/education\/$/);
  await expect(page.getByRole("heading", { level: 1, name: "Education Journey" })).toBeVisible();

  const facts = page.getByRole("region", { name: "Education facts" });
  await expect(facts).toContainText("Carnegie Mellon University");
  await expect(facts).toContainText("University of California San Diego");
  await expect(facts.getByText("Degree details pending confirmation")).toHaveCount(2);
  await expect(page.getByRole("heading", { level: 2, name: "Formative stages and decisions" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Leadership and service" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Selected academic Projects" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Honors" })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Coursework" })).toHaveCount(0);

  const projectLink = page.getByRole("link", { name: "Water Systems Design Notebook for Early-Stage Alternatives" });
  await expect(projectLink).toHaveAttribute("href", "/projects/water-systems-design-notebook/");
  await projectLink.click();
  await expect(page).toHaveURL(/\/projects\/water-systems-design-notebook\/$/);

  await page.goto("/");
  await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Education" }).click();
  await expect(page).toHaveURL(/\/education\/$/);
});

test("Education Journey remains coherent when optional sections are absent", async ({ page }) => {
  const output = "test-results/education-without-optional-sections";
  const eleventyCommand = path.resolve(path.dirname(require.resolve("@11ty/eleventy")), "..", "cmd.cjs");
  execFileSync(process.execPath, [eleventyCommand, "--output", output], {
    cwd: process.cwd(),
    env: { ...process.env, EDUCATION_OPTIONAL_SECTIONS: "omit" },
    stdio: "pipe"
  });
  const variantServer = httpServer.createServer({ root: output, cache: -1 });
  await new Promise((resolve) => variantServer.listen(4174, "127.0.0.1", resolve));

  try {
    await page.goto("http://127.0.0.1:4174/education/");
    await expect(page.getByRole("heading", { level: 1, name: "Education Journey" })).toBeVisible();
    await expect(page.getByRole("region", { name: "Education facts" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Formative stages and decisions" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Leadership and service" })).toHaveCount(0);
    await expect(page.getByRole("heading", { level: 2, name: "Selected academic Projects" })).toHaveCount(0);
  } finally {
    variantServer.close();
  }
});

test("one Markdown Project is featured, collected, and available on its own page", async ({ page }) => {
  const projectTitle = "Renewable Infrastructure Field Notes";
  const projectSummary = "An honest demonstration of how a future renewable-energy Project can combine field context, engineering decisions, and community priorities.";

  await page.goto("/");
  await expect(page.getByRole("link", { name: new RegExp(projectTitle) })).toContainText(projectSummary);

  await page.goto("/projects/");
  await expect(page.getByRole("heading", { level: 1, name: "Project Collection" })).toBeVisible();
  await expect(page.getByRole("link", { name: new RegExp(projectTitle) })).toContainText(projectSummary);

  await page.getByRole("link", { name: new RegExp(projectTitle) }).click();
  await expect(page).toHaveURL(/\/projects\/renewable-infrastructure-field-notes\/$/);
  await expect(page.getByRole("heading", { level: 1, name: projectTitle })).toBeVisible();
  await expect(page.getByText("Demonstration role")).toBeVisible();
  await expect(page.getByText("Community engagement")).toBeVisible();
  await expect(page.getByRole("link", { name: "Back to all projects" })).toHaveAttribute("href", "/projects/");
});

test("Project Collection is curated, newest-first, and labels ongoing work", async ({ page }) => {
  await page.goto("/projects/");

  const cards = page.getByRole("region", { name: "All projects" }).getByRole("link");
  await expect(cards).toHaveCount(5);
  await expect(cards.nth(0)).toContainText("Grid Resilience Scenario Explorer");
  await expect(cards.nth(1)).toContainText("Renewable Infrastructure Field Notes");
  await expect(cards.nth(2)).toContainText("Solar Notes");
  await expect(cards.nth(3)).toContainText("Water Systems Design Notebook for Early-Stage Alternatives");
  await expect(cards.nth(4)).toContainText("Minimal Project Record");
  await expect(cards.nth(0).getByText("Ongoing", { exact: true })).toBeVisible();
  await expect(cards.nth(4).getByRole("img", { name: /Representative media pending/ })).toBeVisible();

  await page.goto("/");
  await expect(page.getByRole("region", { name: "Featured Projects" }).getByRole("link")).toHaveCount(3);
  await expect(page.getByRole("link", { name: "View all projects" })).toHaveCount(1);
});

test("Project Pages support varied compositions and safe rich media", async ({ page }) => {
  await page.goto("/projects/solar-notes/");
  await expect(page.getByRole("heading", { level: 1, name: "Solar Notes" })).toBeVisible();
  await expect(page.getByText("Placeholder collaborator — demonstration only")).toBeVisible();
  await expect(page.getByRole("link", { name: "Public reference" })).toHaveAttribute("rel", /noopener/);
  await expect(page.getByRole("figure").filter({ hasText: "Demonstration artwork" })).toBeVisible();
  const video = page.locator("video");
  await expect(video).toHaveAttribute("controls", "");
  await expect(video).toHaveAttribute("preload", "none");
  await expect(video).not.toHaveAttribute("autoplay", "");
  await expect(video).toHaveAttribute("poster", /project-solar-notes\.svg$/);
  await expect(video.locator('track[kind="captions"]')).toHaveAttribute("src", /demo-captions\.vtt$/);
  const videoHeading = page.getByRole("heading", { level: 2, name: "Video evidence placeholder" });
  const videoTranscript = page.getByText("Video transcript", { exact: true });
  const videoHeadingId = await videoHeading.getAttribute("id");
  const videoTranscriptId = await video.getAttribute("aria-describedby");
  expect(videoHeadingId).toBeTruthy();
  expect(videoTranscriptId).toBeTruthy();
  await expect(page.locator(`[aria-labelledby="${videoHeadingId}"]`)).toHaveCount(1);
  await expect(page.locator(`#${videoTranscriptId}`)).toHaveCount(1);
  await expect(videoTranscript).toBeVisible();
  const ids = await page.locator("[id]").evaluateAll((elements) => elements.map((element) => element.id));
  expect(new Set(ids).size).toBe(ids.length);
  await expect(page.getByRole("link", { name: "Back to all projects" })).toBeVisible();

  await page.goto("/projects/grid-resilience-scenario-explorer/");
  await expect(page.getByRole("heading", { level: 2, name: "Static scenario comparison" })).toBeVisible();
  await expect(page.getByRole("img", { name: /Three named scenarios connect/ })).toBeVisible();
  await expect(page.getByText("Ongoing Project", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Back to all projects" })).toBeVisible();

  await page.goto("/projects/water-systems-design-notebook/");
  await expect(page.getByRole("main")).not.toContainText("Collaborators");
  await expect(page.getByRole("main")).not.toContainText("Links");

  await page.goto("/projects/minimal-project-record/");
  await expect(page.getByRole("heading", { level: 1, name: "Minimal Project Record" })).toBeVisible();
  await expect(page.getByText("Project · April 2024", { exact: true })).toBeVisible();
});

test("Project Visualization assets are isolated, deferred, and resilient", async ({ page, browser }) => {
  const visualizationAssets = [];
  page.on("request", (request) => {
    if (request.url().includes("/visualizations/")) visualizationAssets.push(request.url());
  });
  await page.goto("/projects/solar-notes/");
  expect(visualizationAssets).toEqual([]);

  let requestedData = false;
  page.on("request", (request) => {
    if (request.url().includes("scenario-comparison.json")) requestedData = true;
  });
  await page.setViewportSize({ width: 1280, height: 700 });
  await page.goto("/projects/grid-resilience-scenario-explorer/");
  expect(visualizationAssets.some((url) => url.endsWith("scenario-comparison.css"))).toBe(true);
  expect(visualizationAssets.some((url) => url.endsWith("scenario-comparison.js"))).toBe(true);
  expect(requestedData).toBe(false);

  const visualization = page.getByRole("region", { name: "Placeholder grid scenario comparison" });
  await visualization.scrollIntoViewIfNeeded();
  await expect.poll(() => requestedData).toBe(true);
  await expect(visualization).toHaveAttribute("data-state", "ready");
  await expect(visualization.getByText("Scenario A — Steady", { exact: true })).toBeVisible();
  const scenarioB = visualization.getByRole("button", { name: "Emphasize Scenario B" });
  await scenarioB.focus();
  await page.keyboard.press("Enter");
  await expect(scenarioB).toHaveAttribute("aria-pressed", "true");
  await expect(visualization.getByText("Scenario B: Variable", { exact: true })).toBeVisible();

  const noScriptContext = await browser.newContext({ javaScriptEnabled: false });
  const noScriptPage = await noScriptContext.newPage();
  await noScriptPage.goto("http://127.0.0.1:4173/projects/grid-resilience-scenario-explorer/");
  await expect(noScriptPage.getByText("Scenario A — Steady", { exact: true })).toBeVisible();
  await noScriptContext.close();

  const failedContext = await browser.newContext();
  const failedPage = await failedContext.newPage();
  await failedPage.route("**/scenario-comparison.json", (route) => route.abort());
  await failedPage.goto("http://127.0.0.1:4173/projects/grid-resilience-scenario-explorer/");
  const failedVisualization = failedPage.getByRole("region", { name: "Placeholder grid scenario comparison" });
  await failedVisualization.scrollIntoViewIfNeeded();
  await expect(failedVisualization).toHaveAttribute("data-state", "failed");
  await expect(failedVisualization.getByText("Scenario A — Steady", { exact: true })).toBeVisible();
  await expect(failedVisualization.getByText(/interactive comparison could not start/i)).toBeVisible();
  await failedContext.close();
});

test("Project Collection reflows from three to two to one columns", async ({ page }) => {
  const projectCollection = page.getByRole("region", { name: "All projects" });
  const columnCount = () => projectCollection.evaluate((grid) => getComputedStyle(grid).gridTemplateColumns.split(" ").length);

  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/projects/");
  await expect(page.getByText(/Choose a Project to explore its evidence/i)).toBeVisible();
  expect(await columnCount()).toBe(3);
  await expect(page.getByRole("img", { name: "Abstract diagram of three connected grid scenarios" })).toHaveCSS("object-position", "58% 45%");

  await page.setViewportSize({ width: 900, height: 800 });
  expect(await columnCount()).toBe(2);

  await page.setViewportSize({ width: 390, height: 844 });
  expect(await columnCount()).toBe(1);
  for (const summary of [
    /placeholder resilience scenarios/,
    /future renewable-energy Project/,
    /compact demonstration/,
    /older demonstration entry/,
    /required Project metadata/
  ]) await expect(page.getByText(summary).first()).toBeHidden();
  await expect(page.getByText("View project", { exact: true })).toHaveCount(0);
});

test("keyboard and responsive visitors retain clear navigation and Project access", async ({ page, browser }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/projects/");

  const card = page.getByRole("link", { name: /Renewable Infrastructure Field Notes/ });
  await card.hover();
  const projectSummary = card.getByText(/An honest demonstration/);
  await expect(projectSummary).toHaveCSS("opacity", "1");
  expect((await card.boundingBox()).width).toBeLessThan(400);
  await expect(page.getByText("View project", { exact: true })).toHaveCount(0);

  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to main content" })).toBeFocused();
  await expect(page.getByRole("link", { name: "Skip to main content" })).toHaveCSS("outline-style", "solid");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Albert Chang", exact: true }).first()).toBeFocused();
  await page.keyboard.press("Tab");
  const projectsNavigation = page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Projects" });
  await expect(projectsNavigation).toBeFocused();
  await expect(projectsNavigation).toHaveCSS("outline-style", "solid");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/projects\/$/);

  const keyboardCard = page.getByRole("link", { name: /Renewable Infrastructure Field Notes/ });
  await tabUntilFocused(page, keyboardCard);
  await expect(keyboardCard).toBeFocused();
  await expect(keyboardCard).toHaveCSS("outline-style", "solid");
  await expect(keyboardCard.getByText(/An honest demonstration/)).toHaveCSS("opacity", "1");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/projects\/renewable-infrastructure-field-notes\/$/);

  const emailControl = page.getByRole("link", { name: "Email Albert Chang" });
  await tabUntilFocused(page, emailControl);
  await expect(emailControl).toBeFocused();
  await expect(emailControl).toHaveCSS("outline-style", "solid");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Albert Chang on LinkedIn" })).toBeFocused();

  const banner = page.getByRole("banner");
  const initialBannerTop = (await banner.boundingBox()).y;
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  expect((await banner.boundingBox()).y).toBe(initialBannerTop);

  await page.setViewportSize({ width: 820, height: 900 });
  await page.goto("/projects/");
  expect((await page.getByRole("link", { name: /Renewable Infrastructure Field Notes/ }).boundingBox()).width).toBeLessThan(400);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/projects/");
  const mobileCard = page.getByRole("link", { name: /Renewable Infrastructure Field Notes/ });
  const mobileSummary = page.getByText(/An honest demonstration/).first();
  expect((await mobileCard.boundingBox()).width).toBeGreaterThan(340);
  await expect(mobileSummary).toBeHidden();
  await tabUntilFocused(page, mobileCard);
  await expect(mobileCard).toBeFocused();
  await expect(mobileSummary).toBeHidden();
  await expect(page.getByRole("link", { name: "Email Albert Chang" })).toBeInViewport();
  await expect(page.getByRole("link", { name: "Albert Chang on LinkedIn" })).toBeInViewport();

  const touchContext = await browser.newContext({ hasTouch: true, viewport: { width: 1024, height: 800 } });
  const touchPage = await touchContext.newPage();
  await touchPage.goto("http://127.0.0.1:4173/projects/");
  const touchSummary = touchPage.getByText(/An honest demonstration/).first();
  await expect(touchSummary).toBeHidden();
  const touchKeyboardCard = touchPage.getByRole("link", { name: /Renewable Infrastructure Field Notes/ });
  await tabUntilFocused(touchPage, touchKeyboardCard);
  await expect(touchKeyboardCard).toBeFocused();
  await expect(touchSummary).toBeHidden();
  await touchContext.close();
});
