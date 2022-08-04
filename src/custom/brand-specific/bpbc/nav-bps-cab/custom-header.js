jQuery(document).ready(function(){

    jQuery('#orgheader').hide();

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const r = urlParams.get('r');
    
    const baseURL = "https://assets.whiterivermg.com/content/dam/wrmg-web/bpbc/"
    
    if(r == "BPS") {
        jQuery("#div_content").load(baseURL + "BP-NAV.html");
        localStorage.setItem('referral', 'BPS');
    } else if (r == "CAB") {
        jQuery("#div_content").load(baseURL + "CAB-NAV.html");
        localStorage.setItem('referral', 'CAB');
    } else {
        const referral = localStorage.getItem('referral');

        if(referral == "BPS"){
            jQuery("#div_content").load(baseURL + "BP-NAV.html");
        } else if (referral == "CAB"){
            jQuery("#div_content").load(baseURL + "CAB-NAV.html");
        }else{
            //jQuery("#div_content").load(baseURL + "ORG-NAV.html");
            jQuery('#orgheader').show();
        }
    }
});