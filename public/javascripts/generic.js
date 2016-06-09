
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

var typeVerified = true, departmentVerified= false;
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
console.log(DEPARTMENT)
if( DEPARTMENT!==null){
	if( DEPARTMENT.name !== null) {
		if (DEPARTMENT.name == 'Kvinna' || DEPARTMENT.name == 'Man') {
			console.log('aaaa')
			departmentVerified = true;
		}
	}
}

//_________AUTCOMPLETE
var currentDDHits=[];
var pPcurrentIndex = 100;  // needed for hovering effect
autocomplete('#search', {
		dropdownMenuContainer: '#containerAC',
		hints:true,
		templates: {
			dropdownMenu: searchDropDownTemplate
		}
	},
	[
		{
			//source: autocomplete.sources.hits(productIndex, {hitsPerPage: 7}),
			source: function(query, callback) {
				var index = client.initIndex('product_sweden');
				var options = {hitsPerPage: 8}
				if(departmentVerified)options.facetFilters = 'categories.lvl0:'+DEPARTMENT.name;
				index.search(query, options).then(function(answer) {
					pPcurrentIndex = 100;
					console.log(answer);
					currentDDHits= answer.hits;
					$('#ddProductPreview').hide()
					$('#ddProductPreviewContainer').html('');
					$('#ddCol2').show()
					if(answer.hits.length > 7){
						answer.hits.splice(7,1,{
							more:true,
							nbHits:answer.nbHits,
							text:'found search more'
						})
					}

					callback(answer.hits);
				}, function() {
					callback([]);
				});
			},
			displayKey: 'name',
			templates: {
				suggestion: function(suggestion) {
					suggestion.autoComplete = HEADERTEXT.autoComplete.productList;
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
				if(departmentVerified)options.facetFilters = 'genders:'+DEPARTMENT.name;
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
	//console.log(suggestion, dataset);
	//window.location ='/brand/'+suggestion.name;
});


/*****ADD INITIAL FACETS TO HELPER*******/



//********BEGNING GET & ATTACH JAWBONE RECOMMENDATION
/*function getRecommendations(itemId){
				var recommendedItems = '<li productID= "'+item.id+'"><img src="'+item.media.images[0].mediumUrl+'" alt="'+item.name+'"/> <div class="brandName">'+name[0]+'</div></li>';
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

	});
}*/

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
	var priceLimits = {
		change : true,
		data:{}
	}

	var mainSection = $('#mainSection');
	var searchSection = $('#searchSection');
	var compareSection = $('#compareSection');

	var mainContainer = $('.resultContainer');
	var filterSelector = $('#mainFacetPane');
	var facetContainer = $('#mainFacetContainer');
	var productContainer= $('.productPane');
	var productList = $('.itemList');

	var jawboneContainer = $('.jawBoneContainer');
	var jawboneContent = $('.jawBoneContent');
	var searchBar =  $('#search');
	var priceBarInput = $("#pricerange")
	var paginate = $('.paginate');
	var loading = $('.loading');


	function refreshVariables(){
		mainSection = $('#mainSection');
		searchSection = $('#searchSection');

		mainContainer = $('.resultContainer');
		filterSelector = $('#mainFacetPane');
		facetContainer = $('#mainFacetContainer');
		productContainer= $('.productPane');
		productList = $('.itemList');

		jawboneContainer = $('.jawBoneContainer');
		jawboneContent = $('.jawBoneContent');
		searchBar =  $('#search');
		priceBarInput = $("#pricerange")
		paginate = $('.paginate');
		loading = $('.loading');
	}

	function RENDER (content, isSearch){
		/*
		 * MAIN RENDER FUNCTION FOR ALL SEARCHES
		 * AND CATEGORY NAVIGATION
		 *
		 * */
		//SHOW LOADING
		mainSection.html(productEngineTemplate());
		refreshVariables();
		productContainer.hide();
		//STORE CURRENT HITS IN CURRENT PRODUCT GLOBAL ARRAY
		productArray = content.hits;
		$('.itemList').html(productTemplate(productArray));

		//GET BREAD CRUMB IF THERE IS A VERIFIED DEPARTMENT
		//IF THERE IS A DEPARTMENT VERIFIED THEN A CATEGORY IS INVOLOVED
		var breadCrumb = [];
		if(departmentVerified) breadCrumb=currentInstance.getHierarchicalFacetBreadcrumb('products');

		//GET NEW PRICES
		//UPDATE PRICES IF THE NAVIGATION
		var newPrice = content.getFacetStats('price.value')

		if(priceLimits.change && newPrice!=null) priceLimits.data = {min: newPrice.min, max: newPrice.max, from: newPrice.min, to:  newPrice.max}
		else priceLimits.change= true;

		$("#pricerange").ionRangeSlider({
			type: "double",
			min:priceLimits.data.min,
			max: priceLimits.data.max,
			from:priceLimits.data.from,
			to:  priceLimits.data.to,
			prefix: "SEK", onFinish: function (data) {
				priceLimits.data={ min: data.min, max: data.max, from: data.from, to: data.to} ;
				priceLimits.change= false;
				currentInstance.removeNumericRefinement('price.value')
					.addNumericRefinement('price.value','>', data.from)
					.addNumericRefinement('price.value','<', data.to)
					.search();
			}
		});
		//RENDER ALL NEW VALUES
		$('.welcome').html(welcomeTemplate(productHelper.getWelcomeMessage(breadCrumb, content, isSearch)));
        $('.sale').html(onlySaleBoxFacetTemplate({header: HEADERTEXT.facets.sale.header,   content: productHelper.mapWithout(content.getFacetValues('sale'),['false'])}));
        $('.discounts').html(listFacetTemplate(  {header: HEADERTEXT.disjunctionFacets.discount.header, content: productHelper.mapWithout(content.getFacetValues('discount'), ['0'])} ));
        $('.sizes').html(listFacetTemplate(      {header: HEADERTEXT.disjunctionFacets.size.header , content:content.getFacetValues('sizes')}));
        $('.brands').html(listFacetTemplate(     {header: HEADERTEXT.disjunctionFacets.brand.header, content: content.getFacetValues('brand.name')}));
        $('.shops').html(listFacetTemplate(      {header: HEADERTEXT.disjunctionFacets.shop.header ,content: content.getFacetValues('shop.name')}));
		$('.colors').html(colorFacetTemplate(    {header: HEADERTEXT.disjunctionFacets.color.header , content: productHelper.mapColor(content.getFacetValues('color'),COLORS)}));
		$('.filterTags').html(filterTagsTemplate(productHelper.getAllRefinements(currentInstance.getState(['attribute:*']), HEADERTEXT)));
		$('.category').html(categoryFacetTemplate(productHelper.categoryRefinement(content.hierarchicalFacets, breadCrumb)));
		$('.paginate').html(pagingTemplate(productHelper.pagination(content)));
		//Show Result
		loading.hide();
		productContainer.show();

	}
//*******************************************Filter Actions


	mainSection.on( 'click', ' .resultContainer .category li a', function (event) {
		var value = $(this).attr('value');
		currentInstance.clearRefinements('products').toggleRefinement('products', value).search();
	});
	mainSection.on( 'click', '.resultContainer .breadcrumb li a', function (event) {
		var value = $(this).attr('value');
		currentInstance.clearRefinements('products').toggleRefinement('products', value).search();
	});
	mainSection.on( 'click', '.resultContainer .brands input', function (event) {
		var value = $(this).attr('value');
		if($(this).prop('checked')){
			currentInstance.addDisjunctiveFacetRefinement('brand.name', value).search();
		}
		else{
			currentInstance.removeDisjunctiveFacetRefinement('brand.name', value).search();
		}
	});
	mainSection.on( 'change', '.resultContainer .sizes input', function (event) {
		var value = $(this).attr('value');
		if($(this).prop('checked')){
			currentInstance.addDisjunctiveFacetRefinement('sizes', value).search();
		}
		else{
			currentInstance.removeDisjunctiveFacetRefinement('sizes', value).search();
		}
	});
	mainSection.on( 'change', '.resultContainer .discounts input', function (event) {
		var value = $(this).attr('value');
		if( $(this).prop('checked')){
			currentInstance.addDisjunctiveFacetRefinement('discount', value).search();
		}
		else{
			currentInstance.removeDisjunctiveFacetRefinement('discount', value).search();
		}
	});
	mainSection.on( 'change', '.resultContainer .colors input', function (event) {
		var value = $(this).attr('value');
		//console.log(value)

		if( $(this).prop('checked')){
			currentInstance.addDisjunctiveFacetRefinement('color', value).search();
		}
		else{
			currentInstance.removeDisjunctiveFacetRefinement('color', value).search();
		}
	});
	mainSection.on( 'change', '.resultContainer .shops input', function (event) {
		var value = $(this).attr('value');
		if( $(this).prop('checked')){
			currentInstance.addDisjunctiveFacetRefinement('shop.name', value).search();
		}
		else{
			currentInstance.removeDisjunctiveFacetRefinement('shop.name', value).search();
		}
	});
	mainSection.on( 'change', '.resultContainer .sale input', function (event) {
		var value = $(this).attr('value');
		if( $(this).prop('checked')){
			currentInstance.addFacetRefinement('sale', value).search();
		}
		else{
			currentInstance.removeFacetRefinement('sale', value).search();
		}
	});
	mainSection.on( 'click', '.resultContainer .filterTags button', function (event) {
		var value = $(this).attr('value');
		var facet = $(this).attr('facet');
		var type = $(this).attr('type');
		productHelper.removeFilterTag(type, facet, value, currentInstance);

	});
	mainSection.on( 'click', '.resultContainer .paginate a', function (event) {
		currentInstance.setPage($(this).attr('value')).search();
		$('html, body').animate({scrollTop: productList.offset().top - 100}, 100, $.bez([.5, 0, .1, 1]));

	});
  //***********************USER ACTIONS
	var productPreviewTimer;

	$('body ').on( 'mouseover','.vertical .item .preview-image' , function (event) {
		var imageSelector  =  $(this).find('img');
		var productPreviewIndex = 1;
		var divSelector = $(this);
		var imageArray = imageSelector.attr('pic-src').split('/BREAK/');
		console.log('oo')
        if(imageArray.length>1){
		   productPreviewTimer=setInterval(function(){
			   if(productPreviewIndex == imageArray.length) productPreviewIndex= 0;

			   $.when( divSelector.animate({opacity: 0,width: "2%"}, 400, $.bez([.6, 0, .1, 1]))).done( function() {
				   imageSelector.attr('src',imageArray[productPreviewIndex]);
				   divSelector.animate({opacity: 1,width: "100%"}, 400, $.bez([.6, 0, .1, 1]));
				   productPreviewIndex++;
			   })
		   }, 2200);
	   }

	}).on( 'mouseout','.item .preview-image' , function (event) { console.log('out');
		var imageSelector  =  $(this).find('img');
		var imageArray = imageSelector.attr('pic-src').split('/BREAK/');
		if(imageArray.length>1)
			imageSelector.attr('src',imageArray[0]);
        console.log('mmm');
		clearInterval(productPreviewTimer);

	});



	/*
    * JAWBONE ACTIONS
    *
    * **/
	var itemScrollindex;
	mainSection.on( 'click','.itemList .item img, .item .moreInfo' , function (event) {
		refreshVariables()
		itemScrollindex = $(this).attr('index');
		$('.itemList img').removeClass('selected');
		$(this).addClass('selected')

		$.when(productHelper.openDDViewProductInfo(
			mainContainer, productList, $('#jawbone'), jawboneContainer, productArray[$(this).attr('index')],paginate))
			.done( function() {
				productList.children('li').each(function () {
                    if($(this).attr('index') == itemScrollindex){
						productList.animate({scrollLeft: $(this).offset().left + $(this).width()}, 100, $.bez([.5, 0, .1, 1]));
					}
				})
			})
	});
	mainSection.on( 'click','.jawBone .delete' , function () {
		refreshVariables()
		$.when( productHelper.closeDDViewProductInfo(mainContainer, productList,jawboneContent, paginate))
			.done( function() {
				productList.children('li').each(function () {
					if($(this).attr('index') == itemScrollindex){
						$('body').animate({scrollTop: $(this).offset().top - 150 }, 100, $.bez([.5, 0, .1, 1]));
					}
				})
		})
	});
	mainSection.on( 'mouseover','.jawBone .selectedItemImageColoumn ol li img' , function (event) {
		var JBDivSelector = $('#mainJawBoneImageContainer');
		var JBImageSelector = $('#mainJawBoneImage');
		var newImage = $(this).attr('src');
		//console.log(newImage)
		var newOrder = $(this).attr('imageorder')
		$.when( JBDivSelector.animate({opacity: 0.4, marginLeft:"600"}, 500, $.bez([.6, 0, .1, 1]))).done( function() {
			JBImageSelector.attr('src',newImage).attr('imageorder', newOrder);
			JBDivSelector.animate({opacity: 1, margin:"0"}, 500, $.bez([.6, 0, .1, 1]));
		})
	});
	//CLICK NEXT/PREV
	mainSection.on( 'click','.jawBone .next-item' , function (event) {
		var JBDivSelector = $('#mainJawBoneImageContainer');
		var JBImageSelector = $('#mainJawBoneImage');
		var imageArray = $('.jawbone').attr('pic-src').split('/BREAK/');
		var currentIndex = JBImageSelector.attr('imageorder');
		var nextIndex = (currentIndex == imageArray.length-1)? 0 : (Number(currentIndex)+1);
		$.when( JBDivSelector.animate({opacity: 0.4, marginLeft:"100%"}, 500, $.bez([.6, 0, .1, 1]))).done( function() {
			JBImageSelector.attr('src',imageArray[nextIndex]).attr('imageorder', nextIndex);
			JBDivSelector.animate({opacity: 1, margin:"0"}, 500, $.bez([.6, 0, .1, 1]));
		})
	});
	mainSection.on( 'click','.jawBone .prev-item' , function (event) {
		var JBDivSelector = $('#mainJawBoneImageContainer');
		var JBImageSelector = $('#mainJawBoneImage');
		var imageArray = $('.jawbone').attr('pic-src').split('/BREAK/');
		var currentIndex =  Number(JBImageSelector.attr('imageorder'))
		var prevIndex = (currentIndex == 0)? (imageArray.length-1) : (currentIndex-1) ;
		$.when( JBDivSelector.animate({opacity: 0.4, marginLeft:"100%"}, 500, $.bez([.6, 0, .1, 1]))).done( function() {
			JBImageSelector.attr('src',imageArray[prevIndex]).attr('imageorder', prevIndex);
			JBDivSelector.animate({opacity: 1, margin:"0"}, 500, $.bez([.6, 0, .1, 1]));
		})
	});


	/*
	 * AUTOCOMEPLTE ACTIONS
	 *
	 * **/
	//***************************************SEARCH
	function SEARCH (){
		refreshVariables()
		console.log('mmm')
		var q = searchBar.val(); searchBar.blur();
		productHelper.closeDDViewProductInfo(mainContainer, productList,jawboneContent, paginate);
		if(q.length ==  0){
			closeSEARCH();
			return;
		}

		searcher.clearRefinements().setQuery(q);
		if(!jQuery.isEmptyObject(DEPARTMENT)) searcher.toggleRefinement('products', DEPARTMENT.name);
		searcher.search();
		$('html, body').animate({scrollTop: 0 }, 100, $.bez([.5, 0, .1, 1]));
		if(searchSection.length !=0){
			mainSection.hide();
			searchSection.show()
		}
	}
	function closeSEARCH(){
		refreshVariables()
		currentInstance = helper;
		if(searchSection.length !=0) {
			mainSection.show();
			searchSection.hide();
		}
		if(typeVerified) helper.search();
	}
	var ddContainer = $('#containerAC');
	$('#autocompleteForm').submit( function(){
		event.preventDefault();
		SEARCH();
	})
	ddContainer.on( 'click','#ddsearchMore', SEARCH)
	//searchBar.on( 'change', SEARCH)
	mainSection.on( 'click','.closeSearch', closeSEARCH)
	ddContainer.on( 'mouseover','#dditemList',function(event){
		$('#ddCol2').hide();
		$('#ddProductPreview').show();
	}).on('mouseout' ,'#dditemList' , function (event) {
		$('#ddProductPreview').hide()
		$('#ddProductPreviewContainer').html('');
		$('#ddCol2').show()
	})
	ddContainer.on( 'mouseover','#dditemList .productsAC' , function (event) {
		var content;
		var productId = $(this).attr('data-id');
		var pPreviewSelector = $('#ddProductPreview')
		var pPreviewContainer =
		pPreviewSelector.show();
		var index = 3;
		for(var c in currentDDHits){
			if(productId == currentDDHits[c].productId){
				content = currentDDHits[c];
				console.log('mmmm')
				index = c;
			}
		}
            console.log(index, pPcurrentIndex);
			if(pPcurrentIndex != index)
				$.when( pPreviewContainer.animate({opacity: 0.5, left:"20"}, 100, $.bez([.6, 0, .1, 1]))).done( function() {
				pPcurrentIndex = index;
					console.log('sp.',pPcurrentIndex)
					content.autoComplete = HEADERTEXT.autoComplete.productPreview;
				pPreviewContainer.html(ACProductPreviewTemplate(content));
				pPreviewContainer.animate({opacity: 1, left:"0"}, 100, $.bez([.6, 0, .1, 1]));
			})
	})

	/*
	 * Find better price ACTIONS
	 *
	 * **/
	function FINDBETTERPRICES(content){
		refreshVariables()
		searchBar.blur();
		if(searchSection.length !=0){
			mainSection.hide();
			searchSection.html(CPProductTemplate(content));
			searchSection.show();
		}
		else mainSection.html(CPProductTemplate(content));

		$('html, body').animate({scrollTop: 0 }, 100, $.bez([.5, 0, .1, 1]));
	}

	ddContainer.on( 'click','.findBetterPrices',function(){
		console.log('mmm')
		var productId = $(this).attr('data-id');
		for(var c in currentDDHits){
			if(productId == currentDDHits[c].productId){
				content = currentDDHits[c];
			}
		}
		FINDBETTERPRICES(content);

	})

	/*
	 * Scrolling ACTIONS
	 *
	 * **/
    var previousScroll = 0;
	var downStateChanged = false;
	var upStateChanged = false;
	function mainFacetPaneScroll(){
		refreshVariables()
		var currentScroll = $(document).scrollTop();
		var footerPosition = $('#footer').offset();
		var filterPosition = filterSelector.offset();
		var headerHeight = $('.header').height();
		var filterWrapperPosition=$('.facetWrapper').offset();
		var filterHeight = $('.facetWrapper').height();

      if(filterSelector.length != 0){
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

	  }
		previousScroll= currentScroll;

	}
	$(window).scroll(function () {
		if(mainSection.is(':visible') || searchSection.is(':visible')){
			mainFacetPaneScroll()
		}
    });
});