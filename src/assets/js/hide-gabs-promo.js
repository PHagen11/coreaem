document.addEventListener("DOMContentLoaded", function() {
    let myStoreCountryCode = JSON.parse(localStorage.getItem("myStore"));
    myStoreCountryCode = myStoreCountryCode?.address?.countryCode.toLowerCase() || "us";
    const gabsContainer = document.querySelectorAll(".gabs-promo");
    if (myStoreCountryCode === "ca") {
        gabsContainer.forEach(container => {
            container.style.display = "none";
        });
    } else if (myStoreCountryCode === "us") {
        gabsContainer.forEach(container => {
            container.style.display = "block";
        });
    }
})