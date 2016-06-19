$(document).ready(function() {

	/*$('#navbar-categories li a').on( 'mouseover',function(){
		$('.category-expand-container').addClass('hidden');
		$('#navbar-categories-expand').addClass('expand');
		var key = $(this).attr('key');
		$('div[expand-parentKey="'+ key +'"]').removeClass('hidden');

		if($("body").scrollTop() < 50){
			var totalHeight = $('#navbar-categories-expand').outerHeight();
		}
	});*/
	$('li a[expand-key]').on( 'mouseover',function(){
		console.log('ooo')
		$('.category-expand-container').addClass('hidden');
		var key = $(this).attr('expand-key');
		$('div[expand-parentKey="'+ key +'"]').removeClass('hidden');
		$('.category-expand-wrapper').animate({opacity:1});
	});
	$('#navbarDepartment').on('mouseleave',function(){
		$.when( $('.category-expand-wrapper').animate({opacity:0})).done( function() {
			$('.category-expand-container').addClass('hidden');
		})
	});

	/*
	 Mobile Menu
	 */
	$('#menuBurgerIcon').on('touchend', function(e) {

		$('.page-sidebar').toggleClass('visible').css({opacity:0}).animate({opacity:1}, 400);
		$('.fixed-header').toggleClass('sidebar-open');
		$('.page-sidebar-cover').toggleClass('hidden');
		e.preventBubble();

	})
	$('.page-sidebar-cover').on('touchend', function() {
		$('.page-sidebar').removeClass('visible');
		$('.fixed-header').removeClass('sidebar-open');
		$('.page-sidebar-cover').addClass('hidden');
		e.preventBubble();
	})

	$('.menu-items > li a').click( function() {
		console.log('ges here')
		if($(this).siblings('ul.sub-menu').length > 0){
			$(this).closest('li').toggleClass('open').toggleClass('active');

		}
	})
	$('.menu-items > .sub-menu li a').click( function(event) {
		event.stopImmediatePropagation()
		console.log('why the fuck')
		if($(this).siblings('ul.sub-menu').length > 0){
			$(this).closest('li').toggleClass('open').toggleClass('active');
		}


	})
    function closesideBarDD(){
		$('.sidebar-overlay-slide').toggleClass('show');
		$('.sidebar-header').find('button').toggleClass('active');
	}
	//$('.sidebar-header').click( closesideBarDD)

	$('#departmentMenu').on('click','a',function(){
		var departmentChoose = $(this).attr('data-department');
		var selector = "div[data-department-toggle='"+departmentChoose+"']"
		console.log(selector)
		$('.sidebar-menu').addClass('hidden');
		$('.sidebar-header-title').text(departmentChoose);
		closesideBarDD();
		$(selector).removeClass('hidden');
	})
	var previousScroll = 0;
	function navBarScrollActions(){
		if(!isMobile){
			var navSegment = $('#navbarDepartment');
			var logo = $('.mainLogo');
			var header= $('.header').height();
			var current = $(document).scrollTop();
			var headerSegment = $('#header-Dropdown');

			if(current > header){
				headerSegment.slideUp('fast');
				logo.addClass('scaleDown')
			}
			else{
				headerSegment.slideDown('fast');
				logo.removeClass('scaleDown')
			}

			if(previousScroll<current){
				navSegment.slideUp('fast');
			}
			else if (previousScroll>current)
			{
				navSegment.slideDown('fast');
			}

			previousScroll= current;

		}
	}
	$(window).on( 'scroll' ,navBarScrollActions);
	$('.page-container').on( 'scroll' , function (event) {
		if(isMobile) {
			var logo = $('.mainLogo');
			var current = $('.page-container').scrollTop();
			var header= $('.header').height();
			if(current > header){
				logo.addClass('scaleDown')
			}
			else{
				logo.removeClass('scaleDown')
			}
		}
	});



})
