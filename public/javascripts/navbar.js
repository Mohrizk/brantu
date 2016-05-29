var sly2;
var Offers ={
		today:{'list': [{'name': 'fillipa K- Tops', 'descripton': 'Refine quality top', 'expiry':'2 days', 'image':'http://www.whattoweartoday.com/wp-content/uploads/2012/10/Filippa-K-aw-2013-8.jpg'},{'name':'Lauren by RalfLauren', 'image': 'http://media4.popsugar-assets.com/files/2011/10/41/5/192/1922564/15b79f14cac06a47_adv6946ck6/i/Ralph-Lauren-Iconic-Ad-Campaigns.jpg', 'expiry': '2days' },
				        {'name':'Party cloth', 'descripton': 'Refine quality top', 'image': 'https://mosaic01.ztat.net/nvg/media/large/TO/12/1C/03/KA/11/TO121C03K-A11@17.jpg', 'expiry': '2days' },
				        {'name':'Candice Cooper - Shoes', 'descripton': 'Refine quality top', 'image': 'https://www.scarparossa.com/media/catalog/product/cache/2/image/940x587/9df78eab33525d08d6e5fb8d27136e95/c/a/candice-cooper-rock-argento-3.jpg', 'expiry': '2days' }]
			  },
		upcoming:[{'when':'tomorrow',

				  'list': [{'name':'Lacoste', 'image': 'https://media.ztat.net/media/teaser/brand/teaser_brand_806x212_LA2_LACO_Lacoste_FS16_uni_all_NEU.jpg', 'percentage': '70%' },
				            {'name':'Wear to party', 'image': 'https://media.ztat.net/media/teaser/brand/teaser_premium_KM3_KatMaconi_SS14_uni_all.jpg', 'percentage': '65%' },
				            {'name':'KARL LAGERFELD', 'image': 'https://media.ztat.net/media/teaser/brand/teaser_brand_806x212_K48_KarlLagerfeld_FS16_women_all.jpg', 'percentage': '40%' }]}]
}

//DUMMY

var womenCategories = [{"name":"Clothing", "image":"https://mosaic02.ztat.net/nvg/media/detail/VE/12/1C/0U/XQ/11/VE121C0UX-Q11@12.jpg"},
                       {"name":"Shoes", "image":"https://mosaic01.ztat.net/nvg/media/detail/AD/11/1S/0B/2Q/11/AD111S0B2-Q11@12.1.jpg"},
                       {"name":"accessories", "image":"https://mosaic01.ztat.net/nvg/media/detail/LY/35/1H/01/4Q/11/LY351H014-Q11@13.jpg"},
                       {"name":"sports", "image":"https://mosaic02.ztat.net/nvg/media/detail/AD/54/1D/0C/GQ/11/AD541D0CG-Q11@9.jpg"},
                       {"name":"Beauty", "image":""}]


//AJAX SHOULD BE MADE TO GET CATEGORIES
var ajaxCategories= $.ajax({
	url: 'https://api.zalando.com/categories?key=womens-clothing&key=womens-shoes&key=sports-womens&key=bags-accessories-womens&key=premium-womens&key=womens-beauty',
	type: 'get',
	dataType: 'json',
	error: function(data){
		alert("mmmm");
	}
	})




function loadWardrobeFinder(){

	var html = '';

	  html =  '<div class="wardrobefinder" nav-down-role="tab" nav-down-data="wardrobeFinder" style="display:none; margin-left:12vw;">'+
		  	  '<h5 class="font-GothamBold text-white">Cant find the right product? <span>tell us what you want</span></h5>'+
	  		  '<h4 class="text-white m-b-1v">I am looking for a <span>'+
	  		  '<select><option>Shoe</option></select></span></h4>'+
		      '<h4 class="text-white m-b-1v">From <span><select><option>My favourite Brands</option></select></span></h4>'+
		      '<h4 class="text-white m-b-1v">At a <span> <select><option>Any Price</option><option>Discounted Price</option></select></span> price range of <span><select><option>Any Price</option></select></span></h4>'+
		      '<button class="btn btn-default"> Find Now</button>'
		      '</div>';

	  $('.overlay').append(html);

}



function loadOfferCarousel(offers){
	var offershtml = '';

	$.each(offers.today.list, function(i,item) {
		offershtml += '<li class="offer" style="width:20vw; height:15vw;">'+
					  '<div style="background-image: url('+item.image+'); width:100%; height:100%; background-size: cover; background-repeat: no-repeat; background-position:top center;"></div>'+
					  '<span>'+item.name+'</span>'+
					  '<div class="expiresin">Expires in '+item.expiry+'</div></li>';

	});

	var html =  '<div nav-down-role="tab" nav-down-data="today" style="display:none;">'+
				'<div style="position:absolute; z-index:100; right:0; top:40%;height:4vw; width:4vw; font-size:4vw; background:rgba(0,0,0,0.8);"> <i style="padding-right:1vw;" class="text-white fa top-right fa-angle-right"></i></div>'+
    			'<div style="position:absolute; z-index:100; left:0; top:40%; height:4vw; width:4vw;font-size:4vw; background:rgba(0,0,0,0.8);"> <i style="padding-left:1vw;" class="text-white fa top-left fa-angle-left"></i> </div>'+
				'<div class="today frame" id="sly_offerlist">'+
		         '<ul class="slidee">'+
	             offershtml +
                 '</ul></div></div>';


  $('.overlay').append(html);

   /*sly2 = new Sly("#sly_offerlist",{
	    horizontal: 1,
	    speed: 300,
	    mouseDragging: 1,
	    touchDragging: 1
	}).init();
	sly2.reload();*/

}

