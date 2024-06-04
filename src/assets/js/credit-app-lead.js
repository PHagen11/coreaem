// Get store specific url extension
jQuery(document).ready(function() {

    var appurlroot = "https://gateway.appone.net/onlineapp/";
    var appurlappend = "tmfs"; //default app
    var appurl;
    var formId = "form4";

    function GetDealerAppUrl(dealerid) {

        switch (dealerid) {
            case 611: //Altoona, IA
                appurlappend = "tmfsalt"; break;
            case 545: //Ashland, VA
                appurlappend = "tmbcrch"; break;
            case 532: //Atlanta, GA
                appurlappend = "tmbcatl"; break;
            case 836: //Atlantic City, NJ
                appurlappend = "tmbcacy"; break;
            case 490: //Auburn Hills, MI
                appurlappend = "tmbcdet"; break;
            case 525: //Auburn, NY
                appurlappend = "tmbcfng"; break;
            case 502: //Baltimore, MD
                appurlappend = "tmbchan"; break;
            case 536: //Bolingbrook, IL
                appurlappend = "tmbcbln"; break;
            case 547: //Bossier City, LA
                appurlappend = "tmbcbos"; break;
            case 511: //Branson, MO
                appurlappend = "tmbcbns"; break;
            case 852: //Bridgeport, CT
                appurlappend = "tmbcbdg"; break;
            case 818: //Bristol, TN
                appurlappend = "tmbcbst"; break;
            case 514: //Broken Arrow, OK
                appurlappend = "tmbcbrk"; break;
            case 801: //Cary, NC
                appurlappend = "tmbccar"; break;
            case 527: //Charlotte, NC
                appurlappend = "tmbccrd"; break;
            case 1057: //Chattanooga, TN
                appurlappend = "tmbcha "; break;
            case 528: //Chicago, IL
                appurlappend = "tmbcchi"; break;
            case 493: //Cincinnati, OH
                appurlappend = "tmbccin"; break;
            case 503: //Clarksville, IN
                appurlappend = "tmbcclk"; break;
            case 784: //Colorado Springs, CO
                appurlappend = "tmbccsp"; break;
            case 505: //Columbia, MO
                appurlappend = "TMBC_COL_21"; break;
            case 530: //Council Bluffs, IA
                appurlappend = "tmbccbl"; break;
            case 494: //Dallas, TX
                appurlappend = "tmbcdal"; break;
            case 491: //Dania Beach, FL
                appurlappend = "tmbcdnb"; break;
            case 531: //Denham Springs, LA
                appurlappend = "tmbcdns"; break;
            case 519: //Denver, CO
                appurlappend = "tmbcden"; break;
            case 533: //Destin, FL
                appurlappend = "tmbcdes"; break;
            case 731: //East Peoria, IL
                appurlappend = "tmbcepe"; break;
            case 513: //Foxborough, MA
                appurlappend = "tmbcfxb"; break;
            case 497: //Ft. Myers, FL
                appurlappend = "tmbcfor"; break;
            case 1072: //Gainesville, FL
                appurlappend = "tmbcgnv"; break;
            case 520: //Garland, TX
                appurlappend = "tmbcgar"; break;
            case 522: //Hampton, VA
                appurlappend = "tmbchpt"; break;
            case 738: //Harlingen, TX
                appurlappend = "tmbchrl"; break;
            case 498: //Harrisburg, PA
                appurlappend = "tmbchar"; break;
            case 785: //Hooksett, NH
                appurlappend = "tmbchoo"; break;
            case 499: //Independence, MO
                appurlappend = "tmbcidp"; break;
            case 496: //Jackson, MS
                appurlappend = "tmbcprl"; break;
            case 521: //Katy, TX
                appurlappend = "tmbckat"; break;
            case 517: //Las Vegas, NV
                appurlappend = "tmbcveg"; break;
            case 543: //Leeds, AL
                appurlappend = "tmbclee"; break;
            case 515: //Macon, GA
                appurlappend = "tmbcmac"; break;
            case 546: //Manteca, CA
                appurlappend = "tmbcmnt"; break;
            case 534: //Memphis, TN
                appurlappend = "tmbcmem"; break;
            case 512: //Mesa, AZ
                appurlappend = "tmbcmes"; break;
            case 526: //Miami, FL
                appurlappend = "tmbcami"; break;
            case 501: //Myrtle Beach, SC
                appurlappend = "tmbcmyr"; break;
            case 523: //Nashville, TN
                appurlappend = "tmbcnas"; break;
            case 548: //Oklahoma City, OK
                appurlappend = "tmbcokc"; break;
            case 524: //Olathe, KS
                appurlappend = "tmbcola"; break;
            case 495: //Orlando, FL
                appurlappend = "tmbcorl"; break;
            case 787: //Palm Bay, FL
                appurlappend = "tmbcpal"; break;
            case 535: //Pearland, TX
                appurlappend = "tmbcper"; break;
            case 781: //Port St. Lucie, FL
                appurlappend = "tmbcpsl"; break;
            case 507: //Portage, IN
                appurlappend = "tmbcpor"; break;
            case 518: //Prattville, AL
                appurlappend = "tmbcprt"; break;
            case 506: //Rancho Cucamonga, CA
                appurlappend = "tmbcran"; break;
            case 850: //Rocklin, CA
                appurlappend = "tmbcroc"; break;
            case 516: //Rossford, OH
                appurlappend = "tmbcros"; break;
            case 838: //Round Rock, TX
                appurlappend = "tmbcrrk"; break;
            case 510: //San Antonio, TX
                appurlappend = "tmbcant"; break;
            case 851: //San Jose, CA
                appurlappend = "tmbcsjc"; break;
            case 500: //Savannah, GA
                appurlappend = "tmbcsav"; break;
            case 529: //Sevierville, TN
                appurlappend = "tmbcsev"; break;
            case 544: //Spanish Fort, AL
                appurlappend = "tmbcspf"; break;
            case 508: //Springfield, MO
                appurlappend = "tmbcspr"; break;
            case 492: //St. Louis, MO
                appurlappend = "tmbcstc"; break;
            case 823: //Tacoma, WA
                appurlappend = "tmbctac"; break;
            case 782: //Tallahassee, FL
                appurlappend = "tmbctll"; break;
            case 839: //Tampa, FL
                appurlappend = "tmbctmp"; break;
            case 786: //Utica, NY
                appurlappend = "tmbcuca"; break;
            case 837: //Memphis, TN
                appurlappend = "tmbcpyr"; break;
            case 1402: //Acworth, GA
                appurlappend = "cabacw"; break;
            case 1386: //Allen, TX
                appurlappend = "cabaln"; break;
            case 1399: //Avon, OH
                appurlappend = "cabavn"; break;
            case 1394: //Berlin, MA
                appurlappend = "cabber"; break;
            case 1392: //Cheektowaga, NY
                appurlappend = "cabche"; break;
            case 1336: //Dundee, MI
                appurlappend = "cabdun"; break;
            case 1383: //East Hartford, CT
                appurlappend = "cabeha"; break;
            case 1393: //Fort Mill, SC
                appurlappend = "cabfml"; break;
            case 1377: //Fort Worth, TX
                appurlappend = "cabftw"; break;
            case 1400: //Gainesville, VA
                appurlappend = "cabgva"; break;
            case 1419: //Garner, NC
                appurlappend = "cabgar"; break;
            case 1379: //Glendale, AZ
                appurlappend = "cabgle"; break;
            case 1431: //Gonzales, LA
                appurlappend = "cabgon"; break;
            case 1429: //Grandville, MI
                appurlappend = "cabgra"; break;
            case 1390: //Green Bay, WI
                appurlappend = "cabgrn"; break;
            case 1384: //Hammond, IN
                appurlappend = "cabham"; break;
            case 1382: //Hoffman Estates, IL
                appurlappend = "cabhof"; break;
            case 1396: //Huntsville, AL
                appurlappend = "cabhvs"; break;
            case 1376: //Kansas City, KS
                appurlappend = "cabkck"; break;
            case 1380: //La Vista, NE
                appurlappend = "cablav"; break;
            case 1385: //Lacey, WA
                appurlappend = "cablac"; break;
            case 1389: //Louisville, KY
                appurlappend = "cablou"; break;
            case 1375: //Mitchell, SD
                appurlappend = "cabmit"; break;
            case 1395: //Noblesville, IN
                appurlappend = "cabnob"; break;
            case 1397: //Oklahoma City, OK
                appurlappend = "cabok2"; break;
            case 1373: //Owatonna, MN
                appurlappend = "cabowa"; break;
            case 1374: //Prairie Du Chien, WI
                appurlappend = "cabpdc"; break;
            case 1381: //Richfield, WI
                appurlappend = "cabrch"; break;
            case 1378: //Rogers, MN
                appurlappend = "cabrog"; break;
            case 1398: //Short Pump, VA
                appurlappend = "cabhen"; break;
            case 1372: //Sidney, NE
                appurlappend = "cabsid"; break;
            case 1387: //Tulalip, WA
                appurlappend = "cabtul"; break;
            case 1433: //West Chester, OH
                appurlappend = "cabwch"; break;
            case 1391: //Woodbury, MN
                appurlappend = "cabwoo"; break;
            case 549: //Abilene, TX
                appurlappend = "tmbcabi"; break;
            case 556: //Bradenton, FL
                appurlappend = "tmbcbra"; break;
            case 642: //Brainerd, MN
                appurlappend = "tmbcbrd"; break;
            case 488: //Corbin, KY
                appurlappend = "tmbccor"; break;
            case 646: //Fargo, ND
                appurlappend = "tmbcfar"; break;
            case 557: //Florence, AL
                appurlappend = "tmbcflo"; break;
            case 749: //Forest Lake, MN
                appurlappend = "tmbcflk"; break;
            case 539: //Houston, TX
                appurlappend = "tmbchou"; break;
            case 114: //Longview, TX
                appurlappend = "tmbclon"; break;
            case 550: //Midland, TX
                appurlappend = "tmbcmid"; break;
            case 834: //Monroe, LA
                appurlappend = "tmbcmon"; break;
            case 581: //New Braunfels, TX
                appurlappend = "tmbcwp1"; break;
            case 643: //Rice Lake, WI
                appurlappend = "tmbcric"; break;
            case 644: //Shakopee, MN
                appurlappend = "tmbcsha"; break;
            case 797: //Tyler, TX
                appurlappend = "tmbctyl"; break;
            case 560: //Winchester, TN
                appurlappend = "tmbcwin"; break;
            case 791: //Little Rock, AR (Bradford)
                appurlappend = "bps"; break;
            case 1427: //Rogers, AR (Bradford)
                appurlappend = "cabelas"; break;

            default:
                // code block
                appurlappend = "tmfs"; break;
        }

        appurl = appurlroot + appurlappend;

        return appurl;

    }

	var sPageURL = window.location.search.substring(1),
		sURLVariables = sPageURL.split('&'),
		sParameterName,
		i,
		loadURL = '',
		atvID = '0',
		boatID = '0',
		pigDealerId = 0;

        console.log("sURLVariables: " + sURLVariables);

    var assigned = false;
    if (sURLVariables.length > 0 && sURLVariables != "")
    {
        //Lookup model and get dealer.
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('='); 
            console.log(sParameterName);
            if (sParameterName[0] === 'docId') {
                thisID = sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
                loadURL = '//bpbcapi.whiterivermg.com/api/inventory/' + thisID;
            } else if (sParameterName[0] === 'id') {
                thisID = sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
                loadURL = '//bpbcapi.whiterivermg.com/api/Inventory/GetAtv?Id=' + thisID;
            }
            console.log("URL: " + loadURL);
            
        };

        jQuery.ajax({
            dataType: "json",
            url: loadURL
        }).done(function( data ) {
            pigDealerId = data.dealerInfo.bpbC_DealerId;
            console.log("PID: " + pigDealerId);

            if(pigDealerId != ''){
                var btnURL = GetDealerAppUrl(pigDealerId);
                console.log("btnURL: " + btnURL);
                jQuery('#appOneButton').attr('href', btnURL);
                assigned = true;
                var field = $(document.createElement("input"));
                    field.attr("name", "selectdid").attr("type", "hidden");
                    field.val(pigDealerId);
                    $("#"+formId).append(field);
            }
            else { 
                //Not yet assigned so lookup with set store object.
                var storeData = getMyStore();
                if(storeData && storeData.dealerId != "" ) {
                    var dealerId = storeData.dealerId;	
                    var btnURL = GetDealerAppUrl(dealerId);
                    console.log("Store Object Based: " + dealerId + " -- " + btnURL);
                    jQuery('#appOneButton').attr('href', btnURL);
                    var field = $(document.createElement("input"));
                    field.attr("name", "selectdid").attr("type", "hidden");
                    field.val(dealerId);
                        $("#"+formId).append(field);
                }
            }
        });
    }
    else
    {
        //Not yet assigned so lookup with set store object.
	 	var storeData = getMyStore();
	 	if(storeData && storeData.dealerId != "" ) {
	 		var dealerId = storeData.dealerId;	
            var btnURL = GetDealerAppUrl(dealerId);
            console.log("Store Object Based: " + dealerId + " -- " + btnURL);
            jQuery('#appOneButton').attr('href', btnURL);
            var field = $(document.createElement("input"));
            field.attr("name", "selectdid").attr("type", "hidden");
            field.val(dealerId);
            $("#"+formId).append(field);
        } else {
            var btnURL = GetDealerAppUrl(0);
            jQuery('#appOneButton').attr('href', btnURL);
        }
    }

    // if (!assigned)
    // {
    //     //Not yet assigned so lookup with set store object.
	// 	var storeData = getMyStore();
	// 	if(storeData && storeData.dealerId != "" ) {
	// 		var dealerId = storeData.dealerId;	
    //         var btnURL = GetDealerAppUrl(dealerId);
    //         console.log("Store Object Based: " + dealerId + " -- " + btnURL);
    //         jQuery('#appOneButton').attr('href', btnURL);
    //         var field = $(document.createElement("input"));
    //         field.attr("name", "selectdid").attr("type", "hidden");
    //         field.val(dealerId);
    //             $("#"+formId).append(field);
    //     }
    // }

  try
	{
		var storeData = getMyStore();
		if(storeData && storeData.dealerId != "" ) {
			var dealerId = storeData.dealerId;	
			// console.log("Dealer ID: " + dealerId);
                var field = $(document.createElement("input"));
                    field.attr("name", "dealerId").attr("type", "hidden");
                    field.val(dealerId);
                    $("#"+formId).append(field);
		}
	}
	catch(err)
	{
	}


// Process form on submit

    var parentForm = "";

    var firstName = $("#firstNameInput");
    var lastName = $("#lastNameInput");
    var email = $("#emailInput");
    var phone = $("#phoneInput");

    window.onSubmit = onSubmit;

    var clicks = 0;
    jQuery(".submitButton").click(function (e) {
        e.preventDefault();
        parentForm = jQuery(this).parents("form");

        if (email.val() !== "" || phone.val() !== "") {
            // For recaptcha invisible.
            var cap = jQuery("#g-recaptcha-response").val();
            if (!cap) {
                grecaptcha.execute();
            } else {
                grecaptcha.reset();
                grecaptcha.execute();
            }
        } else if ((firstName.val() == "" && lastName.val() == "") && (email.val() == "" && phone.val() == "")) {
            console.log("no values entered");
            window.open(appurl, '_blank');
            window.location.href = '/financing/thank-you.html';
        } else {
            clickCount()
        }

    });

    function clickCount() {
        console.log("clicks: " + clicks);
        if (clicks === 0) {
            $(".startApplication").attr("href", appurl);
            $("#alert").show();
            clicks++
        } else {
            console.log("form not submitted");
            $("#alert").hide();
            window.open(appurl, '_blank');
            window.location.href = '/financing/thank-you.html';
        }
    }

    function onSubmit(token) {

        submitter(parentForm);

    }

    function submitter(parentForm) {
        console.log("submitted");

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
                        // capturing analytic data before redirecting - digitalDataCaptureForm is found in /content/dam/wrmg/global/js/wrmgDigitalData.js
                        try {
                          var ddo = digitalDataCaptureForm(theForm);
                          window.open(appurl, '_blank');
                          window.location.href = formRedirectPage + "?success=" + ddo;
                        }
                        catch(err) {
                          console.log(err);
                          window.open(appurl, '_blank');
                          window.location.href = formRedirectPage;
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