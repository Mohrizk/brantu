
/****************************
 * INITIALIZATIONNNNNN
 * @type {string}
 */
var client = algoliasearch("D3IWZXC0AH", '3d6a60c228b6e8058770fdf8eab2f652');
var helper = algoliasearchHelper(client,'product_sweden', {
	hierarchicalFacets: [{
		name: 'products',
		attributes: ['categories.lvl0', 'categories.lvl1', 'categories.lvl2', 'categories.lvl3'],
        sortBy: ['count:desc', 'name:asc']
	}],
	facets:[  'sale', 'price.value'],
	disjunctiveFacets:['color','brand.name','shop.name','sizes', 'discount']
});

/*****Render Shop LIST*******/
switch (TYPE.name) {
	case 'category':
		helper.toggleRefinement('products','Kvinna > Skor').search();
		break;
	case 'brand':
		helper.addDisjunctiveFacetRefinement('brand.name', TYPE.value.name).search();
		break;
	default:
		helper.search();
		break;
}


//********BEGNING GET & ATTACH JAWBONE RECOMMENDATION
function getRecommendations(itemId){
	var html='';
	$.ajax({
		url: 'https://api.zalando.com/recommendations/'+itemId,
		type: 'get',
		dataType: 'json',
		error: function(data){

		},
		success: function(data){
			var recommendedItems='';
			if(data.length>0)
			{
				$.each(data, function(i,item) {
					var name = item.name.split("-");
					recommendedItems += '<li productID= "'+item.id+'"><img src="'+item.media.images[0].mediumUrl+'" alt="'+item.name+'"/> <div class="brandName">'+name[0]+'</div></li>';
				});
				
				html = '<h5>Similar Products</h5><div class=" frame similarProducts" id="sly_'+itemId+'"><ol class="slidee">'+recommendedItems+'</ol></div>';
				location.find('.recommendedProducts').html(html);	
				
				var horizontalOptions= {
					    horizontal: 1,
					    itemNav: 'basic',
					    speed: 300,
					    mouseDragging: 1,
					    touchDragging: 1
					};

				var sly = new Sly("#sly_"+itemId,{
				    horizontal: 1,
				    itemNav: 'basic',
				    speed: 300,
				    mouseDragging: 1,
				    touchDragging: 1
				}).init();
				sly.reload();	
			}
		}
	});
}

//********BEGINING of Change view********************
function changeView (){
	var list = $('.itemList');
	var container = $('.resultContainer');
	if(!list.hasClass('jbMode')){
		if(list.hasClass('vertical')){
			list.toggleClass('horizontal').toggleClass('vertical');
			container.addClass('noFilter');
		}
		else {
			//$('.itemList').removeClass('vertical').addClass('horizontal');
			list.toggleClass('horizontal').toggleClass('vertical');
			container.removeClass('noFilter');
		}
		//$('html, body').animate({scrollTop: list.closest('.preference').offset().top-45 },100 , $.bez([.5,0,.1,1]));
	}
	
}


/**
 * Ensure that a tag is not filtering the results
 * @param {string} tag tag to remove from the filter
 * @return {AlgoliaSearchHelper}
 * @fires change
 */
