function formDealerDisplay() {
    const myStore = localStorage.getItem("myStore")
    const dealerDisplay = document.getElementById("dealerDisplay")
    // const formDisplay = document.getElementById("form4")
    const submitBtnDisplay = document.querySelectorAll(".submitButton")

    if (!dealerDisplay) {
        return
    }

    dealerDisplay.innerHTML = null

    let dealerInfo = null
    if (myStore) {
        try {
            dealerInfo = JSON.parse(myStore)
        } catch (ex) {
            console.warn('invalid myStore JSON', ex)
        }
        if (submitBtnDisplay) {
            submitBtnDisplay.forEach(submitBtn => {
                submitBtn.disabled = false
            })
            // formDisplay.style.pointerEvents = "auto"
            // formDisplay.style.opacity = "1"
        }
    } else if (submitBtnDisplay) {
        submitBtnDisplay.forEach(submitBtn => {
            submitBtn.disabled = true
        })
        // formDisplay.style.pointerEvents = "none"
        // formDisplay.style.opacity = "0.25"
    }

    const dealerComponent = 
    `<div class="form-dealer-info small-bottom">
        <h6 class="dealer-select byoDealerName">${dealerInfo ? "Your Dealer: " : "No dealer selected"}</h6>
        <h6 class="dealer-name byoDealerName">${(dealerInfo?.dealerName ? dealerInfo.dealerName : "Select dealer to submit form")}</h6>
        <div class="dealer-result-address">
            <div class="dealer-result-address1 byoDealerAddress1">${dealerInfo?.address?.streetAddress1 || ""}</div>
            <div class="dealer-result-address2 byoDealerAddress2">${dealerInfo?.address?.streetAddress2 || ""}</div>
            <div class="dealer-result-city-state-zip cityStateZip">${dealerInfo?.address?.city ? dealerInfo?.address?.city + ", " : ""}${dealerInfo?.address?.state || ""} ${dealerInfo?.address?.postalCode || ""}</div>
        </div>
        <div class="dealer-result-phone">${dealerInfo?.phone1 ? 'Store Phone: <a href="tel:' + dealerInfo?.phone1 + '" class="byoDealerPhoneLink">' + dealerInfo?.phone1 + '</a>' : ""}</div>
        ${dealerInfo ? '<a class="change-dealer" data-reveal-id="dealer-select-modal-container" data-toggle="dealer-select-modal-container">Change My Dealer</a>' :
        '<a class="button select-dealer small" data-reveal-id="dealer-select-modal-container" data-toggle="dealer-select-modal-container">Select a Dealer</a>'}
    </div>`

    dealerDisplay.innerHTML = dealerComponent
}

function setMyDealer(dealerId) {
    let newSearch = "";
    if (jQuery("#jsVars").attr("data-newSearch") == "true")
        newSearch = "&newSearch=" + jQuery("#jsVars").attr("data-newSearch");

    // Return a Promise so callers can await completion of the ajax + localStorage update
    return new Promise(function(resolve, reject) {
        if (!(typeof(Storage) !== "undefined") || !dealerId) {
            resolve(null);
            return;
        }

        let dealerInfoUrl = "/bin/boating-sites/dealer-info?dealerId=" + dealerId + newSearch;
        if (getCookie("userGeoLatitude") && getCookie("userGeoLatitude") != "" && getCookie("userGeoLongitude") && getCookie("userGeoLongitude") != "") {
            dealerInfoUrl += "&lat=" + getCookie("userGeoLatitude") + "&long=" + getCookie("userGeoLongitude");
        } else if (getCookie("initlatlng") != null && getCookie("initlatlng") !== "") {
            let cordlist = getCookie("initlatlng").split('|');
            let akamaiLat = cordlist[0];
            let akamaiLong = cordlist[1];
            dealerInfoUrl += "&lat=" + akamaiLat + "&long=" + akamaiLong;
        } else if (typeof long !== 'undefined' && typeof lat !== 'undefined') {
            dealerInfoUrl += "&lat=" + lat + "&long=" + long;
        }

        $.ajax({
            url: dealerInfoUrl,
            data: {
                format: "json"
            },
            type: "GET",
            error: function() {
                console.log("error");
                resolve(null);
            },
            success: function(result) {
                let resultObj = result.result;
                if (typeof(resultObj) !== 'undefined' && typeof(resultObj.dealerId) !== 'undefined'
                        && typeof(resultObj.dealerName) !== 'undefined'
                        && typeof(resultObj.websiteUrl) !== 'undefined') {

                    setCookie("dealer", resultObj.dealerId, 365);
                    resultObj.timestamp = Date.now();
                    try {
                        localStorage.setItem('myStore', JSON.stringify(resultObj));
                    } catch (e) {
                        console.warn('failed to write myStore to localStorage', e);
                    }
                    resolve(resultObj);
                    return;
                }
                resolve(null);
            }
        });
    });
}

