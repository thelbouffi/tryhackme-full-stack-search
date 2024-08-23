import { test, expect } from '@playwright/test';

test.describe("Search Acommodations", () => {
  test('Should insert a search query', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Accommodation Search/);
  
    const input = page.locator('#search-accommodation');
    await input.fill("Auck");
  
  
    const hotelLink = page.getByRole("link", {name: "SKYCITY Hotel"});
  
    await expect(hotelLink).toBeVisible();
    await hotelLink.click();
  
  
    const hotelName = await page.locator('.card-header h2');
    await expect(hotelName).toHaveText('SKYCITY Hotel');
  
    const backButton = await page.locator('.card-footer .btn-primary');
    await expect(backButton).toBeVisible();
  
    await backButton.click();
    expect(input).toBeVisible();
  });

}); 