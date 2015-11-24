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
            Site.formValidation();
            Site.formClone();
            Site.hapus();

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

        formValidation: function () {
            var $input      = $( "#newsletter .form-input");
            var $submit     = $( "#submit" );
            var $err        = $( ".err-msg" );
            var $formErr    = $( "#newsletter .err-msg");
            

            $submit.on( "click", function(e) {
                $("#newsletter .err-msg").remove();
                $input.removeClass("form-input--success form-input--error");
                $input.each(function(index, value){
                    // $form-error.remove();
                    // console.log($input.eq(index).val().length);
                    
                    if ($.trim($input.eq(index).val()).length > 0) {
                        $input.eq(index).addClass("form-input--success");
                    } else if ($.trim($input.eq(index).val()).length === 0) {
                        $input.eq(index).addClass("form-input--error");
                        $input.eq(index).after('<div class="err-msg">This Field cannot left blank</div>');
                        $(".form-input--error:first").focus();
                        event.preventDefault(e);
                    }
                });
            });   
        },

        formClone: function () {
            var $cloneBtn      = $( '#add');
            var $identifier    = 1;

            $cloneBtn.on('click', function(e) {
                $( "#hobby" ).clone().appendTo( "#hobby-row" ).
                after('<button type="button" class="hapus">Hapus</button>');
                e.preventDefault();

            });   

            $('form').on('click','.hapus', function(e) {
                $(this).parents('.hobby-clone').remove();
                e.preventDefault();
            });   

        },

        hapus: function () {
            var $cloneBtn      = $( '#add');
            var $eraseBtn      = $( '.hapus');
            var $identifier    = 1;

            $eraseBtn.on( 'click', function(e) {
                $('input').remove();
                e.preventDefault();
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
