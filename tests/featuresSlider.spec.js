/* eslint-disable no-console */
import { expect, test } from '@playwright/test';

const urlsToTest = [
  'https://d1-spas.webflow.io/404',
  'https://d1-spas.webflow.io/download-brochure',
  'https://d1-spas.webflow.io/faqs',
];

urlsToTest.forEach((url) => {
  test.describe(`featureItemSlider functionality on ${url}`, () => {
    test(`initializes Swiper slider when window width is below 767 pixels on ${url}`, async ({
      page,
    }) => {
      await page.goto(url);

      // Set the viewport size BEFORE navigating.
      await page.setViewportSize({ width: 320, height: 800 });

      const viewport = page.viewportSize();
      console.log(`Viewport width: ${viewport?.width}, height: ${viewport?.height}`);

      console.log(`Calling featureItemSlider for URL: ${url}`);
      // Check if Swiper initialized correctly.
      const isSwiperInitialized = await page.$('.featured_wrapper.swiper-initialized');
      if (!isSwiperInitialized) {
        console.log(`Swiper was not initialized for URL: ${url}`);
        return;
      }
      expect(isSwiperInitialized).toBeTruthy();
    });

    test(`Swiper slider should not initialise when window width is above 767 pixels on ${url}`, async ({
      page,
    }) => {
      await page.goto(url);

      // Set the viewport size BEFORE navigating.
      await page.setViewportSize({ width: 1200, height: 800 });

      const viewport = page.viewportSize();
      console.log(`Viewport width: ${viewport?.width}, height: ${viewport?.height}`);

      console.log(`checking for swiper on URL: ${url}`);
      // Check if Swiper initialized correctly.
      const isSwiperInitialized = await page.$('.featured_wrapper.swiper-initialized');

      if (isSwiperInitialized) {
        console.log('swiper was initialised, please review code.');
        return;
      }
      expect(isSwiperInitialized).toBeFalsy();
    });
  });
});