$(document).ready(function() {
    const dealerIdInput = document.getElementsByName("dealerId")
    const dealerSelectorModal = document.getElementById("dealer-select-modal-container")
    const domParser = new DOMParser()
    const dealerModal = 
    `<div class="reveal-overlay">
        <div class="reveal large" id="dealer-select-modal-container" data-reveal="yvsbvx-reveal" data-close-on-click="true" data-animation-in="slide-in-up-custom" data-animation-out="slide-out-up-custom" role="dialog" aria-hidden="false" data-yeti-box="dealer-select-modal-container" data-resize="dealer-select-modal-container" data-events="resize" tabindex="-1">
            <div class="dealer-select-modal">
                <div class="grid-x header">
                    <div class="cell small-12 text-center">
                        <div class="header-message">
                        Choose a Dealer Near You
                        </div>
                        <div class="message">
                        To view price with dealer prep and freight, use the search box to locate and choose a dealer near you.
                        </div>
                    </div>
                    <div class="cell small-1">
                        <button class="close-button" data-close="" aria-label="Close modal" type="button">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="cell small-12">
                        <form class="search-form" onsubmit="return false">
                            <div class="search-bar grid-x">
                                <i class="fas fa-search search-icon"></i>
                                <i class="fas fa-chevron-down arrow-icon" id="dropdown-icon"></i>
                                <select id="modal-radius" name="miles" class="miles align-self-middle">
                                    <option value="100" selected=""> 100 miles</option>
                                    <option value="250">250 miles </option>
                                    <option value="500">500 miles </option>
                                </select>
                                <input class="input-field pac-target-input" type="text" id="search-pf" name="dealer" placeholder="Zip, City" data-search="model" autocomplete="off">
                            </div>
                        </form>
                    </div>
                    <div class="cell small-12">
                        <div class="grid-x align-center">
                            <div class="cell small-12 medium-6 text-center">
                                <div class="use-location">
                                <a href="#" class="location-icon currentLocation"> Use My Current Location</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="results grid-x" id="dealer-search-results">
                </div>
            </div>
        </div>
    </div>`
    const modalNode = domParser.parseFromString(dealerModal, 'text/html').body.firstChild

    const existingModal = document.getElementById('dealer-select-modal-container')
    if (!existingModal && modalNode) {
        document.body.appendChild(modalNode)
    }

    if (dealerSelectorModal) {
        formDealerDisplay()
    }

    $("#dealer-select-modal-container").on("open.zf.reveal", async () => {
        const searchResults = await document.getElementById("dealer-search-results");
        if (searchResults) {
            searchResults.addEventListener('click', async (event) => {
                event.preventDefault()
                if (event.target.matches('.dealerSelect')) {
                    let dealerId = event.target.dataset.dealerId
                    if (dealerIdInput.length > 0) {
                        dealerIdInput[0].value = dealerId
                    } else {
                        let field = document.createElement("input");
                        field.name = "dealerId"
                        field.type = "hidden"
                        field.value = dealerId
                        document.getElementById(formId).appendChild(field)
                    }
                    await setMyDealer(dealerId)
                    formDealerDisplay()
                }
            }, { once: true })
        }
    })
});
