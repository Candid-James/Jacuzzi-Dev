/**
 * Show all elements that have the pricingTrueTag.
 *
 * This function iterates over each element in the `pricingTrueTag` list
 * and sets its style's display property to an empty string, which
 * effectively makes the element visible if it was previously hidden.
 *
 * @param {HTMLElement[]} pricingTrueTag - List of HTML elements to be displayed.
 */
export function showPricingTrueTag(pricingTrueTag) {
  pricingTrueTag.forEach((el) => {
    el.style.display = 'block';
  });
}

/**
 * Show all elements that have the pricingFalseTag.
 *
 * Similar to `showPricingTrueTag`, this function makes elements in the
 * `pricingFalseTag` list visible. Despite its name, it uses the
 *
 * @param {HTMLElement[]} falseTag - List of HTML elements to be displayed.
 *
 */
export function showPricingFalseTag(falseTag) {
  falseTag.forEach((el) => {
    el.style.display = 'block';
  });
}

/**
 * Update or set the value of a cookie.
 *
 * This function first checks if the specified cookie already exists.
 * If the cookie does not exist, it creates the cookie with the
 * given name and value. Note that if the cookie already exists,
 * this function does NOT update its value, which might not be the
 * desired behavior given the function's name.
 *
 * @param {string} cookieName - Name of the cookie to be set or updated.
 * @param {string} newValue - New value to be assigned to the cookie.
 *
 * @note This function only creates a new cookie but doesn't
 *       update the value of an existing cookie.
 */
export function updateCookie(cookieName, newValue) {
  // create cookies if not exist
  if (!document.cookie.includes(cookieName)) {
    document.cookie = `${cookieName}=${newValue}; path=/`;
  }
}

/**
 * Function to retrieve the value of a given cookie by its name.
 *
 * @returns {string|null} - The value of the cookie or null if not found.
 */
export function getCookieValue(cookieName) {
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

export function swapPriceButtons() {
  if (getCookieValue('show-pricing')) {
    const hideElements = document.querySelectorAll("[j-element='hide-pricing']");
    const altButton = document.querySelector("[j-element='pricing-trigger']");

    if (altButton) {
      altButton.textContent = 'Find a dealer';
      altButton.setAttribute('href', '/find-a-dealer');
      altButton.setAttribute('j-element', '');
    }

    if (hideElements) {
      hideElements.forEach((e) => {
        e.remove();
      });
    }
  }
}
