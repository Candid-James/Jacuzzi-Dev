import { initGoogleReviews } from 'src/modules/reviewApi.mjs';
import { initReviewSlider } from 'src/modules/reviewSlider.mjs';

window.addEventListener('DOMContentLoaded', () => {
  initGoogleReviews(initReviewSlider);
});
