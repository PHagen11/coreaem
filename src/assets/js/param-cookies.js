$(document).ready(function() {
    function setUtmCookie() {
        // check for utm cookies and set utm parameters as cookies if needed
        if (!window.location.search.length) return;
        const protocol = "http";
        let queryString = window.location.search;
        queryString = queryString.replace("?","");
        let paramArr = queryString.split('&');

        for (let param in paramArr) {
            let splitParam = paramArr[param].split('=');
            let key = splitParam[0];
            let value = splitParam[1];

            if (key.startsWith("utm")) {
                if (checkCookie(key) == "" || checkCookie(key) != value) {
                    console.log("setting cookie");
                    setCookie(key, value, 365, protocol);
                }
            }
        }
    }

    function setReferrerUrl() {
        const referrerUrl = document.referrer;
        const siteDomain = window.location.host;
        let referrerDomain;
        referrerUrl ? referrerDomain = referrerUrl.split('/')[2] : referrerDomain = siteDomain;
        const protocol = "http";

        console.log("siteDomain " + siteDomain);

        if (siteDomain != referrerDomain && referrerUrl != "") {
            setCookie("referrer", referrerDomain, 365, protocol);
            console.log("referrer " + referrerDomain);
        } else if (referrerUrl == "") {
            setCookie("referrer", referrerDomain, 365, protocol);
            console.log("directly accessed " + referrerDomain);
        }
    }

    try {
        setUtmCookie();
        setReferrerUrl();
    } catch(error) {
        console.log("error setting utm fields: ");
        console.error(error);
    }
});
