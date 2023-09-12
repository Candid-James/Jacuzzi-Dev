import { contactZipCodeValidation } from 'src/modules/contactFormat.mjs';

window.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('submitButton');
  const zipInput = document.getElementById('Contact-Form-Zip-Code-2');
  contactZipCodeValidation(button, zipInput);
});
