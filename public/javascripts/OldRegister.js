(function($) {

    'use strict';

    $(window).on('load', function() {
    	/*var myInput = document.getElementById('passwordConfirm');
   	 myInput.onpaste = function(e) {
   	   e.preventDefault();
   	 }*/

   })


$(document).ready(function() {
	$('#AuthenticationPopUp').on('click','.toggle', function() {
		$('.registerContainer').stop().addClass('active');
	});

	$('#AuthenticationPopUp').on('click', '.close', function() {
		$('.registerContainer').stop().removeClass('active');
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

	});

	$(document).on('click','#close-AuthenticationPopUp', function(e){
		$('#AuthenticationPopUp').addClass('hidden');
	})

	/****Sign-up Form Submit****/
	$(document).on('input propertychange',"input[data-for='registration'] ",function () {
		var theinput=$(this);
	 if(theinput.val() == "" ){
          if(theinput.prop('required')==true){
			 $(this).attr('title', 'This is a required field').tooltip('fixTitle').tooltip('show');
		  }
	  }
	 else{

		 /*****Validate*****/
		 //first and last name
		 if($(this).attr("type")=="name"){

			 if (!ValidateName(theinput.val()) )
			 {
				 $(this).attr('title', "Please make sure that your name doesn't contain numbers & more than 2 charachters").tooltip('fixTitle').tooltip('show');

			 }
			 else{
				 $(this).tooltip('hide');
		     }
	     }
		 else if(theinput.attr("type")=="email"){

			 if (!ValidateEmail(theinput.val())){
				 $(this).attr('title', "Make sure your email is correct").tooltip('fixTitle').tooltip('show');

			 }
			 else{
				 $(this).tooltip('hide');
		     }
		 }
		 else if(theinput.attr("id")=="birth-date"){
			 $(this).tooltip('hide');
		 }
		 else if(theinput.attr("type")=="password"){
			 if(!ValidatePass($("#password").val()) ){
				 $(this).attr('title', "Please make sure your password is at least 6 charachters").tooltip('fixTitle').tooltip('show');
			 }
			 else {
				 $(this).tooltip('hide');
		     }

	     }
		 else if(theinput.attr("type")=="passwordConfirm"){

			 if( !ValidatePassconf($("#password").val(), $("#passwordConfirm").val()) ){
				 $(this).attr('title', "Please make sure it matches your password").tooltip('fixTitle').tooltip('show');
			 }
			 else {
				 $(this).tooltip('hide');
		     }

	     }

	 }

	});

/***
$(document).on('click','#facebookAccess',function () {
  window.open('http://localhost:3000/auth/facebook','name','width=700,height=700').addEventListener("message", function (event) {
        this.close();
        window.location.reload();
    })
})*/


	$(document).on('click','#submitRegistration',function () {

    finalvalidation();

	});

	$(document).on('click','#submitLogin',function () {
		console.log('xxx');
		finalloginvalidation();
	});

	$('#signupForm').on('keypress', function(e) {
	    var code = e.keyCode || e.which;

	    if (code == 13 ) {

	    	e.preventDefault();
	  }
	});



	$(document).on('keyup', '#signupForm', function(e) {
	    var code = e.keyCode || e.which;
	    if (code == 13 ) {
	    	e.preventDefault();
	  }
	});




});

})(window.jQuery);
















/****Final Validation before submitting****/

