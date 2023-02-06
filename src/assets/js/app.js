// import $ from 'jquery';
// import jQuery from 'jquery';
// import whatInput from 'what-input';

// const { isEmptyObject } = require("jquery");

// window.$ = $;
// window.jQuery = jQuery;

// import Foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below

// $(document).foundation();


jQuery(document).ready(function($) {

	$('#gallery-1').lightGallery({
		selector: '.media-item',
		mode: 'lg-fade',
		thumbnail: true,
		loadYoutubeThumbnail: true,
		youtubeThumbSize: 'default',
		loadVimeoThumbnail: true,
		vimeoThumbSize: 'thumbnail_medium',
		youtubePlayerParams: {
			modestbranding: 0,
			showinfo: 0,
			rel: 0,
			controls: 0
		},
		vimeoPlayerParams: {
			byline: 0,
			portrait: 0,
			color: 'A90707'
		},

	});


	// $('.mega-menu-trigger a').click(function() {
	//     var target = "." + $(this).data("target");
	//     $('.mega-menu-panel').not(target).removeClass('mega-menu-panel-open');
	//     $('.mega-menu-trigger a').not(this).removeClass('mega-menu-triggered');
	//     $(this).toggleClass('mega-menu-triggered');
	//     $(target).toggleClass('mega-menu-panel-open');
	// });


	$('.header .header-menu > ul > li:has( > ul)').addClass('menu-dropdown-icon');
	//Checks if li has sub (ul) and adds class for toggle icon - just an UI

	// $('.menu > ul > li > ul:not(:has(ul))').addClass('normal-sub');
	//Checks if drodown menu's li elements have anothere level (ul), if not the dropdown is shown as regular dropdown, not a mega menu (thanks Luka Kladaric)

	$(".header .header-menu > ul").before("<a href=\"#\" class=\"menu-mobile\"></a>");

	//Adds menu-mobile class (for mobile toggle menu) before the normal menu
	//Mobile menu is hidden if width is more then 959px, but normal menu is displayed
	//Normal menu is hidden if width is below 959px, and jquery adds mobile menu
	//Done this way so it can be used with wordpress without any trouble

	/* fix for double tap on iPad Landscape issue
	Old:
	$(".header .header-menu > ul > li").hover(function(e) {
		if ($(window).width() >= 1024) {
			$(this).children("ul").stop(true, false).fadeToggle(150);
			e.preventDefault();
		}
	});
	New below here:
	*/
	if (navigator.userAgent.match(/iPad/i) == null) {
		console.log("not ipad")

		$(".header .header-menu > ul > li").on("mouseover", function (e) {

			if ($(window).width() >= 1024) {
				$(this).addClass("opened");
				$(this).children("ul").stop(true, false).delay(500).fadeIn(150);
				e.preventDefault();
			}
			});

			jQuery(".header .header-menu > ul > li").on("mouseout", function (e) {

			if ($(window).width() >= 1024) {

				$(this).removeClass("opened");
				$(this).children("ul").stop(true, false).fadeOut(150);
				e.preventDefault();
			}
		});
	}
	//If width is Large or more (1024px) dropdowns are displayed on hover

	$(".header .header-menu > ul > li a").not(".title").click(function() {
		if ($(window).width() < 1024) {
			$(this).parent().children("ul").fadeToggle(150);
			$(this).parent().toggleClass('opened');
		}
	});
	//If width is less than Large dropdowns are displayed on click (thanks Aman Jain from stackoverflow)

	$(".header .menu-mobile").click(function(e) {
		$(".header .header-menu > ul").toggleClass('show-on-mobile');
		e.preventDefault();
	});
	//when clicked on mobile-menu, normal menu is shown as a list, classic rwd menu story (thanks mwl from stackoverflow)


	$(window).resize(function() {
		$(".header .header-menu > ul > li").children("ul").fadeOut(150);
		$(".header .menu-dropdown-icon").removeClass('opened');
	});


	//inventory functions
	$('.inventory .category-tab').click (function() {
		var mytype=$(this).attr('data-type');
		$('.inventory .category-tab').removeClass('selected');
		$('.inventory .make-type-search').removeClass('selected');
		$(this).addClass('selected');
		$('.inventory #'+mytype+'-search').addClass('selected');
		$('.inventory .heroArea .heroImage').css('background-image','url('+$(this).attr('data-image')+')');
		$('.inventory .heroArea .half-size').text($(this).attr('data-text-half'));
		$('.inventory .heroArea .normal-size').text($(this).attr('data-text-normal'));
	})

	$('.inventory .filter-toggle-button').click (function() {
		$('.filter-panel').addClass('shown');
		// $('.filter-results').addClass('hidden');
	});
	$('.inventory .filter-toggle-button').click (function() {
		$('.filter-results').addClass('hidden');
	});
	$('.inventory .filter-form .close-button').click (function() {
		$('.filter-panel').addClass('hidden').removeClass('shown');
		$('.filter-results').removeClass('hidden');
	});
	$('.inventory .filter-form .submit-btn').click (function() {
		$('.filter-panel').removeClass('shown');
		$('.filter-results').removeClass('hidden');
	});
	$('.inventory .filter-form .condition-buttons label').click (function() {
		$('.condition-buttons label').removeClass('selected');
		$(this).addClass('selected');
	});
	$('.inventory .filter-form .model-checkbox').change (function() {
		$(this).siblings('.subset').children(":checkbox").prop("checked", false);
		$(this).siblings('.subset').toggleClass('hide');
		$(this).toggleClass('selected');
	});
});

	// var s = $(".submit-btn");
	// var pos = s.position();
	// $(window).scroll(function() {
	// 	var windowpos = $(window).scrollTop();
	// 	if (windowpos >= pos.top & windowpos <="end") {
	// 		s.addClass("stick");
	// 	} else {
	// 		s.removeClass("stick");
	// 	}
	// });

