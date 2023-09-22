import { getCookieValue } from 'src/modules/showPricingFunctions.mjs';
import { styleGridItems } from 'src/modules/styleGrid.js';

if (getCookieValue('show-pricing')) {
  const hideElements = document.querySelectorAll("[j-element='hide-pricing']");
  const altButton = document.querySelector("[j-element='pricing-trigger']");
  altButton.textContent = 'Find a dealer';
  altButton.setAttribute('href', '/find-a-dealer');
  altButton.setAttribute('j-element', '');
  hideElements.forEach((e) => {
    e.remove();
  });
}

// Call the function to style the grid items
styleGridItems();

let lastScrollTop = 0;
let isNavHidden = false;
let isClosed = true;

// Get the specific section element
const specificSection = document.querySelector('.menu-bar_container');

// Calculate the offset position of the specific section relative to the top of the page
const specificSectionTop = specificSection.getBoundingClientRect().top + window.pageYOffset;

window.addEventListener('scroll', function () {
  let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const nav = document.querySelector('.nav');
  const navHeight = nav.offsetHeight;

  // Determine scroll direction
  if (currentScrollTop > lastScrollTop) {
    // Scrolling down
    if (!isNavHidden && currentScrollTop >= specificSectionTop) {
      gsap.to('.menu-bar_wrapper', { duration: 0.5, y: 0 });
      isNavHidden = true;
      isClosed = true;
    }
  } else {
    // Scrolling up
    if (isNavHidden || currentScrollTop === 0) {
      gsap.to('.menu-bar_wrapper', { duration: 0.5, y: navHeight });
      isNavHidden = false;
      isClosed = false;
    }

    // Check if scrolled up past the specific section
    if (currentScrollTop < specificSectionTop - 56 && isClosed === false) {
      gsap.to('.menu-bar_wrapper', { duration: 0.5, y: 0 });
      isClosed = true;
    }
  }

  lastScrollTop = currentScrollTop;
});
