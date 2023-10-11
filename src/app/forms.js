// Success state for successfull form submission

function handleSuccessfulSubmission() {
  const successState = document.querySelector('.success-message');
  const form = document.querySelector('[j-element="salesforce-form"]');

  if (!successState) {
    return console.error('No success state found');
  }

  if (form && form.getAttribute('j-element') === 'salesforce-form') {
    form.addEventListener('submit', () => {
      successState.classList.add('is-submitted');
      form.classList.add('hide');
      const formParent = form.parentElement;
      formParent.classList.add('hide');
    });
  }
}

// mirror salesforce form inputs and button click to webflow-form form

function mirrorFormSubmit() {
  const salesforceForm = document.querySelector('form[j-element="salesforce-form"]');
  const webflowForm = document.querySelector('form[j-element="webflow-form"]');

  if (salesforceForm && webflowForm) {
    // mirror inputs
    const salesforceInputs = salesforceForm.querySelectorAll('input');
    const webflowInputs = webflowForm.querySelectorAll('input');

    salesforceInputs.forEach((input, index) => {
      input.addEventListener('change', () => {
        webflowInputs[index].value = input.value;
      });
    });

    // Handle multiple dropdowns
    const countryDropdowns = salesforceForm.querySelectorAll(
      '[fs-selectcustom-element="dropdown"]'
    );

    const webflowCountryDropdowns = webflowForm.querySelectorAll(
      '[fs-selectcustom-element="dropdown"]'
    );

    countryDropdowns.forEach((dropdown, dropdownIndex) => {
      const dropdownLinks = dropdown.querySelectorAll('.select_link');

      dropdownLinks.forEach((link, linkIndex) => {
        link.addEventListener('click', () => {
          // Mirror click on the corresponding webflow-form country dropdown link
          if (webflowCountryDropdowns[dropdownIndex]) {
            const webflowLinks =
              webflowCountryDropdowns[dropdownIndex].querySelectorAll('.select_link');
            if (webflowLinks[linkIndex]) {
              webflowLinks[linkIndex].click();
            }
          }
        });
      });
    });

    salesforceForm.addEventListener('submit', () => {
      webflowForm.requestSubmit();
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    handleSuccessfulSubmission();
    mirrorFormSubmit();
  }, 500);
});
