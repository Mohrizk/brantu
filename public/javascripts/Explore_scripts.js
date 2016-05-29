(function($) {

    'use strict';
    
    $(document).ready(function () {
        
        // Initializes search overlay plugin.
        // Replace onSearchSubmit() and onKeyEnter() with 
        // your logic to perform a search and display results
        $(".list-view-wrapper").scrollbar();

        $('[data-pages="search"]').search({
            searchField: '#overlay-search',
            closeButton: '.overlay-close',
            suggestions: '#overlay-suggestions',
            brand: '.brand',
            onSearchSubmit: function(searchString) {
                console.log("Search for: " + searchString);
            },
            onKeyEnter: function(searchString) {
                console.log("Live search for: " + searchString);
                var searchField = $('#overlay-search');
                var searchResults = $('.search-results');

                clearTimeout($.data(this, 'timer'));
                searchResults.fadeOut("fast");
                var wait = setTimeout(function() {

                    searchResults.find('.result-name').each(function() {
                        if (searchField.val().length != 0) {
                            $(this).html(searchField.val());
                            searchResults.fadeIn("fast");
                        }
                    });
                }, 500);
                $(this).data('timer', wait);

            }
        })

          /*---------Carosels.-----------*/
        // Main.
           $("#Category-Carousel").owlCarousel({
              itemsCustom : [
                    [0, 2],
                    [450, 1],
                    [600, 2],
                    [700, 2],
                    [1000, 3],
                    [1200, 4],
                    [1400, 4],
                    [1600, 4]
                  ],// itemsMobile disabled - inherit from itemsTablet option
               pagination : true
           })
          $("#Category-Prev").click(function(){
              $("#Category-Carousel").trigger('owl.next');
          })
$("#Category-Next").click(function(){
             $("#Category-Carousel").trigger('owl.next');
          })
    
         //Suggest brand related posts

        
         
   
         /*---------Pop Ups-----------*/
        //Variable
         var card_background =$('#card-popup-background');       
         var futureposition;
         var previousposition;
         var currentposition;
           
        
        //Functions
         var nextcard = function(){
          
         if(currentposition.nextAll("#card").length==0)
          {
                
               if(currentposition.parent().nextAll(".day").length ==0)
                {
                        $('#card-popup-notifier').fadeIn(200, "linear");
                        $('#card-popup-notifier').fadeOut(1600, "linear");
                }
              
                else 
                {
                    
                     if(currentposition.parent().nextAll(".day:first").children("#card:first").length>0)
                     {
                      currentposition =currentposition.parent().nextAll(".day:first").children("#card:first");
                      if (currentposition.is(":visible"))
                        {
                      var newsource = currentposition.find(".card-content").find(".Preview").attr("src");
                      $( "#iframe-popup" ).remove();
                      card_background.append("<iframe id='iframe-popup' src='"+newsource+"'frameBorder='0'  onload='resizeIframe(this)' style='display:none'></iframe>"); 
                            $('#iframe-popup').fadeTo(900,1)
                         }
                      else { nextcard(); }
                     }
                     else
                    {
                        alert("booo");
                     
                    }
               }
          }
         else 
         {
             
             futureposition = currentposition.next().attr("id");
             if(futureposition.indexOf("card") >= 0)
            {
                 currentposition =currentposition.next();
                if (currentposition.is(":visible"))
                {var newsource = currentposition.find(".card-content").find(".Preview").attr("src");
                  $( "#iframe-popup" ).remove();
                card_background.append("<iframe id='iframe-popup' src='"+newsource+"'frameBorder='0' onload='resizeIframe(this)' style='display:none'></iframe>");  
                $('#iframe-popup').fadeTo(900,1)}
                else { nextcard(); }
            }
             
           }
             change_info();
      }
 
         var prevcard = function(){
          if(currentposition.prevAll("#card").length==0)
          {
                
               if(currentposition.parent().prevAll(".day").length ==0)
                {
                        $('#card-popup-notifier').fadeIn(200, "linear");
                        $('#card-popup-notifier').fadeOut(1600, "linear");
                }
              
                else 
                {
                    
                      if(currentposition.parent().prevAll(".day:first").children("#card").length>0)
                     {
                          currentposition =currentposition.parent().prevAll(".day:first").children("#card:last");
                          if (currentposition.is(":visible"))   
                          {  var newsource = currentposition.find(".card-content").find(".Preview").attr("src");
                              $( "#iframe-popup" ).remove();
                              card_background.append("<iframe id='iframe-popup' src='"+newsource+"'frameBorder='0' scrolling='no' onload='resizeIframe(this)' style='display:none'></iframe>"); 
                           $('#iframe-popup').fadeTo(900,1)
                          }
                          else{ prevcard(); }
                     }
                     else
                    {
                        alert("booo");
                     
                    }
               }
          }
         else 
         {
             
             previousposition = currentposition.prev().attr("id");
             if(previousposition.indexOf("card") >= 0)
            {
                 currentposition =currentposition.prev();
                    if (currentposition.is(":visible"))   
                     { 
                         var newsource = currentposition.find(".card-content").find(".Preview").attr("src");
                          $( "#iframe-popup" ).remove();
                        card_background.append("<iframe id='iframe-popup' src='"+newsource+"'frameBorder='0' onload='resizeIframe(this)' style='display:none'></iframe>"); 
                         $('#iframe-popup').fadeTo(900,1)
                    }
                    else{ prevcard(); }
                
            }
             
           }
             
             change_info();
      }

         var change_info =function(){ 
          
          $('#info-brand').text(currentposition.find('.card-header').find('h5').text())
          
          $('#info-category').text( currentposition.attr("brand-category") + " - " + currentposition.find('.card-header').find('h6').text())
          
          $('#info-subject').text(currentposition.find('.card-description').find('p').text())
         
          $('#brand_related').text( "Also from " + currentposition.find('.card-header').find('h5').text())    
          
          $('#category_related').text( "Related to "+currentposition.attr("brand-category") )
         }
     
         
         
         $('.view-offer').click(function () {
            currentposition=$(this).closest(".card");
            var source = $(this).prev().attr("src");
            $('.page-container').css('overflow', 'hidden');
            $( "#iframe-popup" ).remove();
            card_background.append("<iframe id='iframe-popup' src='"+source+"'frameBorder='0' scrolling='no' onload='resizeIframe(this)' style='display:none'></iframe>");    
            change_info();
            card_background.fadeIn("fast");
            $('#iframe-popup').fadeTo(1300,1)
      });
        
         $('#close-popup').click(function() {
          $('.page-container').css('overflow', 'auto');
          card_background.fadeOut("fast");
          
      });
        
         $('#leftbutton').click(function(e) {
          
          prevcard();
          
          e.stopPropagation();
          
      });
         
         $('#information').click(function(e) {
          e.stopPropagation();
          
      });
        
         $('#rightbutton').click(function(e) {
          nextcard();
          e.stopPropagation();
      });
      
        /*$('#card-popup-background').click(function() {
          $('.page-container').css('overflow', 'auto');
          card_background.slideUp("fast");
      });*/
         
 
        $(document).keyup(function(event) {
        if ( card_background.is(":visible")) 
        {
             if (event.which == 27 )
             { $('.page-container').css('overflow', 'auto');
               card_background.fadeOut("fast"); 
             }
            
             if(event.which == 39)
             {
                 nextcard();
             }
            
             if(event.which == 37)
             {
                 prevcard();
             }
            
            
             if(event.which == 38)
             {
                 
             }
        }
       });
        

        
        
    });

    $('.panel-collapse label').on('click', function(e){
        e.stopPropagation();
    })
   
                      
                      
})(window.jQuery);

