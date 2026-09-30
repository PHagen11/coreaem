function calculateOriginalPrice() {
    const priceBlocks = document.querySelectorAll(".price-block");
    console.log("priceBlock", priceBlocks)
    priceBlocks.forEach(price => {
        const savingsAmount = price.querySelector(".saving-price");
        if (savingsAmount) {
            const totalPrice = price.querySelector(".total h2");
            const priceBreakdownContainer = price.querySelector(".breakdown tbody");
            let originalPrice = 0;
            if (totalPrice) {
                originalPrice = 
                    Number(totalPrice.textContent.replace(/[^0-9]/g, "")) + 
                    Number(savingsAmount.textContent.replace(/[^0-9]/g, ""));
                const tr = document.createElement("tr");
                const td = {};
                td.label = "MSRP";
                td.content = originalPrice.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                });
                tr.innerHTML = `<td class="name">${td.label}</td><td class="price">${td.content}</td>`;
                priceBreakdownContainer.append(tr);
            }
        }
    })
}

document.addEventListener("DOMContentLoaded", calculateOriginalPrice);
