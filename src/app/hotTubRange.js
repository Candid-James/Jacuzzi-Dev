import { createFullHeightSlider } from 'src/modules/fullHeightSlider.mjs';
import { createHotTubOptionSlider } from 'src/modules/hotTubOptionSlider.mjs';
import { styleGridItems } from 'src/modules/styleGrid.js';

function initializeScript() {
  styleGridItems();
  createHotTubOptionSlider();
  createFullHeightSlider();
}

// Check if the DOM is already loaded
if (document.readyState === 'loading') {
  // DOM is still loading, use regular 'DOMContentLoaded' event listener
  window.addEventListener('DOMContentLoaded', () => {
    console.log('cold start');
    initializeScript();
  });
} else {
  // DOM is already loaded, execute the script immediately
  console.log('hot load');
  initializeScript();
}
