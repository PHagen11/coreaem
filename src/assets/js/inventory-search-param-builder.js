$(function() {

    let qs = getQueryString();
    const qsKeys = Object.keys(qs)
    const qsValues = Object.values(qs)
    let url = "";

    if (qsValues.includes("make-tracker+off+road") || qsValues.includes("tracker+off+road")) {
        url = "/atvs-for-sale";
    } else {
        url = "/boats-for-sale";
    }

    let keyIndex = 0;
    if (qsKeys.includes("make")) {
        for (let i = 0; i < qsKeys.length; i ++) {
            if (qsKeys[i] == "make" && !qsValues[i].includes("make-")) {
                url += "/make-";
            } else if (qsKeys[i] == "make" && qsValues[i].includes("make-")) {
                url += "/";
            }
        }
        keyIndex = qsKeys.indexOf("make");
        if (qsValues[keyIndex].includes("|")) {
            let values = qsValues[keyIndex].split("|");
            for (let i = 0; i < values.length - 1; i++) {
                url += values[i] + "%7C";
            }
            url += values.slice(-1);
        } else {
            url += qsValues[keyIndex];
        }
        let index = qsKeys.indexOf("make")
        qsKeys.splice(index, 1)
        qsValues.splice(index, 1)
    }
    if (qsKeys.includes("boatClass")) {
        keyIndex = qsKeys.indexOf("boatClass")
        url += "/boatClass-" + qsValues[keyIndex]
        let index = qsKeys.indexOf("boatClass")
        qsKeys.splice(index, 1)
        qsValues.splice(index, 1)
    }
    if (qsKeys.includes("condition")) {
        keyIndex = qsKeys.indexOf("condition")
        url += "/condition-" + qsValues[keyIndex]
        let index = qsKeys.indexOf("condition")
        qsKeys.splice(index, 1)
        qsValues.splice(index, 1)
    }
    
    url += "?"

    for (let key in qsKeys) {
        if (key > 0 && qsKeys[key] != "make" && qsKeys[key] != "boatClass" && qsKeys[key] != "condition") {
            url += "&"
        }
        if (qsKeys[key] == "year") {
            url += "yearMin=" + qsValues[key];
            url += "&yearMax=" + qsValues[key];
        } else if (qsKeys[key] == "length") {
            url += "lengthMin=" + qsValues[key];
            url += "&lengthMax=" + qsValues[key];
        } else if (qsKeys[key] == "price") {
            url += "priceMin=" + qsValues[key];
            url += "&priceMax=" + qsValues[key];
        } else if (qsKeys[key] == "model") {
            url += "model=" + encodeURI(qsValues[key]);
        } else if (qsKeys[key] == "engineSize") {
            url += "engineSizeMax=" + qsValues[key];
            url += "&engineSizeMin=" + qsValues[key];
        } else if (key && qsKeys[key] != "make" && qsKeys[key] != "boatClass" && qsKeys[key] != "condition") {
            // console.log(qsValues[key]);
            url += qsKeys[key] + "=" + qsValues[key];
        }
    }
  
    function getQueryString() {
        var result = {};
        if (!window.location.search.length) {
            return result = {"":""}
        }
        var qs = window.location.search.slice(1);
        var parts = qs.split("&");
        for (var i = 0, len = parts.length; i < len; i++) {
            var tokens = parts[i].split("=");
            result[tokens[0]] = decodeURIComponent(tokens[1]);
        }
        return result;
    }

    $("input[type='submit']").on("click", function(e) {
        e.preventDefault();
        if ($("input[name='zip']")[0].value) {
            url += "&zip=" + $("input[name='zip']")[0].value;
        }
        window.location.href = url;
    });
});