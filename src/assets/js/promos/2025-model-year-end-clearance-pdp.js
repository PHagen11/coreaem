function twentyFiveMyecPDP() {
    // Select all product cards and their condition elements
    const modelTitle = document.querySelector(".model-title h1")
    const titleOnly = modelTitle.innerText.slice(5)
    const promoModels = [
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
    ];
    const modelMatch = promoModels.find(promoModel => promoModel.model === titleOnly)
    const promoBannerExists = document.querySelector(".promo-banner")
    const isRebatePromo = modelTitle.innerText.match(/Ranger/) || modelTitle.innerText.match(/Triton/) ? "-rebate" : ""
    const dataCondition = document.querySelector("[data-condition]")
    const condition = dataCondition.attributes["data-condition"].value.toLowerCase()

    if (!modelTitle.innerText.match(/2026/) && !promoBannerExists && condition.includes("new")) {
        const priceBlocks = document.querySelectorAll(".price-block")
        priceBlocks.forEach(priceBlock => {
            priceBlock.innerHTML += '<div class="clearance"><div class="badge promo-badge">Clearance</div></div>'
            if (modelMatch) {
                const image = document.createElement("img")
                image.src = `https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2025-myec/myec-pdp${isRebatePromo}-${modelMatch.offer}.png`
                image.className = "promo-banner"
                image.style = "margin-bottom: 20px"
                priceBlock.querySelector("hr")?.after(image)
            }
        })
    }
}
