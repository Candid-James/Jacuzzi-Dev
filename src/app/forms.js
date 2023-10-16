window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const formContainers = document.querySelectorAll('[j-element="form-container"]');
    formContainers.forEach((container) => {
      handleSuccessfulSubmission(container);
      mirrorFormSubmit(container);
      redirectAttribute(container);
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

  console.log({ salesforceForm, webflowForm, submitButton });

  const salesforceInputs = salesforceForm.querySelectorAll('input, select');
  const webflowInputs = webflowForm.querySelectorAll('input, select');

  salesforceInputs.forEach((input, index) => {
    input.addEventListener('change', () => {
      console.log(input.value);
      webflowInputs[index].value = input.value;
      console.log(webflowInputs[index].value);
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
  }
}
