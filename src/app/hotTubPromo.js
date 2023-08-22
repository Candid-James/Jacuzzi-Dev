const showButton = document.getElementById('show-contact-form');

showButton.addEventListener('click', (e) => {
  const form = document.querySelector('.section_contact');
  form.classList.remove('is-closed');
});
