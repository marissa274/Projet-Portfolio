import { test, expect, type Page } from '@playwright/test';

const scrollToAbout = (page: Page) => page.evaluate(() => {
  const about = document.querySelector('.about-chapter')!;
  window.scrollTo(0, about.getBoundingClientRect().top + window.scrollY);
});

const title = (page: Page) => page.locator('.know-title');

test('education follows About before the footer', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#education')).toHaveCount(1);
  await scrollToAbout(page);
  await expect(title(page)).toHaveAttribute('aria-label', 'GET TO KNOW ME');
  await page.locator('#education').evaluate(e => window.scrollTo(0, e.getBoundingClientRect().top + scrollY));
  await expect(title(page)).toHaveAttribute('aria-label', 'EDUCATION');
});

test('the Formation ruler link opens the education journal', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.site-ruler-pages a[aria-label="Formation"]')).toHaveAttribute('href', '/#education');
});

test('reloading partway down the page does not crash it', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await scrollToAbout(page);
  await page.reload();
  await expect(title(page)).toHaveAttribute('aria-label', 'GET TO KNOW ME');
  await expect(page.locator('#get-to-know')).toHaveAttribute('data-open', 'true');
  expect(errors).toEqual([]);
});

test('the photo recomposes and separates by itself until the button is used', async ({ page }) => {
  await page.goto('/');
  await scrollToAbout(page);
  const section = page.locator('#get-to-know');
  await expect(section).toHaveAttribute('data-open', 'true');
  // The text must stay up long enough to read: the turn takes about 3s, then it holds for 7s.
  await page.waitForTimeout(9000);
  await expect(section).toHaveAttribute('data-open', 'true');
  await expect(section).toHaveAttribute('data-open', 'false', { timeout: 4000 });
  await expect(section).toHaveAttribute('data-open', 'true', { timeout: 7000 });
  await page.getByRole('button', { name: 'Recomposer la photo' }).click();
  await expect(section).toHaveAttribute('data-open', 'false');
  await page.waitForTimeout(6000);
  await expect(section).toHaveAttribute('data-open', 'false');
});
