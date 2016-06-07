
(function($) {

    'use strict';
    $(window).on('load', function()  {

    });


    $(document).ready(function() {
        //$("#birth-date").birthdayPicker({maxAge: 65, sizeClass: "span2"});
        /************************************************INITIALIZATION*********************/


        $("#pricerange").ionRangeSlider({
            type: "double",
            min: 0,
            max: 5000,
            from: 200,
            to: 800,
            prefix: "SEK"
        });

       /* $(".brand-multiple").select2({
            placeholder: "SELECT BRAND"
        });
        $(".category-multiple").select2({
            placeholder: "SELECT CATEGORY"
        });*/
        /*****ToolTIP******/
        $('[data-toggle="tooltip"]').tooltip();
    });

})(window.jQuery);
