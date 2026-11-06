import { test, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

for (const width of [1440,390]) {
  test(`notebook drops onto white and the pointing hand opens it at ${width}px`, async ({page}) => {
    await page.setViewportSize({width,height:1000});
    const errors: string[] = [];
    page.on('pageerror', e=>errors.push(e.message));
    await page.goto('/');
    await page.evaluate(()=>document.fonts.ready);
    await expect(page.locator('.education-flow,.paint-sheet,.flow-object')).toHaveCount(0);
    await expect(page.locator('.education-bridge')).toHaveCSS('background-image', 'none');
    await expect(page.locator('.education-bridge svg path')).toHaveCount(1);
    await mkdir('artifacts/qa',{recursive:true});
    await page.locator('#education').evaluate(e=>scrollTo(0,e.getBoundingClientRect().top+scrollY));
    await expect.poll(()=>page.locator('.journal-dust-particle').evaluateAll(particles=>particles.some(e=>Number(getComputedStyle(e).opacity)>.05)), { intervals: [50], timeout: 4000 }).toBe(true);
    await expect(page.locator('.journal-dust-particle')).toHaveCount(48);
    await expect(page.locator('.journal-heading')).toHaveCSS('opacity','0');
    await page.waitForTimeout(180);
    await page.screenshot({path:`artifacts/qa/education-dust-${width}.png`});
    await expect(page.getByRole('heading',{name:'Oops, too much knowledge.'})).toBeVisible();
    await expect.poll(()=>page.locator('.journal-dust-particle').evaluateAll(particles=>particles.every(e=>Number(getComputedStyle(e).opacity)<.01))).toBe(true);
    await expect(page.locator('#education')).toHaveCSS('background-color','rgb(255, 255, 255)');
    await expect(page.locator('.journal-scene')).toHaveAttribute('data-open','false');
    await expect(page.locator('.journal-pointer-art')).toHaveCSS('opacity','1');
    await expect.poll(()=>page.locator('.journal-falling').evaluate(e=>Math.abs(new DOMMatrix(getComputedStyle(e).transform).m42))).toBeLessThan(.1);
    await expect(page.locator('.journal-pointer-art')).toHaveAttribute('data-pose','viewer');
    await page.screenshot({path:`artifacts/qa/education-hand-viewer-${width}.png`});
    await expect(page.locator('.journal-pointer-art')).toHaveAttribute('data-pose','book');
    expect(await page.locator('.journal-pointer-art img').evaluateAll(images=>images.every(e=>(e as HTMLImageElement).complete && (e as HTMLImageElement).naturalWidth>0))).toBe(true);
    await mkdir('artifacts/qa',{recursive:true});
    await expect.poll(()=>page.locator('.letter-drip').evaluateAll(drips=>drips.every(e=>new DOMMatrix(getComputedStyle(e).transform).m22>.99))).toBe(true);
    await page.screenshot({path:`artifacts/qa/education-drop-${width}.png`});
    const hand = page.locator('.journal-pointer-gesture');
    const first = await hand.evaluate(e=>getComputedStyle(e).transform);
    await page.waitForTimeout(450);
    expect(await hand.evaluate(e=>getComputedStyle(e).transform)).not.toBe(first);
    await expect.poll(()=>page.locator('.journal-dust-particle').evaluateAll(particles=>particles.every(e=>Number(getComputedStyle(e).opacity)<.01))).toBe(true);
    await page.getByRole('button',{name:'Discover my education — open the book'}).click();
    await expect(page.locator('.journal-scene')).toHaveAttribute('data-open','true');
    await expect(page.locator('.journal-pointer')).toHaveAttribute('data-hidden','true');
    expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)).toBe(false);
    expect(errors).toEqual([]);
  });
}
