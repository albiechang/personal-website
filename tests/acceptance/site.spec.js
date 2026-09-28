const { test, expect } = require("@playwright/test");
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
