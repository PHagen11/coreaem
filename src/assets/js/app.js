// import $ from 'jquery';
// import jQuery from 'jquery';
// import whatInput from 'what-input';

// window.$ = $;
// window.jQuery = jQuery;

// import Foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';

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
				$(this).children("ul").stop(true, false).fadeIn(150);
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
		$('.filter-panel').addClass('shown').removeClass('hidden');
		$('#results-grid').removeClass('medium-up-2 xlarge-up-4 two-and-four-up').addClass('medium-up-1 xlarge-up-3 one-and-three-up');

	});
	$('.inventory .filter-form .close-button').click (function() {
		$('.filter-panel').addClass('hidden').removeClass('shown');
		$('#results-grid').removeClass('medium-up-1 xlarge-up-4 one-and-three-up').addClass('medium-up-2 xlarge-up-4 two-and-four-up');
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
