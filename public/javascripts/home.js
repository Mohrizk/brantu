
(function($) {

    'use strict';
    $(window).on('load', function()  {

    });


    $(document).ready(function() {
        //$("#birth-date").birthdayPicker({maxAge: 65, sizeClass: "span2"});
        /************************************************INITIALIZATION*********************/
        $("#owlLanding").owlCarousel({

            // Show next and prev buttons
            slideSpeed : 1000,
            paginationSpeed : 800,
            singleItem:true,
           // autoPlay: 3000,

            // "singleItem:true" is a shortcut for:
            // items : 1,
            // itemsDesktop : false,
            // itemsDesktopSmall : false,
            // itemsTablet: false,
            // itemsMobile : false

        });

    });

})(window.jQuery);
