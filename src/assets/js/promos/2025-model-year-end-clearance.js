function twentyFiveMyod() {
    // Select all product cards and their condition elements
    const cardSectionAll = document.querySelectorAll(".card-section");
    const conditionAll = document.querySelectorAll(".condition");
    const promoBadgeAll = document.querySelectorAll(".inventory-card .card-divider");
    let promoModels = [
        {offer: '500', model: "Tracker Pro Team 175"},
        {offer: '500', model: "Tracker Pro Team 175 TXW"},
        {offer: '250', model: "Tracker Pro Guide V-16 WT"},
        {offer: '500', model: "Tracker Pro Guide V-175 Combo"},
        {offer: '750', model: "Tracker Targa V-18 Combo"},
        {offer: '500', model: "Sun Tracker Bass Buggy 16 XL Select"},
        {offer: '250', model: "Sun Tracker Party Barge 16 DLX"},
        {offer: '500', model: "Sun Tracker Bass Buggy 18 DLX"},
        {offer: '500', model: "Sun Tracker Party Barge 18 DLX"},
        {offer: '500', model: "Sun Tracker SportFish 20 DLX"},
        {offer: '500', model: "Sun Tracker Fishin' Barge 20 DLX"},
        {offer: '500', model: "Sun Tracker Party Barge 20 DLX"},
        {offer: '500', model: "Sun Tracker Party Barge 22 DLX"},
        {offer: '500', model: "Sun Tracker Party Barge 22 XP3"},
        {offer: '500', model: "Sun Tracker Fishin' Barge 22 DLX"},
        {offer: '500', model: "Sun Tracker Fishin' Barge 22 XP3"},
        {offer: '500', model: "Sun Tracker SportFish 22 DLX"},
        {offer: '500', model: "Sun Tracker SportFish 22 XP3"},
        {offer: '1000', model: "Sun Tracker Party Barge 24 DLX"},
        {offer: '1000', model: "Sun Tracker Sportfish 24 XP3"},
        {offer: '250', model: "Nitro Z17"},
        {offer: '500', model: "Nitro Z19"},
        {offer: '500', model: "Nitro Z19 Pro"},
        {offer: '750', model: "Nitro Z21 XL"},
        {offer: '750', model: "Nitro Z21 XL Pro"},
        {offer: '250', model: "Tahoe 185 S"},
        {offer: '250', model: "Tahoe 200 S"},
    ];

    // Process each product card
    for (let i = 0; i <= cardSectionAll.length - 1; i++){
        // Extract product information
        let title = cardSectionAll[i].querySelector(".mname").innerHTML.trim();
        /*** UNCOMMENT BELOW IF PROMO IS US/CANADA SPECIFIC ***/
        let condition = conditionAll[i].innerHTML.toLowerCase();
        cardSectionAll[i].style.position = "relative";

        // Find matching promotional model
        const modelMatch = promoModels.filter(promoModel => promoModel.model === title.slice(5));
        const isRangerTriton = title.includes("Ranger") || title.includes("Triton") ? "ranger-" : "";

        /*** UNCOMMENT BELOW IF PROMO IS US/CANADA SPECIFIC ***/
        // const isCanadaDealer = ["ab", "bc", "mb", "nb", "nl", "ns", "on", "pe", "qc", "sk"].includes(location.slice(-2))
        
        // Only apply promotions to new boats
        if (condition.includes("new")) {
            if (modelMatch.length > 0 && modelMatch[0]?.offer && !title.includes("2026") && !cardSectionAll[i].closest("a").classList.contains("hasPromo")) {
                if (window.innerWidth >= 640) {
                    cardSectionAll[i].closest("a").classList.add("hasPromo");
                    cardSectionAll[i].innerHTML += `<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2025-myec/myec-${isRangerTriton}${modelMatch[0].offer}.png" style="position: absolute !important; top: 54px !important; right: 3% !important; bottom: auto !important; left: auto !important; width:105px; max-width: 48% !important; z-index: 2 !important;">`;
                } else {
                    cardSectionAll[i].closest("a").classList.add("hasPromo");
                    cardSectionAll[i].innerHTML += `<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2025-myec/myec-${isRangerTriton}${modelMatch[0].offer}.png" style="top: 0px !important; position: relative !important; width: 100px !important; right: auto !important; bottom: auto !important; left: 0 !important; z-index: 2 !important;">`;
                }
            }
            if (!promoBadgeAll[i].querySelector(".promo-badge") && !title.includes("2026")) {
                promoBadgeAll[i].classList.add("align-justify");
                promoBadgeAll[i].innerHTML += '<div class="badge alert promo-badge" style="font-size:.75rem;color:#fff;background-color:#e32000;z-index: 0 !important;border-radius: 0.1875rem;">Clearance</div>';
            }
        }
    }
}
