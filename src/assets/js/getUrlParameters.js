// retrieve the value of a URL name/value pair.

function getUrlParameter(sParam) {
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
}