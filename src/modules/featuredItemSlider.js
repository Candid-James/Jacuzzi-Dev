import { Swiper } from 'swiper';
import { getFirstWord } from 'src/utils/getClassName.mjs';

export function featureItemSlider() {
  const identifier = 'featured';
  const sliders = document.querySelectorAll(`[${identifier}-element='slider-component']`);

  if (window.innerWidth < 767) {
    sliders.forEach((e) => {
      console.log('found:' + e);
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
