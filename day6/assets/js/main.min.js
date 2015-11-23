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
            var $input      = $( "#fullname,#email,#password,#hobby,#address" );
            var $fullname   = $( "#fullname" );
            var $email      = $( "#email" );
            var $password   = $( "#password" );
            var $hobby      = $( "#hobby" );
            var $address    = $( "#address" );
            var $emailRegex = '^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$'; 
            var $submit     = $( "#submit" );
            $submit.on( "click", 
                function (e) {
                $("form .err-msg").remove();
                    if ($fullname.val().length > 0) {
                        $fullname.addClass("form-input--success");
                        $fullname.removeClass("form-input--error");
                        $("#fullname-row .err-msg").remove();
                        e.preventDefault(e);
                    }

                    else if ($fullname.val().length == 0) {
                        $fullname.addClass("form-input--error");
                        $fullname.removeClass("form-input--success");
                        $fullname.after('<div class="err-msg">This Field Cannot Left Blank</div>');
                        e.preventDefault(e);
                    }

                    else if ($fullname.is(":focus")) {
                        $("#fullname-row .err-msg").remove();
                    }

                    if ($email.val().length > 0) {
                        $email.addClass("form-input--success");
                        $email.removeClass("form-input--error");
                        $("#email-row .err-msg").remove();
                        e.preventDefault(e);
                    }

                    else if ($email.val().length == 0) {
                        $email.addClass("form-input--error");
                        $email.removeClass("form-input--success");
                        $email.after('<div class="err-msg">This Field Cannot Left Blank</div>');
                        e.preventDefault(e);
                    }

                    // else if ($emailRegex == false) {
                    //     $email.addClass("form-input--error");
                    //     $email.removeClass("form-input--success");
                    //     $email.after('<div class="err-msg">Your email input is invalid, please insert valid e-mail address</div>');
                    //     e.preventDefault(e);
                    // }

                    if ($password.val().length > 0) {
                        $password.addClass("form-input--success");
                        $password.removeClass("form-input--error");
                        $("#password-row .err-msg").remove();
                        e.preventDefault(e);
                    }

                    else if ($password.val().length == 0) {
                        $password.addClass("form-input--error");
                        $password.removeClass("form-input--success");
                        $password.after('<div class="err-msg">This Field Cannot Left Blank</div>');
                        e.preventDefault(e);
                    }

                    if ($hobby.val().length > 0) {
                        $hobby.addClass("form-input--success");
                        $hobby.removeClass("form-input--error");
                        $("#hobby-row .err-msg").remove();
                        e.preventDefault(e);
                    }

                    else if ($hobby.val().length == 0) {
                        $hobby.addClass("form-input--error");
                        $hobby.removeClass("form-input--success");
                        $hobby.after('<div class="err-msg">This Field Cannot Left Blank</div>');
                        e.preventDefault(e);
                    }

                    if ($address.val().length > 0) {
                        $address.addClass("form-input--success");
                        $address.removeClass("form-input--error");
                        $("#address-row .err-msg").remove();
                        e.preventDefault(e);
                    }

                    else if ($address.val().length == 0) {
                        $address.addClass("form-input--error");
                        $address.removeClass("form-input--success");
                        $address.after('<div class="err-msg">This Field Cannot Left Blank</div>');
                        e.preventDefault(e);
                    }

                }
            )
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
