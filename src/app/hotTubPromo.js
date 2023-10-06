import { contactZipCodeValidation } from 'src/modules/contactFormat.mjs';

window.addEventListener('DOMContentLoaded', () => {
  const showButton = document.getElementById('show-contact-form');

  showButton.addEventListener('click', () => {
    const form = document.querySelector('.section_contact');
    form.classList.remove('is-closed');
  });

  const submitButton = document.getElementById('submitButton');
  const zipCode = document.getElementById('zip');

  contactZipCodeValidation(submitButton, zipCode);
});