// var s = $(".submit-btn");
//  var pos = s.position();
//  $(window).scroll(function() {
// 		 var windowpos = $(window).scrollTop();
//
// 		 if (windowpos <= pos.top) {
// 				 s.addClass("stick");
// 		 } else {
// 				 s.removeClass("stick");
// 		 }
//  });

// let dealersArr = [];

const getDealers = () => {
	return new Promise((resolve, reject) => {
		resolve({
			dealers: [
				{
					ID: "1",
					NAME: "Bass Pro Springfield",
					ADDRESS: "1935 South Campbell Springfield MO,65807",
					FAVORITE: false,
					TIMESTAMP: ""
				},
				{
					ID: "2",
					NAME: "Bass Pro Branson",
					ADDRESS: "1 Bass Pro Drive, Branson, MO 65616",
					FAVORITE: false,
					TIMESTAMP: ""
				},
				{
					ID: "3",
					NAME: "Bradford Marine & ATV",
					ADDRESS: "2300 S Promenade BLVD Rogers AR, 72758",
					FAVORITE: false,
					TIMESTAMP: ""
				},
				{
					ID: "4",
					NAME: "Southwinds Marina",
					ADDRESS: "28277 S. 4535 Road Bernice OK,74331",
					FAVORITE: true,
					TIMESTAMP: ""
				},
				{
					ID: "5",
					NAME: "Albers Marine",
					ADDRESS: "403 N. Hwy 69 Arma KS,66712",
					FAVORITE: false,
					TIMESTAMP: ""
				},
				{
					ID: "6",
					NAME: "Pro's Choice Marine",
					ADDRESS: "13696 HWY 7 Warsaw MO,65355",
					FAVORITE: false,
					TIMESTAMP: ""
				},
				{
					ID: "7",
					NAME: "Whit's Marine",
					ADDRESS: "823 North 11th Street Fort Smith AR,72901",
					FAVORITE: false,
					TIMESTAMP: ""
				}
			]
		})
	})
}

let dealersArr = getDealers()
	.then(data => data)
	.then((dealers) => {
		return dealers
	})

