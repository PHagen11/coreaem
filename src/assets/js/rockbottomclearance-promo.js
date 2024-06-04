var cardSectionAll = document.querySelectorAll(".card-section");
var mname = document.querySelectorAll(".mname");
for (var i = 0; i <= cardSectionAll.length - 1; i++){

  var currentTitle = cardSectionAll[i].querySelector(".mname").innerHTML;

  // console.log(cardSectionAll[i].closest('a'));
  
  if (currentTitle.includes("90")) {
    cardSectionAll[i].closest('a').className += "tor-90";
    cardSectionAll[i].style.position = "relative";
    if (window.innerWidth >= 500) {
      cardSectionAll[i].innerHTML += '<img src="https://www.bassproboatingcenters.com/content/dam/wrmg/events-and-promos/rock-bottom-clearance/TOR_RockBottom.png" height="1437" width="1509" alt="" title="" border="" style="top: 45px !important; position: absolute !important; width: 85px !important; right: 5% !important; bottom: auto !important; left: auto !important;">';
    } else {
      cardSectionAll[i].innerHTML += '<img src="https://www.bassproboatingcenters.com/content/dam/wrmg/events-and-promos/rock-bottom-clearance/TOR_RockBottom.png" height="1437" width="1509" alt="" title="" border="" style="top: 0 !important; position: relative !important; width: 85px !important; right: auto !important; bottom: auto !important; left: 0 !important;">';
    }
  }

  if (currentTitle.includes("300")) {
    cardSectionAll[i].closest('a').className += "tor-300";
    cardSectionAll[i].style.position = "relative";
    if (window.innerWidth >= 500) {
      cardSectionAll[i].innerHTML += '<img src="https://www.bassproboatingcenters.com/content/dam/wrmg/events-and-promos/rock-bottom-clearance/TOR_RockBottom.png" height="1437" width="1509" alt="" title="" border="" style="top: 45px !important; position: absolute !important; width: 85px !important; right: 5% !important; bottom: auto !important; left: auto !important;">';
    } else {
      cardSectionAll[i].innerHTML += '<img src="https://www.bassproboatingcenters.com/content/dam/wrmg/events-and-promos/rock-bottom-clearance/TOR_RockBottom.png" height="1437" width="1509" alt="" title="" border="" style="top: 0 !important; position: relative !important; width: 85px !important; right: auto !important; bottom: auto !important; left: 0 !important;">';
    }
  }
}
