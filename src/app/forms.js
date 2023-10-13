function handleSuccessfulSubmission(formContainer) {
  const successState = formContainer.querySelector('.success-message');
  const form = formContainer.querySelector('[j-element="salesforce-form"]');

  if (!successState) {
    return console.error('No success state found');
  }

  if (form) {
    form.addEventListener('submit', () => {
      successState.classList.add('is-submitted');
      const parentWrapper = form.parentNode;
      form.classList.add('hide');
      parentWrapper.classList.add('hide');
    });
  }
}

function mirrorFormSubmit(formContainer) {
  const salesforceForm = formContainer.querySelector('form[j-element="salesforce-form"]');
  const webflowForm = formContainer.querySelector('form[j-element="webflow-form"]');

  if (!salesforceForm || !webflowForm) return console.error('missing forms');

  const salesforceInputs = salesforceForm.querySelectorAll('input');
  const webflowInputs = webflowForm.querySelectorAll('input');

  salesforceInputs.forEach((input, index) => {
    input.addEventListener('change', () => {
      webflowInputs[index].value = input.value;
    });
  });

  const countryDropdowns = salesforceForm.querySelectorAll('[fs-selectcustom-element="dropdown"]');
  const webflowCountryDropdowns = webflowForm.querySelectorAll(
    '[fs-selectcustom-element="dropdown"]'
  );

  countryDropdowns.forEach((dropdown, dropdownIndex) => {
    const dropdownLinks = dropdown.querySelectorAll('.select_link');
    dropdownLinks.forEach((link, linkIndex) => {
      link.addEventListener('click', () => {
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

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const formContainers = document.querySelectorAll('[j-element="form-container"]');
    formContainers.forEach((container) => {
      handleSuccessfulSubmission(container);
      mirrorFormSubmit(container);
    });
  }, 500);
});
