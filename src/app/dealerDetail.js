import { getCookieValue } from 'src/modules/showPricingFunctions.mjs';

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

function styleGridItems() {
  const gridContainer = document.querySelector('#features-grid'); // Replace with the appropriate selector for your grid container
  const { children } = gridContainer;

  if (children.length === 5) {
    // Apply styles for 5 elements
    children[0].style.cssText = `
            grid-column-start: span 4;
            grid-column-end: span 4;
            grid-row-start: span 1;
            grid-row-end: span 1;
        `;

    children[1].style.cssText = `
            grid-column-start: span 8;
            grid-column-end: span 8;
            grid-row-start: span 1;
            grid-row-end: span 1;
        `;

    children[2].style.cssText = `
            grid-column-start: span 12;
            grid-column-end: span 12;
            grid-row-start: span 1;
            grid-row-end: span 1;
        `;

    children[3].style.cssText = `
            grid-column-start: span 8;
            grid-column-end: span 8;
            grid-row-start: span 1;
            grid-row-end: span 1;
        `;

    children[4].style.cssText = `
            grid-column-start: span 4;
            grid-column-end: span 4;
            grid-row-start: span 1;
            grid-row-end: span 1;
        `;
  } else if (children.length === 4) {
    // Apply styles for the remaining 4 elements
    children[0].style.cssText = `
            grid-column-start: span 4;
            grid-column-end: span 4;
            grid-row-start: span 1;
            grid-row-end: span 1;
        `;

    children[1].style.cssText = `
            grid-column-start: span 8;
            grid-column-end: span 8;
            grid-row-start: span 1;
            grid-row-end: span 1;
        `;

    children[2].style.cssText = `
            grid-column-start: span 8;
            grid-column-end: span 8;
            grid-row-start: span 1;
            grid-row-end: span 1;
        `;

    children[3].style.cssText = `
            grid-column-start: span 4;
            grid-column-end: span 4;
            grid-row-start: span 1;
            grid-row-end: span 1;
        `;
  }
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
