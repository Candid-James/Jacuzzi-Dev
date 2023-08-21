import { Swiper } from 'swiper';
import { Scrollbar } from 'swiper/modules';
import { getFirstWord } from 'src/modules/getClassName.mjs';

export function createFullHeightSlider() {
  const identifier = 'full-height';
  const sliders = document.querySelectorAll(`[${identifier}-element='slider-component']`);

  sliders.forEach((e) => {
    const wrapper = e.querySelector(`[${identifier}-element='wrapper']`);
    const list = e.querySelector(`[${identifier}-element='list']`);
    const item = e.querySelectorAll(`[${identifier}-element='item']`);

    const listClass = getFirstWord(list);
    const itemClass = getFirstWord(item[0]);

    if (item.length > 0 && wrapper) {
      const swiper = new Swiper(wrapper, {
        modules: [Scrollbar],
        speed: 450,
        spaceBetween: 0,
        slidesPerView: 1,
        loop: false,
        direction: 'horizontal',
        wrapperClass: listClass,
        slideClass: itemClass,
        scrollbar: {
          el: '.features-slider_navigation',
          dragClass: 'features-slider_scrollbar',
          hide: false,
        },
      });
    } else {
      const scrollbarElement = e.querySelector('.features-slider_navigation');
      scrollbarElement.remove();
    }
  });
}
