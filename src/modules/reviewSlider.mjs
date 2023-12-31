// Importing necessary modules and functions
import { getFirstWord } from 'src/modules/getClassName.mjs'; // Custom function to retrieve the first word from a given string
import { Swiper } from 'swiper'; // Base Swiper library for the slider functionality
import { Navigation } from 'swiper/modules'; // Navigation module from Swiper for slider controls

/**
 * Initializes the review slider on the page.
 * Required attributes:
 * - reviews-element="slider-component"
 * - reviews-element="wrapper"
 * - reviews-element="list"
 * - reviews-element="item"
 * - reviews-element="navigation"
 * - reviews-element="next-arrow"
 * - reviews-element="prev-arrow"
 */
export function initReviewSlider() {
  // Define the custom attribute identifier for slider components
  const identifier = 'reviews';

  // Select all slider components on the page using the custom attribute
  const sliders = document.querySelectorAll(`[${identifier}-element='slider-component']`);
  // Iterate over each detected slider
  sliders.forEach((e) => {
    // Fetch primary components within each slider using the custom attribute
    const wrapper = e.querySelector(`[${identifier}-element='wrapper']`);
    const list = e.querySelector(`[${identifier}-element='list']`);
    const item = e.querySelectorAll(`[${identifier}-element='item']`);
    const nav = e.querySelector(`[${identifier}-element='navigation']`);
    const nextArrow = nav.querySelector(`[${identifier}-element='next-arrow']`);
    const prevArrow = nav.querySelector(`[${identifier}-element='prev-arrow']`);

    // Fetch class names using the getFirstWord function for Swiper's configuration
    const listClass = getFirstWord(list);
    const itemClass = getFirstWord(item[0]);

    // Initialize the Swiper instance with required configurations

    if (item.length > 3) {
      for (let i = 0; i < item.length; i++) {
        // Duplicate each slide item and append it to the list
        const clonedItem = item[i].cloneNode(true);
        list.appendChild(clonedItem);
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const swiper = new Swiper(wrapper, {
        modules: [Navigation],
        speed: 650,
        spaceBetween: 16,
        slidesPerView: 3,
        loop: true,
        direction: 'horizontal',
        wrapperClass: listClass,
        slideClass: itemClass,
        navigation: {
          nextEl: nextArrow,
          prevEl: prevArrow,
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
  });
}
