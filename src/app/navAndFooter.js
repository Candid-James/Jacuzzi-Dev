function navInit() {
  // Cache DOM elements
  const wrapper = document.querySelector('.nav_menu-list');
  const nav = document.querySelector('.nav');
  const secondLayer = document.querySelector('[second-layer]');
  const hotTubToggle = document.querySelector('[open-hot-tub-modal]');
  const layerLink = document.querySelector('[open-second-layer]');
  const backButton = document.querySelector('[menu-back-button]');
  const closeButton = document.querySelector('[close-side-menu]');
  const openSide = document.querySelector('[open-side-modal]');
  const hotTubsMobile = document.querySelector('[open-third-layer]');
  const firstLayer = document.querySelectorAll('.nav_menu-layer');
  const firstLayerLinks = firstLayer[0].querySelectorAll('.nav_menu-link');
  const hotTubItems = document.querySelectorAll('.nav_hot-tub-item');

  let lastScrollTop = 0;
  let isNavHidden = false;

  window.addEventListener('scroll', function () {
    let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Determine scroll direction
    if (currentScrollTop > lastScrollTop) {
      // Scrolling down
      if (!isNavHidden) {
        gsap.to('.nav', { duration: 0.5, y: '-100%' });
        isNavHidden = true;
      }
    } else {
      // Scrolling up
      if (isNavHidden) {
        gsap.to('.nav', { duration: 0.5, y: '0%' });
        isNavHidden = false;
      }
    }

    lastScrollTop = currentScrollTop;
  });

  // animations
  function sideOpenAnimation() {
    let tl = gsap.timeline();

    tl.from(firstLayerLinks, {
      y: '60%',
      opacity: 0,
      duration: 0.5,
      ease: 'power1.out',
      stagger: 0.1,
    });
    tl.play();
  }

  // Named constant
  const DESKTOP_MIN_WIDTH = 767;

  if (window.innerWidth >= DESKTOP_MIN_WIDTH) {
    backButton.classList.add('is-hidden');
  }

  // Helper Functions
  function toggleLayerTwo() {
    wrapper.classList.toggle('layer-two');
  }

  function hideLayerTwo() {
    wrapper.classList.remove('layer-two');
  }

  function showBackButton() {
    if (window.innerWidth >= DESKTOP_MIN_WIDTH) {
      backButton.classList.remove('is-hidden');
    }
  }

  function hideBackButton() {
    if (window.innerWidth > DESKTOP_MIN_WIDTH) {
      backButton.classList.add('is-hidden');
    }
  }

  function openSideMenu() {
    nav.classList.toggle('side-open');
    if (nav.classList.contains('side-open')) {
      sideOpenAnimation();
    }
  }

  function closeSideMenu() {
    nav.classList.remove('side-open');
  }

  // Core Functions
  function toggleHotTub() {
    nav.classList.toggle('hot-tub-open');
  }

  function showSecondLayer() {
    toggleLayerTwo();
    showBackButton();
  }

  if (window.innerWidth < 767) {
    const triggers = document.querySelectorAll('.footer_dropdown-trigger');

    triggers.forEach((e) => {
      e.addEventListener('click', (e) => {
        const wrapper = e.currentTarget;
        wrapper.classList.toggle('is-active');
      });
    });
  }

  function handleBackButton() {
    if (wrapper.classList.contains('layer-two')) {
      hideLayerTwo();
      hideBackButton();
    } else {
      closeSideMenu();
      hideBackButton();
    }
    if (secondLayer.classList.contains('hide')) {
      secondLayer.classList.remove('hide');
    }
  }

  // Copyright Year Script

  const footerYearElement = document.querySelector('.footer_year');
  const currentYear = new Date().getFullYear();

  if (footerYearElement) {
    footerYearElement.innerHTML = currentYear;
  }

  // End of Copyright Year Script

  function handleCloseButton() {
    hideLayerTwo();
    hideBackButton();
    closeSideMenu();
  }

  function handleHotTubsMobile() {
    secondLayer.classList.add('hide');
    toggleLayerTwo();
    showBackButton();
  }

  // Event listeners
  hotTubToggle.addEventListener('click', toggleHotTub);

  layerLink.addEventListener('click', showSecondLayer);

  backButton.addEventListener('click', handleBackButton);

  closeButton.addEventListener('click', handleCloseButton);

  openSide.addEventListener('click', openSideMenu);

  hotTubsMobile.addEventListener('click', handleHotTubsMobile);
}

const observer = new MutationObserver((mutations, observerInstance) => {
  const navElement = document.querySelector('.nav');

  if (navElement) {
    navInit();
    observerInstance.disconnect(); // Stops the observer once the .nav element is found and processed.
  }
});

// Starts observing the document for changes.
observer.observe(document.body, {
  childList: true,
  subtree: true,
});
