/* CUSTOM CODE */
var cardSectionAll = document.querySelectorAll(".card-section");
var mname = document.querySelectorAll(".mname");
var conditionAll = document.querySelectorAll(".condition");
for (var i = 0; i <= cardSectionAll.length - 1; i++){

  var currentTitle = cardSectionAll[i].querySelector(".mname").innerHTML.trim();
  var boatCondition = conditionAll[i].innerHTML;
  
  cardSectionAll[i].style.position = "relative";
  
  if (boatCondition.includes("New")) {
    
    // check for sun tracker $500 gift card offer
    if (currentTitle == "2023 Sun Tracker Party Barge 18 DLX" || currentTitle == "2023 Sun Tracker Party Barge 20 DLX") {
      cardSectionAll[i].closest("a").classList.add("hasPromo");
      cardSectionAll[i].innerHTML += '<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/spring-2024/gift-card/GiftCard_Bug_WPurchase__GiftCard_Bug_500.png" height="1437" width="1509" alt="" title="" border="" style="top: 60px !important; position: absolute !important; width: 110px !important; right: 8% !important; bottom: auto !important; left: auto !important;">';
      
    }
    // check for sun tracker $1000 gift card offer
    else if (currentTitle == "2023 Sun Tracker Party Barge 22 DLX" || currentTitle == "2023 Sun Tracker Party Barge 22 XP3" || currentTitle == "2023 Sun Tracker Party Barge 22 RF DLX" || currentTitle == "2023 Sun Tracker Party Barge 22 RF XP3") {
      cardSectionAll[i].closest("a").classList.add("hasPromo");
      cardSectionAll[i].innerHTML += '<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/spring-2024/gift-card/GiftCard_Bug_WPurchase__GiftCard_Bug_1000.png" height="1437" width="1509" alt="" title="" border="" style="top: 60px !important; position: absolute !important; width: 110px !important; right: 8% !important; bottom: auto !important; left: auto !important;">';
      
    }
    // check for sun tracker $1500 gift card offer
    else if (currentTitle == "2023 Sun Tracker Fishin' Barge 22 XP3" || currentTitle == "2023 Sun Tracker SportFish 22 XP3" || currentTitle == "2023 Sun Tracker Sportfish 24 XP3" || currentTitle == "2023 Party Barge 22 RF XP3") {
      cardSectionAll[i].closest("a").classList.add("hasPromo");
      cardSectionAll[i].innerHTML += '<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/gift-card-offer/GiftCard_Bug_WPurchase_1500.png" height="1437" width="1509" alt="" title="" border="" style="top: 60px !important; position: absolute !important; width: 110px !important; right: 8% !important; bottom: auto !important; left: auto !important;">';
      
    }
    
    
    
    // check for tracker $1000 gift card offer
    if (currentTitle == "2023 Tracker Pro Team 190 TX" || currentTitle == "2023 Tracker Pro Team 190 TX Tournament Edition") {
      cardSectionAll[i].closest("a").classList.add("hasPromo");
      cardSectionAll[i].innerHTML += '<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/spring-2024/gift-card/GiftCard_Bug_WPurchase__GiftCard_Bug_1000.png" height="1437" width="1509" alt="" title="" border="" style="top: 60px !important; position: absolute !important; width: 110px !important; right: 8% !important; bottom: auto !important; left: auto !important;">';
      
    }
    // check for tracker $1500 gift card offer
    else if (currentTitle == "2023 Tracker Pro Guide V-175 WT" || currentTitle == "2023 Tracker Pro Guide V-175 Combo") {
      cardSectionAll[i].closest("a").classList.add("hasPromo");
      cardSectionAll[i].innerHTML += '<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/gift-card-offer/GiftCard_Bug_WPurchase_1500.png" height="1437" width="1509" alt="" title="" border="" style="top: 60px !important; position: absolute !important; width: 110px !important; right: 8% !important; bottom: auto !important; left: auto !important;">';
      
    }
    
    
    
     // check for nitro $1000 gift card offer
    if (currentTitle == "2023 Nitro Z17" || currentTitle == "2024 Nitro Z17" || currentTitle == "2023 Nitro Z18" || currentTitle == "2024 Nitro Z18" || currentTitle == "2023 Nitro Z18 Pro" || currentTitle == "2024 Nitro Z18 Pro") {
      cardSectionAll[i].closest("a").classList.add("hasPromo");
      cardSectionAll[i].innerHTML += '<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/spring-2024/gift-card/GiftCard_Bug_WPurchase__GiftCard_Bug_1000.png" height="1437" width="1509" alt="" title="" border="" style="top: 60px !important; position: absolute !important; width: 110px !important; right: 8% !important; bottom: auto !important; left: auto !important;">';
      
    }
    // check for nitro $1500 gift card offer
    else if (currentTitle == "2023 Nitro Z19" || currentTitle == "2024 Nitro Z19" || currentTitle == "2023 Nitro Z19 Pro" || currentTitle == "2024 Nitro Z19 Pro" || currentTitle == "2023 Nitro Z20" || currentTitle == "2024 Nitro Z20" || currentTitle == "2023 Nitro Z20 Pro" || currentTitle == "2024 Nitro Z20 Pro" || currentTitle == "2023 Nitro Z21 XL" || currentTitle == "2024 Nitro Z21 XL" || currentTitle == "2023 Nitro Z21 XL Pro" || currentTitle == "2024 Nitro Z21 XL Pro" || currentTitle == "2023 Nitro ZV19" || currentTitle == "2024 Nitro ZV19" || currentTitle == "2023 Nitro ZV19 Pro" || currentTitle == "2024 Nitro ZV19 Pro" || currentTitle == "2023 Nitro ZV19 Sport" || currentTitle == "2024 Nitro ZV19 Sport" || currentTitle == "2023 Nitro ZV19 Sport Pro" || currentTitle == "2024 Nitro ZV19 Sport Pro" || currentTitle == "2023 Nitro ZV20" || currentTitle == "2024 Nitro ZV20" || currentTitle == "2023 Nitro ZV20 Pro" || currentTitle == "2024 Nitro ZV20 Pro" || currentTitle == "2023 Nitro ZV21" || currentTitle == "2024 Nitro ZV21" || currentTitle == "2023 Nitro ZV21 Pro" || currentTitle == "2024 Nitro ZV21 Pro") {
      cardSectionAll[i].closest("a").classList.add("hasPromo");
      cardSectionAll[i].innerHTML += '<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/gift-card-offer/GiftCard_Bug_WPurchase_1500.png" height="1437" width="1509" alt="" title="" border="" style="top: 60px !important; position: absolute !important; width: 110px !important; right: 8% !important; bottom: auto !important; left: auto !important;">';
      
    }
    
    
    
    // check for tahoe $1000 gift card offer
    if (currentTitle == "2023 Tahoe 200 S" || currentTitle == "2023 Tahoe 1950" || currentTitle == "2023 Tahoe 2150" || currentTitle == "2023 Tahoe 2150 CC") {
      cardSectionAll[i].closest("a").classList.add("hasPromo");
      cardSectionAll[i].innerHTML += '<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/spring-2024/gift-card/GiftCard_Bug_WPurchase__GiftCard_Bug_1000.png" height="1437" width="1509" alt="" title="" border="" style="top: 60px !important; position: absolute !important; width: 110px !important; right: 8% !important; bottom: auto !important; left: auto !important;">';
      
    }
    
    
    
    // check for regency $1000 gift card offer
    if (currentTitle == "2023 Regency 230 DL3" || currentTitle == "2023 Regency 250 DL3" || currentTitle == "2023 Regency 230 LE3" || currentTitle == "2023 Regency 250 LE3" || currentTitle == "2023 Regency 230 LE3 Sport" || currentTitle == "2023 Regency 250 LE3 Sport") {
      cardSectionAll[i].closest("a").classList.add("hasPromo");
      cardSectionAll[i].innerHTML += '<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/spring-2024/gift-card/GiftCard_Bug_WPurchase__GiftCard_Bug_1000.png" height="1437" width="1509" alt="" title="" border="" style="top: 60px !important; position: absolute !important; width: 110px !important; right: 8% !important; bottom: auto !important; left: auto !important;">';
      
    }
    
    
    
    // check for triton $1000 gift card offer
    if (currentTitle == "2023 Triton 179 TrX" || currentTitle == "2024 Triton 179 TrX" || currentTitle == "2023 Triton 18 TrX" || currentTitle == "2024 Triton 18 TrX") {
      cardSectionAll[i].closest("a").classList.add("hasPromo");
      cardSectionAll[i].innerHTML += '<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/spring-2024/gift-card/GiftCard_Bug_WPurchase__GiftCard_Bug_1000.png" height="1437" width="1509" alt="" title="" border="" style="top: 60px !important; position: absolute !important; width: 110px !important; right: 8% !important; bottom: auto !important; left: auto !important;">';
      
    }
    // check for triton $2000 gift card offer
    else if (currentTitle == "2023 Triton 19 TrX" || currentTitle == "2024 Triton 19 TrX" || currentTitle == "2023 Triton 19 TrX Patriot" || currentTitle == "2024 Triton 19 TrX Patriot" || currentTitle == "2023 Triton 20 TRX" || currentTitle == "2024 Triton 20 TRX" || currentTitle == "2023 Triton 20 TRX Patriot" || currentTitle == "2024 Triton 20 TRX Patriot" || currentTitle == "2023 Triton 20XP" || currentTitle == "2024 Triton 20XP" || currentTitle == "2023 Triton 20XP Patriot" || currentTitle == "2024 Triton 20XP Patriot" || currentTitle == "2023 Triton 21 TrX" || currentTitle == "2024 Triton 21 TrX" || currentTitle == "2023 Triton 21 TrX Patriot" || currentTitle == "2024 Triton 21 TrX Patriot" || currentTitle == "2023 Triton 21 XrT" || currentTitle == "2024 Triton 21 XrT" || currentTitle == "2023 Triton 186 Fishunter" || currentTitle == "2024 Triton 186 Fishunter" || currentTitle == "2023 Triton 206 Fishunter" || currentTitle == "2024 Triton 206 Fishunter" || currentTitle == "2023 Triton 186 Allure" || currentTitle == "2024 Triton 186 Allure" || currentTitle == "2023 Triton 206 Allure" || currentTitle == "2024 Triton 206 Allure") {
      cardSectionAll[i].closest("a").classList.add("hasPromo");
      cardSectionAll[i].innerHTML += '<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/spring-2024/gift-card/GiftCard_Bug_WPurchase__GiftCard_Bug_2000.png" height="1437" width="1509" alt="" title="" border="" style="top: 60px !important; position: absolute !important; width: 110px !important; right: 8% !important; bottom: auto !important; left: auto !important;">';
      
    }
    
    
    
    // check for ranger $1500 gift card offer
    if (currentTitle == "2023 Ranger RT188" || currentTitle == "2023 Ranger RT188C" || currentTitle == "2023 Ranger VS1682SC Angler" || currentTitle == "2023 Ranger VS1682SC Reata" || currentTitle == "2023 Ranger VS1782SC Angler" || currentTitle == "2023 Ranger VS1782SC Reata" || currentTitle == "2023 Ranger VX1788 WT" || currentTitle == "2023 Ranger VX1888 WT" || currentTitle == "2023 Ranger RB200" || currentTitle == "2023 Ranger Reata 200F" || currentTitle == "2023 Ranger Reata 220F" || currentTitle == "2023 Ranger 223F" || currentTitle == "2023 Ranger Reata 200C" || currentTitle == "2023 Ranger Reata 220C" || currentTitle == "2023 Ranger Reata 223C" || currentTitle == "2023 Ranger Reata 220FC") {
      cardSectionAll[i].closest("a").classList.add("hasPromo");
      cardSectionAll[i].innerHTML += '<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/gift-card-offer/GiftCard_Bug_WPurchase_1500.png" height="1437" width="1509" alt="" title="" border="" style="top: 60px !important; position: absolute !important; width: 110px !important; right: 8% !important; bottom: auto !important; left: auto !important;">';
      
    }
    // check for ranger $2000 gift card offer
    else if (currentTitle == "2023 Ranger Z518" || currentTitle == "2024 Ranger Z518" || currentTitle == "2023 Ranger Z518 Ranger Cup Equipped" || currentTitle == "2024 Ranger Z518 Ranger Cup Equipped" || currentTitle == "2023 Ranger Z519" || currentTitle == "2024 Ranger Z519" || currentTitle == "2023 Ranger Z519 Ranger Cup Equipped" || currentTitle == "2024 Ranger Z519 Ranger Cup Equipped" || currentTitle == "2023 Ranger Z520R" || currentTitle == "2024 Ranger Z520R" || currentTitle == "2023 Ranger Z520R Ranger Cup Equipped" || currentTitle == "2024 Ranger Z520R Ranger Cup Equipped" || currentTitle == "2023 Ranger Z521R" || currentTitle == "2024 Ranger Z521R" || currentTitle == "2023 Ranger Z521R Ranger Cup Equipped" || currentTitle == "2024 Ranger Z521R Ranger Cup Equipped" || currentTitle == "2023 Ranger 620FS Ranger Cup Equipped" || currentTitle == "2024 Ranger 620FS Ranger Cup Equipped" || currentTitle == "2023 Ranger 620FS Pro" || currentTitle == "2024 Ranger 620FS Pro" || currentTitle == "2023 Ranger 621FS Ranger Cup Equipped" || currentTitle == "2024 Ranger 621FS Ranger Cup Equipped" || currentTitle == "2023 Ranger 621FS Pro" || currentTitle == "2024 Ranger 621FS Pro" || currentTitle == "2023 Ranger 622FS Pro" || currentTitle == "2024 Ranger 622FS Pro" || currentTitle == "2023 Ranger 1880MS" || currentTitle == "2024 Ranger 1880MS" || currentTitle == "2023 Ranger 2080MS" || currentTitle == "2024 Ranger 2080MS" || currentTitle == "2023 Ranger 2050MS" || currentTitle == "2024 Ranger 2050MS" || currentTitle == "2023 Ranger 1850MS" || currentTitle == "2024 Ranger 1850MS" || currentTitle == "2023 Ranger 212LS" || currentTitle == "2024 Ranger 212LS" || currentTitle == "2023 Ranger RT188P" || currentTitle == "2023 Ranger RT198P") {
      cardSectionAll[i].closest("a").classList.add("hasPromo");
      cardSectionAll[i].innerHTML += '<img src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/spring-2024/gift-card/GiftCard_Bug_WPurchase__GiftCard_Bug_2000.png" height="1437" width="1509" alt="" title="" border="" style="top: 60px !important; position: absolute !important; width: 110px !important; right: 8% !important; bottom: auto !important; left: auto !important;">';
      
    }
    
  }
  
}
