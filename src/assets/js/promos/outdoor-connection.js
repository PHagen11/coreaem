const dealerLocation = document.querySelector(".model-title a").textContent;
const scheduleAptDesktop = document.querySelector(".schedule-appointment-lg");
const scheduleAptMobile = document.querySelector(".schedule-appointment-sm");

if (dealerLocation === "Springfield, MO") {
    if (window.innerWidth < 1024) {
        scheduleAptMobile.style.display = "block";
        scheduleAptDesktop.style.display = "none";
    } else {
        scheduleAptMobile.style.display = "none";
        scheduleAptDesktop.style.display = "block";
    }
} else if (dealerLocation === "Kansas City, KS") {
    if (window.innerWidth < 1024) {
        scheduleAptMobile.style.display = "block";
        scheduleAptDesktop.style.display = "none";
    } else {
        scheduleAptMobile.style.display = "none";
        scheduleAptDesktop.style.display = "block";
    }
} else if (dealerLocation === "East Ridge, TN") {
    if (window.innerWidth < 1024) {
        scheduleAptMobile.style.display = "block";
        scheduleAptDesktop.style.display = "none";
    } else {
        scheduleAptMobile.style.display = "none";
        scheduleAptDesktop.style.display = "block";
    }
} else if (dealerLocation === "Cheektowaga, NY") {
    if (window.innerWidth < 1024) {
        scheduleAptMobile.style.display = "block";
        scheduleAptDesktop.style.display = "none";
    } else {
        scheduleAptMobile.style.display = "none";
        scheduleAptDesktop.style.display = "block";
    }
} else if (dealerLocation === "Concord, NC") {
    if (window.innerWidth < 1024) {
        scheduleAptMobile.style.display = "block";
        scheduleAptDesktop.style.display = "none";
    } else {
        scheduleAptMobile.style.display = "none";
        scheduleAptDesktop.style.display = "block";
    }
} else if (dealerLocation === "Miami, FL") {
    if (window.innerWidth < 1024) {
        scheduleAptMobile.style.display = "block";
        scheduleAptDesktop.style.display = "none";
    } else {
        scheduleAptMobile.style.display = "none";
        scheduleAptDesktop.style.display = "block";
    }
} else if (dealerLocation === "League City, TX") {
    if (window.innerWidth < 1024) {
        scheduleAptMobile.style.display = "block";
        scheduleAptDesktop.style.display = "none";
    } else {
        scheduleAptMobile.style.display = "none";
        scheduleAptDesktop.style.display = "block";
    }
} else {
    scheduleAptMobile.style.display = "none";
    scheduleAptDesktop.style.display = "none";
}