// this applies the in stock label to model page
document.addEventListener("DOMContentLoaded", () => {
    let specsKey = document.querySelectorAll(".spec-label");
    let specsValue = document.querySelectorAll(".standard");
    for (let spec in specsKey) {
        let salesSpecKey = specsKey[spec];
        if (salesSpecKey.innerHTML.toLowerCase() == "sales status") {
            salesSpecKey.innerHTML = "Availability";
            let salesSpecsValue = specsValue[spec];
            if (salesSpecsValue.innerHTML.toLowerCase() == "active") {
                salesSpecsValue.innerHTML = "In Stock";
                let priceBlocks = document.querySelectorAll(".price-block");
                for (let priceBlock of priceBlocks) {
                    priceBlock.insertAdjacentHTML('afterbegin', '<div class="availability"><span class="badge success"><i class="fas fa-tags icon-white"></i> In Stock</span></div>');
                }
            }
            break;
        }
    }
});