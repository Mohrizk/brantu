//Initialize Global User Object

var User = {
		firstName:"Linda",
		lastName:"Fredriksson",
		gender:"female",
		age: 25,
		avatar:"https://scontent-cai1-1.xx.fbcdn.net/hphotos-xft1/v/t1.0-9/1526174_1252436751438285_6465530710645500859_n.jpg?oh=a69e7b0c1915f6aa5fb1dbe92338b6c0&oe=5784A6CE",
		magazine:{enabled:true, added:false , preferenceList:[{'type':'brand', 'name': 'Nike','key':'n12'}, {'type':'brand', 'name': 'Iceberg', 'key':'ic3'},{'type':'category', 'name': 'Heels', 'key':'womens-shoes-heels'}, {'type':'category','name': 'Sports Clothing Sale', 'key':'womens-sports-clothing-sale'}]}, // Dummy data
		brands:["ic3", "ti5", "g53", "4be", "g38", "kc1"],
		details:[{'name':'ageGroup', 'value':'adult'}, {'name':'assortmentArea', 'value':'standard'}, {'name':'gender', 'value':'female'}],// Dummy data
		sizes:{'added':true, 'sizeList': [{'name':'tops', 'value':'s'},  {'name':'pants', 'value':'32'}, {'name':'shoes', 'value':'40'}] }
}


var Offers ={
		today:{ 'main': {'name': 'fillipa K- Tops', 'descripton': 'Refine quality top', 'expiry':'2 days', 'image':'http://www.whattoweartoday.com/wp-content/uploads/2012/10/Filippa-K-aw-2013-8.jpg'},
				'list': [{'name':'Lauren by RalfLauren', 'image': 'http://media4.popsugar-assets.com/files/2011/10/41/5/192/1922564/15b79f14cac06a47_adv6946ck6/i/Ralph-Lauren-Iconic-Ad-Campaigns.jpg', 'expiry': '2days' },
				        {'name':'Party cloth', 'image': 'https://mosaic01.ztat.net/nvg/media/large/TO/12/1C/03/KA/11/TO121C03K-A11@17.jpg', 'expiry': '2days' },
				        {'name':'Candice Cooper - Shoes', 'image': 'https://www.scarparossa.com/media/catalog/product/cache/2/image/940x587/9df78eab33525d08d6e5fb8d27136e95/c/a/candice-cooper-rock-argento-3.jpg', 'expiry': '2days' }]
			  },
		upcoming:[{'when':'tomorrow',

				  'list': [{'name':'Lacoste', 'image': 'https://media.ztat.net/media/teaser/brand/teaser_brand_806x212_LA2_LACO_Lacoste_FS16_uni_all_NEU.jpg', 'percentage': '70%' },
				            {'name':'Wear to party', 'image': 'https://media.ztat.net/media/teaser/brand/teaser_premium_KM3_KatMaconi_SS14_uni_all.jpg', 'percentage': '65%' },
				            {'name':'KARL LAGERFELD', 'image': 'https://media.ztat.net/media/teaser/brand/teaser_brand_806x212_K48_KarlLagerfeld_FS16_women_all.jpg', 'percentage': '40%' }]}]
}


//***********************Initiate global variables


/*************************Loading **************************/

function Loading(){
	return '<div class="row"><div class="col-md-12">'+
	   			'<div class="fetching">'+
				    '<h6 class="text-center">LOADING</h6>'+
					'<div class="loader loader--style3" title="2">'+
				    '<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">'+
				     '<path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">'+
				      ' <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"/>'+
				       '</path>'+
				    '</svg>'+
				   '</div>'+
			'</div></div>';
}

function DeleteModal(preferenceName){

	var html= '<div class="modal fade fill-in in" id="modalFillIn" tabindex="-1" role="dialog" aria-hidden="false" style="display: block;">'+
			 '<div class="modal-dialog "><div class="modal-content"><div class="modal-header text-left">'+
			 '<h5 class="text-left p-b-5 all-caps">Are you sure you what to delete your <br/><span class="font-GothamMedium all-caps">'+preferenceName+' Carousel</span></h5>'+
			 '</div><div class="modal-body"><div class="row">'+
			 '<div class="col-md-4 col-md-offset-4 no-padding sm-m-t-10 sm-text-center">'+
			 '<button type="button" class="btn btn-danger btn-lg btn-large fs-15" data-preference="'+preferenceName+'" id="delete-Carousel">YES, DELETE IT</button>'+
			 '</div>'+
			 '<div class="col-md-4 no-padding sm-m-t-10 sm-text-center">'+
			 '<button type="button" class="btn btn-info btn-lg btn-large fs-15" data-dismiss="modal" id="keep-Carousel">NAH, KEEP IT</button>'+
			 '</div></div></div><div class="modal-footer"></div></div></div></div>';
	$(".content").prepend(html);
}

