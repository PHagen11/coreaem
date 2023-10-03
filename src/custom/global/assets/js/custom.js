
//Custom function to update footer copyright year to current year.
window.onload = updateCopyright;
function updateCopyright() {
	try {
		var copyright = document.createTextNode("\u00a9");
		var div = document.getElementsByClassName("copyright")[0];
		div.innerText = div.innerText.replace(/\d/g, '').replace(/\u00a9/g, copyright.textContent + (new Date().getFullYear()));
	}
	catch {
		
	}
}


/*
const script = document.createElement('script');
script.src = '/content/dam/wrmg/global/js/digitalData.js';
document.head.appendChild(script);
*/

// wrmgDigitalData.js

// Trying to avoid using jquery in the following script 
// This is the equivelant to $( document ).ready(function() { ...
document.addEventListener("DOMContentLoaded", function(event) { 

	window.digitalDataCaptureForm = function(form) {

		var formData, formValues;
	
		formData = new FormData(form);
		formValues = Object.fromEntries(formData.entries());

		// go push the form submission into the digitalData object
		return pushEvent('formSubmit', formValues);
	
	}
	
	// pushes an event into the digitalData object
	function pushEvent(eventType, values){


		//debugger

		var eventHolder = {}, eventName = '';

		if(values.formType) {
			eventName = values.formType;
			if(eventType) eventName += "-" + eventType;
			if(document.location.host.includes('.com')) {
				eventName += '-production';
			} else {
				eventName += '-development';
			}
		};
		
		eventHolder = {
			eventName: eventName,
			eventType: eventType
		};

		if(eventType === 'formSubmit'){
			if(values){
				eventHolder.formValues = values;
			}
		};

		wrmgDigitalData.event.push(eventHolder);

		function uuidv4() {
			return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
				(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
			);
		}
		  
		var uuid = uuidv4();

		// saving object to local storage in case we need it when we get to the redirect page
		localStorage.setItem(uuid, JSON.stringify(eventHolder));
		console.log(wrmgDigitalData);

		return uuid;
	
	}



	// define productID if possible
	let productID = '0';
	if(document.getElementsByClassName("boatID").length > 0){
		productID = document.getElementsByClassName("boatID")[0].getAttribute('data-boatID');
	};

	var setPageInstanceID = function(){

		var id = "";

		// if this is the home page
		if(document.location.pathname === '/'){

			id = 'HomePage';

		// else if this a product page
		} else if(productID != '0'){

			id = 'ProductPage'

		// everyhting else do this
		} else {

			// remove the first forward slash in the path string
			id = document.title.replace('/', '');
			// replace the rest of the forward slashes with a dash
			id = id.replace(/ /g, '-');
			// remove .html from the path string
			id = id.replace('.html', '');

		}

		// add environment tag to the string
		if(document.location.host.includes('.com')){
			id += '-Production';
		} else if(document.location.host.includes('.test')){
			id += '-Development';
		} else {
			id += '-Unknown';
		}

		return id;

	}


	var setPage = function(){

		var pageID = ''; 
		var pageTitle = document.title;
		var destinationURL = document.location.href;
		var primaryCategory = '';
		var pageType = '';
		var country = 'US';
		var language = 'en-US';

		// if this is the home page
		if(document.location.pathname === '/'){

			pageID = 'HomePage';
			primaryCategory = '';
			pageType = 'Information';

		// else if this is a product page
		} else if(productID != '0'){

			pageID = 'ProductPage' + productID;
			primaryCategory = '';
			pageType = 'Product Detail Page';

		// everything else
		} else {

			// remove the first forward slash in the path string
			pageID = document.title.replace('/', '');
			// replace the rest of the forward slashes with a dash
			pageID = pageID.replace(/ /g, '-');
			// remove .html from the path string
			pageID = pageID.replace('.html', '');

			primaryCategory = 'SubPage';
			pageType = 'Information';

		}

		var page = {
			pageInfo: {
				pageID: pageID,
				destinationURL: destinationURL,
				pageTitle: pageTitle
			},
			category: {
				primaryCategory: primaryCategory,
				pageType: pageType
			},
			attributes:{
				country: country,
				language: language
			}
		} 

		return page; 

	}


	var setProduct = function(productID){

		// call the API to get product data
		$.ajax({	
			dataType: "json",
			url: 'https://assets.whiterivermg.com/bin/boating-sites/modeldata?id=' + productID
		}).done(function(data) {

			var brand = data.BRANDNAME;
			var modelYear = data.MODELYEAR;
			var modelName = data.BOATNAME;
			var segmentName = data.SEGMENTNAME;
			var productName = modelYear + ' ' + brand + ' ' + modelName;
		
			wrmgDigitalData.product = {
				productInfo: {
					productName: productName,
					sku: productID,
					manufacturer: brand,
					modelYear: modelYear,
					modelName: modelName
				},
				category: {
					primaryCategory: segmentName
				}
			} 
			
			// dump it to the console
			console.log(wrmgDigitalData);

		});

	}


	// set the page portion of the object
	wrmgDigitalData = {
		pageInstanceID: setPageInstanceID(),
		page: setPage(),
		event: []
	};


	// if this is a product page, call the API and add the product object
	if(productID !== '0'){
		setProduct(productID);
	} else {
		// else just dump it to the console
		console.log(wrmgDigitalData);
	}

	



});