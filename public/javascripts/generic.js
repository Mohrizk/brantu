
/****************************
 * INITIALIZATIONNNNNN
 * @type {string}
 */
var client = algoliasearch("D3IWZXC0AH", '3d6a60c228b6e8058770fdf8eab2f652');
var helper   = algoliasearchHelper(client,'product_sweden', {
	hierarchicalFacets: [{
		name: 'products',
		attributes: ['categories.lvl0', 'categories.lvl1', 'categories.lvl2', 'categories.lvl3'],
        sortBy: ['count:desc', 'name:asc']
	}],
	facets:[  'sale', 'price.value'],
	disjunctiveFacets:['color','brand.name','shop.name','sizes', 'discount']
});
var searcher = algoliasearchHelper(client,'product_sweden', {
	hierarchicalFacets: [{
		name: 'products',
		attributes: ['categories.lvl0', 'categories.lvl1', 'categories.lvl2', 'categories.lvl3'],
		sortBy: ['count:desc', 'name:asc']
	}],
	facets:[  'sale', 'price.value'],
	disjunctiveFacets:['color','brand.name','shop.name','sizes', 'discount']
});
//_________AUTCOMPLETE
autocomplete('#search', {
		dropdownMenuContainer: '#containerAC',
		hints:true,
		templates: {
			dropdownMenu: '#brantu-dropdown-template'
		}
	},
	[
		{
			//source: autocomplete.sources.hits(productIndex, {hitsPerPage: 7}),
			source: function(query, callback) {
				var index = client.initIndex('product_sweden');
				var options = {hitsPerPage: 7}

				if( DEPARTMENT!==null){
					if( DEPARTMENT.name !== null){
						options.facetFilters = 'categories.lvl0:'+DEPARTMENT.name;
					}
				}
				index.search(query, options).then(function(answer) {
					callback(answer.hits);
				}, function() {
					callback([]);
				});
			},
			displayKey: 'name',
			templates: {
				suggestion: function(suggestion) {
					return ACTemplateProduct(suggestion);
				},
				empty: function(empty) {
					return '<h5 class="text-left">No Items Found</h5>';
				}
			}
		} ,
		{
			source: function(query, callback) {
				var index = client.initIndex('brands_sv');
				var options = {hitsPerPage: 5}
				if( DEPARTMENT!==null){
					if( DEPARTMENT.name !== null){
						options.facetFilters = 'genders:'+DEPARTMENT.name;
					}
				}
				index.search(query, options).then(function(answer) {
					callback(answer.hits);
				}, function() {
					callback([]);
				});
			},
			displayKey: 'name',
			templates: {
				suggestion: function(suggestion, answer) {
					return ACTemplateBrand(suggestion);
				},
				empty: function(empty) {
					return '<h5 class="text-left">No Items Found</h5>';
				}
			}
		}
	]
).on('autocomplete:selected', function(event, suggestion, dataset) {
	console.log(suggestion, dataset);
	//window.location ='/brand/'+suggestion.name;
});


