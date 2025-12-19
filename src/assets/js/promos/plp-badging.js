/* CUSTOM CODE */
let cardSectionAll = document.querySelectorAll(".card-section");
let mname = document.querySelectorAll(".mname");
let conditionAll = document.querySelectorAll(".condition");
let twentyThreeClearance = ["2023 Tracker Bass Tracker Classic XL", "2023 Nitro ZV19", "2023 Nitro ZV19 Pro", "2023 Sun Tracker Bass Buggy 18 DLX", "2023 Sun Tracker Party Barge 18 DLX",  "2023 Sun Tracker Fishin' Barge 22 XP3", "2023 Sun Tracker Party Barge 22 XP3", "2023 Sun Tracker Party Barge 22 RF XP3", "2023 Sun Tracker SportFish 22 DLX", "2023 Sun Tracker Sportfish 24 XP3", "2023 Regency 230 DL3", "2023 Regency 230 LE3", "2023 Regency 230 LE3 Sport", "2023 Regency 250 DL3", "2023 Regency 250 LE3", "2023 Regency 250 LE3 Sport", "2023 Tahoe T16", "2023 Tahoe T18", "2023 Tahoe 200 S", "2023 Tahoe 210 S", "2023 Tahoe 210 S Limited", "2023 Tahoe 1950", "2023 Tahoe 2150", "2023 Tahoe 2150 CC", "2023 Ranger Z518", "2023 Ranger Z518 Ranger Cup Equipped", "2023 Ranger Z519", "2023 Ranger Z519 Ranger Cup Equipped", "2023 Ranger Z520R", "2023 Ranger Z520R Ranger Cup Equipped", "2023 Ranger Z521R", "2023 Ranger Z521R Ranger Cup Equipped", "2023 Ranger 620FS Ranger Cup Equipped", "2023 Ranger 621FS Ranger Cup Equipped", "2023 Ranger 620FS Pro", "2023 Ranger 621FS Pro", "2023 Ranger 622FS Pro", "2023 Ranger 1850MS", "2023 Ranger 2050MS", "2023 Ranger 1880MS", "2023 Ranger 2080MS", "2023 Ranger 212LS", "2023 Ranger RT178", "2023 Ranger RT178C", "2023 Ranger RT188", "2023 Ranger RT188C", "2023 Ranger RT188P", "2023 Ranger RT198P", "2023 Ranger VS1665T", "2023 Ranger VS1682SC Angler", "2023 Ranger VS1682SC Reata", "2023 Ranger VS1782SC Angler", "2023 Ranger VS1782SC Reata", "2023 Ranger VS1882SC Angler", "2023 Ranger VS1882SC Reata", "2023 Ranger VX1788 WT", "2023 Ranger VX1888 WT", "2023 Ranger RB190", "2023 Ranger RB200", "2023 Ranger Reata 200C", "2023 Ranger Reata 220F", "2023 Ranger Reata 220C", "2023 Ranger Reata 220FC", "2023 Ranger 223F", "2023 Ranger Reata 223C", "2023 Ranger Reata 223FC", "2023 Ranger Reata 243C", "2023 Ranger 2500LS", "2023 Mako Pro Skiff 13 CC", "2023 Mako Pro Skiff 17 CC", "2023 Mako Pro Skiff 19 CC", "2023 Triton 18 TrX", "2023 Triton 19 TrX", "2023 Triton 19 TrX Patriot", "2023 Triton 20 TRX", "2023 Triton 20 TrX Patriot", "2023 Triton 21 TrX", "2023 Triton 21 TrX Patriot", "2023 Triton 21 XrT", "2023 Triton 206 Fishunter", "2023 Ranger Z518 Ranger Cup Equipped", "2023 Ranger VS1665SC", "2023 Ranger Reata 200F"];
let fiveHundRebate = ["2024 Tracker Bass Tracker Classic XL"];
let oneThousTwoFiftyRebate = ["2024 Ranger VS1682SC Angler", "2024 Ranger VS1882SC Reata"];
let oneThousRebate = ["2024 Sun Tracker Bass Buggy 18 DLX", "2024 Sun Tracker Party Barge 18 DLX", "2024 Ranger VS1665T", "2024 Ranger VS1665SC", "2024 Triton 18 TrX", "2024 Triton 19 TrX", "2024 Triton 19 TrX Patriot"];
let oneThousFiveHundRebate = ["2024 Ranger VS1782SC Angler", "2024 Ranger VS1782SC Reata", "2024 Ranger Reata 200F", "2024 Ranger Reata 200C", "2024 Ranger Reata 220C", "2024 Ranger Reata 223C", "2024 Ranger Reata 243C", "2024 Ranger 2500LS"];
let twoThousRebate = ["2024 Ranger VS1882SC Angler", "2024 Ranger VS1882SC Reata", "2024 Ranger RB190", "2024 Ranger Reata 220F", "2024 Ranger Reata 220FC"];
let twoThousFiveHundRebate = ["2024 Tahoe T16", "2024 Ranger RT178", "2024 Ranger RT178C", "2024 Ranger RT188", "2024 Ranger RT188C", "2024 Ranger RT188P", "2024 Ranger RT198P", "2024 Ranger VX1788 WT", "2024 Ranger VX1888 WT", "2024 Ranger RB200", "2024 Ranger Reata 223F", "2024 Ranger Reata 223FC"];
let threeThousRebate =["2024 Tahoe T18", "2024 Tahoe 200 S", "2024 Tahoe 210 S", "2024 Tahoe 210 S Limited", "2024 Tahoe 1950", "2024 Tahoe 2150", "2024 Tahoe 2150 CC"];
let threeThousFiveHundRebate = ["2024 Ranger Z518", "2024 Ranger Z518 Ranger Cup Equipped"];
let fourThousRebate = ["2024 Ranger 1850MS", "2024 Ranger 1880MS", "2024 Triton 20 TRX", "2024 Triton 20 TrX Patriot", "2024 Triton 21 TrX", "2024 Triton 21 TrX Patriot", "2024 Triton 21 XrT", "2024 Triton 206 Fishunter", "2024 Triton 186 Fishunter"];
let fourThousFiveHundRebate = ["2024 Ranger 2050MS", "2024 Ranger 212LS"];
let fiveThousRebate = ["2024 Sun Tracker Sportfish 24 XP3", "2024 Regency 230 DL3", "2024 Regency 230 LE3", "2024 Regency 230 LE3 Sport", "2024 Regency 250 DL3", "2024 Regency 250 LE3", "2024 Regency 250 LE3 Sport", "2024 Ranger Z519", "2024 Ranger Z519 Ranger Cup Equipped", "2024 Ranger Z520R", "2024 Ranger Z520R Ranger Cup Equipped", "2024 Ranger Z521R", "2024 Ranger Z521R Ranger Cup Equipped", "2024 Ranger 620FS Ranger Cup Equipped", "2024 Ranger 621FS Ranger Cup Equipped", "2024 Ranger 620FS Pro", "2024 Ranger 621FS Pro", "2024 Ranger 622FS Pro", "2024 Ranger 2080MS"];
for (var i = 0; i <= cardSectionAll.length - 1; i++){

    let currentTitle = cardSectionAll[i].querySelector(".mname").innerHTML.trim();
    let boatLocation = cardSectionAll[i].querySelector(".locname").innerHTML.trim();
  	console.log(boatLocation.slice(-2) == "MO");
    let boatCondition = conditionAll[i].innerHTML;

    console.log(cardSectionAll[i])

  	
    cardSectionAll[i].style.position = "relative";

    if ((boatCondition.includes("New") || boatCondition.includes("NEW")) &&
       boatLocation.slice(-2) != "AB" &&
       boatLocation.slice(-2) != "BC" &&
       boatLocation.slice(-2) != "NB" &&
       boatLocation.slice(-2) != "ON") {

        console.log("New")

        // check for 2023 Clearance
        twentyThreeClearance.find((model) => {
            if (currentTitle == model) {
                console.log("2023 model")
                cardSectionAll[i].closest("a").classList.add("hasPromo");
                cardSectionAll[i].innerHTML += '<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/great-american-boat-sale/bg-removed/GABS_Clearance_badge-removebg.png" border="" style="position: absolute !important; top: 75px !important; right: 7% !important; bottom: auto !important; left: auto !important; width: 150px !important;">';
            }
        });

        // check for $500 gift card offer
        fiveHundRebate.find((model) => {
            if (currentTitle == model) {
                cardSectionAll[i].closest("a").classList.add("hasPromo");
                cardSectionAll[i].innerHTML += '<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/great-american-boat-sale/bg-removed/GABS_500B-removebg.png" border="" style="position: absolute !important; top: 75px !important; right: 7% !important; bottom: auto !important; left: auto !important; width: 150px !important;">';
            }
        });

        // check for $1000 gift card offer
        oneThousRebate.find((model) => {
            if (currentTitle == model) {
                cardSectionAll[i].closest("a").classList.add("hasPromo");
                cardSectionAll[i].innerHTML += '<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/great-american-boat-sale/bg-removed/GABS_1000B-removebg.png" border="" style="position: absolute !important; top: 75px !important; right: 7% !important; bottom: auto !important; left: auto !important; width: 150px !important;">';
            }
        });

        // check for $1250 gift card offer
        oneThousTwoFiftyRebate.find((model) => {
            if (currentTitle == model) {
                cardSectionAll[i].closest("a").classList.add("hasPromo");
                cardSectionAll[i].innerHTML += '<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/great-american-boat-sale/bg-removed/GABS_1250B-removebg.png" border="" style="position: absolute !important; top: 75px !important; right: 7% !important; bottom: auto !important; left: auto !important; width: 150px !important;">';
            }
        });

        // check for $1500 gift card offer
        oneThousFiveHundRebate.find((model) => {
            if (currentTitle == model) {
                cardSectionAll[i].closest("a").classList.add("hasPromo");
                cardSectionAll[i].innerHTML += '<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/great-american-boat-sale/bg-removed/GABS_1500B-removebg.png" border="" style="position: absolute !important; top: 75px !important; right: 7% !important; bottom: auto !important; left: auto !important; width: 150px !important;">';
            }
        });

        // check for $2000 gift card offer
        twoThousRebate.find((model) => {
            if (currentTitle == model) {
                cardSectionAll[i].closest("a").classList.add("hasPromo");
                cardSectionAll[i].innerHTML += '<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/great-american-boat-sale/bg-removed/GABS_2000B-removebg.png" border="" style="position: absolute !important; top: 75px !important; right: 7% !important; bottom: auto !important; left: auto !important; width: 150px !important;">';
            }
        });

        // check for $2500 gift card offer
        twoThousFiveHundRebate.find((model) => {
            if (currentTitle == model) {
                cardSectionAll[i].closest("a").classList.add("hasPromo");
                cardSectionAll[i].innerHTML += '<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/great-american-boat-sale/bg-removed/GABS_2500B-removebg.png" border="" style="position: absolute !important; top: 75px !important; right: 7% !important; bottom: auto !important; left: auto !important; width: 150px !important;">';
            }
        });

        // check for $3000 gift card offer
        threeThousRebate.find((model) => {
            if (currentTitle == model) {
                cardSectionAll[i].closest("a").classList.add("hasPromo");
                cardSectionAll[i].innerHTML += '<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/great-american-boat-sale/bg-removed/GABS_3000B-removebg.png" border="" style="position: absolute !important; top: 75px !important; right: 7% !important; bottom: auto !important; left: auto !important; width: 150px !important;">';
            }
        });

        // check for $3500 gift card offer
        threeThousFiveHundRebate.find((model) => {
            if (currentTitle == model) {
                cardSectionAll[i].closest("a").classList.add("hasPromo");
                cardSectionAll[i].innerHTML += '<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/great-american-boat-sale/bg-removed/GABS_3500B-removebg.png" border="" style="position: absolute !important; top: 75px !important; right: 7% !important; bottom: auto !important; left: auto !important; width: 150px !important;">';
            }
        });

        // check for $4000 gift card offer
        fourThousRebate.find((model) => {
            if (currentTitle == model) {
                cardSectionAll[i].closest("a").classList.add("hasPromo");
                cardSectionAll[i].innerHTML += '<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/great-american-boat-sale/bg-removed/GABS_4000B-removebg.png" border="" style="position: absolute !important; top: 75px !important; right: 7% !important; bottom: auto !important; left: auto !important; width: 150px !important;">';
            }
        });

        // check for $4500 gift card offer
        fourThousFiveHundRebate.find((model) => {
            if (currentTitle == model) {
                cardSectionAll[i].closest("a").classList.add("hasPromo");
                cardSectionAll[i].innerHTML += '<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/great-american-boat-sale/bg-removed/GABS_4500B-removebg.png" border="" style="position: absolute !important; top: 75px !important; right: 7% !important; bottom: auto !important; left: auto !important; width: 150px !important;">';
            }
        });

        // check for $5000 gift card offer
        fiveThousRebate.find((model) => {
            if (currentTitle == model) {
                console.log("$1000 matching model " + model);
                cardSectionAll[i].closest("a").classList.add("hasPromo");
                cardSectionAll[i].innerHTML += '<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/great-american-boat-sale/bg-removed/GABS_5000B-removebg.png" border="" style="position: absolute !important; top: 75px !important; right: 7% !important; bottom: auto !important; left: auto !important; width: 150px !important;">';
            }
        });
    }
}
