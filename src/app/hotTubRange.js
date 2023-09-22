import { createFullHeightSlider } from 'src/modules/fullHeightSlider.mjs';
import { createHotTubOptionSlider } from 'src/modules/hotTubOptionSlider.mjs';
import { styleGridItems } from 'src/modules/styleGrid.js';

function initializeScript() {
  createHotTubOptionSlider();
  createFullHeightSlider();
  styleGridItems();
}

// Check if the DOM is already loaded
if (document.readyState === 'loading') {
  // DOM is still loading, use regular 'DOMContentLoaded' event listener
  window.addEventListener('DOMContentLoaded', () => {
    initializeScript;
  });
} else {
  // DOM is already loaded, execute the script immediately
  initializeScript();
}
