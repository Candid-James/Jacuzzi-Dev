/**
 * Initializes and displays Google reviews.
 *
 * This function fetches Google place details such as reviews and displays them on the UI.
 * It also provides functionalities to duplicate review templates, fade in elements, and hide elements.
 *
 * @param {Function} callback - A callback function to be invoked once reviews have been processed and displayed.
 */
export function initGoogleReviews(callback) {
  /**
   * Duplicates the first review div multiple times, based on the given index.
   * This helps in preparing the UI to display multiple reviews.
   *
   * @param {Number} index - The number of times the first review div should be duplicated.
   */
  function appendReviews(index) {
    // Repeatedly clone the first review div to match the required count
    for (let i = 0; i < index - 1; i++) {
      const firstReviewDiv = document.querySelector('[data-div="review"]:first-child');
      const clonedReviewElement = firstReviewDiv.cloneNode(true);
      const reviewWrapper = document.querySelector('[data-div="review-wrapper"]');
      reviewWrapper.appendChild(clonedReviewElement);
    }
  }

  /**
   * Gradually increases the visibility of a given HTML element.
   * This is achieved by adjusting its opacity in regular intervals.
   *
   * @param {HTMLElement} element - The HTML element to fade in.
   */
  function fadeIn(element) {
    element.style.opacity = 0;
    element.style.display = 'block';

    const fadeInInterval = setInterval(() => {
      if (element.style.opacity < 1) {
        element.style.opacity = parseFloat(element.style.opacity) + 0.1;
      } else {
        clearInterval(fadeInInterval);
      }
    }, 50);
  }

  /**
   * Conceals a given HTML element from view.
   *
   * @param {HTMLElement} element - The HTML element to hide.
   */
  function hide(element) {
    element.style.display = 'none';
  }

  // Fetch Google place details using a custom endpoint
  $.get('https://dev--d1-spas--candidleap.autocode.dev/', { googleID }).then((res) => {
    let reviews = res.reviews;

    // Populate place details on the UI
    document.querySelector('[data-text="address"]').textContent = res.formatted_address;
    document.querySelector('[data-button="website"]').setAttribute('href', res.website);
    document.querySelector('[data-button="direction"]').setAttribute('href', res.url);

    // Proceed if there are reviews to be displayed
    if (reviews.length > 0) {
      appendReviews(reviews.length);

      // Iterate over the reviews to display them on the UI
      reviews.forEach((review, x) => {
        // Update review contents
        document.querySelectorAll('[data-text="name"]')[x].textContent = review.author_name;
        document.querySelectorAll('[data-text="date"]')[x].textContent =
          review.relative_time_description;
        document.querySelectorAll('[data-text="review"]')[x].textContent = review.text;

        // Set the reviewer's profile picture
        const imageElements = document.querySelectorAll('[data-div="image"]');
        imageElements[x].setAttribute('src', review.profile_photo_url);
        imageElements[x].setAttribute('srcset', review.profile_photo_url);

        // Display stars representing the reviewer's rating
        const starsDiv = document.querySelectorAll('[data-div="stars"]')[x];
        const starIcons = [...starsDiv.children];
        starIcons.slice(review.rating).forEach((star) => starsDiv.removeChild(star));
      });

      // Execute the callback once all reviews are processed
      callback();

      // Display the main content after loading and processing the reviews
      hide(document.querySelector('[data-lottie="loading"]'));
      fadeIn(document.querySelector('[data-div="main"]'));
    }
  });
}
