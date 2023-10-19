export function styleGridItems() {
  const gridContainer = document.querySelector('#features-grid');
  const { children } = gridContainer;

  if (children.length === 5 && window.innerWidth > 767) {
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
  } else if (children.length === 4 && window.innerWidth > 767) {
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
