
(function () {
    var didInit = false;
    function initMunchkin() {
        if (didInit === false) {
            didInit = true;
            Munchkin.init('065-QRF-163', { "cookieAnon": true });
        }
    }
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = '//munchkin.marketo.net/munchkin.js';
    s.onreadystatechange = function () {
        if (this.readyState === 'complete' || this.readyState === 'loaded') {
            initMunchkin();
        }
    };
    s.onload = initMunchkin;
    document.getElementsByTagName('head')[0].appendChild(s);
})();

if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", init, false);
}

window.onload = init;

window.addEventListener('load', function () {
    init();
}, false);

function init() {
    if (arguments.callee.done)
        return;
    arguments.callee.done = true;
    initFormHandler();
}

function IncludeJsCookie(callback) {
    var jc = document.createElement('script');
    jc.type = 'text/javascript';
    jc.onload = jc.onreadystatechange = callback;
    jc.src = 'https://services.trojanpressinc.com/scripts/js.cookie.js';
    document.body.appendChild(jc);
}

function initFormHandler() {

    IncludeJsCookie(function () {
        if ("Cookies" in window) {
            setUrlParamsCookie();
        }
        var forms = document.getElementsByTagName("form");
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].addEventListener) {
                forms[i].addEventListener("submit", handleForm, false);  //Modern browsers
            } else if (forms[i].attachEvent) {
                forms[i].attachEvent('onsubmit', handleForm);            //Old IE
            }
        }
    });
}

function handleForm(e, callback) {
    var form;
    if (!e)
        e = window.event;

    if (e.target)
        form = e.target;
    else if (e.srcElement)
        form = e.srcElement;
    //if (form.nodeType == 3) // defeat Safari bug
    //    form = form.parentNode;
    //if (!form && e) {
    //    form = document.getElementById(e);
    //}

    if (e.tagName == 'FORM') {
        form = e;
    }
    else if (!form && e) {
        form = document.getElementById(e);
    }

    if (form.tagName !== 'FORM') {
        form = document.getElementsByTagName("form")[0];
    }

    var data = Serialize(form);

    var sourceUrl = encodeURIComponent(window.location.href);
    var mktoCookieValue = encodeURIComponent(getCookieValue("_mkto_trk"));
    var urlParamsCookieValue = encodeURIComponent(getCookieValue("urlParamsWrmg"));
    var referrersCookieValue = encodeURIComponent(getCookieValue("referrersWrmg"));

    var xmlhttp = new XMLHttpRequest();
    data = data + "&sourceUrl=" + encodeURIComponent(window.location.href)
        + "&mktoCookieValue=" + mktoCookieValue
        + "&urlParamsCookieValue=" + urlParamsCookieValue
        + "&referrersCookieValue=" + referrersCookieValue;

    xmlhttp.open("POST", 'https://services.trojanpressinc.com/api/FormHandler', true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.setRequestHeader("x-requested-with", "XMLHttpRequest");
    if (callback) {
        xmlhttp.onreadystatechange = function () {
            callback();
        };
    }
    xmlhttp.send(JSON.stringify(data)); 
}

function getCookieValue(name) {
    if ("Cookies" in window) {
        return Cookies.get(name);
    }
    else {
        return "";
    }
}

function setUrlParamsCookie() {
    var dt = new Date().getTime();
    var page = location.protocol + '//' + location.host + location.pathname;
    var source = getUrlParameterByName('utm_source');
    var medium = getUrlParameterByName('utm_medium');
    var campaign = getUrlParameterByName('utm_campaign');
    var term = getUrlParameterByName('utm_term');
    var content = getUrlParameterByName('utm_content');

    var cookieParameters = [];

    if (source !== "")
        cookieParameters.push({ page: page, param: "utm_source", value: source, dateTime: dt });
    if (medium !== "")
        cookieParameters.push({ page: page, param: "utm_medium", value: medium, dateTime: dt });
    if (campaign !== "")
        cookieParameters.push({ page: page, param: "utm_campaign", value: campaign, dateTime: dt });
    if (term !== "")
        cookieParameters.push({ page: page, param: "utm_term", value: term, dateTime: dt });
    if (content !== "")
        cookieParameters.push({ page: page, param: "utm_content", value: content, dateTime: dt });

    if (cookieParameters.length > 0 && "Cookies" in window) {
        var currentCookie = Cookies.get("urlParamsWrmg");
        var cookieParamsString = JSON.stringify(cookieParameters);
        if (currentCookie !== undefined) {
            var currentCookieParameters = JSON.parse(currentCookie);
            for (i = 0; i < cookieParameters.length; i++) {
                var exists = currentCookieParameters.some(function (param) {
                    var timeDiff = Math.abs(dt - param.dateTime);
                    return param.page === cookieParameters[i].page &&
                        param.param === cookieParameters[i].param &&
                        param.value === cookieParameters[i].value &&
                        timeDiff < 24 * 60 * 60 * 1000; // Check if the time difference is less than 24 hours
                });
                if (!exists) {
                    currentCookieParameters.push(cookieParameters[i]);
                }
            }
            cookieParamsString = JSON.stringify(currentCookieParameters);
            Cookies.set("urlParamsWrmg", cookieParamsString, { expires: 365 });
        }
        else {
            Cookies.set("urlParamsWrmg", cookieParamsString, { expires: 365 });
        }
    }

    var referrer = document.referrer;

    if (referrer && "Cookies" in window) {
        if (!document.referrer.split('/').includes(window.location.host)) {
            var currentCookie2 = Cookies.get("referrersWrmg");
            var cookieParameters2 = [];
            cookieParameters2.push({ referrer: referrer, dateTime: dt });
            var cookieParamsString2 = JSON.stringify(cookieParameters2);
            if (currentCookie2 !== undefined) {
                var currentCookieParameters2 = JSON.parse(currentCookie2);
                var exists2 = currentCookieParameters2.some(function (param) {
                    var timeDiff = Math.abs(dt - param.dateTime);
                    return param.referrer === referrer &&
                        timeDiff < 24 * 60 * 60 * 1000; // Check if the time difference is less than 24 hours
                });
                if (!exists2) {
                    currentCookieParameters2.push(cookieParameters2[0]);
                    cookieParamsString2 = JSON.stringify(currentCookieParameters2);
                    Cookies.set("referrersWrmg", cookieParamsString2, { expires: 365 });
                }
            }
            else {
                Cookies.set("referrersWrmg", cookieParamsString2, { expires: 365 });
            }
        }
    }
}

function getUrlParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function Serialize(form) {
    var field,
        l,
        s = [];

    if (typeof form == 'object' && form.nodeName == "FORM") {
        var len = form.elements.length;

        for (var i = 0; i < len; i++) {
            field = form.elements[i];
            if (field.name && field.type != 'button' && field.type != 'file' && field.type != 'reset' && field.type != 'submit') {
                if (field.type == 'select-multiple') {
                    l = form.elements[i].options.length;

                    for (var j = 0; j < l; j++) {
                        if (field.options[j].selected) {
                            s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[j].value);
                        }
                    }
                }
                else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
                    s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value);
                }
            }
        }
    }
    return s.join('&').replace(/%20/g, '+');
};