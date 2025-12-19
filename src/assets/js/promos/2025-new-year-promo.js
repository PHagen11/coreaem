/**
 * Manages the Gift Card promotional campaign for boat models
 * Adds promotional badges to boat listings based on model year and promotional offers
 * @function newYearPromo
 */
function newYearPromo() {
    // Select all product cards and their condition elements
    let cardSectionAll = document.querySelectorAll(".card-section");
    let conditionAll = document.querySelectorAll(".condition");
    /**
    * Array of boat models with their promotional details
    * @type {Array<{
    *   price: {
    *     2024: string,
    *     2025: string
    *   },
    *   model: string,
    *   cover: boolean
    * }>}
    */
    let promoModels = [
        {price: {2024: '250', 2025: '500'}, model: "Tracker Bass Tracker Classic XL", cover: false},
        {price: {2024: '250', 2025: '500'}, model: "Tracker Bass Tracker Classic Limited", cover: false},
        {price: {2024: '250', 2025: '500'}, model: "Tracker Pro 170", cover: false},
        {price: {2024: '500', 2025: '750'}, model: "Tracker Pro Team 175", cover: false},
        {price: {2024: '500', 2025: '0'}, model: "Tracker Pro Team 175 TF", cover: false},
        {price: {2024: '500', 2025: '0'}, model: "Tracker Pro Team 175 TXW", cover: false},
        {price: {2024: '500', 2025: '750'}, model: "Tracker Pro Team 175 Crappie Edition", cover: false},
        {price: {2024: '500', 2025: '750'}, model: "Tracker Pro Team 175 Tournament Edition", cover: false},
        {price: {2024: '500', 2025: '750'}, model: "Tracker Pro Team 190", cover: false},
        {price: {2024: '500', 2025: '0'}, model: "Tracker Pro Team 190 TX", cover: false},
        {price: {2024: '500', 2025: '750'}, model: "Tracker Pro Team 190 Tournament Edition", cover: false},
        {price: {2024: '500', 2025: '1000'}, model: "Tracker Pro Team 195 Tournament Edition", cover: false},
        {price: {2024: '500', 2025: '0'}, model: "Tracker Pro Team 195 TXW Tournament Edition", cover: false},
        {price: {2024: '1000', 2025: '0'}, model: "Tracker Targa V-18 WT", cover: false},
        {price: {2024: '1000', 2025: '0'}, model: "Tracker Targa V-18 Combo", cover: false},
        {price: {2024: '1000', 2025: '0'}, model: "Tracker Targa V-19 WT", cover: false},
        {price: {2024: '1000', 2025: '0'}, model: "Tracker Targa V-19 Combo", cover: false},
        {price: {2024: '1000', 2025: '0'}, model: "Tracker Targa V-19 Combo Tournament Edition", cover: false},
        {price: {2024: '0', 2025: '500'}, model: "Tracker Pro Guide V-16 SC", cover: false},
        {price: {2024: '0', 2025: '500'}, model: "Tracker Pro Guide V-16 WT", cover: false},
        {price: {2024: '0', 2025: '750'}, model: "Tracker Pro Guide V-175 WT", cover: false},
        {price: {2024: '0', 2025: '750'}, model: "Tracker Pro Guide V-175 Combo", cover: false},
        {price: {2024: '0', 2025: '500'}, model: "Nitro Z17", cover: true},
        {price: {2024: '500', 2025: '500'}, model: "Nitro Z18", cover: true},
        {price: {2024: '500', 2025: '500'}, model: "Nitro Z18 Pro", cover: true},
        {price: {2024: '750', 2025: '750'}, model: "Nitro Z19", cover: true},
        {price: {2024: '750', 2025: '750'}, model: "Nitro Z19 Pro", cover: true},
        {price: {2024: '1000', 2025: '1000'}, model: "Nitro Z20", cover: true},
        {price: {2024: '1000', 2025: '1000'}, model: "Nitro Z20 XL", cover: true},
        {price: {2024: '1000', 2025: '1000'}, model: "Nitro Z20 Pro", cover: true},
        {price: {2024: '1000', 2025: '1000'}, model: "Nitro Z20 XL Pro", cover: true},
        {price: {2024: '1000', 2025: '1000'}, model: "Nitro Z21 XL", cover: true},
        {price: {2024: '1000', 2025: '1000'}, model: "Nitro Z21 XL Pro", cover: true},
        {price: {2024: '750', 2025: '750'}, model: "Nitro ZV19", cover: true},
        {price: {2024: '750', 2025: '750'}, model: "Nitro ZV19 Sport", cover: true},
        {price: {2024: '750', 2025: '750'}, model: "Nitro ZV19 Pro", cover: true},
        {price: {2024: '1000', 2025: '1000'}, model: "Nitro ZV20", cover: true},
        {price: {2024: '1000', 2025: '1000'}, model: "Nitro ZV20 Pro", cover: true},
        {price: {2024: '1000', 2025: '1000'}, model: "Nitro ZV21", cover: true},
        {price: {2024: '1000', 2025: '1000'}, model: "Nitro ZV21 Pro", cover: true},
        {price: {2024: '500', 2025: '500'}, model: "Sun Tracker Bass Buggy 16 XL Select", cover: false},
        {price: {2024: '500', 2025: '500'}, model: "Sun Tracker Bass Buggy 18 DLX", cover: false},
        {price: {2024: '750', 2025: '500'}, model: "Sun Tracker Fishin' Barge 20 DLX", cover: false},
        {price: {2024: '750', 2025: '500'}, model: "Sun Tracker SportFish 20 DLX", cover: false},
        {price: {2024: '1000', 2025: '500'}, model: "Sun Tracker Fishin' Barge 22 DLX", cover: false},
        {price: {2024: '1000', 2025: '500'}, model: "Sun Tracker Fishin' Barge 22 XP3", cover: false},
        {price: {2024: '1000', 2025: '500'}, model: "Sun Tracker Party Barge 22 DLX", cover: false},
        {price: {2024: '1000', 2025: '500'}, model: "Sun Tracker Party Barge 22 RF DLX", cover: false},
        {price: {2024: '1000', 2025: '500'}, model: "Sun Tracker Party Barge 22 XP3", cover: false},
        {price: {2024: '1000', 2025: '500'}, model: "Sun Tracker Party Barge 22 RF XP3", cover: false},
        {price: {2024: '1000', 2025: '500'}, model: "Sun Tracker SportFish 22 DLX", cover: false},
        {price: {2024: '1000', 2025: '500'}, model: "Sun Tracker SportFish 22 XP3", cover: false},
        {price: {2024: '1000', 2025: '500'}, model: "Sun Tracker Sportfish 24 XP3", cover: false},
        {price: {2024: '500', 2025: '500'}, model: "Ranger RT178", cover: false},
        {price: {2024: '500', 2025: '500'}, model: "Ranger RT178C", cover: false},
        {price: {2024: '750', 2025: '750'}, model: "Ranger RT188", cover: false},
        {price: {2024: '750', 2025: '750'}, model: "Ranger RT188C", cover: false},
        {price: {2024: '1000', 2025: '1000'}, model: "Ranger RT188P", cover: false},
        {price: {2024: '1000', 2025: '1000'}, model: "Ranger RT198P", cover: false},
        {price: {2024: '1000', 2025: '1000'}, model: "Ranger ALPHA 208", cover: false},
        {price: {2024: '500', 2025: '500'}, model: "Ranger VS1665T", cover: false},
        {price: {2024: '500', 2025: '500'}, model: "Ranger VS1665SC", cover: false},
        {price: {2024: '750', 2025: '750'}, model: "Ranger VS1682SC Angler", cover: false},
        {price: {2024: '750', 2025: '750'}, model: "Ranger VS1682SC Reata", cover: false},
        {price: {2024: '1000', 2025: '1000'}, model: "Ranger VS1782SC Angler", cover: false},
        {price: {2024: '1000', 2025: '1000'}, model: "Ranger VS1782SC Reata", cover: false},
        {price: {2024: '1000', 2025: '1000'}, model: "Ranger VS1882SC Angler", cover: false},
        {price: {2024: '1000', 2025: '1000'}, model: "Ranger VS1882SC Reata", cover: false},
        {price: {2024: '1000', 2025: '1000'}, model: "Ranger VX1788 WT", cover: false},
        {price: {2024: '1000', 2025: '1000'}, model: "Ranger VX1888 WT", cover: false},
        {price: {2024: '1000', 2025: '1000'}, model: "Ranger VX1988 WT", cover: false},
        {price: {2024: '1000', 2025: '0'}, model: "Ranger RB190", cover: false},
        {price: {2024: '1000', 2025: '0'}, model: "Ranger RB200", cover: false},
        {price: {2024: '1000', 2025: '0'}, model: "Ranger RB210", cover: false},
        {price: {2024: '0', 2025: '500'}, model: "Ranger Z185", cover: true},
        {price: {2024: '500', 2025: '500'}, model: "Ranger Z518", cover: true},
        {price: {2024: '500', 2025: '500'}, model: "Ranger Z518 Ranger Cup Equipped", cover: true},
        {price: {2024: '1000', 2025: '1000'}, model: "Ranger Z519", cover: true},
        {price: {2024: '1000', 2025: '1000'}, model: "Ranger Z519 Ranger Cup Equipped", cover: true},
        {price: {2024: '1000', 2025: '1000'}, model: "Ranger Z519R", cover: true},
        {price: {2024: '1000', 2025: '1000'}, model: "Ranger Z519R Cup-Equipped", cover: true},
        {price: {2024: '2000', 2025: '2000'}, model: "Ranger Z520", cover: true},
        {price: {2024: '2000', 2025: '2000'}, model: "Ranger Z520R", cover: true},
        {price: {2024: '2000', 2025: '2000'}, model: "Ranger Z520R Ranger Cup Equipped", cover: true},
        {price: {2024: '2000', 2025: '2000'}, model: "Ranger Z521", cover: true},
        {price: {2024: '2000', 2025: '2000'}, model: "Ranger Z521R", cover: true},
        {price: {2024: '2000', 2025: '2000'}, model: "Ranger Z521R Ranger Cup Equipped", cover: true},
        {price: {2024: '1000', 2025: '1000'}, model: "Ranger 1850MS", cover: true},
        {price: {2024: '1000', 2025: '1000'}, model: "Ranger 2050MS", cover: true},
        {price: {2024: '1000', 2025: '1000'}, model: "Ranger 1880MS", cover: true},
        {price: {2024: '1000', 2025: '1000'}, model: "Ranger 2080MS", cover: true},
        {price: {2024: '1000', 2025: '1000'}, model: "Ranger 212LS", cover: true},
        {price: {2024: '2000', 2025: '2000'}, model: "Ranger 620FS Ranger Cup Equipped", cover: true},
        {price: {2024: '2000', 2025: '2000'}, model: "Ranger 621FS Ranger Cup Equipped", cover: true},
        {price: {2024: '2000', 2025: '2000'}, model: "Ranger 620FS Pro", cover: true},
        {price: {2024: '2000', 2025: '2000'}, model: "Ranger 621FS Pro", cover: true},
        {price: {2024: '2000', 2025: '2000'}, model: "Ranger 622FS Pro", cover: true},
        {price: {2024: '500', 2025: '500'}, model: "Triton 179 TrX", cover: true},
        {price: {2024: '500', 2025: '500'}, model: "Triton 18 TrX", cover: true},
        {price: {2024: '750', 2025: '750'}, model: "Triton 19 TrX", cover: true},
        {price: {2024: '1000', 2025: '1000'}, model: "Triton 20 TrX", cover: true},
        {price: {2024: '1000', 2025: '1000'}, model: "Triton 20 TrX Patriot", cover: true},
        {price: {2024: '1000', 2025: '1000'}, model: "Triton 20XP", cover: true},
        {price: {2024: '1000', 2025: '1000'}, model: "Triton 20XP Patriot", cover: true},
        {price: {2024: '1000', 2025: '1000'}, model: "Triton 21 TrX", cover: true},
        {price: {2024: '1000', 2025: '1000'}, model: "Triton 21 TrX Patriot", cover: true},
        {price: {2024: '1000', 2025: '1000'}, model: "Triton 21 XrT", cover: true},
        {price: {2024: '1000', 2025: '1000'}, model: "Triton 21XP", cover: true},
        {price: {2024: '1000', 2025: '1000'}, model: "Triton 21XP Patriot", cover: true},
        {price: {2024: '1000', 2025: '1000'}, model: "Triton 206 Fishunter", cover: true},
        {price: {2024: '500', 2025: '500'}, model: "Triton 186 Fishunter", cover: true},
        {price: {2024: '1000', 2025: '1000'}, model: "Triton 206 Allure", cover: true},
        {price: {2024: '500', 2025: '500'}, model: "Triton 186 Allure", cover: true}
    ];

    // Process each product card
    for (let i = 0; i <= cardSectionAll.length - 1; i++){
        // Extract product information
        let currentTitle = cardSectionAll[i].querySelector(".mname").innerHTML.trim();
        let condition = conditionAll[i].innerHTML.toLowerCase();
        cardSectionAll[i].style.position = "relative";

        // Determine model year from title
        const modelYear = currentTitle.indexOf("2025") !== -1 ? "2025" : currentTitle.indexOf("2024") !== -1 ? "2024" : "2023";

        // Remove year prefix from model name
        let currentBrandModel = currentTitle.slice(5);

        // Find matching promotional model
        const modelMatch = promoModels.filter(promoModel => promoModel.model === currentBrandModel);

        // Get promotional price (if any)
        const checkPrice = modelMatch.length > 0 ? modelMatch[0].price[modelYear] : "0"
        
        // Only apply promotions to new boats
        if (condition.includes("new")) {
            /**
             * Apply promotional badges based on conditions:
             * 1. 2024 models with gift card offer
             * 2. 2025 models with gift card offer
             * 3. 2024 models with clearance but no gift card
             * 4. Other 2024 or later models (clearance only)
             */
            if (modelMatch.length > 0 && modelYear === "2024" && checkPrice !== "0") {
                // Add both gift card and clearance badges for 2024 models
                if (window.innerWidth >= 640) {
                    cardSectionAll[i].closest("a").classList.add("hasPromo");
                    cardSectionAll[i].innerHTML += `<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2025-new-year-promo/GiftCard_Bug_${checkPrice}.jpg" style="position: absolute !important;top: 26% !important;right: 17% !important;bottom: auto !important;left: auto !important;width: 120px;max-width: 33% !important;"><img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2024-model-year-end-clearance/2024-model-year-end-clearance.png" style="position: absolute !important;top: 62% !important;right: 3% !important;bottom: auto !important;left: auto !important;width: 120px !important;max-width:33% !important;">`;
                } else {
                    cardSectionAll[i].closest("a").classList.add("hasPromo");
                    cardSectionAll[i].innerHTML += `<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2025-new-year-promo/GiftCard_Bug_${checkPrice}.jpg" style="top: 0px !important;position: relative !important;width: 100px !important;right: auto !important;bottom: auto !important;left: 0 !important;"><img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2024-model-year-end-clearance/2024-model-year-end-clearance.png" style="top: 182px !important;position: absolute !important;width: 100px !important;right: auto !important;bottom: auto !important;left: 60px !important;">`;
                }
            } else if (modelMatch.length > 0 && modelYear === "2025" && checkPrice !== "0") {
                // Add gift card badge only for 2025 models
                if (window.innerWidth >= 640) {
                    cardSectionAll[i].closest("a").classList.add("hasPromo");
                    cardSectionAll[i].innerHTML += `<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2025-new-year-promo/GiftCard_Bug_${checkPrice}.jpg" style="position: absolute !important; top: 38px !important; right: 3% !important; bottom: auto !important; left: auto !important; width:140px; max-width: 45% !important;">`;
                } else {
                    cardSectionAll[i].closest("a").classList.add("hasPromo");
                    cardSectionAll[i].innerHTML += `<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2025-new-year-promo/GiftCard_Bug_${checkPrice}.jpg" style="top: 0px !important; position: relative !important; width: 130px !important; right: auto !important; bottom: auto !important; left: 0 !important;">`;
                }
            } else if (modelYear === "2024" && modelMatch.length > 0 && checkPrice === "0") {
                // Add clearance badge only for 2024 models without gift card offer
                if (window.innerWidth >= 640) {
                    cardSectionAll[i].closest("a").classList.add("hasPromo");
                    cardSectionAll[i].innerHTML += '<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2024-model-year-end-clearance/2024-model-year-end-clearance.png" alt="Model Year End Clearance" style="position: absolute !important; top: 75px !important; right: 6% !important; bottom: auto !important; left: auto !important; width: 115px !important;">';
                } else {
                    cardSectionAll[i].closest("a").classList.add("hasPromo");
                    cardSectionAll[i].innerHTML += '<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2024-model-year-end-clearance/2024-model-year-end-clearance.png" alt="Model Year End Clearance" style="top: 10px !important; position: relative !important; width: 115px !important; right: auto !important; bottom: auto !important; left: 0 !important;">';
                }
            } else if (modelYear === "2023" || (modelYear === "2024" && modelMatch.length === 0)) {
                // Add clearance badge for all other 2024 or later models
                if (window.innerWidth >= 640) {
                    cardSectionAll[i].closest("a").classList.add("hasPromo");
                    cardSectionAll[i].innerHTML += '<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2024-model-year-end-clearance/2024-model-year-end-clearance.png" alt="Model Year End Clearance" style="position: absolute !important; top: 75px !important; right: 6% !important; bottom: auto !important; left: auto !important; width: 115px !important;">';
                } else {
                    cardSectionAll[i].closest("a").classList.add("hasPromo");
                    cardSectionAll[i].innerHTML += '<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2024-model-year-end-clearance/2024-model-year-end-clearance.png" alt="Model Year End Clearance" style="top: 10px !important; position: relative !important; width: 115px !important; right: auto !important; bottom: auto !important; left: 0 !important;">';
                }
            }
        }
    }
}
