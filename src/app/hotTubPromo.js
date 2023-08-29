import { contactZipCodeValidation } from 'src/modules/contactFormat.js';

window.addEventListener('DOMContentLoaded', () => {
  const showButton = document.getElementById('show-contact-form');

  showButton.addEventListener('click', () => {
    const form = document.querySelector('.section_contact');
    form.classList.remove('is-closed');
  });

  const submitButton = document.getElementById('submitButton');
  const countrySelect = document.getElementById('Hot-Tub-Promotion-Country-Code');
  const zipCode = document.getElementById('Hot-Tub-Promotion-Zip-Code');

  contactZipCodeValidation(submitButton, countrySelect, zipCode);
});
