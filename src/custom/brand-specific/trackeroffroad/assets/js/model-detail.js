$( document ).ready(function() {

    window.prodSiteURL = 'https://assets.whiterivermg.com';

    window.escapeRegExp = function(string){
        return string.toString().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    window.replaceAll = function(str, term, replacement) {
        //console.log("str: " + str + ", term: " + term + ", replacement: " + replacement)
        if(str){ return str.toString().replace(new RegExp(escapeRegExp(term), 'g'), replacement); }
    }

    // format: displayDollarFormat.format(number)
    window.displayDollarFormat = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    });



    

    // make sure we are on a model detail page and not on a build page and not an AEM edit page.
    var loc = window.location.href;

    if(loc.indexOf('.build') == -1 && loc.indexOf('editor.html') == -1 && typeof $('.boatID').attr('data-boatID') != 'undefined') {


        window.productID = $('.boatID').attr('data-boatID');

        // clear out some local storage vars
        localStorage.removeItem("modelColorOptions"+productID);
        localStorage.removeItem("originalNoHagglePrice"+productID);
        localStorage.removeItem("originalYourPrice"+productID);
        localStorage.removeItem("originalInflationBusterPrice"+productID);
        localStorage.removeItem("productVarName"+productID);
        localStorage.removeItem("byoProductData"+productID);
        localStorage.removeItem("byoModelAssetsPath"+productID);
        localStorage.removeItem("byoDefinitionsPath"+productID);
        localStorage.removeItem("byoSwatchPath"+productID);
        localStorage.removeItem("colorOptionsPath"+productID);
        localStorage.removeItem("hasColorOptions"+productID);
        localStorage.removeItem("modelColorOptions"+productID);
        localStorage.removeItem("byoSelectedColorOptions"+productID);
        localStorage.removeItem("byoSelectedColorOptionImage"+productID);

        // retain initial prices
        localStorage.setItem("originalNoHagglePrice"+productID, $('.prices .price-value').text().replaceAll('$','').replaceAll(',','') );
        localStorage.setItem("originalYourPrice"+productID, $('.your-price .price-value').text().replaceAll('$','').replaceAll(',','') );
        localStorage.setItem("originalInflationBusterPrice"+productID, $('.prices .price-sale-value').text().replaceAll('$','').replaceAll(',','') );


        window.initiateCarousel = function(thisColorID){

            // pull color option data from local storage
            var co = JSON.parse(localStorage.getItem("modelColorOptions"+productID));

            //console.log(co)
            
            // loop over color options
            for(var img in co){
                
                // if this is the color option that was clicked upon ...
                if(co[img].colorID === thisColorID){
                    
                    // var buckets for both thumbs and full images
                    var carouselThumbs = '',
                        carouselImages = '';

                    //console.log(co[img].colorImages)
                    
                    // loop over any images for this color option
                    for(var imgKey in co[img].colorImages){
                        
                        // insert this image into the carousel
                        carouselImages += '<div><img src="https://assets.whiterivermg.com'+co[img].colorImages[imgKey].damPath+'"></div>';

                    } // END loop over images this color option
                    $('.owl-carousel').first().html(carouselImages);
                    
                } // END if this is the color option that was clicked upon.
            } // END loop over color options

            // destroy the old owlCarousel
            $('.owl-carousel').first().owlCarousel("destroy");
                                            
            // Reinit the owlCarousel
            var owlCar =  $('.owl-carousel').first().owlCarousel({
                center: true,
                autoHeight: false,
                lazyLoad: false,
                items: 1,
                loop: true,
                nav:true,
                navText:['<i aria-label="Next"></i>','<i aria-label="Previous"></i>']
            });

            // bug fix for autoHeight to wait until the images have loaded before setting the height of the carousel
            var carTimer = setInterval(function() {
                if(owlCar.height() > 1) clearInterval(carTimer);
                owlCar.trigger('refresh.owl.carousel', [100]);
            }, 300);

        }


        getSwatchPath = function(swatchName) {
            swatchPath = window.prodSiteURL + localStorage.getItem("byoSwatchPath"+productID) + swatchName + '.png';		
            return swatchPath;
        }


        // deciding if we are dealing with a touch screen or a clickity device ...
        window.clickEventType = ( (document.ontouchstart!==null) ? 'click' : 'touchstart' );
        
        // set DAM paths
        var assetsRootPath = "/content/dam/wrmg/",
        globalAssetsPath = assetsRootPath + "BYO-GlobalAssets/";

        

        // insert a div container for swatches we will insert HTML into this later
        $('#mpbyourprice .model-name').after('<h6 class="colorhead">Color</h6><div class="selected-color-name"></div><div id="color-swatches"></div>');

        // move description
        $('#mpbyourprice .model-name').after($('#priceColumnDescription').html());
        $('#priceColumnDescription').html('');

        //move description title
        $('#mpbyourprice .model-name').after($('.priceColumnDescriptionTitle').html());
        $('.priceColumnDescriptionTitle').html('');

        if(typeof productID !== 'undefined'){

            // blow away the carousel
            $('.grid-container .imageCarousel').first().html("");
            var carouselSeedHTML = ''
            carouselSeedHTML += '<div class="grid-x  none-bottom none-top   ">';
            carouselSeedHTML += '    <div class="cell">';
            carouselSeedHTML += '        <div class="image-carousel">';
            carouselSeedHTML += '            <div id="topCarousel" class="owl-carousel owl-theme">';

            carouselSeedHTML += '            </div>';
            carouselSeedHTML += '        </div>';
            carouselSeedHTML += '    </div>';
            carouselSeedHTML += '</div>';
            $('.grid-container .imageCarousel').first().html(carouselSeedHTML);


            $.ajax({
                dataType: "json",
                url: 'https://assets.whiterivermg.com/bin/boating-sites/modeldata?id=' + productID
            }).done(function( data ) {

                //console.log(data)
                
                // store BYO model data for quick access later
                localStorage.setItem( 'byoProductData'+productID, JSON.stringify(data) );

                var productJSONdata = data;

                // Defining the simple vars ... variables with simple values
                window.BOATNAME = '',
                    BOATORDER = 0,
                    BOATPRICESWITCH = 0,
                    BRANDID = 0,
                    BRANDNAME = '',
                    PROMOSAVINGPRICE = 0,
                    ZONECOST = 0,
                    LENGTH = '',
                    PACKAGEDESCRIPTION = '',
                    HULLTYPE = '',
                    BOATID = 0,
                    SEGMENTNAME = '',
                    LIGHTSWITCH = 0,
                    MODELYEAR = '2022',
                    MOTORPROMOPRICE = 0,
                    COLORSWITCH = 0,
                    MOTORTYPE = '',
                    PREPCOST = 0,
                    MOTORID = 0,
                    MPHMIN = '',
                    PRICE = 0,
                    PROMOPACKAGEPRICE = 0,
                    MOTORBRAND = '',
                    FAMILYID = 0,
                    MOTORPRICE = 0,
                    BMTINCLUDED = 0,
                    BUILDSWITCH = 0,
                    PRICEDIFFERENCE = 0,
                    ZONENUMBER = 0,
                    MPHMAX = '',
                    MOTORNAME = '',
                    PARENTID = 0,
                    SEGMENTID = 0,
                    CURRENTMODEL = 0;

                // Defining the structured vars ... variable objects
                window.SPECS = {},
                    COLORS = {},
                    ALLMOTORS = {},
                    ALLFEATURES = {},
                    ALLOPTIONS = {};
                
                // let's roll through all of the top level items in our data object
                $.each(productJSONdata, function(key, val){

                    //console.log(key + " : " + val )
                    
                    switch(key) {

                        case 'BOATNAME': 			BOATNAME = val;
                                                    var massagedProductName = BOATNAME.toString().replace(/\s+/g, '-');
                                                    $("#productVarName").text(massagedProductName);
                                                    localStorage.setItem('productVarName'+productID, massagedProductName)
                                                    break;

                        case 'BOATORDER': 			BOATORDER = val; break;
                        case 'BOATPRICESWITCH': 	BOATPRICESWITCH = val; break;
                        case 'BRANDID': 			BRANDID = val; break;
                            
                        case 'BRANDNAME': 			BRANDNAME = val;
                                                    break;
                            
                        case 'PROMOSAVINGPRICE': 	PROMOSAVINGPRICE = val; break;

                        case 'LENGTH': 				LENGTH = val; break;
                        case 'PACKAGEDESCRIPTION': 	PACKAGEDESCRIPTION = val; break;
                        case 'HULLTYPE': 			HULLTYPE = val; break;
                        case 'BOATID': 				BOATID = val; break;
                        case 'SEGMENTNAME': 		SEGMENTNAME = val; break;
                        case 'LIGHTSWITCH': 		LIGHTSWITCH = val; break;
                            
                        case 'MODELYEAR': 			MODELYEAR = val;
                                                    $('.bab-modelYear').html(MODELYEAR);
                                                    break;
                            
                        case 'MOTORPROMOPRICE': 	MOTORPROMOPRICE = val; break;
                        case 'COLORSWITCH': 		COLORSWITCH = val; break;
                        case 'MOTORTYPE': 			MOTORTYPE = val; break;

                        case 'MOTORID': 			MOTORID = val; break;
                        case 'MPHMIN': 				MPHMIN = val; break;
                        case 'PRICE':				PRICE = val; break;
                        case 'PROMOPACKAGEPRICE': 	PROMOPACKAGEPRICE = val; break;
                        case 'MOTORBRAND':			MOTORBRAND = val; break;
                        case 'FAMILYID':			FAMILYID = val; break;
                        case 'MOTORPRICE': 			MOTORPRICE = val; break;
                        case 'BMTINCLUDED':			BMTINCLUDED = val; break;
                            
                        case 'BUILDSWITCH': 		BUILDSWITCH = val;
                                                    break;
                        
                        case 'PRICEDIFFERENCE': 	PRICEDIFFERENCE = val; break;
                        case 'MPHMAX': 				MPHMAX = val; break;
                        case 'MPHMAX': 				MPHMAX = val; break;
                        case 'MOTORNAME': 			MOTORNAME = val; break;
                        case 'PARENTID': 			PARENTID = val; break;
                        case 'SEGMENTID': 			SEGMENTID = val; break;
                        case 'CURRENTMODEL': 		CURRENTMODEL = val; break;

                        case 'COLORS':			    break;

                        case 'SPECS':				break;

                        case 'ALLMOTORS':			break;

                        case 'ALLFEATURES':		    break;

                        case 'ALLOPTIONS': 			break;

                        default: var foo = 'foo';

                    }; // END key switch

                }); // END productJSONdata EACH loop

                var brandIDnoyr = BRANDID.toString();
                brandIDnoyr = brandIDnoyr.slice(0, -4);
            
                var brandDir = replaceAll(BRANDNAME,'&reg;','');
                brandDir = replaceAll(brandDir,'®','');
                brandDir = replaceAll(brandDir,'&trade;','');
                brandDir = replaceAll(brandDir,'™','');
                brandDir = replaceAll(brandDir,' & ',' ');
                brandDir = replaceAll(brandDir,' ','-');
                brandDir = replaceAll(brandDir,"'",'');
                brandDir = brandDir.toLowerCase();
                
                var modDir = replaceAll(BOATNAME,'&reg;','');
                modDir = replaceAll(modDir,'®','');
                modDir = replaceAll(modDir,'&trade;','');
                modDir = replaceAll(modDir,'™','');
                modDir = replaceAll(modDir,' & ',' ');
                modDir = replaceAll(modDir,' ','-');
                modDir = replaceAll(modDir,"'",'');
                modDir = modDir.toLowerCase();
                
                var segDir = replaceAll(SEGMENTNAME,'&reg;','');
                segDir = replaceAll(segDir,'®','');
                segDir = replaceAll(segDir,'&trade;','');
                segDir = replaceAll(segDir,'™','');
                segDir = replaceAll(segDir,' & ',' ');
                segDir = replaceAll(segDir,' ','-');
                segDir = replaceAll(segDir,"'",'');
                segDir = replaceAll(segDir,"/",'---');
                segDir = segDir.toLowerCase();
                    
                // build some paths 
                var modelAssetsPath = assetsRootPath + brandDir + "/" + MODELYEAR + "/" + segDir + "/" + modDir + "/";
                var definitionsPath = assetsRootPath + brandDir + "/" + MODELYEAR + "/" + segDir + "/definitions.js";
                var swatchPath = assetsRootPath + brandDir + "/" + MODELYEAR + "/color-swatches/";
                //console.log(modelAssetsPath)
                //console.log(definitionsPath)
                //console.log("boohoo: "+swatchPath)
                
                localStorage.setItem("byoModelAssetsPath"+productID, modelAssetsPath);
                localStorage.setItem("byoDefinitionsPath"+productID, definitionsPath);
                localStorage.setItem("byoSwatchPath"+productID, swatchPath);

                var swatchConcatenation = '',
                    colorCtr = 0,
                    colorOptionsPath =  assetsRootPath + brandDir + "/" + MODELYEAR + "/" + segDir + "/" + modDir + "/byo-assets/color-options/";
                
                localStorage.setItem("colorOptionsPath"+productID, colorOptionsPath);
                //console.log(window.prodSiteURL + '/bin/boating-sites/dam-assets?path=' + colorOptionsPath);
                
                // Read the DAM, looking for color option directory structure to build out the color options for this model
                $.ajax({
                
                    dataType: "json",
                    url: window.prodSiteURL + '/bin/boating-sites/dam-assets?path=' + colorOptionsPath

                }).done(function( data ) {
                    
                    // if color options were found ...
                    if(data.assets){
                        
                        //console.log(data.assets)
                        
                        // sort by color option name
                        data.assets.sort(function (a, b) {
                            return a.name.localeCompare(b.name);
                        });

                        //console.log(data.assets)
                        
                        localStorage.setItem("hasColorOptions"+productID, "yes");
                        
                        // setting up an array for all color options
                        var modelColorOptions = new Array();


                        if(typeof data === 'object'){
                            if(typeof data.assets === 'object'){
                                for(let colorOptionIndex = 0; colorOptionIndex < data.assets.length; colorOptionIndex ++){
                                    if(typeof data.assets[colorOptionIndex] === 'object'){


                                        
                                        // TODO: refactor this so that it is easier to read
                                        let thisColorID = data.assets[colorOptionIndex].name,
                                            tempName = replaceAll(data.assets[colorOptionIndex].name,'---',' / '),
                                            splitName = tempName.split('-', 4),
                                            swatchName = replaceAll(splitName[1],' / ','---'),
                                            swatchPath = getSwatchPath(swatchName), 
                                            
                                            thisColorOptionName = replaceAll(splitName[1],'__',' - '),
                                            thisColorPrice = splitName[2],
                                            thisDefaultColor = splitName[3],
                                            thisClass = 'swatch ';

                                        thisColorOptionName = replaceAll(thisColorOptionName, '  ', ' - ');

                                        
                                        String.prototype.setCharAt = function(index,chr) {
                                            if(index > this.length-1) return str;
                                            return this.substr(0,index) + chr + this.substr(index+1);
                                        }

                                        let dataCON = thisColorOptionName;

                                        if(thisColorOptionName.indexOf('@') > -1){

                                            

                                            let s = thisColorOptionName.indexOf('@');
                                            let xxxx = thisColorOptionName.setCharAt(s,'<span style="text-transform:uppercase">');

                                            let e = xxxx.indexOf('@');
                                            xxxx = xxxx.setCharAt(e,'</span>');

                                            //console.log("xxxx: " + xxxx);
                                            thisColorOptionName = xxxx;

                                            

                                        }
                                        
                                        //console.log(thisColorOptionName)


                                        // now we go inside the directory and read all of the images inside
                                        $.ajax({
                                            dataType: "json",
                                            url: window.prodSiteURL + '/bin/boating-sites/dam-assets?path=' + data.assets[colorOptionIndex].path
                                        }).done(function(colorOptionImages) {

                                            //debugger
                                            //console.log(colorOptionImages)

                                            let thisColorImages = new Array();
                                            if(typeof colorOptionImages === 'object'){
                                                if(typeof colorOptionImages.assets === 'object'){
                                                    for(let colorOptionImagesIndex = 0; colorOptionImagesIndex < colorOptionImages.assets.length; colorOptionImagesIndex++){
                                                        
                                                        
                                                        // cut file extension off of filename
                                                        let thisDisplayName = colorOptionImages.assets[colorOptionImagesIndex].name.split('.').slice(0, -1).join('.');
                                                        // split it at the hyphen
                                                        thisDisplayNameSplit = thisDisplayName.split('-', 2);
                                                        // use the string left after the hyphen
                                                        thisDisplayName = thisDisplayNameSplit[1];
                                                        // replace underscores with spaces
                                                        thisDisplayName = replaceAll(thisDisplayName,'_',' ');

                                                        // push this image into the image array for this option
                                                        thisColorImages.push({"displayName": thisDisplayName, "filename": colorOptionImages.assets[colorOptionImagesIndex].name, "damPath": colorOptionImages.assets[colorOptionImagesIndex].path});

                                                    }
                                                }
                                            }

                                            // sort by image filename
                                            thisColorImages.sort(function (a, b) {
                                                return a.filename.localeCompare(b.filename);
                                            });


                                            // push this color option into the array of options
                                            modelColorOptions.push({"displayName": dataCON,
                                                                "swatchPath": swatchPath,
                                                                "colorPrice": thisColorPrice,
                                                                "colorImages": thisColorImages,
                                                                "colorID": thisColorID,
                                                                "defaultColor": thisDefaultColor});

                                            modelColorOptions.sort(function (a, b) {
                                                return a.colorID.localeCompare(b.colorID);
                                            });

                                            // save the color option in local storage for later
                                            localStorage.setItem("modelColorOptions"+productID, JSON.stringify(modelColorOptions));
                                            
                                            //console.log(modelColorOptions)
                                            





                                            var cpi = '';

                                            if(thisColorImages.length > 0){
                                                cpi = thisColorImages[0].damPath;
                                            }

                                            thisColorOptionName = replaceAll(thisColorOptionName, "_", " ");
                                            dataCON = replaceAll(dataCON, "_", " ");

                                            if(thisDefaultColor == 1){
                                                thisClass += " selected";
                                                //console.log(thisColorID)
                                                initiateCarousel(thisColorID);
                                                var displayColorPrice = ' <span class="medium-gray">(Included)</span>'
                                                if(thisColorPrice != 0)  { displayColorPrice = ' <span class="medium-gray">(+'+displayDollarFormat.format(thisColorPrice)+')</span>'; }
                                                $('.selected-color-name').html(thisColorOptionName + displayColorPrice)
                                            }
                                            
                                            // build HTML for the swatch for this option
                                            swatchConcatenation += '<div class="'+thisClass+'" data-swatchImageURL="'+swatchPath+'" data-colorID="'+thisColorID+'" data-displayColorOptionName="'+thisColorOptionName+'" data-colorOptionName="'+dataCON+'" data-defaultColor="'+thisDefaultColor+'" data-colorPrice="'+thisColorPrice+'" data-colorProductImage="'+ cpi+'">';
                                            swatchConcatenation += '	<div class="swatch-circle-highlight">';
                                            swatchConcatenation += '		<div class="swatch-circle custom">';
                                            swatchConcatenation += '			<div class="stripe" style="background-image:url(\''+swatchPath+'\');"></div>';
                                            swatchConcatenation += '		</div>';
                                            swatchConcatenation += '	</div>';
                                            swatchConcatenation += '</div>';

                                            // insert swatch HTML
                                            $('#color-swatches').html(swatchConcatenation);

                                            // defining what happens when you click on something that has class .swatch
                                            $('.swatch').click(function(){

                                                // remove selected class from all swatches
                                                $('.swatch').each(function(){
                                                    $(this).removeClass('selected');
                                                });
                                                
                                                // and then add selected class to this swatch
                                                $(this).addClass('selected');

                                                // display selected color and price
                                                var money = $(this).attr('data-colorPrice');
                                                var moneyTxt = $(this).attr('data-displayColorOptionName');
                                                var displayColorPrice = ' <span class="medium-gray">(Included)</span>'
                                                if(money != 0)  { displayColorPrice = ' <span class="medium-gray">(+'+displayDollarFormat.format(money)+')</span>'; }
                                                $('.selected-color-name').html(moneyTxt + displayColorPrice);

                                                if(localStorage.getItem('originalNoHagglePrice'+productID) == '') {
                                                    localStorage.setItem("originalNoHagglePrice"+productID, $('.prices .price-value').text().replaceAll('$','').replaceAll(',','') );
                                                }

                                                if(localStorage.getItem('originalYourPrice'+productID) == '') {
                                                    localStorage.setItem("originalYourPrice"+productID, $('.your-price .price-value').text().replaceAll('$','').replaceAll(',','') );
                                                }

                                                if(localStorage.getItem('originalInflationBusterPrice'+productID) == '') {
                                                  localStorage.setItem("originalInflationBusterPrice"+productID, $('.prices .price-sale-value').text().replaceAll('$','').replaceAll(',','') );
                                                }

                                                var noHagglePrice = parseInt(localStorage.getItem('originalNoHagglePrice'+productID)) + parseInt(money);
                                                var yourPrice = parseInt(localStorage.getItem('originalYourPrice'+productID)) + parseInt(money);
                                                var inflationBusterPrice = parseInt(localStorage.getItem('originalInflationBusterPrice'+productID)) + parseInt(money);  

                                                // update displayed prices
                                                $('.prices .price-value').text(displayDollarFormat.format(noHagglePrice));
                                                $('.your-price .price-value').text(displayDollarFormat.format(yourPrice));
                                                $('.prices .price-sale-value').text(displayDollarFormat.format(inflationBusterPrice));
                                                
                                                var thisColorID = $(this).attr('data-colorID');
                                                //console.log(thisColorID)

                                                // build the carousel for this color option
                                                initiateCarousel(thisColorID);
                                                
                                                localStorage.setItem('byoSelectedColorOptions'+productID, thisColorID);
                                                localStorage.setItem('byoSelectedColorOptionImage'+productID, thisColorID);

                                                    
                                            }); // END $('.swatch').click(function(){



                                        });

                                        

                                    }
                                }
                            }
                        }

                        


                        
                    } else {
                        
                        // hide color option things
                        //$('.bab-color').hide();
                        //$('.custom-build-nav-item[data-babStep="color"]').hide();
                        
                    }// END if(data.assets);

                    // END .ajax.done()
                
                }).fail(function(a){
                    
                    //console.log(a)
            
                    // END .ajax.fail()
                }); 

            });

        }

        
    } else if($('.model-listing.show-color-options').length > 0){



        window.putColorImage = function(thisColorID, thisModelClassName, thisModDir){

            // pull color option data from local storage
            var co = JSON.parse(localStorage.getItem("colors-"+thisModDir));

            //console.log(co)
            
            // loop over color options
            for(var img in co){
                
                // if this is the color option that was clicked upon ...
                if(co[img].colorID === thisColorID){
                    
                    var carouselImages = '';
                    
                    // insert this image into the carousel
                    carouselImages += '<div><img src="https://assets.whiterivermg.com'+co[img].colorImages[0].damPath+'"></div>';

                    // insert the html to display the image
                    $('.'+thisModelClassName+' .image-carousel').html(carouselImages);
                    
                } // END if this is the color option that was clicked upon.
            } // END loop over color options


        }

        // retrieve the value of a URL name/value pair.
        var getURLParameter = function(sParam) {
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

        if(getURLParameter('doColors') === 'yes'){
                
            
            for(var x = 0; x < 10; x++){

                //console.log($('.modelListingItem'+x).length)

                if($('.modelListingItem'+x).length > 0) {

                    //console.log('Beginning '+'.modelListingItem'+x);

                    var thisModelListing = $('.modelListingItem'+x);
                    var thisModelClassName = 'modelListingItem'+x;

                    localStorage.setItem(thisModelClassName+"-originalNoHagglePrice"+productID,'');

                    var modYr = thisModelListing.find('.model-year').text().trim();
                    var modDir = thisModelListing.find('.model-name').text().trim();

                    modDir = replaceAll(modDir,'Â®','');
                    modDir = replaceAll(modDir,'&trade;','');
                    modDir = replaceAll(modDir,'â„¢','');
                    modDir = replaceAll(modDir,' & ',' ');
                    modDir = replaceAll(modDir,' ','-');
                    modDir = replaceAll(modDir,"'",'');

                    modDir = modDir.toLowerCase();
                    //console.log(modDir)
                
                    var segDir = '';
                    if(location.href.indexOf('atv.html') > -1) {
                        segDir = 'atv';
                    } else if(location.href.indexOf('side-by-side.html') > -1) {
                        segDir = 'side-by-side';
                    }
                    
                    var swatchLocation = '/content/dam/wrmg/tracker-off-road/' + modYr + "/color-swatches/";
                
                    var colorOptionsPath = '/content/dam/wrmg/tracker-off-road/' + modYr + '/' + segDir + '/' + modDir + '/byo-assets/color-options/';
                
                    // insert a div container for swatches we will insert HTML into this later
                    thisModelListing.find('.model-name').after('<h6 class="colorhead">Color</h6><div class="selected-color-name"></div><div id="color-swatches"></div>');

                    const goGetColorOptions = getColorOptions(thisModelClassName, modDir);
                    //console.log(goGetColorOptions)
                    async function getColorOptions(thisModelClassName, modDir) {
                        let result;
                        var swatchConcatenation = '';
                        // Read the DAM, looking for color option directory structure to build out the color options for this model
                        try {
                            result = await $.ajax({
                                dataType: "json",
                                url: window.prodSiteURL + '/bin/boating-sites/dam-assets?path=' + colorOptionsPath
                            }).done(function( data ) {

                                //console.log(thisModelClassName)
                                
                                //console.log(data)

                                // if color options were found ...
                                if(data.assets){
                                    
                                    // sort by color option name
                                    data.assets.sort(function (a, b) {
                                        return a.name.localeCompare(b.name);
                                    });
                        
                                    //console.log(data.assets)

                                    // setting up an array for all color options
                                    var modelColorOptions = new Array();
                        
                                    if(typeof data === 'object'){
                                        if(typeof data.assets === 'object'){
                                            for(let colorOptionIndex = 0; colorOptionIndex < data.assets.length; colorOptionIndex ++){
                                                if(typeof data.assets[colorOptionIndex] === 'object'){
                        
                                                    // TODO: refactor this so that it is easier to read
                                                    let thisColorID = data.assets[colorOptionIndex].name,
                                                        tempName = replaceAll(data.assets[colorOptionIndex].name,'---',' / '),
                                                        splitName = tempName.split('-', 4),
                                                        swatchName = replaceAll(splitName[1],' / ','---'),
                                                        swatchPath = swatchLocation + swatchName + '.png', 
                                                        
                                                        thisColorOptionName = replaceAll(splitName[1],'__',' - '),
                                                        thisColorPrice = splitName[2],
                                                        thisDefaultColor = splitName[3],
                                                        thisClass = 'swatch ';
                        
                                                    thisColorOptionName = replaceAll(thisColorOptionName, '  ', ' - ');
                        
                                                    
                                                    String.prototype.setCharAt = function(index,chr) {
                                                        if(index > this.length-1) return str;
                                                        return this.substr(0,index) + chr + this.substr(index+1);
                                                    }
                        
                                                    let dataCON = thisColorOptionName;
                        
                                                    if(thisColorOptionName.indexOf('@') > -1){
                        
                                                        let s = thisColorOptionName.indexOf('@');
                                                        let xxxx = thisColorOptionName.setCharAt(s,'<span style="text-transform:uppercase">');
                        
                                                        let e = xxxx.indexOf('@');
                                                        xxxx = xxxx.setCharAt(e,'</span>');
                        
                                                        //console.log("xxxx: " + xxxx);
                                                        thisColorOptionName = xxxx;
                                                        
                        
                                                    }
                                                    
                                                    //console.log(thisColorOptionName)

                                                    // now we go inside the directory and read all of the images inside
                                                    const goGetColorOptionImages = getColorOptionImages(thisModelClassName, modDir);

                                                    async function getColorOptionImages(thisModelClassName, modDir) {
                                                        let result;
                                                        try {
                                                            result = await $.ajax({
                                                                dataType: "json",
                                                                url: window.prodSiteURL + '/bin/boating-sites/dam-assets?path=' + data.assets[colorOptionIndex].path
                                                            }).done(function(colorOptionImages) {
                                
                                                                //debugger
                                                                //console.log(colorOptionImages)
                                
                                                                let thisColorImages = new Array();
                                                                if(typeof colorOptionImages === 'object'){
                                                                    if(typeof colorOptionImages.assets === 'object'){
                                                                        for(let colorOptionImagesIndex = 0; colorOptionImagesIndex < colorOptionImages.assets.length; colorOptionImagesIndex++){
                                                                            
                                                                            
                                                                            // cut file extension off of filename
                                                                            let thisDisplayName = colorOptionImages.assets[colorOptionImagesIndex].name.split('.').slice(0, -1).join('.');
                                                                            // split it at the hyphen
                                                                            thisDisplayNameSplit = thisDisplayName.split('-', 2);
                                                                            // use the string left after the hyphen
                                                                            thisDisplayName = thisDisplayNameSplit[1];
                                                                            // replace underscores with spaces
                                                                            thisDisplayName = replaceAll(thisDisplayName,'_',' ');
                                
                                                                            // push this image into the image array for this option
                                                                            thisColorImages.push({"displayName": thisDisplayName, "filename": colorOptionImages.assets[colorOptionImagesIndex].name, "damPath": colorOptionImages.assets[colorOptionImagesIndex].path});
                                
                                                                        }
                                                                    }
                                                                }
                                
                                                                // sort by image filename
                                                                thisColorImages.sort(function (a, b) {
                                                                    return a.filename.localeCompare(b.filename);
                                                                });
                                
                                
                                                                // push this color option into the array of options
                                                                modelColorOptions.push({
                                                                                    "modelClassName": thisModelClassName,
                                                                                    "displayName": dataCON,
                                                                                    "swatchPath": swatchPath,
                                                                                    "colorPrice": thisColorPrice,
                                                                                    "colorImages": thisColorImages,
                                                                                    "colorID": thisColorID,
                                                                                    "defaultColor": thisDefaultColor});
                                
                                                                modelColorOptions.sort(function (a, b) {
                                                                    return a.colorID.localeCompare(b.colorID);
                                                                });
                                
                                                                // save the color option in local storage for later
                                                                localStorage.setItem('colors-'+modDir+productID, JSON.stringify(modelColorOptions));
                                                                
                                                                //console.log('colors-'+modDir)
                                                                //console.log(localStorage.getItem('colors-'+modDir))
                                                                
                                
                                
                                                                var cpi = '';
                                
                                                                if(thisColorImages.length > 0){
                                                                    cpi = thisColorImages[0].damPath;
                                                                }
                                
                                                                thisColorOptionName = replaceAll(thisColorOptionName, "_", " ");
                                                                dataCON = replaceAll(dataCON, "_", " ");
                                
                                                                if(thisDefaultColor == 1){
                                                                    thisClass += " selected";
                                                                    //console.log(thisColorID)
                                                                    putColorImage(thisColorID, thisModelClassName, modDir);
                                                                    var displayColorPrice = ' <span class="medium-gray">(Included)</span>'
                                                                    if(thisColorPrice != 0)  { displayColorPrice = ' <span class="medium-gray">(+'+displayDollarFormat.format(thisColorPrice)+')</span>'; }
                                                                    $('.'+thisModelClassName+' .selected-color-name').html(thisColorOptionName + displayColorPrice)
                                                                }
                                                                
                                                                // build HTML for the swatch for this option
                                                                swatchConcatenation += '<div class="'+thisClass+'" data-modelListingItemClassName='+thisModelClassName+' data-swatchImageURL="'+swatchPath+'" data-colorID="'+thisColorID+'" data-displayColorOptionName="'+thisColorOptionName+'" data-colorOptionName="'+dataCON+'" data-defaultColor="'+thisDefaultColor+'" data-colorPrice="'+thisColorPrice+'" data-colorProductImage="'+ cpi+'">';
                                                                swatchConcatenation += '	<div class="swatch-circle-highlight">';
                                                                swatchConcatenation += '		<div class="swatch-circle custom">';
                                                                swatchConcatenation += '			<div class="stripe" style="background-image:url(\''+swatchPath+'\');"></div>';
                                                                swatchConcatenation += '		</div>';
                                                                swatchConcatenation += '	</div>';
                                                                swatchConcatenation += '</div>';
                                
                                
                                                                // insert swatch HTML
                                                                //console.log(swatchConcatenation)
                                                                $('.'+thisModelClassName+' #color-swatches').html(swatchConcatenation);
                                
                                                                // defining what happens when you click on something that has class .swatch
                                                                $('.'+thisModelClassName+' .swatch').click(function(){
                                
                                                                    var thisSwatch = $(this);
                                                                    var modelListingItemClassName = thisSwatch.attr('data-modelListingItemClassName');
                                
                                                                    // remove selected class from all swatches
                                                                    $('.'+modelListingItemClassName+' .swatch').each(function(){
                                                                        $(this).removeClass('selected');
                                                                    });
                                                                    
                                                                    // and then add selected class to this swatch
                                                                    thisSwatch.addClass('selected');
                                
                                                                    // display selected color and price
                                                                    var money = thisSwatch.attr('data-colorPrice');
                                                                    var moneyTxt = thisSwatch.attr('data-displayColorOptionName');
                                                                    var displayColorPrice = ' <span class="medium-gray">(Included)</span>'
                                                                    if(money != 0)  { displayColorPrice = ' <span class="medium-gray">(+'+displayDollarFormat.format(money)+')</span>'; }
                                                                    $('.'+thisModelClassName+' .selected-color-name').html(moneyTxt + displayColorPrice);
                                
                                                                    if(localStorage.getItem(modelListingItemClassName+'-originalNoHagglePrice'+productID) == '') {
                                                                        localStorage.setItem(modelListingItemClassName+"-originalNoHagglePrice"+productID, $('.'+modelListingItemClassName).find('.priceListing .price-value').text().replaceAll('$','').replaceAll(',','') );
                                                                    }
                                                            
                                                                    // add color option value
                                                                    var noHagglePrice = parseInt(localStorage.getItem(modelListingItemClassName+'-originalNoHagglePrice'+productID)) + parseInt(money);
                                                                    
                                                                    // update displayed prices
                                                                    $('.'+thisModelClassName+' .priceListing .price-value').text(displayDollarFormat.format(noHagglePrice));

                                                                    var thisColorID = thisSwatch.attr('data-colorID');
                                                                    //console.log(thisColorID)

                                                                    var thisModDir = $('.'+modelListingItemClassName).find('.model-name').text().trim();

                                                                    thisModDir = replaceAll(thisModDir,'Â®','');
                                                                    thisModDir = replaceAll(thisModDir,'&trade;','');
                                                                    thisModDir = replaceAll(thisModDir,'â„¢','');
                                                                    thisModDir = replaceAll(thisModDir,' & ',' ');
                                                                    thisModDir = replaceAll(thisModDir,' ','-');
                                                                    thisModDir = replaceAll(thisModDir,"'",'');

                                                                    thisModDir = thisModDir.toLowerCase();
                                
                                                                    putColorImage(thisColorID, modelListingItemClassName, thisModDir);
                                                                                                
                                                                        
                                                                }); // END $('.swatch').click(function(){
                                
                                                            });
                                                    
                                                            return result;
                                                        } catch (error) {
                                                            console.error(error);
                                                        }
                                                    }
                        
                                                }
                                            }
                                        }
                                    }
                        
                                    return result;
                        
                                } else {
                                    
                                    // hide color option things
                                    //$('.bab-color').hide();
                                    //$('.custom-build-nav-item[data-babStep="color"]').hide();
                                    
                                }// END if(data.assets);
                        
                                // END .ajax.done()
                        
                            }).fail(function(a){
                                console.log(a)
                            });
                        } catch (error) {
                            console.error(error);
                        }
                        return result;
                    }
                }
            }
        }
    }
});