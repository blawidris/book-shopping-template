(function () {
  ("use strict");

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach((e) => e.addEventListener(type, listener));
    } else {
      select(el, all).addEventListener(type, listener);
    }
  };

  /**
   * Menu Toggle
   */

  on("click", "#menuToggler", function (e) {
    select(".side-menu").classList.toggle("show");
    select(".cat-menu .cat-toggle").classList.toggle("bi-x");
    select(".cat-menu .cat-toggle").classList.toggle("bi-grid");
    // this.classList.toggle("show");
    // console.log('cick')
  });
  /**
   * hero slider
   */

  var heroSlides = new Swiper(".hero-slides", {
    speed: 600,
    loop: false,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40,
      },

      1200: {
        slidesPerView: 1,
      },
    },
  });

  /**
   * Features slider
   */
  var featureSlider = new Swiper(".features-slide", {
    speed: 600,
    loop: false,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".features-slide .swiper-navigation .btn-next",
      prevEl: ".features-slide .swiper-navigation .btn-prev",
      control: heroSlides,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40,
      },
      768: {
        slidesPerView: 2,
      },

      1200: {
        slidesPerView: 2,
      },
    },
  });
  /**
   * Testimonials slider
   */
  new Swiper(".testimonials-slider", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40,
      },

      1200: {
        slidesPerView: 3,
      },
    },
  });

  /**
   * Animation on scroll
   */
  function aos_init() {
    AOS.init({
      duration: 100,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", () => {
    aos_init();
  });
})();
