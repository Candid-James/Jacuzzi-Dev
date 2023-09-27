// We're importing the main Swiper class, a module for the scrollbar, and a helper function.
import { getFirstWord } from 'src/modules/getClassName.mjs';
import { Swiper } from 'swiper';

/**
 * Function to create a full height slider.
 *
 * This function will search for all slider components with an attribute of 'full-height-element',
 * initialize them with the Swiper library, and set up the associated scrollbar.
 */
export function createFullHeightSlider() {
  // Define an identifier for our slider. This will be used to find all the elements associated with our slider.
  const identifier = 'full-height';

  // Find all slider components in the DOM using the identifier.
  const sliders = document.querySelectorAll(`[${identifier}-element='slider-component']`);

  // Loop through each found slider component to set it up.
  sliders.forEach((e) => {
    // Find the main wrapper, list, and items inside the current slider.
    const wrapper = e.querySelector(`[${identifier}-element='wrapper']`);
    const list = e.querySelector(`[${identifier}-element='list']`);
    const item = e.querySelectorAll(`[${identifier}-element='item']`);

    // Extract class names using our helper function. These will be used by Swiper.
    const listClass = getFirstWord(list);
    const itemClass = getFirstWord(item[0]);

    // Ensure there's at least one item and a wrapper present before initializing Swiper.
    if (item.length > 0 && wrapper) {
      // Create a new Swiper instance for our current slider
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const swiper = new Swiper(wrapper, {
        // Define basic Swiper settings.
        speed: 450,
        spaceBetween: 0,
        slidesPerView: 1,
        loop: false,
        direction: 'horizontal',
        // Use our extracted class names.
        wrapperClass: listClass,
        slideClass: itemClass,
      });
    }
  });
}
