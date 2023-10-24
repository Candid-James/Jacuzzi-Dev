window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const formContainers = document.querySelectorAll('[j-element="form-container"]');
    formContainers.forEach((container) => {
      handleSuccessfulSubmission(container);
      mirrorFormSubmit(container);
      redirectAttribute(container);
      errorStates(container);
    });
  }, 500);
});

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

  const submitButton =
    salesforceForm.querySelector('input[type="submit"]') ||
    salesforceForm.querySelector('button[type="submit"]');

  if (!submitButton) return console.error('no submit button');

  const salesforceInputs = salesforceForm.querySelectorAll('input, select');
  const webflowInputs = webflowForm.querySelectorAll('input, select');

  salesforceInputs.forEach((input, index) => {
    input.addEventListener('change', () => {
      webflowInputs[index].value = input.value;
    });
  });

  salesforceForm.addEventListener('submit', () => {
    webflowForm.requestSubmit();
  });
}

function redirectAttribute(formContainer) {
  const salesforceForm = formContainer.querySelector('form[j-element="salesforce-form"]');

  if (salesforceForm.getAttribute('redirect') === 'true') {
    const timeout = salesforceForm.getAttribute('timeout') || 750;
    salesforceForm.addEventListener('submit', () => {
      setTimeout(() => {
        // Redirect to a relative URL path
        window.location.href = '/thank-you';
      }, timeout);
    });
  } else return;
}

function errorStates(formContainer) {
  // Get the button element
  const sfForm = formContainer.querySelector("[j-element='salesforce-form']");
  const button = sfForm.querySelector('input[type="submit"]');

  // Add event listener to button click
  button.addEventListener('click', () => {
    // Get all select fields
    const selectFields = formContainer.querySelectorAll('select');

    // Loop through select fields
    selectFields.forEach((select) => {
      // Check if first option is selected
      if (select.selectedIndex === 0) {
        const parent = select.closest('.form-input.is-select-input.w-dropdown');

        // Apply red outline to parent dropdown list element
        parent.style.border = '1px solid #dc2217';
      } else {
        const parent = select.closest('.form-input.is-select-input.w-dropdown');

        // Apply red outline to parent dropdown list element
        parent.style.border = '1px solid rgba(2, 7, 13, 0.2)';
      }
    });
  });
}
