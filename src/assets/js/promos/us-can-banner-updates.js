document.addEventListener("DOMContentLoaded", function() {
    let myStoreCountryCode = JSON.parse(localStorage.getItem("myStore"));
    myStoreCountryCode = myStoreCountryCode?.address?.countryCode.toLowerCase() || "";
    const gabsContainer = document.querySelectorAll(".gabs-promo");
    const rosBanner = document.querySelector("#rosBanner a");
    const promoBannerAnchor = document.querySelector("#promoBanner a");
    const promoBannerImg = document.querySelector("#promoBanner img");
    const usPromoUrl = "/offers/great-american-boat-sale.html";
    const caPromoUrl = "/offers/great-canadian-sales-event.html";
    const usPromoImg = "https://www.bassproboatingcenters.com/content/dam/wrmg/events-and-promos/great-american-boat-sale/6-26-update_gc-or-rebate/GABS-TMBC-Homepage_Desktop_Banners_2000x500.png";
    const caPromoImg = "https://www.bassproboatingcenters.com/content/dam/wrmg/events-and-promos/great-american-boat-sale/6-26-update_gc-or-rebate/GCBS_TMBC-Banner_Desktop.png";

    if (myStoreCountryCode === "us") {
        rosBanner.innerText = "LIMITED-TIME OFFERS - SHOP THE GREAT AMERICAN BOAT SALE & RECEIVE UP TO $1,500 ON SELECT MODELS!";
        rosBanner.href = usPromoUrl;

        gabsContainer.forEach(container => {
            container.style.display = "block";
        });

        promoBannerAnchor.href = usPromoUrl
        promoBannerImg.src = usPromoImg
        promoBannerImg.srcset = `${usPromoImg}/jcr:content/renditions/cq5dam.web.320.320.${usPromoImg.slice(-3)} 320w, ${usPromoImg}/jcr:content/renditions/cq5dam.web.640.640.${usPromoImg.slice(-3)} 640w, ${usPromoImg}/jcr:content/renditions/cq5dam.web.960.960.${usPromoImg.slice(-3)} 960w, ${usPromoImg}/jcr:content/renditions/cq5dam.web.1024.1024.${usPromoImg.slice(-3)} 1024w, ${usPromoImg}/jcr:content/renditions/cq5dam.web.1280.1280.${usPromoImg.slice(-3)} 1280w, ${usPromoImg}/jcr:content/renditions/cq5dam.web.1400.1400.${usPromoImg.slice(-3)} 1400w, ${usPromoImg}/jcr:content/renditions/cq5dam.web.1920.1920.${usPromoImg.slice(-3)} 1920w, ${usPromoImg}/jcr:content/renditions/cq5dam.web.2048.2048.${usPromoImg.slice(-3)} 2048w, ${usPromoImg}/jcr:content/renditions/cq5dam.web.2080.2080.${usPromoImg.slice(-3)} 2080w`
    } else if (myStoreCountryCode === "ca") {
        // gabsContainer.forEach(container => {
        //     container.style.display = "none";
        // });

        rosBanner.innerText = "LIMITED-TIME OFFERS - SHOP THE GREAT CANADIAN BOAT SALE & RECEIVE UP TO $1,500 ON SELECT MODELS!";
        rosBanner.href = caPromoUrl;
        gabsContainer.forEach(container => {
            container.style.display = "block";
        });

        promoBannerAnchor.href = caPromoUrl
        promoBannerImg.src = caPromoImg
        promoBannerImg.srcset = `${caPromoImg}/jcr:content/renditions/cq5dam.web.320.320.${caPromoImg.slice(-3)} 320w, ${caPromoImg}/jcr:content/renditions/cq5dam.web.640.640.${caPromoImg.slice(-3)} 640w, ${caPromoImg}/jcr:content/renditions/cq5dam.web.960.960.${caPromoImg.slice(-3)} 960w, ${caPromoImg}/jcr:content/renditions/cq5dam.web.1024.1024.${caPromoImg.slice(-3)} 1024w, ${caPromoImg}/jcr:content/renditions/cq5dam.web.1280.1280.${caPromoImg.slice(-3)} 1280w, ${caPromoImg}/jcr:content/renditions/cq5dam.web.1400.1400.${caPromoImg.slice(-3)} 1400w, ${caPromoImg}/jcr:content/renditions/cq5dam.web.1920.1920.${caPromoImg.slice(-3)} 1920w, ${caPromoImg}/jcr:content/renditions/cq5dam.web.2048.2048.${caPromoImg.slice(-3)} 2048w, ${caPromoImg}/jcr:content/renditions/cq5dam.web.2080.2080.${caPromoImg.slice(-3)} 2080w`
    }
});
