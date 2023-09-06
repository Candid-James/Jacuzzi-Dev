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
    el.style.display = '';
  });
}

/**
 * Show all elements that have the pricingFalseTag.
 *
 * Similar to `showPricingTrueTag`, this function makes elements in the
 * `pricingFalseTag` list visible. Despite its name, it uses the
 * `pricingTrueTag` parameter. It seems like a potential error
 * as the parameter name and function name don't align.
 *
 * @param {HTMLElement[]} pricingTrueTag - List of HTML elements to be displayed.
 *
 */
export function showPricingFalseTag(pricingFalseTag) {
  pricingFalseTag.forEach((el) => {
    el.style.display = '';
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
