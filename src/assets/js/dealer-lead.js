jQuery(document).ready(function() {

    // Get store specific url extension
    var getDealerId; // stores result-entry div on Visit Website click
    var dealerId; // stores dealer id from getDealerId
    var formRedirectPage; // stores url for dealer on Visit Website click
    var selectdidField; // For creating and updating selectdid hidden field
    var formId = "form4";
    var formModalName = "#contact-dealer-modal-container";
    // var qs; // Retrieve any addition query params. IE: Campaigns.

    $(".visit-dealer, .view-inventory").on("click", function(e) {
        e.preventDefault();
        getDealerId = $(this).parents(".result-entry");
        dealerId = getDealerId.attr('data-dealer-id');
        formRedirectPage = $(this).attr('href');
       
        $('#contact-dealer-modal-container').foundation('open');

        // getQueryString();

        console.log($(this));

        if ($(this).hasClass("visit-dealer")) {
            $("input[name='reasonForContactID']").val(14);
            $("input[name='formType']").val("Visit Website - Dealer Locator - Pre-Form");
        } else {
            $("input[name='reasonForContactID']").val(15);
            $("input[name='formType']").val("View Inventory - Dealer Locator - Pre-Form");
        }

        if ($("input[name='selectdid']").length == 0) {
            selectdidField = jQuery(document.createElement("input"));
            selectdidField.attr("name", 'selectdid').attr("type", "hidden");
            selectdidField.val(dealerId);
            jQuery("#form4").append(selectdidField);
        } else {
            selectdidField = $("input[name='selectdid']");
            selectdidField.val(dealerId);
            jQuery("#form4").append(selectdidField);
        }

        console.log(dealerId)

        window.history.replaceState(null, null, '?selectdid='+dealerId)
        return false;

    });

    // parentForm.addEventListener("submit", closeModal);

    // function closeModal() {
    //     $('#contact-dealer-modal-container').foundation('close');
    // }


    // Handle form submission start
    window.onSubmit = onSubmit;
    var parentForm = "";

    // Pause submit, Foundation validation, check inputs and then continue. 
    var stopper=0;
    $(".submitButton").click(function (e) {
        e.preventDefault();
        parentForm = $(this).parents("form");
        var stopSubmit = [];
        $(parentForm).foundation('validateForm');
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
        handleForm();
        if (stopper == -2) {
            console.log("submitted")

            var spinner = $('#loader');
            spinner.show();
            var theForm = document.getElementById(formId);
            var formData = $(parentForm).serializeArray();

            $.ajax({
                crossDomain: true,
                type: 'POST',
                url: 'https://api.whiterivermg.com/leads/FormService.asmx/SubmitFormVarsAndValidate',
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

                            if (typeof formModalName === 'string') {
                                if ($('body').hasClass('is-reveal-open')) {
                                    $(formModalName).foundation('close');
                                }
                            }
                        
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
        }
    }

    function handleForm() {
        console.log('handleForm running')
        if (typeof formModalName === 'string') {
            if ($('body').hasClass('is-reveal-open')) {
                $(formModalName).foundation('close');
            }
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
	try
	{
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
	catch(err)
	{
	}

});