document.addEventListener('DOMContentLoaded', () => {
    let date = new Date();
    let currentYear = date.getFullYear();
    let addYear = 2000;

    let minYear = document.getElementById("yearMin");
    let maxYear = document.getElementById("yearMax");

    for (let i = 1; addYear <= currentYear + 1; i++) {
        minYear[i] = new Option(addYear, addYear);
        maxYear[i] = new Option(addYear, addYear);
        addYear++
    }
})