function finalvalidation(){

	    var noerror= true;

         /*
		 if (!ValidateName($("#fname").val()) )
		 {
			 $("#fname").attr('title', "Please make sure that your name doesn't contain numbers & more than 2 charachters").tooltip('fixTitle').tooltip('show');
			 if($("#fname").hasClass("its-success"))  $("#fname").removeClass("its-success");
			 if(!$("#fname").hasClass("its-error"))  $("#fname").addClass("its-error");
			 noerror= false;
		 }
		 else{

			 if($("#fname").hasClass("its-error"))  $("#fname").removeClass("its-error");
			 if(!$("#fname").hasClass("its-success"))  $("#fname").addClass("its-success");
			 $("#fname").tooltip('hide');
	     }


         //last name
		 if (!ValidateName($("#lname").val()) )
		 {
			 $("#lname").attr('title', "Please make sure that your name doesn't contain numbers & more than 2 charachters").tooltip('fixTitle').tooltip('show');
			 if($("#lname").hasClass("its-success"))  $("#lname").removeClass("its-success");
			 if(!$("#lname").hasClass("its-error"))  $("#lname").addClass("its-error");
			 noerror= false;
		 }
		 else{

			 if($("#lname").hasClass("its-error"))  $("#lname").removeClass("its-error");
			 if(!$("#lname").hasClass("its-success"))  $("#lname").addClass("its-success");
			 $("#lname").tooltip('hide');
	     }*/



		//Email
		 if (!ValidateEmail($("#email").val())){
			 $("#email").attr('title', "Make sure your email is correct").tooltip('fixTitle').tooltip('show');
			 if($("#email").hasClass("its-success"))  $("#email").removeClass("its-success");
			 if(!$("#email").hasClass("its-error"))  $("#email").addClass("its-error");
			 noerror= false;

		 }
		 else{
			 if($("#email").hasClass("its-error"))  $("#email").removeClass("its-error");
			 if(!$("#email").hasClass("its-success"))  $("#email").addClass("its-success");
			 $("#email").tooltip('hide');
	     }


		//Gender
		 if ( ! $("#male").is(':checked') && ! $("#female").is(':checked') ){
			 $("#genderSelection").tooltip('show');
			 noerror= false;
	     }
		 else {
			 $("#genderSelection").tooltip('hide');
		 }



	if(!noerror) return false;
	else {

		   submitRegistration();
	        return true;
	 }
}



function finalloginvalidation(){

	var noerror= true;
	if (!ValidateEmail($("#loginEmail").val())){
		 $("#loginEmail").attr('title', "Make sure your email is correct").tooltip('fixTitle').tooltip('show');
		 if($("#loginEmail").hasClass("its-success"))  $("#loginEmail").removeClass("its-success");
		 if(!$("#loginEmail").hasClass("its-error"))  $("#loginEmail").addClass("its-error");
		 noerror= false;
		 console.log('Why')
	 }
	 else{
		 if($("#loginEmail").hasClass("its-error"))  $("#loginEmail").removeClass("its-error");
		 if(!$("#loginEmail").hasClass("its-success"))  $("#loginEmail").addClass("its-success");
		 $("#loginEmail").tooltip('hide');
    }

	if(!noerror) return false;
	else {

		   submitLogin();
	        return true;
	 }
}

/*************** MAIN VALIDATION  ***************/
//EMAIL
function ValidateEmail(email) {
    var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return expr.test(email);
}

