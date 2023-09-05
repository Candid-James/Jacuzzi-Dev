/**
 * Registers an overlap animation using GSAP's ScrollTrigger.
 * This animation targets items within a tall slider, ensuring each item animates independently as it enters the viewport.
 */
export function overlapAnimation() {
  // Set default configuration for ScrollTrigger animations
  // Here, "markers" is set to false, so visual debug markers won't appear on the page.
  ScrollTrigger.defaults({
    markers: false,
  });

  /**
   * For each item in the tall slider, a separate animation is registered.
   * This ensures that each item animates independently rather than all items animating simultaneously.
   */
  const tallSliderItems = document.querySelectorAll('.tall-slider_item');

  tallSliderItems.forEach(function (triggerElement) {
    // Find the background image within the current tall slider item. This is the target of our animation.
    let targetElement = triggerElement.querySelector('.tall-slider_background-image');

    // Create a GSAP timeline for the animation. This allows chaining multiple animations if needed.
    let tl = gsap.timeline({
      scrollTrigger: {
        // The element that triggers the animation when it enters/exits the viewport.
        trigger: triggerElement,

        // Define the position in the viewport where the animation starts and ends.
        // 'top top' means the animation starts when the top of the trigger element reaches the top of the viewport.
        // 'bottom center' means the animation ends when the bottom of the trigger element reaches the center of the viewport.
        start: 'top top',
        end: 'bottom center',

        // The animation adjusts its progress in relation to the scroll position.
        // This creates a smooth, continuous animation effect as the user scrolls.
        scrub: 1,
      },
    });

    // Define the animation. In this case, the background image starts at its original scale (1) and grows larger.
    tl.from(targetElement, {
      scale: 1,
    });
  });
}
