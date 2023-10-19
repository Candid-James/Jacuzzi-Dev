// Function to get URL parameters by name
function getUrlParameter(name) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  var results = regex.exec(window.location.href);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Check if gclid and utm_campaign are present in the URL
var gclidValue = getUrlParameter('gclid');
var utmCampaignValue = getUrlParameter('utm_campaign');

if (gclidValue) {
  // Store gclid in a cookie with a 30-day expiration
  document.cookie =
    'gclid=' +
    gclidValue +
    '; expires=' +
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString() +
    '; path=/';
}

if (utmCampaignValue) {
  // Store utm_campaign in a cookie with a 30-day expiration
  document.cookie =
    'utm_campaign=' +
    utmCampaignValue +
    '; expires=' +
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString() +
    '; path=/';
}

// Function to retrieve the value of a cookie by name
function getCookie(cookieName) {
  var name = cookieName + '=';
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookieArray = decodedCookie.split(';');
  for (var i = 0; i < cookieArray.length; i++) {
    var cookie = cookieArray[i].trim();
    // eslint-disable-next-line eqeqeq
    if (cookie.indexOf(name) == 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return '';
}

// Function to update the hidden fields with cookie values
function updateHiddenFields() {
  var gclidField = document.getElementById('GCLID');
  var utmCampaignField = document.getElementById('UTM_URL__c');

  // Get the values from cookies
  var gclidCookie = getCookie('gclid');
  var utmCampaignCookie = getCookie('utm_campaign');

  // Set the hidden field values
  if (gclidCookie) {
    gclidField.value = gclidCookie;
  }

  if (utmCampaignCookie) {
    utmCampaignField.value = utmCampaignCookie;
  }
}

// Call the updateHiddenFields function on page load
window.addEventListener('load', updateHiddenFields);
