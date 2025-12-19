// initializing simple vars
window.swatchConcatenation = '',
window.preloadImageList = '',
window.colorCtr = 0,
window.colorOptionsPath =  getColorOptionsPath();
window.nitroBYOAssetsPath = localStorage.getItem("byoModelAssetsPath") + "byo-assets/";
window.definitionsFile = localStorage.getItem("byoDefinitionsPath");
window.getPageFile = location.pathname.substring(1);
window.boatid = null;
window.boatModelParts = [];
window.colorPath = "/content/dam/nitro/2021/color-swatches/";
window.logoFiles = [];
window.allowCustom = [];
window.allowedCombosPremium = [];
window.allowedCombosElite = [];
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
localStorage.setItem("byoNitro-selectedComboID", "");
localStorage.setItem("byoNitro-ccHasChanged", 0);
localStorage.setItem("byoNitro-fallbackColorOption", "");
localStorage.setItem("byoNitro-fallbackColorData", "");
localStorage.setItem("byoNitro-buildColorData", "");
//console.log('buildColorData set to empty ... ');

// load layers.svg 
var productSVGfile = nitroBYOAssetsPath + 'layers.svg';


// load layers.svg into the custom color color ui view
$("#custom-colors-bmt").load(productSVGfile, function(responseTxt, statusTxt, xhr){
	
	// change the id values in this file so they don't step on the toes of the second instance.
	var ccSVGImage = replaceAll($("#custom-colors-bmt").html(), 'id="', 'id="cc-');
	ccSVGImage = replaceAll(ccSVGImage, 'url(#filter-1', 'url(#cc-filter-1');

	// insert the cc instance
	$("#custom-colors-bmt").html(ccSVGImage);


	// load the second instance of layers.svg into the main
	$(".svgImageContainer").load(productSVGfile, function(responseTxt, statusTxt, xhr){
		//console.log("productSVGfile second instance loaded ... ")
		
		// load up all definitions like the list of colors, combos, color types, etc.
		////////$.getScript('/content/dam/wrmg/nitro/' + MODELYEAR + '/definitions.js').done(function(script,textStatus,jqxhr){
		console.log(definitionsFile);
        //debugger
		$.getScript(definitionsFile).done(function(script,textStatus,jqxhr){
		//console.log("definitions.js loaded ... ")

		var defs = 'defs.js';

			// load up the definitions specific to the current model. When the defs.js file is loaded, then the rest is good to execute
			$.getScript(nitroBYOAssetsPath + defs, function(data) {
				
				console.log(nitroBYOAssetsPath + defs + " loaded ... ");
				
				// injecting a stylesheet
				$('head').append('<link rel="stylesheet" href="/content/dam/wrmg/nitro/css/byo-nitro-additionalStyles.css" type="text/css" />');
				
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
					$('body').append(setdefs);
				}
				setSVGDefs();

				// get partArrayID of given boat part from colorData array
				var getPartArrayID = function(myboatpart){

					if(myboatpart !== null && typeof myboatpart !== "undefined") {

						if(!myboatpart.includes("#")) myboatpart = "#" + myboatpart;

						if(colorData != null) {
							for ( i = 0; i < colorData.length; i++ ) {
								var thisPart = colorData[i].part;
								if (thisPart === myboatpart) {
									return i;
									break;
								}
							}
						}

					}
					return;
				}

				// set pattern fills in boat image
				// set up colorData
				var initBoatImage = function(){

					for (var i = 0; i < boatModelParts.length; i++) {

						var thisid = '#' + boatModelParts[i].id;
						var thisCCid = '#cc-' + boatModelParts[i].id;

						var urlpattern = 'url(#'+boatModelParts[i].id+'-pattern)';
						var urlpatternCC = 'url(#cc-'+boatModelParts[i].id+'-pattern)';

						$(thisid).css('fill',urlpattern);
						$(thisCCid).css('fill',urlpatternCC);

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

				// highlight selected piece
				var highlight = function(p,instance){

					instance = (typeof instance !== 'undefined') ?  instance : '';



					var h1 = highlightColor1;
					var h2 = highlightColor2;
					var p = instance + boatPart;
					var prevColor = $('#'+p+'-pattern image').attr('xlink:href');

					colorList.forEach( function(c){
						if(c.color === highlightColor1){
							h1 = c.colorImageURL;
						}
						if(c.color === highlightColor2){
							h2 = c.colorImageURL;
						}
					});
					var timer = 0;

					var inc = 100;

					// flip the color of the part between two predefined highlight colors delaying each color switch by 100 milliseconds increments
					setTimeout(function(){$('#'+p+'-pattern image').attr('xlink:href', h1);}, timer );
					timer += inc;
					setTimeout(function(){$('#'+p+'-pattern image').attr('xlink:href', h2);}, timer );
					timer += inc;
					setTimeout(function(){$('#'+p+'-pattern image').attr('xlink:href', h1);}, timer );
					timer += inc;
					setTimeout(function(){$('#'+p+'-pattern image').attr('xlink:href', h2);}, timer );
					timer += inc;
					setTimeout(function(){$('#'+p+'-pattern image').attr('xlink:href', prevColor);}, timer );

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
					var buildColorData = localStorage.getItem("byoNitro-buildColorData");
					
					// remove # symbols from the data
					buildColorData = replaceAll(buildColorData, "#", "");

					// parse it
					buildColorData = JSON.parse(buildColorData);

					var logoName = $('.logoButtonDiv.selected').attr("data-logoname"),
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
					}

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
						}, {
							name:"Graphic",
							parts: [ {"part": "logo", "logoName": logoName, "imageURL": imageURL}]
						}
					];


					for(var bmp = 0; bmp < boatModelParts.length; bmp++){
						//console.log(boatModelParts[bmp].partType)
						if(boatModelParts[bmp].partType === 'Deck') {
							for(var q = 0; q < buildColorData['colorData'].length; q++){
								if(buildColorData['colorData'][q].part === boatModelParts[bmp].id){
									for(var w = 0; w < colorConfiguration.length; w++) {
										if(colorConfiguration[w].name === "Deck")	{
											colorConfiguration[w].parts.push(buildColorData['colorData'][q]);
										}
									}
								}
							}
						} else
						if(boatModelParts[bmp].partType === 'Hull') {
							for(var q = 0; q < buildColorData['colorData'].length; q++){
								if(buildColorData['colorData'][q].part === boatModelParts[bmp].id){
									for(var e = 0; e < colorConfiguration.length; e++) {
										if(colorConfiguration[e].name === "Hull")	{
											colorConfiguration[e].parts.push(buildColorData['colorData'][q]);
										}
									}
								}
							}
						} else 
						if(boatModelParts[bmp].partType === 'Interior') {
							for(var q = 0; q < buildColorData['colorData'].length; q++){
								if(buildColorData['colorData'][q].part === boatModelParts[bmp].id){
									for(var z = 0; z < colorConfiguration.length; z++) {
										if(colorConfiguration[z].name === "Interior")	{
											colorConfiguration[z].parts.push(buildColorData['colorData'][q]);
										}
									}
								}
							}
						} else
						if(boatModelParts[bmp].partType === 'Trailer') {
							for(var q = 0; q < buildColorData['colorData'].length; q++){
								if(buildColorData['colorData'][q].part === boatModelParts[bmp].id){
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
						
						if(colorConfiguration[cci].parts['length'] > 0) {
							
							var catName = colorConfiguration[cci].name;
							
							colorConfigContent += '<div class="category">';
							colorConfigContent += '	<div class="grid-x">';
							colorConfigContent += '		<div class="cell small-12 medium-3">';
							colorConfigContent += '			<div class="title"> '+catName+'</div>';
							colorConfigContent += '		</div>';

							colorConfigContent += '		<div class="cell small-12 medium-9" style="border-left: solid 2px #ccc;">';
							colorConfigContent += '			<ul class="category-parts">';
							
							// loop over the parts/colors in this part category
							for (var pi = 0; pi < colorConfiguration[cci].parts['length']; pi++) {

								var partName = colorConfiguration[cci].parts[pi].part;

								if(partName === "logo") {

									
									var thisLogoName = colorConfiguration[cci].parts[pi].logoName,
										thisLogoSRC = colorConfiguration[cci].parts[pi].imageURL,
										thisLogoDisplayName = thisLogoName.replace(/_/g, "/"),
										thisSwatch = '<div class="logoButtonDiv" id="'+ thisLogoName + '-btn" data-logoName="' + thisLogoName + '" data-imageURL="' + thisLogoSRC + '" title="' + thisLogoDisplayName + '"><img src="' + thisLogoSRC + '" /><div class="logoName">' + thisLogoDisplayName + '</div></div>';
									
									colorConfigContent += '				<li style="display:flex;">';
									colorConfigContent += 					thisSwatch+'</li>';
								

								} else {

									var colorName = colorConfiguration[cci].parts[pi].color;
									//colorSwatchURL = colorConfiguration[cci].parts[pi].color;
								
									var q = colorList.find((o) => { return o["color"] === colorName });

									//console.log(q)

									if(typeof q !== "undefined"){

										var thisSwatch = '<div class="colorButtonDiv d-inline-block" style="width:36px;height:36px;" title="'+q.displayName+'" desc="'+q.displayName+'"><svg  version="1.1" class="colorButton" desc="'+q.displayName+'" id="'+q.color+'-configSwatch">';
										
										thisSwatch += '<circle cx="15" cy="15" r="13" fill="url(#'+q.color+')" /></svg></div>';
										
										colorConfigContent += '				<li class="d-flex">';
										colorConfigContent += '					'+thisSwatch;
										colorConfigContent += '					<div class="colorConfigPartName flex-grow-1" style="text-transform: capitalize;">'+replaceAll(replaceAll(partName, '#', ''), '-', ' ')+'</div> <div class="colorConfigColorName text-right">&nbsp;&nbsp;('+q.displayName+')</div></li>';

									}
										
								
								}

								
									
							}
							
							// close up some tags
							colorConfigContent += '			</ul>';
							colorConfigContent += '		</div>';
							colorConfigContent += '	</div>';
							colorConfigContent += '</div>';
						
						}

						var sel = "Selection: "
						if(buildColorData.selectedColorOption === "colorOption-3color"){
							sel += "Premium 3 Color Combo: " + buildColorData.combo.name;
						} else if(buildColorData.selectedColorOption === "colorOption-4color"){
							sel += "Elite 4 Color Combo: " + buildColorData.combo.name;
						} else if(buildColorData.selectedColorOption === "colorOption-customColor"){
							sel += "Custom Color Your Nitro";
						}
						$('#selectColorOptionConfig').html(sel);

					}
					

					var displaySelectedColorOption = '',
						selectedColorOption = '',
						selectedColorPrice = 0,
						selectedColorCode = '',
						selectedComboSwatchHTML = '';

					// if using nitro-colorOptions
					if($('.nitro-colorOption .nitro-colorOption-header.selected').length > 0){

						// grabbum
						selectedColorOption = $('.nitro-colorOption .nitro-colorOption-header.selected').attr('id');
						selectedColorPrice = $('#colorOption-customColor .colorOptionCost').attr("data-optionPrice");

						if(selectedColorOption === 'colorOption-customColor'){
							selectedColorCode = 'Custom Color Your Nitro';
						} else {
							selectedColorCode = $('.comboButton.selected').attr('data-displayname');
						}

						// concantentate to the collective, resistience is futile, you will be displayed whether you like the value or not. Mwhaha
						displaySelectedColorOption += '<div class="cell small-12 option-label"><div class="pr-1 sumColStripedSwatch" style="display: inline-table;vertical-align: middle;">Selected: ' + selectedComboSwatchHTML + '</div><div class="cell d-inline" style="vertical-align:top;">' + selectedColorCode + '</div></div>';
						
					}
					
					// insert the color configuration HTML
					$('.color-selections').html(colorConfigContent);

					// now go make sure the build data is updated in the form
					udpateFormJSON();
					
				} // END updateColorConfigDisplay






				// create all part tabs
				var setPartMenuTabs = function(){

					window.DeckGroup = "";
					window.HullGroup = "";
					window.TrailerGroup = "";
					window.InteriorGroup = "";
					window.GraphicGroup = "";								

					for (var i = 0; i < colorData.length; i++) {

						var displayName = colorData[i].part.replace(/-/g,' ').replace(/#/g,'');
						var btnid = colorData[i].part.replace(/#/g,'') + '-btn';

						//loop through allowed customizable parts from [model]-def file
						for (var a = 0; a < boatModelParts.length; a++) { 

							//console.log(boatModelParts[a].id + " === " + colorData[i].part.replace(/#/g,''))

							if (boatModelParts[a].id === colorData[i].part.replace(/#/g,'') && boatModelParts[a].cc == 1){

								if (boatModelParts[a].partType == "Deck") {
									DeckGroup += '<div class="part-button" style="text-transform: capitalize;" value="' + colorData[i].part + '" id="' + btnid + '">' + displayName + '</div>';
									
									DeckGroupArray.push(colorData[i].part);

								} else if (boatModelParts[a].partType == "Hull") {
									HullGroup += '<div class="part-button" style="text-transform: capitalize;" data-type="part" value="' + colorData[i].part + '" id="' + btnid + '">' + displayName + '</div>';
									HullGroupArray.push(colorData[i].part);

								} else if (boatModelParts[a].partType == "Trailer") {
									TrailerGroup += '<div class="part-button" style="text-transform: capitalize;" data-type="part" value="' + colorData[i].part + '" id="' + btnid + '">' + displayName + '</div>';
									TrailerGroupArray.push(colorData[i].part);

								} else if (boatModelParts[a].partType == "Interior"){
									InteriorGroup += '<div class="part-button" style="text-transform: capitalize;" data-type="part" value="' + colorData[i].part + '" id="' + btnid + '">' + displayName + '</div>';
									InteriorGroupArray.push(colorData[i].part);

								} else if (boatModelParts[a].partType == "Graphic"){
									GraphicGroup += '<div class="part-button" style="text-transform: capitalize;" data-type="graphic" value="' + colorData[i].part + '" id="' + btnid + '">' + displayName + '</div>';
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
					//alert(GraphicGroup)
					if (GraphicGroup == ""){
						$('#graphic-tab').hide();
					}

				}

				// create custom palette of COLOR swatches
				var buildCustomColorPalette = function(){
					var palettec = "";

					for (var i = 0; i < colorList.length; i++) {
						palettec += '<div class="colorButtonDiv" title="'+colorList[i].displayName+'" myid="'+colorList[i].color+'" desc="'+colorList[i].displayName+'"><svg  version="1.1" class="colorButton" desc="'+colorList[i].displayName+'" id="'+colorList[i].color+'-btn">';
						palettec += '<circle cx="25" cy="25" r="23" fill="url(#'+colorList[i].color+')" /></svg></div>';
					};

					// insert the content
					$('.custom-color-palette').prepend(palettec);

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
						thisLogoSRC = nitroBYOAssetsPath + '/' + logoFiles[l].file;

						paletteLogos += '<div class="logoButtonDiv" id="'+ thisLogoName + '-btn" data-logoName="' + thisLogoName + '" data-imageURL="' + thisLogoSRC + '" title="' + thisLogoDisplayName + '"><img src="' + thisLogoSRC + '" /><div class="logoName">' + thisLogoDisplayName + '</div></div>';
					};
					
					$('.custom-color-palette').prepend('<div style="display:block;">' + paletteLogos + '</div>');
					
				}
				
				// use a combo object to color the boat image
				var combomatic = function(mytitle, combobtn) {

					var mycolor = "";

					if(typeof comboList[mytitle] !== 'undefined') { 

						$(".comboButton").attr("class", "comboButton");

						var thisLogoSRC = nitroBYOAssetsPath + '/';
						thisLogoSRC += comboList[mytitle].logoFilename;

						var thisLogoVarName = "";
						for (var l = 0; l < logoFiles.length; l++) {
							if(logoFiles[l].file == comboList[mytitle].logoFilename){
								thisLogoVarName = logoFiles[l].name;
							}
						};

						// checking if URL exists
						$.get(thisLogoSRC).done( function() { 
							// change the logo
							logomatic(thisLogoSRC,thisLogoVarName,'logo');
							logomatic(thisLogoSRC,thisLogoVarName,'cc-logo');

						}).fail(function() {  
							// no, let's grab a different image
							var q = logoFiles.length - 1;
							thisLogoVarName = logoFiles[q].name;
							thisLogoSRC = nitroBYOAssetsPath + '/';
							thisLogoSRC += logoFiles[q].file;
							// change the logo
							logomatic(thisLogoSRC,thisLogoVarName,'logo');
							logomatic(thisLogoSRC,thisLogoVarName,'cc-logo');

						});

						// move the combo part/color data into the colorData variable
						colorData = comboList[mytitle]['colors'];
						
						// highlight the combo swatch
						$(combobtn).attr("class", "comboButton selected");
						
						// paint All The Parts!
						for (var i = 0; i < comboList[mytitle]['colors'].length; i++) {

							var mypart = comboList[mytitle]['colors'][i].part;
							mycolor = comboList[mytitle]['colors'][i].color;

							//paint each part
							paintomatic(mycolor, mypart, '');
							paintomatic(mycolor, mypart, 'cc-');
							console.log(mypart + " - " + mycolor);

						}
						//retrievedBuildJSON.colorOptions
					}
				};

				// show selected color for this part
				var showSelectedPartColor = function(mypart){
					var partArrayID = getPartArrayID(mypart);
					var thisColor = getColor(partArrayID);
					var myclrbtn = '#'+thisColor+'-btn';
					$(myclrbtn).attr("class", "colorButton selected");
				}

				// changes the graphic logo and related data
				var logomatic = function(thisLogoSRC,thisLogoVarName,logoID) {

					// set the slected logo source URL on the boat image
					$('#' + logoID).attr("xlink:href",thisLogoSRC);
					
					// remove any selected logo classes that may already be out there
					$('.logoButtonDiv').attr("class", "logoButtonDiv");
					
					// add the class 'selected' to the corresponding logo button in the palette
					$('#' + thisLogoVarName + '-btn').attr("class", "logoButtonDiv selected");

					var logoFound = 0;

					// update the logo in colorData
					if(colorData != null){ 

						if(colorData.length > 0){

							for (var i = 0; i < colorData.length; i++) {

								if(colorData[i].part === "logo" || colorData[i].part === "Graphic") {

									logoFound = 1;

									colorData[i].part = "Graphic";

									var thisLogoName = thisLogoVarName.replace(/_/g,'/'); 
									colorData[i].colorDisplayName = thisLogoName;
									colorData[i].color = thisLogoSRC;
								}
							}
							
							// just in case logo was not already in colorData - push it in there
							if( (!logoFound) && (typeof thisSRC !== "undefined") && (typeof thisLogoName !== "undefined") ) {
								colorData.push ({ part:"Graphic", color:thisSrc, colorDisplayName:thisLogoName });
							}

						}
					}

					
					return;

				};



				//paint the part function
				window.paintomatic = function(color, boatpart, instance) {

					instance = (typeof instance !== 'undefined') ?  instance : '';
					
					if((typeof color !== "undefined") && (typeof boatpart !== "undefined")){
						if((color !== null) && (boatpart !== null)){ 

							if(boatpart.indexOf('#') !== -1){
								boatpart = boatpart.replace(/#/g, "");
							}

							if(color.indexOf('#') !== -1){
								color = color.replace(/#/g, "");
							}

							if(boatpart != "logo" && boatpart != "Graphic"){

								var partArrayID = getPartArrayID(boatpart);	

								if (partArrayID != undefined){
									
									var colorPattern = $('#' + color + ' image').attr("xlink:href");   
 
									var targetPartPattern = '#' + instance + '' + boatpart + '-pattern image';
									$(targetPartPattern).attr("xlink:href", colorPattern);

									var targetPatternId = '';
									if(color.indexOf('#') === -1) {
										targetPatternId = '#';	
									}
									targetPatternId += color + ' image';
									var colorPattern = $(targetPatternId).attr("xlink:href");
									$('.' + boatPart + '-image').attr("xlink:href", colorPattern);

								}
							}
						}
					}	
				};


				// grabs the current color configuration and returns buildColorData object
				var setBuildColorData = function(c,p){
					
					if(typeof c === 'undefined') var c = '';
					if(typeof p === 'undefined') var p = '';
					
					// build the build color object
					var bcd = {};
					bcd.combo = { name: '', variation: '' }
					bcd.selectedColorOption = $('.nitro-colorOption-header.selected').attr('id');
					bcd.additionalCost = $('.nitro-colorOption-header.selected .colorOptionCost').attr('data-optionprice');
					bcd.colorData = {};	

					if(bcd.selectedColorOption === 'colorOption-3color' || bcd.selectedColorOption === 'colorOption-4color') {
						bcd.combo.name = $('.comboButton.selected').attr('desc');
						bcd.colorData = comboList[bcd.combo.name].colors
					} else {
						var prevBCD = localStorage.getItem("byoNitro-buildColorData");
						prevBCD.replace('#','');
						prevBCD = JSON.parse(prevBCD);
						if(typeof prevBCD !== 'undefined' && c !== '' && p !== ''){
							if(prevBCD !== null && prevBCD !== '' && typeof prevBCD === 'object'){
								bcd.combo.name = 'Custom Color Your Nitro';
								// update the color part clicked on
								for (var i = 0; i < prevBCD.colorData.length; i++) { 
									if(p.replace("#","") === prevBCD.colorData[i].part.replace("#","")) {
										prevBCD.colorData[i].color = c;
									}
								}
								bcd.colorData = prevBCD.colorData;
							}
						}
					}

					localStorage.setItem("byoNitro-buildColorData", JSON.stringify(bcd));

				} // end setBuildColorData();







				//create COMBO swatches
				//sliceXpart variables are defined in assets/[year]/nitro/[boatname]/defs.cfm files
				//allowedCombos is defined in assets/[year]/nitro/[boatname]/defs.cfm files
				var palette3 = "";
				var palette4 = "";

				var buildComboSwatches = function(){

					//console.log("begin building combo swatches")

					// do this for every defined combo
					$.each(comboList, function(i, v) {

						var thisComboName = i;

						var sliceIndex1 = '';
						var sliceIndex2 = '';
						var sliceIndex3 = '';
						var sliceIndex4 = ''; 


						//loop through allowed Premium combos from [model]-def file
						for (var a = 0; a < allowedCombosPremium.length; a++) {

							var allowedComboName = allowedCombosPremium[a].name;
							var thisColorVariableName = '';

							if (thisComboName == allowedComboName){

								sliceIndex1 = '';
								sliceIndex2 = '';
								sliceIndex3 = '';

								for( var ci = 0, len = comboList[i]['colors'].length; ci < len; ci++ ){

									if ( comboList[i]['colors'][ci].swatchSlice === '1' ) {
										sliceIndex1 = comboList[i]['colors'][ci].color;
									}
									if ( comboList[i]['colors'][ci].swatchSlice === '2' ) {
										sliceIndex2 = comboList[i]['colors'][ci].color;
									}
									if ( comboList[i]['colors'][ci].swatchSlice === '3' ) {
										sliceIndex3 = comboList[i]['colors'][ci].color;
									}

								} 

								//three color combo swatch
								palette3 += '<div class="comboButtonDiv" data-colorOptionID="3color" title="'+comboList[i].name+'"><svg class="comboButton" viewBox="-3 -3 76 76" data-displayname="Premium Combo: '+comboList[i].name+'" desc="'+comboList[i].name+'" id="'+comboList[i].name+'-btn"  cost="'+allowedCombosPremium[0].cost+'" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" transform="translate(3, 3)">';

								palette3 += '<path id="slice-1" d="M68.007255,23.3299999 C63.2015559,9.73783019 50.237974,0 35,0 C19.762026,0 6.79844412,9.73783019 1.99274497,23.3299999 L68.007255,23.3299999 L68.007255,23.3299999 Z" sketch:type="MSShapeGroup" fill="url(#'+sliceIndex1+')"></path>';

								palette3 += '<path id="slice-2" d="M68.0107884,46.6600018 C69.299055,43.0127979 70,39.0882562 70,35 C70,30.9080085 69.2977735,26.9800307 68.0072557,23.3300018 L1.9927443,23.3300018 C0.702226468,26.9800307 0,30.9080085 0,35 C0,39.0882562 0.700945007,43.0127979 1.98921164,46.6600018 L68.0107884,46.6600018 L68.0107884,46.6600018 Z" sketch:type="MSShapeGroup" fill="url(#'+sliceIndex2+')"></path>';

								palette3 += '<path id="slice-3" d="M35.8448286,69.9900036 C50.7193907,69.6376485 63.2969006,60.0054583 68.0107877,46.6600037 L1.98921232,46.6600037 C6.70309941,60.0054583 19.2806093,69.6376485 34.1551714,69.9900036 L35.8448286,69.9900036 L35.8448286,69.9900036 Z" sketch:type="MSShapeGroup" fill="url(#'+sliceIndex3+')"></path>';

								palette3 +='<circle cx="35" cy="35" r="35" fill="none" /></svg><div class="comboName">'+comboList[i].name+'</div></div>';

							};
						};

						//loop through allowed Elite combos from [model]-def file
						for (var a = 0; a < allowedCombosElite.length; a++) {

							var allowedComboName = allowedCombosElite[a].name;
							var thisColorVariableName = '';

							if (thisComboName == allowedComboName){

								sliceIndex1 = '';
								sliceIndex2 = '';
								sliceIndex3 = '';
								sliceIndex4 = '';

								for( var ci = 0, len = comboList[i]['colors'].length; ci < len; ci++ ){

									if ( comboList[i]['colors'][ci].swatchSlice === '1' ) {
										sliceIndex1 = comboList[i]['colors'][ci].color;
									}
									if ( comboList[i]['colors'][ci].swatchSlice === '2' ) {
										sliceIndex2 = comboList[i]['colors'][ci].color;
									}
									if ( comboList[i]['colors'][ci].swatchSlice === '3' ) {
										sliceIndex3 = comboList[i]['colors'][ci].color;
									}
									if ( comboList[i]['colors'][ci].swatchSlice === '4' ) {
										sliceIndex4 = comboList[i]['colors'][ci].color;
									}

								} 

								//four color combo swatch
								palette4 += '<div class="comboButtonDiv" data-colorOptionID="4color" title="'+comboList[i].name+'"><svg class="comboButton" data-displayName="Elite Combo: '+comboList[i].name+'" data-colorOptionID="4color" viewBox="-3 -3 76 76" desc="'+comboList[i].name+'" id="'+comboList[i].name+'-btn" cost="'+allowedCombosElite[0].cost+'" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  transform="translate(3, 3)">';

								palette4 += '<path id="slice-1" d="M65.3176175,17.4999903 C59.2659513,7.03847165 47.9549372,0 35,0 C22.0450628,0 10.7340487,7.03847165 4.68238247,17.4999903 L65.3176232,17.5 L65.3176175,17.4999903 Z" sketch:type="MSShapeGroup" fill="url(#'+sliceIndex1+')"></path>';

								palette4 += '<path id="slice-2" d="M70,35 C70,28.624971 68.2955978,22.6480264 65.3176175,17.4999903 L4.68237683,17.5 C1.70440216,22.6480264 0,28.624971 0,35 L70,35 L70,35 Z" sketch:type="MSShapeGroup" fill="url(#'+sliceIndex2+')"></path>';

								palette4 += '<path id="slice-3" d="M65.3176175,52.5000097 C68.2955978,47.3519736 70,41.375029 70,35 L0,35 C0,41.375029 1.70440216,47.3519736 4.68238247,52.5000097 L65.3176232,52.5 L65.3176175,52.5000097 Z" sketch:type="MSShapeGroup" fill="url(#'+sliceIndex3+')"></path>';

								palette4 += '<path id="slice-4" d="M65.3176175,52.5000097 C59.2659513,62.9615284 47.9549372,70 35,70 C22.0450628,70 10.7340487,62.9615284 4.68238247,52.5000097 L65.3176232,52.5 L65.3176175,52.5000097 Z" sketch:type="MSShapeGroup" fill="url(#'+sliceIndex4+')"></path>';

								palette4 +='<circle cx="35" cy="35" r="35" fill="none" /></svg><div class="comboName">'+comboList[i].name+'</div></div>';

							};
						};

					});

					// if we are in Pigzilla and there are no premium combos to display
					if((getPageFile.indexOf('boats/boat') != -1) && (!palette3.length)) {
						palette3 = "There were no Premium Combos found for this model. Add Premium Combos below under Allowed Combos by clicking the appropriate checkboxes and then reloading this preview.";
					}

					$('.three-color-palette').html(palette3);

					// if we are in Pigzilla and there are no elite combos to display
					if((getPageFile.indexOf('boats/boat') != -1) && (!palette4.length)) {
						palette4 = "There were no Elite Combos found for this model. Add Elite Combos below under Allowed Combos by clicking the appropriate checkboxes and then reloading this preview.";
					}

					$('.four-color-palette').html(palette4);
				}

				var navclear = function(){
					$(".parts").hide();
					$(".part-groups").hide();
					$(".variation").hide();
					$(".nav-title").removeClass('selected');
				}

				var variationclear=function(){
					$(".variation-tab").removeClass('selected');
				}

				var partclear=function(){
					$(".part-button").removeClass('selected');
				}

				var colorclear=function(){
					$(".colorButton").attr("class", "colorButton");
				}

				var groupclear=function(){
					$(".part-tabs").hide();
					$(".group-tab").removeClass('selected');
					partclear();
					colorclear();
					boatPart="";
				}

				var paletteclear=function(){
					$("[id*=Polyflake]").attr("class", "colorButton");
				}
				

				var showPartColorPalette = function (boatPart){
			
					//console.log("showParColorPalette() boatPart: " + boatPart)

					var productVarName = localStorage.getItem('productVarName');
					var boatVarName = productVarName;
					
					// remove the previous message if it exists
					if($('#colorPaletteMessage').length){
						$('#colorPaletteMessage').remove();
					}
					
					var mypart = boatPart;
					
					//console.log("showParColorPalette() mypart: " + mypart)
					
					// logos require special handling
					if(mypart != "logo" && mypart != '') {
						
						var allowedColorTypes = '';
						
						// look up what kind of colors this part is allowed
						for (var a = 0; a < boatModelParts.length; a++) {
							if (boatModelParts[a].id == mypart){
								allowedColorTypes = boatModelParts[a].allowedColorTypes;
							}
						}
						
						// hide all color types
						for(var gct = 0; gct < colorTypeList.length; gct++){
							var selectorName = "[myid*=" + colorTypeList[gct] + "]";
							$(selectorName).hide();
							$('[myid*=Highlight]').hide();
						}
						
						// hide the logos
						$('.logoButtonDiv').hide();
						
						// show only allowed colorTypes for mypart
						for(var ct = 0; ct < allowedColorTypes.split(',').length; ct++){
							var match = allowedColorTypes.split(',');
							for (var a in match) {
								var colorTypeAllowed = match[a];
								var selectorName = "[myid*=" + colorTypeAllowed + "]";
								//alert(colorTypeAllowed)
								$(selectorName).show();
							}
						}
		
						//Hull-Bottom hide polyflakes
						if (mypart == "Hull-Bottom") {
							$("[myid*=Polyflake]").hide();
						}
						
					} else { 
						
						// hide all color types
						for(var gct = 0; gct < colorTypeList.length; gct++){
							var selectorName = "[myid*=" + colorTypeList[gct] + "]";
							$(selectorName).hide();
							$('[myid*=Highlight]').hide();
						}
						
						// show the logos
						$('.logoButtonDiv').show();
						
					}
					
					
					
					// RULE: Interior and Traler parts are not shown in image. Showing a message stating so.
					if(mypart.replace('#','') == 'Fender' ||
					   mypart.replace('#','') == 'Trailer-Pinstripes' ||
					   mypart.replace('#','') == 'Primary-Vinyl' ||
					   mypart.replace('#','') == 'Accent-Vinyl' ||
					   mypart.replace('#','') == 'Second-Accent-Vinyl' ||
					   mypart.replace('#','') == 'Carpet' ||
					   mypart.replace('#','') == 'Accent-Welt'){
						
						// remove the previous message if it exists
						if($('#colorPaletteMessage').length){
							$('#colorPaletteMessage').remove();
						}
						
						$('.custom-color-palette').prepend('<div id="colorPaletteMessage" style="padding-bottom:15px;">This part is not pictured above.</div>')
						
					}
					
					
					// RULE: ZV20 Pro primary vinyl limitations: Black, Charcoal, Marble
					if(mypart.replace('#','') == 'Primary-Vinyl' && boatVarName === 'ZV20-Pro'){
						
						// hide all color types
						for(var gct = 0; gct < colorTypeList.length; gct++){
							var selectorName = "[myid*=" + colorTypeList[gct] + "]";
							$(selectorName).hide();
							$('[myid*=Highlight]').hide();
						}
						
						// remove the previous message if it exists				
						if($('#colorPaletteMessage').length){
							$('#colorPaletteMessage').remove();
						}
						
						// just show the black, charcoal, and marble swatch for trailer frame
						$('[myid=Black_Vinyl]').show();
						$('[myid=Charcoal_Vinyl]').show();
						$('[myid=Marble_Vinyl]').show();
						
						$('.custom-color-palette').prepend('<div id="colorPaletteMessage" style="padding-bottom:15px;">Primary Vinyl is only available in Black, Charcoal, or Marble as shown below. This part is not pictured above.</div>')
						
					}

					// RULE: ZV20 Pro Accent Vinyl limitation: Charcoal
					if(mypart.replace('#','') == 'Accent-Vinyl' && (
							(boatVarName === 'ZV20-Pro') ||
							(boatVarName === 'ZV20')
						)
					){
						
						// hide all color types
						for(var gct = 0; gct < colorTypeList.length; gct++){
							var selectorName = "[myid*=" + colorTypeList[gct] + "]";
							$(selectorName).hide();
							$('[myid*=Highlight]').hide();
						}
						
						// remove the previous message if it exists				
						if($('#colorPaletteMessage').length){
							$('#colorPaletteMessage').remove();
						}
						
						// just show the charcoal swatch
						$('[myid=Charcoal_Vinyl]').show();
						
						$('.custom-color-palette').prepend('<div id="colorPaletteMessage" style="padding-bottom:15px;">Accent Vinyl is only available in Charcoal as shown below. This part is not pictured above.</div>')
						
					}
					
					// RULE: ZV19 Sport Accent Vinyl limitation: HIDE Charcoal, Ice White, and Marble
					if(mypart.replace('#','') == 'Accent-Vinyl' && (boatVarName.indexOf('ZV') > -1)){
						
						// hide all color types
						for(var gct = 0; gct < colorTypeList.length; gct++){
							var selectorName = "[myid*=" + colorTypeList[gct] + "]";
							$(selectorName).hide();
							$('[myid*=Highlight]').hide();
						}
						// Show all vinyl
						var selectorName = "[myid*=Vinyl]";
						$(selectorName).show();
						
						// hide charcoal, ice white, and marble
						//$('[myid=Charcoal_Vinyl]').hide();

						$('[myid=Black_Vinyl]').hide();
						$('[myid=Marble_Vinyl]').hide();
						$('[myid=Ice-White_Vinyl').hide();
						
						// remove the previous message if it exists				
						if($('#colorPaletteMessage').length){
							$('#colorPaletteMessage').remove();
						}
						
						$('.custom-color-palette').prepend('<div id="colorPaletteMessage" style="padding-bottom:15px;">This part is not pictured above. Charcoal is the only color option available.</div>')
						
					}
					
					// RULE: ZV19 Sport console 
					if(mypart.replace('#','') == 'Console' && (boatVarName.indexOf('ZV19-Sport') > -1)){
						
						// hide all color types
						for(var gct = 0; gct < colorTypeList.length; gct++){
							var selectorName = "[myid*=" + colorTypeList[gct] + "]";
							$(selectorName).hide();
							$('[myid*=Highlight]').hide();
						}
						// Show all vinyl
						var selectorName = "[myid*=Vinyl]";
						$(selectorName).show();
						
						// hide charcoal, ice white, and marble
						//$('[myid=Charcoal_Vinyl]').hide();

						$('[myid=Black_Vinyl]').hide();
						$('[myid=Marble_Vinyl]').hide();
						$('[myid=Ice-White_Vinyl').hide();
						
						// remove the previous message if it exists				
						if($('#colorPaletteMessage').length){
							$('#colorPaletteMessage').remove();
						}
						
						$('.custom-color-palette').prepend('<div id="colorPaletteMessage" style="padding-bottom:15px;">This part is not pictured above. Charcoal is the only color option available.</div>')
						
					}
					
					// RULE: ZV20 Pro Second Accent Vinyl limitation: HIDE Charcoal, Ice White, and Marble
					if(mypart.replace('#','') == 'Second-Accent-Vinyl' && boatVarName === 'ZV20-Pro'){
						
						// hide all color types
						for(var gct = 0; gct < colorTypeList.length; gct++){
							var selectorName = "[myid*=" + colorTypeList[gct] + "]";
							$(selectorName).hide();
							$('[myid*=Highlight]').hide();
						}
						// Show all vinyl
						var selectorName = "[myid*=Vinyl]";
						$(selectorName).show();
						
						// hide charcoal, ice white, and marble
						$('[myid=Charcoal_Vinyl]').hide();
						$('[myid=Ice_White_Vinyl]').hide();
						$('[myid=Marble_Vinyl]').hide();
						
						// remove the previous message if it exists				
						if($('#colorPaletteMessage').length){
							$('#colorPaletteMessage').remove();
						}
						
						$('.custom-color-palette').prepend('<div id="colorPaletteMessage" style="padding-bottom:15px;">Charcoal, Ice White, and Marble is not available for Second Accent Vinyl. This part is not pictured above.</div>')
						
					}
					
					// RULE: Trailer Frame can only be black
					if(mypart.replace('#','') == 'Frame'){
						
						// hide all color types
						for(var gct = 0; gct < colorTypeList.length; gct++){
							var selectorName = "[myid*=" + colorTypeList[gct] + "]";
							$(selectorName).hide();
							$('[myid*=Highlight]').hide();
						}
						
						// remove the previous message if it exists				
						if($('#colorPaletteMessage').length){
							$('#colorPaletteMessage').remove();
						}
						
						// just show the black swatch for trailer frame
						$('[myid=Black_Trailer]').show();
						
						$('.custom-color-palette').prepend('<div id="colorPaletteMessage" style="padding-bottom:15px;">Trailer Frame is only available in black. This part is not pictured above.</div>')
						
					}
					
					// RULE: Trailer Pinstripes cannot be black
					if(mypart.replace('#','') == 'Trailer-Pinstripes'){
						
						// hide black
						$('[myid=Black_Trailer]').hide();
						
					}
					
					// RULE: Hull-Boot-Stripe must match a color selected for the following parts: Hull-Accent-N, Hull-Bottom, Hull-Inset, Hull-Forward-Main, or Hull-Aft-Upper-Main
					if(mypart.replace('#','') == 'Hull-Boot-Stripe'){
						
						// hide all color type
						for(var gct = 0; gct < colorTypeList.length; gct++){
							var selectorName = "[myid*=" + colorTypeList[gct] + "]";
							$(selectorName).hide();
							//console.log(selectorName)
						}
						
						var matchPartList = ['Hull-Accent-N','Hull-Bottom','Hull-Inset','Hull-Forward-Lower-Main','Hull-Aft-Upper-Main'];
						var existingPartList = [];
						var messageLinkList = '';

						var x = JSON.parse(localStorage.getItem("byoNitro-buildColorData"));
						
						
						for(var p = 0; p < matchPartList.length; p++){
							
							var findPart = x.colorData.filter(item=>item.part.includes(matchPartList[p]));

							if(findPart.length){
								var currColor = findPart[0].color;
								$('#' + currColor + '-btn' ).parent().show();
								existingPartList.push(matchPartList[p]);
							}
							
						}
						
						for(var e = 0; e < existingPartList.length; e++){
							if((e+1) === existingPartList.length){
								messageLinkList += ' or ';	
							} else if(messageLinkList.length > 0){
								messageLinkList += ', ' 	
							}
							messageLinkList += '<div class="message-part-button" data-type="part" value="#';
							messageLinkList += existingPartList[e];
							messageLinkList += '">' + existingPartList[e].replace(/\-/g, ' ') + '</div>';
						}
					
						// remove the previous message if it exists
						if($('#colorPaletteMessage').length){
							$('#colorPaletteMessage').remove();
						}		
						
						// Display rule message
						$('.custom-color-palette').prepend('<div id="colorPaletteMessage" style="padding-bottom:15px;">The color of the Hull Boot Stripe must match one of the following areas:<br>'+messageLinkList+'.<br>Based on your color selection for those parts, the choices for this part will change accordingly below.</div>');
						
						// part button click function
						$('.message-part-button').on(clickEventType, function() {
		
							var boatPart = $(this).attr("value");
							var partType = boatPart.toLowerCase();
												
							if(partType !== '' && partType != null){
								
								groupclear();
								paletteclear();
								
								// click a the appropriate tab
								if(partType.indexOf("deck") !== -1){
									$('#deck-tab').addClass('selected');
									$('#deck-parts-stack').show();
								} else if(partType.indexOf("hull") !== -1){
									$('#hull-tab').addClass('selected');
									$('#hull-parts-stack').show();
								} else if(partType.indexOf("interior" !== -1)){
									$('#interior-tab').addClass('selected');
									$('#interior-parts-stack').show();
								} else if(partType.indexOf("trailer" !== -1)){
									$('#trailer-tab').addClass('selected');
									$('#trailer-parts-stack').show();
								}
								
								$(boatPart + '-btn').click();
								
							}
							
						});
					}
					
					// RULE: Hull-Second-Accent color cannot match Hull-Accent-N 
					if(mypart.replace('#','') == 'Hull-Second-Accent'){
						if($('#Hull-Accent-N-pattern image').length){
							// get the color that Hull-Accent-N is currently and hide it in this palette.
							var selectedColor = $('#Hull-Accent-N-pattern image').attr("data-colorID");
							$('#' + selectedColor + '-btn' ).parent().hide();
						}
					}
					
					// RULE: Hull-Forward-Lower-Main color cannot match Hull-Accent-N 
					if(mypart.replace('#','') == 'Hull-Forward-Lower-Main'){
						if($('#Hull-Accent-N-pattern image').length){
							// get the color that Hull-Accent-N is currently and hide it in this palette.
							var selectedColor = $('#Hull-Accent-N-pattern image').attr("data-colorID");
							$('#' + selectedColor + '-btn' ).parent().hide();
						}
					}
					
					// RULE: Hull-Inset color cannot match Hull-Accent-N 
					if(mypart.replace('#','') == 'Hull-Inset'){
						if($('#Hull-Accent-N-pattern image').length){
							// get the color that Hull-Accent-N is currently and hide it in this palette.
							var selectedColor = $('#Hull-Accent-N-pattern image').attr("data-colorID");
							$('#' + selectedColor + '-btn' ).parent().hide();
						}
					}
					
					// RULE: Hull Accent N color cannot match surrounding colors
					if(mypart.replace('#','') == 'Hull-Accent-N'){
						




						var matchPartList = ['Hull-Second-Accent','Hull-Inset','Hull-Forward-Lower-Main'];
						var existingPartList = [];
						var messageLinkList = '';

						var x = JSON.parse(localStorage.getItem("byoNitro-buildColorData"));
						
						for(var p = 0; p < matchPartList.length; p++){
							
							var findPart = x.colorData.filter(item=>item.part.includes(matchPartList[p]));

							if(findPart.length){
								var currColor = findPart[0].color;
								$('#' + currColor + '-btn' ).parent().hide();
								existingPartList.push(matchPartList[p]);
							}
							
						}


						for(var e = 0; e < existingPartList.length; e++){
							if((e+1) === existingPartList.length){
								messageLinkList += ' or ';	
							} else if(messageLinkList.length > 0){
								messageLinkList += ', ' 	
							}
							messageLinkList += '<div class="message-part-button" data-type="part" value="#';
							messageLinkList += existingPartList[e];
							messageLinkList += '">' + existingPartList[e].replace(/\-/g, ' ') + '</div>';
						}
					
						// remove the previous message if it exists
						if($('#colorPaletteMessage').length){
							$('#colorPaletteMessage').remove();
						}	
						
						// Display rule message
						$('.custom-color-palette').prepend('<div id="colorPaletteMessage" style="padding-bottom:15px;">This part cannot match surrounding part colors. This includes:<br>'+messageLinkList+'.<br>Based on your color selection for those parts, the choices for this part will change accordingly below.</div>');
						
						
						// part button click function
						$('.message-part-button').on(clickEventType, function() {
		
							var boatPart = $(this).attr("value");
							var partType = boatPart.toLowerCase();
							
							if(partType !== '' && partType != null){
								
								groupclear();
								paletteclear();
								
								// click a the appropriate tab
								if(partType.indexOf("deck") !== -1){
									$('#deck-tab').addClass('selected');
									$('#deck-parts-stack').show();
								} else if(partType.indexOf("hull") !== -1){
									$('#hull-tab').addClass('selected');
									$('#hull-parts-stack').show();
								} else if(partType.indexOf("interior" !== -1)){
									$('#interior-tab').addClass('selected');
									$('#interior-parts-stack').show();
								} else if(partType.indexOf("trailer" !== -1)){
									$('#trailer-tab').addClass('selected');
									$('#trailer-parts-stack').show();
								}
								
							}
							
							$(boatPart + '-btn').click();
							
						});
					}
					
					// RULE: Console color must match one of the following areas: Deck Main, Hull N Accent, Hull Forward Lower Main.
					if(mypart.replace('#','') == 'Console'){
						
						//console.log(colorTypeList)
						
						// hide all color type
						for(var gct = 0; gct < colorTypeList.length; gct++){
							var selectorName = "[myid*=" + colorTypeList[gct] + "]";
							$(selectorName).hide();
							//console.log(selectorName)
						}
						
						var matchPartList = ['Deck-Main','Hull-Accent-N','Hull-Aft-Upper-Main','Hull-Forward-Lower-Main'];

						var existingPartList = [];
						var messageLinkList = '';

						var x = JSON.parse(localStorage.getItem("byoNitro-buildColorData"));
						
						for(var p = 0; p < matchPartList.length; p++){

							var findPart = x.colorData.filter(item=>item.part.includes(matchPartList[p]));
							
							if(findPart.length){
								var currColor = findPart[0].color;
								$('#' + currColor + '-btn' ).parent().show();
								existingPartList.push(matchPartList[p]);
							}

						}
						
						for(var e = 0; e < existingPartList.length; e++){
							if((e+1) === existingPartList.length){
								messageLinkList += ' or ';
							} else if(messageLinkList.length > 0){
								messageLinkList += ', ' 	
							}
							messageLinkList += '<div class="message-part-button" data-type="part" value="#';
							messageLinkList += existingPartList[e];
							messageLinkList += '">' + existingPartList[e].replace(/\-/g, ' ') + '</div>';
						}
						
						// remove the previous message if it exists
						if($('#colorPaletteMessage').length){
							$('#colorPaletteMessage').remove();
						}
						
						// Display rule message
						$('.custom-color-palette').prepend('<div id="colorPaletteMessage" style="padding-bottom:15px;">The color of the Console must match one of the following areas:<br>'+messageLinkList+'.<br>Based on your color selection for those parts, the choices for this part will change accordingly below.</div>');
						
						// part button click function
						$('.message-part-button').on(clickEventType, function() {
		
							var boatPart = $(this).attr("value");
							var partType = boatPart.toLowerCase();
							
							if(partType !== '' && partType != null){
								
								groupclear();
								paletteclear();
								
								// click the appropriate tab
								if(partType.indexOf("deck") !== -1){
									$('#deck-tab').addClass('selected');
									$('#deck-parts-stack').show();
								} else if(partType.indexOf("hull") !== -1){
									$('#hull-tab').addClass('selected');
									$('#hull-parts-stack').show();
								} else if(partType.indexOf("interior" !== -1)){
									$('#interior-tab').addClass('selected');
									$('#interior-parts-stack').show();
								} else if(partType.indexOf("trailer" !== -1)){
									$('#trailer-tab').addClass('selected');
									$('#trailer-parts-stack').show();
								}
								
							}


							$(boatPart + '-btn').click();

							
						});
		
					}
					
					
					
					// RULE: Z19 Sport: Accent-Vinyl can on be Marble
					if( mypart.replace('#','') == 'Accent-Vinyl' && boatVarName == 'Z19-Sport'){

						// hide all color types
						for(var gct = 0; gct < colorTypeList.length; gct++){
							var selectorName = "[myid*=" + colorTypeList[gct] + "]";
							$(selectorName).hide();
							$('[myid*=Highlight]').hide();
						}
						
						// remove the previous message if it exists				
						if($('#colorPaletteMessage').length){
							$('#colorPaletteMessage').remove();
						}
						
						$('[myid=Marble_Vinyl]').show();
						
						var msgg = '<div id="colorPaletteMessage" style="padding-bottom:15px;">This part is not pictured above. Marble is the only color option available.</div>';
						
						$('.custom-color-palette').prepend(msgg);
						
					}
					
					
					
					// RULE: Z19 Sport: Deck Main, Hull Aft Upper Main, Hull Accent N, Primary Vinyl can only be Ice White
					if(
						(
							(mypart.replace('#','') == 'Deck-Main') ||
							(mypart.replace('#','') == 'Hull-Aft-Upper-Main') ||
							(mypart.replace('#','') == 'Hull-Accent-N') ||
							(mypart.replace('#','') == 'Primary-Vinyl') ||
							(mypart.replace('#','') == 'Console')
							
						) && boatVarName === 'Z19-Sport'){
						
						// hide all color types
						for(var gct = 0; gct < colorTypeList.length; gct++){
							var selectorName = "[myid*=" + colorTypeList[gct] + "]";
							$(selectorName).hide();
							$('[myid*=Highlight]').hide();
						}
						
						// remove the previous message if it exists				
						if($('#colorPaletteMessage').length){
							$('#colorPaletteMessage').remove();
						}
						
						$('[myid=Ice_White_Gel]').show();
						
						var msgg = '<div id="colorPaletteMessage" style="padding-bottom:15px;">';
						
						if(mypart.replace('#','') == 'Primary-Vinyl'){
							msgg += 'This part is not pictured above.'
						}
						
						msgg += 'Ice White is the only color option available.</div>';
						
						$('.custom-color-palette').prepend(msgg);
				
						
					}

					if(mypart.replace('#','').toLowerCase() == 'second-accent-vinyl' && (boatVarName.indexOf('ZV') > -1)){
						// RULE: ZV boats cannot have Marble applied to second accent vinyl JIRA WWD-805 11/1/2022
						// RULE: ZV boats cannot have Charcoal applied to second accent vinyl JIRA WWD-834 11/25/2022
							$('[myid=Marble_VNL_Welt]').hide();
							$('[myid=Charcoal_VNL_Welt]').hide();
					}

				}

				



				







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
				buildLogoPalette(); // create custom logo palette

				var prevBoatPart = boatPart;

				navclear();
				groupclear();
				paletteclear();

				$('#deck-parts-stack').fadeIn('fast');
				$('#deck-tab').addClass('selected');
				$(".parts").fadeIn('fast');
				$(".part-groups").fadeIn('fast');

				$("#deck-tab").bind("click touchstart", function(){

					var prevBoatPart = boatPart;

					groupclear();
					paletteclear();
					$(this).addClass('selected'); 

					$('#deck-parts-stack').fadeIn('fast');

					boatPart = DeckGroupArray[0];

					showPartColorPalette(boatPart);
					showSelectedPartColor(boatPart);

					var mybutton = "";

					if(typeof boatPart !== "undefined"){

						if(boatPart.indexOf("#") == -1){
							mybutton += "#";
						}
						mybutton += boatPart + "-btn";

						//console.log(mybutton)
						$(mybutton).addClass('selected');

						if (boatPart.replace(/#/g,'') != 'graphic' && boatPart.replace(/#/g,'') != 'Graphic' && boatPart.replace(/#/g,'') != 'logo'){

							showSelectedPartColor(boatPart);
							highlight(boatPart, 'cc-');

						}

					}

				});

				$("#hull-tab").bind("click touchstart", function(){

					var prevBoatPart = boatPart;
					groupclear();
					paletteclear();

					$(this).addClass('selected');

					$('#hull-parts-stack').fadeIn('fast');
					boatPart = HullGroupArray[0];

					showPartColorPalette(boatPart);
					showSelectedPartColor(boatPart);

					var mybutton = "";
					if(boatPart.indexOf("#") == -1){
						mybutton += "#";
					}
					mybutton += boatPart + "-btn";

					$(mybutton).addClass('selected');

					if (prevBoatPart != boatPart){
						highlight(boatPart, 'cc-');
					}

				});

				$("#interior-tab").bind("click touchstart", function(){

					var prevBoatPart = boatPart;
					groupclear();
					paletteclear();

					$(this).addClass('selected');
					$('#interior-parts-stack').fadeIn('fast');
					boatPart = InteriorGroupArray[0];

					showPartColorPalette(boatPart);
					showSelectedPartColor(boatPart);

					var mybutton = "";
					if(boatPart.indexOf("#") == -1){
						mybutton += "#";
					}
					mybutton += boatPart + "-btn";

					$(mybutton).addClass('selected');

					if (prevBoatPart != boatPart){
						highlight(boatPart, 'cc-');
					}


				});

				$("#trailer-tab").bind("click touchstart", function(){

					var prevBoatPart = boatPart;

					groupclear();
					paletteclear();

					$(this).addClass('selected');
					$('#trailer-parts-stack').fadeIn('fast');
					boatPart = TrailerGroupArray[0];

					showPartColorPalette(boatPart);
					showSelectedPartColor(boatPart);

					var mybutton = "";
					if(boatPart.indexOf("#") == -1){
						mybutton += "#";
					}
					mybutton += boatPart + "-btn";

					$(mybutton).addClass('selected');
					if (prevBoatPart != boatPart){
						highlight(boatPart, 'cc-');
					}

				});

				$("#graphic-tab").bind("click touchstart", function(){

					var prevBoatPart = boatPart;
					groupclear();
					paletteclear();
					$(this).addClass('selected');
					boatPart = GraphicGroupArray[0];
					showPartColorPalette(boatPart);
					showSelectedPartColor(boatPart);

					var mybutton = "";
					if(boatPart.indexOf("#") == -1){
						mybutton += "#";
					}
					mybutton += boatPart + "-btn";

					$(mybutton).addClass('selected');

				});

				boatPart = DeckGroupArray[0];

				showSelectedPartColor(boatPart);

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
				$('.comboButton').bind("click touchstart", function() {
					
					// if selecting a combo, make sure the user know that custom color selections will be lost
					/*if($('#colorOption-customColor').hasClass('selected')){
						var returnthis = confirm('If you have selected custom color selections, they will be lost. Are you sure you want to switch to another color option?');
						if(!returnthis){
							return false;
						}									
					}*/

					//var mytitle = $(this).attr("title");
					var comboname = $(this).attr("desc");
					var myid = $(this).attr("id");
					var colorprice = $(this).attr("cost");
					var combobtn = '#'+myid;
					//console.log('comboname: ' + comboname + ', combobtn: ' + combobtn)
					// apply the combo colors to the boat
					combomatic(comboname, combobtn);
					
					// remove selected class from all colorOptions
					$('.nitro-colorOption-header').removeClass('selected');
					
					// apply selected class to this clicked colorOption
					$('.comboButton.selected').parents('.nitro-colorOption').children('.nitro-colorOption-header').addClass('selected');

					// store the id of this combo for later
					localStorage.setItem('byoNitro-selectedComboID', myid)

					setBuildColorData();

					previousColorData.selectedColorOption = $('.nitro-colorOption-header.selected').attr('id');
					previousColorData.combo.name = myid;
					previousColorData.combo.variation = "";
					previousColorData.combo.additionalCost = colorprice;

					previousColorData.colors = colorData;

					var buildColorData = JSON.stringify(previousColorData);
					
					// remove # symbols from the data
					buildColorData = buildColorData.replace(/#/g, "");

					//localStorage.setItem("byoNitro-buildColorData", buildColorData);

					//console.log("At the end of comboButton click func ... ")
					//console.table(buildColorData.colors)

					updateColorConfigDisplay();
					window.updateSumCol();

				});

				// part button click function
				$('.part-button').bind("click touchstart", function() {

					var myBoatPart = $(this).attr("value");

					if (boatPart != myBoatPart) {

						colorclear();
						partclear();

						$(this).addClass('selected');

						boatPart = myBoatPart;

						showPartColorPalette(boatPart);

						if (boatPart != 'graphic' && boatPart != 'Graphic' && boatPart != 'logo'){
							showSelectedPartColor(boatPart);
							highlight(boatPart, 'cc-');
						}

						// get current color of the part and highlight the right swatch
						var x = JSON.parse(localStorage.getItem("byoNitro-buildColorData"));
						var findPart = x.colorData.filter(item=>item.part.includes(myBoatPart));

						if(findPart.length){
							var currColor = findPart[0].color;
							$('#'+currColor+'-btn').addClass('selected');
						}

					}

				});

				// logo buttons function
				$('.logoButtonDiv').on(clickEventType ,function() {

					var thisLogoSRC = $(this).attr("data-imageURL");
					var thisLogoName = $(this).attr("data-logoName");
					
					logomatic(thisLogoSRC,thisLogoName,'logo');
					logomatic(thisLogoSRC,thisLogoName,'cc-logo');

					

				});

				// color buttons function
				$('.colorButton').on(clickEventType ,function() {
					var buildColorData = '';
					
					// flip boolean to 1 indicating custom color selection has been made
					localStorage.setItem('byoNitro-ccHasChanged', 1);
					
					// wipe selected class from all colorButtons
					colorclear();
					
					// highlight this clicked button
					var colorbtn = '#'+$(this).attr("id");
					$(colorbtn).attr("class", "colorButton selected");

					// paint the part
					var thisColor = $(this).attr("id").replace('-btn','');
					paintomatic(thisColor, boatPart, 'cc-');
					paintomatic(thisColor, boatPart, '');

					// update the stored color data
					setBuildColorData(thisColor, boatPart);

					// update the color config displayed
					updateColorConfigDisplay();

					// set name and price values
					selectedCombo = 'Custom Colors Applied';

				});




				// make sure we have 3 color combos, if so click the first combo swatch
				if($('.three-color-palette .comboButtonDiv').length > 0){
					// yes, then click the first combo
					$('.three-color-palette .comboButtonDiv .comboButton').first().click();
				} else {
					// no? then hide the 3 color combo option
					$('#colorOption-3color').parent().hide();
				}

				// make sure we have 4 color combos 
				if(!($('.four-color-palette .comboButtonDiv').length > 0)){
					// no? then hide the option
					$('#colorOption-4color').parent().hide();
				}




				//Defining the click action on the Launch Custom Colors button,
				$('#btn-launch-custom-colors').bind("click touchstart", function(){

					// hack to ensure all parts are painted on the cc boat render
					if($('.comboButton.selected').length) {
						var comboname = $('.comboButton.selected').attr("desc");
						var myid = $('.comboButton.selected').attr("id");
						var combobtn = '#'+myid;
						combomatic(comboname, combobtn);
					}

					//console.log(colorData);
					
					// stores colorData to fallback to if the customer colors cancel button is clicked
					localStorage.setItem('byoNitro-fallbackColorOption', $('.nitro-colorOption-header.selected').attr('id'));
					localStorage.setItem('byoNitro-fallbackColorData', JSON.stringify(previousColorData));

					// boolean to keep track if user has made any custom color selections
					localStorage.setItem('byoNitro-ccHasChanged', 0);

					$('.build-a-boat').hide();
					$('.custom-color-ui').fadeIn('fast');

					$('#colorOption-customColor').click();

					var t = '';
					
					// scroll to the top
					if($('#configuratorTop').length > 0){
						t = $('#configuratorTop');
					}

					if($('#byoContainer').length > 0){
						t = $('#byoContainer');
					}

					if(t !== ''){
						$('html, body').animate({
							scrollTop: t.offset().top
						}, 500);
					}
					
				});

				// Defining the click action on the SAVE button in the custom color palette
				$('#btn-saveCustomColors').bind("click touchstart", function(){

					$('.build-a-boat').fadeIn('fast');
					$('.custom-color-ui').hide();

					$('#btn-nextStep').click();

					var t = '';

					// scroll to the top
					if($('#configuratorTop').length > 0){
						t = $('#configuratorTop');
					}

					if($('#byoContainer').length > 0){
						t = $('#byoContainer'); 
					}

					if(t !== ''){
						$('html, body').animate({
							scrollTop: t.offset().top
						}, 500);
					}
					

				});

				// Hotwire the CANCEL button in the custom color palette
				$('#btn-cancelCustomColors').bind("click touchstart", function(){

					// did the user make any color selections while in custom color mode
					if(localStorage.getItem('byoNitro-ccHasChanged')){

						// fall back to previous color data - overwrite the stored color data with the color data that was defined before making custom selections.
						var coID = localStorage.getItem('byoNitro-fallbackColorOption'),
							fallbackComboID = localStorage.getItem('byoNitro-selectedComboID'),
							cd = localStorage.getItem('byoNitro-fallbackColorData');
						localStorage.setItem("byoNitro-buildColorData", cd);
						previousColorData = JSON.parse(cd);

						// if the previous color config was a combo selection, click it
						if(coID !== 'colorOption-customColor'){
							$('.comboButton[id*="'+fallbackComboID+'"]').click();
						}

						// flip the custom colors has changed flag back to false
						localStorage.setItem('byoNitro-ccHasChanged', 0);

					}
					
					// hide the custom color interface, and show the build interface
					$('.custom-color-ui').hide();
					$('.build-a-boat').fadeIn('fast');

					// scroll to the top
					$('html, body').animate({
						scrollTop: $('#configuratorTop').offset().top
					}, 500);


				});


				
				// define what happens when a part on the boat image in custom colors is clicked upon
				console.log('#cc-' + localStorage.getItem('productVarName') + '-layers path')
			
				$('#cc-' + localStorage.getItem('productVarName') + '-layers > path').bind("click touchstart", function(){

					var pathID = $(this).attr('id');
					var partID = replaceAll(pathID, 'cc-', '');
					var partString = partID.toLowerCase();


					if(partID !== '' && partID != null){

						groupclear();
						paletteclear();

						// click the appropriate tab
						if(partString.indexOf("deck") !== -1){
							$('#deck-tab').addClass('selected');
							$('#deck-parts-stack').fadeIn('fast');

						} else if(partString.indexOf("hull") !== -1){
							$('#hull-tab').addClass('selected');
							$('#hull-parts-stack').fadeIn('fast');

						} else if(partString.indexOf("interior" !== -1)){
							$('#interior-tab').addClass('selected');
							$('#interior-parts-stack').fadeIn('fast');

						} else if(partString.indexOf("trailer" !== -1)){
							$('#trailer-tab').addClass('selected');
							$('#trailer-parts-stack').fadeIn('fast');

						} else if(partString === 'Console'){
							$('#deck-tab').addClass('selected');
							$('#deck-parts-stack').fadeIn('fast');

						}

						$('#' + partID + '-btn').click();

					}

				});
				
				
				// what happens when we click on a color option header.
				$('.nitro-colorOption-header').bind("click touchstart", function(){
					
					var coID = $(this).attr('id');
					var coLen = $('.nitro-colorOption-header').length;

					if(coID === 'colorOption-customColor'){
						localStorage.setItem('byoNitro-fallbackColorOption', $('.nitro-colorOption-header.selected').attr('id'));
					}

					// clear any previously selected options
					$('.nitro-colorOption-header').each(function(i){
						
						$(this).removeClass('selected');
						
						// if we have reached the end of our each loop
						if(i === coLen-1){
							
							// now highlight the clicked color option
							$('#'+coID).addClass('selected');
							
							// if we clicked on premium color option, click the first 3 color combo
							if(coID === 'colorOption-3color'){
								$('.three-color-palette .comboButtonDiv .comboButton').first().click();
							}

							// if we clicked on elite color option, click the first 4 color combo 
							if(coID === 'colorOption-4color'){
								$('.four-color-palette .comboButtonDiv .comboButton').first().click();
							}

							// if we clicked on custom color your nitro, remove any combo selections and update info displayed
							if(coID === 'colorOption-customColor'){

								$('.comboButton.selected').removeClass('selected');

								updateColorConfigDisplay();
		
								window.updateSumCol();
		
							}
						}
					});
					
				});

				// nitro specific - loading the build color selections
				if(JSON.stringify(retrievedBuildJSON) !== '{}'){

					waitForElementToExist('.bab-sum-col #selected-options-items', function(){
						
						var x = retrievedBuildJSON.colorOptions;

						localStorage.setItem('byoNitro-buildColorData', JSON.stringify(x));
						
						if(typeof x.selectedColorOption !== 'undefined'){
							
							// if the build is a combo selection, click the color combo
							if(x.selectedColorOption !== 'colorOption-customColor' && typeof x.combo.name !== 'undefined'){
								$('#'+x.combo.name+'-btn').click();
							}
							// if the build has custom colors, load the custom colors
							if(x.selectedColorOption === 'colorOption-customColor'){

								// click the custom colors option button
								$('#colorOption-customColor').click();
								//console.log(x.colorData['length'])

								// paint All The Parts!
								for (var i = 0; i < x.colorData['length']; i++) {

									var boatpart = x.colorData[i].part;
									var color = x.colorData[i].color.replace("#", "");

									if((typeof color !== "undefined") && (typeof boatpart !== "undefined")){
										if((color !== null) && (boatpart !== null)){ 
				
											if(boatpart.indexOf('#') !== -1){
												boatpart = boatpart.replace(/#/g, "");
											}
				
											if(color.indexOf('#') !== -1){
												color = color.replace(/#/g, "");
											}
				
											if(boatpart != "logo" && boatpart != "Graphic"){
													
												var colorPattern = $('#' + color + ' image').attr("xlink:href");   
				
												var targetPartPattern = '#' + boatpart + '-pattern image';
												$(targetPartPattern).attr("xlink:href", colorPattern);
				
												var targetPartPattern = '#cc-' + boatpart + '-pattern image';
												$(targetPartPattern).attr("xlink:href", colorPattern);
			

												var targetPatternId = color + ' image';
												var colorPattern = $(targetPatternId).attr("xlink:href");
												$('.' + boatpart + '-image').attr("xlink:href", colorPattern);

											}
										}
									}

								}

								// update the color config displayed
								updateColorConfigDisplay();

								// set name and price values
								selectedCombo = 'Custom Colors Applied';

							}
						}

					});
				}






				
			}); // END getScript defs.js
		}); // END getScript definitions.js
	

	}); // END div load prodductSVGfile into 

}); // END div load productSVGfile into custom colors bmt
