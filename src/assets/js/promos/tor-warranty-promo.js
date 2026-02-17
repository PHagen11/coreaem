function torWarrantyPromo() {
    let cardSectionAll = document.querySelectorAll(".card-section");
    let cardDivider = document.querySelectorAll(".card-divider")

    const promoModels = [
        "Tracker Off Road 600",
        "Tracker Off Road 600 EPS",
        "Tracker Off Road 600 EPS LE",
        "Tracker Off Road 800SX",
        "Tracker Off Road 800SX LE",
        "Tracker Off Road 800SX Crew",
        "Tracker Off Road 800SX LE CREW",
    ];

    for (let i = 0; i <= cardSectionAll.length - 1; i++) {
        let conditionAll = document.querySelectorAll(".condition");
        let mnameAll = document.querySelectorAll(".mname");
        let currentTitle = mnameAll[i].innerHTML.trim();
        let condition = conditionAll[i].innerHTML.toLowerCase().trim();
        cardSectionAll[i].style.position = "relative";
        const promoBug = currentTitle.includes("2025") ? "2"
        : (currentTitle.includes("2024") || currentTitle.includes("2023")) ? "3"
        : ""

        if (condition.includes("new") && promoBug !== "") {
            for (let model of promoModels) {
                if (currentTitle.slice(5) === model) {
                    if (cardDivider?.length > 0) {
                        cardDivider[i].style.justifyContent = 'space-between'
                        const clearanceBadge = `<div class="badge radius promo-badge">Clearance</div>`
                        cardDivider[i].insertAdjacentHTML('beforeEnd', clearanceBadge)
                    }
                    if (window.innerWidth >= 701) {
                        cardSectionAll[i].closest("a").classList.add("hasPromo");
                        cardSectionAll[i].innerHTML += `<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2026-tor-warranty/tor-price-sign-bugs-${promoBug}-year.png" alt="${promoBug} year warranty" style="top: 60px !important; position: absolute !important; width: 120px !important; right: 5% !important; bottom: auto !important; left: auto !important;">`;
                    } else {
                        cardSectionAll[i].closest("a").classList.add("hasPromo");
                        cardSectionAll[i].innerHTML += `<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2026-tor-warranty/tor-price-sign-bugs-${promoBug}-year.png" alt="${promoBug} year warranty" style="top: 6px !important; position: relative !important; width: 130px !important; right: auto !important; bottom: auto !important; left: 0 !important; z-index: 2 !important;">`;
                    }
                }
            }
        }
    }
}
