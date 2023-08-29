function appendReview(idx) {
  for (x = 0; x < idx - 1; x++) {
    // Get the first element with attribute data-div="review"
    const reviewDiv = document.querySelector('[data-div="review"]:first-child');
    // Clone the source element
    const clonedElement = reviewDiv.cloneNode(true);
    // Get the parent element with attribute data-div="review-wrapper"
    const reviewWrapper = document.querySelector('[data-div="review-wrapper"]');
    // Append the cloned element to the target wrapper
    reviewWrapper.appendChild(clonedElement);
  }
}

//custom UI
function fadeIn(element) {
  element.style.opacity = 0;
  element.style.display = 'block';
  const fadeInInterval = setInterval(function () {
    if (element.style.opacity < 1) {
      element.style.opacity = Number(element.style.opacity) + 0.1;
    } else {
      clearInterval(fadeInInterval);
    }
  }, 50); // Adjust the time interval (ms) for a smoother fade-in effect
}

function hide(element) {
  element.style.display = 'none';
}
// end of custom UI

//using jquery get request with place ID as the promise
$.get('https://dev--d1-spas--candidleap.autocode.dev/', {
  googleID,
}).then((res) => {
  let { reviews } = res;
  let openingObj = res.opening_hours;
//   console.log(res);
  // Place Address
  const addressText = document.querySelector('[data-text="address"]');
  const openText = document.querySelector('[data-text="opening"]');
  const websiteBtn = document.querySelector('[data-button="website"]');
  const directionBtn = document.querySelector('[data-button="direction"]');
  const openingHour = document.querySelectorAll('[data-text="day"]');

  addressText.textContent = res.formatted_address;
  websiteBtn.setAttribute('href', res.website);
  directionBtn.setAttribute('href', res.url);
  if (openingObj.open_now) {
    openText.textContent = 'open now';
  } else {
    openText.textContent = 'close now';
  }

  // Place opening details
  for (let i = 0; i < openingObj.weekday_text.length; i++) {
    openingHour[i].textContent = openingObj.weekday_text[i];
  }

  // place total rating
  const ratingDiv = document.querySelector('[data-div="rating"]');
  const { children } = ratingDiv;

  for (let i = 0; i < 5 - res.rating; i++) {
    if (children[i]) {
      ratingDiv.removeChild(children[i]);
    } else {
      // No more children to remove
      break;
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

    hide(document.querySelector('[data-lottie="loading"]'));
    fadeIn(document.querySelector('[data-div="main"]'));
  }
});
