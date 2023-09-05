// Importing required functions from the 'showPricingFunctions.mjs' module.
import { showPricingTrueTag, updateCookie } from 'src/modules/showPricingFunctions.mjs';

// Get all forms that have the 'j-element' attribute set to 'reveal-pricing'.
const form = document.querySelectorAll('[j-element="reveal-pricing"]');

// Get all elements that have the 'j-element' attribute set to 'show-pricing-true'.
const pricingTrueTag = document.querySelectorAll('[j-element="show-pricing-true"]');

// Get all buttons that have the 'j-element' attribute set to 'pricing-trigger'.
const triggerButtons = document.querySelectorAll('[j-element="pricing-trigger"]');

// Get the modal with the class 'simple-article-wrapper'.
const modal = document.querySelector('.simple-article-wrapper');

// Get the close button element for the modal.
const closeButton = document.querySelector("[j-element='modal-close']");

// Add click event listeners to all trigger buttons.
// Toggle the 'is-open' class on the modal to show/hide it.
triggerButtons.forEach((e) => {
  e.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.toggle('is-open');
  });
});

// Add click event listener to the close button of the modal.
// Removes the 'is-open' class to close the modal.
closeButton.addEventListener('click', (e) => {
  e.preventDefault();
  modal.classList.remove('is-open');
});

// Add submit event listeners to all the forms.
// On form submission, an AJAX request is triggered using jQuery
// with a custom 'j-element' attribute to check which form is being submitted.
form.forEach((el) => {
  el.addEventListener('submit', () => {
    $.ajax({
      'j-element': 'reveal-pricing',
    });
  });
});

// Listen for successful AJAX requests on the document using jQuery.
// If the request is successful and corresponds to the 'reveal-pricing' form,
// Update a cookie named 'show-pricing' to 'true' and show the correct pricing tag.
$(document).ajaxSuccess(function (event, xhr, settings) {
  const isSuccessful = xhr.status === 200;

  // If the AJAX request corresponds to the form with 'j-element' set to 'reveal-pricing'
  // and the request was successful, perform the following:
  if (settings['j-element'] === 'reveal-pricing' && isSuccessful) {
    // Update the 'show-pricing' cookie's value to 'true'.
    updateCookie('show-pricing', true);

    // Call the helper function to display the correct pricing tag elements.
    showPricingTrueTag(pricingTrueTag);
  }
});