const printDealers = () => {

	// jQuery(".results").html("");

	dealersArr.then((dealers) => {

		
		let dealersObj = dealers.dealers;
		let storeData = getMyStore();

		for (let i = 0; i <= dealersObj.length - 1; i++) {
			let results = document.getElementById('dealer-select-modal');
			results = 
				`<div class="cell small-12 medium-6 large-4 result-container">` +
					`<div id="dealer-${(i+1)}"  class="result-entry">` +
						`<div class="grid-x dealer-badge">` +
							`<div class="cell shrink dealer-badge-container elite-dealer"><i class="fas fa-award"></i> Elite Dealer</div>` +
							`<div class="cell shrink dealer-badge-entry">Offsite Service <i class="far fa-info-circle"></i></div>` +
						`</div>` +

						`<div class="grid-x pos-relative">` +
							`<div class="cell px-15">` +
								`<div class="dealer-name">${(i+1)}. ${dealersObj[i].NAME}</span></div>`;

			if (storeData && storeData.ID != "") {
				let dealerId = storeData.ID;
				if (dealerId == dealersObj[i].ID) {
					results +=

								`<label class="favorite" for="my-dealer-${(i+1)}">` +
									`<input type="radio" id="my-dealer-${(i+1)}" name="my-dealer" value="my-dealer" class="checked" checked>` +
									`<span id="favorite-1" class="uppercase dealerProp">MY DEALER</span>` +
									`<span class="checkmark"></span>` +
								`</label>`;
				}
			}
			results +=
								`<div class="dealer-address">${dealersObj[i].ADDRESS} <br> <a href="javascript: void();" class="directions">Get Directions</a></div>` +

								`<div class="store-distance">00 Miles Away</div>` +

							`</div>` +
						`</div>` +
						`<div class="grid-x">`;
			if (storeData && storeData.ID != "") {
				let dealerId = storeData.ID;
				if (dealerId != dealersObj[i].ID) {
					results +=
							`<div class="cell set-dealer-btn text-center">` +
								`<a href="#" class="hollow button tiny dealerSelect" data-close id="${dealersObj[i].ID}">Set As Dealer</a>` +
							`</div>`;
				}
			}
			if (!storeData) {
				results +=
					`<div class="cell set-dealer-btn text-center">`+
						`<a href="#" class="hollow button tiny dealerSelect" data-close id="${dealersObj[i].ID}">Set As Dealer</a>` +
					`</div>`;
			}
			results +=
						`</div>` +
					`</div>` +
				`</div>`;

				jQuery("#dealer-select-modal").append(results);
		}

		jQuery(".dealerSelect").on("click", function() {
			let dealerID = jQuery(this).attr("id");
			setCookie("dealer", dealerID, "365");
			setAsMyStore(dealerID);
		})


		for (var i = 0; i <= dealersObj.length - 1; i++) {
			let dealerLocation = document.getElementById("dealer-search-results");
			dealerLocation =
					`<div id="dealer-${(i+1)}" class="result-entry">` +

						`<div class="grid-x dealer-badge">` +
							`<div class="cell shrink dealer-badge-container elite-dealer"><i class="fas fa-award"></i> Elite Dealer</div>` +
							`<div class="cell shrink dealer-badge-entry">Offsite Service <i class="far fa-info-circle"></i></div>` +
						`</div>` +

						`<div class="grid-x pos-relative">` +
							`<div class="cell card-left-column medium-9 large-8 p-20">` +
								`<div class="dealer-name tiny-bottom">${(i+1)}. ${dealersObj[i].NAME}</div>` +

								`<label class="favorite" for="set-dealer-${(i+1)}">` +
									`<input type="radio" id="set-dealer-${(i+1)} name="set-dealer" value="favorite" class="dealerRadio">` +
									`<span id="favorite-${(i+1)}" class="uppercase dealerProp">SET AS MY DEALER</span>` +
									`<span class="checkmark"></span>` +
								`</label>` +

								`<div class="dealer-address">${dealersObj[i].ADDRESS}
                <br>
								<a href="javascript: void();" class="directions">Get Directions</a></div>` +

								`<div class="grid-x">` +
									`<div class="cell large-12">` +
										`<ul class="accordion" data-accordion data-multi-expand="true" data-allow-all-closed="true">` +
											`<li class="accordion-item" data-accordion-item>` +
												`<a href="#" class="accordion-title bold">
													Store Hours
												</a>` +
												`<div class="accordion-content" data-tab-content>` +
													`<table class="unstriped">` +
														`<tbody class="border-none">` +
															`<tr class="border-bottom-none">` +
																`<td>Sunday</td>` +
																`<td>8AM - 8PM</td>` +
															`</tr>` +
															`<tr class="border-bottom-none">` +
																`<td>Monday</td>` +
																`<td>8AM - 8PM</td>` +
															`</tr>` +
															`<tr class="border-bottom-none">` +
																`<td>Tuesday</td>` +
																`<td>8AM - 8PM</td>` +
															`</tr>` +
															`<tr class="border-bottom-none">` +
																`<td>Wednesday</td>` +
																`<td>8AM - 8PM</td>` +
															`</tr>` +
															`<tr class="border-bottom-none">` +
																`<td>Thursday</td>` +
																`<td>8AM - 8PM</td>` +
															`</tr>` +
															`<tr class="border-bottom-none">` +
																`<td>Friday</td>` +
																`<td>8AM - 8PM</td>` +
															`</tr>` +
															`<tr class="border-bottom-none">` +
																`<td>Saturday</td>` +
																`<td>8AM - 8PM</td>` +
															`</tr>` +
														`</tbody>` +
													`</table>` +
												`</div>` +
											`</li>` +
											`<li class="accordion-item" data-accordion-item>` +
												`<a href="#" class="accordion-title bold">
													Service Hours
												</a>` +
												`<div class="accordion-content" data-tab-content>` +
													`<table class="unstriped">` +
														`<tbody class="border-none">` +
															`<tr class="border-bottom-none">` +
																`<td>Sunday</td>` +
																`<td>8AM - 8PM</td>` +
															`</tr>` +
															`<tr class="border-bottom-none">` +
																`<td>Monday</td>` +
																`<td>8AM - 8PM</td>` +
															`</tr>` +
															`<tr class="border-bottom-none">` +
																`<td>Tuesday</td>` +
																`<td>8AM - 8PM</td>` +
															`</tr>` +
															`<tr class="border-bottom-none">` +
																`<td>Wednesday</td>` +
																`<td>8AM - 8PM</td>` +
															`</tr>` +
															`<tr class="border-bottom-none">` +
																`<td>Thursday</td>` +
																`<td>8AM - 8PM</td>` +
															`</tr>` +
															`<tr class="border-bottom-none">` +
																`<td>Friday</td>` +
																`<td>8AM - 8PM</td>` +
															`</tr>` +
															`<tr class="border-bottom-none">` +
																`<td>Saturday</td>` +
																`<td>8AM - 8PM</td>` +
															`</tr>` +
														`</tbody>` +
													`</table>` +
												`</div>` +
											`</li>` +
										`</ul>` +
										`<div class="store-distance">00 Miles Away</div>` +
									`</div>` +
								`</div>` +
							`</div>` +
							`<div class="cell card-divider"></div>` +
							`<div class="cell auto card-right-column">` +

								`<div class="display-sm-none text-center"><a class="button tiny" data-open="contact-dealer-modal-container">Contact Dealer</a></div>` +

									`<div class="grid-x dealer-options-grid">` +
										`<div class="cell small-6 medium-12 dealer-option-container pl-5">` +
											`<a href="javascript: void();" class="dealer-option phone-icon">1-000-000-0000</a>` +
										`</div>` +
										`<div class="cell small-6 medium-12 dealer-option-container pl-5">` +
											`<a href="javascript: void();" class="dealer-option wrench-icon">Service Inquiry</a>` +
										`</div>` +
										`<div class="cell small-6 medium-12 dealer-option-container pl-5">` +
											`<a href="javascript: void();" class="dealer-option globe-icon">Visit Website</a>` +
										`</div>` +
										`<div class="cell small-6 medium-12 dealer-option-container pl-5">` +
											`<a href="javascript: void();" class="dealer-option cart-icon">View Inventory</a>` +
										`</div>` +
									`</div>` +

								`</div>` +
							`</div>` +

							`<ul class="accordion segments" data-accordion data-allow-all-closed="true">` +
								`<li class="accordion-item grid-x" data-accordion-item>` +
									`<div class="cell segment-names auto">Aluminum &#9679; Inshore Saltwater &#9679; Pontoons &#9679; Segments</div>` +
									`<a href="#" class="cell accordion-title shrink"><span class="hide-for-small-only">View</span> More
									</a>` +
									`<div class="cell accordion-content align-self-center" data-tab-content>` +
										`<p>Aluminum &#9679; Pontoons &#9679; Segments Aluminum &#9679; Pontoons &#9679; Segment Aluminum &#9679; Inshore Saltwater &#9679; Pontoons &#9679; Segment</p>` +
									`</div>` +
								`</li>` +
							`</ul>` +

							`<div class="grid-x">` +
								`<div class="cell mobile-contact-btn hide-for-medium text-center">` +
									`<a class="button tiny" data-open="contact-dealer-modal-container">Contact Dealer</a>` +
								`</div>` +
							`</div>` +

						`</div>`;

				jQuery("#dealer-search-results").append(dealerLocation);
		}


		function getMyStore() {
			let myStore;

			if (typeof(Storage) !== "undefined" && localStorage.myStore) {
				myStore = JSON.parse(localStorage.getItem('myStore'));

				// time stamp is over 30 days old pull fresh
				let currentTime = Date.now();
				let expiryTimeMillis = 24 * 60 * 60 * 1000
				if (currentTime - myStore.timestamp >= expiryTimeMillis) {
					setAsMyStore(myStore.dealerId);
					myStore = JSON.parse(localStorage.getItem('myStore'));
				}
			}
			return myStore;
		}

		function setAsMyStore(dealerId) {
			let resultObj = dealersObj.map(dealer => dealer).filter(dealer => dealer.ID == dealerId);
			if (typeof(resultObj[0]) !== 'undefined' && typeof(resultObj[0].ID) !== 'undefined') {
				setCookie("dealer", resultObj, 365);
				resultObj[0].timestamp = Date.now();
				localStorage.setItem('myStore', JSON.stringify(resultObj[0]));
			}
		}
	})
}

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

printDealers();