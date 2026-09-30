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
    const modelName = document.querySelector(".mname");

    if (modelName.dataset.condition.toLowerCase() === "new") {
        let model = promoModels.find((model) =>
                model.title.toLowerCase() === modelName.querySelector("h1").innerHTML.toLowerCase().slice(5)
            ) ?? undefined;
        if (model && promoYears.includes(modelName.querySelector("h1").innerHTML.slice(0, 4))) {
            const location = modelName.querySelector("a").innerHTML.trim().toLowerCase().slice(-2);
            const priceBlocks = document.querySelectorAll(".price-block");
            const modelOffer = caProvinces.includes(location.slice(-2)) ? model.caOffer : model.offer;
            priceBlocks.forEach((priceBlock) => {
                if (priceBlock) {
                    const giftCardImage = document.createElement("img");
                    giftCardImage.src = `https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2026/tor-gift-card/${modelOffer}.jpg`;
                    giftCardImage.alt = `$${modelOffer} gift card offer`;
                    if (window.innerWidth >= 701) {
                        Object.assign(giftCardImage.style, {
                            width: "100%",
                            maxWidth: "225px",
                            display: "block",
                            margin: "10px auto",
                            padding: "0 10px",
                        });
                    } else {
                        Object.assign(giftCardImage.style, {
                            width: "100%",
                            maxWidth: "200px",
                            display: "block",
                            margin: "10px auto",
                            padding: "0 10px",
                        });
                    }
                    priceBlock.querySelector("hr").after(giftCardImage);

                    if (model?.title !== "Tracker Off Road Ox EV" && model?.title !== "Tracker Off Road OX400") {
                        const warrantyImage = document.createElement("img");
                        const modelWarranty =
                            modelName.querySelector("h1").innerHTML.slice(0, 4) === "2025"
                            ? "2"
                            : "3";
                        warrantyImage.src = `https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2026-tor-warranty/tor-price-sign-bugs-${modelWarranty}-year.png`;
                        warrantyImage.alt = `${modelWarranty} year warranty`;
                        Object.assign(warrantyImage.style, {
                            width: "100%",
                            maxWidth: "200px",
                            display: "block",
                            margin: "10px auto",
                            padding: "0 10px",
                        });
                        priceBlock.querySelector("hr").after(warrantyImage);
                    }
                }
            });
        }
    }
}
