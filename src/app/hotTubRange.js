import { createFullHeightSlider } from 'src/utils/fullHeightSlider.mjs';
import { createHotTubOptionSlider } from 'src/utils/hotTubOptionSlider.mjs';

// Call the fetchAndAppendElement function when the page has finished loading
window.addEventListener('DOMContentLoaded', function () {
  createHotTubOptionSlider();
  createFullHeightSlider();
});
