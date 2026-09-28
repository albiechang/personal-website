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
  expect((await page.getByRole("link", { name: /Renewable Infrastructure Field Notes/ }).boundingBox()).width).toBeGreaterThan(340);
  await expect(page.getByText(/An honest demonstration/).first()).toBeHidden();
  await expect(page.getByRole("link", { name: "Email Albert Chang" })).toBeInViewport();
  await expect(page.getByRole("link", { name: "Albert Chang on LinkedIn" })).toBeInViewport();

  const touchContext = await browser.newContext({ hasTouch: true, viewport: { width: 1024, height: 800 } });
  const touchPage = await touchContext.newPage();
  await touchPage.goto("http://127.0.0.1:4173/projects/");
  await expect(touchPage.getByText(/An honest demonstration/).first()).toBeHidden();
  await touchContext.close();
});
