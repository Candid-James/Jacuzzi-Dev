import { createHotTubOptionSlider } from 'src/modules/hotTubOptionSlider.mjs';

// Check if the DOM is already loaded
if (document.readyState === 'loading') {
  // DOM is still loading, use regular 'DOMContentLoaded' event listener
  window.addEventListener('DOMContentLoaded', () => {
    createHotTubOptionSlider();
  });
} else {
  // DOM is already loaded, execute the script immediately
  createHotTubOptionSlider();
}
