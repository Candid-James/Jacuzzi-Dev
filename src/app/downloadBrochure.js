import { contactZipCodeValidation } from 'src/modules/contactFormat.js';

window.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('submitButton');
  const countryDropdown = document.getElementById('Download-Bochure-Country-Code');
  const zipInput = document.getElementById('Download-Bochure-Zip-Code');
  contactZipCodeValidation(button, countryDropdown, zipInput);
});
