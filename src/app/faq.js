import { featureItemSlider } from 'src/modules/featuredItemSlider.mjs';

window.addEventListener('DOMContentLoaded', () => {
  featureItemSlider();
  const faqLinks = document.querySelectorAll('.split-section_item');

  for (let i = 0; i < faqLinks.length; i++) {
    faqLinks[i].addEventListener('click', (e) => {
      const elementTarget = e.currentTarget;
      if (elementTarget.classList.contains('is-open')) {
        elementTarget.classList.remove('is-open');
      } else {
        elementTarget.classList.add('is-open');
      }
    });
  }
});
