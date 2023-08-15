import { featureItemSlider } from 'src/utils/featuredItemSlider.js';

// Retrieve a specific element from another page and append it to the current page
function fetchAndAppendElement() {
  try {
    // Fetch the other page's HTML
    fetch('/404-page-not-indexed')
      .then((response) => {
        if (!response.ok) {
          throw new Error('HTTP error! status: ' + response.status);
        }
        return response.text();
      })
      .then((html) => {
        // Create a temporary container element to hold the fetched content
        var container = document.createElement('div');
        container.innerHTML = html;

        // Specify the selector for the element you want to fetch
        var fetchedElement = container.querySelector("[element-404='content']");

        if (fetchedElement) {
          var appendItem = document.querySelector("[element-404='wrapper']");
          // Clone the fetched element
          var clonedElement = fetchedElement.cloneNode(true);

          // Append the cloned element to the current page
          if (appendItem) {
            appendItem.appendChild(clonedElement);
          }
        } else {
          console.error('Failed to fetch the featured products.');
        }
      });
  } catch (error) {
    console.error('An error occurred while fetching and appending the featured products:', error);
  }
}
fetchAndAppendElement();

// Call the fetchAndAppendElement function when the page has finished loading
window.addEventListener('DOMContentLoaded', function () {
  featureItemSlider();
});
