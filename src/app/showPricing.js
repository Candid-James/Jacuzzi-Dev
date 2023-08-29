// Get all dom elements
const pricingTrueTag = document.querySelectorAll('[j-element="show-pricing-true"]');
const pricingFalseTag = document.querySelectorAll('[j-element="show-pricing-false"]');

function hidePricingTag() {
  // Hide both pricing tags
  pricingTrueTag.forEach((el) => {
    el.style.display = 'none';
  });

  pricingFalseTag.forEach((el) => {
    el.style.display = 'none';
  });
}

function showPricingTrueTag() {
  pricingTrueTag.forEach((el) => {
    el.style.display = '';
  });
}

function showPricingFalseTag() {
  pricingFalseTag.forEach((el) => {
    el.style.display = '';
  });
}

// Function to update cookie's value
function updateCookie(cookieName, newValue) {
  //create cookies if not exist
  if (!document.cookie.includes(cookieName)) {
    document.cookie = `${cookieName}=${newValue}; path=/`;
  }
}

function getCookieValue(cookieName) {
  // Split the cookie string into individual cookies
  var cookies = document.cookie.split(';');
  // Iterate over the cookies to find the one with the specified name
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    // Check if the cookie starts with the specified name
    if (cookie.indexOf(cookieName + '=') === 0) {
      // Extract and return the cookie value
      return cookie.substring(cookieName.length + 1);
    }
  }
  // Return null if the cookie is not found
  return null;
}

// check for cookie
function checkCookie() {
  if (getCookieValue('show-pricing')) {
    showPricingTrueTag();
  } else {
    showPricingFalseTag();
  }
}

// Default behavior :
// All pricing tag with j-element="show-pricing" is set to display none
// Check for show-pricing cookies, if true then pricing tag will be shown
var Webflow = Webflow || [];
window.addEventListener('DOMContentLoaded', () => {
  // Webflow is done loading
  function defaultBehaviour() {
    hidePricingTag();
    checkCookie();
  }
  defaultBehaviour();
});
