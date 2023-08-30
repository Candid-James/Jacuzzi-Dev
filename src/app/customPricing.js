import { contactZipCodeValidation } from 'src/modules/contactFormat.mjs';

window.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('submitButton');
  const countryDropdown = document.getElementById('Custom-Pricing-Country-Code');
  const zipInput = document.getElementById('Custom-Pricing-Zip-Code');
  contactZipCodeValidation(button, countryDropdown, zipInput);
});
