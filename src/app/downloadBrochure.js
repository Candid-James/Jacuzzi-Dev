import { contactZipCodeValidation } from 'src/modules/contactFormat.mjs';
import { featureItemSlider } from 'src/modules/featuredItemSlider.mjs';

window.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('submitButton');
  const zipInput = document.getElementById('zip');
  contactZipCodeValidation(button, zipInput);
  featureItemSlider();
});
