// Equivalent of gsap.registerPlugin(ScrollTrigger);
// This is usually done by including the ScrollTrigger script after GSAP in your HTML.

export function overlapAnimation() {
  // Equivalent of ScrollTrigger.defaults({ markers: false });
  ScrollTrigger.defaults({
    markers: false,
  });

  /* This first part runs a For loop so each instance of the trigger element gets its own animation instead of all of them using the same one */

  // Equivalent of $('.tall-slider_item').each(...)
  const tallSliderItems = document.querySelectorAll('.tall-slider_item');

  tallSliderItems.forEach(function (triggerElement) {
    let targetElement = triggerElement.querySelector('.tall-slider_background-image');

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        // trigger element - viewport
        start: 'top top',
        end: 'bottom center',
        scrub: 1,
      },
    });

    tl.from(targetElement, {
      scale: 1,
    });
  });
}
