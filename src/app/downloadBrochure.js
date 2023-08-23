import { contactZipCodeValidation } from 'src/modules/contactFormat.js';

window.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('submitButton');
  const countryDropdown = document.getElementById('Download-Brochure-Country-Code');
  const zipInput = document.getElementById('Download-Brochure-Zip-Code');
  contactZipCodeValidation(button, countryDropdown, zipInput);
});
