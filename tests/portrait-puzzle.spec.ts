import { test, expect, type Page } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

async function photoGeometry(page: Page) {
  return page.locator('.puzzle-stage').evaluate((stage) => {
    const photos = [...stage.querySelectorAll('.puzzle-photo')].map((photo) => photo.getBoundingClientRect());
    const texts = [...stage.querySelectorAll('.puzzle-gap')];
    return {
      gaps: photos.slice(1).map((photo, index) => photo.top - photos[index].bottom),
      revealed: texts.every((text, index) => {
        const bounds = text.getBoundingClientRect();
        return Number(getComputedStyle(text).opacity) > 0.99 &&
          bounds.top >= photos[index].bottom - 1 && bounds.bottom <= photos[index + 1].top + 1;
      }),
      overflow: document.documentElement.scrollWidth > window.innerWidth,
    };
  });
}

test('all four hero quadrants fit before scrolling and the ruler is hidden', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('#site-ruler')).toHaveAttribute('data-visible', 'false');
  const hero = await page.locator('.full-screen-poster').boundingBox();
  expect(hero!.y).toBe(0);
  expect(hero!.height).toBe(1000);
  for (const square of await page.locator('.poster-square').all()) {
    const bounds = await square.boundingBox();
    expect(bounds!.y).toBeGreaterThanOrEqual(0);
    expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(1001);
  }
});

for (const viewport of [{ name: 'desktop', width: 1440, height: 1000 }, { name: 'mobile', width: 390, height: 844 }]) {
  test(`photo separates to reveal text in real gaps and recomposes on ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('/');
    await page.locator('#get-to-know').scrollIntoViewIfNeeded();
    await expect(page.locator('#get-to-know')).toHaveAttribute('data-open', 'true');
    await expect.poll(async () => (await photoGeometry(page)).revealed).toBe(true);
    const open = await photoGeometry(page);
    expect(open.gaps).toHaveLength(5);
    for (const gap of open.gaps) expect(gap).toBeGreaterThan(30);
    expect(open.overflow).toBe(false);
    await expect(page.locator('#site-ruler')).toHaveAttribute('data-visible', 'true');
    const title = await page.locator('.know-title').boundingBox();
    expect(title!.x).toBeLessThan(110);
    expect(title!.y).toBeGreaterThan(0);
    for (const object of await page.locator('.know-title .word-object').all()) {
      await expect(object).toHaveCSS('opacity', '1');
    }
    await mkdir('artifacts/qa', { recursive: true });
    await page.screenshot({ path: `artifacts/qa/puzzle-open-${viewport.name}.png` });

    await page.getByRole('button', { name: 'Recomposer la photo' }).click();
    await expect.poll(async () => (await photoGeometry(page)).gaps.every((gap) => Math.abs(gap) < 1)).toBe(true);
    await page.screenshot({ path: `artifacts/qa/puzzle-closed-${viewport.name}.png` });
    await page.getByRole('button', { name: 'Révéler mon histoire' }).click();
    // Sample the 3D turn halfway through, then verify the settled readable composition.
    await page.waitForTimeout(1100);
    await page.screenshot({ path: `artifacts/qa/puzzle-turn-${viewport.name}.png` });
    await expect.poll(async () => (await photoGeometry(page)).revealed).toBe(true);
    expect(errors).toEqual([]);
  });
}

test('reduced motion reveals the text without rotating the photo', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.locator('#get-to-know').scrollIntoViewIfNeeded();
  await expect.poll(async () => (await photoGeometry(page)).revealed).toBe(true);
  const rotates = await page.locator('.puzzle-piece').evaluateAll((pieces) => pieces.some((piece) => getComputedStyle(piece).transform.includes('matrix3d')));
  expect(rotates).toBe(false);
});

test('an opened photo can still recompose after resizing the screen', async ({ page }) => {
  await page.goto('/');
  await page.locator('#get-to-know').scrollIntoViewIfNeeded();
  await expect.poll(async () => (await photoGeometry(page)).revealed).toBe(true);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect.poll(async () => (await photoGeometry(page)).revealed).toBe(true);
  await page.getByRole('button', { name: 'Recomposer la photo' }).click();
  await expect.poll(async () => (await photoGeometry(page)).gaps.every((gap) => Math.abs(gap) < 1)).toBe(true);
});
