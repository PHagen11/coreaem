/* ***************************************************************************************************************************
	
	This file lives in the DAM: /content/dam/wrmg/BYO-GlobalAssets/js/loadBYO.js
	
	Loads the necessary files to display BYO on a brand site

****************************************************************************************************************************** */

$(document).ready(function() {
	
	window.DAMroot = '';
	window.prodSiteURL = '';
	window.productVarName = ''; 

	window.isJSON = function(str) {
		try {
			return JSON.parse(str) ;
		} catch (e) {
			return false;
		}
	}

// retrieve the value of a URL name/value pair.
window.getUrlParameter = function(sParam) {
	// simple vars
	var sPageURL = window.location.search.substring(1),
		// put all of our url variables into an array
		sURLVariables = sPageURL.split('&'),
		sParameterName,
		i;
	// loop over array of all url vars
	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');
		// is this the var we are looking for?
		if (sParameterName[0] === sParam) {
			// cool! retrun it's value!
			return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
		}
	}
};

	// let's change the page title
	document.title = "Build a " + document.title;

	// moving the scroll-to-top button just above the fixed footer and reCaptcha badge
	$('.scroll-top-wrapper').css('bottom', '85px');

	// simple variable definitions
	var loc = window.location.href,
		damPath = '/content/dam/wrmg/',
		siteRoot = 'default',
		byoTemplate = '';

	// Figuring out which website we are serving commented out until diferent templates are needed for each brand.
	if(loc.indexOf("localhost") != -1) {
		siteRoot = jQuery('#loadBYO').attr('data-siteRoot');
		window.prodSiteURL = '//assets.whiterivermg.com';
	}

	let subdomain = 'www';
	let topLevelDomain = 'com';
	if(loc.indexOf("//dev.") > -1){ subdomain = 'dev'; }
	if(loc.indexOf(".test") > -1){ topLevelDomain = 'test'; }
	
	if( loc.indexOf("trackerboats") != -1 ) { 
		siteRoot = 'trackerboats';
	} 
	if( loc.indexOf("suntrackerboats") != -1 ) { 
		siteRoot = 'suntrackerboats';
	} 
	if( loc.indexOf("regencyboats") != -1 ) { 
		siteRoot = 'regencyboats';
	} 
	if( loc.indexOf("makoboats") != -1 ) { 
		siteRoot = 'makoboats';
	} 
	if( loc.indexOf("tahoeboats") != -1 ) { 
		siteRoot = 'tahoeboats';
	} 
	if( loc.indexOf("nitro") != -1 ) {
		siteRoot = 'nitro';
	} 
	if( loc.indexOf("ranger") != -1 ) { 
		siteRoot = 'rangerboats';
	} 
	if( loc.indexOf("triton") != -1 ) { 
		siteRoot = 'tritonboats';
	} 
	if( loc.indexOf("trackeroffroad") != -1 ) { 
		siteRoot = 'trackeroffroad';
	}

	window.prodSiteURL = '//'+subdomain+'.'+siteRoot+'.'+topLevelDomain;

	// Let's figure out what template we need for this request
	byoTemplate = '/content/dam/wrmg/BYO-GlobalAssets/templates/template-' + siteRoot + '.html';
	

	var productID = getUrlParameter('productID');
	if(getUrlParameter('productID') === undefined){
		productID = $('.boatID').data('boatid');
	}
	
	if( productID === '6382' ||
		productID === '6783' ||
		productID === '6784' ||
		productID === '6785' ||	 
		productID === '6786' || 
		productID === 6382 ||
		productID === 6783 ||
		productID === 6784 ||
		productID === 6785 ||	 
		productID === 6786 ||
		productID === '8689' ||
		productID === '8690' ||
		productID === '8691' ||
		productID === '8692' ||
		productID === '8756' ||
		productID === '8757' ||
		productID === 8689 ||
		productID === 8690 ||
		productID === 8691 ||
		productID === 8692  ||
		productID === 8756 ||
		productID === 8757  ||
		// Z Series
		productID === '8678'  ||
		productID === '8679'  ||
		productID === '8680'  ||
		productID === '8681'  ||
		productID === '8682'  ||
		productID === '8683'  ||
		productID === '8684'  ||
		productID === '8685'  ||
		productID === '8686'  ||
		productID === 8678  ||
		productID === 8679  ||
		productID === 8680  ||
		productID === 8681  ||
		productID === 8682  ||
		productID === 8683  ||
		productID === 8684  ||
		productID === 8685  ||
		productID === 8686 ){

		byoTemplate = '/content/dam/wrmg/BYO-GlobalAssets/templates/template-' + siteRoot + '-2024.html';

	}

	console.log("byoTemplate loaded: " + byoTemplate) 

	//console.log(siteRoot)
	//debugger

	// preload brand logo data for the PDF file
	$.ajax({
		async: false,
		url: '/content/dam/wrmg/BYO-GlobalAssets/js/dataURI-logo-' + siteRoot + '.js',
		dataType: 'script'
	});
	
	var detectBrowser = function() {
		
		return new Promise(function (resolve, reject) {
			
			var ua = window.navigator.userAgent;
			
			//console.log("ua: " + ua);
			
			if (!ua) {
				reject(Error("userAgent failed, are you using a browser?"));
			}
			var msie = ua.indexOf('MSIE ');
			if (msie > 0) {
				// IE 10 or older => return version number
				resolve("IE <= 10");
			}
			var edge = ua.indexOf('Edge/');
			if (edge > 0) {
				// Edge (IE 12+) => return version number
				resolve("Microsoft Edge");
			}
			var safari = ua.indexOf("Chrome/");
			if (safari > 0) {

				resolve("Chrome");
			}

			var safari = ua.indexOf("Safari/");
			if (safari > 0) {
				resolve("Safari");

			}

			var safari = ua.indexOf("Firefox/");
			if (safari > 0) {
				resolve("Firefox");

			}

			var trident = ua.indexOf('Trident/');
			if (trident > 0) {
				// IE 11 => return version number
				var rv = ua.indexOf('rv:');
				resolve("IE 11");
			}

			// other browser
			reject(Error("unsuported browser"));


		})
	};
	
	var detectOperatingSystem = function() {
		
		return new Promise(function (resolve, reject) {
			
			var ua = window.navigator.userAgent;
			
			navigator.userAgent || navigator.vendor || window.opera
			
			//console.log("ua: " + ua);
			
			if (!ua) {
				reject(Error("userAgent failed, are you using a browser?"));
			}
			var msie = ua.indexOf('MSIE ');
			if (msie > 0) {
				// IE 10 or older => return version number
				resolve("IE <= 10");
			}

			var edge = ua.indexOf('Edge/');
			if (edge > 0) {
				// Edge (IE 12+) => return version number
				resolve("Microsoft Edge");
			}
			var safari = ua.indexOf("Chrome/");
			if (safari > 0) {

				resolve("Chrome"); 
			}

			var safari = ua.indexOf("Safari/");
			if (safari > 0) {
				resolve("Safari");

			}

			var safari = ua.indexOf("Firefox/");
			if (safari > 0) {
				resolve("Firefox");

			}

			var trident = ua.indexOf('Trident/');
			if (trident > 0) {
				// IE 11 => return version number
				var rv = ua.indexOf('rv:');
				resolve("IE 11");
			}

			// other browser
			reject(Error("unsuported browser"));


		})
	};

	// This will execute a function of your choosing at the moment an element comes into existence ... kind of like a DIY DOM event handler.
	window.waitForElementToExist = function(selector, callback) {
		if (jQuery(selector).length) {
			callback();
		} else {
			setTimeout(function() {
				waitForElementToExist(selector, callback);
			}, 1000);
		}
	};

	// This will execute another function of your choosing at the moment it comes into existence ... kind of like a DIY event handler.
	var waitForFuncToExist = function(func, callback) {
		if (typeof $.isFunction(func) != 'undefined') {
			callback();
		} else {
			setTimeout(function() {
				waitForFuncToExist(func, callback);
			}, 1000);
		}
	};

	window.loadCustomColorUI = function(){
		// TODO: Nitro custom colors here
		return;
	}

	window.escapeRegExp = function(string){
		return string.toString().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	}

	window.replaceAll = function(str, term, replacement) {

		//console.log("str: " + str + ", term: " + term + ", replacement: " + replacement)
		if(str){ return str.toString().replace(new RegExp(escapeRegExp(term), 'g'), replacement); }
	}

	window.getColorOptionsPath = function() {
		var colorOptionsPath = localStorage.getItem("byoModelAssetsPath") + "byo-assets/color-options/";
		return colorOptionsPath;
	}

	window.getSwatchPath = function(swatchName) {


		var swatchPath = localStorage.getItem("byoSwatchPath") + swatchName + '.gif';
		var brand = BRANDID.toString().slice(0, 3);
		// console.log(brand);

		// Is this a Ranger Fiberglass or Pontoons or Saltwater or Aluminum model?
		if(brand == 254 || brand == 247 || brand === 255 || brand == 253){
			swatchPath = localStorage.getItem("byoSwatchPath") + swatchName + '.jpg';
		} 
		 
		// Is this a Triton Fiberglass or Tracker Off Road model? 
		if(brand == 288 || brand == 297){
			swatchPath = localStorage.getItem("byoSwatchPath") + swatchName + '.png';
		}

		return swatchPath;
	}


	// This will flip the specifications table from either showing metric or standard values. 
	window.setUOM = function(uomType){
		if(uomType === 'standard'){
			$('.uom-standard').removeClass('inactive').addClass('active');
			$('.uom-metric').removeClass('active').addClass('inactive');
			$('.standard').show();
			$('.metric').hide();
		} else if(uomType === 'metric'){
			$('.uom-metric').removeClass('inactive').addClass('active');
			$('.uom-standard').removeClass('active').addClass('inactive');
			$('.metric').show();
			$('.standard').hide();
		}
	}


	// forcing all of this to wait while we retrieve a saved build, if one was passed in the URL
	function beginLoadingBYO(){


		//console.log("begin loading byo ... ")
		//console.log(byoTemplate)

		// First we need to load up a template to work with
		$('#byoContainer').load( byoTemplate, function() {
			// Now that the template HTML is loaded, let's do some things to that HTML

			//console.log("template loaded ...")

			//console.log(damPath + 'BYO-GlobalAssets/js/imagecarousel.js');

			// Let's get our configuration of the owl-carousel so we can display prodcut images
			$.getScript( damPath + 'BYO-GlobalAssets/js/imagecarousel.js').done(function( script, textStatus ) {

				var app = 'app';
				//if( loc.indexOf("localhost") != -1 ) app = 'app2';
				if( getUrlParameter('test') === 'yes' ) app = 'app2';

				console.log( damPath + 'BYO-GlobalAssets/js/' + app + '.js')

				// Now that the image carousel is loaded, let's load up the BYO functionality
				$.getScript( damPath + 'BYO-GlobalAssets/js/' + app + '.js').done(function( script, textStatus ) {

					////////////////////////////////////////
					// do this stuff after app.js is loaded
					//////////////////////////////////////// 

					// This is needed to get Foundation components to work dynamically in the application
					$(document).foundation();

					// Now we neeed to move the fixed bottom bar found in the loaded template to the bottom of the site div
					$('.site').append($('#fixedBYOBottomBar'));

					// We also need to move the full image rerveal and print reveal to the bottom of the site div 
					$('.site').append($('#fullview'));
					$('.site').append($('#printview'));

					

					// Let's wait for the default swatch to exist in the DOM so we can click it causing all the things that happen on the clickevent to happen for that color option. 
					waitForElementToExist('.swatch.selected', function() {
						$('.swatch.selected').click();
					});



					// when the dealer accordion in the summary column exists, click it
					waitForElementToExist('.dealer-info .accordion-title', function() {

						//console.time("answer time")

						// initialize the accordion
						$("#dealerSumAccordion").accordion({collapsible: true});

						// close the dealer accordion in the summary column
						$( ".dealer-info .accordion-title" ).click();

						$('.custom-build-nav-item[data-babstep=sum]').click();

					});

					waitForElementToExist('.dealer-hours .accordion .accordion-title', function() {
						// close the dealer hours on the summary tab
						$('.dealer-hours .accordion .accordion-title').click();
					});

					waitForElementToExist('.swatch[data-defaultColor=1]', function() {

						$('.custom-build-nav-item[data-babStep="color"]').show();

						//console.log("defaultColor exists")
						//console.log("retrievedBuildJSON.colorOptions")
						//console.log("default color exists");
						//console.log(retrievedBuild)

						if(typeof retrievedBuildJSON.colorOptions === 'undefined'){
							
							// make sure the default color option is selected
							$('.swatch[data-defaultColor=1]').addClass('selected');
							$('.swatch[data-defaultColor=1]').click();	


						} else if(typeof retrievedBuildJSON.colorOptions !== 'undefined'){
							//console.log(retrievedBuildJSON.colorOptions)
							setTimeout(function() {
								$('.swatch[data-colorid='+retrievedBuildJSON.colorOptions+']').addClass('selected').click();
							}, 3000);

						} 

						// add a shadow to swatches so that white or light swatches show up on a white background
						$('.swatch-circle.custom').css('box-shadow', '0 0 6px rgb(0 0 0 / 75%)');

					});

					waitForElementToExist('.swatch-price', function() {
						$('.custom-build-nav-item[data-babStep="color"]').show();
						//$('.swatch-price').hide();
						// looking to see if any color options cost more, if so then show price under swatch, otherwise leave hidden.
						$('.swatch-price').each(function(){
							//console.log($(this).attr('data-price') + " - " + $('.swatch-price').length);
							if(($(this).attr('data-price') != '0') && ($(this).attr('data-price') != 'undefined')){
								$('.swatch-price').show();
							}
						});

					});


					waitForElementToExist('.buyNowPhone', function() {

						var chatURL = '',
							telly = '';

						if(loc.indexOf("trackerboats") != -1) 		{ telly = '855-580-0755'; chatURL = 'https://www.trackerboats.com/contact/sales.html' }
						if(loc.indexOf("tritonboats") != -1) 		{ telly = '844-279-5565'; chatURL = 'https://www.tritonboats.com/contact/sales.html' }
						if(loc.indexOf("regencyboats") != -1) 		{ telly = '855-252-5624'; chatURL = 'https://www.regencyboats.com/contact/sales.html' }
						if(loc.indexOf("makoboats") != -1) 			{ telly = '855-804-8402'; chatURL = 'https://www.makoboats.com/contact/sales.html' }
						if(loc.indexOf("tahoeboats") != -1) 		{ telly = '855-825-3515'; chatURL = 'https://www.tahoeboats.com/contact/sales.html' }
						if(loc.indexOf("suntrackerboats") != -1) 	{ telly = '855-814-0427'; chatURL = 'https://www.suntrackerboats.com/contact/sales.html' }
						if(loc.indexOf("rangerboats") != -1) 	 	{ telly = '888-474-8007'; chatURL = 'https://www.rangerboats.com/contact/sales.html' }
						if(loc.indexOf("nitro") != -1) 		 		{ telly = '855-630-2711'; chatURL = 'https://www.nitro.com/contact/sales.html' }
						if(loc.indexOf("trackeroffroad") != -1) 	{ telly = '888-885-4050'; chatURL = '' }

						$('.chatLink').attr('href', chatURL);
						$('.buyNowPhone').attr('href', 'tel:' + replaceAll(telly,'-',''));
						$('.buyNowPhone').text('1-' + telly);

					});

					//console.log("app.js finished")

					;
					
				}); 
			}); 
		});
	}

	// load up an existing build if buildId is passed in the URL
	var buildId = getUrlParameter('buildId');
	var buildID = getUrlParameter('buildID');
	var bID = getUrlParameter('bID');

	if((typeof buildID !== 'undefined') && (typeof buildId === 'undefined')){
		buildId = buildID;
	}
	
	window.buildId = buildId;
	window.retrievedBuild = {};
	window.retrievedBuildJSON = {};

	localStorage.removeItem('retrievedBuild');
	localStorage.removeItem('retrievedBuildJSON');

	// if buildId is a valid value
	if(typeof buildId !== 'undefined'){

		detectBrowser().then(function (browser) {
			
			console.log("browser: " + browser);

			if (browser == "IE 11") {
				
				var fetchBuild = function() {
					
					var deferred = new $.Deferred();

					// go get the data for the build
					var bURL = "//api.whiterivermg.com/leadbuild/api/ProductBuild/GetProductBuildById?token=AD6A5585-A02A-4081-98ED-4FB38D307674&buildId="+buildId;

					$.getJSON(bURL).done(function(response){

						console.log(response)


						if(response.length){
							localStorage.setItem('retrievedBuild', JSON.stringify(response));
							window.retrievedBuild = response;
						}
						
						if(response.jsonBuild){
							localStorage.setItem('retrievedBuildJSON', JSON.stringify(JSON.parse(response.jsonBuild)));	
							window.retrievedBuildJSON = JSON.parse(response.jsonBuild);
						}

						deferred.resolve(response);

					});
					
					return deferred.promise();
					
				}

				fetchBuild().then(beginLoadingBYO);				
				
			} else {
				
					/*
					
					IE 11 throws a syntax error if async function await is anywhere in the code, even if IE 11 doesn't ever actually execute the code. So ... I minified the following code, and put through eval as a string to avoid IE 11 failure
					
					async function awaitFetchBuild() {

						try {
							const response = await fetchBuild(url);
						}
						catch (err) {
							console.log('fetch failed', err);
						}

					}

					function fetchBuild() {

						// go get the data for the build
						var bURL = "//api.whiterivermg.com/leadbuild/api/ProductBuild/GetProductBuildById?token=AD6A5585-A02A-4081-98ED-4FB38D307674&buildId="+buildId;

						$.getJSON(bURL).done(function(response){

							//console.log(".getJSON success");
							//console.log(response)
							//console.log(response.json)
							//console.log(response.jsonBuild)

							if(response.length){
								localStorage.setItem('retrievedBuild', JSON.stringify(response));
								window.retrievedBuild = response;
							} else {
								localStorage.removeItem('retrievedBuild');
							}


							if(response.jsonBuild){
								localStorage.setItem('retrievedBuildJSON', JSON.stringify(JSON.parse(response.jsonBuild)));	
								window.retrievedBuildJSON = JSON.parse(response.jsonBuild);
							} else {
								localStorage.removeItem('retrievedBuildJSON');
							}

							//console.log("1 ... ")
							async function loadum() {
								try {

									//console.log('2 ... ')
									const fulfilledValue = await beginLoadingBYO();
									//console.log('3 ... ')

								}
								catch (rejectedValue) {

									//console.log("rejectedValue")
									//console.log(rejectedValue)
								}
							}

							loadum();

						});
					}
					
					*/
					
					eval('async function awaitFetchBuild(){try{await fetchBuild(url)}catch(e){console.log("fetch failed",e)}}function fetchBuild(){var e="//api.whiterivermg.com/leadbuild/api/ProductBuild/GetProductBuildById?token=AD6A5585-A02A-4081-98ED-4FB38D307674&buildId="+buildId;$.getJSON(e).done(function(e){e.length?(localStorage.setItem("retrievedBuild",JSON.stringify(e)),window.retrievedBuild=e):localStorage.removeItem("retrievedBuild"),e.jsonBuild?(localStorage.setItem("retrievedBuildJSON",JSON.stringify(JSON.parse(e.jsonBuild))),window.retrievedBuildJSON=JSON.parse(e.jsonBuild)):localStorage.removeItem("retrievedBuildJSON"),async function(){try{await beginLoadingBYO()}catch(e){}}()})}')

					awaitFetchBuild();
				

			}

		}).catch(function (err) {
			console.error(err);
		});

	} else {

		beginLoadingBYO();

	}
	
});