/*******************************************************************/


/******** Load TOday offers  *********************************/
function loadTodayOffers(offers){
	var offershtml='';
	$.each(offers.today.list, function(i,item) {
		offershtml += '<li class="offer">'+
					  '<div class="image" style="background-image: url('+item.image+');"></div>'+
					  '<span>'+item.name+'</span>'+
					  '<div class="expiresin">Expires in '+item.expiry+'</div></li>';

	});


	var html= ' <div class="today b-b b-black" style="padding-top:3vw;">'+
			  '<h2 class=" bold text-black b-b b-black p-b-1v"><font class="font-harriet light all-caps"> Exclusive Sales</font> <br/><font class="light"> Starting</font>Today</h2>'+
			  ' <ul>'+
			  '<li class="main offer">'+
			  '<div class="link" sec:authorize="isAuthenticated()" style="top:0;bottom:0;left:0;right:0;z-index:100;position:absolute;" destination="offer"></a></div>'+
			  '<div class="link" sec:authorize="isAnonymous()" style="top:0;bottom:0;left:0;right:0;z-index:100;position:absolute;" destination="offer"></a></div>'+
			  '<div class="image" style="background-image: url('+offers.today.main.image+');"></div>'+
			  '<span>'+ offers.today.main.name +'<br/><font>'+ offers.today.main.description +'</font><br/><button class="btn btn-default btn-rounded btn-cons all-caps pull-right">Shop Now</button></span>'+
			  '<div class="expiresin">Expires in '+offers.today.main.expiry+'</div></li>'+
			  offershtml+
              '</ul></div>';
   $("#today").append(html);
}


/******** Load Upcoming offers  *********************************/
function loadUpcomingOffers(offers){
	var html = ''

	$.each(offers.upcoming, function(i,data) {

		var offershtml='';
		$.each(data.list, function(i,item) {
			offershtml += '<li class="offer">'+
			 			  '<div class="dark"></div>'+
						  '<div class="image" style="background-image: url('+item.image+');"></div>'+
						  '<span>'+item.name+'</span>'+
						  '<div class="offerpercentage">Up to '+item.percentage+'</div></li>';

		});


		html= '<div class="upcoming p-b-1v b-b b-black " style="padding-top:6vw; margin-bottom: 4vw;">'+
			'<h2 class=" bold text-black b-b b-black p-b-1v capitalize"><font class="font-harriet light all-caps"> Exclusive Sales</font> <br/><font class="light"> Starting</font>'+data.when +'</h2>'+
				  ' <ul>'+
				   offershtml+
	              '</ul></div>';
	});

 $("#upcoming").append(html);
}


//Add UserName & Picture

loadTodayOffers(Offers);
loadUpcomingOffers(Offers);





(function($) {

'use strict';
$(window).on('load', function()  {

});


$(document).ready(function() {
	 //$("#birth-date").birthdayPicker({maxAge: 65, sizeClass: "span2"});
	/************************************************INITIALIZATION*********************/
	$(document).on('click','#close-AuthenticationPopUp', function(e){
		$('#AuthenticationPopUp').addClass('hidden');
	})

	$("#pricerange").ionRangeSlider({
		type: "double",
		min: 0,
		max: 1000,
		from: 200,
		to: 800,
		prefix: "$"
    });

	$(".brand-multiple").select2({
		placeholder: "SELECT BRAND"
	});
	$(".category-multiple").select2({
		placeholder: "SELECT CATEGORY"
	});
	/*****ToolTIP******/
	$('[data-toggle="tooltip"]').tooltip();
	 $('.filtertags').tagsinput({
	      allowDuplicates: false // this will be used to set text of tag
	    });
	 $(document).on('click', '.offer', function (event) {
		 var destination = $(this).find('.link').attr('destination');
		 console.log(destination);
		 // window.location.href = '/offer';
		 if(destination == 'authorize'){
			 $('#AuthenticationPopUp').toggleClass('hidden');
		 }
		 else{
			 window.location.href = '/offer'
		 }
	 });


	$(document).on('click', '#login, #signup', function (event) {
		var x = $(this)
		if(x.attr('id')==='login'){
			console.log(x.attr('id'));
			$('#loginTab').tab('show');
		}
		else if(x.attr('id')==='signup'){
			console.log(x.attr('id'));
			$('#signupTab').tab('show');

		}
		$('#AuthenticationPopUp').removeClass('hidden');

	})

});

})(window.jQuery);

/**********CREATE*****************************************************************************/
 /**********CREATE CAROUSELS*******************************/
var CaroselHtml="";
