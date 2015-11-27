/*! [PROJECT_NAME] | Suitmedia */

;(function ( window, document, undefined ) {

    var path = {
        css: myPrefix + 'assets/css/',
        js : myPrefix + 'assets/js/vendor/'
    };

    var assets = {
        _jquery_cdn     : 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js',
        _jquery_local   : path.js + 'jquery.min.js',
        _jquery_migrate : path.js + 'jquery-migrate.min.js',
        _fastclick      : path.js + 'fastclick.min.js',
        _slickslider    : path.js + 'slick.min.js'
    };

    var Site = {

        init: function () {
            Site.jqueryMigrate();
            Site.fastClick();
            Site.slickSlider();
            Site.enableActiveStateMobile();
            Site.WPViewportFix();
            Site.accordionSlide();
            Site.toggleButton();
            Site.toggleSubmenu();
            // Site.sliderAutoplay();

            window.Site = Site;
        },

        jqueryMigrate: function () {
            Modernizr.load({
                load    : assets._jquery_migrate,
                complete: function () {
                    JqueryMigrate.attach(document.body);
                }
            });
        },

        fastClick: function () {
            Modernizr.load({
                load    : assets._fastclick,
                complete: function () {
                    FastClick.attach(document.body);
                }
            });
        },

        slickSlider: function () {
            Modernizr.load({
                load    : assets._slickslider,
                complete: function () {
                    slickSlider.attach(document.body);
                }
            });
        },

        enableActiveStateMobile: function () {
            if ( document.addEventListener ) {
                document.addEventListener('touchstart', function () {}, true);
            }
        },

        WPViewportFix: function () {
            if ( navigator.userAgent.match(/IEMobile\/10\.0/) ) {
                var style   = document.createElement("style"),
                fix     = document.createTextNode("@-ms-viewport{width:auto!important}");

                style.appendChild(fix);
                document.getElementsByTagName('head')[0].appendChild(style);
            }
        },

        accordionSlide: function () {
            var $accordionIcon       = $('.fa');
            var $accordionHeader     = $('.accordion__header');
            

            $accordionHeader.on ( 'click', '.accordion__header__trigger' , function() {
                $(this).parents('.accordion').find('.accordion__content').slideToggle();
                $(this).find($accordionIcon).toggleClass('fa-chevron-down fa-chevron-up');
            });
        }, 

        toggleButton: function () {
            var $responsiveButton  = $('.nav__button');
            
            $responsiveButton.on ( 'click', function() {
                $(this).parents('.nav').find('.nav__menu').toggleClass('show hidden');
            });
        },

        toggleSubmenu: function () {
            var $Menu = $('.nav__menu');
            
            $('.nav__menu').on ( 'click','.nav__menu-list--dropdown a', function() {
                $(this).siblings('.nav__submenu').toggleClass('show2 hidden');
                $(this).find('.fa-mob').toggleClass('fa-chevron-down fa-chevron-up');
            });
        }

        // sliderAutoplay: function () {
        //     $('.autoplay').slick({
        //       slidesToShow: 2,
        //       slidesToScroll: 1,
        //       autoplay: true,
        //       autoplaySpeed: 2000,
        //   });
        // }
    };

    var checkJquery = function () {
        Modernizr.load([
        {
            test    : window.jQuery,
            nope    : assets._jquery_local,
            complete: Site.init
        }
        ]);
    };

    Modernizr.load({
        load    : assets._jquery_cdn,
        complete: checkJquery
    });

})( window, document );
