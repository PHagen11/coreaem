$(function($) {
	$('.header .header-menu > ul > li:has( > ul)').addClass('menu-dropdown-icon');

	$(".header .header-menu > ul").before("<a href=\"#\" class=\"menu-mobile\"></a>");

	if (navigator.userAgent.match(/iPad/i) == null) {
		console.log("not ipad");

		$(".header .header-menu > ul > li").on("mouseover", function (e) {

			if ($(window).width() >= 1024) {
				$(this).addClass("opened");
				$(this).children("ul").stop(true, false).delay(500).fadeIn(150);
				e.preventDefault();
			}
		});

		$(".header .header-menu > ul > li").on("mouseout", function (e) {

			if ($(window).width() >= 1024) {

				$(this).removeClass("opened");
				$(this).children("ul").stop(true, false).fadeOut(150);
				e.preventDefault();
			}
		});
	}
	//If width is Large or more (1024px) dropdowns are displayed on hover

	$(".header .header-menu > ul > li a").not(".title").on("click", function() {
		if ($(window).width() < 1024) {
			$(this).parent().children("ul").fadeToggle(150);
			$(this).parent().toggleClass('opened');
		}
	});
	//If width is less than Large dropdowns are displayed on click (thanks Aman Jain from stackoverflow)

	$(".header .menu-mobile").on("click", function(e) {
		$(".header .header-menu > ul").toggleClass('show-on-mobile');
		e.preventDefault();
	});
	//when clicked on mobile-menu, normal menu is shown as a list, classic rwd menu story (thanks mwl from stackoverflow)


	// $(window).resize(function() {
	// 	$(".header .header-menu > ul > li").children("ul").fadeOut(150);
	// 	$(".header .menu-dropdown-icon").removeClass('opened');
	// });


	//inventory functions
	$('.inventory .category-tab').on("click", function() {
		var mytype=$(this).attr('data-type');
		$('.inventory .category-tab').removeClass('selected');
		$('.inventory .make-type-search').removeClass('selected');
		$(this).addClass('selected');
		$('.inventory #'+mytype+'-search').addClass('selected');
		$('.inventory .heroArea .heroImage').css('background-image','url('+$(this).attr('data-image')+')');
		$('.inventory .heroArea .half-size').text($(this).attr('data-text-half'));
		$('.inventory .heroArea .normal-size').text($(this).attr('data-text-normal'));
	})

	$('.inventory .filter-toggle-button').on("click", function() {
		$('.filter-panel').addClass('shown');
		// $('.filter-results').addClass('hidden');
	});
	$('.inventory .filter-toggle-button').on("click", function() {
		$('.filter-results').addClass('hidden');
	});
	$('.inventory .filter-form .close-button').on("click", function() {
		$('.filter-panel').addClass('hidden').removeClass('shown');
		$('.filter-results').removeClass('hidden');
	});
	$('.inventory .filter-form .submit-btn').on("click", function() {
		$('.filter-panel').removeClass('shown');
		$('.filter-results').removeClass('hidden');
	});
	$('.inventory .filter-form .condition-buttons label').on("click", function() {
		$('.condition-buttons label').removeClass('selected');
		$(this).addClass('selected');
	});
	$('.inventory .filter-form .model-checkbox').on("change", function() {
		$(this).siblings('.subset').children(":checkbox").prop("checked", false);
		$(this).siblings('.subset').toggleClass('hide');
		$(this).toggleClass('selected');
	});

});

// customer service start
$(window).on('load', function() {
	technicalQuestion();
});

$("#categoryInput").on("change", function() {

	if ($("#categoryInput").val() === "102") {
		$("#snInput").prop('required', true);
		$("#snLabel").text("Boat Serial Number *");
	} else {
		$("#snInput").parent().removeClass('is-invalid-label');
		$("#snInput").removeClass('is-invalid-input');
		$("#snInput").siblings().removeClass('is-visible');
		$("#snLabel").text("Boat Serial Number (if applicable)");
		$("#snInput").prop('required', false);
	}

	technicalQuestion();

});

function technicalQuestion() {

	if ($("#categoryInput").val() === "107") {
		$("#firstNameInput, #lastNameInput, #phoneInput, #postalCodeInput, #emailInput, #subjectInput, #questionInput, #snInput").parent().hide();
		$(".submitButton, #errorCallout, #form-instructions, .snNotRequired").hide();
		$("#supportCallout").show();
	} else {
		$("#firstNameInput, #lastNameInput, #phoneInput, #postalCodeInput, #emailInput, #subjectInput, #questionInput, #snInput").parent().show();
		$(".submitButton, #form-instructions, .snNotRequired").show();
		$("#supportCallout").hide();
	}

}