/******** Categories  **********/
function loadCategories(){
	var categorieshtml='';
	var subcategorieshtml='';
	var firstImage='';
	var response = ajaxCategories.responseJson;
	$.each(womenCategories, function(i,item) {
		categorieshtml += '<li class="">'+
		                  '<a class="white" value="'+item.name+'" type="categoryMenu" image="'+item.image+'">'+
						  item.name+
						'</a></li>';



		                 for(i=0; i< response.content.length;i++){
							if(response.content.name === item){
							    var temp='';

								$.each(response.content.childKeys, function(i,subitem) {
									temp += '<li class=""><a class="white" >'+
														subitem+
													  '</a></li>';
								});

								categorieshtml += '<div for="'+item+'" type="subcategory"><ul>'+
												    temp+
								                   '</ul></div>';

								break;
							}
						};
	});

	var html = '<div nav-down-role="tab" nav-down-data="discover" style="display:none; width:100%; height:100%;">'+
				'<div class="pull-right" style="margin-right:10vw; margin-top:1vw;"><img src="'+firstImage +'" style="width:10vw;" role="category-preview-image"></div>'+
				'<div class="nav-down inline">'+
				'<ul >'+
				categorieshtml +
				'</ul></div>'+
				'<div class="categories inline">'+
				'<div>'+
				'</div>';
	 $('.overlay').append(html);
}









loadOfferCarousel(Offers);
loadWardrobeFinder();
ajaxCategories.done(function (data) {
	var firstImage ='';
	var categorieshtml='';
	var subcategorieshtml='';
	var response = data.content;
	$.each(womenCategories, function(i,item) {
		categorieshtml += '<li class="">'+
		                  '<a class="white" value="'+item.name+'" type="categoryMenu" image="'+item.image+'">'+
						  item.name+
						'</a></li>';

						if(i==0) {firstImage=item.image;}
		        for(y=0; y< response.length;y++){
							if(response[y].name.toLowerCase() === item.name.toLowerCase()){
							    var temp='';


								$.each(response[y].childKeys, function(j,subitem) {


									temp += '<li class="inline" style="margin:0.5vw; padding:0.1vw; width:8vw; height:3vw; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;"><a class="white" >'+
														subitem+
													  '</a></li>';
								});

								var display = ''
								if(i==0){
									display = ''
								}
								else {
									display = 'display:none;';
								}

								subcategorieshtml += '<div subcategory-for="'+item.name+'" type="subcategory" style="'+display+'"><ul style="margin:1vw;">'+
												      temp+
								                     '</ul></div>';

								break;
							}
						};
	});

	var html = '<div nav-down-role="tab" nav-down-data="discover" style="display:none; width:100%; height:100%; position:relative;">'+
				'<div class="pull-right" style="margin-right:10.5vw; margin-top:1vw;"><img src="'+firstImage+'" style="width:12vw;" role="category-preview-image"></div>'+
				'<div class="nav-down b-r b-grey inline">'+
				'<ul >'+
				categorieshtml +
				'</ul></div>'+
				'<div class=" inline" style="width:50%; vertical-align:top;">'+
				 subcategorieshtml+
				'<div>'+
				'</div>';
	$('.overlay').append(html);
});


$(document).ready(function() {

	$('#navbar-categories li a').on( 'mouseover',function(){
		$('.category-expand-container').addClass('hidden');
		//$('#navbar-categories li a').removeClass('active');
		//$(this).addClass('active');
		$('#navbar-categories-expand').addClass('expand');
		var key = $(this).attr('key');
		$('div[expand-parentKey="'+ key +'"]').removeClass('hidden');

		if($("body").scrollTop() < 50){
			var totalHeight = $('#navbar-categories-expand').outerHeight();
			//$('.content').css({"transform": "translate3d(0px, "+totalHeight +"px, 0px)"});
		}
		//$('.content').css({"opacity": "0.5"});
	});
	$('.header').on('mouseleave',function(){
		$('.category-expand-container').addClass('hidden');
		//$('#navbar-categories li a').removeClass('active');
		//$('.content').css({"transform": "translate3d(0px, 0px, 0px)"});
		$('.content').css({"opacity": "1"});
	});

	$(document).on( 'mouseover','a[nav-down-enabled="true"]' , function (event) {

			$('div[nav-down-role="tab"]').hide();
			$('div[nav-down-data="'+$(this).attr('nav-down-header')+'"]').show();
			$('div[role="nav-down-container"]').show();
	});


	$(document).on('mouseleave','div[role="nav-down-container"]' , function (event) {
		$('div[role="nav-down-container"]').hide();
	});



	$(document).on( 'mouseover','a[type="categoryMenu"]' , function (event) {
		var name = $(this).attr('value');
		var newsrc = $(this).attr('image');
		$('img[role="category-preview-image"]').attr('src',newsrc);
		$('div[type="subcategory"]').hide();
		$('div[subcategory-for="'+name+'"]').show();
	});


	$(document).on( 'scroll' , function (event) {
		var header= $('.header').height();
		var current = $(document).scrollTop();
		var headerSegment = $('#header-Dropdown');

		if(current > header)
			headerSegment.slideUp();
		else
			headerSegment.slideDown();
	});
})
