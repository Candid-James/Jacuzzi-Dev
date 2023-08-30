export function initGoogleReviews(callback) {
  // Function to append multiple review divs based on the given index
  function appendReviews(index) {
    for (let i = 0; i < index - 1; i++) {
      // Get the first review div element
      const firstReviewDiv = document.querySelector('[data-div="review"]:first-child');
      // Clone the first review div element
      const clonedReviewElement = firstReviewDiv.cloneNode(true);
      // Get the parent element for review divs
      const reviewWrapper = document.querySelector('[data-div="review-wrapper"]');
      // Append the cloned review div to the wrapper
      reviewWrapper.appendChild(clonedReviewElement);
    }
  }

  // Custom function to create a fade-in effect for an element
  function fadeIn(element) {
    element.style.opacity = 0;
    element.style.display = 'block';
    const fadeInInterval = setInterval(function () {
      if (element.style.opacity < 1) {
        element.style.opacity = Number(element.style.opacity) + 0.1;
      } else {
        clearInterval(fadeInInterval);
      }
    }, 50); // Adjust the interval (in ms) for a smoother fade-in effect
  }

  // Custom function to hide an element
  function hide(element) {
    element.style.display = 'none';
  }

  // Start of main code
  // Using jQuery to perform a GET request with a place ID as a parameter

  $.get('https://dev--d1-spas--candidleap.autocode.dev/', {
    googleID,
  }).then((res) => {
    // Extract reviews and opening hours information from the response
    let reviews = res.reviews;
    let openingObj = res.opening_hours;

    // Log the response for debugging

    // Update UI elements with place information
    const addressText = document.querySelector('[data-text="address"]');
    // const openText = document.querySelector('[data-text="opening"]');
    const websiteBtn = document.querySelector('[data-button="website"]');
    const directionBtn = document.querySelector('[data-button="direction"]');
    // const openingHour = document.querySelectorAll('[data-text="day"]');

    addressText.textContent = res.formatted_address;
    websiteBtn.setAttribute('href', res.website);
    directionBtn.setAttribute('href', res.url);

    // Display whether the place is open or closed
    // if (openingObj.open_now) {
    //   openText.textContent = 'open now';
    // } else {
    //   openText.textContent = 'closed now';
    // }

    // Display opening hours for each day of the week
    // for (let i = 0; i < openingObj.weekday_text.length; i++) {
    //   openingHour[i].textContent = openingObj.weekday_text[i];
    // }

    // // Display the place's rating using star icons
    // const ratingDiv = document.querySelector('[data-div="rating"]');
    // const starIcons = ratingDiv.children;

    // // Remove star icons based on the rating value
    // for (let i = 0; i < 5 - res.rating; i++) {
    //   if (starIcons[i]) {
    //     ratingDiv.removeChild(starIcons[i]);
    //   } else {
    //     // No more star icons to remove
    //     break;
    //   }
    // }

    // Display reviews if available
    if (reviews.length > 0) {
      // Append additional review divs based on the total number of reviews
      appendReviews(reviews.length);

      // Loop through each review and update corresponding UI elements
      for (let x = 0; x < reviews.length; x++) {
        // Update reviewer's name
        const nameElements = document.querySelectorAll('[data-text="name"]');
        nameElements[x].textContent = reviews[x]['author_name'];

        // Update review's time description
        const dateElements = document.querySelectorAll('[data-text="date"]');
        dateElements[x].textContent = reviews[x]['relative_time_description'];

        // Update review text
        const reviewElements = document.querySelectorAll('[data-text="review"]');
        reviewElements[x].textContent = reviews[x]['text'];

        // Update reviewer's image
        const imageElements = document.querySelectorAll('[data-div="image"]');

        imageElements[x].setAttribute('src', reviews[x]['profile_photo_url']);
        imageElements[x].setAttribute('srcset', reviews[x]['profile_photo_url']);

        // Display reviewer's rating using star icons
        const starsDiv = document.querySelectorAll('[data-div="stars"]')[x];
        const starIcons = starsDiv.children;

        // Remove star icons based on the reviewer's rating
        for (let i = 0; i < 5 - reviews[x].rating; i++) {
          if (starIcons[i]) {
            starsDiv.removeChild(starIcons[i]);
          } else {
            // No more star icons to remove
            break;
          }
        }
      }

      // Invoke the callback if provided

      callback();
      //   Hide the loading animation and fade in the main content
      console.log('Hiding loading animation...');
      hide(document.querySelector('[data-lottie="loading"]'));

      fadeIn(document.querySelector('[data-div="main"]'));
    }
  });
}
