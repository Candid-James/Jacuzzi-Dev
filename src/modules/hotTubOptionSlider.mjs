// We're importing the main Swiper class, a module for navigation, and a helper function.
import { Swiper } from 'swiper';
import { Navigation } from 'swiper/modules';
import { getFirstWord } from 'src/modules/getClassName.mjs';

/**
 * Function to create a slider for hot tub options.
 *
 * This function will search for all slider components with the attribute 'options-element',
 * initialize them with the Swiper library, and set up the associated navigation arrows.
 */
export function createHotTubOptionSlider() {
  // Define an identifier for our slider. This will be used to find all elements associated with our slider.
  const identifier = 'options';

  // Find all slider components in the DOM using the identifier.
  const sliders = document.querySelectorAll(`[${identifier}-element='slider-component']`);

  // Loop through each found slider component to set it up.
  sliders.forEach((e) => {
    // Find the main wrapper, list, items, and navigation elements inside the current slider.
    const wrapper = e.querySelector(`[${identifier}-element='wrapper']`);
    const list = e.querySelector(`[${identifier}-element='list']`);
    const item = e.querySelectorAll(`[${identifier}-element='item']`);
    const nav = e.querySelector(`[${identifier}-element='navigation']`);
    const nextArrow = nav.querySelector(`[${identifier}-element='next-arrow']`);
    const prevArrow = nav.querySelector(`[${identifier}-element='prev-arrow']`);

    // Extract class names using our helper function. These will be used by Swiper.
    const listClass = getFirstWord(list);
    const itemClass = getFirstWord(item[0]);

    // Ensure there are more than 2 items and a wrapper present before proceeding.
    if (item.length > 2 && wrapper) {
      // Clone each item in the slider. This can be useful for sliders that need to loop seamlessly.
      for (let i = 0; i < item.length; i++) {
        const clonedItem = item[i].cloneNode(true);
        list.appendChild(clonedItem);
      }

      // Create a new Swiper instance for our current slider.
      const swiper = new Swiper(wrapper, {
        // Include the navigation module.
        modules: [Navigation],
        // Define basic Swiper settings.
        speed: 650,
        spaceBetween: 16,
        slidesPerView: 3,
        loop: true,
        direction: 'horizontal',
        // Use our extracted class names.
        wrapperClass: listClass,
        slideClass: itemClass,
        // Define navigation arrow settings.
        navigation: {
          nextEl: nextArrow,
          prevEl: prevArrow,
        },
        // Use breakpoints to change slider settings based on screen width.
        breakpoints: {
          320: {
            slidesPerView: 1, // On small screens, show only 1 slide at a time.
          },
          767: {
            slidesPerView: 3, // On larger screens, show 3 slides at a time.
          },
        },
      });
    } else {
      // If there are 2 or fewer items, or if the wrapper is missing, remove the navigation element.
      nav.remove();
    }
  });
}
