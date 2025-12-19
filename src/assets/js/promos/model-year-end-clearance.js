function plpPromo() {
    let cardSectionAll = document.querySelectorAll(".card-section");
    let conditionAll = document.querySelectorAll(".condition");
    let offRoadModels = ["Tracker Off Road 450", "Tracker Off Road 450 Camo", "Tracker Off Road 600", "Tracker Off Road 600 EPS CAMO", "Tracker Off Road 600 LE", "Tracker Off Road 600 EPS", "Tracker Off Road 600 EPS CAMO", "Tracker Off Road OX400", "Tracker Off Road OX400 CAMO", "Tracker Off Road Ox EV", "Tracker Off Road 800SX", "Tracker Off Road 800SX LE", "Tracker Off Road 800SX LE CAMO", "Tracker Off Road 800SX Crew", "Tracker Off Road 800SX CREW CAMO", "Tracker Off Road 800SX LE CREW"];
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
        {offer: '1000', model: "Ranger Z518"},
        {offer: '1000', model: "Ranger Z518 Cup-Equipped"},
        {offer: '2500', model: "Ranger Z519"},
        {offer: '2500', model: "Ranger Z519 Cup-Equipped"},
        {offer: '2500', model: "Ranger Z519R"},
        {offer: '2500', model: "Ranger Z519R Cup-Equipped"},
        {offer: '5000', model: "Ranger Z520R"},
        {offer: '5000', model: "Ranger Z520R Cup-Equipped"},
        {offer: '5000', model: "Ranger Z521R"},
        {offer: '5000', model: "Ranger Z521R Cup-Equipped"},
        {offer: '2500', model: "Ranger 1850MS"},
        {offer: '2500', model: "Ranger 2050MS"},
        {offer: '2500', model: "Ranger 1880MS"},
        {offer: '2500', model: "Ranger 2080MS"},
        {offer: '3500', model: "Ranger 620FS Cup Equipped"},
        {offer: '3500', model: "Ranger 621FS Cup Equipped"},
        {offer: '5000', model: "Ranger 620FS Pro"},
        {offer: '5000', model: "Ranger 621FS Pro"},
        {offer: '5000', model: "Ranger 622FS Pro"},
        {offer: '1500', model: "Ranger RB210"},
        {offer: '5000', model: "Ranger 2360 Bay"},
        {offer: '5000', model: "Ranger 2510 Bay"},
        {offer: '5000', model: "Ranger 2600 Bay"},
        {offer: '5000', model: "Ranger 2660 Bay"},
        {offer: '750', model: "Ranger 200C"},
        {offer: '1000', model: "Ranger Reata 220FC"},
        {offer: '1000', model: "Ranger Reata 220C"},
        {offer: '1000', model: "Ranger Reata 223C"},
        {offer: '1500', model: "Ranger Reata 243C"},
        {offer: '3500', model: "Triton 20 XP"},
        {offer: '3500', model: "Triton 20 XP Patriot"},
        {offer: '3500', model: "Triton 21 XP"},
        {offer: '3500', model: "Triton 21 XP Patriot"},
        {offer: '2500', model: "Triton 206 Fishunter"},
        {offer: '2500', model: "Triton 206 Allure"},
        {offer: '1000', model: "Triton 186 Allure"},
    ];

    for (let i = 0; i <= cardSectionAll.length - 1; i++) {
        let currentTitle = cardSectionAll[i].querySelector(".mname").innerHTML.trim();
        let condition = conditionAll[i].innerHTML.toLowerCase();
        cardSectionAll[i].style.position = "relative";

        let modelMatch = promoModels.find(promoModel => promoModel.model === currentTitle.slice(5));

        if (condition.includes("new")) {
            if (!currentTitle.includes("2025") && !currentTitle.includes("2026") && !currentTitle.includes("Ascend") && !currentTitle.includes("Tracker Off Road") && !modelMatch) {
                if (window.innerWidth >= 640) {
                    cardSectionAll[i].closest("a").classList.add("hasPromo");
                    cardSectionAll[i].innerHTML += '<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2024-model-year-end-clearance/2024-model-year-end-clearance.png" style="position: absolute !important; top: 75px !important; right: 3% !important; bottom: auto !important; left: auto !important; width: 120px !important;">';
                } else {
                    cardSectionAll[i].closest("a").classList.add("hasPromo");
                    cardSectionAll[i].innerHTML += '<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2024-model-year-end-clearance/2024-model-year-end-clearance.png" style="top: 10px !important; position: relative !important; width: 120px !important; right: auto !important; bottom: auto !important; left: 0 !important;">';
                }
            }
            
            if (currentTitle.includes("2024 Tracker Off Road")) {
                for (let model of offRoadModels) {
                    if (currentTitle.includes(model)) {
                        if (window.innerWidth >= 640) {
                            cardSectionAll[i].closest("a").classList.add("hasPromo");
                            cardSectionAll[i].innerHTML += '<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2024-model-year-end-clearance/2024-model-year-end-clearance.png" style="position: absolute !important; top: 75px !important; right: 7% !important; bottom: auto !important; left: auto !important; width: 120px !important;">';
                        } else {
                            cardSectionAll[i].closest("a").classList.add("hasPromo");
                            cardSectionAll[i].innerHTML += '<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2024-model-year-end-clearance/2024-model-year-end-clearance.png" style="top: 10px !important; position: relative !important; width: 120px !important; right: auto !important; bottom: auto !important; left: 0 !important;">';
                        }
                    }
                }
            } else if (currentTitle.includes("2023 Tracker Off Road") || currentTitle.includes("2022 Tracker Off Road") || currentTitle.includes("2021 Tracker Off Road") || currentTitle.includes("2020 Tracker Off Road")) {
                if (window.innerWidth >= 640) {
                    cardSectionAll[i].closest("a").classList.add("hasPromo");
                    cardSectionAll[i].innerHTML += '<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2024-model-year-end-clearance/2024-model-year-end-clearance.png" style="position: absolute !important; top: 75px !important; right: 7% !important; bottom: auto !important; left: auto !important; width: 120px !important;">';
                } else {
                    cardSectionAll[i].closest("a").classList.add("hasPromo");
                    cardSectionAll[i].innerHTML += '<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2024-model-year-end-clearance/2024-model-year-end-clearance.png" style="top: 10px !important; position: relative !important; width: 120px !important; right: auto !important; bottom: auto !important; left: 0 !important;">';
                }
            }
        }
    }
}
