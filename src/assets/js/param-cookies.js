document.addEventListener('DOMContentLoaded', function() {

    /**
     * Creates a cookie, defaults to the location.href and path / for cookie storage.
     * @param {*} cname the name of the cookie being set.
     * @param {*} cvalue The value of the cookie
     * @param {*} exdays number of days till expire
     * @param {*} allowedProtocol http or https
     */

    function setMktCookie(cname, cvalue, exdays, allowedProtocol) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        var secure = getMktProtocol();
        if (allowedProtocol == 'https') {
            if (secure == allowedProtocol) {
                document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;secure;httpOnly";
            }
        } else {
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }
    }

    function getMktCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function checkMktCookie(cname) {
        var cookie = getMktCookie(cname);
        if (cookie != "") {
            return cookie;
        } else {
            return '';
        }
    }

    function getMktProtocol() {
        return location.protocol.replace(":", '');
    }

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
                if (checkMktCookie(key) == "" || checkMktCookie(key) != value) {
                    console.log("setting cookie");
                    setMktCookie(key, value, 60, protocol);
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
            setMktCookie("referrer", referrerDomain, 60, protocol);
            console.log("referrer " + referrerDomain);
        } else if (referrerUrl == "") {
            setMktCookie("referrer", referrerDomain, 60, protocol);
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

    function getCookieName(name) {
        const value = `; ${document.cookie}`;
        let matchingCookies = [];
        for (let cookie of name) {
            const cookieParts = value.split(`; ${cookie}=`);
            if (cookieParts.length === 2) { 
                matchingCookies.push(cookieParts.pop().split(';').shift())
                // return parts.pop().split(';').shift();
            }
        }
        return matchingCookies;
        // const parts = value.split(`; ${name}=`);
        // if (parts.length === 2) return parts.pop().split(';').shift();
    }
    function getCookieSize(name) {
        const cookieValue = getCookieName(name);
        let cookieSize = [];
        for (value of cookieValue) {
            if (value) {
                // Assuming UTF-8 encoding
                cookieSize.push(new Blob([value]).size)
                // return new Blob([cookieValue]).size; 
            } else {
                cookieSize.push(0);
                // return 0;
            }
        }
        return cookieSize
    }
    function deleteIfOversize(name, maxSize) {
        const cookieSizeArr = getCookieSize(name);
        for (let cookieSize in cookieSizeArr) {
            if (cookieSizeArr[cookieSize] > maxSize) {
                document.cookie = `${name[cookieSize]}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            }
        }
    }
    deleteIfOversize(['referrersWrmg', 'urlParamsWrmg'], 2024); // Delete if over 2KB
});
