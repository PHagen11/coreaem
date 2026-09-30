function twentySixGabsPDP() {
    // Select all product cards and their condition elements
    const modelTitle = document.querySelector(".model-title h1")
    const titleOnly = modelTitle.innerText.slice(5)
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
    const modelMatch = promoModels.find(promoModel => promoModel.model === titleOnly)
    const promoBannerExists = document.querySelector(".promo-banner")
    // const isRebatePromo = modelTitle.innerText.match(/Ranger/) || modelTitle.innerText.match(/Triton/) ? "-rebate" : ""
    const dataCondition = document.querySelector("[data-condition]")
    const condition = dataCondition.attributes["data-condition"].value.toLowerCase()

    if (!promoBannerExists && condition.includes("new")) {
        const priceBlocks = document.querySelectorAll(".price-block")
        priceBlocks.forEach(priceBlock => {
            // priceBlock.innerHTML += '<div class="clearance"><div class="badge promo-badge">Clearance</div></div>'
            if (modelMatch) {
                const image = document.createElement("img")
                image.src = `https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2026/great-american-boat-sale/${modelMatch?.offer}.png`
                image.className = "promo-banner"
                image.style = "margin: 0 auto 20px; width: 100%; max-width: 250px; display: block;"
                priceBlock.querySelector("hr")?.after(image)
            }
        })
    }
}
