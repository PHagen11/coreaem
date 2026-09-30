function torWarrantyPromo() {
  // Create a trusted types policy with fallback for unsupported browsers
  const policy = window.trustedTypes?.createPolicy("torWarrantyPromoPolicy", {
    createHTML: (input) => input,
  });

  // Helper function to safely create trusted HTML with fallback
  const createTrustedHTML = (html) => {
    return policy ? policy.createHTML(html) : html;
  };

  let priceBlockLarge = document.querySelector(
    ".price-block.show-for-large hr",
  );
  let priceBlockSmall = document.querySelector(
    ".price-block.hide-for-large hr",
  );
  let modelTitleContainer = document.querySelector(".mname");

  let modelTitleHeader = modelTitleContainer
    .querySelector("h1")
    .innerHTML.trim();
  let condition = modelTitleContainer
    .getAttribute("data-condition")
    .toLowerCase();
  const promoBug = modelTitleHeader.includes("2025")
    ? "2"
    : modelTitleHeader.includes("2024") || modelTitleHeader.includes("2023")
      ? "3"
      : "";

  const promoModels = [
    { title: "Tracker Off Road OX400", offer: "500" },
    { title: "Tracker Off Road Ox EV", offer: "500" },
    { title: "Tracker Off Road 600", offer: "750" },
    { title: "Tracker Off Road 600 EPS", offer: "750" },
    { title: "Tracker Off Road 600 EPS LE", offer: "750" },
    { title: "Tracker Off Road 800SX", offer: "1000" },
    { title: "Tracker Off Road 800SX LE", offer: "1000" },
    { title: "Tracker Off Road 800SX Crew", offer: "1000" },
    { title: "Tracker Off Road 800SX LE CREW", offer: "1000" },
  ];

  if (condition.includes("new") && promoBug !== "") {
    for (let model of promoModels) {
      if (modelTitleHeader.slice(5) === model.title) {
        priceBlockLarge.parentElement.classList.add("hasPromo");
        priceBlockSmall.parentElement.classList.add("hasPromo");
        if (
          modelTitleHeader.slice(0, 4) !== "2025" &&
          modelTitleHeader.slice(0, 4) !== "2026"
        ) {
          const giftCardImgLarge = createTrustedHTML(
            `<img class="promo-gift-card-lg" src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2026/tor-gift-card/2025-GiftCard-Bug-WPurchase-White-GiftCard-Bug-${model.offer}.png" alt="${model.offer} gift card offer" style="width: 225px !important; display: inline-block !important; margin: 10px auto !important; padding: 0 10px !important;">`,
          );
          const giftCardImgSmall = createTrustedHTML(
            `<img class="promo-gift-card-sm" src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2026/tor-gift-card/2025-GiftCard-Bug-WPurchase-White-GiftCard-Bug-${model.offer}.png" alt="${model.offer} gift card offer" style="width: 200px !important; max-width: 100% !important; display: block !important; margin: 10px auto !important; padding: 0 10px !important;">`,
          );
          priceBlockLarge.insertAdjacentHTML("beforebegin", giftCardImgLarge);
          priceBlockSmall.insertAdjacentHTML("beforebegin", giftCardImgSmall);
        }
        if (
          modelTitleHeader.slice(5) !== "Tracker Off Road OX400" &&
          modelTitleHeader.slice(5) !== "Tracker Off Road Ox EV"
        ) {
          const warrantyImgLarge = createTrustedHTML(
            `<img class="promo-warranty-lg" src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2026-tor-warranty/tor-price-sign-bugs-${promoBug}-year.png" alt="${promoBug} year warranty" style="width: 200px !important; display: inline-block !important; margin: 10px auto !important; padding: 0 10px !important;">`,
          );
          const warrantyImgSmall = createTrustedHTML(
            `<img class="promo-warranty-sm" src="https://assets.whiterivermg.com/content/dam/wrmg/events-and-promos/2026-tor-warranty/tor-price-sign-bugs-${promoBug}-year.png" alt="${promoBug} year warranty" style="width: 200px !important; max-width: 100% !important; display: block !important; margin: 10px auto !important; padding: 0 10px !important;">`,
          );
          priceBlockLarge.insertAdjacentHTML("beforebegin", warrantyImgLarge);
          priceBlockSmall.insertAdjacentHTML("beforebegin", warrantyImgSmall);
        }
      }
    }
  }
}
