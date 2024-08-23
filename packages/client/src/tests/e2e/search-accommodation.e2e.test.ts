import { test, expect } from "@playwright/test";

test.describe("Search Acommodations", () => {
  test("Should insert a search query", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Accommodation Search/);

    const input = page.locator("#search-accommodation");
    await input.fill("Auck");

    const hotelLink = page.getByRole("link", { name: "SKYCITY Hotel" });

    await expect(hotelLink).toBeVisible();
    await hotelLink.click();

    const hotelName = await page.locator("#hotel-details");
    await expect(hotelName).toBeVisible();

    const backButton = await page.locator("#back-btn");
    await expect(backButton).toBeVisible();

    await backButton.click();
    expect(input).toBeVisible();
  });
});
