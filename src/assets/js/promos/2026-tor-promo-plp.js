function torPromo() {
    const promoModels = [
        { title: "Tracker Off Road Ox EV", offer: "1000", caOffer: "" },
        { title: "Tracker Off Road OX400", offer: "1000", caOffer: "1400" },
        { title: "Tracker Off Road OX400 CAMO", offer: "1000", caOffer: "1400"  },
        { title: "Tracker Off Road 600", offer: "1500", caOffer: "2100" },
        { title: "Tracker Off Road 600 EPS", offer: "1500", caOffer: "2100" },
        { title: "Tracker Off Road 600 EPS CAMO", offer: "1500", caOffer: "2100" },
        { title: "Tracker Off Road 600 EPS LE", offer: "1500", caOffer: "2100" },
        { title: "Tracker Off Road 800SX", offer: "2000", caOffer: "2800" },
        { title: "Tracker Off Road 800SX LE", offer: "2000", caOffer: "2800" },
        { title: "Tracker Off Road 800SX LE CAMO", offer: "2000", caOffer: "2800" },
        { title: "Tracker Off Road 800SX Crew", offer: "2000", caOffer: "2800" },
        { title: "Tracker Off Road 800SX LE CREW", offer: "2000", caOffer: "2800" },
        { title: "Tracker Off Road 800SX LE CREW CAMO", offer: "2000", caOffer: "2800" },
    ];
    const promoYears = ["2023", "2024", "2025"];
    const caProvinces = ["ab", "bc", "mb", "nb", "nl", "ns", "on", "pe", "qc", "sk"];
    const inventoryCards = document.querySelectorAll(".inventory-card");

    inventoryCards.forEach((card) => {
        if (card.querySelector(".condition").innerHTML.trim().toLowerCase() === "new" && card.dataset.hasPromo !== "true") {
            let cardTitle = card.querySelector(".mname").innerHTML.trim().toLowerCase();
            let model = promoModels.find(model => model.title.toLowerCase() === cardTitle.slice(5)) ?? undefined;
            if (model && promoYears.includes(cardTitle.slice(0, 4))) {
                const location = card.querySelector(".locname").innerHTML.trim().toLowerCase();
                const cardSection = card.querySelector(".card-section");
                cardSection.style.position = "relative";
                const modelOffer = caProvinces.includes(location.slice(-2)) ? model.caOffer : model.offer;
                const promoImage = document.createElement("img");
                promoImage.src = `https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2026/tor-gift-card/${modelOffer}.jpg`;
                promoImage.alt = `$${modelOffer} gift card offer`;
                if (window.innerWidth >= 701) {
                    Object.assign(promoImage.style, {
                        position: "absolute",
                        top: "60px",
                        right: "5%",
                        width: "100px",
                    })
                } else {
                    Object.assign(promoImage.style, {
                        position: "relative",
                        top: "6px",
                        left: "0",
                        width: "100px",
                    })
                }
                cardSection.appendChild(promoImage);
                const cardDivider = card.querySelector(".card-divider");
                if (cardDivider && cardDivider.style.justifyContent !== "space-between") {
                    cardDivider.style.display = "flex";
                    cardDivider.style.justifyContent = "space-between";
                    const clearanceBadge = document.createElement("div");
                    clearanceBadge.classList.add("badge", "radius", "promo-badge");
                    clearanceBadge.style.fontSize = ".75rem";
                    clearanceBadge.style.color = "#fff";
                    clearanceBadge.textContent = "Clearance";
                    cardDivider.appendChild(clearanceBadge);
                }
                card.dataset.hasPromo = "true";
            }
        }
    })
}
