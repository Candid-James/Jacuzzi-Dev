import { createFeaturedArticleSlider } from 'src/modules/featuredArticleSlider.js';

/**
 * Handles the dynamic fetching and display of "pop-out" articles in a modal.
 * When a specific button is hovered over or clicked, the article content is fetched
 * and subsequently displayed within a modal.
 */
export function setPopOutArticles() {
  // Define the container where the fetched article content will be displayed.
  const contentContainer = document.querySelector('.simple-article-content-main');

  // Define the modal wrapper, which will encase the content and dim the background when displayed.
  const modalWrapper = document.querySelector('.simple-article-wrapper-main');

  // Add an event listener to the modal wrapper to handle potential closing of the modal.
  modalWrapper.addEventListener('click', handleModalClick);

  // Identify all buttons that could potentially trigger the fetching/display of an article.
  const button = document.querySelectorAll("[j-element='popout-trigger']");

  // A variable to store prefetched article data, ensuring that data isn't fetched more than once.
  let prefetchedData = null;

  // Attach event listeners for 'mouseover' (to prefetch data) and 'click' (to display data) for each identified button.
  button.forEach((e) => {
    e.addEventListener('mouseover', handlePrefetch);
    e.addEventListener('click', handleClick);
  });

  // Prefetches article content when the user hovers over the button.
  function handlePrefetch(event) {
    event.preventDefault();
    const url = event.currentTarget.href;

    // If data is already prefetched for this URL, we skip the rest of the function to avoid redundant network calls.
    if (prefetchedData && prefetchedData.url === url) return;

    try {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error('HTTP error! status: ' + response.status);
          }
          return response.text();
        })
        .then((html) => {
          const container = document.createElement('div');
          container.innerHTML = html;
          // Store the main content from the fetched HTML in the prefetchedData variable for later use.
          prefetchedData = { content: container.querySelector('.main-wrapper'), url: url };
        });
    } catch (error) {
      console.error('An error occurred while prefetching the article:', error);
    }
  }

  // Handles the button click to either use prefetched article content or fetch it if not available.
  function handleClick(e) {
    e.preventDefault();
    const url = e.currentTarget.href;

    const contentContainerChildren = contentContainer.querySelectorAll('.main-wrapper');

    contentContainerChildren.forEach((e) => {
      e.remove();
    });

    // If the article was prefetched and matches the clicked button's URL, use that data.
    if (prefetchedData && prefetchedData.url === url) {
      updatePageWithNewData(prefetchedData.content);
      // canRun = false;
      return;
    }
    // If no prefetched data is available, fetch the article content now.
    try {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error('HTTP error! status: ' + response.status);
          }
          return response.text();
        })
        .then((html) => {
          const container = document.createElement('div');
          container.innerHTML = html;
          const data = container.querySelector('.main-wrapper');

          // Display the fetched article in the modal.
          modalWrapper.classList.add('is-open');
          contentContainer.appendChild(data);
          createFeaturedArticleSlider();
          return;
        });
    } catch (error) {
      console.error('An error occurred while fetching the article:', error);
    }
    // canRun = true;
    return;
  }

  // Update the modal's content with the prefetched/fetched data.
  function updatePageWithNewData(data) {
    modalWrapper.classList.add('is-open');
    contentContainer.appendChild(data);
    createFeaturedArticleSlider();
  }

  // Handle the potential closing of the modal.
  function handleModalClick(e) {
    if (e.target === modalWrapper) {
      modalClose(contentContainer);
    }
  }

  // Close the modal and clear its content.
  function modalClose() {
    modalWrapper.classList.remove('is-open');
  }
}
