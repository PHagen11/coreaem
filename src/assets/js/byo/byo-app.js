(function () { // 'use strict';
	
	localStorage.setItem("hasColorOptions", "yes");
	localStorage.setItem("hasMotorOptions", "yes");
	localStorage.setItem("hasOptions", "yes");
	localStorage.removeItem('byoBuildImage');

	localStorage.removeItem('colorOptionsPath',);
	localStorage.removeItem('byoPackagePrice', '');
	localStorage.removeItem('byoPREPCOST');
	localStorage.removeItem('byoNitro-selectedComboID');
	localStorage.removeItem('byoTriton-selectedComboID');
	localStorage.removeItem('byoModelAssetsPath');
	localStorage.removeItem('byoNitro-ccHasChanged');
	localStorage.removeItem('byoTriton-ccHasChanged');
	localStorage.removeItem('productVarName');
	localStorage.removeItem('byoProductData');
	localStorage.removeItem('byoSelectedOptionsValue');
	localStorage.removeItem('byoGrandTotal');
	localStorage.removeItem('byoSelectedOptionIDs');
	localStorage.removeItem('byoSwatchPath');
	localStorage.removeItem('byoSelectedMotorID');
	localStorage.removeItem('byoBuildImage');
	localStorage.removeItem('byoNitro-fallbackColorOption');
	localStorage.removeItem('byoTriton-fallbackColorOption');
	localStorage.removeItem('byoSelectedColorPrice');
	localStorage.removeItem('byoColorOptions');
	localStorage.removeItem('byoSelectedColorOptionImage');
	localStorage.removeItem('byoZONECOST');
	localStorage.removeItem('byoNitro-fallbackColorData');
	localStorage.removeItem('byoTriton-fallbackColorData');
	localStorage.removeItem('byoNitro-buildColorData');
	localStorage.removeItem('byoTriton-buildColorData');
	localStorage.removeItem('byoProductID');
	localStorage.removeItem('byoSelectedColorOptions');

	window.mainImageLoaded = 0;

	String.prototype.setCharAt = function(index,chr) {
		if(index > this.length-1) return str;
		return this.substr(0,index) + chr + this.substr(index+1);
	}

	/********************************** 
	***********************************

	getBase64FromImageUrl()

	***********************************
	***********************************/
	
	function getBase64FromImageUrl(url) {

		var img = new Image();

		img.setAttribute('crossOrigin', 'anonymous');

		img.onload = function () {
			var canvas = document.createElement("canvas");
			canvas.width =this.width;
			canvas.height =this.height;

			var ctx = canvas.getContext("2d");
			ctx.drawImage(this, 0, 0);

			var dataURL = canvas.toDataURL("image/png");

			return dataURL;
			
		};

	}


	/********************************** 
	***********************************

	displayDollarFormat
	Format: displayDollarFormat.format(1.20) = "$1.20"

	***********************************
	***********************************/
	window.displayDollarFormat = new Intl.NumberFormat('en-US', {
		style: 'currency', 
		currency: 'USD',
		minimumFractionDigits: 0
	});


	/********************************** 
	***********************************

		titleCase(str)

		Capitalizes the first character
		of each word of a given string.

	***********************************
	***********************************/

	window.titleCase = function (str) {
		if(str){
			return str.toLowerCase().split(' ').map(function(word) {
				return word.toString().replace(word[0], word[0].toUpperCase());
			}).join(' ');
		}
	}

	/********************************** 
	***********************************

		capitalize(str)

		Capitalizes the first character
		of a given string.

	***********************************
	***********************************/

	function capitalize(s) {
		return s && s[0].toUpperCase() + s.slice(1);
	}
	

	/********************************** 
	***********************************

		pdfJson()

		Builds the JSON to pass into
		PDFMake and loads the PDF file.

	***********************************
	***********************************/
	
	function pdfJson() {
		
		var loadPDFNow = function (buildImageDataURL) {

			var dd = {},
				modelImage = $("#bab-mainimage-container img").attr("src"),
				disclaimer = $(".bab-disclaimer p").text().trim(),
				telly = $('.buyNowPhone').text(),

				thisFilename = 'my',
				modelYear = $('#modelYearSumCol').text().trim(),
				brandName = $('#brandNameSumCol').text().trim(),
				modelName = $('#modelNameSumCol').text().trim();

			thisFilename += modelYear;
			thisFilename += replaceAll(brandName,' ','');
			thisFilename += replaceAll(modelName,' ','');
			thisFilename = replaceAll(thisFilename,'Â®','');

			var rows = [],
				selectedColor = [],
				headerRow = [],
				nhnhnp = [],
				pdfPrep = [],
				pdfFreight = [],
				pdfSelectedOptions = [],
				pdfGrandTotal = [],
				pdfGrandTotal = [],
				pdfGT = $('#sumColGrandTotal').text().trim();

			var baseLabel = $('#nhnhnpLabel').text()
			var basePrice = $('.price-sale-value').text();
			var firstRowClassName = "firstRow";
			if(basePrice !== '') {
				
				nhnhnp = [
					{
						text: baseLabel,
						style: "firstRow",
						border: [false,false,false,false],
						fillColor: '#F7F3EF'
					},
					{
						text: basePrice,
						alignment: 'right',
						style: "firstRow",
						border: [false,false,false,false],
						fillColor: '#F7F3EF'
					}
				];
				rows.push(nhnhnp);
			}

			var promoBaseLabel = $('#nhnhnpPromoLabel').text();
			var promoBaseAmount = $('#nhnhnpPromoAmount').text().replaceAll('USD','');
			var promoSavingLabel = $('#nhnhnpSavingLabel').text();
			var promoSavingAmount = $('#nhnhnpSavingAmount').text().replaceAll('USD','');

			// promo line
			if(promoBaseLabel != ''){
				promoLine = [
				
					{
						text: promoBaseLabel,
						style: "li",
						border: [false,false,false,false]
					},
					{
						text: promoBaseAmount,
						alignment: 'right',
						style: "li",
						border: [false,false,false,false]
					}
					
				];
				rows.push(promoLine);
			}

			// saving line
			if(promoSavingLabel != ''){
				savingLine = [
				
					{
						text: promoSavingLabel,
						style: "li",
						border: [false,false,false,false],
						fillColor: '#F7F3EF'
					},
					{
						text: promoSavingAmount,
						alignment: 'right',
						style: "li",
						border: [false,false,false,false],
						fillColor: '#F7F3EF'
					}
					
				];
				rows.push(savingLine);
			}

			// prep
			pdfPrep = [{
				text: "Prep",
				style: "li",
				border: [false,false,false,false]
			}, {
				text: $('.prep-value').text(),
				alignment: 'right',
				style: "li",
				border: [false,false,false,false]
			}];
			rows.push(pdfPrep);

			// freight
			pdfFreight = [{
				text: "Freight",
				style: "li",
				border: [false,false,false,false],
				fillColor: '#F7F3EF'
			}, {
				text: $('.freight-value').text(),
				alignment: 'right',
				style: "li",
				border: [false,false,false,false],
				fillColor: '#F7F3EF'
			}];
			
			rows.push(pdfFreight);

			// selected options
			selectedOptionsHeader = [
				{
					text: "SELECTED OPTIONS",
					style: "selectionsTableHeader",
					border: [false,false,false,false]
				},
				{
					text: "",
					alignment: 'right',
					style: "selectionsTableHeader",
					border: [false,false,false,false]
				}
				
			];
			rows.push(selectedOptionsHeader);

			if(COLORSWITCH !== 0){
					
				// selected color
				selectedColor = [{
					text: 'Color Code: ' + capitalize($('#selectedColorLabel').text().trim()),
					style: "li",
					border: [false,false,false,false],
					fillColor: '#F7F3EF'
				}, {
					text: $('#selectedColorAmount').text().trim(),
					alignment: 'right',
					style: "li",
					border: [false,false,false,false],
					fillColor: '#F7F3EF'
				}];

			}

			rows.push(selectedColor);
			
			var selOptLen = $('#selected-options-items div.pdfOD').length;
			
			$('#selected-options-items div.pdfOD').each(function(index) {
				
				var thisStyle = 'li';
				
				if( index === (selOptLen - 1) ) thisStyle = 'lastRow';
				
				foo = replaceAll($(this).attr("id"), 'selOptcat', '');
				foo = 'selOptLabelcat' + foo;
				
				var fc = (index % 2 === 0) ? fc = '#FFF' : '#F7F3EF';
				
				rows.push( [
						{
							text: $(this).text(),
							style: thisStyle,
							border: [false,false,false,false],
							fillColor: fc
						},
						{
							text: $(this).siblings('div.pdfOV[id='+foo+']').html(),
							style: thisStyle,
							alignment: 'right',
							border: [false,false,false,false],
							fillColor: fc
						}
					]
				)
				
			}); 

			// total
			pdfGrandTotal = [{
				border: [false, true, false, false],
				style: 'total',
				text: "Total",
			}, {
				border: [false, true, false, false],
				style: 'total',
				text: pdfGT,
				alignment: 'right'

			}]
			
			var detectBrowser = function() {

				return new Promise(function (resolve, reject) {

					var ua = window.navigator.userAgent;

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

			function getPDFFeatures() {

				var catCnt = $('.model-features div.category').length / 2;
				
				var features = [];

				for(var p=0; p < $('.model-features div.category').length; p++) {
					
					var featureCategory = [];
					
					var f = $('.model-features div.category')[p];
					//console.log(f)
					
					var catTitle = $(f).find('.title').text().trim();
					//console.log(catTitle)
					
					// push the left column with the category title
					featureCategory.push(
						{
							"width": 100,
							"text": catTitle,
							"style": "featCatStyle",
							"alignment": 'left'
						}
					);
					
					var featRows=[];
					
					for(var feat=0; feat < $(f).find('li').length; feat++){

						var e = $(f).find('li')[feat];
						var featDesc = $(e).text();
						
						var fc = (feat % 2 === 0) ?  fc = '#F7F3EF' : null;
						
						featRows.push(
							
							[{
								"text": featDesc,
								"style": "featDescStyle",
								"fillColor": fc,
								"border": [true,false,false,false]
							}]
							
						);
						
					}
					
					// push the column for the list of features in this category
					featureCategory.push({
			
							"table": {
								"body": featRows
							},
						
							"margin": [ 0, 0, 0, 20 ]
							
					});
		
					features.push({"columns": featureCategory});
					
				};

				return features;

			}

			function getCustomColorConfig(column) {

				var returnContent = [];
				
				for(var p=0; p < $('.color-selections div.category').length; p++) {
					
					var partCategory = [];
					
					var f = $('.color-selections div.category')[p];
					
					var catTitle = $(f).find('.title').text().trim();

					if(column === "left"){

						if(catTitle === "Deck" || catTitle === "Hull"){
							// push the left column with the category title
							partCategory.push(
								{
									"width": 100,
									"text": catTitle,
									"style": "featCatStyle",
									"alignment": 'left'
								}
							);
							
							var colorRows=[];
							
							for(var colour=0; colour < $(f).find('li').length; colour++){

								var e = $(f).find('li')[colour];
								//var thisSwatch = $(f).find('circle')[colour];
								var colourDesc = titleCase(replaceAll($(e).text().trim(), '(', '( '));
								colourDesc = replaceAll(colourDesc, '( ', '(');
								
								var fc = (colour % 2 === 0) ?  fc = '#F7F3EF' : null;

								colorRows.push(
									[{
										"text": colourDesc,
										"style": "featDescStyle",
										"fillColor": fc,
										"border": [true,false,false,false]
									}]
								);
							}
							
							// push the column for the list of features in this category
							partCategory.push({
									"table": {
										"body": colorRows
									},
									"margin": [ 0, 0, 0, 20 ]
							});
							
							returnContent.push(partCategory);
						}

					} else if(column === "right"){

						if(catTitle === "Interior" || catTitle === "Trailer" || catTitle === "Graphic"){
							
							// push the left column with the category title
							partCategory.push(
								{
									"width": 50,
									"text": catTitle,
									"style": "featCatStyle",
									"alignment": 'left'
								}
							);
							
							var colorRows=[];
							
							for(var colour=0; colour < $(f).find('li').length; colour++){

								var e = $(f).find('li')[colour];
								var colourDesc = titleCase(replaceAll($(e).text().trim(), '(', '( '));
								colourDesc = replaceAll(colourDesc, '( ', '(');

								var fc = (colour % 2 === 0) ?  fc = '#F7F3EF' : null;
								
								if(colourDesc === '' && catTitle === "Graphic"){
									var l = $('image#logo').attr("xlink:href");
									l = replaceAll(l,localStorage.getItem("byoModelAssetsPath") + "byo-assets/", "");
									l = replaceAll(l, "/", "");
									l = replaceAll(l, ".png", "");
									l = replaceAll(l, "logo-", "");
									l = replaceAll(l, "-", "/");
									colourDesc = l;
								}

								colorRows.push(
									[{
										"text": colourDesc,
										"style": "featDescStyle",
										"fillColor": fc,
										"border": [true,false,false,false]
									}]
								);
							}

							// push the column for the list of features in this category
							partCategory.push({
									"table": {
										"body": colorRows
									},
									"margin": [ 0, 0, 0, 20 ]
							});
							
							returnContent.push(partCategory);
						}
					}

				};

				return {

					table: {
						body: returnContent
					},
					layout: 'noBorders'

				}
				
			}
			
			function getPDFSpecs(column) {

				var foo = $('#sum-specs tr').length / 2;
				var pp = Math.ceil(foo);

				var specRows = [],
					s = '',
					sv = '',
					smv = '';

				$('#sum-specs tr').each(function (i) {

					if((column === 'left') && (i < pp) || (column === 'right') && (i >= pp)) {

						if(i === 0 || i === pp){
							var obj = [{
								text: 'DESC',
								style: 'specsTableHeader',
								border: [false, false, false, true]
	
							}, {	
								text: 'STANDARD',
								style: 'specsTableHeader',
								border: [false, false, false, true]
							}, {	
								text: 'METRIC',
								style: 'specsTableHeader',
								border: [false, false, false, true]
							}];

							specRows.push(obj)
						}

						var content = [];
						$(this).find("td").each(function (ci) {
							content[ci] = $(this).text().trim();
						})

						if (content[0] != '') {

							s = content[0];
							sv = content[1];
							smv = content[2];

							var obj = [{
								text: s,
								style: 'specsTableDescription',
								border: [false, false, true, true]
							}, {	
								text: sv,
								bold: true,
								style: 'specTableStandardValue',
								border: [false, false, true, true]
							}, {	
								text: smv,
								bold: true,
								style: 'specTableMetricValue',
								border: [false, false, false, true]
							}];

							specRows.push(obj)

						}
					}	

				});

				return {

					table: {
						body: [
							[
								{
									
									layout: { fillColor: function (rowIndex, node, columnIndex) { return (rowIndex % 2 === 0) ? '#F7F3EF' : null; }	},
									
									table: {
										widths: [
											127, 50, 50
										],
										body: specRows
									}
								}
							]
						]
					},
					layout: 'noBorders'

				}

			}

			rows.push(pdfGrandTotal);
			
			// grab dealer info for pdf content
			var dealerData = JSON.parse(localStorage.getItem('myStore'));
			var foo = dealerData.address.city + ', ' + dealerData.address.state + ' ' + dealerData.address.postalCode;
			var dCSZ = foo;
			var dNam = dealerData.dealerName;
			var dPhn = dealerData.phone1;
			var dAdd = dealerData.address.streetAddress1; 

			if((brandName.toLowerCase().indexOf('nitro') >= 0) || (brandName.toLowerCase().indexOf('ranger saltwater') >= 0) || (brandName.toLowerCase().indexOf('triton') >= 0) || (brandName.toLowerCase().indexOf('ranger fiberglass') >= 0) ) {

				var colorConfigHeader = "";
				if(COLORSWITCH !== 0){
					colorConfigHeader = "COLOR CONFIGURATION";
				}
				

				var selectedColorOption = "";
				if(COLORSWITCH !== 0){
					if($('#selectColorOptionConfig').length > 0) selectedColorOption = $('#colorConfigSelectedColorOption').text().trim();
				}
				
				// DEFINING Custom Color PDF CONTENT
				dd = {
					
					"info": {
						title: thisFilename + ".pdf"
					},
		
					"pageMargins": [30,50,30,80],
					
					"content": [
						{
							"columnGap": 0,
							"columns": [
								{
									"layout": "noBorders",
									"table": {
										"widths": [
											250
										],
										"body": [
											[
												{
													image: 'logoImage',
													width: 225,
													style: 'logoPadding',
													margin: [0,0,0,20],
													alignment: 'center'
												}
											],
											/*[
												{
													image: 'productImage',
													width: 225,
													margin: [0,0,0,20],
													alignment: 'center'

												}
											],*/
											[
												{
													text: dNam,
													alignment: 'center',
													bold: true,
													fontSize: 15,
													margin: [0,0,0,0]
												}
											],
											[
												{
													text: dPhn,
													alignment: 'center',
													bold: false,
													color: '#AA0000',
													fontSize: 12,
													margin: [0,0,0,20]
												}
											],
											[
												{
													text: dAdd,
													alignment: 'center',
													bold: false,
													fontSize: 10,
													margin: [0,0,0,0]
												}
											],
											[
												{
													text: dCSZ,
													alignment: 'center',
													bold: false,
													fontSize: 10,
													margin: [0,0,0,0]
												}
											]
											
										]
									}

								},

								{
									"layout": "noBorders", 
									"table": {
										"widths": [
											"*"
										],
										"body": [
											[
												{
													"table": {
														"body": [
															[{
																text: modelYear + " " + brandName,
																"style": "standardHeader"
															}],
															[{

																"text": modelName,
																"style": "header"
															}],
															[{
																"text": $('.bab-boat .bab-boat-package-info').text().trim(),
																"style": "standardHeader"
															}]
														]
													},
													"layout": "noBorders"
												}
											],

											[
												{
													"table": {
														"widths": [
															150,
															75
														],
														"body": rows
													}
												}
											],
											[{
												"text": [
													"Questions?\n",
													{
														"text": $('.buyNowPhone').text(),
														"color": "#aa0000",
														margin: [0,0,0,20]
													}
												],
												"alignment": "center",
												"margin": [0,20,0,0]
											}],
											[{
												"text": $('.bab-disclaimer').text(),
												"alignment": "center",
												"color": "#A5A5A5",
												"fontSize": 8
											}]
										]
									}
								}
							]
						},
						{
							"pageBreak": "before",
							"text": colorConfigHeader,
							"style": "h4",
							"margin": [
								0,
								30,
								0,
								5
							],
							"color": "#aa0000",
							//"pageBreak": "before"
						},
						{
							"text": selectedColorOption,
							"alignment": "left",
							"bold": false,
							"fontSize": 10,
							"margin": [5,0,0,20]
						},
						{
							columns: [getCustomColorConfig("left"), getCustomColorConfig("right")],
							columnGap: 0
						},

						{
							//"pageBreak": 'before',
							"text": "STANDARD SPECIFICATIONS\n",
							"style": "h4",
							"margin": [
								0,
								30,
								0,
								20
							],
							"color": "#aa0000"
						},
						{
							columns: [getPDFSpecs("left"), getPDFSpecs("right")],
							columnGap: 20
						},
						{
							"text": "STANDARD FEATURES\n",
							"style": "h4",
							"margin": [
								0,
								30,
								0,
								20
							],
							"color": "#aa0000",
							//"pageBreak": "before"
						},
						
						getPDFFeatures()
						
					],
					"styles": {
						"header": {
							"fontSize": 18,
							"bold": true
						},
						"h4": {
							"fontSize": 14,
							"bold": true
						},
						"total": {
							"fontSize": 12,
							"color": "#aa0000",
							"bold": true
						},
						"li": {
							"fontSize": 8
						},
						"standardHeader": {
							"fontSize": 12,
							"bold": true,
							"color": "#000",
							"margin": [
								0,
								0,
								0,
								0
							]
						},
						"specsTableHeader": {
							"fontSize": 8,
							"bold": false,
							"color": "#808080",
							"fillColor": '#fff',
							"borderWidth": "1px"
						},
						"specsTableDescription": {
							"fontSize": 8
						},
						"specTableStandardValue": {
							"fontSize": 8,
							"bold": true
						},
						"specTableMetricValue": {
							"fontSize": 8,
							"bold": true
						},
						"featCatStyle": {
							"fontSize": 10,
							"alignment": "left",
							"bold": true,
							"margin": [
								5,
								2,
								5,
								0
							]
						},
						"selectionsTableHeader": {
							"fontSize": 8,
							"color": "#808080",
							"bold": false,
							"margin": [
								0,
								10,
								0,
								0
							]
						},
						"firstRow": {
							"fontSize": 8,
							"margin": [
								0,
								5,
								0,
								0
							]
						},
						"lastRow": {
							"fontSize": 8,
							"margin": [
								0,
								0,
								0,
								5
							]
						},
						"featDescStyle": {
							"fontSize": 8,
							"alignment": "left",
							"margin": [5,2,2,2]
						}
					},
					images: {
						logoImage: brandLogoDataURL//,
						//productImage: buildImageDataURL
					}
				} 
							
			} else {
				
				// DEFINING all other brands
				dd = {
					
					"info": {
						title: thisFilename + ".pdf"
					},
		
					"pageMargins": [30,50,30,80],
					
					"content": [
						{
							"columnGap": 0,
							"columns": [
								{
									"layout": "noBorders",
									"table": {
										"widths": [
											250
										],
										"body": [
											[
												{
													image: 'logoImage',
													width: 225,
													style: 'logoPadding',
													margin: [0,0,0,20],
													alignment: 'center'
												}
											],
											[
												{
													image: 'productImage',
													width: 225,
													margin: [0,0,0,20],
													alignment: 'center'

												}
											],
											[
												{
													text: dNam,
													alignment: 'center',
													bold: true,
													fontSize: 15,
													margin: [0,0,0,0]
												}
											],
											[
												{
													text: dPhn,
													alignment: 'center',
													bold: false,
													color: '#AA0000',
													fontSize: 12,
													margin: [0,0,0,20]
												}
											],
											[
												{
													text: dAdd,
													alignment: 'center',
													bold: false,
													fontSize: 10,
													margin: [0,0,0,0]
												}
											],
											[
												{
													text: dCSZ,
													alignment: 'center',
													bold: false,
													fontSize: 10,
													margin: [0,0,0,0]
												}
											]
											
										]
									}

								},

								{
									"layout": "noBorders", 
									"table": {
										"widths": [
											"*"
										],
										"body": [
											[
												{
													"table": {
														"body": [
															[{
																text: modelYear + " " + brandName,
																"style": "standardHeader"
															}],
															[{

																"text": modelName,
																"style": "header"
															}],
															[{
																"text": $('.bab-boat .bab-boat-package-info').text().trim(),
																"style": "standardHeader"
															}]
														]
													},
													"layout": "noBorders"
												}
											],

											[
												{
													"table": {
														"widths": [
															150,
															75
														],
														"body": rows
													}
												}
											],
											[{
												"text": [
													"Questions?\n",
													{
														"text": $('.buyNowPhone').text(),
														"color": "#aa0000",
														margin: [0,0,0,20]
													}
												],
												"alignment": "center",
												"margin": [0,20,0,0]
											}],
											[{
												"text": $('.bab-disclaimer').text(),
												"alignment": "center",
												"color": "#A5A5A5",
												"fontSize": 8
											}]
										]
									}
								}
							]
						},

						{
							//"pageBreak": 'before',
							"text": "STANDARD SPECIFICATIONS\n",
							"style": "h4",
							"margin": [
								0,
								30,
								0,
								0
							],
							"color": "#aa0000"
						},
						{
							columns: [getPDFSpecs("left"), getPDFSpecs("right")],
							columnGap: 20
						},
						{
							"text": "STANDARD FEATURES\n",
							"style": "h4",
							"margin": [
								0,
								30,
								0,
								20
							],
							"color": "#aa0000",
							//"pageBreak": "before"
						},
						
						getPDFFeatures()
						
					],
					"styles": {
						"header": {
							"fontSize": 18,
							"bold": true
						},
						"h4": {
							"fontSize": 14,
							"bold": true
						},
						"total": {
							"fontSize": 12,
							"color": "#aa0000",
							"bold": true
						},
						"li": {
							"fontSize": 8
						},
						"standardHeader": {
							"fontSize": 12,
							"bold": true,
							"color": "#000",
							"margin": [
								0,
								0,
								0,
								0
							]
						},
						"specsTableHeader": {
							"fontSize": 8,
							"bold": false,
							"color": "#808080",
							"fillColor": '#fff',
							"borderWidth": "1px"
						},
						"specsTableDescription": {
							"fontSize": 8
						},
						"specTableStandardValue": {
							"fontSize": 8,
							"bold": true
						},
						"specTableMetricValue": {
							"fontSize": 8,
							"bold": true
						},
						"featCatStyle": {
							"fontSize": 10,
							"alignment": "left",
							"bold": true,
							"margin": [
								5,
								2,
								5,
								0
							]
						},
						"selectionsTableHeader": {
							"fontSize": 8,
							"color": "#808080",
							"bold": false,
							"margin": [
								0,
								10,
								0,
								0
							]
						},
						"firstRow": {
							"fontSize": 8,
							"margin": [
								0,
								5,
								0,
								0
							]
						},
						"lastRow": {
							"fontSize": 8,
							"margin": [
								0,
								0,
								0,
								5
							]
						},
						"featDescStyle": {
							"fontSize": 8,
							"alignment": "left",
							"margin": [5,2,2,2]
						}
					},
					images: {
						logoImage: brandLogoDataURL,
						productImage: buildImageDataURL
					}
				} // END dd pdf content definition
			}
			
			dd.header = function(currentPage, pageCount) { 
				return [
					{
						text: 'Page ' + currentPage + ' of ' + pageCount,
						alignment: 'center',
						fontSize: 8,
						margin: [0,20,0,0]
					}
				]
			};
			
			dd.footer = function(currentPage, pageCount) { 
				return [
					{
						text: 'Page ' + currentPage + ' of ' + pageCount,
						alignment: 'center',
						fontSize: 8,
						margin: [0,30,0,0]
					}
				]
			};

			detectBrowser().then(function (browser) {
				
				if ((browser == "IE <= 10") || (browser == "IE 11") || (browser == "Microsoft Edge")) {
					pdfMake.createPdf(dd).download(thisFilename + ".pdf");
				}
				if (browser == "Safari") {
					pdfMake.createPdf(dd).download(thisFilename + ".pdf");
					pdfMake.createPdf(dd).open();
				} else {
					pdfMake.createPdf(dd).open();
				}

			}).catch(function (err) {
				//console.error(err);
			});
			
			
		} // END loadPDFNow()
		
		var buildImageDataURL = '';
		
		function getDataUrl(img) {
		   // Create canvas
		   const canvas = document.createElement('canvas');
		   const ctx = canvas.getContext('2d');

		   // Set width and height
		   canvas.width = img.width;
		   canvas.height = img.height;

		   // Draw the image
		   ctx.drawImage(img, 0, 0);
		   return canvas.toDataURL('image/jpeg');

		}

		if( BRANDNAME.toLowerCase().indexOf('nitro') >= 0 ){

			loadPDFNow(buildImageDataURL);

		} else {

			var bI = localStorage.getItem('byoBuildImage');

			if(bI !== null){
				$('#printBuildImage').attr('src', bI);
				const img = document.querySelector('#printBuildImage');
				img.addEventListener('load', function (event) {
					buildImageDataURL = getDataUrl(event.currentTarget);
					loadPDFNow(buildImageDataURL);
				});
			} else {
				loadPDFNow(buildImageDataURL);
			}

		}

	}
	
	// deciding if we are dealing with a touch screen or a clickity device ...
	window.clickEventType = ( (document.ontouchstart!==null) ? 'click' : 'touchstart' );
	
	// who and what ... default initialized
	var dealerId = 0, productID = 0;

	// Inject additional stylesheet
	$('head').append('<link rel="stylesheet" href="/content/dam/wrmg/BYO-GlobalAssets/css/additionalStyles.css" type="text/css" />');


	/********************************** 
	***********************************

		window.buildYourOwn 

	***********************************
	***********************************/

	// The almighty  >>> buildYourOwn <<<< Object ... create an instance by calling buildYourOwn.init()
	window.buildYourOwn = {
		// an array of option ID values to exclude from display
		excludedOptionIDs : [10579,9621,9155,10253,14371,9524,14112,14177,14453,10112,13675,13676],
		
		// an array of option ID values to exclude from display
		excludedOptionCatIDs : [321,216,597,542,570,525,645],

		trigger : function (  ) {
			//console.log("trigger called successfully ...")
		},
		
		// the initial heavy lifting done at page load ...
		init : function( productJSONdata ) {

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
				MODELYEAR = '2020',
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
			


			/********************************** 
			***********************************

				displayFeaturesList()

			***********************************
			***********************************/

			// Defining smart vars ... variables as functions
			window.displayFeaturesList = function(allFeats){
				
				// Simple vars
				var featConcatenation = '',
				thisFeatID = '',
				thisFeatName = '',
				thisFeatOrder = '',
				thisCatName = '',
				thisCatID = '',
				thisCatFeats = '';

				// loop over any features that were passed
				for(var cat in allFeats) { 
					if(allFeats.hasOwnProperty(cat)){
						if((typeof allFeats[cat]) === 'object'){
							
							thisCatName = allFeats[cat].CATEGORY,
							thisCatID = allFeats[cat].FEATURECATEGORYID,
							thisCatFeats = allFeats[cat].FEATURES;
							
							if(thisCatID != 0){
								featConcatenation += '<div class="category">';
								featConcatenation += '	<div class="grid-x">';
								featConcatenation += '		<div class="cell small-12 medium-4">';
								featConcatenation += '			<div class="title"> ' + thisCatName + ' </div>';
								featConcatenation += '		</div>';
								featConcatenation += '		<div class="cell small-12 medium-8">';
								featConcatenation += '			<ul class="category-features">';
								
							} else {
								
								featConcatenation += '<div class="grid-x">';
								featConcatenation += '	<div class="cell small-12 medium-8">';
								featConcatenation += '		<ul>';
								
							}
							
							// loop over feats in this category
							if((typeof thisCatFeats) === 'object'){
								for(var feat in thisCatFeats) {
									if(thisCatFeats.hasOwnProperty(feat)){
										
										thisFeatID = thisCatFeats[feat].FEATUREID,
										thisFeatName = thisCatFeats[feat].FEATURENAME,
										thisFeatOrder = thisCatFeats[feat].FEATUREORDER;
										
										featConcatenation += '<li>' + thisFeatName + '</li>';
										
									}
								}
							}
							
							if(thisCatID != 0){
								
								featConcatenation += '			</ul>';
								featConcatenation += '		</div>';
								featConcatenation += '	</div>';
								featConcatenation += '</div>';
								
							} else {
								
								featConcatenation += '		</ul>';
								featConcatenation += '	</div>';
								featConcatenation += '</div>';
								
							}
							
						}
					}
				}
				
				// if we failed to build any feature content, let's give it a value that suggest that 
				if(!featConcatenation.length) featConcatenation = '<tr><td>No features were found.</td></tr>';
				
				$('#sum-features').html(featConcatenation);
				
				return;
				
			}; // END displayFeaturesList()
	
			 
			/********************************** 
			***********************************

				displaySpecList(allSpecs)

			***********************************
			***********************************/
			
			// build and display the model specific spec data
			window.displaySpecList = function(allSpecs){
				
				// initializing simple vars
				var specConcatenation = '',
					thisSpecName = '',
					thisMetricAmount = '',
					thisSpecValue = '',
					thisCatName = '',
					thisCatID = '',
					thisCatSpecs = '';

				for(var cat in allSpecs) { 
					if(allSpecs.hasOwnProperty(cat)){
						if((typeof allSpecs[cat]) === 'object'){
							
							thisCatName = allSpecs[cat].CATEGORY,
							thisCatID = allSpecs[cat].SPECCATEGORYID,
							thisCatSpecs = allSpecs[cat].SPECS;
							
							if(thisCatID != 0){
								// do category stuff here.
							}
							
							// loop over specs in this category
							if((typeof thisCatSpecs) === 'object'){
								for(var spec in thisCatSpecs) {
									if(thisCatSpecs.hasOwnProperty(spec)){

										var thisSpecName = thisCatSpecs[spec].SPECNAME,
											thisMetricAmount = thisCatSpecs[spec].METRICAMOUNT,
											thisSpecValue = thisCatSpecs[spec].SPECVALUE;
										
										specConcatenation += '<tr>';
										specConcatenation += '	<td class="spec-label">'+thisSpecName+'</td>';
										specConcatenation += '	<td class="standard';
										if(!thisMetricAmount.length) specConcatenation += '-no-metric';
										specConcatenation += '">'+thisSpecValue+'</td>';
										specConcatenation += '	<td class="metric" style="display:none;">'+thisMetricAmount+'</td>';
										specConcatenation += '</tr>';
										
									}
								}
							}
							
						}
					}
				}
				
				// if we failed to build any spec content, let's give it a value that states that none were found
				if(!specConcatenation.length) specConcatenation = '<tr><td>No specs were found.</td></tr>';
				
				// insert the spec HTML into the table
				$('#sum-specs').html(specConcatenation);
				
				// defaulting the spec data to display standard instead of metric
				setUOM('standard');
				
				return;
				
			}; // END displaySpecList()

			// without this little variable, an endless loading of the application happens - bad - not good 
			window.retrievedBuildDealerHasLoaded = false;
			
			/********************************** 
			***********************************

				populateDealerInfo()

			***********************************
			***********************************/

			// Changed this to window scope so could be accessed after init is done ... need to move it out of init -GDLanders
			window.populateDealerInfo = function(){
				
				// retrieve the dealer information that is stored in local storage
				window.selectedDealer = JSON.parse( localStorage.getItem("myStore") );
				
				if(JSON.stringify(retrievedBuildJSON) !== '{}'){
					
					if(!retrievedBuildDealerHasLoaded){
						
						$(document).ready(function() {
							
							retrievedBuildDealerHasLoaded = true;
							
							setAsMyStore(retrievedBuildJSON.dealerId);
							
							// setAsMyStore changes the dealer info in the top bar of the site, a listener detects the change and updates the dealer information in the byo app
							selectedDealer = JSON.parse( localStorage.getItem("myStore") );
							
						});
					}
				}
				
				// fieldnames: dealerName, address, distance, websiteUrl, dealerId, udid, phone1, timestamp
				$(document).ready(function() {
					
					window.loadPricing = function(prep,freight,dealerIsSelected){
						
						console.log("at the top of loadPricing()")
						console.log("prep: "+prep)
						console.log("freight: "+freight)
						
						var selectedOptionsValue = 0;
						var selectedOptionIDList = '';
						var optionContent = '';

						// let's look at and sum up all selected options
						$('.checkbox-options').each(function(){

							var oID 	= $(this).attr('data-optionID'),
								oElID 	= $(this).attr('id'),
								oPrice 	= $(this).attr('data-optionPrice'),
								oOrder 	= $(this).attr('data-optionOrder'),
								oDesc 	= $(this).attr('value');

							// are you the chosen one
							if(this.checked){

								// are we the first in line? no? then add a comma to the current value
								if(selectedOptionIDList.length > 0) selectedOptionIDList += ',' + oID;
								else selectedOptionIDList = oID;

								// grab the html in the label tag for this option ... instead of the value of the checkbox because we want any HTML in the option to display in the summary column
								oDesc = $('label[for="'+oElID+'"]').html();

								// add to the grand sum of all selected options
								selectedOptionsValue = parseFloat(oPrice) + selectedOptionsValue;

								// insert a line for this selected option that will display in the summary columns
								optionContent += '<div class="cell small-9 option-label">' + oDesc + '</div>';
								optionContent += '<div class="cell small-3 text-right option-value">' + displayDollarFormat.format(oPrice) + '</div>';

							}

						});

						// let's grab the selected package price 
						var ppStr = $('.price-sale-value').text();
						if($('.price-value').text() != '') {
							ppStr = $('.price-value').text();
						}
						var ppNum = ppStr.toString().replace(/[^0-9]/g,'');

						PREPCOST = prep;
						ZONECOST = freight;

						selectedColorPrice = $('.swatch.selected').attr('data-colorPrice');

						if(!$.isNumeric(ppNum)){ ppNum = 0; }
						if(!$.isNumeric(ZONECOST)){ ZONECOST = 0; }
						if(!$.isNumeric(PREPCOST)){ PREPCOST = 0; }
						if(!$.isNumeric(selectedOptionsValue)){ selectedOptionsValue = 0; }
						if(!$.isNumeric(selectedColorPrice)){ selectedColorPrice = 0; }

						// add it all up ZONECOST
						grandTotal = parseFloat(ppNum) + parseFloat(ZONECOST) + parseFloat(PREPCOST) + parseFloat(selectedOptionsValue) + parseFloat(selectedColorPrice);

						$('.prep-value').html(displayDollarFormat.format(PREPCOST));
						$('.freight-value').html(displayDollarFormat.format(ZONECOST));

						// Print the result
						$('.bab-price-total-value').html(displayDollarFormat.format(grandTotal));

						localStorage.setItem('byoGrandTotal', grandTotal);
						localStorage.setItem('byoZONECOST', ZONECOST);
						localStorage.setItem('byoPREPCOST', PREPCOST);
						 
						if(dealerIsSelected){
							
							$('#dealerSumAccordion, .dealer-info').fadeIn('fast');
							$('#selectDealer, .prep-freight h6 div').hide();
							
						} else {

							$('.prep-value').html('<a class="trigger-dealer-select-modal-container" data-reveal-id="dealer-select-modal-container" data-toggle="dealer-select-modal-container">Select A Dealer</a>');
							$('.freight-value').html('<a class="trigger-dealer-select-modal-container" data-reveal-id="dealer-select-modal-container" data-toggle="dealer-select-modal-container">Select A Dealer</a>');

							$('#dealerSumAccordion, .dealer-info').hide();
							$('#selectDealer').fadeIn('fast');

						}
						
					}
					
					// if dealer data was NOT found in local storage ... 
					if( selectedDealer === null ){

						//console.log("no dealer, loading pricing ... ")
						loadPricing(0,0,false);

						buildYourOwn.rewriteNavTabs();
						$('#loader').hide();

					} else {

						var dealerId = selectedDealer.dealerId;
						console.log("/bin/boating-sites/dealerboatpricingdealerId=" + dealerId + "&boatId=" + productID + "&currency=usd")
						$.ajax({
							url: "/bin/boating-sites/dealerboatpricing",
							data: "dealerId=" + dealerId + "&boatId=" + productID + "&currency=usd",
							type: "POST",
							error: function () {
								console.log("error");
							},
							success: function (result) {
								
								var resultJson = JSON.parse(result.result)
								PREPCOST = parseInt(resultJson.prepCost);
								ZONECOST = parseInt(resultJson.zoneCost);
								
							loadPricing(PREPCOST,ZONECOST,true);


							}
						});


						/*
						var durl = 'https://bpbcapi.whiterivermg.com/api/dealer/' + dealerId;

						// let's get all data for this dealer... because local storage (myStore) does not contain hours
						$.getJSON( durl, function( data ) {

							localStorage.setItem( 'allDealerData', JSON.stringify(data) );
							
							allDealerData = data;
							
							// padding single digit numbers with a zero
							var addZero = function(i) {
								if (i < 10) i = '0' + i;
								return i;
							}

							// quick little formatter for time
							var timeDispFormat = function( t ){
								dt = new Date(t);
								if (dt.getHours()>=12){
									var hour = parseInt(dt.getHours()) - 12;
									var AMPM = 'PM';
								} else {
									var hour = dt.getHours(); 
									var AMPM = 'AM';
								}
								var formattedTimeStr = hour + ':' + addZero(dt.getMinutes()) + ' ' + AMPM;
								return formattedTimeStr;
							}

							// this should be built in Javascript IMHO
							var getWeekDayName = function(t){
								var day = '';
								switch (t.getDay()) {
									case 0: day = 'Sunday'; break;
									case 1: day = 'Monday'; break;
									case 2: day = 'Tuesday'; break;
									case 3: day = 'Wednesday'; break;
									case 4: day = 'Thursday'; break;
									case 5: day = 'Friday'; break;
									case 6: day = 'Saturday'; break;
									default: day = '';
								}
								return day;
							}

							// a processor for building display HTML from dealer JSON hour data
							var displayDealerHours = function(dHours){

								if(dHours.length){

									var dispTxt = '',
										currentDateTime = new Date(),
										dHoursStr = JSON.stringify(dHours),
										currentStatus = false,
										thisDayHourOpen = '',
										thisDayHourClose = '',
										openHourNextDay = '',
										closeHourNextDay = '',
										dayName = '',
										catName = '',
										storeHoursHTML = '',
										startDayRange = '',
										displayDayRange = '',
										isOpenNow = 0,
										currentDayOfWeek = ((currentDateTime.getDay()) + 1);

									// if we have some data in the object let's look at it.
									if(dHoursStr !== '{}' && dHoursStr !== '') {

										// we expect dHours to have been passed as an array of hours types aka categories ... let's loop through them
										for(var cat = 0; cat < dHours.length; cat++){


											// At the moment, not sure if Holiday Hours is being used ... let's ignore it until told otherwise.
											if(catName.toLowerCase() !== 'holiday hours'){

												// set the name of the category and set up some content variables
												catName = dHours[cat].name;								
												storeHoursHTML += '<h6>' + catName + '</h6>';
												storeHoursHTML += '<table><tbody>';
												startDayRange = '';

												// for every category, we expect there to be an array 7 items - 1 for each day of the week. Let's inspect the hours object for each day.
												for(var thisDayHoursIndex = 0; thisDayHoursIndex < dHours[cat].operatingHours.length; thisDayHoursIndex++){

													// set dayName to ''
													dayName = '';

													// the hour object for the week day
													thisDayHours = dHours[cat].operatingHours[thisDayHoursIndex];

													// the object property 'dayOfWeek' Sunday=1 ... Saturday=7
													thisHoursDayOfWeek = thisDayHours.dayOfWeek;

													// set the name of the day of the week for this day's hours
													switch (thisHoursDayOfWeek) {
														case 1: dayName = "Sunday"; break;
														case 2: dayName = "Monday"; break;
														case 3: dayName = "Tuesday"; break;
														case 4: dayName = "Wednesday"; break;
														case 5: dayName = "Thursday"; break;
														case 6: dayName = "Friday"; break;
														case 7: dayName = "Saturday"; break;
														default: dayName = "";	
													}

													thisDayHourOpen = thisDayHours.openHour;
													thisDayHourClose = thisDayHours.closeHour;
													nextDayHoursIndex = thisDayHoursIndex + 1;

													// if tomorrow is the next index
													if(nextDayHoursIndex < dHours[cat].operatingHours.length){
														openHourNextDay = dHours[cat].operatingHours[nextDayHoursIndex].openHour;
														closeHourNextDay = dHours[cat].operatingHours[nextDayHoursIndex].closeHour;

													// else look at beginning of array
													} else {
														openHourNextDay = dHours[cat].operatingHours[0].openHour;
														closeHourNextDay = dHours[cat].operatingHours[0].closeHour;
													}

													// is tomorrow's hours different than today's hours?
													if((thisDayHourOpen !== openHourNextDay) || (thisDayHourClose !== closeHourNextDay)) {

														// Is this the end of a new identical open/close range?
														if(startDayRange != '') {
															// YES, so let's add today's day name to the display string
															displayDayRange = startDayRange + " - " + dayName;
														// else just add the current day name to the display string
														} else {
															displayDayRange = dayName;
														}

														// Are they open at all today?
														if( !thisDayHours.closedFlag ) {
															// yes .. do this
															storeHoursHTML += '<tr><td>' + displayDayRange + '</td><td>' + timeDispFormat(thisDayHourOpen) + ' - ' + timeDispFormat(thisDayHourClose) + '</td></tr>';
														} else {
															// no ... do this
															storeHoursHTML += '<tr><td>' + displayDayRange + '</td><td>Closed</td></tr>';
														}

														// reset the range to empty
														startDayRange = '';

													// No ... tommorrow's hours are evidentally the same as this day
													} else {
														// If this is the first day in the range, set it to the display string as such
														if(startDayRange === '') {
															startDayRange = dayName;
														}
													}

													// set open and close hours to today's date so we can compare to current time 
													var todayOpenDT = new Date(thisDayHours.openHour);
													todayOpenDT.setFullYear(currentDateTime.getFullYear());
													todayOpenDT.setMonth(currentDateTime.getMonth());
													todayOpenDT.setDate(currentDateTime.getDate());
													var todayCloseDT = new Date(thisDayHours.closeHour);
													todayCloseDT.setFullYear(currentDateTime.getFullYear());
													todayCloseDT.setMonth(currentDateTime.getMonth());
													todayCloseDT.setDate(currentDateTime.getDate());

													// are we looking at today's STORE hours? we want to determine if the store is open right now.
													if((catName.toLowerCase() === 'store hours') && (currentDayOfWeek === thisHoursDayOfWeek)){

														// are they closed today?
														if( !thisDayHours.closedFlag ) {
															// they are not closed today ...


															// okay are they open right now?
															if((todayOpenDT < currentDateTime)  && (todayCloseDT > currentDateTime)){

																// yes, they are open now!
																currentStatus = true;
																dispTxt += " Now: "
															// 
															} else {

																// no ... 
																dispTxt += ": "

															} // END are they open right now?



															// because they are 'open' today, add today's hours to the text to display
															dispTxt += replaceAll(timeDispFormat(thisDayHourOpen),":00 ","") + ' - ' + replaceAll(timeDispFormat(thisDayHourClose),":00 ","");


														// else they must be closed today so let's look for the next day they are open and display as such
														} else {



															if(currentDayOfWeek <= 6){

																var tomorrow = currentDayOfWeek + 1;

															}
														} // END are they closed today?
													} // END if STORE hours and if today hours
												} // END for loop over day hour objects
												
												// close up them tags
												storeHoursHTML += '</tbody></table>';

											} // END if cat not holiday hours
										} // END hours category for loop
									} // END if dHours is empty

									// make sure the containers are visible
									$('.dealer-hours, .dealer-result-hours').fadeIn('fast');


									// insert the hours HTML just built
									$('.dealer-hours .accordion-content').html( storeHoursHTML );

									// display the dealership's current operating status
									var dispStatus = '<i class="fas fa-circle fa-s" aria-hidden="true"></i>	Open' + dispTxt;
									$('.dealer-current-status, .dealer-result-hours').html( dispStatus );


									// return boolean - true = dealership is open, false = dealership is closed
									return currentStatus;

								// else if no hours to display or determine if the dealer is open ... do this
								} else {

									// hide it
									$('.dealer-hours, .dealer-result-hours').hide();

								}

							};

							// adding || {} just in case operatingHours is empty
							var hrsJSON =  allDealerData.operatingHourCategories || {};
							displayDealerHours(hrsJSON);

							// display the name of the selected dealer
							$('.byoDealerName').html(selectedDealer.dealerName);

							// build an HTML5 dialer href value
							var phoneStringArr = selectedDealer.phone1.match(/(\d+)/g);
							var phoneHREF = 'tel:';
							for(i=0; i < phoneStringArr.length;i++) { phoneHREF += phoneStringArr[i].toString() }

							// display dealer information
							$('.byoDealerPhoneLink').attr('href',phoneHREF);
							$('.byoDealerPhoneLink').html(selectedDealer.phone1);
							$('.address1').html(selectedDealer.address.streetAddress1);
							$('.address2').html(selectedDealer.address.streetAddress2);
							$('.cityStateZip').html(selectedDealer.address.city + ', '+ selectedDealer.address.state + ' ' + selectedDealer.address.postalCode);

						}).done(function() {

							$('#loader').hide();
							
							// build was loaded, click the summary tab
							if(typeof buildId !== 'undefined'){
								$('.custom-build-nav-item[data-babstep=sum]').click();
							}
							
						}); // END getJSON allDealerData

						*/


						// display the name of the selected dealer
						$('.byoDealerName').html(selectedDealer.dealerName);

						// build an HTML5 dialer href value
						var phoneStringArr = selectedDealer.phone1.match(/(\d+)/g);
						var phoneHREF = 'tel:';
						for(i=0; i < phoneStringArr.length;i++) { phoneHREF += phoneStringArr[i].toString() }

						// display dealer information
						$('.byoDealerPhoneLink').attr('href',phoneHREF);
						$('.byoDealerPhoneLink').html(selectedDealer.phone1);
						$('.address1').html(selectedDealer.address.streetAddress1);
						$('.address2').html(selectedDealer.address.streetAddress2);
						$('.cityStateZip').html(selectedDealer.address.city + ', '+ selectedDealer.address.state + ' ' + selectedDealer.address.postalCode);

						$('.dealer-hours').hide();

						$('#loader').hide();
							
						// build was loaded, click the summary tab
						if(typeof buildId !== 'undefined'){
							$('.custom-build-nav-item[data-babstep=sum]').click();
						}







						


					} // END if( localStorage.getItem("myStore") === null )
				}); // END docready
			} // END window.populateDealerInfo
			


			/********************************** 
			***********************************

				buildColorOptions()

			***********************************
			***********************************/

			// currently used by Tracker, Sun Tracker, Mako, Tahoe, and Regency
			var buildColorOptions = function() {
				
				// initializing simple vars
				var swatchConcatenation = 'There were no color options found for this year/brand/model.',
					preloadImageList = '',
					colorCtr = 0,
					colorOptionsPath =  getColorOptionsPath();
				
				localStorage.setItem("colorOptionsPath", colorOptionsPath);
				
				// Read the DAM, looking for color option directory structure to build out the color options for this model
				$.ajax({
				
					dataType: "json",
					url: '/bin/boating-sites/dam-assets?path=' + colorOptionsPath

				}).done(function( data ) {
					 
					// if color options were found ...
					if(data.assets){

						swatchConcatenation = '';
						
						// sort by color option name
						data.assets.sort(function (a, b) {

							var aSplitName = a.name.split('-', 4);
							var bSplitName = b.name.split('-', 4);

							var aSortOrder = aSplitName[0];
							var bSortOrder = bSplitName[0];

							if (parseInt(aSortOrder) < parseInt(bSortOrder)) {
								return -1;
							}
							if (parseInt(aSortOrder) > parseInt(bSortOrder)) {
								return 1;
							}
							return 0;
							
						});
						
						localStorage.setItem("hasColorOptions", "yes");
						
						// setting up an array for all color options
						var byoColorOptions = new Array();

						// let's roll through all of the top level items in our data looking for the object we will use for color options
						$.each(data, function(key, val){
							
							// if this our option object
							if((key === 'assets') && ((typeof val) === 'object')){

								// let's roll through our color options
								$.each(val, function(k, v){
									
									if((typeof v) === 'object'){

										// keeping count of the color options
										colorCtr++;
										
										// TODO: refactor this so that it is easier to read
										var thisColorID = v.name,
											tempName = replaceAll(v.name,'---',' / '),
											splitName = tempName.split('-', 4),
											swatchName = replaceAll(splitName[1],' / ','---'),
											swatchPath = getSwatchPath(swatchName), 
											thisColorOptionName = replaceAll(splitName[1],'__',' - '),
											thisColorPrice = splitName[2],
											thisSortOrder = splitName[0],
											thisDefaultColor = splitName[3],
											thisClass = 'swatch ';

										thisColorOptionName = replaceAll(thisColorOptionName, '_', ' ');

										String.prototype.setCharAt = function(index,chr) {
											if(index > this.length-1) return str;
											return this.substr(0,index) + chr + this.substr(index+1);
										}

										// ****************
										// REFACTOR THIS!!
										// ****************
										// Setting the first occurence of anything that is wrapped in @ symbols to uppercase
										if(thisColorOptionName.indexOf('@') > -1){
											var s = thisColorOptionName.indexOf('@');
											var xxxx = thisColorOptionName.setCharAt(s,'<span style="text-transform:uppercase">');
											var e = xxxx.indexOf('@');
											xxxx = xxxx.setCharAt(e,'</span>');
											thisColorOptionName = xxxx;
										}
										// Setting the second occurence of anything that is wrapped in @ symbols to uppercase
										if(thisColorOptionName.indexOf('@') > -1){
											var s = thisColorOptionName.indexOf('@');
											var xxxx = thisColorOptionName.setCharAt(s,'<span style="text-transform:uppercase">');
											var e = xxxx.indexOf('@');
											xxxx = xxxx.setCharAt(e,'</span>');
											thisColorOptionName = xxxx;
										}
										// thisColorOptionName the third occurence of anything that is wrapped in @ symbols to uppercase
										if(thisColorOptionName.indexOf('@') > -1){
											var s = thisColorOptionName.indexOf('@');
											var xxxx = thisColorOptionName.setCharAt(s,'<span style="text-transform:uppercase">');
											var e = xxxx.indexOf('@');
											xxxx = xxxx.setCharAt(e,'</span>');
											thisColorOptionName = xxxx;
										}
										// ****************
										// ****************
										
										// now we go inside the directory and read all of the images inside
										$.ajax({
											dataType: "json", 
											url: '/bin/boating-sites/dam-assets?path=' + v.path
										}).done(function(data) {

											//console.log('color data returned: '+JSON.stringify(data));
											
											// sort by color option name
											data.assets.sort(function (a, b) {
												return a.name.localeCompare(b.name);
											});

											// setting up an array for all images for this color option
											var thisColorImages = new Array();
											
											// let's look at the data returned from the dam
											$.each(data, function(aKey, aVal){
												
												// if this is an array of assets let's evaluate it
												if((aKey === 'assets') && ((typeof aVal) === 'object')){
													
													// do this for each asset in the array
													$.each(aVal, function(kk, vv){

														//console.log(vv)

														// if this asset is an object, let's evaluate it
														if((typeof vv) === 'object'){

															// at one point I had the swatch.gif file in the asset directory ... this if statement just makes sure that this is NOT a file named 'swatch'
															if(vv.type === 'asset' && vv.name.split('.').slice(0, -1).join('.') !== 'swatch'){

																// cut file extension off of filename
																var thisDisplayName = vv.name.split('.').slice(0, -1).join('.');
																// split it at the hyphen
																thisDisplayNameSplit = thisDisplayName.split('-', 2);
																// use the string left after the hyphen
																thisDisplayName = thisDisplayNameSplit[1];
																// replace underscores with spaces
																thisDisplayName = replaceAll(thisDisplayName,'_',' ');

																// push this image into the image array for this option
																thisColorImages.push({"displayName": thisDisplayName, "filename": vv.name, "damPath": vv.path});

															} // END if(vv.type === 'asset' && vv.name.split('.').slice(0, -1).join('.') !== 'swatch'){
														} // END if((typeof vv) === 'object'){
													}); // END $.each(aVal, function(kk, vv){
												} // END if((aKey === 'assets') && ((typeof aVal) === 'object')){
											}); // END $.each(data, function(aKey, aVal){

											// push this color option into the array of options
											byoColorOptions.push({"displayName": thisColorOptionName,
																  "swatchPath": swatchPath,
																  "colorPrice": thisColorPrice,
																  "sortOrder": thisSortOrder,
																  "colorImages": thisColorImages,
																  "colorID": thisColorID,
																  "defaultColor": thisDefaultColor});

											// set the correct color option display order					  
											byoColorOptions.sort(function (a, b) {
												if (parseInt(a.sortOrder) < parseInt(b.sortOrder)) {
													return -1;
												}
												if (parseInt(a.sortOrder) > parseInt(b.sortOrder)) {
													return 1;
												}
												return 0;
											});

											// save the sorted color options in local storage for later
											localStorage.setItem("byoColorOptions", JSON.stringify(byoColorOptions));

											displayColorSwatches();

										}); // END ajax call to get color option images
										
									} // END if((typeof v) === 'object'){

								}); // END .each() roll through our color options

							} // END if((key === 'assets') && ((typeof val) === 'object'))

						}); // END .each(data)
						
					} else {

						//localStorage.setItem('hasColorOptions', 'no');
						buildYourOwn.rewriteNavTabs();
						// Activate Feather icons
						feather.replace();
						
					}// END color if(data.assets)
					
					// END .ajax.done()
				
				}).fail(function(a){

					buildYourOwn.rewriteNavTabs();

					// Activate Feather icons
					feather.replace();

					// END .ajax.fail()

				});
				
			}; // END buildColorOptions()
			
			/********************************** 
			***********************************

				buildNitroColorForm()

			***********************************
			***********************************/
 			// NITRO specific color options 
			window.buildNitroColorForm = function(){

				// default config filename
				var loadConfigFile = 'configureColorForm.js';

				// New config file that only applies to these models
				if( BOATID === 6382 ){
					loadConfigFile = 'configureColorForm-ver10202023.js';
				}

				if(BOATID === 6783 || 
					BOATID === 6784 || 
					BOATID === 6785 || 
					BOATID === 6786 ||
					BOATID === 8689 ||
					BOATID === 8690 ||
					BOATID === 8691 ||
					BOATID === 8692 ||
					BOATID === 8756 ||
					BOATID === 8757){
					loadConfigFile = 'configureColorForm-2024.js';	
				}

				// 2025 Z Series
				if(BOATID === 8678 || 
					BOATID === 8679 || 
					BOATID === 8680 || 
					BOATID === 8681 ||
					BOATID === 8682 ||
					BOATID === 8683 ||
					BOATID === 8684 ||
					BOATID === 8685 ||
					BOATID === 8686){
					loadConfigFile = 'configureColorForm-2024.js';	
				}

				$.getScript('/content/dam/wrmg/nitro/js/' + loadConfigFile).done(function(script,textStatus,jqxhr){
					console.log(loadConfigFile + " loaded ... ");
					return true;
				});

			}
			
			
			
			
			
			/********************************** 
			***********************************

				buildTritonColorForm()

			***********************************
			***********************************/
			
 			// TRITON specific color options 
			 window.buildTritonColorForm = function(){
				$('#loader').show();
				$.getScript('/content/dam/wrmg/triton/js/configureColorForm.js').done(function(script,textStatus,jqxhr){					
					var colorOptionsPath =  getColorOptionsPath();
					localStorage.setItem("colorOptionsPath", colorOptionsPath);
					if(localStorage.getItem('hasColorOptions')==="yes"){
						buildYourOwn.rewriteNavTabs();
					}
					return true;
				});
			}
			
			
			/********************************** 
			***********************************

				buildRangerColorForm()

			***********************************
			***********************************/
			
 			// RANGER specific color options 
			window.buildRangerColorForm = function(){
				$.getScript('/content/dam/wrmg/ranger/js/configureColorForm.js').done(function(script,textStatus,jqxhr){
					console.log("configureRangerColorForm.js loaded ... ")
					var colorOptionsPath =  getColorOptionsPath();
					localStorage.setItem("colorOptionsPath", colorOptionsPath);
					if(localStorage.getItem('hasColorOptions')==="yes"){
						buildYourOwn.rewriteNavTabs();
					}
					return true;
				});
			}
			

			/********************************** 
			***********************************

				displayColorsForm()

			***********************************
			***********************************/
			
			window.displayColorsForm = function(c){

				console.log(c)
				
				var brandIDnoyr = BRANDID.toString();
				brandIDnoyr = brandIDnoyr.slice(0, -4);
				
				// set DAM paths
				var assetsRootPath = "/content/dam/wrmg/",
					globalAssetsPath = assetsRootPath + "BYO-GlobalAssets/";
				
				var brandDir = replaceAll(BRANDNAME,'&reg;','');
				brandDir = replaceAll(brandDir,'Â®','');
				brandDir = replaceAll(brandDir,'&trade;','');
				brandDir = replaceAll(brandDir,'â„¢','');
				brandDir = replaceAll(brandDir,' & ',' ');
				brandDir = replaceAll(brandDir,' ','-');
				brandDir = replaceAll(brandDir,"'",'');
				brandDir = brandDir.toLowerCase();
				
				var modDir = replaceAll(BOATNAME,'&reg;','');
				modDir = replaceAll(modDir,'Â®','');
				modDir = replaceAll(modDir,'&trade;','');
				modDir = replaceAll(modDir,'â„¢','');
				modDir = replaceAll(modDir,' & ',' ');
				modDir = replaceAll(modDir,' ','-');
				modDir = replaceAll(modDir,"'",'');
				modDir = modDir.toLowerCase(); 
				
				var segDir = replaceAll(SEGMENTNAME,'&reg;','');
				segDir = replaceAll(segDir,'Â®','');
				segDir = replaceAll(segDir,'&trade;','');
				segDir = replaceAll(segDir,'â„¢','');
				segDir = replaceAll(segDir,' & ',' ');
				segDir = replaceAll(segDir,' ','-');
				segDir = replaceAll(segDir,"'",'');
				segDir = replaceAll(segDir,"/",'---'); 
				segDir = segDir.toLowerCase();
				
				// build some paths 
				var modelAssetsPath = assetsRootPath + brandDir + "/" + MODELYEAR + "/" + segDir + "/" + modDir + "/";
				var definitionsPath = assetsRootPath + brandDir + "/" + MODELYEAR + "/" + segDir;

				if(modDir === '21-xrt'){
					definitionsPath += "/definitions-xrt.js";
				} else if(modDir === '20-xp'){
					definitionsPath += "/definitions-xp.js"; 
				} else if(MODELYEAR === 2024 && (modDir === 'zv20' || modDir === 'zv20-pro' || modDir === 'zv21' || modDir === 'zv21-pro')){
					definitionsPath += "/definitions-2024.js";
				} else if(MODELYEAR === 2025 && (modDir === 'zv20' || modDir === 'zv20-pro' || modDir === 'zv21' || modDir === 'zv21-pro')){
					definitionsPath += "/definitions-2025.js";

				} else {
					definitionsPath += "/definitions.js";
				}

				var swatchPath = assetsRootPath + brandDir + "/" + MODELYEAR + "/color-swatches/";
								
				localStorage.setItem("byoModelAssetsPath", modelAssetsPath);
				localStorage.setItem("byoDefinitionsPath", definitionsPath);
				localStorage.setItem("byoSwatchPath", swatchPath);
			
				// checking if color object in retrieved build is simple or complex
				if((JSON.stringify(retrievedBuildJSON) !== '{}') && (retrievedBuildJSON !== null)){
					
					try {
						var x = JSON.parse(retrievedBuildJSON.colorOptions);
					} catch (error) {
						
					}

				}

				// COLORSWITCH determines whether or not this product can be configured with colors. Boolean, 1 or 0
				if(COLORSWITCH === 1){
					console.log("brandID: " + brandIDnoyr)
					switch(brandIDnoyr) {

						case '10': // TRACKER?
							buildColorOptions();
							populateDealerInfo();
							break;
							
						case '238': // REGENCY?
							buildColorOptions();
							populateDealerInfo();
							break;
							
						case '191': // MAKO?
							buildColorOptions();
							populateDealerInfo();
							break;
							
						case '11': // SUN TRACKER?
							buildColorOptions();
							populateDealerInfo();
							break;
							
						case '12': // TAHOE?
							buildColorOptions();
							populateDealerInfo();
							break;
							
						case '3': // NITRO?
							buildNitroColorForm();
							populateDealerInfo();
							break;
							
						case '288': // TRITON?
							buildTritonColorForm();
							populateDealerInfo();
							break;
							
						case '254': // Ranger Fiberglass?
							buildRangerColorForm();
							populateDealerInfo();
							break;

						case '247': // Ranger Pontoons?
							buildColorOptions();
							populateDealerInfo();
							break;
						
						case '253': // Ranger Aluminum?
							buildColorOptions();
							populateDealerInfo();
							break;
							
						case '255': // Ranger Saltwater?
							buildRangerColorForm();
							populateDealerInfo();
							break;
						
						case '297': // Tracker Off Road?
							buildColorOptions();
							populateDealerInfo();
							break;
							
						default: // otherwise, do this
							$('#bab-color-options').append("<br>Color error: unknown brand=" + brandIDnoyr);
							
					} 

				} else {
					
					$('#bab-color-options').html('Color is turned OFF for this boat.');
					localStorage.setItem("hasColorOptions", "no");

					// hide color option things
					$('.bab-color').hide();
					$('.custom-build-nav-item[data-babStep="color"]').hide();
					
					populateDealerInfo();
					
				}

			};
			
			/********************************** 
			***********************************

				displayOptionsForm()

			***********************************
			***********************************/
			
			// renders the options checkbox list from the data set
			window.displayOptionsForm = function(alloptions){

				var contentConcatenation = '',
					thisOptCatID = 0,
					preCheckedOptions = [];
				
				localStorage.setItem("hasOptions", "no");
		
				if(JSON.stringify(alloptions) != "{}"){
					
					if((JSON.stringify(retrievedBuildJSON) !== '{}') && (retrievedBuildJSON !== null)){
						preCheckedOptions = retrievedBuildJSON['optionIDs'].split(',');
					}
					
					localStorage.setItem("hasOptions", "yes");

					contentConcatenation += '';

					// HACK to hide the Packages category for just Make Inshore and Triton Bass
					if( (BRANDNAME === 'MAKO&reg;' && SEGMENTNAME === 'Inshore Boats') || (BRANDNAME === 'Triton Fiberglass' && SEGMENTNAME === 'Bass') ){
						buildYourOwn.excludedOptionCatIDs.push(184)
					}

					for(var category in alloptions) {

						if(alloptions.hasOwnProperty(category)){

							if(typeof alloptions[category] === 'object'){

								if($.inArray(alloptions[category].OPTIONCATEGORYID, buildYourOwn.excludedOptionCatIDs) === -1){

									contentConcatenation += '<h3 class="accordion-title">';
									thisOptCatID = 0;

									for(var catProp in alloptions[category]) {

										if(catProp === 'CATEGORY'){
											contentConcatenation += (alloptions[category][catProp] + '</h3>');
										} else if(catProp === 'OPTIONCATEGORYID') {
											thisOptCatID = alloptions[category][catProp];
										}

										if(catProp === 'OPTIONS'){

											if(typeof alloptions[category][catProp] === 'object'){

												contentConcatenation += '<div>';
												contentConcatenation += '	<table class="option-item">';

												for(var option in alloptions[category][catProp]){

													var thisOptionName = '',
														thiOptionVaue = '',
														thisOptionID = 0,
														thisOptionPrice = 0,
														thisOptionOrder = 0,
														thisChecked = 0;

													if(typeof alloptions[category][catProp][option] === 'object'){

														if($.inArray(alloptions[category][catProp][option].OPTIONSID, buildYourOwn.excludedOptionIDs) === -1){

															contentConcatenation += '<tr>';

															for(var optionProp in alloptions[category][catProp][option]){

																if(optionProp === 'OPTIONNAME'){
																	//$(".bab-options").append(' ... ' + alloptions[category][catProp][option][optionProp]);
																	thisOptionName = alloptions[category][catProp][option][optionProp];
																	var tempDiv = $('<div>' + thisOptionName + '</div>');
																	thisOptionValue = tempDiv.text();
																} else if(optionProp === 'OPTIONSID'){
																	//$(".bab-options").append(' ... (id: ' + alloptions[category][catProp][option][optionProp]);
																	thisOptionID = alloptions[category][catProp][option][optionProp];
																} else if(optionProp === 'PRICE'){
																	//$(".bab-options").append(' ... (price: ' + alloptions[category][catProp][option]
																	thisOptionPrice = alloptions[category][catProp][option][optionProp];
																} else if(optionProp === 'OPTIONORDER'){
																	//$(".bab-options").append('... order:' + alloptions[category][catProp][option][optionProp] + ')<br />');
																	thisOptionOrder = alloptions[category][catProp][option][optionProp];
																}

															}
															
															if(preCheckedOptions.indexOf(thisOptionID.toString()) !== -1) thisChecked = 1;

															contentConcatenation += '	<td class="checkit"><input class="checkbox-options" type="checkbox"  id="cat' + thisOptCatID + 'opt' + thisOptionID + '" data-optionID="' + thisOptionID + '" data-optCatID="' + thisOptCatID + '" data-optionPrice="' + thisOptionPrice + '" data-optionOrder="' + thisOptionOrder + '" data-optionID="' + thisOptionID + '" value="' + thisOptionValue + '"';
															
															if(thisChecked === 1) contentConcatenation += ' checked';
															
															contentConcatenation += '></td>';
															
															contentConcatenation += '	<td class="option-name"><label for="cat' + thisOptCatID + 'opt' + thisOptionID + '">' + thisOptionName + '</label></td>';
															contentConcatenation += '	<td class="option-price"><label for="cat' + thisOptCatID + 'opt' + thisOptionID + '">$' + thisOptionPrice + '</label></td>';
															contentConcatenation += '</tr>';

														}

													}
												}

												contentConcatenation += '	</table>';
												contentConcatenation += '</div>';
											}
										}
									}
								}
							} 
						}
					}

					// insert the content into the container
					$('#bab-options-checkboxes').html(contentConcatenation);

					// hotwiring what happens when an option is selected.
					$('.checkbox-options').bind("click", function(){
						updateSumCol();
						udpateFormJSON();
					});

					// initialize the options accordion
					$( ".accordion-content" ).css({ display: "unset" });
					$( "#bab-options-checkboxes" ).accordion({ heightStyle: "content", collapsible: true });
					$("#bab-options-checkboxes > div.ui-accordion-content").css({ "height": "unset" });
					
				} else {
					
					// hide all the option thingies
					$('.bab-options').hide();
					$('.custom-build-nav-item[data-babStep="options"]').hide();
					
				}
				//console.log("displayOptions complete.");
			};

			/********************************** 
			***********************************

				displayColorSwatches()

			***********************************
			***********************************/

			// call this to update everything in the bab-sum-col div ...
			window.displayColorSwatches = function() {

				var cod = localStorage.getItem('byoColorOptions');
				var codObj = JSON.parse(cod);
				var codLength = codObj.length;
				var swatchConcatenation = '';
				
				for(var x = 0; x < codLength; x++){
					
					var thisClass = 'swatch';

					if(codObj[x].defaultColor === '1'){
						thisClass += " selected";
					}
					
					var cpi = '';

					if(codObj[x].colorImages.length > 0){
						cpi = codObj[x].colorImages[0].damPath;
					}

					var swatchClass = 'circle';
					if(BRANDNAME === "Ranger Fiberglass" || BRANDNAME === "Ranger Pontoons" || BRANDNAME === "Ranger Saltwater" || BRANDNAME === "Ranger Aluminum"){
						swatchClass = 'bigsquare'
					}

					var doh = codObj[x].displayName;
					if(codObj[x].displayName.indexOf("<") >= 0){
						doh = codObj[x].colorID; 
					}

					var thisSwatchDispName = codObj[x].displayName;
					if(thisSwatchDispName.indexOf('true<span style="text-transform:uppercase">t</span>imber') > -1){
						thisSwatchDispName = replaceAll(thisSwatchDispName, 'true<span style="text-transform:uppercase">t</span>imber', 'true<span style="text-transform:uppercase">t</span>imber&reg;');

					}

					// build HTML for the swatch for this option
					swatchConcatenation += '<div class="'+thisClass+'" data-swatchImageURL="'+window.prodSiteURL+codObj[x].swatchPath+'" data-colorID="'+codObj[x].colorID+'" data-colorOptionName="'+doh+'" data-defaultColor="'+codObj[x].defaultColor+'" data-colorPrice="'+codObj[x].colorPrice+'" data-colorProductImage="'+ cpi+'">';
					swatchConcatenation += '	<div class="swatch-'+swatchClass+'-highlight">';
					swatchConcatenation += '		<div class="swatch-'+swatchClass+' custom">';
					swatchConcatenation += '			<div class="stripe" style="background-image:url(\''+window.prodSiteURL+codObj[x].swatchPath+'\');"></div>';
					swatchConcatenation += '		</div>';
					swatchConcatenation += '	</div>';
					swatchConcatenation += '	<div class="swatch-name text-center">'+thisSwatchDispName+'</div>';
					swatchConcatenation += '	<div class="swatch-price text-center" style="display:none" data-price="'+codObj[x].colorPrice+'">' + displayDollarFormat.format(codObj[x].colorPrice) + '</div>';
					swatchConcatenation += '</div>';

				}

				// insert swatch HTML
				$('#bab-color-options').html(swatchConcatenation);

				// if there are any color options that are greater than 0, show the swatch prices
				$('.swatch-price').each(function(){
					if(($(this).attr('data-price') != '0') && ($(this).attr('data-price') != 'undefined')){
						$('.swatch-price').show();
					}
				});

				// defining what happens when you click on something that has class .swatch
				$('.swatch').click(function(){

					// remove selected class from all swatches
					$('.swatch').each(function(){
						$(this).removeClass('selected');
					});
					
					// and then add selected class to this swatch
					$(this).addClass('selected');

					var thisColorID = $(this).attr('data-colorID');
					localStorage.setItem('byoSelectedColorOptions', thisColorID);
					
					// pull color option data from local storage
					var co = JSON.parse(localStorage.getItem("byoColorOptions"));

					var brandIDnoyr = BRANDID.toString();
					brandIDnoyr = brandIDnoyr.slice(0, -4);
					
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
								
								// if there is not more than one image in the carousel, we do not need thumbnail navigation.
								if(co[img].colorImages.length > 1) {
									carouselThumbs += '<button class="owl-thumb-item"><img src="'+ co[img].colorImages[imgKey].damPath+'" title="'+co[img].colorImages[imgKey].displayName+'"></button>';
								}
								
								// set first color option image as the build image in local storage
								//console.log(typeof imgKey)
								if(imgKey==='0'){
									localStorage.setItem('byoBuildImage', co[img].colorImages[imgKey].damPath);
									localStorage.setItem('byoSelectedColorOptionImage', co[img].colorImages[imgKey].damPath);
								};
								
								// insert this image into the carousel
								carouselImages += '<div data-toggle="fullview"><img src="'+co[img].colorImages[imgKey].damPath+'" title="'+co[img].colorImages[imgKey].displayName+'"></div>';

								//console.log(co[img].colorImages[imgKey].damPath)

							} // END loop over images this color option
						} // END if this is the color option that was clicked upon.
					} // END loop over color options

					// update the HTML in the carousel with images for this color option
					$('.owl-thumbs').html(carouselThumbs);
					$('.owl-carousel').html(carouselImages);
					
					// destroy the old owlCarousel
					$('.owl-carousel').owlCarousel("destroy");

					// Reinit the owlCarousel
					var owlCar = $('.owl-carousel').owlCarousel({
						thumbs: false,
						thumbsPrerendered: false,
						center: true,
						lazyLoad: false,
						items: 1,
						loop: true,
						nav: false,
						autoHeight: false,
						dots: false,
						navText:['<i aria-label="Next"></i>','<i aria-label="Previous"></i>']
					});

					// bug fix for autoHeight to wait until the images have loaded before setting the height of the carousel
					var carTimer = setInterval(function() {
						if(owlCar.height() > 1) clearInterval(carTimer);
						owlCar.trigger('refresh.owl.carousel', [100]);
						$('.boat-image').fadeIn(1000);
					}, 10);

					// update the selected color option in the summary column.
					updateSumCol();
					udpateFormJSON();
					
					$('#bab-mainimage-container').show()
					
				}); // END $('.swatch').click(function(){

			}
			
			var checkPromo = 1;

			/********************************** 
			***********************************

				updateSumCol()

			***********************************
			***********************************/

			// call this to update everything in the bab-sum-col div ...
			window.updateSumCol = function() {
				
				// let's grab the selected package price 
				var ppStr = $('.price-sale-value').text();
				if($('.price-promo-value').length > 0) {
					ppStr = $('.price-promo-value').text();
				}
				var ppNum = ppStr.toString().replace(/[^0-9]/g,'');

				if(BRANDID.toString().slice(0, -4) === "297" && checkPromo === 1  ){

					if(PROMOPACKAGEPRICE != 0){

						// this div is in the wrong spot in the html template file. remove it, we will add it back further down
						$('.price-save-value').remove();

						$('.price-value').html(displayDollarFormat.format(PRICE));
						$('.price-sale-value').html('');

						var promoPriceLabel = 'Inflation Buster Price';

						$('.prices').append('<div class="grid-x grid-margin-x" id="promoLineItem"><div class="cell small-6"><div class="price-label" id="nhnhnpPromoLabel">'+promoPriceLabel+'</div></div><div class="cell small-6 price-vals" id="nhnhnpPromoAmount"><span class="price-promo-value" style="color:red;">'+displayDollarFormat.format(PROMOPACKAGEPRICE)+'</span><span class="price-reg"></span><span class="price-currency"> USD</span></span></div></div>');
						
						if(PROMOSAVINGPRICE != 0){
							$('.prices').append('<div class="grid-x grid-margin-x" id="savingLineItem"><div class="cell small-6"><div class="price-label" id="nhnhnpSavingLabel">Savings </div></div><div class="cell small-6 price-vals" id="nhnhnpSavingAmount"><span class="price-saving-value" style="color:red;">'+displayDollarFormat.format(PROMOSAVINGPRICE)+'</span><span class="price-reg"><span class="price-currency"> USD</span></span></div></div>')
						}

					} else {
						// display the package price
						$('.price-sale-value').html(displayDollarFormat.format(PRICE));
					}
					
					checkPromo = 0;
					
				}
				
				var optionContent = '',
					selectedOptionIDList = '',
					selectedOptionsValue = 0,
					grandTotal = 0,
					selectedColorPrice = '0',
					selectedColorOption = '',
					selectedColorProductImage = '',
					selectedComboCode = '';
				
			
				// if using [BRAND]-colorOptions
				if( ($('.ranger-colorOption .ranger-colorOption-header.selected').length) ||
					($('.nitro-colorOption .nitro-colorOption-header.selected').length > 0) || 
				    ($('.triton-colorOption .triton-colorOption-header.selected').length > 0)){

					// grab current values
					if($('.nitro-colorOption .nitro-colorOption-header.selected').length){
						selectedColorOption = $('.nitro-colorOption .nitro-colorOption-header.selected').attr('id');
					}
					
					if($('.triton-colorOption .triton-colorOption-header.selected').length){
						selectedColorOption = $('.triton-colorOption .triton-colorOption-header.selected').attr('id');
					}
					
					if($('.ranger-colorOption .ranger-colorOption-header.selected').length){
						selectedColorOption = $('.ranger-colorOption .ranger-colorOption-header.selected').attr('id');
					}
					
					selectedColorCode = $('.comboButton.selected').attr('data-displayname');
					selectedComboName = $('.comboButton.selected').attr('desc');

					if(selectedColorOption !== 'colorOption-customColor'){
						if($('.comboButton.selected').length > 0){
							selectedComboSwatchHTML = $('.comboButton.selected').parent().html();
							// remove the label text div from the HTML grabbed above - it isn't wanted where it is going.
							var replaceThis = '<div class="comboName">'+selectedComboName+'</div>';
							selectedComboSwatchHTML = replaceAll(selectedComboSwatchHTML, replaceThis, '');
							// grab the cost of the selected combo
							selectedColorPrice = $('.comboButton.selected').attr('cost');
						}
					} 
					
					if(selectedColorOption === 'colorOption-customColor'){
						if($('.nitro-colorOption .nitro-colorOption-header.selected').length){
							selectedColorCode = 'Custom Color Your Nitro';
						}
						if($('.triton-colorOption .triton-colorOption-header.selected').length){
							selectedColorCode = 'Custom Color Your Triton';
						}
						if($('.ranger-colorOption .ranger-colorOption-header.selected').length){
							selectedColorCode = 'Custom Color Your Ranger';
						}
						// get the custom color cost remove any non number characters from it
						selectedColorPrice = $('#colorOption-customColor .colorOptionCost').attr("data-colorprice");
						//debugger;
						selectedComboSwatchHTML = '';
					}

					if(typeof selectedColorCode !== 'undefined'){
					
						// concantentate to the collective
						optionContent += '<div class="cell small-9 option-label" id="selectedColorLabel"><div class="cell d-inline" style="vertical-align:top;">' + selectedColorCode + '</div></div>';
						optionContent += '<div class="cell small-3 text-right option-value" id="selectedColorAmount">' + displayDollarFormat.format(selectedColorPrice) + '</div>';

						$('.selectColorOptionConfig').html("<span id='colorConfigSelectedColorOption'>Selection: " + selectedColorCode + "</span><br>Click on a part name below to select a different color.");

					}
					
				}
				
				// if using swatches 
				if($('.swatch').length > 0){
					
					// let's look at each swatch and sum up the SELECTED COLORS
					$('.swatch').each(function(){
						
						// knock knock. are you the selected one
						if($(this).hasClass('selected')){
							
							var cColorID 			= $(this).attr('data-colorID'),
								cOptionName			= $(this).attr('data-colorOptionName'),
								cOptionValue		= $(this).attr('data-colorOptionName'),
								cProductImage		= $(this).attr('data-colorProductImage'),
								cSwatchImageURL 	= $(this).attr('data-swatchImageURL'),
								cDefaultColor 		= $(this).attr('data-defaultColor'),
								cPrice 				= $(this).attr('data-colorprice'),
								selectedColorPrice 	= cPrice;

							cOptionName = replaceAll(cOptionName,'---',' / ');
							cOptionName = cOptionName.split('-', 4);
							if(Array.isArray(cOptionName)){
								if(cOptionName.length > 1){
									cOptionName = cOptionName[1];
								} else if(cOptionName.length === 1){
									cOptionName = cOptionName[0];
								}
							}
							cOptionName = replaceAll(cOptionName,'_',' ');
							
							// ****************
							// REFACTOR THIS!!
							// ****************
							// Setting the first occurence of anything that is wrapped in @ symbols to uppercase
							if(cOptionName.indexOf('@') > -1){
								var s = cOptionName.indexOf('@');
								var xxxx = cOptionName.setCharAt(s,'<span style="text-transform:uppercase">');
								var e = xxxx.indexOf('@');
								xxxx = xxxx.setCharAt(e,'</span>');
								cOptionName = xxxx;
							}
							// Setting the second occurence of anything that is wrapped in @ symbols to uppercase
							if(cOptionName.indexOf('@') > -1){
								var s = cOptionName.indexOf('@');
								var xxxx = cOptionName.setCharAt(s,'<span style="text-transform:uppercase">');
								var e = xxxx.indexOf('@');
								xxxx = xxxx.setCharAt(e,'</span>');
								cOptionName = xxxx;
							}
							// Setting the third occurence of anything that is wrapped in @ symbols to uppercase
							if(cOptionName.indexOf('@') > -1){
								var s = cOptionName.indexOf('@');
								var xxxx = cOptionName.setCharAt(s,'<span style="text-transform:uppercase">');
								var e = xxxx.indexOf('@');
								xxxx = xxxx.setCharAt(e,'</span>');
								cOptionName = xxxx;
							}
							// ****************
							// ****************

							cOptionName = replaceAll(cOptionName, '<br>', ' ');
						
							// adding a registration mark to TrueTimber
							if(cOptionName.indexOf('true<span style="text-transform:uppercase">t</span>imber') > -1){
								cOptionName = replaceAll(cOptionName, 'true<span style="text-transform:uppercase">t</span>imber', 'true<span style="text-transform:uppercase">t</span>imber&reg;')
							}

							if(!$.isNumeric(selectedColorPrice)){
								selectedColorPrice = 0;
							}
							
							// add the data to the collective.
							optionContent += '<div class="cell small-9 option-label" id="selectedColorLabel"><img class="circle summary-swatch" src="' + cSwatchImageURL + '" /> ' + cOptionName + '</div>';
							optionContent += '<div class="cell small-3 text-right option-value" id="selectedColorAmount">' + displayDollarFormat.format(selectedColorPrice) + '</div>';

						}

					});
			
				}

				selectedOptionsValue = parseFloat(selectedOptionsValue) + parseFloat(selectedColorPrice);

				// let's look at and sum up all selected options
				$('.checkbox-options').each(function(){
					
					var oID 	= $(this).attr('data-optionID'),
						oElID 	= $(this).attr('id'),
						oPrice 	= $(this).attr('data-optionPrice'),
						oOrder 	= $(this).attr('data-optionOrder'),
						oDesc 	= $(this).attr('value');
					
					// are you the chosen one
					if(this.checked){
						
						// are we the first in line? no? then add a comma to the current value
						if(selectedOptionIDList.length > 0) selectedOptionIDList += ',' + oID;
						else selectedOptionIDList = oID;
				
						// grab the html in the label tag for this option ... instead of the value of the checkbox because we want any HTML in the option to display in the summary column
						oDesc = $('label[for="'+oElID+'"]').html();

						// add to the grand sum of all selected options
						selectedOptionsValue = parseFloat(oPrice) + selectedOptionsValue;

						// insert a line for this selected option that will display in the summary columns
						optionContent += '<div class="cell small-9 option-label pdfOD" id="selOpt'+oElID+'">' + oDesc + '</div>';
						optionContent += '<div class="cell small-3 text-right option-value pdfOV" id="selOptLabel'+oElID+'">' + displayDollarFormat.format(oPrice) + '</div>';
						
					}
					
				});
				
				var d = getMyStore();
				
				$('#selected-options').hide();
				$('.price-total').hide();

				if(typeof d !== "undefined"){

					$('#selected-options').show();
					$('.price-total').show();

					dealerId = d.dealerId;
					console.log("/bin/boating-sites/dealerboatpricing?dealerId=" + dealerId + "&boatId=" + productID + "&currency=usd")
					jQuery.ajax({
						url: "/bin/boating-sites/dealerboatpricing",
						data: "dealerId=" + dealerId + "&boatId=" + productID + "&currency=usd",
						type: "POST",
						error: function () {
							//console.log("error");
						},
						success: function (result) {

							var resultJson = JSON.parse(result.result)
							PREPCOST = parseInt(resultJson.prepCost);
							ZONECOST = parseInt(resultJson.zoneCost);
							
							// add the clicked item to the selected color options container in the summary column
							$('#selected-options-items').html(optionContent);

							selectedColorPrice = $('.swatch.selected').attr('data-colorPrice');

							if(!$.isNumeric(ppNum)){ ppNum = 0; }
							if(!$.isNumeric(ZONECOST)){ ZONECOST = 0; }
							if(!$.isNumeric(PREPCOST)){ PREPCOST = 0; }
							if(!$.isNumeric(selectedOptionsValue)){ selectedOptionsValue = 0; }
							if(!$.isNumeric(selectedColorPrice)){ selectedColorPrice = 0; }

							// add it all up ZONECOST
							grandTotal = parseFloat(ppNum) + parseFloat(ZONECOST) + parseFloat(PREPCOST) + parseFloat(selectedOptionsValue) + parseFloat(selectedColorPrice);
							
							$('.prep-value').html(displayDollarFormat.format(PREPCOST));
							$('.freight-value').html(displayDollarFormat.format(ZONECOST));

							// Print the result
							$('.bab-price-total-value').html(displayDollarFormat.format(grandTotal));

							localStorage.setItem('byoGrandTotal', grandTotal);
							localStorage.setItem('byoZONECOST', ZONECOST);
							localStorage.setItem('byoPREPCOST', PREPCOST);
							localStorage.setItem('byoPackagePrice', ppNum);
							localStorage.setItem('byoSelectedOptionsValue', selectedOptionsValue);
							localStorage.setItem('byoSelectedColorPrice', selectedColorPrice);
							localStorage.setItem('byoSelectedOptionIDs', selectedOptionIDList.split(', '));
								
						}
					});
				}
				
			};
			
			/********************************** 
			***********************************

				displayMotorsForm()

			***********************************
			***********************************/

			window.displayMotorsForm = function(allmotors){
			
				var contentConcatenation = '',
					thisMotorBrand = '';
				
				localStorage.setItem("hasMotorOptions", "no");
				
				// IF this is NOT Tracker Off Road and we have motor options to display ...
				if(JSON.stringify(allmotors) !== "{}" && BRANDID.toString().slice(0, -4) != "297"){
					
					localStorage.setItem("hasMotorOptions", "yes");
					
					for(var motorBrand in allmotors) {

						if(allmotors.hasOwnProperty(motorBrand)){

							thisMotorBrand = allmotors[motorBrand].MOTORBRAND;

							if(typeof allmotors[motorBrand] === 'object'){

								contentConcatenation += '<h5 class="small-top">';

								for(var motorProp in allmotors[motorBrand]) {

									if(motorProp === 'MOTORBRAND'){
										contentConcatenation += (allmotors[motorBrand][motorProp] + '</h5>');

									} else if(motorProp === 'MOTORS'){

										if(typeof allmotors[motorBrand][motorProp] === 'object'){

											for(var option in allmotors[motorBrand][motorProp]){

												var thisMotorName = '';
												var thisMotorID = 0;
												var thisMPHmax = '';
												var thisMPHmin = '';
												var thisPromoPackagePrice = 0;
												var thisPromoSavingPrice = 0;
												var thisDescription = '';
												var thisMotorOrder = 0;
												var thisPackagePrice = 0;
												var thisPriceDifference = 0;

												if(typeof allmotors[motorBrand][motorProp][option] === 'object'){

													for(var optionProp in allmotors[motorBrand][motorProp][option]){

														if(optionProp === 'MOTORNAME'){
															thisMotorName = allmotors[motorBrand][motorProp][option][optionProp];
														} else if(optionProp === 'MOTORID'){
															thisMotorID = allmotors[motorBrand][motorProp][option][optionProp];
														} else if(optionProp === 'MPHMAX'){
															thisMPHmax = allmotors[motorBrand][motorProp][option][optionProp];
														} else if(optionProp === 'MPHMIN'){
															thisMPHmin = allmotors[motorBrand][motorProp][option][optionProp];
														} else if(optionProp === 'PROMOPACKAGEPRICE'){
															thisPromoPackagePrice = allmotors[motorBrand][motorProp][option][optionProp];
														} else if(optionProp === 'PROMOSAVINGPRICE'){
															thisPromoSavingPrice = allmotors[motorBrand][motorProp][option][optionProp];
														} else if(optionProp === 'DESCRIPTION'){
															thisDescription = allmotors[motorBrand][motorProp][option][optionProp];
														} else if(optionProp === 'MOTORORDER'){
															thisMotorOrder = allmotors[motorBrand][motorProp][option][optionProp];
														} else if(optionProp === 'PACKAGEPRICE'){
															thisPackagePrice = allmotors[motorBrand][motorProp][option][optionProp];
														} else if(optionProp === 'PRICEDIFFERENCE'){
															thisPriceDifference = allmotors[motorBrand][motorProp][option][optionProp];
														}

													}

													contentConcatenation += '<div class="grid-x motor';
												
													var mid = MOTORID;
													if((JSON.stringify(retrievedBuildJSON) !== '{}') && (retrievedBuildJSON !== null)){
														mid = retrievedBuildJSON.motorID;
													}
													
													if(thisMotorID == mid) {

														// this is the default motor, let's add the selected class and change the display
														contentConcatenation += ' selected';

														// display the motor brand and model
														$('.bab-wMotorBrand').html(thisMotorBrand);
														$('.bab-wMotorName').html(thisMotorName);
														$('.bab-wSlash').fadeIn('fast');

														if(thisPromoPackagePrice != 0){

															// this div is in the wrong spot in the html template file. remove it, we will add it back further down
															$('.price-save-value').remove();

															$('.price-value').html(displayDollarFormat.format(thisPackagePrice));
															$('.price-sale-value').html('');

															var promoPriceLabel = 'Inflation Buster Price';
															
															$('.prices').append('<div class="grid-x grid-margin-x" id="promoLineItem"><div class="cell small-6"><div class="price-label" id="nhnhnpPromoLabel">'+promoPriceLabel+'</div></div><div class="cell small-6 price-vals" id="nhnhnpPromoAmount"><span class="price-promo-value" style="color:red;">'+displayDollarFormat.format(thisPromoPackagePrice)+'</span><span class="price-reg"></span><span class="price-currency"> USD</span></span></div></div>');
															
															if(thisPromoSavingPrice != 0){
																$('.prices').append('<div class="grid-x grid-margin-x" id="savingLineItem"><div class="cell small-6"><div class="price-label" id="nhnhnpSavingLabel">Savings </div></div><div class="cell small-6 price-vals" id="nhnhnpSavingAmount"><span class="price-saving-value" style="color:red;">'+displayDollarFormat.format(thisPromoSavingPrice)+'</span><span class="price-reg"><span class="price-currency"> USD</span></span></div></div>')
															}

														} else {
															// display the package price
															$('.price-sale-value').html(displayDollarFormat.format(thisPackagePrice));
														}

														localStorage.setItem('byoSelectedMotorID', thisMotorID);

													}

													contentConcatenation += '" data-motorID="'+ thisMotorID;
													contentConcatenation += '" data-motorBrand="'+ thisMotorBrand;
													contentConcatenation += '" data-motorName="'+ thisMotorName;
													contentConcatenation += '" data-packagePrice="'+ displayDollarFormat.format(thisPackagePrice);
													contentConcatenation += '" data-promoPackagePrice="'+ displayDollarFormat.format(thisPromoPackagePrice);
													contentConcatenation += '" data-promoSavingPrice="'+ displayDollarFormat.format(thisPromoSavingPrice);
													contentConcatenation += '" data-MPHmax="'+ thisMPHmax;
													contentConcatenation += '" data-MPHmin="'+ thisMPHmin;
													contentConcatenation += '" data-promoPackagePrice="'+ thisPromoPackagePrice;
													contentConcatenation += '" data-promoSavingPrice="'+ thisPromoSavingPrice;
													contentConcatenation += '" data-description="'+ thisDescription;
													contentConcatenation += '" data-motorOrder="'+ thisMotorOrder;
													contentConcatenation += '" data-priceDifference="'+ thisPriceDifference;
													contentConcatenation += '">';
													contentConcatenation += '	<div class="small-6 cell">';
													contentConcatenation += '		<p class="motor-name">' + thisMotorName + '</p>';
													contentConcatenation += '		<p class="motor-speed">';
													if(thisMPHmin != '') contentConcatenation += thisMPHmin;
													if(thisMPHmax != '' && thisMPHmin != '') contentConcatenation += '-' + thisMPHmax + 'mph</p>';
													contentConcatenation += '	</div>';
													contentConcatenation += '	<div class="small-6 cell text-right">';
													if(thisPromoPackagePrice != 0){
														contentConcatenation += '		<p class="cell small-6 motor-price">';
														contentConcatenation += '			<span class="pkg-price-sale-value" style="color:red;">' + displayDollarFormat.format(thisPromoPackagePrice) + '</span>';
														contentConcatenation += '			<span class="pkg-price-reg">';
														contentConcatenation += '				<span class="pkg-price-value strike" style="text-decoration: line-through;">' + displayDollarFormat.format(thisPackagePrice) + '</span>';
														contentConcatenation += '				<span class="pkg-price-currency">USD</span>';
														contentConcatenation += '			</span>';
														contentConcatenation += '			<div class="price-label">Inflation Buster Savings: ' + displayDollarFormat.format(thisPromoSavingPrice) + '</div>';
														contentConcatenation += '		</p>';
													} else {
														contentConcatenation += '		<p class="motor-price">' + displayDollarFormat.format(thisPackagePrice) + '</p>';
														contentConcatenation += '		<p class="price-label">Package Price</p>';
													}
													contentConcatenation += '	</div>';
													contentConcatenation += '</div>';

												}
											}
										}
									}
								}
							}
						}
					}


					// make sure options content is hidden
					$('.bab-options').hide();

					// insert the motor html content into the container
					if(contentConcatenation !== '') {
						$('#form-byoMotors').html(contentConcatenation);
					} else {
						$('#form-byoMotors').html('There are no motors available for this model.');
					}

					// defining what happens when a motor is selected.
					$('.motor').bind("click", function(){

						// get the clicked motor's attributes
						var motorID = $(this).attr('data-motorID'),
							selectedMotorBrand = $(this).attr('data-motorBrand'),
							selectedMotorName = $(this).attr('data-motorName'),
							selectedPackagePrice = $(this).attr('data-packagePrice');
							selectedPromoPackagePrice = $(this).attr('data-promoPackagePrice');
							selectedPromoSavingPrice = $(this).attr('data-promoSavingPrice');

						// remove any motors that are currently selected
						$('.motor').removeClass('selected');

						// and select just this one
						$ (this).addClass('selected');

						// display the selected motor brand and model
						$('.bab-wMotorBrand').html(selectedMotorBrand);
						$('.bab-wMotorName').html(selectedMotorName);
						$('.bab-wSlash').fadeIn('fast');

						// change the package price
						$('.price-sale-value').html(selectedPackagePrice);

						// determine if promo pricing is set 
						if(selectedPromoPackagePrice != '$0'){

							$('.price-value').html(selectedPackagePrice);
							$('.price-sale-value').html('');

							if($('.price-promo-value').length != 0){
								$('.price-promo-value').html(selectedPromoPackagePrice);
								if(selectedPromoSavingPrice != '$0'){
									$('.price-saving-value').html(selectedPromoSavingPrice)
								}
							} else {

								var promoPriceLabel = 'Inflation Buster Price';
								
								$('.prices').append('<div class="grid-x grid-margin-x" id="promoLineItem"><div class="cell small-6"><div class="price-label" id="nhnhnpPromoLabel">'+promoPriceLabel+'</div></div><div class="cell small-6 price-vals" id="nhnhnpPromoAmount"><span class="price-promo-value" style="color:red;">'+selectedPromoPackagePrice+'</span><span class="price-reg"></span><span class="price-currency"> USD</span></span></div></div>');
															
								if(thisPromoSavingPrice != '$0'){
									$('.prices').append('<div class="grid-x grid-margin-x" id="savingLineItem"><div class="cell small-6"><div class="price-label" id="nhnhnpSavingLabel">Savings </div></div><div class="cell small-6 price-vals" id="nhnhnpSavingAmount"><span class="price-saving-value" style="color:red;">'+selectedPromoSavingPrice+'</span><span class="price-reg"><span class="price-currency"> USD</span></span></div></div>')
								}

							}

						} else {
							$('.price-value').html('')
							$('#promoLineItem').remove();
							$('#savingLineItem').remove();
						}
						

						// save the selected motor ID in local storage
						localStorage.setItem('byoSelectedMotorID', motorID);

						// update the data displayed in the summary column
						updateSumCol();

						// update the build data in the send to dealer form
						udpateFormJSON();

					});	 

				} else {
					
					// hide the motor items
					$('.bab-motors').hide();
					$('.custom-build-nav-item[data-babStep="motors"]').hide();
					
					// display the base price
					$('.price-sale-value').html(displayDollarFormat.format(PRICE));

				} // END if allmotors
				
			};
			
			/********************************** 
			***********************************

				productJSONdata()

			***********************************
			***********************************/
			
			// let's roll through all of the top level items in our data object
			$.each(productJSONdata, function(key, val){
				
				switch(key) {

					case 'BOATNAME': 			BOATNAME = val;
												var modelDetailURL = document.location.pathname;
												modelDetailURL = replaceAll(modelDetailURL, '.build', '');
												$(".bab-boat-name").html(BOATNAME);
												$(".bab-boat-name-link").html(' <a href="'+modelDetailURL+'"><i class="fa fa-angle-left"></i> ' + BOATNAME + '</a>');
												var massagedProductName = BOATNAME.toString().replace(/\s+/g, '-');
												$("#productVarName").text(massagedProductName);
												localStorage.setItem('productVarName', massagedProductName)
												break;

					case 'BOATORDER': 			BOATORDER = val; break;
					case 'BOATPRICESWITCH': 	BOATPRICESWITCH = val; break;
					case 'BRANDID': 			BRANDID = val; break;
						
					case 'BRANDNAME': 			BRANDNAME = val;
												$('.bab-brandName,.brand-name').html(BRANDNAME);
												break;
						
					case 'PROMOSAVINGPRICE': 	PROMOSAVINGPRICE = val; break;

					//case 'ZONECOST': 			ZONECOST = val;
												//$('.freight-value').html(displayDollarFormat.format(ZONECOST));
												//break;  

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

					//case 'PREPCOST': 			PREPCOST = val; 
												//$('.prep-value').html(displayDollarFormat.format(PREPCOST));
												//break;

					case 'MOTORID': 			MOTORID = val; break;
					case 'MPHMIN': 				MPHMIN = val; break;
					case 'PRICE':				PRICE = val; break;
					case 'PROMOPACKAGEPRICE': 	PROMOPACKAGEPRICE = val; break;
					case 'MOTORBRAND':			MOTORBRAND = val; break;
					case 'FAMILYID':			FAMILYID = val; break;
					case 'MOTORPRICE': 			MOTORPRICE = val; break;
					case 'BMTINCLUDED':			BMTINCLUDED = val; break;
						
					case 'BUILDSWITCH': 		BUILDSWITCH = val;
												if(BUILDSWITCH===0){
													$('#byoNoBuildMessage').fadeIn('fast');
													$('.build-a-boat').hide();
													$('.custom-build-nav').hide();
												}
												break;
					
					case 'PRICEDIFFERENCE': 	PRICEDIFFERENCE = val; break;
					case 'MPHMAX': 				MPHMAX = val; break;
					case 'MPHMAX': 				MPHMAX = val; break;
					case 'MOTORNAME': 			MOTORNAME = val; break;
					case 'PARENTID': 			PARENTID = val; break;
					case 'SEGMENTID': 			SEGMENTID = val; break;
					case 'CURRENTMODEL': 		CURRENTMODEL = val; break;

					case 'COLORS':			  if(typeof val == 'object'){
													displayColorsForm(val);
												}
												break;

					case 'SPECS':				if(typeof val == 'object'){
													displaySpecList(val);
												}
												break;

					case 'ALLMOTORS':			if(typeof val == 'object'){
													displayMotorsForm(val);
													buildYourOwn.rewriteNavTabs();
													
												}
												break;

					case 'ALLFEATURES':		 if(typeof val == 'object'){
													displayFeaturesList(val);
												}
												break;

					case 'ALLOPTIONS': 			if(typeof val == 'object'){
													displayOptionsForm(val);
												}
												break;

					default: var foo = 'foo';

				}; // END key switch

			}); // END productJSONdata EACH loop
			
			// set the intial total price value and display it.
			var totalVal = parseFloat(PRICE) + parseFloat(ZONECOST) + parseFloat(PREPCOST);
			$('.bab-price-total-value').html(displayDollarFormat.format(totalVal));
			
			// set hidden form fieldswindow.location.href
			$('input[name="url"]').val(replaceAll(document.location.href,'#',''));
			$('input[name="brand"]').val(replaceAll(replaceAll(BRANDNAME,'&reg;',''),' ',''));
			$('input[name="source"]').val(replaceAll(BRANDNAME,'&reg;','') + " Website");

			// Initialization complete, let's get out of here and wait for the user to do something.
			return;
		
		}, // END buildYourOwn.init()
		
		rewriteNavTabs : function(){

			var hasColorOptions = localStorage.getItem('hasColorOptions'),
				hasMotorOptions = localStorage.getItem('hasMotorOptions');
			
			// if YES motors AND YES colors
			if((hasMotorOptions==="yes") && (hasColorOptions==="yes")) {
				
				$('.custom-build-nav-item').removeClass('active');
				
				if(typeof buildId === 'undefined'){
					
					$('.custom-build-nav-item[data-babStep="motors"]').addClass('active');
					$('.custom-build-nav-item[data-babStep="motors"]').click();

					babStep('motors');

				} else {

					$('.custom-build-nav-item[data-babStep="sum"]').addClass('active');
					babStep('sum');
					$('#btn-nextStep,#btn-sumColNextStep').attr('data-nextbabstep', 'send-to-dealer');
					$('#btn-nextStep,#btn-sumColNextStep').text('Next: Send to Dealer');
					
				}
				
			}

			// if NO motors AND YES colors
			if((hasMotorOptions==="no") && (hasColorOptions==="yes")) {
				
				$('.custom-build-nav-item[data-babStep="color"]').html('1. Color <span class="fa-fw fas fa-long-arrow-right">');
				$('.custom-build-nav-item[data-babStep="options"]').html('2. Options <span class="fa-fw fas fa-long-arrow-right">');
				$('.custom-build-nav-item[data-babStep="sum"]').html('3. Summary <span class="fa-fw fas fa-long-arrow-right">');
				
				$('.custom-build-nav-item').removeClass('active');
				
				$('.bab-wSlash').hide();
				
				if(typeof buildId === 'undefined'){
					
					$('.custom-build-nav-item[data-babStep="color"]').addClass('active');
					babStep('color');
					$('#btn-nextStep,#btn-sumColNextStep').attr('data-nextbabstep', 'options');
					$('#btn-nextStep,#btn-sumColNextStep').text('NEXT: OPTIONS');

				} else {

					$('.custom-build-nav-item[data-babStep="sum"]').addClass('active');
					babStep('sum');
					$('#btn-nextStep,#btn-sumColNextStep').attr('data-nextbabstep', 'send-to-dealer');
					$('#btn-nextStep,#btn-sumColNextStep').text('Next: Send to Dealer');
					
				}
				
			}

			// if YES motors AND NO colors
			if((hasMotorOptions==="yes") && (hasColorOptions==="no")) {
				
				$('.custom-build-nav-item[data-babStep="motors"]').html('1. Motor <span class="fa-fw fas fa-long-arrow-right">');
				$('.custom-build-nav-item[data-babStep="options"]').html('2. Options <span class="fa-fw fas fa-long-arrow-right">');
				$('.custom-build-nav-item[data-babStep="sum"]').html('3. Summary <span class="fa-fw fas fa-long-arrow-right">');
				
				$('.custom-build-nav-item').removeClass('active');
				
				if(typeof buildId === 'undefined'){
					
					$('.custom-build-nav-item[data-babStep="motors"]').addClass('active');
					babStep('motors');
					$('#btn-nextStep,#btn-sumColNextStep').attr('data-nextbabstep', 'options');
					$('#btn-nextStep,#btn-sumColNextStep').text('NEXT: OPTIONS');
					
				} else {

					$('.custom-build-nav-item[data-babStep="sum"]').addClass('active');
					babStep('sum');
					$('#btn-nextStep,#btn-sumColNextStep').attr('data-nextbabstep', 'send-to-dealer');
					$('#btn-nextStep,#btn-sumColNextStep').text('Next: Send to Dealer');
					
				}
				
			}
			
			// if NO motors AND NO colors
			if((hasMotorOptions==="no") && (hasColorOptions==="no")) {
					
				$('.custom-build-nav-item[data-babStep="options"]').html('1. Options <span class="fa-fw fas fa-long-arrow-right">');
				$('.custom-build-nav-item[data-babStep="sum"]').html('2. Summary <span class="fa-fw fas fa-long-arrow-right">');
				$('.custom-build-nav-item').removeClass('active');
				
				$('.bab-wSlash').hide();
				
				if(typeof buildId === 'undefined'){

					$('.custom-build-nav-item[data-babStep="options"]').addClass('active');
					babStep('options');
					$('#btn-nextStep,#btn-sumColNextStep').attr('data-nextbabstep', 'sum');
					$('#btn-nextStep,#btn-sumColNextStep').text('NEXT: SUMMARY');
					
				} else {

					$('.custom-build-nav-item[data-babStep="sum"]').addClass('active');
					babStep('sum');
					$('#btn-nextStep,#btn-sumColNextStep').attr('data-nextbabstep', 'send-to-dealer');
					$('#btn-nextStep,#btn-sumColNextStep').text('Next: Send to Dealer');
					
				}
				
			}
			
		}, // END buildYourOwn.rewriteNavTabs()
		
		getZipcodeCookie : function() {
			var arr, reg = new RegExp("(^| )ZipCode=([^;]*)(;|$)");
			if (arr = document.cookie.match(reg)) {
				return unescape(arr[2]);
			} else {
				return null;
			}
		},

		getDealerCookie : function() {
			var arr, reg = new RegExp("(^| )DealerZip=([^;]*)(;|$)");
			if (arr = document.cookie.match(reg)) {
				return unescape(arr[2]);
			} else {
				return null;
			}
		},

		setCookie : function() {
			var name = arguments[0],
				value = arguments[1];
			// add expiry value if needed, not requird for session cookie
			document.cookie = name + "=" + value + ";path=/";
		},

		readCookie : function(name) {
			var nameEQ = name + "=",
				ca = document.cookie.split(';');
			for(var i=0;i < ca.length;i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') c = c.substring(1, c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
			}

			return null;

		},

		removeCookie : function(name) {
			var name = arguments[0],
				value = arguments[1];
			
			document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

			return null;

		}
	
	}
	  
	// grab the ID of the product we are dealing with
	if($('#productID').length){
		productID = $('#productID').text();
	} else if($('.boatID').length){
		productID = $('.boatID').attr('data-boatID');
	}
	
	// if the productID value was passed in the URL, and if it's value is a number, set it as our product ID.
	var incomingID = getUrlParameter('productID');
	
	// if productID is up in the calling query string
	if(typeof incomingID !== 'undefined'){
		
		// and it MUST be numeric or we don't want to touch it.
		if($.isNumeric(incomingID)){
			
			// Well then, hello there mumeric value. Let's set our variable with you, shall we?
			productID = incomingID;
			
		}
	}
	
	/********************************** 
	***********************************

		loadProduct(productID)

	***********************************
	***********************************/

	// Welcome to the function that starts everything up, loadProduct. Pass it a productID and watch things happen.
	window.loadProduct = function(productID) {
		
		// change send to dealer for hidden productId field
		$('input[name="productId"]').val([productID]);
		
		// if productID is numeric and not equal to 0 
		if(productID !== 0){
			
			localStorage.setItem('byoProductID', productID);
			
			// reach out with the productID and ask for model data
			$.ajax({
				
				dataType: "json",
				url: '/bin/boating-sites/modeldata?id=' + productID
				
			}).done(function( data ) {

				console.log(data)
				
				// store BYO model data for quick access later
				localStorage.setItem( 'byoProductData', JSON.stringify(data) );
 
				var productJSONdata = data;

				// get and set all of the product data variables
				buildYourOwn.init(productJSONdata);
				
				
				// hotwiring the step tab/nav buttons
				$('.custom-build-nav-item').bind("click", function(e){
					
					e.preventDefault();

					$('.custom-color-ui').hide();
					$('#column-bab-color').hide();

					$('.build-a-boat').fadeIn('fast');
					$('#btn-nextStep,#btn-sumColNextStep,.send-print').show();
					
					// get the step identifier and display the appropriate content

					var thisBabStep = $(this).attr('data-babStep');
					
					babStep(thisBabStep);
					
					switch(thisBabStep) {

						case 'color':
							$('.bab-step-heading').text('Select Your Colors:');
							$('#btn-nextStep,#btn-sumColNextStep').attr('data-nextbabstep', 'options');
							$('#btn-nextStep,#btn-sumColNextStep').text('NEXT: OPTIONS');
							$('.send-print').hide();
							break;

						case 'options':
							$('.bab-step-heading').text('Select Your Options:');
							$('#btn-nextStep,#btn-sumColNextStep').attr('data-nextbabstep', 'sum');
							$('#btn-nextStep,#btn-sumColNextStep').text('NEXT: SUMMARY');
							$('.send-print').hide();
							break;

						case 'sum':
							$('.bab-step-heading').text('Summary:');
							$('#btn-nextStep,#btn-sumColNextStep').attr('data-nextbabstep', 'send-to-dealer');
							$('#btn-nextStep,#btn-sumColNextStep').text('Next: Send to Dealer');
							$('.send-print').show();
							$('#btnSendToDealer').hide();

							break;

						case 'motors':
							$('.send-print').hide();
							$('.bab-step-heading').text('Select Your Motor Package:');
							if(localStorage.getItem('hasColorOptions') === 'no'){
								$('#btn-nextStep,#btn-sumColNextStep').attr('data-nextbabstep', 'options');
								$('#btn-nextStep,#btn-sumColNextStep').text('NEXT: OPTIONS');
							} else {
								$('#btn-nextStep,#btn-sumColNextStep').attr('data-nextbabstep', 'color');
								$('#btn-nextStep,#btn-sumColNextStep').text('NEXT: COLOR');
							}
							
							break;

						default: var foo = 'foo';

					};

				});
				
				// hotwiring the Next button 
				$('#btn-nextStep,#btn-sumColNextStep').bind("click", function(e){
					
					e.preventDefault();

					var nextBabStep = $(this).attr('data-nextbabstep');
					
					switch(nextBabStep) {

						case 'color':
							
							$('.bab-step-heading').text('Select Your Colors:');

							// hide and show the stuff
							$('.custom-color-ui,#column-bab-color,.build-a-boat').hide();
							$('.build-a-boat').fadeIn('fast');
							$('.send-print').hide();

							// set the next button
							$(this).attr('data-nextbabstep', 'options');
							$(this).text('NEXT: OPTIONS');

							// highlight this step tab
							$('.custom-build-nav-item[data-babStep="color"]').addClass('active');
							$(this).fadeIn('fast');
							break;

						case 'options':
							
							$('.bab-step-heading').text('Select Your Options:');
							
							$('.custom-color-ui,#column-bab-color').hide();
							$('.build-a-boat').fadeIn('fast');
							$('.send-print').hide();
							$(this).attr('data-nextbabstep', 'sum');
							$(this).text('NEXT: SUMMARY');
							$('.custom-build-nav-item[data-babStep="options"]').addClass('active');
							$(this).fadeIn('fast');
							break;

						case 'sum':
							
							$('.bab-step-heading').text('Summary:');
							
							$('.custom-color-ui,#column-bab-color').hide();
							$('.build-a-boat').fadeIn('fast');
							$('.send-print').show();
							$('#btnSendToDealer').hide();
							
							$(this).attr('data-nextbabstep', 'send-to-dealer');
							$(this).text('Next: Send to Dealer');
							
							$('.custom-build-nav-item[data-babStep="sum"]').addClass('active');
							$(this).fadeIn('fast');
							
							break;

						case 'motors':
							
							$('.bab-step-heading').text('Select Your Motor Package:');
							
							$('.custom-color-ui,#column-bab-color').hide();
							$('.build-a-boat').fadeIn('fast');
							$('.send-print').hide();
							
							$(this).attr('data-nextbabstep', 'color');
							$(this).text('NEXT: COLOR');
							
							$('.custom-build-nav-item[data-babStep="motors"]').addClass('active');
							$(this).fadeIn('fast');
							break;

						case 'send-to-dealer':

							$(this).hide();
							$('.send-print').hide();
							break;

						default: var foo = 'foo';

					};

					babStep(nextBabStep);

				});
				
			});

		} else {
			
			//console.log('Problem: The ID of the BYO product was calculated to be invalid (0).');
			
		}
	}
	
	/********************************** 
	***********************************

		babStep(step)

	***********************************
	***********************************/
	
	window.babStep = function(step) {

		if($('#bab-mainimage-container').html() === ''){
			$([document.documentElement, document.body]).animate({
				scrollTop: $("#modelYearSumCol").offset().top - 75
			}, 500);
		} else {
			// scroll to the top
			$('html, body').animate({
				scrollTop: $('body').offset().top
			}, 500);
		}
		
		var displayNextStep = 'Color';
		var thisNextStep = 'color';
		
		switch (step) { 
				
			case 'motor':
				displayNextStep = 'Color';
				thisNextStep = 'color';
				break;
				
			case 'color':
				displayNextStep = 'Options';
				thisNextStep = 'options';
				break;
				
			case 'options':
				displayNextStep = 'Summary';
				thisNextStep = 'sum';
				break;
				
			case 'sum':
				displayNextStep = 'Continue';
				thisNextStep = 'send-to-dealer'
				break;
				
			case 'send-to-dealer':
				
				$('.build-a-boat').fadeIn('fast');
				$('.bab-motors,#column-bab-color,.bab-options,.bab-sum').hide();
				
				// scroll to the top
				$('html, body').animate({
					scrollTop: $('body').offset().top
				}, 500);
				
				$('#firstName').focus();
				$('#message').text('Please contact me regarding my configured ' + $('#modelYearSumCol').text() + ' ' + $('#brandNameSumCol').text() + ' ' + $('#modelNameSumCol').text() + '.');
				
				break;
				
			default:
				displayNextStep = 'Color';
				thisNextStep = 'color';
		}

		// motors,color,options,sum
		// hide everything and show the current step
		$('.bab-motors,#column-bab-color,.bab-options,.bab-sum,.bab-send-to-dealer,#babSendToDealer').hide();
		$('.bab-'+step).fadeIn('fast');
		
		// mark the active step as visited
		$('.custom-build-nav-item.active').addClass('visited-step');
		
		// remove active from everything and then adde it back to the active tab
		$('.custom-build-nav-item').removeClass('active');
		$('.custom-build-nav-item[data-babStep="'+step+'"]').removeClass('visited-step');
		$('.custom-build-nav-item[data-babStep="'+step+'"]').addClass('active');
		
		// set the next button values
		if(step === 'send-to-dealer'){
			
			selectedDealer = JSON.parse( localStorage.getItem("myStore") );

			// if dealer data was NOT found in local storage ... 
			if( selectedDealer === null ){

				$('.form').css('pointer-events', 'none');
				$('.form').css('opacity', '0.25');
				$('[data-reveal-id="dealer-select-modal-container"]').click();
				$('.bab-step-heading').html('Send to Dealer');
				$('.send-instructions').html('<a class="button hollow expanded secondary small" data-reveal-id="dealer-select-modal-container" data-toggle="dealer-select-modal-container">Select A Dealer To Continue</a>');

			} else {

				$('.form').fadeIn('fast');
				$('.bab-step-heading').html('Send to Dealer');
				$('.send-instructions').css('text-align', 'center');
				if(BRANDNAME === 'Tracker Off Road'){
					$('.send-instructions').html(' Please fill out the form below to have your selected dealer contact you about your custom-built offroad vehicle.  You will also receive an email with a link to your vehicle build for future reference. ');
				} else {
					$('.send-instructions').html(' Please fill out the form below to have your selected dealer contact you about your boat. You will also receive an email with a link to your boat build for future reference. ');
				}

			}
			
			$('#btn-nextStep,#btn-sumColNextStep,.send-print').hide(); 
			
		} else {
			$('#btn-nextStep,#btn-sumColNextStep').attr('data-babStep', thisNextStep);
			if(displayNextStep === 'Continue'){
				$('#btn-nextStep,#btn-sumColNextStep').text(displayNextStep);
			} else {
				$('#btn-nextStep,#btn-sumColNextStep').text('NEXT: ' + displayNextStep);
			}
		}
		
		return;
		
	}
	
	/********************************** 
	***********************************

		udpateFormJSON()

	***********************************
	***********************************
	*/
	window.udpateFormJSON = function(){
		
		var selectedDealer = JSON.parse(localStorage.getItem("myStore")),
			pc = '(No preference was selected.)';
		
		if($('input[name=preferredContactType]:checked').val() !== undefined) {
			pc = $('input[name=preferredContactType]:checked').val();
		}
		
		var thisMessage = $('#message').val();
		if(thisMessage===''){
			thisMessage = '(Field left blank)';
		}
		if(selectedDealer){
			// set send to dealer hidden form field
			$('input[name="dealerId"]').val(selectedDealer.dealerId);
			$('input[name="emailTo"]').val($('#email').val());
			dealerId = selectedDealer.dealerId
		}
		
		// Defining a JavaScript object to be converted to JSON and applied to the jsonBuild hidden input value.
		var thisBYO = {
			productID: localStorage.getItem('byoProductID'),
			modelYear: $('#modelYearSumCol').text(),
			brandName: $('#brandNameSumCol').text(),
			modelName: $('#modelNameSumCol').text(),
			swatchPath: localStorage.getItem('byoSwatchPath'),
			modelAssetsPath: localStorage.getItem('byoModelAssetsPath'),
			motorID: localStorage.getItem('byoSelectedMotorID'), 
			dealerId: dealerId,
			buildImage: localStorage.getItem('byoBuildImage'),
			colorOptions: localStorage.getItem('byoSelectedColorOptions'),
			optionIDs: localStorage.getItem('byoSelectedOptionIDs'),
			colorPrice: localStorage.getItem('byoSelectedColorPrice'),
			grandTotal: localStorage.getItem('byoGrandTotal'),
			ZONECOST: localStorage.getItem('byoZONECOST'),
			PREPCOST: localStorage.getItem('byoPREPCOST'),
			packagePrice: localStorage.getItem('byoPackagePrice'),
			optionsTotal: localStorage.getItem('byoSelectedOptionsValue'),
			firstName: $('#firstName').val(),
			lastName: $('#lastName').val(),
			email: $('#email').val(),
			address1: $('#address1').val(),
			address2: $('#address2').val,
			city: $('#city').val(),
			stateProvince: $('#state').val(),
			postalCode: $('#postalCode').val(),
			country: $('#country').val(),
			message: thisMessage,
			phone: $('#phone').val(),
			preferredContact: pc
		}

		// Special nitro color option consideration
		if(thisBYO.brandName.indexOf('NITRO') > -1){
			var x = localStorage.getItem('byoNitro-buildColorData');
			x = JSON.parse(x);
			thisBYO.colorOptions = x;
		}

		// Special triton color option consideration
		if(thisBYO.brandName.indexOf('TRITON') > -1){
			var x = localStorage.getItem('byoTriton-buildColorData');
			x = JSON.parse(x);
			thisBYO.colorOptions = x;
		}

		// Special ranger color option consideration
		if(thisBYO.brandName.indexOf('RANGER') > -1){
			var x = localStorage.getItem('byoRanger-buildColorData');
			x = JSON.parse(x);
			thisBYO.colorOptions = x;
		}
		
		// insert BYO data into hidden form field
		$('#jsonBuild').val( JSON.stringify(thisBYO) );
		
	}
	
	/********************************** 
	***********************************

		EVENTS

	***********************************
	***********************************/

	// store the JSON after anything changes in the form
	$('#formBYOSendToDealer input, #formBYOSendToDealer textarea').change(function(){
		udpateFormJSON();
	});
	
	// defining what happens when the standard link is clicked
	$('.uom-standard').bind("click", function(){
		setUOM('standard');
	});
	
	// defining what happens when the metric link is clicked
	$('.uom-metric').bind("click", function(){
		setUOM('metric');
	});

	// defining what happens when the 'SEND TO DEALER' button is clicked
	$('#btnSendToDealer').bind("click", function(){
		
		babStep('send-to-dealer');
		
		// hide checkbox
		$('#form-stdCheckbox').hide();
		
		// tell the form that the intent is to send to dealer
		$('#formMode').val('STD');
		
		// check it man
		$('#stdCheckbox').prop('checked', true);
		
	});  
	
	// defining what happens when the 'PRINT' button is clicked
	$('.btn-printSave, #btnPrint').bind("click", function(){
		pdfJson();
	});
	
	$('#stdCheckbox').change(function(){
		if(this.checked){
			$('.contact-area').fadeIn('fast');
			$('#form-messageToDealer').fadeIn('fast');
			$('#alsoSendToDealer').val('true');
			
		} else {
			$('.contact-area').hide();
			$('#form-messageToDealer').hide();
			$('#alsoSendToDealer').val('false');
		}
	});
	
	// Subit button click handler for the SEND TO DEALER form.
	$(".submitButton").bind("click", function () {
		udpateFormJSON();
	});

	// Select the container to watch for a new selected dealer
	const dealerNode = document.getElementById('mini-nav-menu'); 
	// Options for the observer (which mutations to observe) 
	const config = { childList: true, subtree: true, characterData: true }; 
	// Callback function to execute when mutations are observed in the dealer container
	const newDealerSelected = function(mutationsList, observer) { 
		for (let mutation of mutationsList) { 
			console.log(mutation)
			if (mutation.type === 'childList') { 
				
				populateDealerInfo();
			
				$('#byoSelectDealerMessage').hide();
				$('#byoContainer').fadeIn('fast');

				$('#dealerSumAccordion, .dealer-info').fadeIn('fast');
				$('#selectDealer, .prep-freight h6 div').hide();
				
				$('.form').css('pointer-events', 'initial');
				$('.form').css('opacity', '1');
				$('.send-instructions').css('text-align', 'left');
				$('.bab-step-heading').html('Send to Dealer');

				if(BRANDNAME === 'Tracker Off Road'){
					$('.send-instructions').html(' Please fill out the form below to have your selected dealer contact you about your custom-built offroad vehicle.  You will also receive an email with a link to your vehicle build for future reference. ');
				} else {
					$('.send-instructions').html(' Please fill out the form below to have your selected dealer contact you about your boat. You will also receive an email with a link to your boat build for future reference. ');
				}

				updateSumCol();

			}
		} 
	}; 
	// Create an instance of MutationObserver with the callback 
	const observer = new MutationObserver(newDealerSelected); 
	// Start observing the dealerNode for configured mutations 
	observer.observe(dealerNode, config); 
	
	// top is set to 15% in clientlibs.js ... this overrides that and sets it back to 0
	$(document).on('open.zf.reveal', '[data-reveal]', function() {
		$('.reveal').css({
			top: 0
		});
	});
	
	console.log(productID);
	// the initial execution of loadProduct
	loadProduct(productID);
	
	// setting the specification accordion in the summary step to show standard measurements
	setUOM('standard');
	
    // let's hide custom colors in the summary accordion if there is nothing in it.
    if( typeof $('#sum-customColors').html() !== 'undefined'){ 
        if(!$('#sum-customColors').html().length){
            $('#sum-customColors').parents('li.accordion-item').hide();
        };
    };
	
	// this fixes a firefox bug where the color content intrudes on the footer content
	$('.bab-color').css("height", "unset");	

	/*
	// DON'T show the
	if(window.url.indexOf("trackeroffroad") < 0){

		// DREAMBOAT and haveDealerContact CSS insertion:
		$('head').append('<link rel="stylesheet" href="/content/dam/wrmg/BYO-GlobalAssets/css/dreamboat.css" type="text/css" />');
		


		// CONTACT ME checkbox insertion:
		$('#form-preferredContact').prepend('<div align="left"><div class="haveDealerContactCheckbox"><input type="checkbox" id="haveDealerContact" name="haveDealerContact" value="1"><label for="haveDealerContact" id="haveDealerContactLabel">Please call me to help turn my dream boat into reality and keep me informed about your latest promotions.</label></div></div>');
		// pre-check it on page load
		$("#haveDealerContact").prop("checked", true);
		$("#haveDealerContactLabel").change(function () {
			if($("#haveDealerContact").is(":checked")){
				$("#haveDealerContact").prop("checked", false);
			} else {
				$("#haveDealerContact").prop("checked", true);
			}
		});

		// DREAMBOAT checkbox insertion:
		$('#form-preferredContact').prepend('<div align="left"><div class="dreamBoatCheckbox"><input type="checkbox" id="dreamboat" name="dreamboat" value="1"><label for="dreamboat" id="dbl">Check the box to submit as your official Dream Boat Giveaway Entry.</label><div style="grid-column: 1 / span 2; margin: 0 0 30px; text-align: center;"><label style="line-height: 1.2;"><i>NO PURCH. NEC. US/DC, age 18+. <a href="https://www.basspro.com/shop/en/build-your-dream-boat-giveaway-rules" target="_blank" style="color:#e51b23">See Rules</a>. Ends 4/15/25 at 11:59 pm CT. Void where prohibited.</i></label></div></div></div>');
		$("#dbl").change(function () {
			if($("#dreamboat").is(":checked")){
				$("#dreamboat").prop("checked", false);
			} else {
				$("#dreamboat").prop("checked", true);
			}
		});

	}
	*/

}());