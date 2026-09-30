function twentySixMyecPDP() {
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
    const modelTitle = document.querySelector(".model-title");
    const titleOnly = modelTitle?.querySelector("h1").innerText;
    const modelMatch = promoModels?.find(promoModel => promoModel?.modelLower === titleOnly?.slice(5).toLowerCase());
    const condition = modelTitle?.attributes["data-condition"].value.toLowerCase();
    if (condition?.includes("new")) {
        const priceBlocks = document.querySelectorAll(".price-block");
        priceBlocks.forEach(priceBlock => {
            const clearance = priceBlock.querySelector(".saving-price")
            if (modelMatch && Number(titleOnly.slice(0, 4)) <= 2026 && priceBlock.dataset.hasPromo !== "true") {
                const image = document.createElement("img");
                image.src = `https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2026-model-year-end-clearance/${modelMatch?.offer}.png`;
                image.alt = `$${modelMatch?.offer} gift card offer`;
                Object.assign(image.style, {
                    margin: "0 auto 20px",
                    width: "100%",
                    maxWidth: "250px",
                    display: "block",
                });
                priceBlock.querySelector("hr")?.after(image);
                priceBlock.dataset.hasPromo = "true";
            }
            if (Number(titleOnly.slice(0, 4)) <= 2025 && priceBlock.dataset.hasClearance !== "true" && clearance) {
                const image = document.createElement("img");
                image.src = `https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2024-model-year-end-clearance/MYEC.jpg`;
                image.alt = `Model Year End Clearance`;
                Object.assign(image.style, {
                    margin: "0 auto 20px",
                    width: "100%",
                    maxWidth: "225px",
                    display: "block",
                });
                priceBlock.querySelector("hr")?.after(image);
                priceBlock.dataset.hasClearance = "true";
            } else if (Number(titleOnly.slice(0, 4)) === 2026 && priceBlock.dataset.hasClearance !== "true" && clearance) {
                const image = document.createElement("img");
                image.src = `https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2026-model-year-end-clearance/myec.png`;
                image.alt = `Model Year End Clearance`;
                Object.assign(image.style, {
                    margin: "0 auto 14px",
                    width: "100%",
                    maxWidth: "250px",
                    display: "block",
                });
                priceBlock.querySelector("hr")?.after(image);
                priceBlock.dataset.hasClearance = "true";
            }
        })
    }
}
