function twentySixMyecPLP() {
    const promoModels = [
        {offer: '750', model: "Sun Tracker Bass Buggy 16 XL Select"},
        {offer: '750', model: "Sun Tracker Party Barge 16 DLX"},
        {offer: '750', model: "Sun Tracker Bass Buggy 18 DLX"},
        {offer: '750', model: "Sun Tracker Party Barge 18 DLX"},
        {offer: '1000', model: "Sun Tracker Fishin' Barge 20 DLX"},
        {offer: '1000', model: "Sun Tracker SportFish 20 DLX"},
        {offer: '1000', model: "Sun Tracker Party Barge 20 DLX"},
        {offer: '1500', model: "Sun Tracker Fishin' Barge 22 DLX"},
        {offer: '1500', model: "Sun Tracker SportFish 22 DLX"},
        {offer: '1500', model: "Sun Tracker Party Barge 22 DLX"},
        {offer: '1500', model: "Sun Tracker Party Barge 22 RF DLX"},
        {offer: '1500', model: "Sun Tracker Fishin' Barge 22 XP3"},
        {offer: '1500', model: "Sun Tracker SportFish 22 XP3"},
        {offer: '1500', model: "Sun Tracker Party Barge 22 XP3"},
        {offer: '1500', model: "Sun Tracker Party Barge 22 RF XP3"},
        {offer: '1500', model: "Sun Tracker Sportfish 24 XP3"},
        {offer: '250', model: "Nitro Z18"},
        {offer: '250', model: "Nitro Z18 Pro"},
        {offer: '250', model: "Nitro Z19 XL"},
        {offer: '250', model: "Nitro Z19 XL Pro"},
        {offer: '250', model: "Nitro Z20 XL"},
        {offer: '250', model: "Nitro Z20 XL Pro"},
        {offer: '250', model: "Nitro Z21 XL"},
        {offer: '250', model: "Nitro Z21 XL Pro"},
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
    ].map(m => ({ ...m, modelLower: m.model.toLowerCase() }));
    // const isCanadaDealer = ["ab", "bc", "mb", "nb", "nl", "ns", "on", "pe", "qc", "sk"].includes(location.slice(-2))
    const inventoryCards = document.querySelectorAll(".inventory-card");
    inventoryCards.forEach(card => {
        if (card.querySelector(".condition").innerHTML.trim().toLowerCase() === "new" && card.dataset.hasPromo !== "true") {
            const cardLocation = card.querySelector(".locname").innerHTML.trim().toLowerCase();
            const cardTitle = card.querySelector(".mname").innerHTML.trim().toLowerCase();
            const modelMatch = promoModels.find(model => model.modelLower === cardTitle.slice(5)) ?? undefined;
            if (Number(cardTitle.slice(0, 4)) <= 2026) {
                if (modelMatch) {
                    const cardSection = card.querySelector(".card-section");
                    cardSection.style.position = "relative";
                    const promoImage = document.createElement("img");
                    promoImage.src = `https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2026-model-year-end-clearance/${modelMatch?.offer}.png`;
                    promoImage.alt = `$${modelMatch?.offer} gift card offer`;
                    if (window.innerWidth >= 701) {
                        Object.assign(promoImage.style, {
                            position: "absolute",
                            top: "54px",
                            right: "3%",
                            bottom: "auto",
                            left: "auto",
                            width: "115px",
                            maxWidth: "48%",
                            zIndex: "2",
                        })
                    } else {
                        Object.assign(promoImage.style, {
                            position: "relative",
                            top: "0px",
                            right: "auto",
                            bottom: "auto",
                            left: "0",
                            width: "110px",
                            zIndex: "2",
                            marginBottom: "-1rem",
                        })
                    }
                    card.dataset.hasPromo = "true";
                    cardSection.appendChild(promoImage);
                }

                const cardDivider = card.querySelector(".card-divider");
                if (cardDivider && cardDivider.style.justifyContent !== "space-between" && (!cardTitle.includes("2026 ranger z521r") || !cardLocation.includes("acworth"))) {
                // if (cardDivider && cardDivider.style.justifyContent !== "space-between") {
                    cardDivider.style.display = "flex";
                    cardDivider.style.justifyContent = "space-between";
                    const clearanceBadge = document.createElement("div");
                    clearanceBadge.classList.add("badge", "radius", "promo-badge");
                    clearanceBadge.style.fontSize = ".75rem";
                    clearanceBadge.style.color = "#fff";
                    clearanceBadge.textContent = "Clearance";
                    cardDivider.appendChild(clearanceBadge);
                }
            }
        }
    })
}
