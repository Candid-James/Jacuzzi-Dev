import { contactZipCodeValidation } from 'src/modules/contactFormat.mjs';
import { featureItemSlider } from 'src/modules/featuredItemSlider.mjs';

window.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('submitButton');
  const countryDropdown = document.getElementById('Download-Brochure-Country-Code');
  const zipInput = document.getElementById('Download-Brochure-Zip-Code');
  contactZipCodeValidation(button, zipInput);
  featureItemSlider();
});
