import { contactZipCodeValidation } from 'src/modules/contactFormat.mjs';

window.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('submitButton');
  const zipInput = document.getElementById('Custom-Pricing-Zip-Code');
  contactZipCodeValidation(button, zipInput);
});
