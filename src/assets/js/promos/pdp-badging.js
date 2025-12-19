/* CUSTOM CODE */
let fiveHundRebate = ["2024 Tracker Bass Tracker Classic XL"];
let oneThousTwoFiftyRebate = ["2024 Ranger VS1682SC Angler", "2024 Ranger VS1882SC Reata"];
let oneThousRebate = ["2024 Sun Tracker Bass Buggy 18 DLX", "2024 Sun Tracker Party Barge 18 DLX", "2024 Ranger VS1665T", "2024 Ranger VS1665SC", "2024 Triton 18 TrX", "2024 Triton 19 TrX", "2024 Triton 19 TrX Patriot"];
let oneThousFiveHundRebate = ["2024 Ranger VS1782SC Angler", "2024 Ranger VS1782SC Reata", "2024 Ranger Reata 200F", "2024 Ranger Reata 200C", "2024 Ranger Reata 220C", "2024 Ranger Reata 223C", "2024 Ranger Reata 243C", "2024 Ranger 2500LS"];
let twoThousRebate = ["2024 Ranger VS1882SC Angler", "2024 Ranger VS1882SC Reata", "2024 Ranger RB190", "2024 Ranger Reata 220F", "2024 Ranger Reata 220FC"];
let twoThousFiveHundRebate = ["2024 Tahoe T16", "2024 Ranger RT178", "2024 Ranger RT178C", "2024 Ranger RT188", "2024 Ranger RT188C", "2024 Ranger RT188P", "2024 Ranger RT198P", "2024 Ranger VX1788 WT", "2024 Ranger VX1888 WT", "2024 Ranger RB200", "2024 Ranger Reata 223F", "2024 Ranger Reata 223FC"];
let threeThousRebate = ["2024 Tahoe T18", "2024 Tahoe 200 S", "2024 Tahoe 210 S", "2024 Tahoe 210 S Limited", "2024 Tahoe 1950", "2024 Tahoe 2150", "2024 Tahoe 2150 CC"];
let threeThousFiveHundRebate = ["2024 Ranger Z518", "2024 Ranger Z518 Ranger Cup Equipped"];
let fourThousRebate = ["2024 Ranger 1850MS", "2024 Ranger 1880MS", "2024 Triton 20 TRX", "2024 Triton 20 TrX Patriot", "2024 Triton 21 TrX", "2024 Triton 21 TrX Patriot", "2024 Triton 21 XrT", "2024 Triton 206 Fishunter", "2024 Triton 186 Fishunter"];
let fourThousFiveHundRebate = ["2024 Ranger 2050MS", "2024 Ranger 212LS"];
let fiveThousRebate = ["2024 Sun Tracker Sportfish 24 XP3", "2024 Regency 230 DL3", "2024 Regency 230 LE3", "2024 Regency 230 LE3 Sport", "2024 Regency 250 DL3", "2024 Regency 250 LE3", "2024 Regency 250 LE3 Sport", "2024 Ranger Z519", "2024 Ranger Z519 Ranger Cup Equipped", "2024 Ranger Z520R", "2024 Ranger Z520R Ranger Cup Equipped", "2024 Ranger Z521R", "2024 Ranger Z521R Ranger Cup Equipped", "2024 Ranger 620FS Ranger Cup Equipped", "2024 Ranger 621FS Ranger Cup Equipped", "2024 Ranger 620FS Pro", "2024 Ranger 621FS Pro", "2024 Ranger 622FS Pro", "2024 Ranger 2080MS"];

