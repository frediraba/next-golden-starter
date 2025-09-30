import { test, expect } from '@playwright/test';

test('home loads', async ({ page }) => {
  // Mine otse lokaliseeritud teele, et vältida redirecti-vahepealset tühja title't
  await page.goto('/en');

  // <title>
  await expect(page).toHaveTitle(/next golden starter/i);

  // H1 (localized)
  const h1 = page.getByRole('heading', { level: 1 });
  await expect(h1).toHaveText(/welcome/i);
});
