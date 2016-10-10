$(document).ready(function() {
    var navContainer = $('#navContainer')
	var navExpand = false;

	navContainer.on('mouseenter', 'li a[data-key]',function(e){
		e.preventDefault();
		navExpand = true;
		$('#navContainer li').removeClass('active');
		$(this).parent('li').addClass('active')
		var key = $(this).attr('data-key');

		$('.category-expand-container').addClass('hidden');
		$('#category-expand-parent').removeClass('hidden');
		$('div[expand-parentKey="'+ key +'"]').removeClass('hidden');
		$('.category-expand-wrapper').animate({opacity:1},100);
	});

	function closeNav(){
		$.when( $('.category-expand-wrapper').animate({opacity:0},100)).done( function() {
			$('#navContainer li').removeClass('active');
			$('.category-expand-container').addClass('hidden');
			$('#category-expand-parent').addClass('hidden');
		})
	}
	navContainer.on('mouseenter','li a[data-avoid]',function(){
		closeNav();
	});
	navContainer.on('mouseleave','#expandDepartmentWrapper',function(){
	    closeNav();
	});
	navContainer.on('click', '.desktopNavColoumns li a, a h4', function(){
		closeNav();
	});
	$(document).on('mouseenter',' #headerMainWrapper, .page-content-wrapper',function(){
		closeNav();
	});





	/*
	 Mobile Menu
	 */


	$(document).on(eventOnTE,'a[data-page]',function(e){
		$('a[data-page]').removeClass('active');
		$(this).addClass('active');
	});
	$(document).on(eventOnTE,'a[data-page-ref]',function(e){
		$('a[data-page]').removeClass('active');
		$('a[data-page="explore"]').addClass('active');
	});

	$(document).on('click','.menu-items > li a', function() {
		console.log('ges here')
		if($(this).siblings('ul.sub-menu').length > 0){
			$(this).closest('li').toggleClass('open').toggleClass('active');

		}
	});
	$(document).on('click','.menu-items > .sub-menu li a', function(event) {
		event.stopImmediatePropagation()
		console.log('why the fuck')
		if($(this).siblings('ul.sub-menu').length > 0){
			$(this).closest('li').toggleClass('open').toggleClass('active');
		}


	});


	$(document).on('click','#departmentMenu a',function(){
		var departmentChoose = $(this).attr('data-department');
		var selector = "div[data-department-toggle='"+departmentChoose+"']"
		console.log(selector)
		$('.sidebar-menu').addClass('hidden');
		$('.sidebar-header-title').text(departmentChoose);
		closesideBarDD();
		$(selector).removeClass('hidden');
	});
	var previousScroll = 0;



	function navBarScrollActions(){
		var navSegment = $('#navbarDepartment');
		var logo = $('.mainLogo');
		var header= $('.header').height();
		var current = $(document).scrollTop();
		var headerSegment = $('#header-Dropdown');

		if(current > header){
			headerSegment.slideUp('fast');
			//logo.addClass('scaleDown')
		}
		else if(current < header){
			headerSegment.slideDown('fast');
			//logo.removeClass('scaleDown')
		}


	 if( screen.width >480){
		 if(scrollEvent){
			 if( current - previousScroll  >130 && current > header ){
				 previousScroll= current;
				 navSegment.slideUp('fast');
			 }
			 else if (previousScroll - current > 130 && scrollEvent)
			 {
				 previousScroll= current;
				 navSegment.slideDown('fast');
			 }
		 }
		 else if(!scrollEvent && current > header ){
			 if(current < $('.itemList').offset().top) scrollEvent = true;
			 if(navSegment.is(':visible'))navSegment.slideUp('fast');
		 }
	 }
	}

	$(document).on('click','a[data-mobile-nav]', function(){
		$('a[data-mobile-nav]').removeClass('active');
		$(this).addClass('active');
		var value = $(this).attr('data-mobile-nav');
		console.log(value)
		$('div[data-mobile-nav-toggle]').addClass('hidden');
		$('div[data-mobile-nav-toggle = "'+ value +'"]').removeClass('hidden').css({opacity:0}).animate({opacity:1});
	});

	$(document).on('click', '#header-nav-mobile button', function(){
		var header = $('#header-nav-mobile');
		if(header.hasClass('open')){
			header.removeClass('open');
		}
		else{
			header.addClass('open');
		}

	});

	$(window).on( 'scroll' ,function(){
		navBarScrollActions()
	});

})