// customer service end

// var formRedirectPage = "/dealers/service-inquiry/thank-you.html";
let formId = "form4";

function dealerWebsiteRedirect(dealerId, url) {
	//var formRedirectPage = "/dealers/service-inquiry/thank-you.html";
	//var formId = "form4";

	console.log("dealer id is: " + dealerId);

	if (dealerId != '') {
		console.log("add hidden dealerid");
		var field = $(document.createElement("input"));
		field.attr("name", "selectdid").attr("type", "hidden");
		field.val(dealerId);
		$("#"+formId).append(field);
	}

	try {
		// var thisurl = new URL(window.location.toLocaleString());
		//var thisurlparams = thisurl.searchParams;
		if (url) {
			//var wparam = url.get('w');
			formRedirectPage = url;
			console.log("W Param = " + url);
		}
	}
	catch (error) {}
}

// $("a").on("click", function() {
//   if ($(".is-accordion-submenu").attr("aria-hidden") == "false") {
//     console.log("display is not none")
//     clearTimeout($.data(this, 'scrollTimer'));
//     $.data(this, 'scrollTimer', setTimeout(function() {
//       setTimeout(function() {
//         console.log("Haven't scrolled in 250ms!");
//       $('.accordion-menu').foundation('hideAll');
//       }, 2000)
//     }, 250));
//   }
// });

// $(".anchor-menu .is-accordion-submenu a").on("click", function() {
// 	console.log("click event run");
// 	setTimeout(function() {
//     $('.accordion-menu').foundation('hideAll');
//   }, 300)
// });

document.onscrollend = () => {
	if ($(".is-accordion-submenu").attr("aria-hidden") == "false") {
		$('.accordion-menu').foundation('hideAll');
	}
};

// var timer = null;
// document.addEventListener('scroll', function() {
//     if(timer !== null) {
//         clearTimeout(timer);        
//     }
//     timer = setTimeout(function() {
//       if ($(".is-accordion-submenu").attr("aria-hidden") == "true") {
//         console.log("no scrolls for 500ms")
//         $('.accordion-menu').foundation('hideAll');
//       }
      
//     }, 500);
// }, false);

$(".menu-option").on("click", function() {
  var linkValue = $(this).text();
  console.log("link value: " + linkValue);
  $("#model-year").html(linkValue + " Model Year");
});

$(".package-details").css("display", "none");

/*** BELOW JS USED FOR BYO ***/

// calls tiny slider. used on BYO
$(function() {
    var slider = tns({
        container: '#boat-preview',
        items: 1,
        autoHeight: false,
        center: true,
        controlsContainer: "#arrow-controls",
        navContainer: "#boat-preview-thumbnails",
        navAsThumbnails: true,
        swipeAngle: false,
        speed: 400,
        preventScrollOnTouch: 'force',
    });

    var fullscreen = tns({
        container: '#boat-fullscreen',
        items: 1,
        autoHeight: false,
        center: true,
        controlsContainer: "#arrow-controls-fullscreen",
        navContainer: "#boat-fullscreen-thumbnails",
        navAsThumbnails: true,
        swipeAngle: false,
        speed: 400,
        preventScrollOnTouch: 'force',
    });
});

$(function() {
    $(".cc-accordion .accordion-title").on('click', updateAccordion);
    $(".options-accordion .accordion-title").on("click", updateAccordion);
    $(".details-accordion .accordion-title").on("click", updateAccordion);

    function updateAccordion() {
        let $accordionObj = $(this).parent();
        if ($accordionObj.hasClass('is-active')) {
            setTimeout(() => {
                $('html, body').animate({
                    scrollTop: $(this).offset().top - 100
                });
            }, 250);
        }
    }
    // window.addEventListener("beforeunload", function(e) {
    //     e.preventDefault();
    // });
});

/*** END BYO JS ***/


/**** LOGIC FOR TRADE IN FORM ****/
document.addEventListener("DOMContentLoaded", function() {
    const equipmentInput = document.querySelectorAll(".boatOptionsRadio");
    const optionDetails = document.getElementById("optionDetails");
    const optionsInput = document.getElementById("optionsTextInput");

    equipmentInput.forEach(option => {
        option.addEventListener("click", function() {
            if (option.id === "customEquipmentInput") {
                optionDetails.style.display = "block";
                optionsInput.required = true;
            } else {
                optionDetails.style.display = "none";
                optionsInput.required = false;
            }
        })
    })
});