// NAME
function ValidateName(name) {
    var expr = /^[a-zA-Z\sàáâäãåèéêëìíîïòóôöõøùúûüÿýñçčšžÀÁÂÄÃÅÈÉÊËÌÍÎÏÒÓÔÖÕØÙÚÛÜŸÝÑßÇŒÆČŠŽ∂ð ,.'-]+$/;
    if( !expr.test(name) || name.length<2 || name.length>15 ){
    	return false;
    }
    else {return true;}
}

// PASSWORD
function ValidatePass(password) {
	var matches = password.match(/\d+/g);
    if( matches == null || password.length<6){
    	return false;
    }
    else {return true;}
}
//PASSWORD CONFIRM
function ValidatePassconf(password, passwordconfirm) {

    if( password != passwordconfirm || passwordconfirm=="")
    {
    	return false;
    }
    else {
    	return true;
    	}
}
//Phone
function ValidatePhone() {

	var telInput = $("#phone");

	if ($.trim(telInput.val()))
	{
	    if (telInput.intlTelInput("isValidNumber"))
	    {
	      return true;
	    } else
	    {
	    	return false;
	    }
	}
}

function textonly(e){
	var code;
	if (!e) var e = window.event;
	if (e.keyCode) code = e.keyCode;
	else if (e.which) code = e.which;
	var character = String.fromCharCode(code);
	//alert('Character was ' + character);
	    //alert(code);
	    //if (code == 8) return true;
	    var AllowRegex  = /^[\ba-zA-Z\s-]$/;
	    if (AllowRegex.test(character)) return true;
	    return false;
	}



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



/*********************************************************************************************** SocialMedia ******************/

function socialMediaSuccess(){


}



/*************** Facebook **************

	//This is called with the results from from FB.getLoginStatus().
	function statusChangeCallback(response) {
	  console.log('statusChangeCallback');
	  console.log(response);
	  if (response.status === 'connected') {
	    // Logged into your services and Facebook.
		  if(FacebookClicked==true){
             //already logged in
			  $("#error-message").text("Opsy! It seems you already signed up with this account please try with another or press login to go to your wall");
			  $("#modalSlideUp1").modal("show");

		  }


	  } else if (response.status === 'not_authorized') {
	    // The person is logged into Facebook, but not your services.

		  if(allowFacebookPopUp){
			  FB.login(function(response) {
				  console.log(response);
				  if (response.status === 'connected') {
			      testAPI(response);
				  }
				 }, {scope: 'public_profile,email,user_likes'});
		  }

	  } else {
	    // The person is not logged into Facebook, so we're not sure if
	    // they are logged into this services or not.


		  if(allowFacebookPopUp){
			  FB.login(function(response) {
				  console.log(response);
				  if (response.status === 'connected') {
					  testAPI(response);
				  }
				 }, {scope: 'public_profile,email,user_likes'});
		  }
	  }
	}

	function checkLoginState() {
	  FB.getLoginStatus(function(response) {
	    statusChangeCallback(response);
	  });
	}

	window.fbAsyncInit = function() {
	FB.init({
	  appId      : '1692583477684792',
	  cookie     : false,  // enable cookies to allow the server to access
	                      // the session
	  xfbml      : true,  // parse social plugins on this page
	  version    : 'v2.2' // use version 2.2
	});

	FB.getLoginStatus(function(response) {
	  statusChangeCallback(response);
	});

	};

	// Load the SDK asynchronously
	(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/en_US/sdk.js";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

	// Here we run a very simple test of the Graph API after login is
	// successful.  See statusChangeCallback() for when this call is made.
	function testAPI(authObj) {
	  console.log('Welcome!  Fetching your information.... ');
	  FB.api('/me', function(response) {
	    console.log('Successful login for: ' + response.name);


	    saveUsersData(authObj,response.name);
//	    document.getElementById('status').innerHTML =
//	      'Thanks for logging in, ' + response.name + '!';
	  });
	}


function saveUsersData(response,name){

		var earlySignUp = {}
		earlySignUp["userID"] = response.authResponse.userID;
		earlySignUp["accessToken"] = response.authResponse.accessToken;
		earlySignUp["exiresIn"] = response.authResponse.expiresIn;
		earlySignUp["name"] = name;

		$.ajax({
	        url: $("#facebookForm").attr( "action"),
	        type: 'post',
			contentType : "application/json",
			data : JSON.stringify(earlySignUp),
			dataType : 'text',
	        success: function(data) {

	        	if ( data == "OK"){

	        		socialMediaSuccess()
	        	    //SUCCESSFUL CONNECTION
	        	}
	        	else if ( data == "KO"){

	        		//Already Exist CONNECTION
	        		// The below is temporary
	        		socialMediaSuccess()

	         	}
	        },
	        error: function(jqXHR, textStatus, errorThrown) {
	        	console.log('error');
	            console.log(errorThrown);
	            console.log(jqXHR);
	        }
	    });

	}*/
