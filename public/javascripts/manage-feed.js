$(document).ready( function() {
    var productRelated = Handlebars.compile($("#feedTemplate").html());


    $('#loadMoreFeed').on('click', function(){
        var currentPage = parseInt($('.feed').attr('data-page'));
        $.ajax({
            url: '/api/getFeed/'+(currentPage+1),
        }).success(function(result) {
            console.log(result)
        })
    })
})