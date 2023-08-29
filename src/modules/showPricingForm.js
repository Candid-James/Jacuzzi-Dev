const form = document.querySelectorAll('[j-element="reveal-pricing"]');

// Listen for form submit
form.forEach((el) => {
  el.addEventListener('submit', (el) => {
    // For AJAX to check whether the form submitted is from j-element="reveal-pricing" form
    $.ajax({
      'j-element': 'reveal-pricing',
    });
  });
});

// AJAX function to track successful form submission
$(document).ajaxSuccess(function (event, xhr, settings) {
  const isSuccessful = xhr.status === 200;
  // Check if the form submitted is form with j-element="reveal-pricing" attribute
  if (settings['j-element'] === 'reveal-pricing' && isSuccessful) {
    updateCookie('show-pricing', true);
    console.log('Show pricing cookie updated!');
    showPricingTrueTag();
  }
});