$(document).ready( function() {


	var productArray=[];
	var mainSection = $('#mainSection');
	var filterSelector = $('#mainFacetPane');
	var facetContainer = $('#mainFacetContainer');

    var priceLimitsChange = true;
   $("#pricerange").ionRangeSlider({
        type: "double",
        prefix: "SEK", onFinish: function (data) {
            priceLimitsChange= false;
            helper.removeNumericRefinement('price.value')
                .addNumericRefinement('price.value','>', data.from)
                .addNumericRefinement('price.value','<', data.to)
                .search();
        }
    });
    var priceBar = $("#pricerange").data("ionRangeSlider");


	helper.on('result', function(content) {
		productArray = content.hits;
		$('.itemList').html(productTemplate(productArray));

		//Prices
        var newPrice = content.getFacetStats('price.value');
        if(priceLimitsChange) priceBar.update({min: newPrice.min, max: newPrice.max, from: newPrice.min, to:  newPrice.max})
		else priceLimitsChange= true;
        $('.sale').html(onlySaleBoxFacetTemplate({header: HEADERTEXT.facets.sale.header,   content: productHelper.mapWithout(content.getFacetValues('sale'),['true'])}));
        $('.discounts').html(listFacetTemplate(  {header: HEADERTEXT.disjunctionFacets.discount.header, content: productHelper.mapWithout(content.getFacetValues('discount'), ['0'])} ));
        $('.sizes').html(listFacetTemplate(      {header: HEADERTEXT.disjunctionFacets.size.header , content:content.getFacetValues('sizes')}));
        $('.brands').html(listFacetTemplate(     {header: HEADERTEXT.disjunctionFacets.brand.header, content: content.getFacetValues('brand.name')}));
        $('.shops').html(listFacetTemplate(      {header: HEADERTEXT.disjunctionFacets.shop.header ,content: content.getFacetValues('shop.name')}));
		$('.colors').html(colorFacetTemplate(    {header: HEADERTEXT.disjunctionFacets.color.header , content: productHelper.mapColor(content.getFacetValues('color'),COLORS)}));
		$('.filterTags').html(filterTagsTemplate(productHelper.getAllRefinements(helper.getState(['attribute:*']), HEADERTEXT)));
		$('.category').html(categoryFacetTemplate(productHelper.categoryRefinement(content.hierarchicalFacets, helper.getHierarchicalFacetBreadcrumb('products'))));

	});
//*******************************************Filter Actions
	$('.category').on( 'click', 'li a', function (event) {
		var value = $(this).attr('value');
		console.log('value ', value)
		helper.clearRefinements('products').toggleRefinement('products', value).search();
	});
	$('.breadcrumb').on( 'click', 'li a', function (event) {
		var value = $(this).attr('value');
		helper.clearRefinements('products').toggleRefinement('products', value).search();
	});
    $('.brands').on( 'click', 'input', function (event) {
		var value = $(this).attr('value');
		console.log(value);
		if($(this).prop('checked')){
			helper.addDisjunctiveFacetRefinement('brand.name', value).search();
		}
		else{
			helper.removeDisjunctiveFacetRefinement('brand.name', value).search();
		}
	});
    $('.sizes').on( 'change', ' input', function (event) {
		var value = $(this).attr('value');
		if($(this).prop('checked')){
			helper.addDisjunctiveFacetRefinement('sizes', value).search();
		}
		else{
			helper.removeDisjunctiveFacetRefinement('sizes', value).search();
		}
	});
    $('.discounts').on( 'change', ' input', function (event) {
		var value = $(this).attr('value');
		if( $(this).prop('checked')){
			helper.addDisjunctiveFacetRefinement('discount', value).search();
		}
		else{
			helper.removeDisjunctiveFacetRefinement('discount', value).search();
		}
	});
    $('.colors').on( 'change', 'input', function (event) {
		var value = $(this).attr('value');
		//console.log(value)

		if( $(this).prop('checked')){
			helper.addDisjunctiveFacetRefinement('color', value).search();
		}
		else{
			helper.removeDisjunctiveFacetRefinement('color', value).search();
		}
	});
    $('.shops').on( 'change', 'input', function (event) {
        console.log('mmmm')
		var value = $(this).attr('value');
		//console.log(value)

		if( $(this).prop('checked')){
			helper.addDisjunctiveFacetRefinement('shop.name', value).search();
		}
		else{
			helper.removeDisjunctiveFacetRefinement('shop.name', value).search();
		}
	});
    $('.sale').on( 'change', 'input', function (event) {
		var value = $(this).attr('value');
		//console.log(value)

		if( $(this).prop('checked')){
			helper.addFacetRefinement('sale', value).search();
		}
		else{
			helper.removeFacetRefinement('sale', value).search();
		}
	});

  //***********************USER ACTIONS
	mainSection.on( 'click','.changeView' , function (event) {
		var preference = $(this).attr('preference');
		changeView();
	});
	//**********************************************************************JAWBONE ACTIONS - Create and Remove
	//Item Create Jawbone
	$('.itemList').on( 'click','.item .preview-image, .item .moreInfo' , function (event) {
		//console.log('*******')
		var itemcontainer = $('.itemList');
		var jawboneLocation = $('#jawbone');
		var selecteditem = productArray[$(this).attr('index')];
		console.log(selecteditem)
		if(itemcontainer.hasClass("vertical")) {
			changeView();
			isVertical = true;
		}
		else if (itemcontainer.hasClass("horizontal") && !itemcontainer.hasClass("jbMode")){
			isVertical = false;
		}

		jawboneLocation.addClass( "open");
		$('html, body').animate({scrollTop: itemcontainer.offset().top-100 }, 1, $.bez([.5,0,.1,1]));
		var html = jawBoneTemplate(selecteditem);
		$('.jawBoneContainer').html(html);
		itemcontainer.addClass("jbMode");
	});

	//Remove Jawbone
	mainSection.on( 'click','.jawBone .delete' , function () {
		$('.itemList').removeClass("jbMode");
		if(isVertical){
			changeView();
		}
		$('.jawBoneContent').removeClass( "open");
		$('.jawBone').remove();
	});

	//*******************************************JAWBONE ACTIONS - Product Showcase
	//******Hover over mini images
	mainSection.on( 'mouseover','.jawBone .selectedItemImageColoumn ol li img' , function (event) {
		var newImage = $(this).attr('src').replace('catalog','large');
		var location = $(this).closest('.selectedItemImageWrapper').find('.selectedItemPictureContainer').find('.selectedItemZoomPicture');
		location.find('img:first').remove();
		location.append('<img imageorder = "'+$(this).attr('imageorder') +'" src="'+newImage+'"/>');
	});

	//******CLICK NEXT
	mainSection.on( 'click','.jawBone .next-item' , function (event) {
		var currentImage = $(this).closest('.selectedItemZoomPicture').find('img');
		var currentImageOrder = parseInt(currentImage.attr('imageorder'));
		
		var coloumnImages = $(this).closest('.selectedItemImageWrapper').find('.selectedItemImageColoumn');
		var coloumnImagesLength = parseInt(coloumnImages.attr('numofimages'));
		
		var newImageLocation;
		if(currentImageOrder < (coloumnImagesLength-1)) newImageLocation = currentImageOrder + 1;
		else newImageLocation = 0;
		var nthchild = newImageLocation + 1;
		
		var newImageSrc = coloumnImages.find('ol li:nth-child('+nthchild+')').find('img').attr('src').replace('catalog','large');
		currentImage.remove();
		$(this).closest('.selectedItemZoomPicture').append('<img imageorder = "'+newImageLocation+'" src="'+newImageSrc+'"/>');
	});
	
	//******CLICK PREV
	mainSection.on( 'click','.jawBone .prev-item' , function (event) {
		var currentImage = $(this).closest('.selectedItemZoomPicture').find('img');
		var currentImageOrder = parseInt(currentImage.attr('imageorder'));
		
		var coloumnImages = $(this).closest('.selectedItemImageWrapper').find('.selectedItemImageColoumn');
		var coloumnImagesLength = parseInt(coloumnImages.attr('numofimages'));
		
		var newImageLocation;
		if(currentImageOrder > 0) newImageLocation = currentImageOrder - 1;
		else newImageLocation = coloumnImagesLength-1;
		var nthchild = newImageLocation + 1;
		
		var newImageSrc = coloumnImages.find('ol li:nth-child('+nthchild+')').find('img').attr('src').replace('catalog','large');
		currentImage.remove();
		$(this).closest('.selectedItemZoomPicture').append('<img imageorder = "'+newImageLocation+'" src="'+newImageSrc+'"/>');
	});


    var previousScroll = 0;
	var downStateChanged = false;
	var upStateChanged = false;
	function mainFacetPaneScroll(){
		var currentScroll = $(document).scrollTop();
		var footerPosition = $('#footer').offset();
		var filterPosition = filterSelector.offset();
		var headerHeight = $('.header').height();
		var filterWrapperPosition=$('.facetWrapper').offset();
		var filterHeight = $('.facetWrapper').height();


		if(currentScroll +  headerHeight<= filterPosition.top){
			facetContainer.css('position','absolute').css('top','0px').css('bottom', 'auto');
		}
		else if(currentScroll + facetContainer.height() >= footerPosition.top -10){
			facetContainer.css('position','absolute').css('top','auto').css('bottom', '10px');
		}
		else if(previousScroll<currentScroll ){

			if(!upStateChanged && currentScroll + headerHeight >= filterWrapperPosition.top ){
				facetContainer.css('position','absolute').css('bottom','auto').css('top', filterWrapperPosition.top-filterPosition.top);
				downStateChanged = false;
				upStateChanged = true;

			}
			else if(upStateChanged && currentScroll + headerHeight >= filterWrapperPosition.top && currentScroll + $(window).height() <= filterWrapperPosition.top + filterHeight){

			}
			else if(upStateChanged && currentScroll + $(window).height() > filterWrapperPosition.top + filterHeight){
				facetContainer.css('position','fixed').css('bottom','0').css('top', 'auto');
			}

		}
		else if (previousScroll>currentScroll)
		{
			if(!downStateChanged && currentScroll - headerHeight <= filterWrapperPosition.top + filterHeight ){
				facetContainer.css('position','absolute').css('bottom', 'auto').css('top', filterWrapperPosition.top-filterPosition.top);
				downStateChanged = true;
				upStateChanged = false;
			}
			else if(downStateChanged && currentScroll + headerHeight <= filterWrapperPosition.top && currentScroll + $(window).height() > filterWrapperPosition.top + filterHeight ){

			}
			else if(downStateChanged && currentScroll + headerHeight  < filterWrapperPosition.top){
				facetContainer.css('position','fixed').css('top', headerHeight).css('bottom', 'auto');

			}
		}
		previousScroll= currentScroll;

		/*if(currentScroll + facetContainer.height() >= footerPosition.top -40){
			facetContainer.addClass('pull-bottom').removeClass('fixed');
		}
		else if(currentScroll> (filterPosition.top - 100) ){
			facetContainer.addClass('fixed').removeClass('pull-bottom');
		}
		else if(currentScroll < (filterPosition.top-100)  ){
			facetContainer.removeClass('fixed').removeClass('pull-bottom');
		}*/
	}
	$(window).scroll(function () {
		if(mainSection.is(':visible')){
			mainFacetPaneScroll()
		}
    });


});

