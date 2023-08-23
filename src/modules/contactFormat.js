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

    console.log('Country Code: ' + countryCode);
    console.log('ZIP Code: ' + zipCode);

    if (countryCode !== 'CA' && isValidCAZip(zipCode)) {
      console.log('Canadian ZIP detected with a non-Canada country code');
      alert('Please change country to Canada');
      event.preventDefault();
      return;
    }

    if (countryCode === 'US' && !isValidUSZip(zipCode)) {
      console.log('Invalid US ZIP detected');
      alert('Not a valid US ZIP');
      event.preventDefault();
      return;
    }

    if (countryCode === 'CA' && !isValidCAZip(zipCode)) {
      console.log('Invalid Canada ZIP detected');
      alert('Not a valid Canada ZIP');
      event.preventDefault();
      return;
    }
  });

  function isValidUSZip(zip) {
    var zipRegex = /^[0-9]{5}$/;
    console.log('Testing ZIP against US pattern: ' + zipRegex.test(zip));
    return zipRegex.test(zip);
  }

  function isValidCAZip(zip) {
    var zipRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    console.log('Testing ZIP against Canada pattern: ' + zipRegex.test(zip));
    return zipRegex.test(zip);
  }
}
