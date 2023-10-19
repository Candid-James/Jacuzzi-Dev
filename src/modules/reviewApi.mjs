/**
 * Initializes and displays Google reviews.
 *
 * This function fetches Google reviews using a custom endpoint and displays them on the UI.
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function placeDetails(res) {
    let { reviews } = res;
    let openingObj = res.opening_hours;
    // Place Address
    const addressText = document.querySelector('[data-text="address"]');
    const openText = document.querySelector('[data-text="opening"]');
    const websiteBtn = document.querySelector('[data-button="website"]');
    const directionBtn = document.querySelector('[data-button="direction"]');
    const openingHour = document.querySelectorAll('[data-text="day"]');

    addressText.textContent = res.formatted_address;
    websiteBtn.setAttribute('href', res.website);
    directionBtn.setAttribute('href', res.url);
    if (openText) {
      if (openingObj.isOpen()) {
        openText.textContent = 'open now';
      } else {
        openText.textContent = 'close now';
      }
    }

    // Place opening details
    for (let i = 0; i < openingObj.weekday_text.length; i++) {
      if (openingHour[i]) {
        openingHour[i].textContent = openingObj.weekday_text[i];
      }
    }

    // place total rating
    const ratingDiv = document.querySelector('[data-div="rating"]');
    if (ratingDiv) {
      const { children } = ratingDiv;

      for (let i = 0; i < 5 - res.rating; i++) {
        if (children[i]) {
          ratingDiv.removeChild(children[i]);
        } else {
          // No more children to remove
          break;
        }
      }
    }

    if (reviews.length > 0) {
      // Append review div based on revies total length
      appendReview(reviews.length);

      for (let x = 0; x < reviews.length; x++) {
        // Reviewer name
        const nameElements = document.querySelectorAll('[data-text="name"]');
        nameElements[x].textContent = reviews[x]['author_name'];

        // Review time description
        const dateElements = document.querySelectorAll('[data-text="date"]');
        dateElements[x].textContent = reviews[x]['relative_time_description'];

        // Reviewe text
        const reviewElements = document.querySelectorAll('[data-text="review"]');
        reviewElements[x].textContent = reviews[x]['text'];

        // Reviewer image
        const imageElements = document.querySelectorAll('[data-div="image"]');
        imageElements[x].setAttribute('src', reviews[x]['profile_photo_url']);
        imageElements[x].setAttribute('srcset', reviews[x]['profile_photo_url']);

        // Reviewer rating
        const starsDiv = document.querySelectorAll('[data-div="stars"]')[x];
        if (starsDiv) {
          const { children } = starsDiv;

          for (let i = 0; i < 5 - reviews[x].rating; i++) {
            if (children[i]) {
              starsDiv.removeChild(children[i]);
            } else {
              // No more children to remove
              break;
            }
          }
        }

        if (countedReviews > 3) {
          // Execute the callback once all reviews are processed
          callback();
        }
      }

      hide(document.querySelector('[data-lottie="loading"]'));
      fadeIn(document.querySelector('[data-div="main"]'));
    }
  }
}