/*****ADD INITIAL FACETS TO HELPER*******/
var typeVerified = true;
if(TYPE !=null){
	switch (TYPE.name) {
		case 'category':
			helper.toggleRefinement('products','Kvinna').search();
			break;
		case 'brand':
			helper.addDisjunctiveFacetRefinement('brand.name', TYPE.value.name).search();
			break;
		default:
			typeVerified = false;
			//helper.search();
			break;
	}
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
/**
 * Ensure that a tag is not filtering the results
 * @param {string} tag tag to remove from the filter
 * @return {AlgoliaSearchHelper}
 * @fires
 */
$(document).ready( function() {
	var currentInstance = helper;
	helper.on  ('result', function(content) {currentInstance = helper;  RENDER(content, false); })
	searcher.on('result', function(content) { currentInstance = searcher; RENDER(content, true); })


	var productArray=[];
	var mainSection = $('#mainSection');
	var searchSection = $('#searchSection');
	var mainContainer = $('.resultContainer');
	var filterSelector = $('#mainFacetPane');
	var facetContainer = $('#mainFacetContainer');
	var productList = $('.itemList');
	var jawboneContainer = $('.jawBoneContainer');
	var jawboneContent = $('.jawBoneContent');
	var searchBar =  $('#search');
	var priceBarInput = $("#pricerange")
	var paginate = $('.paginate');
    var priceLimitsChange = true;

	priceBarInput.ionRangeSlider({
        type: "double",
        prefix: "SEK", onFinish: function (data) {
            priceLimitsChange= false;
			currentInstance.removeNumericRefinement('price.value')
                .addNumericRefinement('price.value','>', data.from)
                .addNumericRefinement('price.value','<', data.to)
                .search();
        }
    });
    var priceBar = priceBarInput.data("ionRangeSlider");


	function RENDER (content, isSearch){
		productArray = content.hits;
		productList.html(productTemplate(productArray));
		var breadCrumb = currentInstance.getHierarchicalFacetBreadcrumb('products');

		//Prices
        var newPrice = content.getFacetStats('price.value');
        if(priceLimitsChange && newPrice!=null) priceBar.update({min: newPrice.min, max: newPrice.max, from: newPrice.min, to:  newPrice.max})
		else priceLimitsChange= true;

		$('.welcome').html(welcomeTemplate(productHelper.getWelcomeMessage(breadCrumb, content, isSearch)));
        $('.sale').html(onlySaleBoxFacetTemplate({header: HEADERTEXT.facets.sale.header,   content: productHelper.mapWithout(content.getFacetValues('sale'),['false'])}));
        $('.discounts').html(listFacetTemplate(  {header: HEADERTEXT.disjunctionFacets.discount.header, content: productHelper.mapWithout(content.getFacetValues('discount'), ['0'])} ));
        $('.sizes').html(listFacetTemplate(      {header: HEADERTEXT.disjunctionFacets.size.header , content:content.getFacetValues('sizes')}));
        $('.brands').html(listFacetTemplate(     {header: HEADERTEXT.disjunctionFacets.brand.header, content: content.getFacetValues('brand.name')}));
        $('.shops').html(listFacetTemplate(      {header: HEADERTEXT.disjunctionFacets.shop.header ,content: content.getFacetValues('shop.name')}));
		$('.colors').html(colorFacetTemplate(    {header: HEADERTEXT.disjunctionFacets.color.header , content: productHelper.mapColor(content.getFacetValues('color'),COLORS)}));
		$('.filterTags').html(filterTagsTemplate(productHelper.getAllRefinements(currentInstance.getState(['attribute:*']), HEADERTEXT)));
		$('.category').html(categoryFacetTemplate(productHelper.categoryRefinement(content.hierarchicalFacets, breadCrumb)));
		$('.paginate').html(pagingTemplate(productHelper.pagination(content.page, content.nbPages)));
	}
	function SEARCH (){
			var q = searchBar.val();
			searchBar.blur();
			if(q.length ==  0){
				closeSearch();
				return;
			}
			searcher.clearRefinements().setQuery(q);
			if(!jQuery.isEmptyObject(DEPARTMENT)) searcher.toggleRefinement('products', DEPARTMENT.name);
			searcher.search();
		   if(searchSection.length !=0){
			   mainSection.hide();
			   searchSection.show()
		   }
	}
	function closeSearch(){
		currentInstance = helper;
		if(searchSection.length !=0) {
			mainSection.show();
			searchSection.hide();
		}
		console.log('type', typeVerified)
		if(typeVerified) helper.search();
	}
//*******************************************Filter Actions
	var productEngine = $('#productEngine ')

	productEngine.on( 'click', '.category li a', function (event) {
		var value = $(this).attr('value');
		currentInstance.clearRefinements('products').toggleRefinement('products', value).search();
	});
	productEngine.on( 'click', '.breadcrumb li a', function (event) {
		var value = $(this).attr('value');
		currentInstance.clearRefinements('products').toggleRefinement('products', value).search();
	});
	productEngine.on( 'click', '.brands input', function (event) {
		var value = $(this).attr('value');
		if($(this).prop('checked')){
			currentInstance.addDisjunctiveFacetRefinement('brand.name', value).search();
		}
		else{
			currentInstance.removeDisjunctiveFacetRefinement('brand.name', value).search();
		}
	});
	productEngine.on( 'change', '.sizes input', function (event) {
		var value = $(this).attr('value');
		if($(this).prop('checked')){
			currentInstance.addDisjunctiveFacetRefinement('sizes', value).search();
		}
		else{
			currentInstance.removeDisjunctiveFacetRefinement('sizes', value).search();
		}
	});
	productEngine.on( 'change', '.discounts input', function (event) {
		var value = $(this).attr('value');
		if( $(this).prop('checked')){
			currentInstance.addDisjunctiveFacetRefinement('discount', value).search();
		}
		else{
			currentInstance.removeDisjunctiveFacetRefinement('discount', value).search();
		}
	});
	productEngine.on( 'change', '.colors input', function (event) {
		var value = $(this).attr('value');
		//console.log(value)

		if( $(this).prop('checked')){
			currentInstance.addDisjunctiveFacetRefinement('color', value).search();
		}
		else{
			currentInstance.removeDisjunctiveFacetRefinement('color', value).search();
		}
	});
	productEngine.on( 'change', '.shops input', function (event) {
		var value = $(this).attr('value');
		if( $(this).prop('checked')){
			currentInstance.addDisjunctiveFacetRefinement('shop.name', value).search();
		}
		else{
			currentInstance.removeDisjunctiveFacetRefinement('shop.name', value).search();
		}
	});
	productEngine.on( 'change', '.sale input', function (event) {
		var value = $(this).attr('value');
		if( $(this).prop('checked')){
			currentInstance.addFacetRefinement('sale', value).search();
		}
		else{
			currentInstance.removeFacetRefinement('sale', value).search();
		}
	});
	productEngine.on( 'click', '.filterTags button', function (event) {
		var value = $(this).attr('value');
		var facet = $(this).attr('facet');
		var type = $(this).attr('type');
		productHelper.removeFilterTag(type, facet, value, currentInstance);

	});
	productEngine.on( 'click', '.paginate a', function (event) {
		currentInstance.setPage($(this).attr('value')).search();
		$('html, body').animate({scrollTop: productList.offset().top - 100}, 100, $.bez([.5, 0, .1, 1]));

	});
//***************************************SEARCH
	searchBar.on( 'change', SEARCH)
	$('#searchSubmit').on( 'click', SEARCH)
	$('.welcome').on( 'click','.closeSearch', function(event){
		closeSearch();
	})
  //***********************USER ACTIONS
	mainSection.on( 'click','.changeView' , function (event) {
		productHelper.changeView(productList,mainContainer);
	});
	productList.on( 'click','.item .preview-image, .item .moreInfo' , function (event) {
		productHelper.openDDViewProductInfo(
			mainContainer, productList, $('#jawbone'), jawboneContainer, productArray[$(this).attr('index')],paginate);

	});
	mainContainer.on( 'click','.jawBone .delete' , function () {
		productHelper.closeDDViewProductInfo(mainContainer, productList,jawboneContent, paginate);
	});
	mainContainer.on( 'mouseover','.jawBone .selectedItemImageColoumn ol li img' , function (event) {
		var newImage = $(this).attr('src').replace('catalog','large');
		var location = $(this).closest('.selectedItemImageWrapper').find('.selectedItemPictureContainer').find('.selectedItemZoomPicture');
		location.find('img:first').remove();
		location.append('<img imageorder = "'+$(this).attr('imageorder') +'" src="'+newImage+'"/>');
	});
	//******CLICK NEXT
	mainContainer.on( 'click','.jawBone .next-item' , function (event) {
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
	mainContainer.on( 'click','.jawBone .prev-item' , function (event) {
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
        console.log(upStateChanged , downStateChanged)

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

	}
	$(window).scroll(function () {
		if(mainSection.is(':visible') || searchSection.is(':visible')){
			mainFacetPaneScroll()
		}
    });
});