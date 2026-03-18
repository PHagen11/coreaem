/* CUSTOM CODE */
function giftCardPromo() {
    let cardSectionAll = document.querySelectorAll(".card-section");
    let mname = document.querySelectorAll(".mname");
    let conditionAll = document.querySelectorAll(".condition");

    const twentySixPromoModels = [
        {offer: '250', title: "Tracker Bass Tracker Classic Limited"},
        {offer: '250', title: "Tracker Pro 170"},
        {offer: '500', title: "Tracker Pro Team 175"},
        {offer: '500', title: "Tracker Pro Team 175 Crappie Edition"},
        {offer: '500', title: "Tracker Pro Team 190"},
        {offer: '500', title: "Tracker Pro Team 195"},
        {offer: '1000', title: "Tracker Savage 215"},
        {offer: '500', title: "Tracker Pro Guide V-16 SC"},
        {offer: '500', title: "Tracker Pro Guide V-16 WT"},
        {offer: '500', title: "Tracker Pro Guide V-175 Combo"},
        {offer: '500', title: "Nitro Z17"},
        {offer: '500', title: "Nitro Z18"},
        {offer: '500', title: "Nitro Z18 Pro"},
        {offer: '750', title: "Nitro Z19 XL"},
        {offer: '750', title: "Nitro Z19 XL Pro"},
        {offer: '2000', title: "Nitro Z20 XL"},
        {offer: '2000', title: "Nitro Z20 XL Pro"},
        {offer: '2000', title: "Nitro Z21 XL"},
        {offer: '2000', title: "Nitro Z21 XL Pro"},
        {offer: '750', title: "Nitro ZV19"},
        {offer: '750', title: "Nitro ZV19 Pro"},
        {offer: '750', title: "Nitro ZV19 Sport"},
        {offer: '1000', title: "Nitro ZV20 Sport"},
        {offer: '1000', title: "Nitro ZV20 Sport Pro"},
        {offer: '1000', title: "Nitro ZV21"},
        {offer: '1000', title: "Nitro ZV21 Pro"},
        {offer: '500', title: "Sun Tracker Bass Buggy 16 XL Select"},
        {offer: '500', title: "Sun Tracker Bass Buggy 18 DLX"},
        {offer: '500', title: "Sun Tracker Party Barge 16 DLX"},
        {offer: '500', title: "Sun Tracker Party Barge 18 DLX"},
        {offer: '750', title: "Sun Tracker Fishin' Barge 20 DLX"},
        {offer: '750', title: "Sun Tracker SportFish 20 DLX"},
        {offer: '750', title: "Sun Tracker Party Barge 20 DLX"},
        {offer: '1000', title: "Sun Tracker Fishin' Barge 22 DLX"},
        {offer: '1000', title: "Sun Tracker Party Barge 22 DLX"},
        {offer: '1000', title: "Sun Tracker Party Barge 22 RF DLX"},
        {offer: '1000', title: "Sun Tracker SportFish 22 DLX"},
        {offer: '1000', title: "Sun Tracker SportFish 22 XP3"},
        {offer: '1000', title: "Sun Tracker Fishin' Barge 22 XP3"},
        {offer: '1000', title: "Sun Tracker Party Barge 22 XP3"},
        {offer: '1000', title: "Sun Tracker Party Barge 22 RF XP3"},
        {offer: '1000', title: "Sun Tracker Party Barge 24 XP3"},
        {offer: '1000', title: "Sun Tracker Sportfish 24 XP3"},
        {offer: '500', title: "Tahoe T16"},
        {offer: '500', title: "Tahoe T18"},
        {offer: '500', title: "Tahoe T21"},
        {offer: '250', title: "Mako Pro Skiff 17 CC"},
        {offer: '1000', title: "Mako 214 Center Console"},
        {offer: '1000', title: "Mako 24 APEX"},
        {offer: '500', title: "Ranger RT178"},
        {offer: '750', title: "Ranger RT188"},
        {offer: '1000', title: "Ranger RT188P"},
        {offer: '1000', title: "Ranger RT198P"},
        {offer: '2500', title: "Ranger ALPHA 208"},
        {offer: '500', title: "Ranger VS1665SC"},
        {offer: '750', title: "Ranger VS1682SC Angler"},
        {offer: '750', title: "Ranger VS1682SC Reata"},
        {offer: '1000', title: "Ranger VS1782SC Angler"},
        {offer: '1000', title: "Ranger VS1782SC Reata"},
        {offer: '1000', title: "Ranger VS1882SC Angler"},
        {offer: '1000', title: "Ranger VS1882SC Reata"},
        {offer: '1000', title: "Ranger VX1788 WT"},
        {offer: '1000', title: "Ranger VX1888 WT"},
        {offer: '1000', title: "Ranger VX1988 WT"},
        {offer: '1000', title: "Ranger RB190"},
        {offer: '1000', title: "Ranger RB200"},
        {offer: '1000', title: "Ranger RB210"},
        {offer: '1000', title: "Ranger Z185"},
        {offer: '1000', title: "Ranger Z518"},
        {offer: '1000', title: "Ranger Z518 Cup-Equipped"},
        {offer: '2500', title: "Ranger Z519R"},
        {offer: '2500', title: "Ranger Z519R Cup-Equipped"},
        {offer: '2500', title: "Ranger Z520"},
        {offer: '2500', title: "Ranger Z520R"},
        {offer: '2500', title: "Ranger Z520R Cup-Equipped"},
        {offer: '2500', title: "Ranger Z521"},
        {offer: '2500', title: "Ranger Z521R"},
        {offer: '2500', title: "Ranger Z521R Cup-Equipped"},
        {offer: '1000', title: "Ranger 1880MS"},
        {offer: '2000', title: "Ranger 2080MS"},
        {offer: '1000', title: "Ranger 212LS"},
        {offer: '2000', title: "Ranger 620FS Cup-Equipped"},
        {offer: '2000', title: "Ranger 621FS Cup-Equipped"},
        {offer: '2000', title: "Ranger 620FS Pro"},
        {offer: '2000', title: "Ranger 621FS Pro"},
        {offer: '3000', title: "Ranger 622FS Pro"},
        {offer: '2500', title: "Ranger 2360 Bay"},
        {offer: '3000', title: "Ranger 2510 Bay"},
        {offer: '3000', title: "Ranger 2600 Bay"},
        {offer: '3000', title: "Ranger 2660 Bay"},
        {offer: '1000', title: "Triton 20XP"},
        {offer: '1000', title: "Triton 20XP Patriot"},
        {offer: '1000', title: "Triton 21XP"},
        {offer: '1000', title: "Triton 21XP Patriot"},
    ];

    const twentyFivePromoModels = [
        {offer: '500', title: "Ranger Reata 200C"},
        {offer: '500', title: "Ranger Reata 200F"},
        {offer: '750', title: "Ranger Reata 220C"},
        {offer: '750', title: "Ranger Reata 223C"},
        {offer: '500', title: "Regency 230 DL3"},
        {offer: '500', title: "Regency 250 DL3"},
        {offer: '750', title: "Regency 230 LE3"},
        {offer: '750', title: "Regency 250 LE3"},
    ];

    for (let i = 0; i <= cardSectionAll.length - 1; i++) {
        let currentTitle = mname[i].innerHTML.trim();
        let boatCondition = conditionAll[i].innerHTML.toLowerCase().trim();
        cardSectionAll[i].style.position = "relative";
        if (boatCondition.includes("new")) {
            for (let model of twentySixPromoModels) {
                if (currentTitle.slice(5) === model.title && (currentTitle.includes("2025") || currentTitle.includes("2024") || currentTitle.includes("2026"))) {
                    if (window.innerWidth >= 701) {
                        cardSectionAll[i].closest("a").classList.add("hasPromo");
                        cardSectionAll[i].innerHTML += `<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2026/the-big-bass-boat-sale/gift-cards/GiftCard_${model.offer}_Q1.png" alt="$${model.offer} gift card offer" style="top: 54px !important; position: absolute !important; width: 120px !important; right: 8% !important; bottom: auto !important; left: auto !important;">`;
                    } else {
                        cardSectionAll[i].closest("a").classList.add("hasPromo");
                        cardSectionAll[i].innerHTML += `<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2026/the-big-bass-boat-sale/gift-cards/GiftCard_${model.offer}_Q1.png" alt="$${model.offer} gift card offer" style="top: 0px !important; position: relative !important; width: 130px !important; right: auto !important; bottom: auto !important; left: 0 !important; z-index: 2 !important;">`;
                    }
                }
            }
            for (let model of twentyFivePromoModels) {
                if (currentTitle.slice(5) === model.title && !currentTitle.includes("2026")) {
                    if (window.innerWidth >= 701) {
                        cardSectionAll[i].closest("a").classList.add("hasPromo");
                        cardSectionAll[i].innerHTML += `<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2026/the-big-bass-boat-sale/gift-cards/GiftCard_${model.offer}_Q1.png" alt="$${model.offer} gift card offer" style="top: 54px !important; position: absolute !important; width: 120px !important; right: 8% !important; bottom: auto !important; left: auto !important;">`;
                    } else {
                        cardSectionAll[i].closest("a").classList.add("hasPromo");
                        cardSectionAll[i].innerHTML += `<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2026/the-big-bass-boat-sale/gift-cards/GiftCard_${model.offer}_Q1.png" alt="$${model.offer} gift card offer" style="top: 0px !important; position: relative !important; width: 130px !important; right: auto !important; bottom: auto !important; left: 0 !important; z-index: 2 !important;">`;
                    }
                }
            }
        }
    }
}
