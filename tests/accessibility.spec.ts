const { test, expect } = require('./accessibility-base');
import { createHtmlReport } from 'axe-html-reporter';
const fs = require('fs');

test.describe('Amefa Homepage', () => {
  test('has no accessibility issues', async ({ page, makeAxeBuilder }) => {
    await page.goto('/');
    const accessibilityScanResults = await makeAxeBuilder().analyze();

    const reportHTML = createHtmlReport({
      results: accessibilityScanResults,
      options: {
        projectKey: "Amefa Homepage"
      },
    });

    if (!fs.existsSync("build/reports/accessibility-report.html")) {
      fs.mkdirSync("build/reports", {
        recursive: true,
      });
    }
    fs.writeFileSync("build/reports/accessibility-report.html", reportHTML);

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

// test.describe('homepage', () => {
//   test.beforeEach(async({page}) => {
//     await page.goto('/');
//   });
//
//   test('should not have any color-contrast issues', async ({ page, makeAxeBuilder }) => {
//
//     const accessibilityScanResults = await makeAxeBuilder()
//       .withRules('color-contrast')
//       .analyze();
//
//     expect(accessibilityScanResults.violations).toEqual([]);
//   });
//
//   test('should not have any missing alt-texts or roles on images', async ({ page, makeAxeBuilder }) => {
//     const accessibilityScanResults = await makeAxeBuilder()
//       .withRules('image-alt')
//       .analyze();
//
//     expect(accessibilityScanResults.violations).toEqual([]);
//   });
// });
//
// test.describe('The HeaderMenu', () => {
//   test.beforeEach(async({page}) => {
//     await page.goto('/');
//   });
//
//   test('should have the correct attributes when being opened', async ({page, makeAxeBuilder}, testInfo) => {
//     await page.getByRole('button', {name: 'Bestek'}).click();
//
//     await page.locator('#Details-HeaderMenu-1').waitFor();
//     const accessibilityScanResults = await makeAxeBuilder()
//       .include('#Details-HeaderMenu-1')
//       .include('#HeaderMenu-bestek')
//       .analyze();
//
//     expect(accessibilityScanResults.violations).toEqual([]);
//   });
// });