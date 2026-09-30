import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("page loads without errors or overflow", async ({ page }, testInfo) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const missing = [];
  page.on("response", (r) => {
    if (r.status() >= 400) missing.push(r.url());
  });
  await page.goto("./");
  await expect(page).toHaveTitle(/Autheo Agent Environment/);
  await expect(page.locator("h1")).toContainText("boundaries");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: `test-results/${testInfo.project.name}-site.png`,
    fullPage: true,
  });
  expect(errors).toEqual([]);
  expect(missing).toEqual([]);
});
test("policy transitions and invalid scopes", async ({ page }) => {
  await page.goto("./");
  await page.getByRole("button", { name: "Try 51" }).click();
  await expect(page.locator("#outcome")).toHaveText("ESCALATE");
  await page.getByRole("button", { name: "Try 75" }).click();
  await expect(page.locator("#outcome")).toHaveText("BLOCK");
  await page.getByRole("button", { name: "Try 40" }).click();
  await expect(page.locator("#outcome")).toHaveText("ALLOW");
  await page.locator("#scope").selectOption("wallet:transfer");
  await expect(page.locator("#outcome")).toHaveText("BLOCK");
  await page.locator("#amount").fill("");
  await expect(page.locator("#reason")).toContainText("whole number");
});
test("navigation and public links point at real destinations", async ({
  page,
}) => {
  await page.goto("./");
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Roadmap" })
    .click();
  await expect(page).toHaveURL(/#roadmap$/);
  for (const href of await page
    .locator('a[href^="#"]')
    .evaluateAll((as) => as.map((a) => a.getAttribute("href")))) {
    if (href !== "#") expect(await page.locator(href).count()).toBe(1);
  }
  await expect(
    page.getByRole("link", { name: "Get the environment" }),
  ).toHaveAttribute(
    "href",
    "https://github.com/SolutionsAsService/autheo-agent-environment",
  );
});
test("no automated WCAG A/AA violations", async ({ page }) => {
  await page.goto("./");
  const report = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(report.violations).toEqual([]);
});
