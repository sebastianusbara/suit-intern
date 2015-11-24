/*! [PROJECT_NAME] | Suitmedia */

;(function ( window, document, undefined ) {

    var path = {
        css: myPrefix + 'assets/css/',
        js : myPrefix + 'assets/js/vendor/'
    };

    var assets = {
        _jquery_cdn     : 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js',
        _jquery_local   : path.js + 'jquery.min.js',
        _fastclick      : path.js + 'fastclick.min.js'
    };

    var Site = {

        init: function () {
            Site.fastClick();
            Site.enableActiveStateMobile();
            Site.WPViewportFix();
            Site.btnClick();

            window.Site = Site;
        },

        fastClick: function () {
            Modernizr.load({
                load    : assets._fastclick,
                complete: function () {
                    FastClick.attach(document.body);
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

        btnClick: function () {
            var $btn = $('.add');
            var $h1 = $('h1');
            var $input = $('input');

            $btn.on('click', function () {
                var $newInput = $('#clone').clone();
                $newInput.removeAttr('id');
                $newInput.appendTo( $('#clone').parent() );
                $newInput.find('input')
                    .val('')
                    .removeClass('form-input--error form-input--success')
                    .focus();
                $newInput.find('button').removeClass('hidden');
            });

            $('form').on('click', '.remove', function (e) {
                $(this).parents('.form__row').remove();
            });

            $('form').on('submit', function (e) {
                var isValid = true;
                var $inputs = $(this).find('input');

                $inputs.removeClass('form-input--error form-input--success');

                $.each($inputs, function(index, input) {
                    var $input = $(input);
                    var value = $.trim($input.val());

                    if ( value === '' || value === null ) {
                        $input.addClass('form-input--error');
                        isValid = false;
                    } else {
                        $input.addClass('form-input--success');
                    }
                });

                if ( !isValid ) {
                    $('.form-input--error').eq(0).focus();
                    e.preventDefault();
                }
            });
        }

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
