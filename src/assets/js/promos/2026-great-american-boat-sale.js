function twentySixGabs() {
    // Select all product cards and their condition elements
    const cardSectionAll = document.querySelectorAll(".card-section");
    const conditionAll = document.querySelectorAll(".condition");
    const promoBadgeAll = document.querySelectorAll(".inventory-card .card-divider");
    let promoModels = [
        {offer: '500', model: "Sun Tracker Bass Buggy 16 XL Select"},
        {offer: '500', model: "Sun Tracker Party Barge 16 DLX"},
        {offer: '750', model: "Sun Tracker Bass Buggy 18 DLX"},
        {offer: '750', model: "Sun Tracker Party Barge 18 DLX"},
        {offer: '1000', model: "Sun Tracker Fishin' Barge 20 DLX"},
        {offer: '1000', model: "Sun Tracker SportFish 20 DLX"},
        {offer: '1000', model: "Sun Tracker Party Barge 20 DLX"},
        {offer: '1000', model: "Sun Tracker Fishin' Barge 22 DLX"},
        {offer: '1000', model: "Sun Tracker SportFish 22 DLX"},
        {offer: '1000', model: "Sun Tracker Party Barge 22 DLX"},
        {offer: '1000', model: "Sun Tracker Party Barge 22 RF DLX"},
        {offer: '1000', model: "Sun Tracker Fishin' Barge 22 XP3"},
        {offer: '1000', model: "Sun Tracker SportFish 22 XP3"},
        {offer: '1000', model: "Sun Tracker Party Barge 22 XP3"},
        {offer: '1000', model: "Sun Tracker Party Barge 22 RF XP3"},
        {offer: '1500', model: "Sun Tracker Sportfish 24 XP3"},
        {offer: '250', model: "Nitro Z18"},
        {offer: '250', model: "Nitro Z18 Pro"},
        {offer: '250', model: "Nitro Z19 XL"},
        {offer: '250', model: "Nitro Z19 XL Pro"},
        {offer: '250', model: "Nitro Z20 XL"},
        {offer: '250', model: "Nitro Z20 XL Pro"},
        {offer: '250', model: "Nitro Z21 XL"},
        {offer: '250', model: "Nitro Z21 XL Pro"},
        {offer: '250', model: "Ranger 1850MS"},
        {offer: '250', model: "Ranger 1880MS"},
        {offer: '250', model: "Ranger 620FS Cup-Equipped"},
        {offer: '250', model: "Ranger 621FS Cup-Equipped"},
        {offer: '250', model: "Ranger Z520"},
        {offer: '250', model: "Ranger Z521"},
        {offer: '250', model: "Ranger Z520R"},
        {offer: '250', model: "Ranger Z520R Cup-Equipped"},
        {offer: '250', model: "Ranger Z521R"},
        {offer: '250', model: "Ranger Z521R Cup-Equipped"},
        {offer: '250', model: "Mako Pro Skiff 13 CC"},
        {offer: '250', model: "Mako Pro Skiff 15 CC"},
        {offer: '250', model: "Mako Pro Skiff 17 CC"},
        {offer: '250', model: "Mako 18 Pro Skiff"},
        {offer: '250', model: "Mako 18 Pro Skiff Backwater Edition"},
        {offer: '250', model: "Mako 18 Pro Skiff Patriot Edition"},
        {offer: '250', model: "Mako 24 APEX"},
        {offer: '250', model: "Mako 226 Center Console"},
        {offer: '250', model: "Tahoe T16"},
        {offer: '250', model: "Tahoe T18"},
        {offer: '250', model: "Triton 18 TrX"},
        {offer: '250', model: "Triton 20XP"},
        {offer: '250', model: "Triton 20XP Patriot"},
        {offer: '250', model: "Triton 21XP"},
        {offer: '250', model: "Triton 21XP Patriot"},
    ];
    // Process each product card
    for (let i = 0; i <= cardSectionAll.length - 1; i++){
        // Extract product information
        let title = cardSectionAll[i].querySelector(".mname").innerHTML.trim();
        /*** UNCOMMENT BELOW IF PROMO IS US/CANADA SPECIFIC ***/
        let condition = conditionAll[i].innerHTML.toLowerCase();
        cardSectionAll[i].style.position = "relative";

        // Find matching promotional model
        // const modelMatch = promoModels.filter(promoModel => promoModel.model === title.slice(5));
        const modelMatch = promoModels.filter(promoModel => promoModel.model.includes(title.slice(5)));

        console.log('modelMatch>>>>>>', modelMatch)

        /*** UNCOMMENT BELOW IF PROMO IS US/CANADA SPECIFIC ***/
        // const isCanadaDealer = ["ab", "bc", "mb", "nb", "nl", "ns", "on", "pe", "qc", "sk"].includes(location.slice(-2))
        
        // Only apply promotions to new boats
        if (condition.includes("new")) {
            if (modelMatch.length > 0 && modelMatch[0]?.offer && !cardSectionAll[i].closest("a").classList.contains("hasPromo")) {
                if (window.innerWidth >= 640) {
                    cardSectionAll[i].closest("a").classList.add("hasPromo");
                    cardSectionAll[i].innerHTML += `<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2026/great-american-boat-sale/${modelMatch[0].offer}.png" style="position: absolute !important; top: 54px !important; right: 3% !important; bottom: auto !important; left: auto !important; width:130px; max-width: 48% !important; z-index: 2 !important;">`;
                } else {
                    cardSectionAll[i].closest("a").classList.add("hasPromo");
                    cardSectionAll[i].innerHTML += `<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2026/great-american-boat-sale/${modelMatch[0].offer}.png" style="top: 0px !important; position: relative !important; width: 110px !important; right: auto !important; bottom: auto !important; left: 0 !important; z-index: 2 !important; margin-bottom: -1rem;">`;
                }
            }
        }
    }
}
