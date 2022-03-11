(function ($) {
    'use strict';
    /*==============================
    [ Fixed Header ]
    ===============================*/
    let header = $('#main-header');
    let mainNav = $('#main-header .main-nav')
    let pos;

    if (header.length > 0) {
        pos = header.height();

    } else {
        pos = 0
    }

    if ($(window).scrollTop() > pos) {
        mainNav.addClass('fixed-top');

    } else {
        mainNav.removeClass('fixed-top');
    }
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > pos) {
            $(mainNav).addClass('fixed-top');
        }
        else {
            $(mainNav).removeClass('fixed-top');
        }
    });

    /*==============================
   [ hide/show search box ]
   ===============================*/

    $('#search-modal').click(function () {
        $('.modal-search-header').removeClass('d-none').fadeIn(1000);
        $(this).addClass('d-none');

        // console.log('clicked')
    });
    $('#hide-search-box').click(function () {
        $('.modal-search-header').addClass('d-none');
        $('.search-box').removeClass('d-none');
    });

    /*==============================
   [ hide/show social links ]
   ===============================*/
    $('#share').click(function () {
        $('.social-links').removeClass('d-none').fadeIn(1000);
        $('this').addClass('d-none');
    });

    $('.social-links .cancel').click(function () {
        $('.social-links').addClass('d-none');
        $('#share').removeClass('d-none');
    });
    /*==============================
   [ rating ]
   ===============================*/
    $('.wrap-rating').each(function () {
        var item = $(this).find('.item-rating');
        var rated = -1;
        var input = $(this).find('input');
        $(input).val(0);

        $(item).on('mouseenter', function () {
            var index = item.index(this);
            var i = 0;
            for (i = 0; i <= index; i++) {
                $(item[i]).removeClass('bi-star');
                $(item[i]).addClass('bi-star-fill');
            }

            for (var j = i; j < item.length; j++) {
                $(item[j]).addClass('bi-star');
                $(item[j]).removeClass('bi-star-fill');
            }
        });

        $(item).on('click', function () {
            var index = item.index(this);
            rated = index;
            $(input).val(index + 1);
        });

        $(this).on('mouseleave', function () {
            var i = 0;
            for (i = 0; i <= rated; i++) {
                $(item[i]).removeClass('bi-star');
                $(item[i]).addClass('bi-star-fill');
            }

            for (var j = i; j < item.length; j++) {
                $(item[j]).addClass('bi-star');
                $(item[j]).removeClass('bi-star-fill');
            }
        });
    });

    /*==============================
    [slide show]
    ===============================*/
    $('.wrap-slick').slick(
        {
            accessibility: true,
            adaptiveHeight: true,
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 2,
            speed: 300,
            dots: false,
            autoplaySpeed: 3000,
            easing: 'linear',
            fade: false,
            // centerMode: true,
            variableWidth: true,
            useTransform: true,
            prevArrow: '<button class="arrow arrow-prev"><i class="bi bi-chevron-left"></i></button>',
            nextArrow: '<button class="arrow arrow-next"><i class="bi bi-chevron-right"></i></button>',
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 360,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        }
    )
    /*==============================
    [ cart increase & decrease]
    ===============================*/
    $('.btn-num-product-down').on('click', function () {
        let numProduct = Number($(this).next().val());
        if (numProduct > 0) $(this).next().val(numProduct - 1);

    });

    $('.btn-num-product-up').on('click', function () {
        let numProduct = Number($(this).prev().val());
        $(this).prev().val(numProduct + 1);
    });

    /*==============================
    [ Add and remove from cart]
    ===============================*/

    $('.add-to-cart').each(function () {
        let nameProduct = $(this).parent().parent().parent().parent().find('.prod-name').html();
        $(this).on('click', function () {
            swal(nameProduct, "is added to cart !", "success");
        });
    });

    $('.remove-item').each(function () {
        let nameProduct = $(this).parent().parent().parent().parent().find('.prod-name').html();
        $(this).on('click', function () {
            swal(nameProduct, "is removed to cart !", "success");
        });
    });

    /*==============================
    [ Add and remove from cart]
    ===============================*/
    $('.js-addwish-detail').each(function () {
        var nameProduct = $(this).parent().parent().parent().find('.js-name-detail').html();

        $(this).on('click', function () {
            swal(nameProduct, "is added to wishlist !", "success");

            $(this).addClass('js-addedwish-detail');
            $(this).off('click');
        });
    });

    /*==============================
   [ hide and show filter]
   ===============================*/
    $('.btn-filter').click(function () {
        // console.log('click')
        $(this).toggleClass('show_filter');
        $('.bi-x').toggleClass('d-none');
        $('.bi-filter').toggleClass('d-none');
        $('.filter-panel').toggleClass('d-none')
        // $('.filter-panel').fadeIn(1000);
    });

    $('.shipping-calculator').click(function () {
        $('.s-form').removeClass('d-none')
        console.log('clicked')
    });
    /*==============================
       [ Isotope]
       ===============================*/
    var $topeContainer = $('.isotope-grid');
    var $filter = $('.filter-group');

    // filter items on button click
    $filter.each(function () {
        $filter.on('click', 'button', function () {
            var filterValue = $(this).attr('data-filter');
            $topeContainer.isotope({ filter: filterValue });
        });

    });

    // init Isotope
    $(window).on('load', function () {
        var $grid = $topeContainer.each(function () {
            $(this).isotope({
                itemSelector: '.isotope-item',
                layoutMode: 'fitRows',
                percentPosition: true,
                animationEngine: 'best-available',
                masonry: {
                    columnWidth: '.isotope-item'
                }
            });
        });
    });

    var isotopeButton = $('.filter-group button');

    $(isotopeButton).each(function () {
        $(this).on('click', function () {
            for (var i = 0; i < isotopeButton.length; i++) {
                $(isotopeButton[i]).removeClass('active');
            }

            $(this).addClass('active');
        });
    });

    AOS.init();
})(jQuery);