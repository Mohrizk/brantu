(function($) {
    'use strict';
$(document).ready(function() {
	var registerContainer = $('.registerContainer');
	var registerSection = $('#AuthenticationPopUp');
	//FOR MOBILE
	function closeSideBar(){
		$('.page-sidebar').removeClass('visible');
		$('.fixed-header').removeClass('sidebar-open');
		$('.page-sidebar-cover').addClass('hidden');
	}
	registerSection.on('click','.toggle', function() {
		registerContainer.stop().addClass('active');
	});

	$('#fromSignUpToLogin').on('click', function() {
		registerContainer.stop().removeClass('active');
	});

	$('#footerSignUPButton').on('click', function() {

		registerContainer.stop().addClass('active').css({marginTop:800}).animate({marginTop:50}, 200);
		registerSection.removeClass('hidden').css({opacity:0}).animate({opacity:1});
	});

	$('.authenticate').on('click', function (event) {
		if($(this).attr('data-view')==='login')
			registerContainer.stop().removeClass('active').css({marginTop:800}).animate({marginTop:50}, 200);

		else if($(this).attr('data-view')==='signup')
			registerContainer.stop().addClass('active').css({marginTop:800}).animate({marginTop:50}, 200);

		registerSection.removeClass('hidden').css({opacity:0}).animate({opacity:1});
	});

	$('.authenticateMobile').on('touchend click', function (e) {
		e.preventDefault();e.stopPropagation();
			closeSideBar()
			if($(this).attr('data-view')==='login')
				registerContainer.stop().removeClass('active').css({marginTop:800}).animate({marginTop:0}, 200);
			else if($(this).attr('data-view')==='signup')
				registerContainer.stop().addClass('active').css({marginTop:800}).animate({marginTop:0}, 200);

		registerSection.removeClass('hidden').css({opacity:0}).animate({opacity:1});
	});
	$('.close-AuthenticationPopUp').on('click', function(e){
		$.when(registerSection.animate({opacity:0}, 100))
			.done(function(){
				registerSection.addClass('hidden')
			});
	})

	$('#signupForm').on('submit', function(e) {
		e.preventDefault();
		console.log('Supe3');
		if($('#passwordSignUpConfirm').val() !== $('#passwordSignUp').val()) $('#registerPasswrodError').fadeIn();
		else{
			$.when($('.registerContainer').hide(), $('.registerLoading').fadeIn('slow')).done(function(){
				$('#signupForm')[0].submit();
			})


		}

	});

	$('#signupFormPage').on('submit', function(e) {
		e.preventDefault();
		console.log('Supe3');
		if($('#passwordSignupPageConfirm').val() !== $('#passwordSignupPage').val()) $('#registerPagePasswrodError').fadeIn();
		else{
			$.when($('.registerContainer').hide(), $('.registerLoading').fadeIn('slow')).done(function(){
				$('#signupFormPage')[0].submit();
			})


		}

	});

});

})(window.jQuery);







/***************SUBMIT FORM***************/
function submitRegistration(){
	var user = {}
	user["email"] = $("#email").val();
	if ($('#male').is(":checked"))
	{
		user["gender"] = "MALE";

	}else if ($('#female').is(":checked")){

		user["gender"] = "FEMALE";
	}
	user["password"] = $("#password").val();
	$.ajax({
        url: $("#signupForm").attr( "action"),
        type: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
		data : JSON.stringify(user),
		dataType : 'text',
        success: function(data) {
               console.log(data);
              if( data  === 'interrupted'){
                $("#registerError ").show();
                console.log('the account exist')
							}
	        		else{
								success = true;
	        			$("#signupContainer").fadeOut('fast');
	        			$("#successSignup").fadeIn('fast');
	        			$(".authenticationPopUp").delay(1000).fadeOut(500);
								window.location.reload();
						}

        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('error');
            console.log(errorThrown);
            console.log(jqXHR);
            success = false;
            console.log('Submition failed')
        }
    });
}


/*******submit login*****/
function submitLogin(){
	var user = {}

	user["email"] = $("#loginEmail").val();
	user["password"] = $("#loginPassword").val();



	$.ajax({
        url: $("#loginForm").attr( "action"),
        type: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
		data : JSON.stringify(user),
		dataType : 'text',
        success: function(data) {
        			success = true;
              if(data == "Missing credentials"){
                 $("#loginError ").text('There is a missing credential').show();
              }
              else if(data == "nouser"){
                 $("#loginError ").text('This email does not exist').show();
              }
              else if(data == "nopass"){
                $("#loginError ").text('Your password is wrong').show();
              }
              else{
							        window.location.reload();
              }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('error');
            console.log(errorThrown);
            console.log(jqXHR);
						$("#loginError ").show();

        }
    });
}
