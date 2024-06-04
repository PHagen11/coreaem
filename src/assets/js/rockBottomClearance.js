var cardSectionAll = document.querySelectorAll(".card-section");
var mname = document.querySelectorAll(".mname");
for (var i = 0; i <= cardSectionAll.length - 1; i++){

  var currentTitle = cardSectionAll[i].querySelector(".mname").innerHTML;

  console.log(cardSectionAll[i].closest('a').className += "test")
  
  if (currentTitle) {
    if (currentTitle.includes("90") || currentTitle.includes("300")) {
      
      if (window.innerWidth >= 500) {
        cardSectionAll[i].innerHTML += '<img src="https://www.bassproboatingcenters.com/content/dam/wrmg/events-and-promos/rock-bottom-clearance/TOR_RockBottom.png" height="1437" width="1509" alt="" title="" border="" style="top: 45px !important; position: absolute !important; width: 85px !important; right: 5% !important; bottom: auto !important; left: auto !important;" vwo-element-id="1700530117700" class="vwo_1700530117710 vwo_1700534120385">';
        cardSectionAll[i].style.position = "relative";
      } else {
        cardSectionAll[i].innerHTML += '<img src="https://www.bassproboatingcenters.com/content/dam/wrmg/events-and-promos/rock-bottom-clearance/TOR_RockBottom.png" height="1437" width="1509" alt="" title="" border="" style="top: 0 !important; position: relative !important; width: 85px !important; right: auto !important; bottom: auto !important; left: 0 !important;" vwo-element-id="1700530117700" class="vwo_1700530117710 vwo_1700534120385">';
        cardSectionAll[i].style.position = "relative";
      }
    }
  }
}
