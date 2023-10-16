window.addEventListener('DOMContentLoaded', () => {
  const showButton = document.getElementById('show-contact-form');

  showButton.addEventListener('click', () => {
    const form = document.querySelector('.section_contact');
    form.classList.remove('is-closed');
  });
});
