function plpPromo() {
    let cardSectionAll = document.querySelectorAll(".card-section");
    // let mname = document.querySelectorAll(".mname");
    let conditionAll = document.querySelectorAll(".condition");
    let offRoadModels = ["Tracker Off Road 90", "Tracker Off Road 300", "Tracker Off Road OX400", "Tracker Off Road 450", "Tracker Off Road 500S", "Tracker Off Road 500 S", "Tracker Off Road 600", "Tracker Off Road 800", "Tracker Off Road Ox EV", "Tracker Off Road EV iS"];
    let grizzlyModels = ["Tracker Grizzly 1648 Jon", "Tracker Grizzly 1754 Jon", "Tracker Grizzly 1648 SC", "Tracker Grizzly 1754 SC", "Tracker Grizzly 1860 CC", "Tracker Grizzly 2072 CC", "2023 Tracker Grizzly 1654 T Sportsman", "Tracker Grizzly 2072 CC Sportsman", "Tracker Grizzly 2072 CC Sportsman Kicker"];

    for (let i = 0; i <= cardSectionAll.length - 1; i++){
        let currentTitle = cardSectionAll[i].querySelector(".mname").innerHTML.trim();
        let condition = conditionAll[i].innerHTML.toLowerCase();
        cardSectionAll[i].style.position = "relative";
        if (condition.includes("new")) {

            // check for promo
            // offRoadModels.find((model) => {
            for (let model of offRoadModels) {
                if (currentTitle.indexOf(model) > -1 && (currentTitle.indexOf("2022") > -1 || currentTitle.indexOf("2023") > -1) && currentTitle.indexOf("2024") == -1 && currentTitle.indexOf("2025") == -1) {
                    console.log("tracker off road");
                    if (window.innerWidth >= 640) {
                        cardSectionAll[i].closest("a").classList.add("hasPromo");
                        cardSectionAll[i].innerHTML += '<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2024-model-year-end-clearance/2024-model-year-end-clearance.png" border="" style="position: absolute !important; top: 75px !important; right: 7% !important; bottom: auto !important; left: auto !important; width: 125px !important;">';
                    } else {
                        cardSectionAll[i].closest("a").classList.add("hasPromo");
                        cardSectionAll[i].innerHTML += '<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2024-model-year-end-clearance/2024-model-year-end-clearance.png" height="1437" width="1509" alt="" title="" border="" style="top: 10px !important; position: relative !important; width: 115px !important; right: auto !important; bottom: auto !important; left: 0 !important;">';
                    }
                    break;
                }
            }
            // });
            if (currentTitle.indexOf("Tracker Off Road") == -1 && currentTitle.indexOf("TRAILSTAR") == -1 && currentTitle.indexOf("Grizzly") == -1 && currentTitle.indexOf("Tracker Super Guide V-16 SC") == -1 && currentTitle.indexOf("Tracker Pro Guide V-16 SC") == -1 && currentTitle.indexOf("Sun Tracker Party Barge 16") == -1 && currentTitle.indexOf("Triton 186 Allure") == -1 && currentTitle.indexOf("Triton 206 Allure") == -1 && currentTitle.indexOf("Tracker Pro Guide 16SC") == -1 && currentTitle.indexOf("2025") == -1 && currentTitle.indexOf("Ascend") == -1) {
                if (window.innerWidth >= 640) {
                    cardSectionAll[i].closest("a").classList.add("hasPromo");
                    cardSectionAll[i].innerHTML += '<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2024-model-year-end-clearance/2024-model-year-end-clearance.png" border="" style="position: absolute !important; top: 75px !important; right: 7% !important; bottom: auto !important; left: auto !important; width: 125px !important;">';
                } else {
                    cardSectionAll[i].closest("a").classList.add("hasPromo");
                    cardSectionAll[i].innerHTML += '<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2024-model-year-end-clearance/2024-model-year-end-clearance.png" height="1437" width="1509" alt="" title="" border="" style="top: 10px !important; position: relative !important; width: 115px !important; right: auto !important; bottom: auto !important; left: 0 !important;">';
                }
            }
            // grizzlyModels.find((model) => {
            for (let model of grizzlyModels) {
                if (currentTitle.indexOf(model) > -1 && currentTitle.indexOf("2024") == -1 && currentTitle.indexOf("2025") == -1) {
                    if (window.innerWidth >= 640) {
                        cardSectionAll[i].closest("a").classList.add("hasPromo");
                        cardSectionAll[i].innerHTML += '<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2024-model-year-end-clearance/2024-model-year-end-clearance.png" border="" style="position: absolute !important; top: 75px !important; right: 7% !important; bottom: auto !important; left: auto !important; width: 125px !important;">';
                    } else {
                        cardSectionAll[i].closest("a").classList.add("hasPromo");
                        cardSectionAll[i].innerHTML += '<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2024-model-year-end-clearance/2024-model-year-end-clearance.png" height="1437" width="1509" alt="" title="" border="" style="top: 10px !important; position: relative !important; width: 115px !important; right: auto !important; bottom: auto !important; left: 0 !important;">';
                    }
                    break;
                }
            }
            // });
        }
    }
}
