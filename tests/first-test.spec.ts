import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://qaplayground.com/practice/buttons');
  await expect(page).toHaveTitle(/Button Automation Practice/);  
})

test('has title', async ({ page }) => {
  var spanText = await page.locator('#result-s01').textContent()
  console.log(`span text is: ${spanText}`);
  expect(spanText).toEqual('No navigation yet');

  await page.locator('#navigateHomeBtn').click();
  spanText = await page.locator('#result-s01').textContent();
  expect(spanText).toEqual('Navigated to Home Page');
});

test('double click button test', async ({ page }) => {
    var spanText = await page.locator('#result-s07').textContent()
    expect(spanText).toEqual('Not double-clicked yet');

    await page.locator('#doubleClickBtn').dblclick();
    spanText = await page.locator('#result-s07').textContent()
    expect(spanText).toEqual('Double clicked!');
})

test('hold button test', async ({ page }) => {
    var spanText = await page.locator('#result-s06').textContent()
    expect(spanText).toEqual('Not held yet');

    const holdButton = page.locator('#clickHoldBtn');
    await holdButton.hover();
    await page.mouse.down();

    try {
        await page.waitForTimeout(1500);
    } finally {
        await page.mouse.up();
    }

    spanText = await page.locator('#result-s06').textContent()
    expect(spanText).toEqual('Held for 1.5s');
})