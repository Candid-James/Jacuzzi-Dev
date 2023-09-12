import { getCookieValue } from 'src/modules/showPricingFunctions.mjs';

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
