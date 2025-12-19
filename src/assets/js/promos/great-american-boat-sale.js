function greatAmericanBoatingSale() {
    // Select all product cards and their condition elements
    const cardSectionAll = document.querySelectorAll(".card-section");
    const conditionAll = document.querySelectorAll(".condition");
    let promoModels = [
        {offer: {2025: '1500', 2024: '1500'}, model: "Tracker Pro Team 175"},
        {offer: {2025: '1000', 2024: '1000'}, model: "Sun Tracker Bass Buggy 16 XL Select"},
        {offer: {2025: '750', 2024: '750'}, model: "Sun Tracker Party Barge 16 DLX"},
        {offer: {2025: '1000', 2024: '1000'}, model: "Sun Tracker Bass Buggy 18 DLX"},
        {offer: {2025: '1000', 2024: '1000'}, model: "Sun Tracker Party Barge 18 DLX"},
        {offer: {2025: '1000', 2024: '1000'}, model: "Sun Tracker SportFish 20 DLX"},
        {offer: {2025: '1000', 2024: '1000'}, model: "Sun Tracker Fishin' Barge 20 DLX"},
        {offer: {2025: '1000', 2024: '1000'}, model: "Sun Tracker Party Barge 20 DLX"},
        {offer: {2025: '1500', 2024: '1500'}, model: "Sun Tracker Party Barge 24 DLX"},
        {offer: {2025: '750', 2024: '750'}, model: "Ranger Reata 200F"},
        {offer: {2025: '750', 2024: '750'}, model: "Ranger Reata 200C"},
        {offer: {2025: '1000', 2024: '1000'}, model: "Ranger Reata 220F"},
        {offer: {2025: '1000', 2024: '1000'}, model: "Ranger Reata 220FC"},
        {offer: {2025: '1000', 2024: '1000'}, model: "Ranger Reata 220C"},
        {offer: {2025: '1000', 2024: '1000'}, model: "Ranger Reata 223F"},
        {offer: {2025: '1000', 2024: '1000'}, model: "Ranger Reata 223FC"},
        {offer: {2025: '1000', 2024: '1000'}, model: "Ranger Reata 223C"},
        {offer: {2025: '1500', 2024: '1500'}, model: "Ranger Reata 243C"},
        {offer: {2025: '750', 2024: '750'}, model: "Ranger RB190"},
        {offer: {2025: '750', 2024: '750'}, model: "Ranger RB200"},
        {offer: {2025: '1500', 2024: '1500'}, model: "Ranger RB210"},
        {offer: {2025: '750', 2024: '750'}, model: "Tahoe 185 S"},
        {offer: {2025: '750', 2024: '750'}, model: "Tahoe 200 S"},
    ];

    // Process each product card
    for (let i = 0; i <= cardSectionAll.length - 1; i++){
        // Extract product information
        let title = cardSectionAll[i].querySelector(".mname").innerHTML.trim();
        /*** UNCOMMENT BELOW IF PROMO IS US/CANADA SPECIFIC ***/
        // let location = cardSectionAll[i].querySelector(".locname").innerHTML.trim().toLowerCase();
        let condition = conditionAll[i].innerHTML.toLowerCase();
        cardSectionAll[i].style.position = "relative";

        // Find matching promotional model
        const modelMatch = promoModels.filter(promoModel => promoModel.model === title.slice(5));

        /*** UNCOMMENT BELOW IF PROMO IS US/CANADA SPECIFIC ***/
        // const isCanadaDealer = ["ab", "bc", "mb", "nb", "nl", "ns", "on", "pe", "qc", "sk"].includes(location.slice(-2))
        
        // Only apply promotions to new boats
        if (condition.includes("new")) {
            if (modelMatch.length > 0 && modelMatch[0].offer[2025] !== undefined && title.includes("2025") && !title.includes("2026")) {
                if (window.innerWidth >= 640) {
                    cardSectionAll[i].closest("a").classList.add("hasPromo");
                    cardSectionAll[i].innerHTML += `<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/great-american-boat-sale/6-26-update_gc-or-rebate/plp-bugs/great-american-boat-sale-${modelMatch[0].offer[2025]}.png" style="position: absolute !important; top: 54px !important; right: 3% !important; bottom: auto !important; left: auto !important; width:150px; max-width: 48% !important; z-index: 2 !important;">`;
                } else {
                    cardSectionAll[i].closest("a").classList.add("hasPromo");
                    cardSectionAll[i].innerHTML += `<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/great-american-boat-sale/6-26-update_gc-or-rebate/plp-bugs/great-american-boat-sale-${modelMatch[0].offer[2025]}.png" style="top: 0px !important; position: relative !important; width: 136px !important; right: auto !important; bottom: auto !important; left: 0 !important; z-index: 2 !important;">`;
                }
            } else if (modelMatch.length > 0 && modelMatch[0].offer[2024] !== 0 && !title.includes("2025") && !title.includes("2026")) {
                if (window.innerWidth >= 640) {
                    cardSectionAll[i].closest("a").classList.add("hasPromo");
                    cardSectionAll[i].innerHTML += `<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/great-american-boat-sale/6-26-update_gc-or-rebate/plp-bugs/great-american-boat-sale-${modelMatch[0].offer[2024]}.png" style="position: absolute !important; top: 54px !important; right: 3% !important; bottom: auto !important; left: auto !important; width:150px; max-width: 48% !important;">`;
                } else {
                    cardSectionAll[i].closest("a").classList.add("hasPromo");
                    cardSectionAll[i].innerHTML += `<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/great-american-boat-sale/6-26-update_gc-or-rebate/plp-bugs/great-american-boat-sale-${modelMatch[0].offer[2024]}.png" style="top: 0px !important; position: relative !important; width: 136px !important; right: auto !important; bottom: auto !important; left: 0 !important;">`;
                }
            }
        }
    }
}
