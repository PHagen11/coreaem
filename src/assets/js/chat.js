function onOpenChatLink(profile) {
  let url = window.location.host;
  let logoUrl = "";
  let cssPath = "";
  let brandValue = "";

  switch(url) {
    case "www.trackerboats.com":
      logoUrl = "/content/dam/global/logos/TRACKER_Boats.png"
      cssPath = "/content/dam/wrmg/tracker/site/tracker-chat-theme.css"
      brandValue = "Tracker Boats"
      console.log("tracker chat")
      break;
    case "www.ascendkayaks.com":
      logoUrl = "/content/dam/wrmg/ascend/logos-and-images/Ascend_green.png"
      cssPath = "/content/dam/wrmg/ascend/site/ascend-chat-theme.css"
      brandValue = "Ascend Kayaks"
      console.log("ascend chat")
      break;
    case "www.trackeroffroad.com":
      logoUrl = "/content/dam/wrmg/tracker-off-road/site/assets/img/tr-offroad-logo-bk.png"
      cssPath = "/content/dam/wrmg/tracker-off-road/site/tor-chat-theme.css"
      brandValue = "Tracker Off Road"
      console.log("tor chat")
      break;
    case "www.rangerboats.com":
      logoUrl = "/content/dam/logos/ranger-logo.png"
      cssPath = "/content/dam/wrmg/ranger/site/ranger-chat-theme.css"
      brandValue = "Ranger Boats"
      console.log("ranger chat")
      break;
    case "www.regencyboats.com":
      logoUrl = "/content/dam/global/logos/Regency_Logo_GS_light.png"
      cssPath = "/content/dam/wrmg/regency/site/regency-chat-theme.css"
      brandValue = "Regency Boats"
      console.log("regency chat")
      break;
    case "www.tritonboats.com":
      logoUrl = "/content/dam/wrmg-web/triton-boats/logos/triton-logo-rev"
      cssPath = "/content/dam/wrmg/triton/site/triton-chat-theme.css"
      brandValue = "Triton Boats"
      console.log("triton chat")
      break;
    case "www.suntrackerboats.com":
      logoUrl = "/content/dam/global/logos/SunTracker.png"
      cssPath = "/content/dam/wrmg/sun-tracker/site/sun-tracker-chat-theme.css"
      brandValue = "Sun Tracker Boats"
      console.log("sun tracker chat")
      break;
    case "www.nitro.com":
      logoUrl = "/content/dam/global/logos/Nitro_Logo.jpg"
      cssPath = "/content/dam/wrmg/nitro/site/nitro-chat-theme.css"
      brandValue = "Nitro Boats"
      console.log("nitro chat")
      break;
    case "www.makoboats.com":
      logoUrl = "/content/dam/global/logos/MAKO_Bk.png"
      cssPath = "/content/dam/wrmg/mako/site/mako-chat-theme.css"
      brandValue = "Mako Boats"
      console.log("mako chat")
      break;
    case "www.tahoeboats.com":
      logoUrl = "/content/dam/global/logos/Tahoe_light.png"
      cssPath = "/content/dam/wrmg/tahoe/site/tahoe-chat-theme.css"
      brandValue = "Tahoe Boats"
      console.log("tahoe chat")
      break;
    // This is used for testing
    case "aem-sites.basspro.com":
      logoUrl = "/content/dam/global/logos/Tahoe_light.png"
      cssPath = "/content/dam/wrmg/tahoe/site/tahoe-chat-theme.css"
      brandValue = "test"
      console.log("test chat")
      break;
    default:
      brandValue = "WRMG"
      console.log("no brand match")
      break;
  }

    let chatUrl = 'https://app.five9.com/consoles/ChatConsole/index.html?title=Contact%20Tracker&tenant=Bass%20Pro%2C%20LLC%20-%20Non%20E.164&profiles='+profile+'&showProfiles=true&autostart=true&profileLabel=Select%20a%20Department&theme=https%3A%2F%2Fassets.whiterivermg.com%2F'+cssPath+'&logo=https%3A%2F%2Fassets.whiterivermg.com'+logoUrl+'&surveyOptions=%7B%22showComment%22%3Atrue%2C%22requireComment%22%3Afalse%7D&fields=%7B%22name%22%3A%7B%22value%22%3A%22%22%2C%22show%22%3Atrue%2C%22label%22%3A%22Name%22%7D%2C%22email%22%3A%7B%22value%22%3A%22%22%2C%22show%22%3Atrue%2C%22label%22%3A%22Email%22%7D%2C%22Serial%20Number%22%3A%7B%22value%22%3A%22%22%2C%22show%22%3Atrue%2C%22label%22%3A%22Serial%20Number%22%2C%22required%22%3Afalse%7D%2C%22brand%22%3A%7B%22value%22%3A%22'+brandValue+'%22%2C%22show%22%3Afalse%2C%22label%22%3A%22Brand%22%2C%22required%22%3Afalse%7D%2C%22UserLocale%22%3A%7B%22value%22%3A%22en%22%2C%22show%22%3Afalse%7D%7D&playSoundOnMessage=true&allowCustomerToControlSoundPlay=false&showEmailButton=true&useBusinessHours=false&showPrintButton=false&allowUsabilityMenu=false&enableCallback=false&callbackList=&allowRequestLiveAgent=false';

    let props = 'width=350,height=600,location=no,menubar=no,resizable=yes,scrollbars=no,status=no,titlebar=no,toolbar=no';

    window.open(chatUrl,'Five9Chat',props);
}