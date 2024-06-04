jQuery(document).ready(function () {
  window.onSubmit = onSubmit;

  var parentForm = "";

    var stopper=0;
    jQuery(".submitButton").click(function (e) {
        e.preventDefault();
        parentForm = jQuery(this).parents("form");
        var stopSubmit = [];
        jQuery(parentForm).foundation('validateForm')
        jQuery("input").each(function (e) {
            if (jQuery(this).hasClass("is-invalid-input")) {
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
            var cap = jQuery("#g-recaptcha-response").val();
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

	  var spinner = jQuery('#loader');
	  spinner.show();
          var theForm = document.getElementById('form4');
          var formData = jQuery(parentForm).serializeArray();

          jQuery.ajax({
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
                          window.location.href = '/boats-for-sale/boatmodel/ready-to-buy/thank-you.html';
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

    // *******************************


    var qs = getQueryString();
    //for (var key in qs) {
    //    console.log("Param: " + key.toString());
    //}
    for (var key in qs) {
        if (key != null) {
            var field = jQuery(document.createElement("input"));
            field.attr("name", key).attr("type", "hidden");
            field.val(qs[key]);
            jQuery("#form4").append(field);
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
});