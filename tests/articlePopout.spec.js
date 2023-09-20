import { expect, test } from '@playwright/test';

import { setPopOutArticles } from './path/to/your/function';

test.describe('Pop-out articles', () => {
  let page;

  test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
  });

  test('Fetch and display article content in modal', async () => {
    // Execute your function to set up the event listeners
    await page.evaluate(setPopOutArticles);

    // Simulate mouseover event to prefetch article data
    await page.evaluate(() => {
      const buttons = document.querySelectorAll("button[j-element='popout-trigger']");
      buttons.forEach((button) => {
        button.dispatchEvent(new MouseEvent('mouseover'));
      });
    });

    // Wait for the prefetch to complete
    await page.waitForTimeout(200); // Adjust the timeout as needed

    // Simulate a button click to display the article in the modal
    await page.evaluate(() => {
      const buttons = document.querySelectorAll("button[j-element='popout-trigger']");
      buttons[0].dispatchEvent(new MouseEvent('click'));
    });

    // Verify that the modal is open and the article content exists
    const modalIsOpen = await page.isVisible('.simple-article-wrapper.is-open');
    const articleContentExists = await page.isVisible('.simple-article-content .main-wrapper');
    expect(modalIsOpen).toBeTruthy();
    expect(articleContentExists).toBeTruthy();
  });
});
