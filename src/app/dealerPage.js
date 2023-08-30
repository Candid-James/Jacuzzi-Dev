import { initReviewSlider } from 'src/modules/reviewSlider.mjs';
import { initGoogleReviews } from 'src/modules/reviewApi.mjs';

window.addEventListener('DOMContentLoaded', () => {
  initGoogleReviews(initReviewSlider);
});
