// How to use: https://jamesbattye.notion.site/Slider-Swiper-68ab88ffc62f42c090957922f9bf8376?pvs=4
// Watch this
// If you're getting red lines under the next 2 lines, write this in your terminal 'sudo pnpm i'
// then write 'pnpm install swiper' in the terminal after that.
// Copy this and paste it on a new ts file for each unique slider design on the site.

import { Swiper } from 'swiper';
import { getFirstWord } from 'src/utils/getClassName.mts';

export function featureItemSlider() {
  console.log('yes');

  const identifier = 'featured';
  const sliders = document.querySelectorAll(`[${identifier}-element='slider-component']`);

  if (window.innerWidth < 767) {
    sliders.forEach((e) => {
      const wrapper = e.querySelector(`[${identifier}-element='wrapper']`);
      const list = e.querySelector(`[${identifier}-element='list']`);
      const item = e.querySelector(`[${identifier}-element='item']`);
      const listClass = getFirstWord(list);
      const itemClass = getFirstWord(item);

      if (wrapper) {
        const swiper = new Swiper(wrapper, {
          speed: 400,
          spaceBetween: 16,
          slidesPerView: 1.05,
          loop: true,
          direction: 'horizontal',
          wrapperClass: listClass,
          slideClass: itemClass,
        });
      }
    });
  }
}
