
(function($) {

    'use strict';
    $(window).on('load', function()  {

    });


    $(document).ready(function() {
        var feedSelector = $('.feed')
        var feedTemplate = Handlebars.compile($("#feedTemplate").html());
        $('#startFeed').on('click',function(){
            $('html, body').stop().animate({scrollTop:feedSelector.offset().top - 50}, '500', 'swing');
        })
        $('#loadMoreFeed').on('click', function(){
            var currentPage = parseInt(feedSelector.attr('data-page'));
            var totalPage = parseInt(feedSelector.attr('data-total-pages'));
            var department = feedSelector.attr('data-department');
            if(currentPage >= totalPage){
                $('#loadMoreFeed').hide();
                return;
            }
            $('#loadMoreFeed').hide();
            $('#moreFeedLoader').fadeIn();

            console.log('/api/getFeed/'+department+'/'+(currentPage+1))

            $.ajax({
                url: '/api/getFeed/'+department+'/'+(currentPage+1),
            }).success(function(result) {
                var html = feedTemplate({feed: result});
                feedSelector.attr('data-page', currentPage+1)
                console.log(html)
                feedSelector.append(html);
                $('img.lazy').lazyload({effect: "fadeIn", threshold:300}).removeClass("lazy");
                $('#moreFeedLoader').fadeOut('hide')

                if(feedSelector.attr('data-page') < totalPage)
                    $('#loadMoreFeed').fadeIn('slow');

            })
        })
    });

})(window.jQuery);
