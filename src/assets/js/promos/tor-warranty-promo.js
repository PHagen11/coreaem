function torWarrantyPromo() {
    let cardSectionAll = document.querySelectorAll(".card-section");
    let cardDivider = document.querySelectorAll(".card-divider");
    let conditionAll = document.querySelectorAll(".condition");
    let mnameAll = document.querySelectorAll(".mname");

    const promoModels = [
        { title: "Tracker Off Road OX400", offer: "500" },
        { title: "Tracker Off Road Ox EV", offer: "500" },
        { title: "Tracker Off Road 600", offer: "750" },
        { title: "Tracker Off Road 600 EPS", offer: "750" },
        { title: "Tracker Off Road 600 EPS LE", offer: "750" },
        { title: "Tracker Off Road 800SX" , offer: "1000" },
        { title: "Tracker Off Road 800SX LE", offer: "1000" },
        { title: "Tracker Off Road 800SX Crew", offer: "1000" },
        { title: "Tracker Off Road 800SX LE CREW", offer: "1000" },
    ];

    for (let i = 0; i <= cardSectionAll.length - 1; i++) {
        let currentTitle = mnameAll[i].innerHTML.trim();
        let condition = conditionAll[i].innerHTML.toLowerCase().trim();
        cardSectionAll[i].style.position = "relative";

        if (condition.includes("new")) {
            for (let model of promoModels) {
                if (currentTitle.slice(5) === model.title && currentTitle.slice(0, 4) !== "2025" && currentTitle.slice(0, 4) !== "2026") {
                    if (cardDivider?.length > 0) {
                        cardDivider[i].style.justifyContent = 'space-between'
                        cardDivider[i].innerHTML += `<div class="badge radius promo-badge">Clearance</div>`;
                    }
                    if (window.innerWidth >= 701) {
                        cardSectionAll[i].closest("a").classList.add("hasPromo");
                        cardSectionAll[i].innerHTML += `<img class="promo-gift-card-lg" src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2026/tor-gift-card/2025-GiftCard-Bug-WPurchase-White-GiftCard-Bug-${model.offer}.png" alt="${model.offer} gift card offer" style="top: 60px !important; position: absolute !important; width: 120px !important; right: 5% !important; bottom: auto !important; left: auto !important;">`;
                        break;
                    } else if (window.innerWidth < 701) {
                        cardSectionAll[i].closest("a").classList.add("hasPromo");
                        cardSectionAll[i].innerHTML += `<img class="promo-gift-card-sm" src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2026/tor-gift-card/2025-GiftCard-Bug-WPurchase-White-GiftCard-Bug-${model.offer}.png" alt="${model.offer} gift card offer" style="top: 6px !important; position: relative !important; width: 100px !important; right: auto !important; bottom: auto !important; left: 0 !important; z-index: 2 !important;">`;
                        break;
                    }
                    
                }
            }
        }
    }
}
