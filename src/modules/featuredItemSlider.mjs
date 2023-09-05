// Import necessary modules and dependencies
import { getFirstWord } from 'src/modules/getClassName.mjs';
import { Swiper } from 'swiper';

/**
 * Initializes a Swiper slider for featured items, but only if the window's width is below a certain breakpoint (767 pixels).
 * The function targets specific elements marked with a custom 'featured-element' attribute to set up the slider.
 */
export function featureItemSlider() {
  // Define the custom attribute identifier.
  const identifier = 'featured';

  // Select all the main slider components marked with the custom attribute.
  const sliders = document.querySelectorAll(`[${identifier}-element='slider-component']`);

  // Check if the window's width is below the 767-pixel breakpoint.
  if (window.innerWidth < 767) {
    // For each main slider component, set up a Swiper slider.
    sliders.forEach((e) => {
      // Find necessary child elements within the current slider component.
      const wrapper = e.querySelector(`[${identifier}-element='wrapper']`);
      const list = e.querySelector(`[${identifier}-element='list']`);
      const item = e.querySelector(`[${identifier}-element='item']`);

      // Extract class names from the list and item elements using the imported getFirstWord function.
      const listClass = getFirstWord(list);
      const itemClass = getFirstWord(item);

      // If a wrapper exists for the current slider, initialize the Swiper slider with the extracted classes and predefined settings.
      if (wrapper) {
        const swiper = new Swiper(wrapper, {
          speed: 400, // Animation speed when sliding.
          spaceBetween: 16, // Space between slides.
          slidesPerView: 1.05, // Number of slides visible at the same time.
          loop: true, // Loop mode enabled.
          direction: 'horizontal', // Slides' change direction.
          wrapperClass: listClass, // Custom class for the wrapper.
          slideClass: itemClass, // Custom class for each slide.
        });
      }
    });
  }
}
