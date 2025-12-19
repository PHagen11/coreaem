$('#loader').show(); 

// initializing simple vars
window.swatchConcatenation = '',
window.preloadImageList = '',
window.colorCtr = 0,
window.colorOptionsPath =  getColorOptionsPath();
window.rangerBYOAssetsPath = window.prodSiteURL + localStorage.getItem("byoModelAssetsPath") + "byo-assets/";
window.getPageFile = location.pathname.substring(1);
window.boatid = null;
window.boatModelParts = [];
window.colorPath = "/content/dam/ranger-fiberglass/2025/color-swatches/";
if(BRANDID.toString().substring(0, BRANDID.toString().length - 4) === "255") window.colorPath = "/content/dam/ranger-saltwater/2022/color-swatches/";
window.logoFiles = [];
window.wheelFiles = [];
window.allowCustom = [];
window.allowedPackages = [];
window.allowedLimitedEditionPackages = [];
window.allowedElectraFusionPackages = [];
window.allowedReataWhitePackages = [];
window.allowedReataMistPackages = [];
window.allowedReataWhiteFusionPackages = [];
window.allowedReataMistFusionPackages = [];
window.selectedCombo = '';
window.selectedVariation = "A";
window.slice1part = null;
window.slice2part = null;
window.slice3part = null;
window.slice4part = null;
window.colorData = new Array(); // array of the selected colors
window.customColorData = new Array(); // array of the selected colors
window.previousColorData = []; // stores colorData while custom colors are selected so we can restore if cancelled.
window.previousColorData = {selectedColorOption:null,combo:{name:null,variation:null},colors:null};
 
// clear some stored variables values
localStorage.setItem("hasColorOptions", "yes");

localStorage.setItem("colorOptionsPath", colorOptionsPath);
localStorage.setItem("byoRanger-selectedComboID", "");
localStorage.setItem("byoRanger-ccHasChanged", 0);
localStorage.setItem("byoRanger-fallbackColorOption", "");
localStorage.setItem("byoRanger-fallbackColorData", "");
localStorage.setItem("byoRanger-buildColorData", "");
//console.log('buildColorData set to empty ... ');


//if(BOATID !== 6735 && BOATID !== 6736){}


// load layers-bmt.svg 
var productSVGfileBMT = rangerBYOAssetsPath + 'layers-bmt.svg';
var productSVGfileSIDE = rangerBYOAssetsPath + 'layers-side.svg';
var productSVGfileOH = rangerBYOAssetsPath + 'layers-oh.svg';

//console.log('productSVGfileBMT: '+productSVGfileBMT)
//console.log('productSVGfileSIDE: '+productSVGfileSIDE)
//console.log('productSVGfileOH: '+productSVGfileOH)

$('[data-toggle="tooltip"]').tooltip()

$('#bab-color-options').hide();
$('#simpleImageContainer').hide();
$('#bab-color-selections').show();
$('#complexImageContainer').show();

///////////////////////
///////////////////////
///////////////////////
//
// Before we can do anything, we have to have all SVG files loaded so that we can manipulate them.
//
///////////////////////
///////////////////////
///////////////////////

var OHsvg = "";
var SIDEsvg = "";
var BMTsvg = "";
var OHsvgString = "";
var SIDEsvgString = "";
var BMTsvgString = "";
var buttonCount = 0;

