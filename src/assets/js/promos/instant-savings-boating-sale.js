function instantSavings() {
    // Select all product cards and their condition elements
    let cardSectionAll = document.querySelectorAll(".card-section");
    let conditionAll = document.querySelectorAll(".condition");
    let promoModels = [
        {offer: {2025: '750', 2024: '0'}, model: "Tracker Pro Team 175"},
        {offer: {2025: '750', 2024: '0'}, model: "Tracker Pro Team 175 Crappie Edition"},
        {offer: {2025: '750', 2024: '0'}, model: "Tracker Pro Team 175 Tournament Edition"},
        {offer: {2025: '1000', 2024: '0'}, model: "Tracker Pro Team 190"},
        {offer: {2025: '1000', 2024: '0'}, model: "Tracker Pro Team 195 Tournament Edition"},
        {offer: {2025: '750', 2024: '0'}, model: "Sun Tracker Bass Buggy 16 XL Select"},
        {offer: {2025: '750', 2024: '0'}, model: "Sun Tracker Bass Buggy 18 DLX"},
        {offer: {2025: '500', 2024: '0'}, model: "Sun Tracker SportFish 20 DLX"},
        {offer: {2025: '500', 2024: '0'}, model: "Sun Tracker Party Barge 16 DLX"},
        {offer: {2025: '500', 2024: '0'}, model: "Sun Tracker Party Barge 18 DLX"},
        {offer: {2025: '1000', 2024: '1500'}, model: "Ranger Z185"},
        {offer: {2025: '1000', 2024: '1500'}, model: "Ranger Z518"},
        {offer: {2025: '1000', 2024: '1500'}, model: "Ranger Z518 Ranger Cup Equipped"},
        {offer: {2025: '1000', 2024: '1500'}, model: "Ranger Z518 Cup-Equipped"},
        {offer: {2025: '2000', 2024: '3000'}, model: "Ranger Z519"},
        {offer: {2025: '2000', 2024: '3000'}, model: "Ranger Z519 Ranger Cup Equipped"},
        {offer: {2025: '2000', 2024: '3000'}, model: "Ranger Z519 Cup-Equipped"},
        {offer: {2025: '2000', 2024: '3000'}, model: "Ranger Z519R"},
        {offer: {2025: '2000', 2024: '3000'}, model: "Ranger Z519R Ranger Cup Equipped"},
        {offer: {2025: '2000', 2024: '3000'}, model: "Ranger Z519R Cup-Equipped"},
        {offer: {2025: '5000', 2024: '7500'}, model: "Ranger Z520"},
        {offer: {2025: '5000', 2024: '7500'}, model: "Ranger Z520R"},
        {offer: {2025: '5000', 2024: '7500'}, model: "Ranger Z520R Ranger Cup Equipped"},
        {offer: {2025: '5000', 2024: '7500'}, model: "Ranger Z520R Cup-Equipped"},
        {offer: {2025: '5000', 2024: '7500'}, model: "Ranger Z521"},
        {offer: {2025: '5000', 2024: '7500'}, model: "Ranger Z521R"},
        {offer: {2025: '5000', 2024: '7500'}, model: "Ranger Z521R Ranger Cup Equipped"},
        {offer: {2025: '5000', 2024: '7500'}, model: "Ranger Z521R Cup-Equipped"},
        {offer: {2025: '2500', 2024: '3750'}, model: "Ranger 1850MS"},
        {offer: {2025: '2500', 2024: '3750'}, model: "Ranger 2050MS"},
        {offer: {2025: '2500', 2024: '3750'}, model: "Ranger 1880MS"},
        {offer: {2025: '2500', 2024: '3750'}, model: "Ranger 2080MS"},
        {offer: {2025: '2500', 2024: '3750'}, model: "Ranger 212LS"},
        {offer: {2025: '5000', 2024: '7500'}, model: "Ranger 620FS Ranger Cup Equipped"},
        {offer: {2025: '5000', 2024: '7500'}, model: "Ranger 620FS Cup Equipped"},
        {offer: {2025: '5000', 2024: '7500'}, model: "Ranger 621FS Ranger Cup Equipped"},
        {offer: {2025: '5000', 2024: '7500'}, model: "Ranger 621FS Cup Equipped"},
        {offer: {2025: '5000', 2024: '7500'}, model: "Ranger 620FS Pro"},
        {offer: {2025: '5000', 2024: '7500'}, model: "Ranger 621FS Pro"},
        {offer: {2025: '5000', 2024: '7500'}, model: "Ranger 622FS Pro"},
        {offer: {2025: '500', 2024: '750'}, model: "Ranger Reata 200F"},
        {offer: {2025: '500', 2024: '750'}, model: "Ranger Reata 220F"},
        {offer: {2025: '750', 2024: '1125'}, model: "Ranger Reata 220C"},
        {offer: {2025: '500', 2024: '750'}, model: "Ranger Reata 200C"},
        {offer: {2025: '500', 2024: '750'}, model: "Ranger 200C"},
        {offer: {2025: '750', 2024: '1125'}, model: "Ranger Reata 223C"},
    ];

    // Process each product card
    for (let i = 0; i <= cardSectionAll.length - 1; i++){
        // Extract product information
        let currentTitle = cardSectionAll[i].querySelector(".mname").innerHTML.trim();
        let condition = conditionAll[i].innerHTML.toLowerCase();
        cardSectionAll[i].style.position = "relative";

        let promoPrefix = currentTitle.includes("Ranger") ? "ranger-" : "";

        // Find matching promotional model
        const modelMatch = promoModels.filter(promoModel => promoModel.model === currentTitle.slice(5));
        
        // Only apply promotions to new boats
        if (condition.includes("new")) {
            if (modelMatch.length > 0 && modelMatch[0].offer[2025] !== undefined && currentTitle.slice(0, 4) === "2025" && !currentTitle.includes("2026")) {
                if (window.innerWidth >= 640) {
                    cardSectionAll[i].closest("a").classList.add("hasPromo");
                    cardSectionAll[i].innerHTML += `<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/instant-savings-boat-sale/plp-${promoPrefix}${modelMatch[0].offer[2025]}.png" style="position: absolute !important; top: 54px !important; right: 3% !important; bottom: auto !important; left: auto !important; width:150px; max-width: 45% !important; z-index: 2 !important;">`;
                } else {
                    cardSectionAll[i].closest("a").classList.add("hasPromo");
                    cardSectionAll[i].innerHTML += `<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/instant-savings-boat-sale/plp-${promoPrefix}${modelMatch[0].offer[2025]}.png" style="top: 5px !important; position: relative !important; width: 130px !important; right: auto !important; bottom: auto !important; left: 0 !important; z-index: 2 !important;">`;
                }
            } else if (modelMatch.length > 0 && modelMatch[0].offer[2024] !== 0 && currentTitle.slice(0, 4) !== "2025" && !currentTitle.includes("Tracker") && !currentTitle.includes("2026")) {
                if (window.innerWidth >= 640) {
                    cardSectionAll[i].closest("a").classList.add("hasPromo");
                    cardSectionAll[i].innerHTML += `<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/instant-savings-boat-sale/plp-${promoPrefix}${modelMatch[0].offer[2024]}.png" style="position: absolute !important; top: 54px !important; right: 3% !important; bottom: auto !important; left: auto !important; width:150px; max-width: 45% !important;">`;
                } else {
                    cardSectionAll[i].closest("a").classList.add("hasPromo");
                    cardSectionAll[i].innerHTML += `<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/instant-savings-boat-sale/plp-${promoPrefix}${modelMatch[0].offer[2024]}.png" style="top: 5px !important; position: relative !important; width: 130px !important; right: auto !important; bottom: auto !important; left: 0 !important;">`;
                }
            }
        }
    }
}
