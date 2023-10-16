/* eslint-disable no-console*/

/**
 * Validates the zip code based on the selected country code.
 * @param {HTMLElement} submitButton - The submit button element.
 * @param {HTMLInputElement} zipCodeInput - The input element for zip code.
 */
function contactZipCodeValidation(form) {
  const salesforceForms = form.querySelector("[j-element='salesforce-form']");

  const submitButton = salesforceForms.querySelector('input[type="submit"]');

  submitButton.addEventListener('click', (event) => {
    console.log('submit clicked');
    var countryCode = document.querySelector("[j-element='country-code']").value;
    var zipCode = salesforceForms.querySelector('#zip').value.trim();

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
      alert('Not a valid Canadian ZIP');
      event.preventDefault();
      return;
    }

    if (countryCode === '') {
      const countryCodeWrapper = document.querySelector('.select_wrapper');
      const errorText = countryCodeWrapper.nextElementSibling;

      if (!errorText) {
        alert('Please select a country');
        event.preventDefault();
        return;
      }
      errorText.style.opacity = 1;
      event.preventDefault();
      return;
    }
  });
}

function isValidUSZip(zip) {
  var zipRegex = /^[0-9]{5}$/;

  return zipRegex.test(zip);
}

function isValidCAZip(zip) {
  var zipRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

  return zipRegex.test(zip);
}

window.addEventListener('DOMContentLoaded', () => {
  const formContainers = document.querySelectorAll('[j-element="form-container"]');
  formContainers.forEach((container) => {
    contactZipCodeValidation(container);
  });
});
