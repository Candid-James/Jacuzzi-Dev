import { Swiper } from 'swiper';
import { Navigation } from 'swiper/modules';
import { getFirstWord } from 'src/modules/getClassName.mjs';

export function createHotTubOptionSlider() {
  const identifier = 'options';
  const sliders = document.querySelectorAll(`[${identifier}-element='slider-component']`);

  sliders.forEach((e) => {
    const wrapper = e.querySelector(`[${identifier}-element='wrapper']`);
    const list = e.querySelector(`[${identifier}-element='list']`);
    const item = e.querySelectorAll(`[${identifier}-element='item']`);
    const nav = e.querySelector(`[${identifier}-element='navigation']`);
    const nextArrow = nav.querySelector(`[${identifier}-element='next-arrow']`);
    const prevArrow = nav.querySelector(`[${identifier}-element='prev-arrow']`);

    const listClass = getFirstWord(list);
    const itemClass = getFirstWord(item[0]);

    if (items.length > 2 && wrapper) {
      for (let i = 0; i < item.length; i++) {
        const clonedItem = item[i].cloneNode(true);
        list.appendChild(clonedItem);
      }

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
        breakpoints: {
          320: {
            slidesPerView: 1,
          },
          767: {
            slidesPerView: 3,
          },
        },
      });
    } else {
      nav.remove();
    }
  });
}
