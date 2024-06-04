
$(document).ready(function () {
	window.onSubmit = onSubmit;
	var parentForm = "";

	// Pause submit, Foundation validation, check inputs and then continue. 
	var stopper=0;
	$(".submitButton").click(function (e) {
		e.preventDefault();
		parentForm = $(this).parents("form");
		var stopSubmit = [];
		$(parentForm).foundation('validateForm')
		$("input, select, textarea").each(function (e) {
			if ($(this).hasClass("is-invalid-input")) {
				stopSubmit[e] = 1;
			} else {
				stopSubmit[e] = 0;
			}
		});
		console.log("stopSubmit: " + stopSubmit)
		stopper = stopSubmit.indexOf(1);
		console.log("stopper: " + stopper)

		//if (stopper == -1) {
		//    submitter(parentForm)
		//}

		// For recaptcha invisible.
		if (stopper == -1) {
			var cap = $("#g-recaptcha-response").val();
			if (!cap) {
				grecaptcha.execute();
			} else {
				grecaptcha.reset();
				grecaptcha.execute();
			}
		}
	});

	function onSubmit(token) {
		submitter(parentForm)
	}

	function submitter(parentForm) {

		console.log("OnSubmit");
		console.log(stopper)

		if (stopper == -1) {

			console.log("submitted")

			var spinner = $('#loader');
			spinner.show();

			var theForm = document.getElementById(formId);
			var formData = $(parentForm).serializeArray();

			//debugger;

			// if this is the production server, then go ahead and post the form ...
			// if(document.location.host.includes('.com')){

      var postUrl = '';

      if (window.location.href.includes('.test')) {
        console.log("posting to dev url")
        postUrl = 'https://api.whiterivermg.test/leads/FormService.asmx/SubmitFormVarsAndValidate'
      } else {
        console.log("posting to production url")
        postUrl = 'https://api.whiterivermg.com/leads/FormService.asmx/SubmitFormVarsAndValidate'
      }

			$.ajax({

				crossDomain: true,
				type: 'POST',
        url: postUrl,
				contentType: 'application/json; charset=utf-8',
				data: JSON.stringify({ formVars: formData }),
				dataType: 'json',
				success: function (response) {

					console.log("Return Value: " + response.d);

					if (response.d === "1") {
						console.log("Good job!");

						//alert("Success: " + response.d);
						//handleForm(theForm);
						// Calls wrmgmkto to send form values. Wait for response then perform redirect.

						handleForm(theForm, function () {
							window.location.href = formRedirectPage;
						});

					} else if (response.d === "0") {

						console.log("Not working!");
						console.log(JSON.stringify(response, undefined, 2));
						alert("Failed: " + response.d);

						spinner.hide();

					}
				},
				failure: function (msg) {
				},
				error: function (xhr, httpStatusMessage, customErrorMessage) {
				}
			});
			
			// else let's just log the digital data event and redirect instead of posting
			// } else {
				
			// 	var ddo = digitalDataCaptureForm(theForm);
			// 	window.location.href = formRedirectPage + "?success=" + ddo;

			// }
		}
	}


	// *******************************
	// Retrieve any addition query params. IE: Campaigns.
	var qs = getQueryString();
	//for (var key in qs) {
	//    console.log("Param: " + key.toString());
	//}
	for (var key in qs) {
		if (key != null) {
			var field = $(document.createElement("input"));
			field.attr("name", key).attr("type", "hidden");
			field.val(qs[key]);
			$("#"+formId).append(field);
		}
	}
	function getQueryString() {
		var result = {};
		if (!window.location.search.length) return result;
		var qs = window.location.search.slice(1);
		var parts = qs.split("&");
		for (var i = 0, len = parts.length; i < len; i++) {
			var tokens = parts[i].split("=");
			result[tokens[0]] = decodeURIComponent(tokens[1]); 
		}
		return result;
	}


	//Apply the dealer id if available.
	try {
		var storeData = getMyStore();
		if(storeData && storeData.dealerId != "" ) {			
			var dealerId = storeData.dealerId;	
			console.log("Dealer ID: " + dealerId);
				var field = $(document.createElement("input"));
				field.attr("name", "dealerId").attr("type", "hidden");
				field.val(dealerId);
				$("#"+formId).append(field);
		}
	}
	catch(err){

	}	


});