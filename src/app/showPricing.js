// Import required functions from the 'showPricingFunctions.mjs' module.
import { showPricingFalseTag, showPricingTrueTag } from 'src/modules/showPricingFunctions.mjs';

// Select all elements with 'j-element' attribute set to 'show-pricing-true'.
const pricingTrueTag = document.querySelectorAll('[j-element="show-pricing-true"]');

// Select all elements with 'j-element' attribute set to 'show-pricing-false'.
const pricingFalseTag = document.querySelectorAll('[j-element="show-pricing-false"]');

/**
 * Function to hide both types of pricing tags.
 */
function hidePricingTag() {
  // Iterate through all elements of 'pricingTrueTag' and set their display style to 'none' (hidden).
  pricingTrueTag.forEach((el) => {
    el.style.display = 'none';
  });

  // Iterate through all elements of 'pricingFalseTag' and set their display style to 'none' (hidden).
  pricingFalseTag.forEach((el) => {
    el.style.display = 'none';
  });
}

/**
 * Function to retrieve the value of a given cookie by its name.
 *
 * @returns {string|null} - The value of the cookie or null if not found.
 */
function getCookieValue(cookieName) {
  // Split the document's cookie string into an array of individual cookies.
  var cookies = document.cookie.split(';');

  // Loop through each cookie.
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();

    // If the current cookie starts with the provided cookieName, extract its value.
    if (cookie.indexOf(cookieName + '=') === 0) {
      return cookie.substring(cookieName.length + 1);
    }
  }

  // If the specified cookie isn't found, return null.
  return null;
}

/**
 * Function to check the value of the 'show-pricing' cookie.
 * Depending on the value, it will either show the pricingTrueTag or the pricingFalseTag.
 */
function checkCookie() {
  if (getCookieValue('show-pricing')) {
    showPricingTrueTag();
  } else {
    showPricingFalseTag();
  }
}

// Default behavior when the website is loaded:
// All elements with 'j-element' attribute set to 'show-pricing' will be hidden by default.
// Then, the script will check for the 'show-pricing' cookie.
// If the cookie has a value of 'true', the pricingTrueTag will be displayed.
var Webflow = Webflow || [];
window.addEventListener('DOMContentLoaded', () => {
  // Function to define the default behavior.
  function defaultBehaviour() {
    // Hide all pricing tags by default.
    hidePricingTag();

    // Check for the 'show-pricing' cookie and display the appropriate tag.
    checkCookie();
  }

  // Execute the default behavior.
  defaultBehaviour();
});
