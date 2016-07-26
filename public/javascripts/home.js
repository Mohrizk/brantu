
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
            if(currentPage >= totalPage){
                console.log('uhgg')
                $('#loadMoreFeed').hide();
                return;
            }
            $('#loadMoreFeed').hide();
            $('#moreFeedLoader').fadeIn();


            $.ajax({
                url: '/api/getFeed/'+(currentPage+1),
            }).success(function(result) {
                var html = feedTemplate({feed: result});
                feedSelector.attr('data-page', currentPage+1)
                console.log(html)
                feedSelector.append(html);
                $('#moreFeedLoader').fadeOut('hide')

                if(feedSelector.attr('data-page') < totalPage)
                    $('#loadMoreFeed').fadeIn('slow');

            })
        })

        /*$("#owlLanding").owlCarousel({

            slideSpeed : 1000,
            paginationSpeed : 800,
            singleItem:true,
            autoPlay: 3000,
        });*/

        $(window).scroll(function(){

                var feed = $('.feed');

            if(feed.length !== 0 ){

                var sideAd = $('#sideBanner')
                var currentScroll = $(document).scrollTop();
                var headerHeight = $('.header').height();

                var footer = $('#footer')

                if((currentScroll+headerHeight) > feed.offset().top &&  (currentScroll+headerHeight) < (feed.offset().top+ feed.height())){
                    sideAd.css('position','fixed').css('top',headerHeight).css('bottom','auto');
                }
                if(feed.offset().top > sideAd.offset().top){
                    sideAd.css('position','relative').css('top','0').css('bottom','auto');
                }

                if(footer.offset().top < (sideAd.offset().top +sideAd.height() +30)){
                    sideAd.css('position','absolute').css('top','auto').css('bottom',30);
                }

            }


        })

    });

})(window.jQuery);
