// Function to get URL parameters by name
function getUrlParameter(name) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  var results = regex.exec(window.location.href);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function setCookie(cookieName, cookieValue) {
  console.log('setting value for', cookieName);
  var expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie =
    encodeURIComponent(cookieName) +
    '=' +
    encodeURIComponent(cookieValue) +
    '; expires=' +
    expires +
    '; path=/';
}

// Check if utm_campaign is present in the URL
var utmCampaignValue = getUrlParameter('utm_campaign');
var gclidValue = getUrlParameter('gclid');

if (utmCampaignValue) {
  // Store the entire URL as the value of utm_campaign cookie
  setCookie('utm_campaign', decodeURIComponent(window.location.href));
}

// Check if gclid and utm_campaign are present in the URL

if (gclidValue) {
  setCookie('gclid', gclidValue);
}

// Function to retrieve the value of a cookie by name
function getCookie(cookieName) {
  let name = cookieName + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let cookieArray = decodedCookie.split(';');
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    // eslint-disable-next-line
    if (cookie.indexOf(name) == 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return '';
}

// Function to update the hidden fields with cookie values
function updateHiddenFields() {
  let gclidField = document.querySelectorAll('[data-id="gclid"]');
  let utmCampaignField = document.querySelectorAll('[data-id="utm"]');
  // Get the values from cookies
  let gclidCookie = getCookie('gclid');
  let utmCampaignCookie = getCookie('utm_campaign');

  // Set the hidden field values
  if (gclidCookie) {
    gclidField.forEach((e) => {
      e.value = gclidCookie;
    });
  }

  if (utmCampaignCookie) {
    utmCampaignField.forEach((e) => {
      e.value = utmCampaignCookie;
    });
  }
}

// Call the updateHiddenFields function on page load
window.addEventListener('load', updateHiddenFields);
