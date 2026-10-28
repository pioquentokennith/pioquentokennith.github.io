import { test, expect } from '@playwright/test';

async function openNavigation(page) {
  const toggle = page.getByRole('button', { name: 'Open menu', exact: true });
  if (await toggle.isVisible()) await toggle.click();
}

test.beforeEach(async ({ page }) => {
  const errors = [];
  page.runtimeErrors = errors;
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('KENNITH ALBO');
});

test.afterEach(async ({ page }) => {
  expect(page.runtimeErrors).toEqual([]);
});

test('original sections, images, and responsive layout render', async ({ page }, testInfo) => {
  await expect(page.locator('main > section')).toHaveCount(6);
  for (const id of ['home', 'about', 'business', 'services', 'activities', 'contact']) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await expect(page.locator(`#${id} h1, #${id} h2`).first()).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  }
  // Decode every image, including lazy images, to detect missing migrated assets.
  const broken = await page.locator('main img').evaluateAll(async (images) => {
    const results = await Promise.all(images.map(async (image) => {
      image.loading = 'eager';
      try { await image.decode(); return null; } catch { return image.getAttribute('src'); }
    }));
    return results.filter(Boolean);
  });
  expect(broken).toEqual([]);
  const expectedColumns = testInfo.project.name === 'desktop' ? 3 : testInfo.project.name === 'tablet' ? 2 : 1;
  expect(await page.locator('.product-grid').evaluate((grid) => getComputedStyle(grid).gridTemplateColumns.split(' ').length)).toBe(expectedColumns);
  await page.getByRole('button', { name: 'Back to top', exact: true }).click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});

test('product filters, poster, and accessible dialog work', async ({ page }) => {
  const filters = page.getByRole('group', { name: 'Filter perfume products' });
  await expect(page.locator('.product-card')).toHaveCount(10);
  await filters.getByRole('button', { name: 'For Him', exact: true }).click();
  await expect(page.locator('.product-card')).toHaveCount(6);
  await filters.getByRole('button', { name: 'For Her', exact: true }).click();
  await expect(page.locator('.product-card')).toHaveCount(3);
  await expect(page.locator('#productResults')).toHaveText('Showing 3 scents for her.');
  const details = page.locator('.product-card').first().getByRole('button', { name: 'View Details' });
  await details.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toHaveAccessibleName('Ariana Grande Cloud Inspired details');
  await expect(dialog.getByRole('heading', { name: 'Ariana Grande Cloud Inspired', exact: true })).toBeVisible();
  await expect(dialog.getByRole('button', { name: 'Close details' })).toBeFocused();
  expect(await page.locator('#root').evaluate((root) => root.inert)).toBe(true);
  await page.keyboard.press('Shift+Tab');
  await expect(dialog.getByRole('link', { name: 'Contact to Order' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(dialog.getByRole('button', { name: 'Close details' })).toBeFocused();
  expect(await dialog.locator('img').evaluate(async (image) => { await image.decode(); return image.naturalWidth > 0; })).toBe(true);
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(details).toBeFocused();
  expect(await page.locator('#root').evaluate((root) => root.inert)).toBe(false);
  await filters.getByRole('button', { name: 'Unisex', exact: true }).click();
  await expect(page.locator('.product-card')).toHaveCount(1);
  await page.getByRole('button', { name: 'Browse Collection' }).click();
  await expect(page.locator('.product-card')).toHaveCount(10);
  const poster = page.getByRole('button', { name: 'Show back of KENSCENT poster' });
  await poster.click();
  await expect(page.getByRole('button', { name: 'Show front of KENSCENT poster' })).toBeVisible();
  await page.getByRole('button', { name: 'Show front of KENSCENT poster' }).press('ArrowLeft');
  await expect(poster).toBeVisible();
});

test('project categories support keyboard navigation and empty results', async ({ page }) => {
  const trigger = page.locator('#service-web');
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toHaveAccessibleName('Web Projects');
  await expect(dialog.locator('.project-card')).toHaveCount(2);
  await dialog.getByRole('tab', { name: 'Web', exact: true }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(dialog.getByRole('tab', { name: 'Mobile', exact: true })).toBeFocused();
  await expect(dialog.getByRole('tab', { name: 'Mobile', exact: true })).toHaveAttribute('aria-selected', 'true');
  await expect(dialog.getByRole('tabpanel')).toContainText('Mobile Projects are coming soon.');
  await page.keyboard.press('End');
  await expect(dialog.getByRole('heading', { name: 'KENSCENT Business POS' })).toBeVisible();
  await page.keyboard.press('Home');
  await expect(dialog.locator('.project-card')).toHaveCount(2);
  await dialog.getByRole('button', { name: 'Close projects' }).click();
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test('navigation, saved theme, and activity filtering work', async ({ page }) => {
  await openNavigation(page);
  await page.getByRole('button', { name: 'Dark theme', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await openNavigation(page);
  await page.getByRole('button', { name: 'Activities', exact: true }).click();
  await page.getByRole('link', { name: 'Finalterm', exact: true }).click();
  await expect(page).toHaveURL(/#activities$/);
  const activityFilters = page.getByRole('group', { name: 'Filter academic activities' });
  await expect(activityFilters.getByRole('button', { name: 'Finalterm' })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('searchbox', { name: 'Search activities' }).fill('React');
  await expect(page.locator('#activityEmpty')).toContainText('Soon To Be Announced');
  await openNavigation(page);
  await page.getByRole('button', { name: 'Services', exact: true }).click();
  await page.getByRole('link', { name: 'Web Development', exact: true }).click();
  await expect(page).toHaveURL(/#service-web$/);
  await expect(page.locator('#service-web')).toHaveClass(/is-focus-flash/);
  await openNavigation(page);
  await page.getByRole('link', { name: 'Contact', exact: true }).click();
  await expect(page.locator('#contact-title')).toBeFocused();
  await expect(page.getByRole('link', { name: 'Contact', exact: true })).toHaveAttribute('aria-current', 'location');
});

test('contact links and clipboard feedback work', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.getByRole('button', { name: 'Copy email address' }).click();
  await expect(page.locator('#toast')).toHaveText('Email copied to clipboard.');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('pioquentokennith@gmail.com');
  await page.getByRole('button', { name: 'Copy phone number' }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('0964 133 4715');
  await expect(page.getByRole('link', { name: 'Email Me', exact: true })).toHaveAttribute('href', 'mailto:pioquentokennith@gmail.com');
  await expect(page.getByRole('link', { name: 'Call Me', exact: true })).toHaveAttribute('href', 'tel:+639641334715');
});

test('animated dialog opening and dismissal work with motion enabled', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.locator('.product-card').first().getByRole('button', { name: 'View Details' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button', { name: 'Close details' }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.locator('#service-systems').click();
  await expect(page.getByRole('dialog')).toHaveAccessibleName('Projects & Systems');
  await page.locator('.modal-backdrop').click({ position: { x: 2, y: 2 } });
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.locator('#service-systems')).toBeFocused();
});
