import { swapPriceButtons } from 'src/modules/showPricingFunctions.mjs';

window.addEventListener('DOMContentLoaded', () => {
  const clearButton = document.querySelector("[fs-cmsfilter-clear='range']");
  const rangeList = document.querySelector("[j-element='range-list']");

  rangeList.insertBefore(clearButton, rangeList.firstChild);

  swapPriceButtons();
});