$.get(productSVGfileOH, function(dataOH, statusOH){
    console.log("DataOH: " + dataOH + "\nStatus: " + statusOH + "\nObject Type: " + typeof dataOH);
    OHsvg = dataOH;
	
	console.log(OHsvg !== null)
    if(OHsvg !== null){
		OhsvgString = new XMLSerializer().serializeToString(OHsvg.documentElement);
		OhsvgString = replaceAll(OhsvgString,"//assets.whiterivermg.com",window.prodSiteURL);
		
        $("#custom-colors-oh").append( replaceAll( OhsvgString, 'id="', 'id="cc-oh-') ); 
        $("#sum-col-oh").append( replaceAll( OhsvgString, 'id="', 'id="owl-oh-') );
		$('.btn-showOH').click();
		buttonCount++;
    } else {
        $('.btn-showOH').hide();
    }


    //var svgNode = $("svg", data);
    //var docNode = document.adoptNode(svgNode[0]);

    //var pageNode = $("#custom-colors-bmt");
    //pageNode.html(docNode);
     

    $.get(productSVGfileSIDE, function(dataSIDE, statusSIDE){
        //console.log("DataSIDE: " + dataSIDE + "\nStatus: " + statusSIDE + "\nObject Type: " + typeof dataSIDE);
        SIDEsvg = dataSIDE;
		//console.log(SIDEsvg !== null)
        if(SIDEsvg !== null){
			SIDEsvgString = new XMLSerializer().serializeToString(SIDEsvg.documentElement);
			SIDEsvgString = replaceAll(SIDEsvgString,"//assets.whiterivermg.com",window.prodSiteURL);
            $("#custom-colors-side").html( replaceAll( SIDEsvgString, 'id="', 'id="cc-side-') ); 
            $("#sum-col-side").html( replaceAll( SIDEsvgString, 'id="', 'id="owl-side-') );
			$('.btn-showSIDE').click();
			buttonCount++;
        } else {
            $('.btn-showSIDE').hide();
        }
		

    
        $.get(productSVGfileBMT, function(dataBMT, statusBMT){
            //console.log("DataBMT: " + dataBMT + "\nStatus: " + statusBMT + "\nObject Type: " + typeof dataBMT);
            BMTsvg = dataBMT;
			//console.log(BMTsvg !== null)
            if(BMTsvg !== null){
				BMTsvgString = new XMLSerializer().serializeToString(BMTsvg.documentElement);
				BMTsvgString = replaceAll(BMTsvgString,"https://assets.whiterivermg.com",window.prodSiteURL);
                $("#custom-colors-bmt").html( replaceAll( BMTsvgString, 'id="', 'id="cc-bmt-') ); 
                $("#sum-col-bmt").html( replaceAll( BMTsvgString, 'id="', 'id="owl-bmt-') );
				$('.btn-showBMT').click();
				buttonCount++;
            } else {
                $('.btn-showBMT').hide();
            }

			if(buttonCount < 2){
				$('.btn-showSIDE').hide();
				$('.btn-showOH').hide();
				$('.btn-showBMT').hide();
                if($('#sum-col-bmt').html() !== ''){
                    $('#sum-col-bmt').show();
                } else if($('#sum-col-oh').html() !== ''){
                    $('#sum-col-oh').show();
                } else if($('#sum-col-side').html() !== ''){
                    $('#sum-col-side').show();
                }
			}

			// That's it! All SVG files are loaded ...
            // Now, let's define some functionality.





			var makeDraggable = (function() {

				function makeDraggable(svg, element) {
					var selected = false;
			
					// Make sure the first transform on the element is a translate transform
					var transforms = element.transform.baseVal;
			
					if (transforms.length === 0 || transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
						// Create an transform that translates by (0, 0)
						var translate = svg.createSVGTransform();
						translate.setTranslate(0, 0);
						element.transform.baseVal.insertItemBefore(translate, 0);
					}
					
					svg.addEventListener('mousedown', startDrag);
					svg.addEventListener('mousemove', drag);
					svg.addEventListener('mouseup', endDrag);
					svg.addEventListener('keypress', zoom);

					let scale = 1;
					const el = $('#cc-bmt-layer-bmt-svg');
					el.onwheel = zoom;

					el
			
					function getMousePosition(evt) {
						var CTM = svg.getScreenCTM();
						if (evt.touches) { evt = evt.touches[0]; }
						return {
							x: (evt.clientX - CTM.e) / CTM.a,
							y: (evt.clientY - CTM.f) / CTM.d
						};
					}
			
					function startDrag(evt) {
						selected = element;
						transform = transforms.getItem(0);
			
						// Get initial translation
						offset = getMousePosition(evt);
						offset.x -= transform.matrix.e;
						offset.y -= transform.matrix.f;
					}
			
					function drag(evt) {
						if (selected) {
							evt.preventDefault();
							var coord = getMousePosition(evt);
							transform.setTranslate(coord.x - offset.x, coord.y - offset.y);
						}
					}
			  
					function endDrag(evt) {
						selected = false;
					}

					function zoom(evt) {
						evt.preventDefault();
						//console.log(evt)
						scale += evt.deltaY * -0.01;
						// Restrict scale
						scale = Math.min(Math.max(.125, scale), 4);
						// Apply scale transform
						el.style.transform = `scale(${scale})`;
					  }
			
					function zoom(evt) {


						evt.stopPropagation();
						evt.preventDefault();
					  
						var scaleStep = evt.wheelDelta > 0 ? 1.25 : 0.8;
			
						var newMatrix = currentZoomMatrix.multiply(matrix);
			  			container.transform.baseVal.initialize(svg.createSVGTransformFromMatrix(newZoomMatrix));

					}
				}
			
				return {
					byClassName: function(className) {
						// Get SVGs
						document.querySelectorAll('svg').forEach(function(svg) {
							// Get elements
							var elements = svg.getElementsByClassName(className);
							for (var i = 0; i < elements.length; i++) {
								//console.log(svg)
								//console.log(elements[i])
								makeDraggable(svg, elements[i]);
							}
						});
					}
				};
			})();
 
			//makeDraggable.byClassName('draggable');

			if(getUrlParameter('doPanZoom') === '1') {
					makeDraggable.byClassName('draggable');
					debugger
			}
			




            
            var segDir = replaceAll(SEGMENTNAME,'&reg;','');
                segDir = replaceAll(segDir,'®','');
                segDir = replaceAll(segDir,'&trade;','');
                segDir = replaceAll(segDir,'™','');
                segDir = replaceAll(segDir,' & ',' ');
                segDir = replaceAll(segDir,' ','-');
                segDir = replaceAll(segDir,"'",'');
                segDir = replaceAll(segDir,"/",'---');
                segDir = segDir.toLowerCase();

			var brandIDNoYear = BRANDID.toString().substring(0, BRANDID.toString().length - 4);
			var brandDir = 'ranger-fiberglass';

			if(brandIDNoYear === '255') brandDir = 'ranger-saltwater';

			var definitionsFileName = 'definitions.js'
			if(BOATNAME === 'Z185' && MODELYEAR >= 2025){
				var definitionsFileName = 'definitions-z185.js';
			}
            
			// load up all definitions like the list of colors, combos, color types, etc.
			$.getScript(window.prodSiteURL + '/content/dam/wrmg/' + brandDir + '/' + MODELYEAR + '/' + segDir + '/' + definitionsFileName).done(function(script,textStatus,jqxhr){
				
				console.log('Definition file loaded: '+window.prodSiteURL+'/content/dam/wrmg/' + brandDir + '/' + MODELYEAR + '/' + segDir + '/' + definitionsFileName)
				
				for (var i = 0; i < colorList.length; i++) {
					newColorImageURL = colorList[i].colorImageURL.replaceAll("https://assets.whiterivermg.com",window.prodSiteURL);
					colorList[i].colorImageURL = newColorImageURL;
				}

				// load up the definitions specific to the current model. When the defs.js file is loaded, then the rest is good to execute
				$.getScript(rangerBYOAssetsPath + 'defs.js', function(data) {

					var device = navigator.userAgent.toLowerCase();
					var ios = device.match(/(iphone|ipod|ipad)/);
					var boatPart = "";

					var DeckGroupArray = [];
					var HullGroupArray = [];
					var InteriorGroupArray = [];
					var TrailerGroupArray = [];
					var GraphicGroupArray = [];

					var escapeRegExp = function(string){
						return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
					}

					var replaceAll = function(str, term, replacement) {
						return str.replace(new RegExp(escapeRegExp(term), 'g'), replacement);
					}
					
					// set SVG defs
					var setSVGDefs = function(){
						var setdefs = "";
						setdefs = '<svg id="setdefs" width="0" height="0"><defs>';
						for (var i = 0; i < colorList.length; i++) {
							setdefs += '<pattern id="'+colorList[i].color+'" patternUnits="userSpaceOnUse" x="0" y="0" width="60" height="60"><image xlink:href="'+colorList[i].colorImageURL + '"  width="150" height="100" /></pattern>';

						}

						/*
						//add shadow filter
						setdefs += '<filter id="shadow" x="0" y="0" width="200%" height="200%">';
						setdefs += '<feGaussianBlur in="SourceAlpha" stdDeviation="35"/>';
						setdefs += '<feOffset dx="0" dy="0" result="shape" />';
						setdefs += '<feFlood flood-color="#ddd"/>';
						setdefs += '<feComposite operator="in" in2="shape"/>';
						setdefs += '<feMerge>';
						setdefs += '<feMergeNode/>';
						setdefs += '<feMergeNode in="SourceGraphic"/>';
						setdefs += '</feMerge>';
						setdefs += '</filter>';
						setdefs += '</defs></svg>';
						//console.log(setdefs)
                        */

						$('body').append(setdefs);
						
					}
					setSVGDefs();

					// get partArrayID of given boat part from colorData array
					var getPartArrayID = function(myboatpart){


						//console.log("myboatpart: "  + myboatpart)

						if(myboatpart !== null && typeof myboatpart !== "undefined") {

							if(!myboatpart.includes("#")) myboatpart = "#" + myboatpart;

							//console.log(colorData)

							if(colorData != null) {
								for ( i = 0; i < colorData.length; i++ ) {
									var thisPart = colorData[i].part.toLowerCase();
									//console.log("thisPart: " + thisPart + " ... myboatpart: " + myboatpart)
									if (thisPart === myboatpart) {
										//console.log("returning part array id: " + i)
										return i;
										break;
									}
								}
							}

						}
						return;
					}

					// apply pattern fills to the different part paths in the SVG of all 3 different views
					// also intiating the colorData object that will be used to change the pattern images as selections are made ...
					var initBoatImage = function(){

						for (var i = 0; i < boatModelParts.length; i++) {

							var thisOwlBMTid = '#owl-bmt-' + boatModelParts[i].id;
							var thisOwlSIDEid = '#owl-side-' + boatModelParts[i].id;
							var thisOwlOHid = '#owl-oh-' + boatModelParts[i].id;

							var thisCCBMTid = '#cc-bmt-' + boatModelParts[i].id;
							var thisCCSIDEid = '#cc-side-' + boatModelParts[i].id;
							var thisCCOHid = '#cc-oh-' + boatModelParts[i].id;

							var urlpatternOwlBMT = 'url(#owl-bmt-'+boatModelParts[i].id+'-pattern)';
							var urlpatternOwlSIDE = 'url(#owl-side-'+boatModelParts[i].id+'-pattern)';
							var urlpatternOwlOH = 'url(#owl-oh-'+boatModelParts[i].id+'-pattern)';

							var urlpatternCCBMT = 'url(#cc-bmt-'+boatModelParts[i].id+'-pattern)';
							var urlpatternCCSIDE = 'url(#cc-side-'+boatModelParts[i].id+'-pattern)';
							var urlpatternCCOH = 'url(#cc-oh-'+boatModelParts[i].id+'-pattern)';

							$(thisOwlBMTid).css('fill',urlpatternOwlBMT);
							$(thisOwlSIDEid).css('fill',urlpatternOwlSIDE);
							$(thisOwlOHid).css('fill',urlpatternOwlOH);
							
							$(thisCCBMTid).css('fill',urlpatternCCBMT);
							$(thisCCSIDEid).css('fill',urlpatternCCSIDE);
							$(thisCCOHid).css('fill',urlpatternCCOH);

							var partval = boatModelParts[i].id;
							colorData.push ({part:partval, color:null, colorDisplayName:null});
							
						}
						//console.table(colorData)
					}


					// get thisColorDisplayName
					var getColorDisplayName = function(mycolor){
						for ( i = 0; i < colorList.length; i++ ) {
							if ( colorList[i].color === mycolor) {
								return colorList[i].displayName;
								break;
							}
						}
					} 

					// highlights a part by flashing the path on the image instance
					var highlight = function(p,instance){

						instance = (typeof instance !== 'undefined') ?  instance : '';

                        var h1 = highlightColor1;
                        var h2 = highlightColor2;
						var p = instance + boatPart;

						var prevColor = $('#'+p+'-pattern image').attr('xlink:href');

                        if(typeof prevColor !== 'undefined'){
                            
                            /*colorList.forEach( function(c){
                                if(c.color === highlightColor1){
                                    h1 = c.colorImageURL;
                                }
                                if(c.color === highlightColor2){
                                    h2 = c.colorImageURL;
                                }
                            });*/


                            if(h1 === prevColor) h1 = h2;


                            //console.log('h1: ' + h1)
                            //console.log('prevColor: ' + prevColor) 

                            var timer = 0;

                            var inc = 100;

                            // flip the color of the part between two predefined highlight colors delaying each color switch by 200 milliseconds increments
                            setTimeout(function(){$('#'+p+'-pattern image').attr('xlink:href', h1);}, timer );
                            timer += inc;
                            setTimeout(function(){$('#'+p+'-pattern image').attr('xlink:href', prevColor);}, timer );
                            timer += inc;
                            setTimeout(function(){$('#'+p+'-pattern image').attr('xlink:href', h1);}, timer );
                            timer += inc;
                            setTimeout(function(){$('#'+p+'-pattern image').attr('xlink:href', prevColor);}, timer );
                            timer += inc;
                            setTimeout(function(){$('#'+p+'-pattern image').attr('xlink:href', h1);}, timer );
                            timer += inc;
                            setTimeout(function(){$('#'+p+'-pattern image').attr('xlink:href', prevColor);}, timer );

                        }

					}

					// get thisColor of given array id from colorData array
					var getColor = function(arrayID){

						if (arrayID === undefined) arrayID = 0; 

						//console.table(colorData)

						if(colorData !== null && typeof colorData[arrayID] !== "undefined" ){
							if ( arrayID === 0 || arrayID < colorData.length ) {
								return colorData[arrayID].color;
							} else {
								return colorData[arrayID-1].color;
							}
						} else {
							return '';
						}

					}
					
					var updateColorConfigDisplay = function(){

						window.colorConfiguration = [];
						
						// pull out the current color configuration from local storage
						var buildColorData = localStorage.getItem("byoRanger-buildColorData");
						
						// remove # symbols from the data
						buildColorData = replaceAll(buildColorData, "#", "");

						// parse it
						buildColorData = JSON.parse(buildColorData);

						//console.log(buildColorData)

						/*var logoName = $('.logoButtonDiv.selected').attr("data-logoname"),
							imageURL = $('.logoButtonDiv.selected').attr("data-imageurl");

						if(typeof logoName === 'undefined'){
							logoName = '';
						}

						if(logoName === ''){
							var logoFound = false;
							if(colorData != null){ 
								if(colorData.length > 0){
									for (var i = 0; i < colorData.length; i++) {
										if(colorData[i].part === "logo" || colorData[i].part === "Graphic") {
											logoFound = true;
											var logoName = thisLogoVarName.replace(/_/g,'/'); 
										}
									}
								}
							}
						}

						if(typeof imageURL === 'undefined'){
							imageURL = $('#'+localStorage.getItem('productVarName')+'-layers #logo').attr('xlink:href');
						}*/

						// temporary array to build the Configuration HTML table for display
						colorConfiguration = 
						[
							{
								name:"Deck",
								parts: []
							}, {
								name: "Hull",
								parts: []
							}, {
								name:"Interior",
								parts: []
							}, {
								name:"Trailer",
								parts: []
							}/*, {
								name:"Graphic",
								parts: [ {"part": "logo", "logoName": logoName, "imageURL": imageURL}]
							}*/
						];
						//console.log(boatModelParts)
						//console.log(colorConfiguration)

						for(var bmp = 0; bmp < boatModelParts.length; bmp++){
							//console.log(boatModelParts[bmp].partType)
							
							if(boatModelParts[bmp].partType === 'Deck') {
								for(var q = 0; q < buildColorData['colorData'].length; q++){
									if(buildColorData['colorData'][q].part.toLowerCase() === boatModelParts[bmp].id.toLowerCase()){
										for(var w = 0; w < colorConfiguration.length; w++) {
											if(colorConfiguration[w].name === "Deck")	{
												colorConfiguration[w].parts.push(buildColorData['colorData'][q]);
											}
										}
									}
								}
							}
							if(boatModelParts[bmp].partType === 'Hull') {
								for(var q = 0; q < buildColorData['colorData'].length; q++){
									if(buildColorData['colorData'][q].part.toLowerCase() === boatModelParts[bmp].id.toLowerCase()){
										for(var e = 0; e < colorConfiguration.length; e++) {
											if(colorConfiguration[e].name === "Hull")	{
												colorConfiguration[e].parts.push(buildColorData['colorData'][q]);
											}
										}
									}
								}
							}
							if(boatModelParts[bmp].partType === 'Interior') {
								for(var q = 0; q < buildColorData['colorData'].length; q++){
									if(buildColorData['colorData'][q].part.toLowerCase() === boatModelParts[bmp].id.toLowerCase()){
										for(var z = 0; z < colorConfiguration.length; z++) {
											if(colorConfiguration[z].name === "Interior")	{
												colorConfiguration[z].parts.push(buildColorData['colorData'][q]);
											}
										}
									}
								}
							}
							if(boatModelParts[bmp].partType === 'Trailer') {
								for(var q = 0; q < buildColorData['colorData'].length; q++){
									if(buildColorData['colorData'][q].part.toLowerCase() === boatModelParts[bmp].id.toLowerCase()){
										for(var x = 0; x < colorConfiguration.length; x++) {
											if(colorConfiguration[x].name === "Trailer")	{
												colorConfiguration[x].parts.push(buildColorData['colorData'][q]);
											}
										}
									}
								}
								
							}
						}

						// variable to hold the HTML table displaying current color configuration
						var colorConfigContent = '';
						
						// loop over colorConfiguration object building the an HTML table to display
						for (var cci = 0; cci < colorConfiguration['length']; cci++) {

							//console.log("cci: " + cci)

							//console.log("colorConfiguration[cci].parts['length'] > 0 " + colorConfiguration[cci].parts['length'])
							
							if(colorConfiguration[cci].parts['length'] > 0) {
								
								var catName = colorConfiguration[cci].name;
								
								colorConfigContent += '<div class="category">';
								colorConfigContent += '	<div class="grid-x">';
								colorConfigContent += '		<div class="cell large-12 xlarge-3">';
								colorConfigContent += '			<div class="title"> '+catName+'</div>';
								colorConfigContent += '		</div>';

								colorConfigContent += '		<div class="cell large-12 xlarge-9" style="border-left: solid 2px #ccc;">';
								colorConfigContent += '			<ul class="category-parts">';
								
								// loop over the parts/colors in this part category
								for (var pi = 0; pi < colorConfiguration[cci].parts['length']; pi++) {

									var partName = colorConfiguration[cci].parts[pi].part;
									var foo = (boatModelParts.find((o) => { return o["id"] === partName }));
									if(partName.toLowerCase() !== "logo" && partName.toLowerCase() !== "wheels" && typeof foo !== 'undefined') {
																				
										var colorName = colorConfiguration[cci].parts[pi].color,
										colorSwatchURL = colorConfiguration[cci].parts[pi].color;

										console.log("Looking for "+colorName)
									
										var q = colorList.find((o) => { return o["color"] === colorName });

										var partDisplayName = replaceAll(replaceAll(replaceAll(partName, '#', ''), '-', ' '), ' and ', ' &amp; ');
										
										var thisSwatch = '<div class="colorButtonDiv d-inline-block" style="width:36px;height:36px;" title="'+q.displayName+'" desc="'+q.displayName+'"><svg  version="1.1" class="colorButton" desc="'+q.displayName+'" id="'+q.color+'-configSwatch">';
										
										thisSwatch += '<circle cx="15" cy="15" r="13" fill="url(#'+q.color+')" /></svg></div>';
										
										colorConfigContent += '				<li class="goToCCPalette d-flex" style="cursor:pointer;" data-catName="'+catName+'" data-part="'+partName+'">';
										colorConfigContent += '					'+thisSwatch;
										colorConfigContent += '					<div class="colorConfigPartName flex-grow-1" style="text-transform: capitalize;">'+partDisplayName+'</div> <div class="colorConfigColorName text-right">&nbsp;&nbsp;('+q.displayName+')</div></li>';
										
									
									} else if(partName.toLowerCase() === "wheels") {

										var wheelName = colorConfiguration[cci].parts[pi].color;
										var wheelURL = localStorage.getItem('byoModelAssetsPath') + 'byo-assets/thumb-'+ wheelName +'.png';
										var wheelDisplayName = replaceAll(replaceAll(replaceAll(wheelName, '#', ''), '-', ' '), ' and ', ' &amp; ');
										

										var thisSwatch = '<div class="wheelButtonDiv d-inline-block" style="width:30px;height:30px;" title="'+wheelDisplayName+'" desc="'+wheelDisplayName+'"><img style="height: 30px;margin-right: 3px;margin-left: 3px;margin-top: 0;" class="wheelButtonDiv" desc="'+wheelDisplayName+'" id="'+wheelName+'-configSwatch" src="'+wheelURL+'" /></div>';

										colorConfigContent += '				<li class="goToCCPalette d-flex" style="cursor:pointer;" data-catName="'+catName+'" data-part="'+partName+'">';
										colorConfigContent += '					'+thisSwatch;
										colorConfigContent += '					<div class="colorConfigPartName flex-grow-1" style="padding-left: 12px;">Wheels</div> <div class="colorConfigColorName text-right">&nbsp;&nbsp;('+wheelDisplayName+')</div></li>';
									
										

									}

									
										
								}
								
								// close up some tags
								colorConfigContent += '			</ul>';
								colorConfigContent += '		</div>';
								colorConfigContent += '	</div>';
								colorConfigContent += '</div>';
							
							}
							

						}
						

						var displaySelectedColorOption = '',
							selectedColorOption = '',
							selectedColorPrice = 0,
							selectedColorCode = '',
							selectedComboSwatchHTML = '';

						// if using ranger-colorOptions 
						if($('.ranger-colorOption .ranger-colorOption-header.selected').length > 0){

							// grabbum
							selectedColorOption = $('.ranger-colorOption .ranger-colorOption-header.selected').attr('id');
							selectedColorPrice = $('#colorOption-customColor .colorOptionCost').attr("data-colorPrice");

							if(selectedColorOption === 'colorOption-customColor'){
								selectedColorCode = 'Custom Color Your Ranger';
							} else {
								selectedColorCode = $('.comboButton.selected').attr('data-displayname');
							}

							// concantentate to the collective, resistience is futile, you will be displayed whether you like the value or not. Mwhaha
							displaySelectedColorOption += '<div class="cell small-12 option-label"><div class="pr-1 sumColStripedSwatch" style="display: inline-table;vertical-align: middle;">Selected: ' + selectedComboSwatchHTML + '</div><div class="cell d-inline" style="vertical-align:top;">' + selectedColorCode + '</div></div>';
							
						}
						
						// insert the color configuration HTML
						$('.color-selections').html(colorConfigContent);

						$('.goToCCPalette').on('click', function(){

							var part = $(this).attr('data-part').toLowerCase();
							var catName = $(this).attr('data-catName').toLowerCase();
	
							console.log("part: " + part)
							console.log("catName: " + catName)
	
							if($('.custom-color-ui').css('display') !== 'block'){
								$('#btn-launch-custom-colors').click();
								updateColorConfigDisplay();
							}
	
							$('#'+catName+'-tab').click();
							$('#'+part+'-btn').click();
							$('.part-tabs').hide();
							$('#'+catName+'-parts-stack').show();
	
							// Scroll to the palette
							$('html, body').animate({
								scrollTop: $('#'+catName+'-tab').offset().top - 150
							}, 500, function() { 
	
								// Scroll complete.
								// Highlight the part button.
								$('#'+part+'-btn').effect( 'highlight', { color:'#808080' }, 250);
	
							});
	
						});

					} // END updateColorConfigDisplay






					// create all part tabs
					var setPartMenuTabs = function(){

						window.DeckGroup = "";
						window.HullGroup = "";
						window.TrailerGroup = "";
						window.InteriorGroup = "";
						window.GraphicGroup = "";			

						for (var i = 0; i < colorData.length; i++) {

							var displayName = colorData[i].part.replace(/-/g,' ').replace(/#/g,'').replaceAll(' and ',' &amp; ');
							var btnid = colorData[i].part.replace(/#/g,'') + '-btn';

							//loop through allowed customizable parts from [model]-def file
							for (var a = 0; a < boatModelParts.length; a++) { 

								//console.log(boatModelParts)
								//console.log(colorData)
								
								//console.log("boatModelParts[a].id     ===     colorData[i].part.replace(/#/g,'')     &&     boatModelParts[a].cc == 1")

								//console.log(boatModelParts[a].id + " === " + colorData[i].part.replace(/#/g,'') + " && " + boatModelParts[a].cc == 1)

								//console.log(boatModelParts[a].id     ===     colorData[i].part.replace(/#/g,'')     &&     boatModelParts[a].cc == 1)

								if (boatModelParts[a].id === colorData[i].part.replace(/#/g,'') && boatModelParts[a].cc == 1){

									//debugger;

									if (boatModelParts[a].partType == "Deck") {
										DeckGroup += '<div class="part-button" value="' + colorData[i].part + '" id="' + btnid + '">' + displayName + '</div>';									
										DeckGroupArray.push(colorData[i].part);

									} else if (boatModelParts[a].partType == "Hull") {
										HullGroup += '<div class="part-button" data-type="part" value="' + colorData[i].part + '" id="' + btnid + '">' + displayName + '</div>';
										HullGroupArray.push(colorData[i].part);

									} else if (boatModelParts[a].partType == "Trailer") {
										TrailerGroup += '<div class="part-button" data-type="part" value="' + colorData[i].part + '" id="' + btnid + '">' + displayName + '</div>';
										TrailerGroupArray.push(colorData[i].part);

									} else if (boatModelParts[a].partType == "Interior"){
										InteriorGroup += '<div class="part-button" data-type="part" value="' + colorData[i].part + '" id="' + btnid + '">' + displayName + '</div>';
										InteriorGroupArray.push(colorData[i].part);

									} else if (boatModelParts[a].partType == "Graphic"){
										GraphicGroup += '<div class="part-button" data-type="graphic" value="' + colorData[i].part + '" id="' + btnid + '">' + displayName + '</div>';
										GraphicGroupArray.push(colorData[i].part);

									}

								}

							}
						}

						

						// place part groups into DOM
						$('#deck-parts-stack').html(DeckGroup);
						if (DeckGroup == ""){
							$('#deck-tab').hide();
						}

						$('#hull-parts-stack').html(HullGroup);
						if (HullGroup == ""){
							$('#hull-tab').hide();
						}

						$('#interior-parts-stack').html(InteriorGroup);
						if (InteriorGroup == ""){
							$('#interior-tab').hide();
						}

						$('#trailer-parts-stack').html(TrailerGroup);
						if (TrailerGroup == ""){
							$('#trailer-tab').hide();
						}

						$('#graphic-parts-stack').html(GraphicGroup);
						//console.log(GraphicGroup)
						if (GraphicGroup == ""){
							$('#graphic-tab').hide();
						}

					}

					// create custom palette of COLOR swatches
					var buildCustomColorPalette = function(){

						var palettec = '<div class="ccHoverInfo mx-4 text-left" style="min-height:2em;">Selected: <span class="selectedColorInfo text-blue" style="font-weight:bold;"></span></div>';

						for (var i = 0; i < colorList.length; i++) {
							palettec += '<div class="colorButtonDiv" title="'+colorList[i].displayName+'" myid="'+colorList[i].color+'" data-toggle="tooltip" data-placement="top" title="'+colorList[i].displayName+'" desc="'+colorList[i].displayName+'"><svg  version="1.1" class="colorButton" desc="'+colorList[i].displayName+'" id="'+colorList[i].color+'-btn">';
							palettec += '<circle cx="25" cy="25" r="23" fill="url(#'+colorList[i].color+')" /></svg></div>';
							//palettec += '<circle cx="25" cy="25" r="23" fill="url(#'+colorList[i].color+')" /></svg><div class="paletteColorLabel">'+colorList[i].displayName+'</div></div>';
						};

						// insert the content
						$('.custom-color-palette').append(palettec);

					}

					// create logo palette
					var buildLogoPalette = function(){

						var paletteLogos = "";
						var thisLogoSRC = "";
						var thisLogoName = "";
						var thisLogoDisplayName = "";

						for (var l = 0; l < logoFiles.length; l++) {

							thisLogoName = logoFiles[l].name;
							thisLogoDisplayName = thisLogoName.replace(/_/g, "/");
							thisLogoSRC = rangerBYOAssetsPath + '/' + logoFiles[l].file;

							paletteLogos += '<div class="logoButtonDiv" id="'+ thisLogoName + '-btn" data-logoName="' + thisLogoName + '" data-imageURL="' + thisLogoSRC + '" title="' + thisLogoDisplayName + '"><img src="' + thisLogoSRC + '" /><div class="logoName">' + thisLogoDisplayName + '</div></div>';
						};
						
						$('.custom-color-palette').append('<div style="display:block;">' + paletteLogos + '</div>');
						
					}

					// create wheel palette
					var buildWheelPalette = function(){

						var paletteWheels = "";
						var thisWheelSRC = "";
						var thisWheelName = "";
						var thisWheelDisplayName = "";

						for (var l = 0; l < wheelFiles.length; l++) {

							thisWheelName = wheelFiles[l].name;
							thisWheelDisplayName = replaceAll(replaceAll(replaceAll(thisWheelName, '#', ''), '-', ' '), ' and ', ' &amp; ');
							thisWheelThumb = rangerBYOAssetsPath + '/thumb-' + wheelFiles[l].name + '.png';

							paletteWheels += '<div class="wheelButtonDiv" desc="'+thisWheelDisplayName+'" myid="' + thisWheelName + '_Wheels" id="'+ thisWheelName + '-btn" data-wheelName="' + thisWheelName + '" data-thumbURL="' + thisWheelThumb + '" title="' + thisWheelDisplayName + '"><img src="' + thisWheelThumb + '" /><div class="wheelName text-center">' + thisWheelDisplayName + '</div></div>';
						};
						
						// add the wheel options to the palette
						$('.custom-color-palette').append('<div class="wheelButtonPalette">' + paletteWheels + '</div>');
						
						
					}

					
					
					// use a combo object to color the boat image
					var combomatic = function(mytitle, combobtn) {

						var mycolor = "";

						if(typeof comboList[mytitle] !== 'undefined') { 

							$(".comboButton").attr("class", "comboButton");

							// move the combo part/color data into the colorData variable
							colorData = comboList[mytitle]['colors'];
							
							// highlight the combo swatch
							$(combobtn).attr("class", "comboButton selected");

							// paint All The Parts!
							for (var i = 0; i < comboList[mytitle]['colors'].length; i++) {

								var mypart = comboList[mytitle]['colors'][i].part.toLowerCase()
								mycolor = comboList[mytitle]['colors'][i].color;

								if(mypart === '#wheels'){

									// change the wheel overlay images
									wheelomatic(mycolor,'cc-');
									wheelomatic(mycolor,'owl-');

								} else {

									paintomatic(mycolor, mypart, 'owl-bmt-');
									paintomatic(mycolor, mypart, 'owl-side-');
									paintomatic(mycolor, mypart, 'owl-oh-');

									paintomatic(mycolor, mypart, 'cc-bmt-');
									paintomatic(mycolor, mypart, 'cc-side-');
									paintomatic(mycolor, mypart, 'cc-oh-');
								}

							}
						}
					};

					
					//paint the part function
					window.paintomatic = function(color, boatpart, instance) {

						//console.log('color: ' + color + ' ... boatpart: ' + boatpart + ' ... instance: ' + instance)

						instance = (typeof instance !== 'undefined') ?  instance : '';

						if(SEGMENTNAME === 'Bay Ranger'){
							if(boatpart === '#lower-console' || boatpart === '#upper-console'){
								boatpart = "#console";
							}
							if(boatpart === '#deck'){
								boatpart = '#deck-top';
							}
						}
						
						if((typeof color !== "undefined") && (typeof boatpart !== "undefined")){

							if((color !== null) && (boatpart !== null)){ 

								if(boatpart.indexOf('#') !== -1){
									boatpart = boatpart.replace(/#/g, "");
								}

								if(color.indexOf('#') !== -1){
									color = color.replace(/#/g, "");
								}


								var partArrayID = getPartArrayID(boatpart);	

								//console.log("partArrayID: " + partArrayID)

								if (partArrayID != undefined && color != ''){
									
									var colorPattern = $('#' + color + ' image').attr("xlink:href");
										
									var targetPartPattern = '#' + instance + '' + boatpart + '-pattern image';

									//console.log("targetPartPattern: " + targetPartPattern)
									//console.log("colorPattern: " + colorPattern)

									$(targetPartPattern).attr("xlink:href", colorPattern);

									var targetPatternId = '';
									if(color.indexOf('#') === -1) {
										targetPatternId = '#';	
									}

									targetPatternId += color + ' image';
									var colorPattern = $(targetPatternId).attr("xlink:href");

									//console.log("$('.' + " + boatpart + " + '-image').attr(\"xlink:href\", " + colorPattern + ");")

									/* RULE: on the Z185 there is no waterline. because we are using the svg asset for the 521L,
									which does have a waterline, we need to color waterline the same color as hull-bottom. */
									if((BOATNAME === 'Z185') && (boatpart === 'hull-bottom')){
										$('.hull-waterline-image').attr("xlink:href", colorPattern);
									}

									$('.' + boatpart + '-image').attr("xlink:href", colorPattern);


								}


								
							}
						}	
					};

					
					window.wheelomatic = function(wheelName, instance) {
						
						instance = (typeof instance !== 'undefined') ?  instance : '';
						if((typeof wheelName !== "undefined")){
							if((wheelName !== null)){ 
								if(wheelName.indexOf('#') !== -1){ wheelName = wheelName.replace(/#/g, ""); }
								$('#'+instance+'bmt-wheels').attr("xlink:href", localStorage.getItem('byoModelAssetsPath') + 'byo-assets/bmt-wheels-'+ wheelName +'.png');
								$('#'+instance+'side-wheels').attr("xlink:href", localStorage.getItem('byoModelAssetsPath') + 'byo-assets/side-wheels-'+ wheelName +'.png');
							}
						}	
					}

					// grabs the current color configuration and returns buildColorData object
					var setBuildColorData = function(c,p){
						
						if(typeof c === 'undefined') var c = '';
						if(typeof p === 'undefined') var p = '';
						
						// build the build color object
						var bcd = {};
						bcd.combo = { name: '', variation: '' }
						bcd.selectedColorOption = $('.ranger-colorOption-header.selected').attr('id');
						bcd.additionalCost = $('.ranger-colorOption-header.selected .colorOptionCost').attr('data-optionprice');
						bcd.colorData = {};

						//console.log(bcd.selectedColorOption !== 'colorOption-customColor')

						if(bcd.selectedColorOption !== 'colorOption-customColor') {

							// handling when there is no combo selected
							if(typeof $('.comboButton.selected').attr('id') == 'undefined'){
								// let's trigger a click on the first combo on the page.
								if($('.comboButton').length > 0){
									$('.comboButton').first().trigger(clickEventType);
								}
							}
							bcd.combo.name = $('.comboButton.selected').attr('id').replace('-btn','');
							bcd.colorData = comboList[bcd.combo.name].colors;

						} else {

							//console.log(localStorage.getItem("byoRanger-buildColorData"))
							var prevBCD = localStorage.getItem("byoRanger-buildColorData");
							prevBCD.replace('#','');
							prevBCD = JSON.parse(prevBCD);

							if(typeof prevBCD !== 'undefined' && c !== '' && p !== ''){
								if(prevBCD !== null && prevBCD !== '' && typeof prevBCD === 'object'){
									bcd.combo.name = 'Custom Color Your Ranger';
									// update the color part clicked on
									for (var i = 0; i < prevBCD.colorData.length; i++) { 
										if(p.replace("#","").toLowerCase() === prevBCD.colorData[i].part.replace("#","").toLowerCase()) {
											prevBCD.colorData[i].color = c;
										}
									}
									bcd.colorData = prevBCD.colorData;
								}
							}
							
						}
						

						localStorage.setItem("byoRanger-buildColorData", JSON.stringify(bcd));
						localStorage.setItem("byoSelectedColorOptions", JSON.stringify(bcd));

					} // end setBuildColorData();


					// grabs the current color configuration and returns buildColorData object
					var updateColorBoard = function(){

						var currentColorBoardContent = '';

						var ccbHullSides = '';
						var ccbDeck = '';
						var ccbHullBottom = '';
						var ccbHullPinstripes = '';
						var ccbComanche2 = '';
						var ccbComanche3 = '';
						var ccbComanche1 = '';
						var ccbDeckPinstripes = '';

						// pull out the current color configuration from local storage
						var buildColorData = localStorage.getItem("byoRanger-buildColorData");
						// remove # symbols from the data
						buildColorData = replaceAll(buildColorData, "#", "");
						// parse it
						buildColorData = JSON.parse(buildColorData);
						

						if(typeof buildColorData.colorData === 'object'){
							for(var q = 0; q < buildColorData['colorData'].length; q++){

								var p = buildColorData['colorData'][q].part.toLowerCase();
								var c = buildColorData['colorData'][q].color;

								//console.log(buildColorData['colorData'][q].part.toLowerCase() + " >>> " + buildColorData['colorData'][q].color);

								var partIsOnThisModel = boatModelParts.find((o) => { return o["id"] === p });

								if(partIsOnThisModel){
									if(p === 'hull-sides-and-outside-deck' || p === 'hull-sides' || p === 'hull-main') ccbHullSides = c;
									if(p === 'top-deck' || p === 'deck-top' || p === 'inside-deck' || p === 'deck' || p === 'deck-main') ccbDeck = c;
									if(p === 'hull-bottom') ccbHullBottom = c;
									if(p === 'hull-pinstripes') ccbHullPinstripes = c;
									if(p === 'deck-pinstripes') ccbDeckPinstripes = c;
									if(p === 'hull-and-deck-pinstripes') { ccbDeckPinstripes = c; ccbHullPinstripes = c; }
									if(p === 'comanche-stripes-1-and-3') { ccbComanche1 = c; ccbComanche3 = c; }
									if(p === 'comanche-stripe-2') ccbComanche2 = c;
								}
								
							}
						}



						currentColorBoardContent += '<div class="currentColorBoardDiv">';
						currentColorBoardContent += '<svg class="currentColorBoardSVG" title="Your Current Color Board" viewBox="0 0 747.36 500.61" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">';

						currentColorBoardContent += '	<path class="hull-sides" fill="url(#'+ccbHullSides+')" d="M727.53,82.1H19.83a87.75,87.75,0,0,0-2.44,20.57V397.94a87.09,87.09,0,0,0,12.15,44.48H717.82A87.09,87.09,0,0,0,730,397.94V102.67A87.75,87.75,0,0,0,727.53,82.1Z"/>';
						currentColorBoardContent += '	<path class="deck" fill="url(#'+ccbDeck+')" d="M642.49,15.2H104.87A87.49,87.49,0,0,0,23.82,69.73H723.54A87.49,87.49,0,0,0,642.49,15.2Z"/>';
						currentColorBoardContent += '	<path class="hull-bottom" fill="url(#'+ccbHullBottom+')" d="M104.87,485.41H642.49a87.43,87.43,0,0,0,75.33-43H29.54A87.43,87.43,0,0,0,104.87,485.41Z"/>';
						currentColorBoardContent += '	<path class="hull-pinstripes" fill="url(#'+ccbHullPinstripes+')" d="M349.69,193.75c-78.76,0-169.8,47.42-189.94,58.29-9.63,4.45-88.23,51.16-88.23,51.16a3.11,3.11,0,0,0,0,4.58l23.69,13.64,50.27,27s57.57,32.32,84.53,31.84,58.78-25.16,58.78-25.16a47.24,47.24,0,0,1,8.46,2.17c24.74,12.42,61.53,24.42,79.46,26s34.73-7.62,34.73-7.62l25.05-15.86s7.3,2.7,18.24,7.78,23,11.89,46.79,12.05S529,374.4,550,364.87s50.65-26.49,94.37-27.28c26.9-1.32,85.56,0,85.56,0V193.75H349.69Z"/>';
						currentColorBoardContent += '	<path class="comanche-stripe-2" fill="url(#'+ccbComanche2+')" d="M467.42,273.36a146.35,146.35,0,0,0-26.33,1.75c-12.53,2.22-25.21,2.22-56.93,20.14s-86.43,53.16-86.43,53.16l15.7,5.83,12.21,5.55c31.88,13.27,49.8,15.55,59.31,14.91s21.73-7.13,21.73-7.13l38.69-22.21s61.64-40,111.33-46.31c26-2.74,58.21-2.37,58.21-2.37H730V271H536.88Z"/>';
						currentColorBoardContent += '	<path class="comanche-stripe-3" fill="url(#'+ccbComanche3+')" d="M577,306.19c-54.56.05-129.73,47.89-129.73,47.89l24.42,11.11s7,4.91,27,5.71a71.82,71.82,0,0,0,34.57-7.3s49.69-30.08,95.47-33.46c24.43-1.75,37.75-1.27,37.75-1.27H730V306.35H606.82Z"/>';
						currentColorBoardContent += '	<path class="comanche-stripe-1" fill="url(#'+ccbComanche1+')" d="M352.65,203.48c-64.65,0-144.53,34.84-196.07,61.48-4.79,2.39-70.41,40.6-70.41,40.6l55.5,30.29s61.48,32.35,82.15,34.89c7.3.16,16.13.42,27.93-4.32,14.42-6.68,72.78-46.11,72.78-46.11l53-31.25s22.84-13,42.18-17.76S462,265,475.35,264.48s56.3-1.9,56.3-1.9l52.17.16H730V203.9H382.26S360,203.48,352.65,203.48Z" />';
						currentColorBoardContent += '	<path class="deck-pinstripe" fill="url(#'+ccbDeckPinstripes+')" d="M727.26,82V81a84.9,84.9,0,0,0-3.72-11.3H23.82a87.82,87.82,0,0,0-4,12.3Z"/>';

						currentColorBoardContent += '	<rect class="body-line" fill="#000" x="17.39" y="225.7" width="712.57" height="10.65"/>';
						currentColorBoardContent += '	<rect class="button-border" style="stroke-width: 5px;stroke: #101010;" fill="transparent" x="11.45" y="10.22" width="724.47" height="480.16" rx="87.88"/>';

						currentColorBoardContent += '</svg>';
						currentColorBoardContent += '</div>';


						$('.currentColorBoard').html(currentColorBoardContent);

					} // end updateColorBoard();







					//create COMBO swatches
					//sliceXpart variables are defined in assets/[year]/[brand]/[boatname]/defs.cfm files
					//allowedCombos is defined in assets/[year]/[brand]/[boatname]/defs.cfm files

					var paletteSTD = "";
					var paletteLE = "";
					var paletteFE = "";
					var paletteRWF = "";
					var paletteRMF = "";
					var paletteRM = "";
					var paletteRW = "";

					var buildComboSwatches = function(){

						//console.log(comboList)

						// do this for every defined combo
						$.each(comboList, function(i, v) {

							//console.log(i)

							var thisComboName = i;

							var sliceIndex1 = '';
							var sliceIndex2 = '';
							var sliceIndex3 = '';
							var sliceIndex4 = ''; 

							var cbDeck = '';
							var cbHullSides = '';
							var cbHullBottom = '';
							var cbComanche1 = '';
							var cbComanche2 = '';
							var cbComanche3 = '';
							var cbHullPinstripes = '';
							var cbDeckPinstripe = '';
							
							//loop through allowed standard color packages from [model]-def file
							for (var a = 0; a < allowedPackages.length; a++) {

								var allowedComboName = allowedPackages[a].name;
								
								//console.log(thisComboName+' == '+allowedComboName)

								if (thisComboName == allowedComboName){

									cbDeck = '';
									cbHullSides = '';
									cbHullBottom = '';
									cbComanche1 = '';
									cbComanche2 = '';
									cbComanche3 = '';
									cbHullPinstripes = '';
									cbDeckPinstripe = '';

									for( var ci = 0, len = comboList[i]['colors'].length; ci < len; ci++ ){

										//console.log('ci: '+ci)
										//console.log(comboList[i]['colors'])
										//console.log("comboList[i]['colors'][ci].swatchSlice: "+comboList[i]['colors'][ci].swatchSlice)

										if ( comboList[i]['colors'][ci].part === '#top-deck' || comboList[i]['colors'][ci].part === '#deck-top' || comboList[i]['colors'][ci].part === '#deck') {
											cbDeck = comboList[i]['colors'][ci].color;
										} else if(comboList[i]['colors'][ci].part === '#inside-deck'){
											cbDeck = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#hull-sides-and-outside-deck' ||  comboList[i]['colors'][ci].part === '#hull-sides') {
											cbHullSides = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#hull-bottom' ) {
											cbHullBottom = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#comanche-stripe-2' ) {
											cbComanche2 = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#comanche-stripes-1-and-3' ) {
											cbComanche1 = comboList[i]['colors'][ci].color;
											cbComanche3 = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#hull-pinstripes' ) {
											cbHullPinstripes = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#deck-pinstripes' ) {
											cbDeckPinstripes = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#hull-and-deck-pinstripes' ) {
											cbHullPinstripes = comboList[i]['colors'][ci].color;
											cbDeckPinstripe = comboList[i]['colors'][ci].color;
										}

									} 

									paletteSTD += '<div class="comboButtonDiv">';
									paletteSTD += '<svg class="comboButton" data-colorOptionID="standard" title="'+comboList[i].name+'" viewBox="0 0 747.36 500.61" data-displayname="Standard Color Package:<strong> '+comboList[i].name+'</strong>" desc="'+comboList[i].name+'" id="'+i+'-btn"  cost="'+allowedPackages[0].cost+'" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">';
									paletteSTD += '	<path class="hull-sides" fill="url(#'+cbHullSides+')" d="M727.53,82.1H19.83a87.75,87.75,0,0,0-2.44,20.57V397.94a87.09,87.09,0,0,0,12.15,44.48H717.82A87.09,87.09,0,0,0,730,397.94V102.67A87.75,87.75,0,0,0,727.53,82.1Z"/>';
									paletteSTD += '	<path class="deck" fill="url(#'+cbDeck+')" d="M642.49,15.2H104.87A87.49,87.49,0,0,0,23.82,69.73H723.54A87.49,87.49,0,0,0,642.49,15.2Z"/>';
									paletteSTD += '	<path class="hull-bottom" fill="url(#'+cbHullBottom+')" d="M104.87,485.41H642.49a87.43,87.43,0,0,0,75.33-43H29.54A87.43,87.43,0,0,0,104.87,485.41Z"/>';
									paletteSTD += '	<path class="hull-pinstripes" fill="url(#'+cbHullPinstripes+')" d="M349.69,193.75c-78.76,0-169.8,47.42-189.94,58.29-9.63,4.45-88.23,51.16-88.23,51.16a3.11,3.11,0,0,0,0,4.58l23.69,13.64,50.27,27s57.57,32.32,84.53,31.84,58.78-25.16,58.78-25.16a47.24,47.24,0,0,1,8.46,2.17c24.74,12.42,61.53,24.42,79.46,26s34.73-7.62,34.73-7.62l25.05-15.86s7.3,2.7,18.24,7.78,23,11.89,46.79,12.05S529,374.4,550,364.87s50.65-26.49,94.37-27.28c26.9-1.32,85.56,0,85.56,0V193.75H349.69Z"/>';
									paletteSTD += '	<path class="comanche-stripe-2" fill="url(#'+cbComanche2+')" d="M467.42,273.36a146.35,146.35,0,0,0-26.33,1.75c-12.53,2.22-25.21,2.22-56.93,20.14s-86.43,53.16-86.43,53.16l15.7,5.83,12.21,5.55c31.88,13.27,49.8,15.55,59.31,14.91s21.73-7.13,21.73-7.13l38.69-22.21s61.64-40,111.33-46.31c26-2.74,58.21-2.37,58.21-2.37H730V271H536.88Z"/>';
									paletteSTD += '	<path class="comanche-stripe-3" fill="url(#'+cbComanche3+')" d="M577,306.19c-54.56.05-129.73,47.89-129.73,47.89l24.42,11.11s7,4.91,27,5.71a71.82,71.82,0,0,0,34.57-7.3s49.69-30.08,95.47-33.46c24.43-1.75,37.75-1.27,37.75-1.27H730V306.35H606.82Z"/>';
									paletteSTD += '	<path class="comanche-stripe-1" fill="url(#'+cbComanche1+')" d="M352.65,203.48c-64.65,0-144.53,34.84-196.07,61.48-4.79,2.39-70.41,40.6-70.41,40.6l55.5,30.29s61.48,32.35,82.15,34.89c7.3.16,16.13.42,27.93-4.32,14.42-6.68,72.78-46.11,72.78-46.11l53-31.25s22.84-13,42.18-17.76S462,265,475.35,264.48s56.3-1.9,56.3-1.9l52.17.16H730V203.9H382.26S360,203.48,352.65,203.48Z" />';
									paletteSTD += '	<path class="deck-pinstripe" fill="url(#'+cbDeckPinstripe+')" d="M727.26,82V81a84.9,84.9,0,0,0-3.72-11.3H23.82a87.82,87.82,0,0,0-4,12.3Z"/>';
									paletteSTD += '	<rect class="body-line" fill="#000" x="17.39" y="225.7" width="712.57" height="10.65"/>';
									paletteSTD += '	<rect class="button-border" fill="transparent" x="11.45" y="10.22" width="724.47" height="480.16" rx="87.88"/>';
									paletteSTD += '</svg><div class="comboName">'+comboList[i].name+'</div></div>';



									//three color combo swatch
									/*
									paletteSTD += '<div class="comboButtonDiv" data-colorOptionID="standard" title="'+comboList[i].name+'"><svg class="comboButton" viewBox="-3 -3 76 76" data-displayname="Standard Color Package:<strong> '+comboList[i].name+'</strong>" desc="'+comboList[i].name+'" id="'+i+'-btn"  cost="'+allowedPackages[0].cost+'" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" transform="translate(3, 3)">';
									paletteSTD += '<path id="slice-1" d="M68.007255,23.3299999 C63.2015559,9.73783019 50.237974,0 35,0 C19.762026,0 6.79844412,9.73783019 1.99274497,23.3299999 L68.007255,23.3299999 L68.007255,23.3299999 Z" sketch:type="MSShapeGroup" fill="url(#'+sliceIndex1+')"></path>';
									paletteSTD += '<path id="slice-2" d="M68.0107884,46.6600018 C69.299055,43.0127979 70,39.0882562 70,35 C70,30.9080085 69.2977735,26.9800307 68.0072557,23.3300018 L1.9927443,23.3300018 C0.702226468,26.9800307 0,30.9080085 0,35 C0,39.0882562 0.700945007,43.0127979 1.98921164,46.6600018 L68.0107884,46.6600018 L68.0107884,46.6600018 Z" sketch:type="MSShapeGroup" fill="url(#'+sliceIndex2+')"></path>';
									paletteSTD += '<path id="slice-3" d="M35.8448286,69.9900036 C50.7193907,69.6376485 63.2969006,60.0054583 68.0107877,46.6600037 L1.98921232,46.6600037 C6.70309941,60.0054583 19.2806093,69.6376485 34.1551714,69.9900036 L35.8448286,69.9900036 L35.8448286,69.9900036 Z" sketch:type="MSShapeGroup" fill="url(#'+sliceIndex3+')"></path>';
									paletteSTD +='<circle cx="35" cy="35" r="35" fill="none" /></svg><div class="comboName">'+comboList[i].name+'</div></div>';
									*/

								};
							};

							//loop through allowed limited edition color packages from [model]-def file
							for (var a = 0; a < allowedLimitedEditionPackages.length; a++) {
								
								//console.log('i: '+i)

								var allowedComboName = allowedLimitedEditionPackages[a].name;
								
								//console.log(thisComboName+' == '+allowedComboName)

								if (thisComboName == allowedComboName){

									cbDeck = '';
									cbHullSides = '';
									cbHullBottom = '';
									cbComanche1 = '';
									cbComanche2 = '';
									cbComanche3 = '';
									cbHullPinstripes = '';
									cbDeckPinstripe = '';for( var ci = 0, len = comboList[i]['colors'].length; ci < len; ci++ ){

										//console.log('ci: '+ci)
										//console.log(comboList[i]['colors'])
										//console.log("comboList[i]['colors'][ci].swatchSlice: "+comboList[i]['colors'][ci].swatchSlice)

										if ( comboList[i]['colors'][ci].part === '#top-deck' || comboList[i]['colors'][ci].part === '#deck-top' || comboList[i]['colors'][ci].part === '#deck') {
											cbDeck = comboList[i]['colors'][ci].color;
										} else if(comboList[i]['colors'][ci].part === '#inside-deck'){
											cbDeck = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#hull-sides-and-outside-deck' ||  comboList[i]['colors'][ci].part === '#hull-sides') {
											cbHullSides = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#hull-bottom' ) {
											cbHullBottom = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#comanche-stripe-2' ) {
											cbComanche2 = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#comanche-stripes-1-and-3' ) {
											cbComanche1 = comboList[i]['colors'][ci].color;
											cbComanche3 = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#hull-pinstripes' ) {
											cbHullPinstripes = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#deck-pinstripes' ) {
											cbDeckPinstripes = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#hull-and-deck-pinstripes' ) {
											cbHullPinstripes = comboList[i]['colors'][ci].color;
											cbDeckPinstripe = comboList[i]['colors'][ci].color;
										}

									} 

									paletteLE += '<div class="comboButtonDiv">';
									paletteLE += '<svg class="comboButton" data-colorOptionID="standard" title="'+comboList[i].name+'" viewBox="0 0 747.36 500.61" data-displayname="Limited Edition Package:<strong> '+comboList[i].name+'</strong>" desc="'+comboList[i].name+'" id="'+i+'-btn"  cost="'+allowedLimitedEditionPackages[0].cost+'" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">';
									paletteLE += '	<path class="hull-sides" fill="url(#'+cbHullSides+')" d="M727.53,82.1H19.83a87.75,87.75,0,0,0-2.44,20.57V397.94a87.09,87.09,0,0,0,12.15,44.48H717.82A87.09,87.09,0,0,0,730,397.94V102.67A87.75,87.75,0,0,0,727.53,82.1Z"/>';
									paletteLE += '	<path class="deck" fill="url(#'+cbDeck+')" d="M642.49,15.2H104.87A87.49,87.49,0,0,0,23.82,69.73H723.54A87.49,87.49,0,0,0,642.49,15.2Z"/>';
									paletteLE += '	<path class="hull-bottom" fill="url(#'+cbHullBottom+')" d="M104.87,485.41H642.49a87.43,87.43,0,0,0,75.33-43H29.54A87.43,87.43,0,0,0,104.87,485.41Z"/>';
									paletteLE += '	<path class="hull-pinstripes" fill="url(#'+cbHullPinstripes+')" d="M349.69,193.75c-78.76,0-169.8,47.42-189.94,58.29-9.63,4.45-88.23,51.16-88.23,51.16a3.11,3.11,0,0,0,0,4.58l23.69,13.64,50.27,27s57.57,32.32,84.53,31.84,58.78-25.16,58.78-25.16a47.24,47.24,0,0,1,8.46,2.17c24.74,12.42,61.53,24.42,79.46,26s34.73-7.62,34.73-7.62l25.05-15.86s7.3,2.7,18.24,7.78,23,11.89,46.79,12.05S529,374.4,550,364.87s50.65-26.49,94.37-27.28c26.9-1.32,85.56,0,85.56,0V193.75H349.69Z"/>';
									paletteLE += '	<path class="comanche-stripe-2" fill="url(#'+cbComanche2+')" d="M467.42,273.36a146.35,146.35,0,0,0-26.33,1.75c-12.53,2.22-25.21,2.22-56.93,20.14s-86.43,53.16-86.43,53.16l15.7,5.83,12.21,5.55c31.88,13.27,49.8,15.55,59.31,14.91s21.73-7.13,21.73-7.13l38.69-22.21s61.64-40,111.33-46.31c26-2.74,58.21-2.37,58.21-2.37H730V271H536.88Z"/>';
									paletteLE += '	<path class="comanche-stripe-3" fill="url(#'+cbComanche3+')" d="M577,306.19c-54.56.05-129.73,47.89-129.73,47.89l24.42,11.11s7,4.91,27,5.71a71.82,71.82,0,0,0,34.57-7.3s49.69-30.08,95.47-33.46c24.43-1.75,37.75-1.27,37.75-1.27H730V306.35H606.82Z"/>';
									paletteLE += '	<path class="comanche-stripe-1" fill="url(#'+cbComanche1+')" d="M352.65,203.48c-64.65,0-144.53,34.84-196.07,61.48-4.79,2.39-70.41,40.6-70.41,40.6l55.5,30.29s61.48,32.35,82.15,34.89c7.3.16,16.13.42,27.93-4.32,14.42-6.68,72.78-46.11,72.78-46.11l53-31.25s22.84-13,42.18-17.76S462,265,475.35,264.48s56.3-1.9,56.3-1.9l52.17.16H730V203.9H382.26S360,203.48,352.65,203.48Z" />';
									paletteLE += '	<path class="deck-pinstripe" fill="url(#'+cbDeckPinstripe+')" d="M727.26,82V81a84.9,84.9,0,0,0-3.72-11.3H23.82a87.82,87.82,0,0,0-4,12.3Z"/>';
									paletteLE += '	<rect class="body-line" fill="#000" x="17.39" y="225.7" width="712.57" height="10.65"/>';
									paletteLE += '	<rect class="button-border" fill="transparent" x="11.45" y="10.22" width="724.47" height="480.16" rx="87.88"/>';
									paletteLE += '</svg><div class="comboName">'+comboList[i].name+'</div></div>';

								};
							};




							//loop through allowed Premium combos from [model]-def file
							for (var a = 0; a < allowedElectraFusionPackages.length; a++) {
								
								//console.log('i: '+i)

								var allowedComboName = allowedElectraFusionPackages[a].name;
								
								//console.log(thisComboName+' == '+allowedComboName)

								if (thisComboName == allowedComboName){
									
									cbDeck = '';
									cbHullSides = '';
									cbHullBottom = '';
									cbComanche1 = '';
									cbComanche2 = '';
									cbComanche3 = '';
									cbHullPinstripes = '';
									cbDeckPinstripe = '';

									for( var ci = 0, len = comboList[i]['colors'].length; ci < len; ci++ ){

										//console.log('ci: '+ci)
										//console.log(comboList[i]['colors'])
										//console.log("comboList[i]['colors'][ci].swatchSlice: "+comboList[i]['colors'][ci].swatchSlice)

										if ( comboList[i]['colors'][ci].part === '#top-deck' || comboList[i]['colors'][ci].part === '#deck-top' || comboList[i]['colors'][ci].part === '#deck') {
											cbDeck = comboList[i]['colors'][ci].color;
										} else if(comboList[i]['colors'][ci].part === '#inside-deck'){
											cbDeck = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#hull-sides-and-outside-deck' ||  comboList[i]['colors'][ci].part === '#hull-sides') {
											cbHullSides = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#hull-bottom' ) {
											cbHullBottom = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#comanche-stripe-2' ) {
											cbComanche2 = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#comanche-stripes-1-and-3' ) {
											cbComanche1 = comboList[i]['colors'][ci].color;
											cbComanche3 = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#hull-pinstripes' ) {
											cbHullPinstripes = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#deck-pinstripes' ) {
											cbDeckPinstripes = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#hull-and-deck-pinstripes' ) {
											cbHullPinstripes = comboList[i]['colors'][ci].color;
											cbDeckPinstripe = comboList[i]['colors'][ci].color;
										}

									} 

									paletteFE += '<div class="comboButtonDiv">';
									paletteFE += '<svg class="comboButton" data-colorOptionID="standard" title="'+comboList[i].name+'" viewBox="0 0 747.36 500.61" data-displayname="Electra Fusion Package:<strong> '+comboList[i].name+'</strong>" desc="'+comboList[i].name+'" id="'+i+'-btn"  cost="'+allowedElectraFusionPackages[0].cost+'" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">';
									paletteFE += '	<path class="hull-sides" fill="url(#'+cbHullSides+')" d="M727.53,82.1H19.83a87.75,87.75,0,0,0-2.44,20.57V397.94a87.09,87.09,0,0,0,12.15,44.48H717.82A87.09,87.09,0,0,0,730,397.94V102.67A87.75,87.75,0,0,0,727.53,82.1Z"/>';
									paletteFE += '	<path class="deck" fill="url(#'+cbDeck+')" d="M642.49,15.2H104.87A87.49,87.49,0,0,0,23.82,69.73H723.54A87.49,87.49,0,0,0,642.49,15.2Z"/>';
									paletteFE += '	<path class="hull-bottom" fill="url(#'+cbHullBottom+')" d="M104.87,485.41H642.49a87.43,87.43,0,0,0,75.33-43H29.54A87.43,87.43,0,0,0,104.87,485.41Z"/>';
									paletteFE += '	<path class="hull-pinstripes" fill="url(#'+cbHullPinstripes+')" d="M349.69,193.75c-78.76,0-169.8,47.42-189.94,58.29-9.63,4.45-88.23,51.16-88.23,51.16a3.11,3.11,0,0,0,0,4.58l23.69,13.64,50.27,27s57.57,32.32,84.53,31.84,58.78-25.16,58.78-25.16a47.24,47.24,0,0,1,8.46,2.17c24.74,12.42,61.53,24.42,79.46,26s34.73-7.62,34.73-7.62l25.05-15.86s7.3,2.7,18.24,7.78,23,11.89,46.79,12.05S529,374.4,550,364.87s50.65-26.49,94.37-27.28c26.9-1.32,85.56,0,85.56,0V193.75H349.69Z"/>';
									paletteFE += '	<path class="comanche-stripe-2" fill="url(#'+cbComanche2+')" d="M467.42,273.36a146.35,146.35,0,0,0-26.33,1.75c-12.53,2.22-25.21,2.22-56.93,20.14s-86.43,53.16-86.43,53.16l15.7,5.83,12.21,5.55c31.88,13.27,49.8,15.55,59.31,14.91s21.73-7.13,21.73-7.13l38.69-22.21s61.64-40,111.33-46.31c26-2.74,58.21-2.37,58.21-2.37H730V271H536.88Z"/>';
									paletteFE += '	<path class="comanche-stripe-3" fill="url(#'+cbComanche3+')" d="M577,306.19c-54.56.05-129.73,47.89-129.73,47.89l24.42,11.11s7,4.91,27,5.71a71.82,71.82,0,0,0,34.57-7.3s49.69-30.08,95.47-33.46c24.43-1.75,37.75-1.27,37.75-1.27H730V306.35H606.82Z"/>';
									paletteFE += '	<path class="comanche-stripe-1" fill="url(#'+cbComanche1+')" d="M352.65,203.48c-64.65,0-144.53,34.84-196.07,61.48-4.79,2.39-70.41,40.6-70.41,40.6l55.5,30.29s61.48,32.35,82.15,34.89c7.3.16,16.13.42,27.93-4.32,14.42-6.68,72.78-46.11,72.78-46.11l53-31.25s22.84-13,42.18-17.76S462,265,475.35,264.48s56.3-1.9,56.3-1.9l52.17.16H730V203.9H382.26S360,203.48,352.65,203.48Z" />';
									paletteFE += '	<path class="deck-pinstripe" fill="url(#'+cbDeckPinstripe+')" d="M727.26,82V81a84.9,84.9,0,0,0-3.72-11.3H23.82a87.82,87.82,0,0,0-4,12.3Z"/>';
									paletteFE += '	<rect class="body-line" fill="#000" x="17.39" y="225.7" width="712.57" height="10.65"/>';
									paletteFE += '	<rect class="button-border" fill="transparent" x="11.45" y="10.22" width="724.47" height="480.16" rx="87.88"/>';
									paletteFE += '</svg><div class="comboName">'+comboList[i].name+'</div></div>';

								};
							};


							//loop through allowed Premium combos from [model]-def file
							for (var a = 0; a < allowedReataWhitePackages.length; a++) {
								
								//console.log('i: '+i)

								var allowedComboName = allowedReataWhitePackages[a].name;
								
								//console.log(thisComboName+' == '+allowedComboName)

								if (thisComboName == allowedComboName){
									
									cbDeck = '';
									cbHullSides = '';
									cbHullBottom = '';
									cbComanche1 = '';
									cbComanche2 = '';
									cbComanche3 = '';
									cbHullPinstripes = '';
									cbDeckPinstripe = '';

									for( var ci = 0, len = comboList[i]['colors'].length; ci < len; ci++ ){

										//console.log('ci: '+ci)
										//console.log(comboList[i]['colors'])
										//console.log("comboList[i]['colors'][ci].swatchSlice: "+comboList[i]['colors'][ci].swatchSlice)

										if ( comboList[i]['colors'][ci].part === '#top-deck' || comboList[i]['colors'][ci].part === '#deck-top' || comboList[i]['colors'][ci].part === '#deck') {
											cbDeck = comboList[i]['colors'][ci].color;
										} else if(comboList[i]['colors'][ci].part === '#inside-deck'){
											cbDeck = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#hull-sides-and-outside-deck' ) {
											cbHullSides = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#hull-bottom' ) {
											cbHullBottom = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#comanche-stripe-2' ) {
											cbComanche2 = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#comanche-stripes-1-and-3' ) {
											cbComanche1 = comboList[i]['colors'][ci].color;
											cbComanche3 = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#hull-pinstripes' ) {
											cbHullPinstripes = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#deck-pinstripes' ) {
											cbDeckPinstripes = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#hull-and-deck-pinstripes' ) {
											cbHullPinstripes = comboList[i]['colors'][ci].color;
											cbDeckPinstripe = comboList[i]['colors'][ci].color;
										}

									} 

									paletteRW += '<div class="comboButtonDiv">';
									paletteRW += '<svg class="comboButton" data-colorOptionID="standard" title="'+comboList[i].name+'" viewBox="0 0 747.36 500.61" data-displayname="Reata White Package:<strong> '+comboList[i].name+'</strong>" desc="'+comboList[i].name+'" id="'+i+'-btn"  cost="'+allowedReataWhitePackages[0].cost+'" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">';
									paletteRW += '	<path class="hull-sides" fill="url(#'+cbHullSides+')" d="M727.53,82.1H19.83a87.75,87.75,0,0,0-2.44,20.57V397.94a87.09,87.09,0,0,0,12.15,44.48H717.82A87.09,87.09,0,0,0,730,397.94V102.67A87.75,87.75,0,0,0,727.53,82.1Z"/>';
									paletteRW += '	<path class="deck" fill="url(#'+cbDeck+')" d="M642.49,15.2H104.87A87.49,87.49,0,0,0,23.82,69.73H723.54A87.49,87.49,0,0,0,642.49,15.2Z"/>';
									paletteRW += '	<path class="hull-bottom" fill="url(#'+cbHullBottom+')" d="M104.87,485.41H642.49a87.43,87.43,0,0,0,75.33-43H29.54A87.43,87.43,0,0,0,104.87,485.41Z"/>';
									paletteRW += '	<path class="hull-pinstripes" fill="url(#'+cbHullPinstripes+')" d="M349.69,193.75c-78.76,0-169.8,47.42-189.94,58.29-9.63,4.45-88.23,51.16-88.23,51.16a3.11,3.11,0,0,0,0,4.58l23.69,13.64,50.27,27s57.57,32.32,84.53,31.84,58.78-25.16,58.78-25.16a47.24,47.24,0,0,1,8.46,2.17c24.74,12.42,61.53,24.42,79.46,26s34.73-7.62,34.73-7.62l25.05-15.86s7.3,2.7,18.24,7.78,23,11.89,46.79,12.05S529,374.4,550,364.87s50.65-26.49,94.37-27.28c26.9-1.32,85.56,0,85.56,0V193.75H349.69Z"/>';
									paletteRW += '	<path class="comanche-stripe-2" fill="url(#'+cbComanche2+')" d="M467.42,273.36a146.35,146.35,0,0,0-26.33,1.75c-12.53,2.22-25.21,2.22-56.93,20.14s-86.43,53.16-86.43,53.16l15.7,5.83,12.21,5.55c31.88,13.27,49.8,15.55,59.31,14.91s21.73-7.13,21.73-7.13l38.69-22.21s61.64-40,111.33-46.31c26-2.74,58.21-2.37,58.21-2.37H730V271H536.88Z"/>';
									paletteRW += '	<path class="comanche-stripe-3" fill="url(#'+cbComanche3+')" d="M577,306.19c-54.56.05-129.73,47.89-129.73,47.89l24.42,11.11s7,4.91,27,5.71a71.82,71.82,0,0,0,34.57-7.3s49.69-30.08,95.47-33.46c24.43-1.75,37.75-1.27,37.75-1.27H730V306.35H606.82Z"/>';
									paletteRW += '	<path class="comanche-stripe-1" fill="url(#'+cbComanche1+')" d="M352.65,203.48c-64.65,0-144.53,34.84-196.07,61.48-4.79,2.39-70.41,40.6-70.41,40.6l55.5,30.29s61.48,32.35,82.15,34.89c7.3.16,16.13.42,27.93-4.32,14.42-6.68,72.78-46.11,72.78-46.11l53-31.25s22.84-13,42.18-17.76S462,265,475.35,264.48s56.3-1.9,56.3-1.9l52.17.16H730V203.9H382.26S360,203.48,352.65,203.48Z" />';
									paletteRW += '	<path class="deck-pinstripe" fill="url(#'+cbDeckPinstripe+')" d="M727.26,82V81a84.9,84.9,0,0,0-3.72-11.3H23.82a87.82,87.82,0,0,0-4,12.3Z"/>';
									paletteRW += '	<rect class="body-line" fill="#000" x="17.39" y="225.7" width="712.57" height="10.65"/>';
									paletteRW += '	<rect class="button-border" fill="transparent" x="11.45" y="10.22" width="724.47" height="480.16" rx="87.88"/>';
									paletteRW += '</svg><div class="comboName">'+comboList[i].name+'</div></div>';

								};
							};


							//loop through allowed Premium combos from [model]-def file
							for (var a = 0; a < allowedReataMistPackages.length; a++) {
								
								//console.log('i: '+i)

								var allowedComboName = allowedReataMistPackages[a].name;
								
								//console.log(thisComboName+' == '+allowedComboName)

								if (thisComboName == allowedComboName){
									
									cbDeck = '';
									cbHullSides = '';
									cbHullBottom = '';
									cbComanche1 = '';
									cbComanche2 = '';
									cbComanche3 = '';
									cbHullPinstripes = '';
									cbDeckPinstripe = '';

									for( var ci = 0, len = comboList[i]['colors'].length; ci < len; ci++ ){

										//console.log('ci: '+ci)
										//console.log(comboList[i]['colors'])
										//console.log("comboList[i]['colors'][ci].swatchSlice: "+comboList[i]['colors'][ci].swatchSlice)

										if ( comboList[i]['colors'][ci].part === '#top-deck' || comboList[i]['colors'][ci].part === '#deck-top' || comboList[i]['colors'][ci].part === '#deck') {
											cbDeck = comboList[i]['colors'][ci].color;
										} else if(comboList[i]['colors'][ci].part === '#inside-deck'){
											cbDeck = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#hull-sides-and-outside-deck' ||  comboList[i]['colors'][ci].part === '#hull-sides') {
											cbHullSides = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#hull-bottom' ) {
											cbHullBottom = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#comanche-stripe-2' ) {
											cbComanche2 = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#comanche-stripes-1-and-3' ) {
											cbComanche1 = comboList[i]['colors'][ci].color;
											cbComanche3 = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#hull-and-deck-pinstripes' ) {
											cbHullPinstripes = comboList[i]['colors'][ci].color;
											cbDeckPinstripe = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#hull-pinstripes' ) {
											cbHullPinstripes = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#deck-pinstripes' ) {
											cbDeckPinstripes = comboList[i]['colors'][ci].color;
										}

									} 

									paletteRM += '<div class="comboButtonDiv">';
									paletteRM += '<svg class="comboButton" data-colorOptionID="standard" title="'+comboList[i].name+'" viewBox="0 0 747.36 500.61" data-displayname="Reata Mist Package:<strong> '+comboList[i].name+'</strong>" desc="'+comboList[i].name+'" id="'+i+'-btn"  cost="'+allowedReataMistPackages[0].cost+'" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">';
									paletteRM += '	<path class="hull-sides" fill="url(#'+cbHullSides+')" d="M727.53,82.1H19.83a87.75,87.75,0,0,0-2.44,20.57V397.94a87.09,87.09,0,0,0,12.15,44.48H717.82A87.09,87.09,0,0,0,730,397.94V102.67A87.75,87.75,0,0,0,727.53,82.1Z"/>';
									paletteRM += '	<path class="deck" fill="url(#'+cbDeck+')" d="M642.49,15.2H104.87A87.49,87.49,0,0,0,23.82,69.73H723.54A87.49,87.49,0,0,0,642.49,15.2Z"/>';
									paletteRM += '	<path class="hull-bottom" fill="url(#'+cbHullBottom+')" d="M104.87,485.41H642.49a87.43,87.43,0,0,0,75.33-43H29.54A87.43,87.43,0,0,0,104.87,485.41Z"/>';
									paletteRM += '	<path class="hull-pinstripes" fill="url(#'+cbHullPinstripes+')" d="M349.69,193.75c-78.76,0-169.8,47.42-189.94,58.29-9.63,4.45-88.23,51.16-88.23,51.16a3.11,3.11,0,0,0,0,4.58l23.69,13.64,50.27,27s57.57,32.32,84.53,31.84,58.78-25.16,58.78-25.16a47.24,47.24,0,0,1,8.46,2.17c24.74,12.42,61.53,24.42,79.46,26s34.73-7.62,34.73-7.62l25.05-15.86s7.3,2.7,18.24,7.78,23,11.89,46.79,12.05S529,374.4,550,364.87s50.65-26.49,94.37-27.28c26.9-1.32,85.56,0,85.56,0V193.75H349.69Z"/>';
									paletteRM += '	<path class="comanche-stripe-2" fill="url(#'+cbComanche2+')" d="M467.42,273.36a146.35,146.35,0,0,0-26.33,1.75c-12.53,2.22-25.21,2.22-56.93,20.14s-86.43,53.16-86.43,53.16l15.7,5.83,12.21,5.55c31.88,13.27,49.8,15.55,59.31,14.91s21.73-7.13,21.73-7.13l38.69-22.21s61.64-40,111.33-46.31c26-2.74,58.21-2.37,58.21-2.37H730V271H536.88Z"/>';
									paletteRM += '	<path class="comanche-stripe-3" fill="url(#'+cbComanche3+')" d="M577,306.19c-54.56.05-129.73,47.89-129.73,47.89l24.42,11.11s7,4.91,27,5.71a71.82,71.82,0,0,0,34.57-7.3s49.69-30.08,95.47-33.46c24.43-1.75,37.75-1.27,37.75-1.27H730V306.35H606.82Z"/>';
									paletteRM += '	<path class="comanche-stripe-1" fill="url(#'+cbComanche1+')" d="M352.65,203.48c-64.65,0-144.53,34.84-196.07,61.48-4.79,2.39-70.41,40.6-70.41,40.6l55.5,30.29s61.48,32.35,82.15,34.89c7.3.16,16.13.42,27.93-4.32,14.42-6.68,72.78-46.11,72.78-46.11l53-31.25s22.84-13,42.18-17.76S462,265,475.35,264.48s56.3-1.9,56.3-1.9l52.17.16H730V203.9H382.26S360,203.48,352.65,203.48Z" />';
									paletteRM += '	<path class="deck-pinstripe" fill="url(#'+cbDeckPinstripe+')" d="M727.26,82V81a84.9,84.9,0,0,0-3.72-11.3H23.82a87.82,87.82,0,0,0-4,12.3Z"/>';
									paletteRM += '	<rect class="body-line" fill="#000" x="17.39" y="225.7" width="712.57" height="10.65"/>';
									paletteRM += '	<rect class="button-border" fill="transparent" x="11.45" y="10.22" width="724.47" height="480.16" rx="87.88"/>';
									paletteRM += '</svg><div class="comboName">'+comboList[i].name+'</div></div>';

								};
							};



							for (var a = 0; a < allowedReataWhiteFusionPackages.length; a++) {
								
								//console.log('i: '+i)

								var allowedComboName = allowedReataWhiteFusionPackages[a].name;
								
								//console.log(thisComboName+' == '+allowedComboName)

								if (thisComboName == allowedComboName){
									
									cbDeck = '';
									cbHullSides = '';
									cbHullBottom = '';
									cbComanche1 = '';
									cbComanche2 = '';
									cbComanche3 = '';
									cbHullPinstripes = '';
									cbDeckPinstripe = '';

									for( var ci = 0, len = comboList[i]['colors'].length; ci < len; ci++ ){

										//console.log('ci: '+ci)
										//console.log(comboList[i]['colors'])
										//console.log("comboList[i]['colors'][ci].swatchSlice: "+comboList[i]['colors'][ci].swatchSlice)

										if ( comboList[i]['colors'][ci].part === '#top-deck' || comboList[i]['colors'][ci].part === '#deck-top' || comboList[i]['colors'][ci].part === '#deck') {
											cbDeck = comboList[i]['colors'][ci].color;
										} else if(comboList[i]['colors'][ci].part === '#inside-deck'){
											cbDeck = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#hull-sides-and-outside-deck' ||  comboList[i]['colors'][ci].part === '#hull-sides') {
											cbHullSides = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#hull-bottom' ) {
											cbHullBottom = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#comanche-stripe-2' ) {
											cbComanche2 = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#comanche-stripes-1-and-3' ) {
											cbComanche1 = comboList[i]['colors'][ci].color;
											cbComanche3 = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#hull-pinstripes' ) {
											cbHullPinstripes = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#deck-pinstripes' ) {
											cbDeckPinstripes = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#hull-and-deck-pinstripes' ) {
											cbHullPinstripes = comboList[i]['colors'][ci].color;
											cbDeckPinstripe = comboList[i]['colors'][ci].color;
										}

									} 

									paletteRWF += '<div class="comboButtonDiv">';
									paletteRWF += '<svg class="comboButton" data-colorOptionID="standard" title="'+comboList[i].name+'" viewBox="0 0 747.36 500.61" data-displayname="Reata White Fusion Package:<strong> '+comboList[i].name+'</strong>" desc="'+comboList[i].name+'" id="'+i+'-btn"  cost="'+allowedReataWhiteFusionPackages[0].cost+'" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">';
									paletteRWF += '	<path class="hull-sides" fill="url(#'+cbHullSides+')" d="M727.53,82.1H19.83a87.75,87.75,0,0,0-2.44,20.57V397.94a87.09,87.09,0,0,0,12.15,44.48H717.82A87.09,87.09,0,0,0,730,397.94V102.67A87.75,87.75,0,0,0,727.53,82.1Z"/>';
									paletteRWF += '	<path class="deck" fill="url(#'+cbDeck+')" d="M642.49,15.2H104.87A87.49,87.49,0,0,0,23.82,69.73H723.54A87.49,87.49,0,0,0,642.49,15.2Z"/>';
									paletteRWF += '	<path class="hull-bottom" fill="url(#'+cbHullBottom+')" d="M104.87,485.41H642.49a87.43,87.43,0,0,0,75.33-43H29.54A87.43,87.43,0,0,0,104.87,485.41Z"/>';
									paletteRWF += '	<path class="hull-pinstripes" fill="url(#'+cbHullPinstripes+')" d="M349.69,193.75c-78.76,0-169.8,47.42-189.94,58.29-9.63,4.45-88.23,51.16-88.23,51.16a3.11,3.11,0,0,0,0,4.58l23.69,13.64,50.27,27s57.57,32.32,84.53,31.84,58.78-25.16,58.78-25.16a47.24,47.24,0,0,1,8.46,2.17c24.74,12.42,61.53,24.42,79.46,26s34.73-7.62,34.73-7.62l25.05-15.86s7.3,2.7,18.24,7.78,23,11.89,46.79,12.05S529,374.4,550,364.87s50.65-26.49,94.37-27.28c26.9-1.32,85.56,0,85.56,0V193.75H349.69Z"/>';
									paletteRWF += '	<path class="comanche-stripe-2" fill="url(#'+cbComanche2+')" d="M467.42,273.36a146.35,146.35,0,0,0-26.33,1.75c-12.53,2.22-25.21,2.22-56.93,20.14s-86.43,53.16-86.43,53.16l15.7,5.83,12.21,5.55c31.88,13.27,49.8,15.55,59.31,14.91s21.73-7.13,21.73-7.13l38.69-22.21s61.64-40,111.33-46.31c26-2.74,58.21-2.37,58.21-2.37H730V271H536.88Z"/>';
									paletteRWF += '	<path class="comanche-stripe-3" fill="url(#'+cbComanche3+')" d="M577,306.19c-54.56.05-129.73,47.89-129.73,47.89l24.42,11.11s7,4.91,27,5.71a71.82,71.82,0,0,0,34.57-7.3s49.69-30.08,95.47-33.46c24.43-1.75,37.75-1.27,37.75-1.27H730V306.35H606.82Z"/>';
									paletteRWF += '	<path class="comanche-stripe-1" fill="url(#'+cbComanche1+')" d="M352.65,203.48c-64.65,0-144.53,34.84-196.07,61.48-4.79,2.39-70.41,40.6-70.41,40.6l55.5,30.29s61.48,32.35,82.15,34.89c7.3.16,16.13.42,27.93-4.32,14.42-6.68,72.78-46.11,72.78-46.11l53-31.25s22.84-13,42.18-17.76S462,265,475.35,264.48s56.3-1.9,56.3-1.9l52.17.16H730V203.9H382.26S360,203.48,352.65,203.48Z" />';
									paletteRWF += '	<path class="deck-pinstripe" fill="url(#'+cbDeckPinstripe+')" d="M727.26,82V81a84.9,84.9,0,0,0-3.72-11.3H23.82a87.82,87.82,0,0,0-4,12.3Z"/>';
									paletteRWF += '	<rect class="body-line" fill="#000" x="17.39" y="225.7" width="712.57" height="10.65"/>';
									paletteRWF += '	<rect class="button-border" fill="transparent" x="11.45" y="10.22" width="724.47" height="480.16" rx="87.88"/>';
									paletteRWF += '</svg><div class="comboName">'+comboList[i].name+'</div></div>';

								};
							};


							
							for (var a = 0; a < allowedReataMistFusionPackages.length; a++) {
								
								//console.log('i: '+i)

								var allowedComboName = allowedReataMistFusionPackages[a].name;
								
								//console.log(thisComboName+' == '+allowedComboName)

								if (thisComboName == allowedComboName){
									
									cbDeck = '';
									cbHullSides = '';
									cbHullBottom = '';
									cbComanche1 = '';
									cbComanche2 = '';
									cbComanche3 = '';
									cbHullPinstripes = '';
									cbDeckPinstripe = '';

									for( var ci = 0, len = comboList[i]['colors'].length; ci < len; ci++ ){

										//console.log('ci: '+ci)
										//console.log(comboList[i]['colors'])
										//console.log("comboList[i]['colors'][ci].swatchSlice: "+comboList[i]['colors'][ci].swatchSlice)

										if ( comboList[i]['colors'][ci].part === '#top-deck' || comboList[i]['colors'][ci].part === '#deck-top' || comboList[i]['colors'][ci].part === '#deck') {
											cbDeck = comboList[i]['colors'][ci].color;
										} else if(comboList[i]['colors'][ci].part === '#inside-deck'){
											cbDeck = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#hull-sides-and-outside-deck' ||  comboList[i]['colors'][ci].part === '#hull-sides') {
											cbHullSides = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#hull-bottom' ) {
											cbHullBottom = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#comanche-stripe-2' ) {
											cbComanche2 = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#comanche-stripes-1-and-3' ) {
											cbComanche1 = comboList[i]['colors'][ci].color;
											cbComanche3 = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#hull-pinstripes' ) {
											cbHullPinstripes = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#deck-pinstripes' ) {
											cbDeckPinstripes = comboList[i]['colors'][ci].color;
										}
										if ( comboList[i]['colors'][ci].part === '#hull-and-deck-pinstripes' ) {
											cbHullPinstripes = comboList[i]['colors'][ci].color;
											cbDeckPinstripe = comboList[i]['colors'][ci].color;
										}

									} 

									paletteRMF += '<div class="comboButtonDiv">';
									paletteRMF += '<svg class="comboButton" data-colorOptionID="standard" title="'+comboList[i].name+'" viewBox="0 0 747.36 500.61" data-displayname="Reata Mist Fusion Package:<strong> '+comboList[i].name+'</strong>" desc="'+comboList[i].name+'" id="'+i+'-btn"  cost="'+allowedReataMistFusionPackages[0].cost+'" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">';
									paletteRMF += '	<path class="hull-sides" fill="url(#'+cbHullSides+')" d="M727.53,82.1H19.83a87.75,87.75,0,0,0-2.44,20.57V397.94a87.09,87.09,0,0,0,12.15,44.48H717.82A87.09,87.09,0,0,0,730,397.94V102.67A87.75,87.75,0,0,0,727.53,82.1Z"/>';
									paletteRMF += '	<path class="deck" fill="url(#'+cbDeck+')" d="M642.49,15.2H104.87A87.49,87.49,0,0,0,23.82,69.73H723.54A87.49,87.49,0,0,0,642.49,15.2Z"/>';
									paletteRMF += '	<path class="hull-bottom" fill="url(#'+cbHullBottom+')" d="M104.87,485.41H642.49a87.43,87.43,0,0,0,75.33-43H29.54A87.43,87.43,0,0,0,104.87,485.41Z"/>';
									paletteRMF += '	<path class="hull-pinstripes" fill="url(#'+cbHullPinstripes+')" d="M349.69,193.75c-78.76,0-169.8,47.42-189.94,58.29-9.63,4.45-88.23,51.16-88.23,51.16a3.11,3.11,0,0,0,0,4.58l23.69,13.64,50.27,27s57.57,32.32,84.53,31.84,58.78-25.16,58.78-25.16a47.24,47.24,0,0,1,8.46,2.17c24.74,12.42,61.53,24.42,79.46,26s34.73-7.62,34.73-7.62l25.05-15.86s7.3,2.7,18.24,7.78,23,11.89,46.79,12.05S529,374.4,550,364.87s50.65-26.49,94.37-27.28c26.9-1.32,85.56,0,85.56,0V193.75H349.69Z"/>';
									paletteRMF += '	<path class="comanche-stripe-2" fill="url(#'+cbComanche2+')" d="M467.42,273.36a146.35,146.35,0,0,0-26.33,1.75c-12.53,2.22-25.21,2.22-56.93,20.14s-86.43,53.16-86.43,53.16l15.7,5.83,12.21,5.55c31.88,13.27,49.8,15.55,59.31,14.91s21.73-7.13,21.73-7.13l38.69-22.21s61.64-40,111.33-46.31c26-2.74,58.21-2.37,58.21-2.37H730V271H536.88Z"/>';
									paletteRMF += '	<path class="comanche-stripe-3" fill="url(#'+cbComanche3+')" d="M577,306.19c-54.56.05-129.73,47.89-129.73,47.89l24.42,11.11s7,4.91,27,5.71a71.82,71.82,0,0,0,34.57-7.3s49.69-30.08,95.47-33.46c24.43-1.75,37.75-1.27,37.75-1.27H730V306.35H606.82Z"/>';
									paletteRMF += '	<path class="comanche-stripe-1" fill="url(#'+cbComanche1+')" d="M352.65,203.48c-64.65,0-144.53,34.84-196.07,61.48-4.79,2.39-70.41,40.6-70.41,40.6l55.5,30.29s61.48,32.35,82.15,34.89c7.3.16,16.13.42,27.93-4.32,14.42-6.68,72.78-46.11,72.78-46.11l53-31.25s22.84-13,42.18-17.76S462,265,475.35,264.48s56.3-1.9,56.3-1.9l52.17.16H730V203.9H382.26S360,203.48,352.65,203.48Z" />';
									paletteRMF += '	<path class="deck-pinstripe" fill="url(#'+cbDeckPinstripe+')" d="M727.26,82V81a84.9,84.9,0,0,0-3.72-11.3H23.82a87.82,87.82,0,0,0-4,12.3Z"/>';
									paletteRMF += '	<rect class="body-line" fill="#000" x="17.39" y="225.7" width="712.57" height="10.65"/>';
									paletteRMF += '	<rect class="button-border" fill="transparent" x="11.45" y="10.22" width="724.47" height="480.16" rx="87.88"/>';
									paletteRMF += '</svg><div class="comboName">'+comboList[i].name+'</div></div>';

								};
							};


						});


						
						if(allowCustom.length > 0){

							var customColorCost = allowCustom[0].cost;						
							$('#colorOption-customColor .colorOptionCost').attr("data-colorPrice", customColorCost).text('$' + allowCustom[0].cost);
								
						}			

						

						if(allowedPackages.length > 0){
							$('.standard-color-palette').html(paletteSTD);
						} else {
							$("#colorOption-standard-color-packages-container").hide();
						}
						if(allowedLimitedEditionPackages.length > 0){
							$('.limited-edition-palette').html(paletteLE);
							$("#colorOption-limitedEdition-container").show();
						}
						if(allowedElectraFusionPackages.length > 0){
							$('.fusion-electra-palette').html(paletteFE);
							$("#colorOption-fusionElectra-container").show();
						}
						if(allowedReataWhitePackages.length > 0){
							$('.reata-white-palette').html(paletteRW);
							$("#colorOption-reataWhite-container").show();
						}
						console.log('paletteRM: ' + paletteRM)
						if(allowedReataMistPackages.length > 0){
							$('.reata-mist-palette').html(paletteRM);
							$("#colorOption-reataMist-container").show();
						}
						if(allowedReataWhiteFusionPackages.length){
							$('.reata-white-fusion-palette').html(paletteRWF);
							$("#colorOption-reataWhiteFusion-container").show();
						}
						if(allowedReataMistFusionPackages.length){
							$('.reata-mist-fusion-palette').html(paletteRMF);
							$("#colorOption-reataMistFusion-container").show();
						}

						// trigger a click on the first combo swatch
						if(typeof $('.comboButton.selected').attr('id') == 'undefined'){
							// let's trigger a click on the first combo on the page.
							if($('.comboButton').length > 0){
								$('.comboButton').first().trigger(clickEventType);
							}
						}


					}

					var navclear = function(){
						$(".parts").hide();
						$(".part-groups").hide();
						$(".variation").hide();
						$(".nav-title").removeClass('selected');
					}

					var partclear=function(){
						$(".part-button").removeClass('selected');
					}


					var groupclear=function(){
						$(".part-tabs").hide();
						$(".group-tab").removeClass('selected');
						partclear();
						$(".colorButton").attr("class", "colorButton");
						$(".colorButtonDiv").attr("class", "colorButtonDiv");
						boatPart="";
					}
					
					$('.highlightPartButton').on( "mouseenter", function(event) {

						//console.log(event);
						
						var part = $(this).attr('data-part');
					
						// flash the part button 
						$('#'+part+'-btn').effect( 'highlight', { color:'#ffae00' }, 250);

						setTimeout(function(){

							// flash the part button
							$('#'+part+'-btn').effect( 'highlight', { color:'#ffae00' }, 250);

							setTimeout(function(){

								// flash the part button
								$('#'+part+'-btn').effect( 'highlight', { color:'#ffae00' }, 250);

							}, 100);

						}, 100);

						//if(event.type === 'mouseenter'){

						//} else if(event.type === 'mouseleave'){
							
						//}
					});



					$('.highlightPartButton').on('click', function(){
						
						var part = $(this).attr('data-part');
						$('#'+part+'-btn').click();
						
					});

					var displayWheelColorPalette = function (bp){
						
						// hide all color types
						for(var gct = 0; gct < colorTypeList.length; gct++){
							var selectorName = "[myid*=" + colorTypeList[gct] + "]";
							$(selectorName).hide();
						}

						// show only wheels
						$("[myid*=_Wheels]").show();

						// remove any exixting messages
						$('#colorPaletteMessage').remove();
						
						// add special message about wheels:
						$('.custom-color-palette').append('<div id="colorPaletteMessage" class="alert mx-3">14” Silver Painted Raptor II Wheels are included with this model. Other wheel selections may be an optional upgrade. See next step “OPTIONS” under “TRAILER ACCESSORIES” for more.</div>');
						

					}

					var showPartColorPalette = function (bp){


						if(typeof bp !== "undefined"){

							// remove the previous message if it exists
							if($('#colorPaletteMessage').length){
								$('#colorPaletteMessage').remove();
							}


							var mypart = '';

							// remove the hash tag from boatPart if it is there
							if(bp.indexOf("#") != -1){
								mypart = bp;
							} else {
								mypart = "#" + bp;
							}

							var allowedColorTypes = '';

							// look up what kind of colors this part is allowed
							for (var a = 0; a < boatModelParts.length; a++) {
								if (boatModelParts[a].id == mypart.replace('#','')){
									allowedColorTypes = boatModelParts[a].allowedColorTypes;
								}
							}

							// hide all color types
							for(var gct = 0; gct < colorTypeList.length; gct++){
								var selectorName = "[myid*=" + colorTypeList[gct] + "]";
								$(selectorName).hide();
							}


							// show only allowed colorTypes for mypart
							for(var ct = 0; ct < allowedColorTypes.split(',').length; ct++){
								var match = allowedColorTypes.split(',');
								for (var a in match) {
									var colorTypeAllowed = match[a];
									var selectorName = "[myid*=" + colorTypeAllowed + "]";
									//console.log("colorTypeAllowed: " + colorTypeAllowed)
									$(selectorName).show();
								}
							}




							// RULES HERE: 



							// special rule that affects all segments in Ranger Fiberglass and Ranger Saltwater
							if(BRANDNAME === 'Ranger Fiberglass' || BRANDNAME === 'Ranger Saltwater') {
								
								if(bp === 'deck-pinstripes'){
									$('.custom-color-palette').append('<div id="colorPaletteMessage" class="alert mx-3">This part must be the color same as <a class="goToCCPalette" style="color: darkorange;" data-catName="Hull" data-part="hull-pinstripes">Hull Pinstripes.</a></div>');
								}
								if(bp === 'hull-pinstripes'){
									$('.custom-color-palette').append('<div id="colorPaletteMessage" class="alert mx-3">This part must be the color same as <a class="highlightPartButton goToCCPalette" style="color: darkorange;" data-catName="Deck" data-part="deck-pinstripes">Deck Pinstripes.</a></div>');
								}
								
								if(bp === 'deck-pinstripe'){
																																							
									$('.custom-color-palette').append('<div id="colorPaletteMessage" class="alert mx-3">This part must be the color same as <a class="goToCCPalette" style="color: darkorange;" data-catName="Hull" data-part="hull-pinstripe">Hull Pinstripe.</a></div>');
								}
								if(bp === 'hull-pinstripe'){
									$('.custom-color-palette').append('<div id="colorPaletteMessage" class="alert mx-3">This part must be the color same as <a class="highlightPartButton goToCCPalette" style="color: darkorange;" data-catName="Deck" data-part="deck-pinstripe">Deck Pinstripe.</a></div>');
								}

								$('.goToCCPalette').on('click', function(){

									var part = $(this).attr('data-part').toLowerCase();
									var catName = $(this).attr('data-catName').toLowerCase();
			
									console.log("part: " + part)
									console.log("catName: " + catName)
			
									if($('.custom-color-ui').css('display') !== 'block'){
										$('#btn-launch-custom-colors').click();
										updateColorConfigDisplay();
									}
			
									$('#'+catName+'-tab').click();
									$('#'+part+'-btn').click();
									$('.part-tabs').hide();
									$('#'+catName+'-parts-stack').show();
			
									// Scroll to the palette
									$('html, body').animate({
										scrollTop: $('#'+catName+'-tab').offset().top - 150
									}, 500, function() { 
			
										// Scroll complete.
										// Highlight the part button.
										$('#'+part+'-btn').effect( 'highlight', { color:'#808080' }, 250);
			
									});
			
								});

							} 

							/*

							// for the Z518 and Z518 Cup, "Inside Deck" and "Hull Sides" must be the same color
							if(BRANDNAME === 'Ranger Fiberglass' && (bp === 'inside-deck' || bp === 'hull sides')) {
								
								if(bp === 'inside-deck'){
									$('.custom-color-palette').append('<div id="colorPaletteMessage" class="alert mx-3">This part must be the color same as <a class="goToCCPalette" style="color: darkorange;" data-catName="Hull" data-part="hull-sides">Hull Sides.</a></div>');
								}

								if(bp === 'hull-pinstripes'){
									$('.custom-color-palette').append('<div id="colorPaletteMessage" class="alert mx-3">This part must be the color same as <a class="highlightPartButton goToCCPalette" style="color: darkorange;" data-catName="Deck" data-part="inside-deck">Inside Deck.</a></div>');	
								}

							}
							*/
							
							// special rule that affects all segments in Ranger Fiberglass and Ranger Saltwater
							if(BRANDNAME === 'Ranger Saltwater') {
								
								if(bp === 'hull-main'){

									// Hide]these colors for this part
									$('[myid*=Army-Green_Gel-Coat]').hide();
									$('[myid*=Aztec-Yellow_Gel-Coat]').hide();
									
								}
								
								if(bp === 'hull-bottom'){

									// Hide]these colors for this part
									$('[myid*=Aqua-Tide_Gel-Coat]').hide();
									$('[myid*=Army-Green_Gel-Coat]').hide();
									$('[myid*=Aztec-Yellow_Gel-Coat]').hide();
									
								}
								
								if(bp === 'deck-main'){
									
									// hide all color types
									for(var gct = 0; gct < colorTypeList.length; gct++){
										var selectorName = "[myid*=" + colorTypeList[gct] + "]";
										$(selectorName).hide();
									}

									// Show only these colors for these parts
									$('[myid*=Performance-White_Gel-Coat]').show();
									$('[myid*=Bay-Green_Gel-Coat]').show();
									$('[myid*=Light-Gray_Gel-Coat]').show();
									$('[myid*=Bay-Blue_Gel-Coat]').show();
									
								}
								
								if(bp === 'hard-top-lower'){
									$('.custom-color-palette').append('<div id="colorPaletteMessage" class="alert mx-3">This part is tied to Hull Main color if picked.</div>');
									$('#colorPaletteMessage').append('<div>Hard Top is an optional upgrade. See next step "Options" under "COVERS AND TOPS" for more.</div>');
								}
								if(bp === 'console-face'){
									$('.custom-color-palette').append('<div id="colorPaletteMessage" class="alert mx-3">This part is not show in any of the images above.</div>');
								}

							}

						

							if(SEGMENTNAME === 'Z-Comanche Series'){

								if(bp === 'trailer-carpet' || bp === 'carpet'){
									$('.custom-color-palette').append('<div id="colorPaletteMessage" class="alert mx-3">The boat\'s interior carpet and the trailer\'s carpet must be the same color.</div>');
								}
								
								if(bp === 'seat-trim'){
									$('[myid*=Classic-Gold_VinylInsert-PinColor]').hide();
								}
								
								if(bp === 'seat-center'){
									$('[myid*=Classic-Gold_VinylInsert-PinColor]').hide();
									//s$('[myid*=Black-X_VinylInsert-PinColor]').hide();
											  
								}
								if(bp === 'seat-shell'){
									$('[myid*=Sunfire-Mist_Poli-Mist]').hide();
									$('[myid*=Black-Mist_Poli-Mist]').hide();

									// hide specific gel coat colors
									$('[myid*=Aztec-Yellow_Gel-Coat]').hide();
									$('[myid*=Burgundy_Gel-Coat]').hide();
									$('[myid*=Mariner-Blue_Gel-Coat]').hide();
									$('[myid*=Steel-Blue_Gel-Coat]').hide();
									$('[myid*=Teal_Gel-Coat]').hide();

								}
								
								if(bp === 'inside-deck'){
									$('[myid*=Sunfire-Mist_Poli-Mist]').hide();
									$('[myid*=Black-Mist_Poli-Mist]').hide();
									$('[myid*=Jet-Black-Gel_Gel-Coat]').hide();
								}
								if(bp === 'top-deck'){
									$('[myid*=Sunfire-Mist_Poli-Mist]').hide();
									$('[myid*=Jet-Black-Gel_Gel-Coat]').hide();
								}
								if(bp === 'console'){
									$('[myid*=Black-Mist_Poli-Mist]').hide();
									$('[myid*=Sunfire-Mist_Poli-Mist]').hide();
									$('[myid*=Jet-Black-Gel_Gel-Coat]').hide();
								}
								if(bp === 'deck-stripe'){;
									$('[myid*=Jet-Black-Gel_Gel-Coat]').hide();
								}
								if(bp === 'deck-pinstripes'){
									$('[myid*=Jet-Black-Gel_Gel-Coat]').hide();
								}
								if(bp === 'hull-sides-and-outside-deck'){
									$('[myid*=Black-Mist_Poli-Mist]').hide();
									$('[myid*=Jet-Black-Gel_Gel-Coat]').hide();
								}
								if(bp === 'comanche-stripes-1-and-3'){
									$('[myid*=Jet-Black-Gel_Gel-Coat]').hide();
								}
								if(bp === 'comanche-stripe-2'){
									$('[myid*=Jet-Black-Gel_Gel-Coat]').hide();
								}
								if(bp === 'hull-pinstripes'){
									$('[myid*=Jet-Black-Gel_Gel-Coat]').hide();
								}
								if(bp === 'water-line' || bp === 'hull-waterline'){
									$('[myid*=Black-Mist_Poli-Mist]').hide();
								}
								if(bp === 'hull-bottom'){
									// hide all poli mist colors
									$("[myid*=Poli-Mist]").hide();
									// hide all poli mist colors
									$("[myid*=Poli-Mist]").hide();

								}

								if(bp === 'fender'){
									$('[myid*=Black-Mist_Poli-Mist]').hide();
								}

								if(bp === 'fender-trim'){
									$('[myid*=Black-Mist_Poli-Mist]').hide();
								}

								if(bp === 'fender-pinstripes'){
									$('[myid*=Black-Mist_Poli-Mist]').hide();
								}

							} // END if SEGMENTNAME === 'Z-Comanche Series'

							if(SEGMENTNAME === 'Fisherman'){
								
								if(bp === 'inside-deck'){
									$('[myid*=Black-Mist_Poli-Mist]').hide();
									$('[myid*=Sunfire-Mist_Poli-Mist]').hide();
									$('[myid*=Jet-Black-Gel_Gel-Coat]').hide();
								}
								if(bp === 'console'){
									$('[myid*=Black-Mist_Poli-Mist]').hide();
									$('[myid*=Sunfire-Mist_Poli-Mist]').hide();
									$('[myid*=Jet-Black-Gel_Gel-Coat]').hide();
								}
								if(bp === 'deck-stripe'){;
									$('[myid*=Jet-Black-Gel_Gel-Coat]').hide();
								}
								if(bp === 'top-deck'){
									$('[myid*=Sunfire-Mist_Poli-Mist]').hide();
									$('[myid*=Jet-Black-Gel_Gel-Coat]').hide();
								}
								if(bp === 'deck-pinstripes'){
									$('[myid*=Jet-Black-Gel_Gel-Coat]').hide();
								}
								if(bp === 'hull-sides-and-outside-deck'){
									$('[myid*=Black-Mist_Poli-Mist]').hide();
									$('[myid*=Jet-Black-Gel_Gel-Coat]').hide();
								}
								if(bp === 'comanche-stripes-1-and-3'){
									$('[myid*=Jet-Black-Gel_Gel-Coat]').hide();
								}
								if(bp === 'comanche-stripe-2'){
									$('[myid*=Jet-Black-Gel_Gel-Coat]').hide();
								}
								if(bp === 'hull-pinstripes'){
									$('[myid*=Jet-Black-Gel_Gel-Coat]').hide();
								}
								if(bp === 'water-line' || bp === 'hull-waterline'){
									$('[myid*=Black-Mist_Poli-Mist]').hide();
								}
								if(bp === 'hull-bottom'){
									$("[myid*=Poli-Mist]").hide();
								}
								if(bp === 'seat-shell'){

									// hide all poli mist colors
									//$("[myid*=Poli-Mist]").hide();
									$('[myid*=Black-Mist_Poli-Mist]').hide();


									// hide specific gel coat colors
									$('[myid*=Aztec-Yellow_Gel-Coat]').hide();
									$('[myid*=Burgundy_Gel-Coat]').hide();
									$('[myid*=Mariner-Blue_Gel-Coat]').hide();
									$('[myid*=Steel-Blue_Gel-Coat]').hide();
									$('[myid*=Teal_Gel-Coat]').hide();

								}
								if(bp === 'fender'){
									$('[myid*=Black-Mist_Poli-Mist]').hide();
								}

								if(bp === 'fender-trim'){
									$('[myid*=Black-Mist_Poli-Mist]').hide();
								}

								if(bp === 'fender-pinstripes'){
									$('[myid*=Black-Mist_Poli-Mist]').hide();
								}

								if(bp === 'trailer-carpet' || bp === 'carpet'){
									$('.custom-color-palette').append('<div id="colorPaletteMessage" class="alert mx-3">The boat\'s interior carpet and the trailer\'s carpet must be the same color.</div>');
								}
								

								if(bp === 'seat-trim'){
									$('[myid*=Classic-Gold_VinylInsert-PinColor]').hide();
								}
								
								if(bp === 'seat-center'){
									$('[myid*=Classic-Gold_VinylInsert-PinColor]').hide();
								}

							}// END if SEGMENTNAME === 'Fisherman'

							if(SEGMENTNAME === 'Angler'){
								
								if(bp === 'inside-deck'){
									$('[myid*=Black-Mist_Poli-Mist]').hide();
									$('[myid*=Sunfire-Mist_Poli-Mist]').hide();
									$('[myid*=Jet-Black-Gel_Gel-Coat]').hide();
								}

								if(bp === 'console'){
									$('[myid*=Black-Mist_Poli-Mist]').hide();
									$('[myid*=Sunfire-Mist_Poli-Mist]').hide();
									$('[myid*=Jet-Black-Gel_Gel-Coat]').hide();
								}
								if(bp === 'deck-stripe'){;
									$('[myid*=Jet-Black-Gel_Gel-Coat]').hide();
								}
								if(bp === 'top-deck'){
									$('[myid*=Sunfire-Mist_Poli-Mist]').hide();
									$('[myid*=Jet-Black-Gel_Gel-Coat]').hide();
								}
								if(bp === 'hull-sides-and-outside-deck'){
									$('[myid*=Black-Mist_Poli-Mist]').hide();
									$('[myid*=Jet-Black-Gel_Gel-Coat]').hide();
								}
								if(bp === 'comanche-stripes-1-and-3'){
									$('[myid*=Jet-Black-Gel_Gel-Coat]').hide();
								}
								if(bp === 'comanche-stripe-2'){
									$('[myid*=Jet-Black-Gel_Gel-Coat]').hide();
								}
								if(bp === 'hull-pinstripes'){
									$('[myid*=Jet-Black-Gel_Gel-Coat]').hide();
								}
								if(bp === 'deck-pinstripes'){
									$('[myid*=Jet-Black-Gel_Gel-Coat]').hide();
								}

								if(bp === 'water-line' || bp === 'hull-waterline'){
									//$('[myid*=Black-Mist_Poli-Mist]').hide();
								}

								if(bp === 'hull-bottom'){

									// hide all poli mist colors
									$("[myid*=Poli-Mist]").hide();

									// hide specific gel coat colors
									$('[myid*=Aztec-Yellow_Gel-Coat]').hide();
									$('[myid*=Burgundy_Gel-Coat]').hide();
									$('[myid*=Mariner-Blue_Gel-Coat]').hide();
									$('[myid*=Steel-Blue_Gel-Coat]').hide();
									$('[myid*=Teal_Gel-Coat]').hide();
								}

								if(bp === 'fender'){
									$('[myid*=Black-Mist_Poli-Mist]').hide();
								}

								if(bp === 'fender-trim'){
									$('[myid*=Black-Mist_Poli-Mist]').hide();
								}

								if(bp === 'fender-pinstripes'){
									$('[myid*=Black-Mist_Poli-Mist]').hide();
								}

								if(bp === 'trailer-carpet' || bp === 'carpet'){
									$('.custom-color-palette').append('<div id="colorPaletteMessage" class="alert mx-3">The boat\'s interior carpet and the trailer\'s carpet must be the same color.</div>');
								}
								

								if(bp === 'seat-trim'){
									$('[myid*=Classic-Gold_VinylInsert-PinColor]').hide();
								}
								
								if(bp === 'seat-center'){
									$('[myid*=Classic-Gold_VinylInsert-PinColor]').hide();
								}

							} // END if SEGMENTNAME === 'Angler'

							if(SEGMENTNAME === 'Fish & Play'){

								if(bp === 'inside-deck'){
									$('[myid*=Black-Mist_Poli-Mist]').hide();
									$('[myid*=Sunfire-Mist_Poli-Mist]').hide();
									$('[myid*=Jet-Black-Gel_Gel-Coat]').hide();
								}
								if(bp === 'console'){
									$('[myid*=Black-Mist_Poli-Mist]').hide();
									$('[myid*=Sunfire-Mist_Poli-Mist]').hide();
									$('[myid*=Jet-Black-Gel_Gel-Coat]').hide();
								}
								if(bp === 'deck-stripe-2'){;
									$('[myid*=Jet-Black-Gel_Gel-Coat]').hide();
								}
								if(bp === 'top-deck'){
									$('[myid*=Sunfire-Mist_Poli-Mist]').hide();
									$('[myid*=Jet-Black-Gel_Gel-Coat]').hide();
								}
								if(bp === 'deck-pinstripes'){
									$('[myid*=Jet-Black-Gel_Gel-Coat]').hide();
								}
								if(bp === 'hull-sides-and-outside-deck'){
									$('[myid*=Black-Mist_Poli-Mist]').hide();
									$('[myid*=Jet-Black-Gel_Gel-Coat]').hide();
								}
								if(bp === 'comanche-stripes-1-and-3'){
									$('[myid*=Jet-Black-Gel_Gel-Coat]').hide();
								}
								if(bp === 'comanche-stripe-2'){
									$('[myid*=Jet-Black-Gel_Gel-Coat]').hide();
								}
								if(bp === 'hull-pinstripes'){
									$('[myid*=Jet-Black-Gel_Gel-Coat]').hide();
								}

								if(bp === 'water-line' || bp === 'hull-waterline'){
									//$('[myid*=Black-Mist_Poli-Mist]').hide();
								}

								if(bp === 'hull-bottom'){

									// hide all poli mist colors
									$("[myid*=Poli-Mist]").hide();

									// hide specific gel coat colors
									$('[myid*=Aztec-Yellow_Gel-Coat]').hide();
									$('[myid*=Burgundy_Gel-Coat]').hide();
									$('[myid*=Mariner-Blue_Gel-Coat]').hide();
									$('[myid*=Steel-Blue_Gel-Coat]').hide();
									$('[myid*=Teal_Gel-Coat]').hide();
								}

								if(bp === 'fender'){
									$('[myid*=Black-Mist_Poli-Mist]').hide();
								}

								if(bp === 'fender-trim'){
									$('[myid*=Black-Mist_Poli-Mist]').hide();
								}

								if(bp === 'fender-pinstripes'){
									$('[myid*=Black-Mist_Poli-Mist]').hide();
								}

								if(bp === 'trailer-carpet' || bp === 'carpet'){
									$('.custom-color-palette').append('<div id="colorPaletteMessage" class="alert mx-3">The boat\'s interior carpet and the trailer\'s carpet must be the same color.</div>');
								}
								

								if(bp === 'seat-trim'){
									$('[myid*=Classic-Gold_VinylInsert-PinColor]').hide();
								}
								
								if(bp === 'seat-center'){
									
									var foo = bcd.find((o) => { return o["part"] === 'trailer-carpet' });
									var currCarpetColor = foo.color;
									var currCarpetColorDisplayName = foo.color;

									foo = bcd.find((o) => { return o["part"] === 'seat-center' });
									var currSeatCenterColor = foo.color;

									if(currCarpetColor === 'Shadow-Gray_Carpet' || currCarpetColor === 'Storm-Gray_Carpet' || currCarpetColor === 'Black_Carpet'){

										// hide all swatches:
										for(var gct = 0; gct < colorTypeList.length; gct++){
											var selectorName = "[myid*=" + colorTypeList[gct] + "]";
											$(selectorName).hide();
										}

										// show certain colors:
										//$('[myid*=Silver-Weave_VinylInsert-PinColor]').show();
										$('[myid*=Meteor-D_VinylInsert-PinColor]').show();
										$('.custom-color-palette').append('<div id="colorPaletteMessage" class="alert alert-primary mx-3">Because <b>' + currCarpetColor.split('_')[0].replaceAll('-', ' ') + '</b> is selected for Carpet, Meteor D is the only color available for seat center.</div>');
										//if(currSeatCenterColor !== 'Meteor-D_VinylInsert-PinColor' && currSeatCenterColor !== 'Silver-Weave_VinylInsert-PinColor'){
											$('#Meteor-D_VinylInsert-PinColor-btn').click();
										//}
										


 									} else if(currCarpetColor === 'Beige_Carpet'){
										
										// hide all swatches:
										for(var gct = 0; gct < colorTypeList.length; gct++){
											var selectorName = "[myid*=" + colorTypeList[gct] + "]";
											$(selectorName).hide();
										}
										// show certain colors:
										//$('[myid*=Silver-Weave_VinylInsert-PinColor]').show();
										$('[myid*=Taupe-D_VinylInsert-PinColor]').show();
										$('.custom-color-palette').append('<div id="colorPaletteMessage" class="alert alert-primary mx-3">Because <b>' + currCarpetColor.split('_')[0].replaceAll('-', ' ') + '</b> is selected for Carpet, Taupe D is the only color available for seat center.</div>');
										//if(currSeatCenterColor !== 'Taupe-D_VinylInsert-PinColor' && currSeatCenterColor !== 'Silver-Weave_VinylInsert-PinColor'){
											$('#Taupe-D_VinylInsert-PinColor-btn').click();
										//}
										

									}
									
								}



							} // END if SEGMENTNAME === 'Fish & Play'

							if(SEGMENTNAME === 'Z500/Z100 Series'){

								
								if(bp === 'inside-deck'){
									$('[myid*=Black-Mist_Poli-Mist]').hide();
									$('[myid*=Sunfire-Mist_Poli-Mist]').hide();
									$('[myid*=Jet-Black-Gel_Gel-Coat]').hide();
								}
								
								if(bp === 'console'){
									$('[myid*=Black-Mist_Poli-Mist]').hide();
									$('[myid*=Sunfire-Mist_Poli-Mist]').hide();
									$('[myid*=Jet-Black-Gel_Gel-Coat]').hide();
								}
								if(bp === 'deck-stripe'){;
									$('[myid*=Jet-Black-Gel_Gel-Coat]').hide();
								}
								if(bp === 'top-deck'){

									$('[myid*=Sunfire-Mist_Poli-Mist]').show();
									$('[myid*=Winter-Green-Mist_Poli-Mist]').show();
								}
								if(bp === 'deck-pinstripes'){
									$('[myid*=Jet-Black-Gel_Gel-Coat]').hide();
								}
								if(bp === 'hull-sides-and-outside-deck'){
									$('[myid*=Black-Mist_Poli-Mist]').hide();
									$('[myid*=Jet-Black-Gel_Gel-Coat]').hide();
								}
								if(bp === 'comanche-stripes-1-and-3'){
									$('[myid*=Jet-Black-Gel_Gel-Coat]').hide();
								}
								if(bp === 'comanche-stripe-2'){
									$('[myid*=Je≈t-Black-Gel_Gel-Coat]').hide();
								}
								if(bp === 'hull-pinstripes'){
									$('[myid*=Jet-Black-Gel_Gel-Coat]').hide();
								}

								if(bp === 'water-line' || bp === 'hull-waterline'){
									//$('[myid*=Black-Mist_Poli-Mist]').hide();
								}

								if(bp === 'hull-bottom'){

									// hide all poli mist colors
									$("[myid*=Poli-Mist]").hide();

									// hide specific gel coat colors
									$('[myid*=Aztec-Yellow_Gel-Coat]').hide();
									$('[myid*=Burgundy_Gel-Coat]').hide();
									$('[myid*=Mariner-Blue_Gel-Coat]').hide();
									$('[myid*=Steel-Blue_Gel-Coat]').hide();
									$('[myid*=Teal_Gel-Coat]').hide();
								}

								if(bp === 'fender'){
									$('[myid*=Black-Mist_Poli-Mist]').hide();
								}

								if(bp === 'fender-trim'){
									$('[myid*=Black-Mist_Poli-Mist]').hide();
								}

								if(bp === 'fender-pinstripes'){
									$('[myid*=Black-Mist_Poli-Mist]').hide();
								}

								
								if(bp === 'trailer-carpet' || bp === 'carpet'){
									$('.custom-color-palette').append('<div id="colorPaletteMessage" class="alert mx-3">The boat\'s interior carpet and the trailer\'s carpet must be the same color.</div>');
								}

								
								if((bp === 'hull-sides' || bp === 'inside-deck') && (BOATNAME === 'Z185')){
									$('.custom-color-palette').append('<div id="colorPaletteMessage" class="alert mx-3">The boat\'s Hull Sides and Inside Deck must be the same color.</div>');
								}

								if(bp === 'seat-trim'){
									$('[myid*=Classic-Gold_VinylInsert-PinColor]').hide();
								}

							} // END if SEGMENTNAME === ''Z500/Z100 Series'

						} // end IF
					} // end showPartColorPalette



					







					/*................................

					//////////////////////////////////
					//////////////////////////////////
					//////////////////////////////////
					//////////////////////////////////
					//////                      //////
					//////   BEGIN EXECUTION!   //////
					//////                      //////
					//////////////////////////////////
					//////////////////////////////////
					//////////////////////////////////
					//////////////////////////////////

					................................*/


					initBoatImage(); // load the boat image
					buildComboSwatches(); // create COMBO swatches

					var allowPremium = false;
					var allowElite = false;
					var costVal = 0;
					var costText = "No&nbsp;Charge";

					setPartMenuTabs(); //create all part tabs
					buildCustomColorPalette(); // create custom palette COLOR swatches
					buildLogoPalette(); // create custom LOGO palette
					buildWheelPalette(); // create custom WHEEL palette

					var prevBoatPart = boatPart;

					navclear();
					groupclear();
					//paletteclear();

					$('#deck-parts-stack').show();
					$('#deck-tab').addClass('selected');
					$(".parts").show();
					$(".part-groups").show();

					$("#deck-tab").on(clickEventType, function(){

						groupclear();
						$(this).addClass('selected'); 
						$('#deck-parts-stack').show();
						var boatPart = DeckGroupArray[0];
						//showPartColorPalette(boatPart);
						if(typeof boatPart !== "undefined"){
							$('#' + boatPart + "-btn").trigger(clickEventType);
						}

					});

					$("#hull-tab").on(clickEventType, function(){

						groupclear();
						$(this).addClass('selected'); 
						$('#hull-parts-stack').show();
						var boatPart = HullGroupArray[0];
						//showPartColorPalette(boatPart);
						if(typeof boatPart !== "undefined"){
							$('#' + boatPart + "-btn").trigger(clickEventType);
						}

					});

					$("#interior-tab").on(clickEventType, function(){

						groupclear();
						$(this).addClass('selected'); 
						$('#interior-parts-stack').show();
						var boatPart = InteriorGroupArray[0];
						//showPartColorPalette(boatPart);
						if(typeof boatPart !== "undefined"){
							$('#' + boatPart + "-btn").trigger(clickEventType);
						}

					});

					$("#trailer-tab").on(clickEventType, function(){

						groupclear();
						$(this).addClass('selected'); 
						$('#trailer-parts-stack').show();
						var boatPart = TrailerGroupArray[0];
						//showPartColorPalette(boatPart);
						if(typeof boatPart !== "undefined"){
							$('#' + boatPart + "-btn").trigger(clickEventType);
						}

					});

					boatPart = DeckGroupArray[0];

					//showSelectedPartColor(boatPart);

					var mybutton = ''
					//console.log(boatPart);
					if(typeof boatPart !== "undefined"){
						if(boatPart.indexOf("#") == -1){
							mybutton += "#";
						}
						mybutton += boatPart + "-btn";

						$(mybutton).addClass('selected');

					}
					
					$("#deck-tab").trigger(clickEventType);

					// combo click function 
					$('.comboButton').on(clickEventType, function() {

						var comboname = $(this).attr("desc");
						var myid = $(this).attr("id");
						var colorprice = $(this).attr("cost");
						var combobtn = '#'+myid;
						var comboID = myid.replaceAll('-btn','');

						$('.comboButton').removeClass('selected');

						$(combobtn).addClass('selected');

						// apply the combo colors to the boat
						combomatic(comboID, combobtn);

						// remove selected class from all colorOptions
						$('.ranger-colorOption-header').removeClass('selected');
						
						// apply selected class to this clicked colorOption
						$('.comboButton.selected').parents('.ranger-colorOption').children('.ranger-colorOption-header').addClass('selected');

						// store the id of this combo for later
						localStorage.setItem('byoRanger-selectedComboID', myid)
						//console.log('setting bcd line 2267')
						setBuildColorData();

						previousColorData.selectedColorOption = $('.ranger-colorOption-header.selected').attr('id');
						previousColorData.combo.name = myid;
						previousColorData.combo.variation = "";
						previousColorData.combo.additionalCost = colorprice;

						previousColorData.colors = colorData;

						var buildColorData = JSON.stringify(previousColorData);
						
						// remove # symbols from the data
						buildColorData = buildColorData.replace(/#/g, "");

						updateSumCol();
						updateColorConfigDisplay();
						$('#bab-mainimage-container').show();

					});

					// part button click function
					$('.part-button').on(clickEventType, function() {

						var myBoatPart = $(this).attr("value");

						console.log("looking for: "+myBoatPart)

						partclear();	
						// hight this part button
						$(this).addClass('selected');
							
						// pull out the current color configuration from local storage
						var buildColorData = localStorage.getItem("byoRanger-buildColorData"); 
						
						// remove # symbols from the data
						buildColorData = replaceAll(buildColorData, "#", "");
						
						// parse it
						buildColorData = JSON.parse(buildColorData);
						console.log(buildColorData);
						bcd = buildColorData.colorData;
						
						if(myBoatPart  != 'wheels') {

							// find the color currently applied to the part
							var q = bcd.find((o) => { return o["part"] === myBoatPart });
							
							if(typeof q.color !== 'undefined') {
								// display the selected color name
								var thisCT = q.color;
								var colorDisplayName = q.color.split('_')[0].replaceAll('-', ' ')
								thisCT = thisCT.split('_')[1].replaceAll('-', ' ');
								if(thisCT === 'VinylInsert PinColor' || thisCT === 'Main Vinyl' || thisCT === 'Reata Main Color Vinyls'){
									thisCT = "Seat Vinyl"
								}
								$('.selectedColorInfo').html(colorDisplayName + ' <span class="text-muted">(' + thisCT + ')</span>' ) ;
								$('#'+q.color + '-btn').click();
							}

							showPartColorPalette(myBoatPart);

						} else if(myBoatPart === 'wheels') {

							// find the color currently applied to the part
							var q = bcd.find((o) => { return o["part"] === myBoatPart });
							
							if(typeof q.color !== 'undefined') {
								// display the selected color name
								var colorDisplayName = q.color.replaceAll('-', ' ')
								var thisCT = "Wheels";
								$('.selectedColorInfo').html(colorDisplayName + ' <span class="text-muted">(' + thisCT + ')</span>' ) ;
								$('#'+q.color + '-btn').click();
							}
							displayWheelColorPalette();

						}

					});





					





					// color buttons function
					$('.colorButton').on(clickEventType ,function() {

						var currBoatPart = $('.part-button.selected').attr('value');
						
						// flip boolean to 1 indicating custom color selection has been made
						localStorage.setItem('byoRanger-ccHasChanged', 1);
						
						// wipe selected class from all colorButtons
						$(".colorButton").attr("class", "colorButton");
				
						
						// highlight this clicked button
						var colorbtn = '#'+$(this).attr("id");
						$(colorbtn).attr("class", "colorButton selected");
						//$(this).parent().attr('class', 'colorButtonDiv selected')

						
						var thisColor = $(this).attr("id").replace('-btn','');

						// RULE: Trailer and interior carpet must be the same color.
						if(currBoatPart === 'carpet' || currBoatPart || 'trailer-carpet'){
							if(currBoatPart === 'carpet') {
								setBuildColorData(thisColor, 'trailer-carpet');
								paintomatic(thisColor, 'trailer-carpet', 'owl-bmt-');
								paintomatic(thisColor, 'trailer-carpet', 'cc-bmt-');
								paintomatic(thisColor, 'trailer-carpet', 'owl-side-');
								paintomatic(thisColor, 'trailer-carpet', 'cc-side-');
								paintomatic(thisColor, 'trailer-carpet', 'owl-oh-');
								paintomatic(thisColor, 'trailer-carpet', 'cc-oh-');
							}
							if(currBoatPart === 'trailer-carpet'){
								setBuildColorData(thisColor, 'carpet');
								paintomatic(thisColor, 'carpet', 'owl-bmt-');
								paintomatic(thisColor, 'carpet', 'cc-bmt-');
								paintomatic(thisColor, 'carpet', 'owl-side-');
								paintomatic(thisColor, 'carpet', 'cc-side-');
								paintomatic(thisColor, 'carpet', 'owl-oh-');
								paintomatic(thisColor, 'carpet', 'cc-oh-');
							}
						}

						// RULE: Hull Sides and Inside Deck must be same color for the Z185, Z518, and Z518 Cup
						if((currBoatPart === 'hull-sides' || currBoatPart === 'inside-deck') && (BOATNAME === 'Z185')){
							if(currBoatPart === 'hull-sides') {
								setBuildColorData(thisColor, 'inside-deck');
								paintomatic(thisColor, 'inside-deck', 'owl-bmt-');
								paintomatic(thisColor, 'inside-deck', 'cc-bmt-');
								paintomatic(thisColor, 'inside-deck', 'owl-side-');
								paintomatic(thisColor, 'inside-deck', 'cc-side-');
								paintomatic(thisColor, 'inside-deck', 'owl-oh-');
								paintomatic(thisColor, 'inside-deck', 'cc-oh-');
							}
							if(currBoatPart === 'inside-deck'){
								setBuildColorData(thisColor, 'hull-sides');
								paintomatic(thisColor, 'hull-sides', 'owl-bmt-');
								paintomatic(thisColor, 'hull-sides', 'cc-bmt-');
								paintomatic(thisColor, 'hull-sides', 'owl-side-');
								paintomatic(thisColor, 'hull-sides', 'cc-side-');
								paintomatic(thisColor, 'hull-sides', 'owl-oh-');
								paintomatic(thisColor, 'hull-sides', 'cc-oh-');
							}
						}



						
						// RULE: Hull Pinstripe and Deck Pinstripe must be same color for Ranger Saltwater Bay Ranger
						if((currBoatPart === 'hull-pinstripe' || currBoatPart === 'deck-pinstripe') && (SEGMENTNAME === 'Bay Ranger')){
							if(currBoatPart === 'hull-pinstripe') {
								setBuildColorData(thisColor, 'deck-pinstripe');
								paintomatic(thisColor, 'deck-pinstripe', 'owl-bmt-');
								paintomatic(thisColor, 'deck-pinstripe', 'cc-bmt-');
								paintomatic(thisColor, 'deck-pinstripe', 'owl-side-');
								paintomatic(thisColor, 'deck-pinstripe', 'cc-side-');
								paintomatic(thisColor, 'deck-pinstripe', 'owl-oh-');
								paintomatic(thisColor, 'deck-pinstripe', 'cc-oh-');
							}
							if(currBoatPart === 'deck-pinstripe'){
								setBuildColorData(thisColor, 'hull-pinstripe');
								paintomatic(thisColor, 'hull-pinstripe', 'owl-bmt-');
								paintomatic(thisColor, 'hull-pinstripe', 'cc-bmt-');
								paintomatic(thisColor, 'hull-pinstripe', 'owl-side-');
								paintomatic(thisColor, 'hull-pinstripe', 'cc-side-');
								paintomatic(thisColor, 'hull-pinstripe', 'owl-oh-');
								paintomatic(thisColor, 'hull-pinstripe', 'cc-oh-');
							}
						}

						






						// paint the part
						paintomatic(thisColor, currBoatPart, 'owl-bmt-');
						paintomatic(thisColor, currBoatPart, 'owl-side-');
						paintomatic(thisColor, currBoatPart, 'owl-oh-');

						paintomatic(thisColor, currBoatPart, 'cc-bmt-');
						paintomatic(thisColor, currBoatPart, 'cc-side-');
						paintomatic(thisColor, currBoatPart, 'cc-oh-');

						// update the stored color data
						//console.log('setting bcd line 2385')
						setBuildColorData(thisColor, currBoatPart);

						// update the color config displayed
						updateColorConfigDisplay();

						//showSelectedPartColor(boatPart);

						// set name and price values
						selectedCombo = 'Custom Colors Applied';

						updateColorBoard();

					});

					
					$('.colorButton, .wheelButtonDiv').on( "mouseenter mouseleave", function(event) {

						var part = $('.part-button.selected').attr('value');

						var thisCT = $(this).attr("id").replace('-btn','');
						var wheels = false;

						try {
							if($(this).attr("myid").indexOf('_Wheels') > -1) { wheels = true; };
						}
						catch(err) {
							wheels = false;
						}
						
						
						if(event.type === 'mouseenter'){

							if(wheels){
								thisCT = 'Wheels'
							} else {
								thisCT = thisCT.split('_')[1].replaceAll('-', ' ');
							}

							if(thisCT === 'VinylInsert PinColor' || thisCT === 'Main Vinyl' || thisCT === 'Reata Main Color Vinyls'){
								thisCT = "Seat Vinyl"
							}

							
							$('.selectedColorInfo').html( $(this).attr('desc') + ' <span class="text-muted">(' + thisCT + ')</span>' );
								
							
							var mouseOverColor = $(this).attr("id").replace('-btn','');
							paintomatic(mouseOverColor,part,'cc-bmt-');
							paintomatic(mouseOverColor,part,'cc-side-');
							paintomatic(mouseOverColor,part,'cc-oh-');


						} else if(event.type === 'mouseleave'){
							
							// pull out the current color configuration from local storage
							var buildColorData = localStorage.getItem("byoRanger-buildColorData");
							// remove # symbols from the data
							buildColorData = replaceAll(buildColorData, "#", "");
							// parse it
							buildColorData = JSON.parse(buildColorData);
							bcd = buildColorData.colorData;
							
							// find the color currently applied to the part
							var q = bcd.find((o) => { return o["part"] === part });



							var currSelColor = q.color;

							if(wheels){
								var colorDisplayName = q.color.replaceAll('-', ' ')
							} else {
								var colorDisplayName = q.color.split('_')[0].replaceAll('-', ' ')
							}

							// display the selected color name
							var thisCT = q.color;
							
							if(wheels){
								thisCT = "Wheels"
							} else {	
								thisCT = thisCT.split('_')[1].replaceAll('-', ' ');
							}

							if(thisCT === 'VinylInsert PinColor' || thisCT === 'Main Vinyl' || thisCT === 'Reata Main Color Vinyls'){
								thisCT = "Seat Vinyl"
							}
							$('.selectedColorInfo').html(colorDisplayName + ' <span class="text-muted">(' + thisCT + ')</span>' ) ;
							
							// paint the part with the color
							paintomatic(currSelColor,part,'cc-bmt-');
							paintomatic(currSelColor,part,'cc-side-');
							paintomatic(currSelColor,part,'cc-oh-');
							
						}
					});

					// make sure we have standard packages, if so click the first swatch
					if($('.standard-color-palette .comboButtonDiv').length > 0){
						// yes, then click the first swatch
						$('.standard-color-palette .comboButtonDiv .comboButton').first().click();
					} else if($('.limited-edition-palette .comboButtonDiv').length > 0){
							// yes, then click the first swatch
							$('.limited-edition-palette .comboButtonDiv .comboButton').first().click();
							$('#colorOption-limitedEdition-container').show();
					} else {
						// no combos? then hide the standard color package option
						$('#colorOption-standard-color-packages').parent().hide();
					}

					// make sure we have limited edition packages, hide the option container
					if((!$('.limited-edition-palette .comboButtonDiv').length > 0)){
						// no combos? then hide the standard color package option
						$('#colorOption-limitedEdition').parent().hide();
					}

					// If there are now performance combos, hide the option container
					if(!($('.performance-color-palette .comboButtonDiv').length > 0)){
						// no combos? then hide the option
						$('#colorOption-performance-color-packages').parent().hide();
					}

					
					$('#btn-launch-custom-colors').on(clickEventType, function(){

							//console.log(colorData);
							// stores colorData to fallback to if the customer colors cancel button is clicked
							localStorage.setItem('byoRanger-fallbackColorOption', $('.ranger-colorOption-header.selected').attr('id'));
							localStorage.setItem('byoRanger-fallbackColorData', JSON.stringify(previousColorData));

							// boolean to keep track if user has made any custom color selections
							localStorage.setItem('byoRanger-ccHasChanged', 0);

							$('.build-a-boat').hide();
							$('.custom-color-ui').show();

							$('#colorOption-customColor').click();

							// scroll to the top
							$('html, body').animate({
								scrollTop: $('body').offset().top
							}, 500);

							$('.part-groups').children().first().trigger(clickEventType);

							// placing a copy of the color configuration display underneath the custom color interface
							if($('.custom-color-ui').html().indexOf('Your Current Color Configuration') === -1) {
								$('.custom-color-ui').append('<div class="row"><div class="col-sm-12 col-md-4 mx-auto currentColorBoard"></div><div class="col-sm-12 col-md-8 mx-auto">' + $('#bab-color-configuration').html() + '</div></div>');
								updateColorBoard();
							}

							updateColorConfigDisplay();

						
					});


					// Defining the click action on the SAVE button in the custom color palette
					$('#btn-saveCustomColors').on(clickEventType, function(){

						$('.build-a-boat').show();
						$('.custom-color-ui').hide();

						$('#btn-nextStep').click();

						$('#btn-launch-custom-colors').html('Launch Custom Colors');

						// scroll to the top
						$('html, body').animate({
							scrollTop: $('body').offset().top
						}, 500);

					});

					// Hotwire the CANCEL button in the custom color palette
					$('#btn-cancelCustomColors').on(clickEventType, function(){

						//$('#btn-launch-custom-colors').html('Launch Custom Colors');

						// did the user make any color selections while in custom color mode
						if(localStorage.getItem('byoRanger-ccHasChanged')){

							// fall back to previous color data - overwrite the stored color data with the color data that was defined before making custom selections.
							var coID = localStorage.getItem('byoRanger-fallbackColorOption'),
								fallbackComboID = localStorage.getItem('byoRanger-selectedComboID'),
								cd = localStorage.getItem('byoRanger-fallbackColorData');
							localStorage.setItem("byoRanger-buildColorData", cd);
							previousColorData = JSON.parse(cd);

							// if the previous color config was a combo selection, click it
							if(coID !== 'colorOption-customColor'){
								$('.comboButton[id*="'+fallbackComboID+'"]').click();
							}

							// flip the custom colors has changed flag back to false
							localStorage.setItem('byoRanger-ccHasChanged', 0);

						}
						
						// hide the custom color interface, and show the build interface
						$('.custom-color-ui').hide();
						$('.build-a-boat').show();


						// scroll to the top
						$('html, body').animate({
							scrollTop: $('body').offset().top
						}, 500);


					});
					
					// define what happens when a part on the boat image in custom colors is clicked upon
					//console.log('#cc-' + localStorage.getItem('productVarName') + '-layers path')

					$('.part-path').click(function(){

						var pathID = $(this).attr('id');
						var partID = replaceAll(pathID, 'cc-', '');
						partID = replaceAll(partID, 'bmt-', '');
						partID = replaceAll(partID, 'side-', '');
						partID = replaceAll(partID, 'oh-', '');
						var partString = partID.toLowerCase();

						if(partID !== '' && partID != null){

							groupclear();
							//paletteclear();

							// click the appropriate tab
							if(partString.indexOf("deck") !== -1){
								$('#deck-tab').addClass('selected');
								$('#deck-parts-stack').show();

							} else if(partString.indexOf("hull") !== -1){
								$('#hull-tab').addClass('selected');
								$('#hull-parts-stack').show();

							} else if(partString.indexOf("interior" !== -1)){
								$('#interior-tab').addClass('selected');
								$('#interior-parts-stack').show();

							} else if(partString.indexOf("trailer" !== -1)){
								$('#trailer-tab').addClass('selected');
								$('#trailer-parts-stack').show();

							} else if(partString === 'Console'){
								$('#deck-tab').addClass('selected');
								$('#deck-parts-stack').show();

							}

							$('#' + partID + '-btn').click();

						}

					});
					
					
					// what happens when we click on a color option header.
					$('.ranger-colorOption-header').on(clickEventType, function(){
						
						var coID = $(this).attr('id');
						var coLen = $('.ranger-colorOption-header').length;

						if(coID === 'colorOption-customColor'){
							localStorage.setItem('byoRanger-fallbackColorOption', $('.ranger-colorOption-header.selected').attr('id'));
						}

						// clear any previously selected options
						$('.ranger-colorOption-header').each(function(i){
							
							$(this).removeClass('selected');
							
							// if we have reached the end of our each loop
							if(i === coLen-1){
								
								// now highlight this color option
								$('#'+coID).addClass('selected');
								
								// if we clicked on standard color packages, click the first combo button found in it
								if(coID === 'colorOption-standard-color-packages'){
									$('.standard-color-palette .comboButtonDiv .comboButton').first().click();
								}
								
								// if we clicked on limited edition color packages, click the first combo button found in it
								if(coID === 'colorOption-limitedEdition'){
									$('.limited-edition-palette .comboButtonDiv .comboButton').first().click();
								}
								
								// if we clicked on fusion electra color packages, click the first combo button found in it
								if(coID === 'colorOption-fusionElectra'){
									$('.fusion-electra-palette .comboButtonDiv .comboButton').first().click();
								}
								
								// if we clicked on reata white color packages, click the first combo button found in it
								if(coID === 'colorOption-reataWhite'){
									$('.reata-white-palette .comboButtonDiv .comboButton').first().click();
								}
								
								// if we clicked on reata mist color packages, click the first combo button found in it
								if(coID === 'colorOption-reataMist'){
									$('.reata-mist-palette .comboButtonDiv .comboButton').first().click();
								}
								
								// if we clicked on reata fusion color packages, click the first combo button found in it
								if(coID === 'colorOption-reataFusion'){
									$('.reata-fusion-palette .comboButtonDiv .comboButton').first().click();
								}

								// if we clicked on custom color your ranger, remove any combo selections and update info displayed
								if(coID === 'colorOption-customColor'){
									$('.comboButton.selected').removeClass('selected');
									updateColorConfigDisplay();
									updateSumCol();
								}
							}
						});
						
					});

					// trigger a click on the first combo swatch
					if(typeof $('.comboButton.selected').attr('id') == 'undefined'){
						// let's trigger a click on the first combo on the page.
						if($('.comboButton').length > 0){
							$('.comboButton').first().trigger(clickEventType);
						}
					}

					// "BASE MODEL SHOWN" Message:
					if(BOATNAME === 'Z521L Ranger Cup Equipped' || BOATNAME === '621FS Ranger Cup Equipped'){
						$('.ccDescription').prepend('<div class="text-center text-muted mb-3" style="line-height:1; ">Base model image shown for color illustration purposes only.</b></div>');
						$('#bab-mainimage-container').append('<div class="text-center text-muted mb-3" style="line-height:1; ">Base model image shown for color illustration purposes only.</b></div>');
					}


					// The Z519 Ranger Cup model is shown for these models 
					if(BOATNAME === 'Z518' || BOATNAME === 'Z518 Ranger Cup Equipped' || BOATNAME === 'Z519'){
						$('.ccDescription').prepend('<div class="text-center text-muted mb-3" style="line-height:1; ">The Z519 Ranger Cup model image is shown for color illustration purposes only.</b></div>');
						$('#bab-mainimage-container').append('<div class="text-center text-muted mb-3" style="line-height:1; ">The Z519 Ranger Cup model image is shown for color illustration purposes only.</b></div>');
					}


					// This is for the 2023 55th anniversary model only ... remove when obsolete
					if(BOATID === 6736){
						$('.svgImageContainer').append('<div class="text-center text-muted mb-3" style="line-height:1; ">Z521R 55th Anniversary Limited Edition Model Shown for representation.</b></div>');
					}

					

					if(BOATNAME === '1850MS' || BOATNAME === '2050MS'){
						if(MODELYEAR < 2024){
							$('.ccDescription').prepend('<div class="text-center text-muted mb-3" style="line-height:1; ">Showing the 212LS for color illustration purposes only.</b></div>');
							$('#bab-mainimage-container').append('<div class="text-center text-muted mb-3" style="line-height:1; ">Showing the 212LS for color illustration purposes only.</b></div>');
						} else if(MODELYEAR >= 2024){
							if(BOATNAME === '1850MS'){
								$('.ccDescription').prepend('<div class="text-center text-muted mb-3" style="line-height:1; ">Showing the 2050MS for color illustration purposes only.</b></div>');
								$('#bab-mainimage-container').append('<div class="text-center text-muted mb-3" style="line-height:1; ">Showing the 2050MS for color illustration purposes only.</b></div>');
							}
						}
					}
						

					if(BOATNAME === '620FS Pro' || BOATNAME === '620FS Ranger Cup Equipped' || BOATNAME === '622FS Pro'){
						$('.ccDescription').prepend('<div class="text-center text-muted mb-3" style="line-height:1; ">Showing the 621FS Pro for color illustration purposes only</b></div>');
						$('#bab-mainimage-container').append('<div class="text-center text-muted mb-3" style="line-height:1; ">Showing the 621FS Pro for color illustration purposes only.</b></div>');
					}

					if(BOATNAME === '2510 Bay' || BOATNAME === '2360 Bay' || BOATNAME === '2600 Bay'){
						$('.ccDescription').prepend('<div class="text-center text-muted mb-3" style="line-height:1; ">Showing the 2660 Bay for color illustration purposes only</b></div>');
						$('#bab-mainimage-container').append('<div class="text-center text-muted mb-3" style="line-height:1; ">Showing the 2660 Bay for color illustration purposes only.</b></div>');
					}




					if(BOATNAME === 'Z521'){
						$('.ccDescription').prepend('<div class="text-center text-muted mb-3" style="line-height:1;">Showing the Z520 for color illustration purposes only</b></div>');
						$('#bab-mainimage-container').append('<div class="text-center text-muted mb-3" style="line-height:1;">Showing the Z520 for color illustration purposes only.</b></div>');
					}

					if(BOATNAME === '620FS Garmin Ranger Cup Equipped'){
						$('.ccDescription').prepend('<div class="text-center text-muted mb-3" style="line-height:1;">Showing the 620FS Ranger Cup for color illustration purposes only</b></div>');
						$('#bab-mainimage-container').append('<div class="text-center text-muted mb-3" style="line-height:1;">Showing the 620FS Ranger Cup for color illustration purposes only.</b></div>');
					}

					if(BOATNAME === '621FS Garmin Ranger Cup Equipped'){
						$('.ccDescription').prepend('<div class="text-center text-muted mb-3" style="line-height:1;">Showing the 621FS Ranger Cup for color illustration purposes only</b></div>');
						$('#bab-mainimage-container').append('<div class="text-center text-muted mb-3" style="line-height:1;">Showing the 621FS Ranger Cup for color illustration purposes only.</b></div>');
					}


					$('.wheelButtonDiv').on('click', function(){

						// get the wheel name
						var thisWheelName = $(this).attr('data-wheelName');

						// remove selected class from all wheel buttons
						$('.wheelButtonDiv').attr("class", "wheelButtonDiv");

						// add selected class to this wheel button
						$(this).attr("class", "wheelButtonDiv selected");

						// change the wheel overlay images
						wheelomatic(thisWheelName,'cc-');
						wheelomatic(thisWheelName,'owl-');

						// flip boolean to 1 indicating custom color selection has been made
						localStorage.setItem('byoRanger-ccHasChanged', 1);
						
						// update the stored color data
						//console.log('setting bcd line 2385')
						setBuildColorData(thisWheelName, 'wheels');

						// update the color config displayed
						updateColorConfigDisplay();

						// set name and price values
						selectedCombo = 'Custom Colors Applied';

					});



					


					// set color config description
					$('.yourCurrentColorConfigDesc').html('Click a part name below to edit the color assigned to it.');
		
				
					// ranger specific - loading the build color selections
					if(JSON.stringify(retrievedBuildJSON) !== '{}'){

						waitForElementToExist('.bab-sum-col #selected-options-items', function(){
							
							var x = JSON.parse(retrievedBuildJSON.colorOptions);

							localStorage.setItem('byoRanger-buildColorData', JSON.stringify(x));
							
							if(typeof x.selectedColorOption !== 'undefined'){
								
								// if the build is a combo selection, click the color combo
								if(x.selectedColorOption !== 'colorOption-customColor' && typeof x.combo.name !== 'undefined'){
									$('#'+x.combo.name+'-btn').click();
								}

								// if the build has custom colors, load the custom colors
								if(x.selectedColorOption === 'colorOption-customColor'){

									// click the custom colors option button
									$('#colorOption-customColor').click();




									// paint All The Parts!
									for (var i = 0; i < x.colorData['length']; i++) {

										var boatpart = x.colorData[i].part;
										var color = x.colorData[i].color;

										if((typeof color !== "undefined") && (typeof boatpart !== "undefined")){
											if((color !== null) && (boatpart !== null)){ 
					
												if(boatpart.indexOf('#') !== -1){
													boatpart = boatpart.replace(/#/g, "");
												}
				
												if(color.indexOf('#') !== -1){
													color = color.replace(/#/g, "");
												}
				

												if(boatpart === 'wheels'){

													wheelomatic(color, 'cc-');
													wheelomatic(color, 'owl-');

												} else {

													paintomatic(color, boatpart, 'owl-bmt-');
													paintomatic(color, boatpart, 'owl-side-');
													paintomatic(color, boatpart, 'owl-oh-');

													paintomatic(color, boatpart, 'cc-bmt-');
													paintomatic(color, boatpart, 'cc-side-');
													paintomatic(color, boatpart, 'cc-oh-');
				

												}
											}
										}

									}

									// update the color config displayed
									updateColorConfigDisplay();

									//setBuildColorData();

									// set name and price values
									selectedCombo = 'Custom Colors Applied';

								}
							}
							$('#loader').hide();
							if(localStorage.setItem("hasColorOptions") === 'yes') { $('.custom-build-nav-item[data-babStep="color"]').show(); }

						});
					} else {
						$('#loader').hide();
						if(localStorage.getItem("hasColorOptions") === 'yes') { $('.custom-build-nav-item[data-babStep="color"]').show(); }
					}

					var makeImageBig = function(){
						
						$('.build-a-boat').prepend('<div class="small-12 cell" id="enlargedImage">' + $('#bab-mainimage-container').html() + '</div>');
						$('#bab-mainimage-container').html('')
						$('#btn-enlargeProductImage').hide();
						$('#btn-reduceProductImage').show();
						$('#btn-reduceProductImage').bind(clickEventType, function(){
							makeImageSmall();
						});

						// scroll to the top
						$('html, body').animate({
							scrollTop: $('body').offset().top
						}, 500);

						$('#btn-show-sumColSIDE').click(function(){
							$('#sum-col-oh').hide();
							$('#sum-col-bmt').hide();
							$('#sum-col-side').hide().fadeIn();
						});

						$('#btn-show-sumColOH').click(function(){
							$('#sum-col-side').hide();
							$('#sum-col-bmt').hide();
							$('#sum-col-oh').hide().fadeIn();
						});

						$('#btn-show-sumColBMT').click(function(){
							$('#sum-col-side').hide();
							$('#sum-col-oh').hide();
							$('#sum-col-bmt').hide().fadeIn();
						});
						
					}

					var makeImageSmall = function(){
					
						$('#bab-mainimage-container').html($('#enlargedImage').html());
						$('#enlargedImage').html('');
						$('#btn-enlargeProductImage').show();
						$('#btn-reduceProductImage').hide();
						$('#btn-enlargeProductImage').bind(clickEventType, function(){
							makeImageBig();
						});
						
						// scroll to the top
						$('html, body').animate({
							scrollTop: $('body').offset().top
						}, 500);

						$('#btn-show-sumColSIDE').click(function(){
							$('#sum-col-oh').hide();
							$('#sum-col-bmt').hide();
							$('#sum-col-side').hide().fadeIn();
						});

						$('#btn-show-sumColOH').click(function(){
							$('#sum-col-side').hide();
							$('#sum-col-bmt').hide();
							$('#sum-col-oh').hide().fadeIn();
						});
						
						$('#btn-show-sumColBMT').click(function(){
							$('#sum-col-side').hide();
							$('#sum-col-oh').hide();
							$('#sum-col-bmt').hide().fadeIn();
						});

					
					}

					$('#bab-mainimage-container').append('<div class="text-center m-0"><div class="small button hollow m-0 text-black" id="btn-enlargeProductImage">Enlarge Image</b></div></div><div class="text-right m-0"><div class="small button m-0 hollow text-black" id="btn-reduceProductImage">Reduce Image</div></div>');

					$('#btn-enlargeProductImage').bind(clickEventType, function(){
						makeImageBig();
					});

					$('#btn-reduceProductImage').bind(clickEventType, function(){
						makeImageSmall();
					});

					$('#btn-reduceProductImage').hide();

					// special consideration for the 2023 55th anniversary edition boats
					if(BOATID === 6736 || BOATID === 6735){

						// hide custom colors
						$('#colorOption-customColor-container').hide();
						// hide the enlarge button
						$('#btn-enlargeProductImage').hide()


					}
					
					// There are no packages available for saltwater boats - it is all custom coloring. So, let's hide the package option.
					if(SEGMENTNAME === 'Bay Ranger'){
						$('#colorOption-standard-color-packages-container').hide();
						$('#colorOption-customColor').click();
						updateSumCol();
					}

					
					

				});
			});

		});

	});

}); 
