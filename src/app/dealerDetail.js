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
  const children = gridContainer.children;

  if (children.length === 5) {
    console.log('there is 5');
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
    console.log('there is 4');

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
