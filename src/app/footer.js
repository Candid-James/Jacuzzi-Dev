if (window.innerWidth < 767) {
  const triggers = document.querySelectorAll('.footer_dropdown-trigger');

  triggers.forEach((e) => {
    e.addEventListener('click', (e) => {
      const wrapper = e.currentTarget;
      wrapper.classList.toggle('is-active');
    });
  });
}
