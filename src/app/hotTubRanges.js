import { setPopOutArticles } from 'src/modules/articlePopOut.mjs';
// import { createFullHeightSlider } from 'src/modules/fullHeightSlider.mjs';
import { createHotTubOptionSlider } from 'src/modules/hotTubOptionSlider.mjs';
import { swapPriceButtons } from 'src/modules/showPricingFunctions.mjs';
import { styleGridItems } from 'src/modules/styleGrid.js';

function initializeScript() {
  styleGridItems();
  createHotTubOptionSlider();
  setPopOutArticles();
  swapPriceButtons();
  // createFullHeightSlider();
}

// Check if the DOM is already loaded
if (document.readyState === 'loading') {
  // DOM is still loading, use regular 'DOMContentLoaded' event listener
  window.addEventListener('DOMContentLoaded', () => {
    initializeScript();
  });
} else {
  // DOM is already loaded, execute the script immediately
  initializeScript();
}