let mname = document.querySelector(".mname");
let boatLocation = mname.querySelector("a").innerHTML.trim();
var title = mname.querySelector("h1").innerHTML;
console.log(title)
let boatCondition = mname.dataset.condition;
let priceBlock = document.querySelector(".price-block.show-for-large");
let secondaryButton = priceBlock.querySelector(".secondary");
if (boatCondition.includes("New") &&
    boatLocation.slice(-2) != "AB" &&
    boatLocation.slice(-2) != "BC" &&
    boatLocation.slice(-2) != "NB" &&
    boatLocation.slice(-2) != "ON") {

    // check for $500 gift card offer
    fiveHundRebate.find((model) => {
        if (title == model) {
            let image = document.createElement("img");
            secondaryButton.after(image);
            image.classList = "rebate-offer";
            let rebateOffer = document.querySelector(".rebate-offer");
            rebateOffer.src = "https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/great-american-boat-sale/GABS_0500.png";
            rebateOffer.style.marginTop = "10px";
            rebateOffer.style.marginBottom = "20px";
            rebateOffer.style.width = "100%";
        }
    });

    // check for $1000 gift card offer
    oneThousRebate.find((model) => {
        if (title == model) {
            let image = document.createElement("img");
            secondaryButton.after(image);
            image.classList = "rebate-offer";
            let rebateOffer = document.querySelector(".rebate-offer");
            rebateOffer.src = "https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/great-american-boat-sale/GABS_1000.png";
            rebateOffer.style.marginTop = "10px";
            rebateOffer.style.marginBottom = "20px";
            rebateOffer.style.width = "100%";
        }
    });

    // check for $1250 gift card offer
    oneThousTwoFiftyRebate.find((model) => {
        if (title == model) {
            let image = document.createElement("img");
            secondaryButton.after(image);
            image.classList = "rebate-offer";
            let rebateOffer = document.querySelector(".rebate-offer");
            rebateOffer.src = "https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/great-american-boat-sale/GABS_1250.png";
            rebateOffer.style.marginTop = "10px";
            rebateOffer.style.marginBottom = "20px";
            rebateOffer.style.width = "100%";
        }
    });

    // check for $1500 gift card offer
    oneThousFiveHundRebate.find((model) => {
        if (title == model) {
            let image = document.createElement("img");
            secondaryButton.after(image);
            image.classList = "rebate-offer";
            let rebateOffer = document.querySelector(".rebate-offer");
            rebateOffer.src = "https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/great-american-boat-sale/GABS_1500.png";
            rebateOffer.style.marginTop = "10px";
            rebateOffer.style.marginBottom = "20px";
            rebateOffer.style.width = "100%";
        }
    });

    // check for $2000 gift card offer
    twoThousRebate.find((model) => {
        if (title == model) {
            let image = document.createElement("img");
            secondaryButton.after(image);
            image.classList = "rebate-offer";
            let rebateOffer = document.querySelector(".rebate-offer");
            rebateOffer.src = "https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/great-american-boat-sale/GABS_2000.png";
            rebateOffer.style.marginTop = "10px";
            rebateOffer.style.marginBottom = "20px";
            rebateOffer.style.width = "100%";
        }
    });

    // check for $2500 gift card offer
    twoThousFiveHundRebate.find((model) => {
        if (title == model) {
            let image = document.createElement("img");
            secondaryButton.after(image);
            image.classList = "rebate-offer";
            let rebateOffer = document.querySelector(".rebate-offer");
            rebateOffer.src = "https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/great-american-boat-sale/GABS_2500.png";
            rebateOffer.style.marginTop = "10px";
            rebateOffer.style.marginBottom = "20px";
            rebateOffer.style.width = "100%";
        }
    });

    // check for $3000 gift card offer
    threeThousRebate.find((model) => {
        if (title == model) {
            let image = document.createElement("img");
            secondaryButton.after(image);
            image.classList = "rebate-offer";
            let rebateOffer = document.querySelector(".rebate-offer");
            rebateOffer.src = "https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/great-american-boat-sale/GABS_3000.png";
            rebateOffer.style.marginTop = "10px";
            rebateOffer.style.marginBottom = "20px";
            rebateOffer.style.width = "100%";
        }
    });

    // check for $3500 gift card offer
    threeThousFiveHundRebate.find((model) => {
        if (title == model) {
            let image = document.createElement("img");
            secondaryButton.after(image);
            image.classList = "rebate-offer";
            let rebateOffer = document.querySelector(".rebate-offer");
            rebateOffer.src = "https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/great-american-boat-sale/GABS_3500.png";
            rebateOffer.style.marginTop = "10px";
            rebateOffer.style.marginBottom = "20px";
            rebateOffer.style.width = "100%";
        }
    });

    // check for $4000 gift card offer
    fourThousRebate.find((model) => {
        if (title == model) {
            let image = document.createElement("img");
            secondaryButton.after(image);
            image.classList = "rebate-offer";
            let rebateOffer = document.querySelector(".rebate-offer");
            rebateOffer.src = "https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/great-american-boat-sale/GABS_4000.png";
            rebateOffer.style.marginTop = "10px";
            rebateOffer.style.marginBottom = "20px";
            rebateOffer.style.width = "100%";
        }
    });

    // check for $4500 gift card offer
    fourThousFiveHundRebate.find((model) => {
        if (title == model) {
            let image = document.createElement("img");
            secondaryButton.after(image);
            image.classList = "rebate-offer";
            let rebateOffer = document.querySelector(".rebate-offer");
            rebateOffer.src = "https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/great-american-boat-sale/GABS_4500.png";
            rebateOffer.style.marginTop = "10px";
            rebateOffer.style.marginBottom = "20px";
            rebateOffer.style.width = "100%";
        }
    });

    // check for $5000 gift card offer
    fiveThousRebate.find((model) => {
        if (title == model) {
            let image = document.createElement("img");
            secondaryButton.after(image);
            image.classList = "rebate-offer";
            let rebateOffer = document.querySelector(".rebate-offer");
            rebateOffer.src = "https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/great-american-boat-sale/GABS_5000.png";
            rebateOffer.style.marginTop = "10px";
            rebateOffer.style.marginBottom = "20px";
            rebateOffer.style.width = "100%";
        }
    });
}
