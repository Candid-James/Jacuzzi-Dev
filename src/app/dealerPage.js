import { Swiper } from 'swiper';
import { Navigation } from 'swiper/modules';

window.addEventListener('DOMContentLoaded', () => {
  function appendReview(idx) {
    for (let x = 0; x < idx - 1; x++) {
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

  let countedReviews = 0;
  function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: latitude, lng: longitude },
      zoom: 15,
    });

    if (googleId !== '') {
      const request = {
        placeId: googleId,
        fields: [
          'name',
          'formatted_address',
          'place_id',
          'geometry',
          'rating',
          'reviews',
          'opening_hours',
          'website',
          'url',
        ],
      };
      const infowindow = new google.maps.InfoWindow();
      const service = new google.maps.places.PlacesService(map);

      service.getDetails(request, (place, status) => {
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          place &&
          place.geometry &&
          place.geometry.location
        ) {
          const marker = new google.maps.Marker({
            map,
            position: place.geometry.location,
          });

          placeDetails(place);

          google.maps.event.addListener(marker, 'click', () => {
            const content = document.createElement('div');
            const nameElement = document.createElement('h2');

            nameElement.textContent = place.name;
            content.appendChild(nameElement);

            const placeAddressElement = document.createElement('p');

            placeAddressElement.textContent = place.formatted_address;
            content.appendChild(placeAddressElement);
            infowindow.setContent(content);
            infowindow.open(map, marker);
          });
        }
      });
    } else {
      hide(document.querySelector('[data-lottie="loading"]'));
      fadeIn(document.querySelector('[data-div="main"]'));
    }
  }

  //using places data from google map
  function placeDetails(res) {
    let reviews = res.reviews.filter((review) => review.rating >= 3);
    let openingObj = res.opening_hours;
    console.log(res);
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
      console.log(children);
      //hide(children)
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
      console.log(reviews);
      for (let x = 0; x < reviews.length; x++) {
        countedReviews = countedReviews + 1;
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
            }
          }
        }
      }

      if ((countedReviews > 3 && window.innerWidth > 991) || window.innerWidth < 991) {
        console.log('more than 3 reviews');
        // Execute the callback once all reviews are processed
        initReviewSlider();
      } else {
        console.log('less than 3 reviews');
        document.querySelector('.google-reviews_navigation').classList.add('hide');

        const googleReviewsComponent = document.querySelector('.google-reviews_component');
        googleReviewsComponent.style.gap = '32px';
      }
      hide(document.querySelector('[data-lottie="loading"]'));
      fadeIn(document.querySelector('[data-div="main"]'));
    }
  }

  function initReviewSlider() {
    // Define the custom attribute identifier for slider components
    const identifier = 'reviews';

    // Select all slider components on the page using the custom attribute
    const sliders = document.querySelectorAll(`[${identifier}-element='slider-component']`);
    // Iterate over each detected slider
    sliders.forEach((e) => {
      const list = e.querySelector(`[${identifier}-element='list']`);
      const item = e.querySelectorAll(`[${identifier}-element='item']`);
      if (item.length > 3) {
        for (let i = 0; i < item.length; i++) {
          // Duplicate each slide item and append it to the list
          const clonedItem = item[i].cloneNode(true);
          list.appendChild(clonedItem);
        }
      }
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const swiper = new Swiper('.swiper', {
      // Optional parameters
      modules: [Navigation],
      loop: true,
      speed: 650,
      spaceBetween: 32,
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      // Breakpoints for responsive design, which control how many slides are visible based on viewport width
      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        767: {
          slidesPerView: 2,
        },
        980: {
          slidesPerView: 3,
        },
      },
    });
  }

  window.initMap = initMap;

  initMap();
});
