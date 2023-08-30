// This function is responsible for handling "pop-out" articles.
// When a specific button is hovered over or clicked, it fetches the article content
// and displays it in a modal.

export function setPopOutArticles() {
  // Start a timer named 'popout' to measure the execution time of this function.

  // Select the container where the fetched article content will be displayed.
  const contentContainer = document.querySelector('.simple-article-content');

  // Select the modal wrapper, which is used to hold the content and also dim the background
  const modalWrapper = document.querySelector('.simple-article-wrapper');

  modalWrapper.addEventListener('click', (e) => {
    handleModalClick(e);
  });
  // Select all buttons with the id 'demo-button'.
  const button = document.querySelectorAll('#demo-button');

  // A variable to store prefetched article data at a higher scope
  let prefetchedData = null;

  // Add event listeners to each button for 'mouseover' and 'click' events.
  for (let i = 0; i < button.length; i++) {
    button[i].addEventListener('mouseover', handlePrefetch);
    button[i].addEventListener('click', handleClick);
  }

  // This function is triggered when the button is hovered over.
  function handlePrefetch(event) {
    // Start a timer named 'handle prefetch' to measure the execution time of this function.

    // Prevent the default behavior of the event.
    event.preventDefault();

    // Get the URL from the button's href attribute.
    const url = event.currentTarget.href;

    // If data is already prefetched, exit the function early.
    if (prefetchedData) return;

    // Set a delay of 100 milliseconds before executing the following block.
    setTimeout(() => {
      try {
        // Send a request to fetch the content of the provided URL.
        fetch(url)
          .then((response) => {
            // Check if the response status is not OK and throw an error if it's not.
            if (!response.ok) {
              throw new Error('HTTP error! status: ' + response.status);
            }
            return response.text();
          })
          .then((html) => {
            // Create a temporary container and assign the fetched HTML content to it.
            var container = document.createElement('div');
            container.innerHTML = html;

            // Extract the desired content from the fetched HTML and store it in the prefetchedData variable.
            prefetchedData = { content: container.querySelector('.main-wrapper'), url: url };

            // End the 'handle prefetch' timer and log the execution time.
          });
      } catch (error) {
        // Log any errors encountered during the fetch operation.
        console.error(
          'An error occurred while fetching and appending the featured products:',
          error
        );
      }
    }, 150);
  }

  // This function is triggered when the button is clicked.
  function handleClick(e) {
    // Start two timers to measure the execution time for both fetching and using prefetched data.

    // Get the URL from the button's href attribute.
    const url = e.currentTarget.href;

    // Prevent the default behavior of the event.
    e.preventDefault();

    // If data was prefetched and its URL matches the clicked button's URL,
    // use the prefetched data instead of fetching again.
    if (prefetchedData && prefetchedData.url === url) {
      updatePageWithNewData(prefetchedData.content);
    } else {
      // If data was not prefetched, fetch it now.
      try {
        fetch(url)
          .then((response) => {
            if (!response.ok) {
              throw new Error('HTTP error! status: ' + response.status);
            }
            return response.text();
          })
          .then((html) => {
            var container = document.createElement('div');
            container.innerHTML = html;

            // Extract the desired content from the fetched HTML.
            let data = container.querySelector('.main-wrapper');

            // Open the modal and display the fetched content.
            modalWrapper.classList.add('is-open');
            contentContainer.appendChild(data);

            // End the 'handle click fetch' timer and log the execution time.
          });
      } catch (error) {
        console.error(
          'An error occurred while fetching and appending the featured products:',
          error
        );
      }
    }
  }
  function updatePageWithNewData(prefetchedData) {
    modalWrapper.classList.add('is-open');
    contentContainer.appendChild(prefetchedData);
  }

  function handleModalClick(e) {
    if (e.currentTarget === modalWrapper) {
      modalClose();
    }
  }
  function modalClose() {
    modalWrapper.classList.remove('is-open');
    setTimeout(() => {
      contentContainer.firstChild.remove();
    }, 150);
  }
}
