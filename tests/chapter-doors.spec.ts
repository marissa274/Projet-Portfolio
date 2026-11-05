import { test, expect, type Page } from '@playwright/test';

const chapterScroll = (page: Page, progress: number) => page.evaluate((value) => {
  const chapter = document.querySelector<HTMLElement>('.about-chapter')!;
  const top = chapter.getBoundingClientRect().top + window.scrollY;
  window.scrollTo(0, top + (chapter.offsetHeight - window.innerHeight) * value);
}, progress);

const doorEdges = (page: Page) => page.evaluate(() => ({
  left: document.querySelector('.chapter-door-left')!.getBoundingClientRect().right,
  right: document.querySelector('.chapter-door-right')!.getBoundingClientRect().left,
  middle: window.innerWidth / 2,
}));

const title = (page: Page) => page.locator('.know-title');

for (const viewport of [{ name: 'desktop', width: 1440, height: 1000 }, { name: 'mobile', width: 390, height: 844 }]) {
  test(`doors close over About, hand the title to Education and reopen on ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);

    await chapterScroll(page, 0);
    await expect(title(page)).toHaveAttribute('aria-label', 'GET TO KNOW ME');
    await expect.poll(async () => (await doorEdges(page)).left).toBeLessThan(0);

    // Just after the collision (time 0.97 of the 1.4 door timeline) the doors have rebounded apart.
    await chapterScroll(page, 0.97 / 1.4);
    await expect.poll(async () => {
      const { left, right } = await doorEdges(page);
      return right - left;
    }).toBeGreaterThan(viewport.width * 0.05);

    await chapterScroll(page, 1);
    await expect.poll(async () => {
      const { left, right, middle } = await doorEdges(page);
      return Math.abs(left - middle) < 1 && Math.abs(right - middle) < 1;
    }).toBe(true);
    await expect(title(page)).toHaveAttribute('aria-label', 'EDUCATION');

    await chapterScroll(page, 0);
    await expect.poll(async () => (await doorEdges(page)).left).toBeLessThan(0);
    await expect(title(page)).toHaveAttribute('aria-label', 'GET TO KNOW ME');
  });
}

test('reloading partway down the page does not crash it', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await chapterScroll(page, 0);
  await page.reload();
  await expect(title(page)).toHaveAttribute('aria-label', 'GET TO KNOW ME');
  await expect(page.locator('#get-to-know')).toHaveAttribute('data-open', 'true');
  expect(errors).toEqual([]);
});

test('the opened photo keeps turning every 5 seconds until it is recomposed', async ({ page }) => {
  await page.goto('/');
  await chapterScroll(page, 0);
  const isTurning = () => page.locator('.puzzle-turn').first().evaluate((piece) => getComputedStyle(piece).transform.startsWith('matrix3d'));
  await expect.poll(isTurning, { intervals: [100], timeout: 9000 }).toBe(true);
  await expect.poll(isTurning, { intervals: [100], timeout: 5000 }).toBe(false);
  await expect.poll(isTurning, { intervals: [100], timeout: 6000 }).toBe(true);
  await page.getByRole('button', { name: 'Recomposer la photo' }).click();
  await expect.poll(isTurning).toBe(false);
});

test('Education keeps the door tones and shows the portfolio studies', async ({ page }) => {
  await page.goto('/');
  const backgrounds = await page.evaluate(() => ['.chapter-door-left', '.chapter-door-right', '.education-panel-computer', '.education-panel-business']
    .map((selector) => getComputedStyle(document.querySelector(selector)!).backgroundColor));
  expect(backgrounds[0]).not.toBe(backgrounds[1]);
  expect(backgrounds.slice(2)).toEqual(backgrounds.slice(0, 2));
  const education = page.locator('#education');
  await expect(education).toContainText('Cégep de Sorel-Tracy');
  await expect(education).toContainText('All Saints Bilingual College');
});

test('reduced motion removes the doors but still updates the title', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.chapter-doors')).toBeHidden();
  await page.locator('#education').scrollIntoViewIfNeeded();
  await expect(title(page)).toHaveAttribute('aria-label', 'EDUCATION');
});
