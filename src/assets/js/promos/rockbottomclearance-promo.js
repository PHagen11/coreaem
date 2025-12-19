/* CUSTOM CODE */
let cardSectionAll = document.querySelectorAll(".card-section");
let mname = document.querySelectorAll(".mname");
let fullNameArr = ["2020 Tracker Off Road 90", "2021 Tracker Off Road 90", "2022 Tracker Off Road 90", "2023 Tracker Off Road 90", "2020 Tracker Off Road 300", "2021 Tracker Off Road 300", "2022 Tracker Off Road 300", "2023 Tracker Off Road 300", "2020 Tracker Off Road 450", "2021 Tracker Off Road 450", "2022 Tracker Off Road 450", "2023 Tracker Off Road 450", "2020 Tracker Off Road 600", "2021 Tracker Off Road 600", "2022 Tracker Off Road 600", "2023 Tracker Off Road 600", "2020 Tracker Off Road 600 EPS", "2021 Tracker Off Road 600 EPS", "2022 Tracker Off Road 600 EPS", "2023 Tracker Off Road 600 EPS", "2020 Tracker Off Road 600 EPS LE", "2021 Tracker Off Road 600 EPS LE", "2022 Tracker Off Road 600 EPS LE", "2023 Tracker Off Road 600 EPS LE", "2020 Tracker Off Road 800SX", "2021 Tracker Off Road 800SX", "2022 Tracker Off Road 800SX", "2023 Tracker Off Road 800SX", "2020 Tracker Off Road 800SX LE", "2021 Tracker Off Road 800SX LE", "2022 Tracker Off Road 800SX LE", "2023 Tracker Off Road 800SX LE", "2020 Tracker Off Road 800SX Crew", "2021 Tracker Off Road 800SX Crew", "2022 Tracker Off Road 800SX Crew", "2023 Tracker Off Road 800SX Crew", "2020 Tracker Off Road 800SX LE CREW", "2021 Tracker Off Road 800SX LE CREW", "2022 Tracker Off Road 800SX LE CREW", "2023 Tracker Off Road 800SX LE CREW"];
for (let i = 0; i <= cardSectionAll.length - 1; i++) {

    let currentTitle = cardSectionAll[i].querySelector(".mname").innerHTML.trim();
    let condition = document.querySelectorAll(".condition")[i].innerHTML.trim();

    if (condition == "new") {
        fullNameArr.find((fullName) => {
            if (currentTitle == fullName) {
                cardSectionAll[i].closest('a').className += "rockBottomClearance";
                cardSectionAll[i].style.position = "relative";
                if (window.innerWidth >= 500) {
                    cardSectionAll[i].innerHTML += '<img src="https://www.bassproboatingcenters.com/content/dam/wrmg/events-and-promos/rock-bottom-clearance/TOR_RockBottom.png" height="1437" width="1509" style="top: 45px !important; position: absolute !important; width: 85px !important; right: 5% !important; bottom: auto !important; left: auto !important;">';
                } else {
                    cardSectionAll[i].innerHTML += '<img src="https://www.bassproboatingcenters.com/content/dam/wrmg/events-and-promos/rock-bottom-clearance/TOR_RockBottom.png" height="1437" width="1509" style="top: 0 !important; position: relative !important; width: 85px !important; right: auto !important; bottom: auto !important; left: 0 !important;">';
                }
            }
        });
    }
}
