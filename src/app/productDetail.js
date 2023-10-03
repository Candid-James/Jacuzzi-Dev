import { setPopOutArticles } from 'src/modules/articlePopOut.mjs';
import { getCookieValue } from 'src/modules/showPricingFunctions.mjs';
import { styleGridItems } from 'src/modules/styleGrid.js';

window.addEventListener('DOMContentLoaded', function () {
  if (getCookieValue('show-pricing')) {
    const hideElements = document.querySelectorAll("[j-element='hide-pricing']");
    const altButton = document.querySelector("[j-element='pricing-trigger']");
    altButton.textContent = 'Find a dealer';
    altButton.setAttribute('href', '/find-a-dealer');
    altButton.setAttribute('j-element', '');
    hideElements.forEach((e) => {
      e.remove();
    });
  }

  // Call the function to style the grid items
  styleGridItems();
  setPopOutArticles();
});
