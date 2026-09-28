const { test, expect } = require("@playwright/test");
const httpServer = require("http-server");

let server;

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

test("keyboard and responsive visitors retain clear navigation and Project access", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/projects/");

  await expect(page.locator(".project-grid")).toHaveCSS("grid-template-columns", /.+px .+px .+px/);
  const card = page.getByRole("link", { name: /Renewable Infrastructure Field Notes/ });
  await card.hover();
  await expect(card.locator(".project-card__summary")).toBeVisible();
  await card.focus();
  await expect(card).toBeFocused();
  await expect(card.locator(".project-card__summary")).toBeVisible();
  await expect(page.getByText("View project", { exact: true })).toHaveCount(0);

  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to main content" })).toBeFocused();
  await expect(page.getByRole("link", { name: "Skip to main content" })).toHaveCSS("outline-style", "solid");
  await expect(page.locator(".site-header")).toHaveCSS("position", "sticky");

  await page.setViewportSize({ width: 820, height: 900 });
  await page.goto("/projects/");
  await expect(page.locator(".project-grid")).toHaveCSS("grid-template-columns", /.+px .+px/);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/projects/");
  await expect(page.locator(".project-grid")).toHaveCSS("grid-template-columns", /.+px/);
  await expect(page.locator(".project-card__summary")).toBeHidden();
  await expect(page.getByRole("link", { name: "Email Albert Chang" })).toBeInViewport();
  await expect(page.getByRole("link", { name: "Albert Chang on LinkedIn" })).toBeInViewport();
});
