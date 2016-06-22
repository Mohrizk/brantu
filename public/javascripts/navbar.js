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
	function closeSidePage(){
		$('.page-sidebar').removeClass('visible');
		$('.fixed-header').removeClass('sidebar-open');
		$('.page-sidebar-cover').addClass('hidden');
	}
	$('#menuBurgerIcon').on(eventOnTE, function(e) {
		e.stopImmediatePropagation();  e.preventDefault();e.cancelBubble = true;
		$('.page-sidebar').toggleClass('visible').css({opacity:0}).animate({opacity:1}, 400);
		$('.fixed-header').toggleClass('sidebar-open');
		$('.page-sidebar-cover').toggleClass('hidden');
         console.log('opening mobile menu')

	})

	$('.page-sidebar-cover').on(eventOnTE, function(e) {
		e.stopImmediatePropagation();  e.preventDefault();
		console.log('closing mobile menu')
		closeSidePage()
	})

	$('a[data-page]').on(eventOnTE,function(e){
		e.preventDefault();e.stopImmediatePropagation();
		$('a[data-page]').removeClass('active');
		$(this).addClass('active');
		var goTo = $(this).attr('data-page');
		setTimeout(
			function()
			{
				location.href = goTo;
				$('.loading').hide();
			}, 100);
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
			if(scrollEvent){

				if( current - previousScroll  >30){
					previousScroll= current;
					navSegment.slideUp('fast');
				}
				else if (previousScroll - current > 30 && scrollEvent)
				{
					previousScroll= current;
					navSegment.slideDown('fast');

				}
			}
			else if(!scrollEvent ){
				if(current < $('.itemList').offset().top) scrollEvent = true;
				if(navSegment.is(':visible'))navSegment.slideUp('fast');
			}
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
