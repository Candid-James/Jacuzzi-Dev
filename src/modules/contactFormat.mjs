/**
 * Validates the zip code based on the selected country code.
 * @param {HTMLElement} submitButton - The submit button element.
 * @param {HTMLSelectElement} countryCodeSelect - The select element for country code.
 * @param {HTMLInputElement} zipCodeInput - The input element for zip code.
 */

export function contactZipCodeValidation(submitButton, countryCodeSelect, zipCodeInput) {
  submitButton.addEventListener('click', function (event) {
    var countryCode = countryCodeSelect.value;
    var zipCode = zipCodeInput.value.trim();

    if (countryCode !== 'CA' && isValidCAZip(zipCode)) {
      alert('Please change country to Canada');
      event.preventDefault();
      return;
    }

    if (countryCode === 'US' && !isValidUSZip(zipCode)) {
      alert('Not a valid US ZIP');
      event.preventDefault();
      return;
    }

    if (countryCode === 'CA' && !isValidCAZip(zipCode)) {
      alert('Not a valid Canada ZIP');
      event.preventDefault();
      return;
    }
  });

  function isValidUSZip(zip) {
    var zipRegex = /^[0-9]{5}$/;

    return zipRegex.test(zip);
  }

  function isValidCAZip(zip) {
    var zipRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

    return zipRegex.test(zip);
  }
}
