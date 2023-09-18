import { initGoogleReviews } from 'src/modules/reviewApiAlt.mjs';
import { initReviewSlider } from 'src/modules/reviewSlider.mjs';

window.addEventListener('DOMContentLoaded', () => {
  initGoogleReviews(initReviewSlider);

  alert(
    'This is running client-side. The page may not load as google is denying our access to the api'
  );
});
