import { test, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

for (const viewport of [{width:1440,height:1000},{width:390,height:844}]) {
  test(`education journal opens, turns and closes on scroll at ${viewport.width}px`, async ({page}) => {
    await page.setViewportSize(viewport);
    const errors: string[] = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    await page.locator('#education').evaluate(e => window.scrollTo(0, e.getBoundingClientRect().top + scrollY));
    await expect(page.locator('.know-title')).toHaveAttribute('data-section','education');
    const scene = page.locator('.journal-scene');
    await expect(scene).toHaveAttribute('data-open','false');
    await page.getByRole('button',{name:'Open my education journal',exact:true}).last().click();
    await expect(scene).toHaveAttribute('data-open','true');
    await expect(page.getByRole('heading',{name:'Cégep de Sorel-Tracy',exact:true})).toBeVisible();
    await page.waitForTimeout(1200);
    await mkdir('artifacts/qa',{recursive:true});
    await page.screenshot({path:`artifacts/qa/education-cegep-${viewport.width}.png`});
    await page.getByRole('button',{name:'Next education page'}).click();
    await expect(page.getByRole('heading',{name:'All Saints Bilingual College',exact:true})).toBeVisible();
    await page.waitForTimeout(900);
    await page.screenshot({path:`artifacts/qa/education-asbc-${viewport.width}.png`});
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
    await page.locator('#education').evaluate(e => window.scrollTo(0,e.getBoundingClientRect().top + scrollY + (e.clientHeight-innerHeight)*.9));
    await expect(scene).toHaveAttribute('data-closing','true');
    await expect(scene).toHaveAttribute('data-open','false');
    await page.waitForTimeout(1200);
    await page.screenshot({path:`artifacts/qa/education-closed-${viewport.width}.png`});
    await expect(page.locator('.journal-brush')).toHaveAttribute('data-visible','true');
    expect(errors).toEqual([]);
  });
}

test('the journal remains usable with reduced motion and keyboard controls', async ({page}) => {
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/#education');
  const opener = page.getByRole('button',{name:'Open my education journal',exact:true}).last();
  await opener.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.journal-scene')).toHaveAttribute('data-open','true');
  await page.getByRole('button',{name:'Next education page'}).focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading',{name:'All Saints Bilingual College',exact:true})).toBeVisible();
  await page.getByRole('button',{name:'Close the book',exact:true}).click();
  await expect(page.locator('.journal-scene')).toHaveAttribute('data-open','false');
});
