import { Swiper } from 'swiper';
import { getFirstWord } from 'src/utils/getClassName.mjs';

export function featureItemSlider() {
  console.log('featured item slider fired');
  const identifier = 'featured';
  const sliders = document.querySelectorAll(`[${identifier}-element='slider-component']`);

  if (window.innerWidth < 767) {
    console.log(sliders);
    sliders.forEach((e) => {
      console.log('found:' + e);
      const wrapper = e.querySelector(`[${identifier}-element='wrapper']`);
      const list = e.querySelector(`[${identifier}-element='list']`);
      const item = e.querySelector(`[${identifier}-element='item']`);
      const listClass = getFirstWord(list);
      const itemClass = getFirstWord(item);

      console.log({ wrapper, list, item, listClass, itemClass });

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
