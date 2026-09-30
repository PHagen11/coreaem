let productData = {}
function generateSchema(productData) {
    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": ["Product", "Vehicle"],
                "name": productData?.name,
                "url": productData?.url,
                "description": productData?.description,
                "image": productData?.image,
                "manufacturer": {
                    "@type": "Organization",
                    "name": "White River Marine Group",
                    "founder": {
                        "@type": "Person",
                        "name": "Johnny Morris"
                    }
                },
                "brand": {
                    "@type": "Brand",
                    "name": productData?.brand?.name,
                    "url": productData?.brand?.baseUrl,
                    "sameAs": [
                        productData?.brand?.facebook,
                        productData?.brand?.instagram,
                        productData?.brand?.youtube,
                        productData?.brand?.tiktok
                    ]
                },
                "offers": {
                    "@type": "Offer",
                    "url": productData?.url,
                    "priceCurrency": productData?.currency,
                    "price": productData?.price,
                    "itemCondition": "https://schema.org/NewCondition",
                    "availability": "https://schema.org/InStock"
                },
                "vehicleModelDate": productData?.year,
                "category": productData?.segment,
                "bodyType": productData?.bodyType,
                "vehicleConfiguration": productData?.package,
                "vehicleInteriorType": productData?.interior,
                "vehicleEngine": productData?.motors,
                "additionalProperty": productData?.additionalProperty
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": productData?.breadcrumbs,
            }
        ]
    }
}

function waitForOwlCarousel() {
    return new Promise((resolve) => {
        const getImage = () =>
            document.querySelector(".image-carousel .owl-item.active img");

        const existingImage = getImage();

        if (existingImage) {
            resolve(existingImage);
            return;
        }

        const carousel = document.querySelector(".image-carousel .owl-carousel");

        if (!carousel) {
            resolve(null);
            return;
        }

        const observer = new MutationObserver(() => {
            const image = getImage();

            if (image) {
                observer.disconnect();
                resolve(image);
            }
        });

        observer.observe(carousel, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ["class", "src"]
        });
    });
}

function injectSchema(schema) {
    const existingSchema = document.querySelector(
        'script[type="application/ld+json"][data-generated-schema]'
    );

    if (existingSchema) {
        existingSchema.remove();
    }

    const schemaScript = document.createElement("script");

    schemaScript.type = "application/ld+json";
    schemaScript.dataset.generatedSchema = "true";
    schemaScript.textContent = JSON.stringify(schema, null, 2);

    document.head.appendChild(schemaScript);
}

async function getProductData() {
    const featuredImage = await waitForOwlCarousel();

    const modelInfo = document.querySelector(".model-price");

    if (!modelInfo || !featuredImage) return;

    // const baseUrl = window.location.origin;
    const modelUrl = window.location.href;
    const modelPathname = window.location.pathname;
    const modelYear = modelInfo.querySelector(".model-year")?.textContent.trim();
    const modelName = modelInfo.querySelector(".model-name")?.textContent.trim();
    const modelPrice = modelInfo.querySelector("#mpbPrices .price-value")?.textContent.trim().replace(/[^0-9.]/g, "");
    const modelPriceCurrency = modelInfo.querySelector("#mpbPrices .price-currency")?.textContent.trim();
    const modelDescription = document.querySelector("#modelDescription")?.textContent.trim();

    let modelPackage = modelInfo.querySelector(".package-details")?.textContent.split("\n")[0].trim();
    modelPackage = modelPackage.toLowerCase().includes("w/ ") ? modelPackage.split("w/ ")[1].trim() : modelPackage;

    // const brand = 
    //     modelUrl.includes("suntrackerboats") ? "SUN TRACKER Pontoons"
    //     : modelUrl.includes("trackerboats") ? "TRACKER Boats"
    //     : modelUrl.includes("rangerboats") ? "RANGER Boats"
    //     : modelUrl.includes("nitro") ? "NITRO Boats"
    //     : modelUrl.includes("tahoeboats") ? "TAHOE Boats"
    //     : modelUrl.includes("makoboats") ? "MAKO Boats"
    //     : modelUrl.includes("tritonboats") ? "TRITON Boats"
    //     : modelUrl.includes("regencyboats") ? "REGENCY Pontoons"
    //     : modelUrl.includes("hatterasyachts") ? "HATTERAS Yachts"
    //     : ""

    const brand =
        modelUrl.includes("suntrackerboats") ? { 
            name: "SUN TRACKER Pontoons",
            baseUrl: window.location.origin,
            facebook: "https://www.facebook.com/suntrackerboats",
            instagram: "https://www.instagram.com/suntrackerboats",
            youtube: "https://www.youtube.com/user/WeAreSUNTRACKERBoats",
            tiktok: "https://www.tiktok.com/@suntrackerboatsofficial" 
        }
        : modelUrl.includes("trackerboats") ? {
            name: "TRACKER Boats",
            baseUrl: window.location.origin,
            facebook: "https://www.facebook.com/trackerboats",
            instagram: "https://www.instagram.com/trackerboats",
            youtube: "https://www.youtube.com/c/trackerboats",
            tiktok: "https://www.tiktok.com/@trackerboatsofficial" 
        }
        : modelUrl.includes("rangerboats") ? {
            name: "RANGER Boats",
            baseUrl: window.location.origin,
            facebook: "https://www.facebook.com/rangerboats",
            instagram: "https://www.instagram.com/rangerboats",
            youtube: "https://www.youtube.com/user/rangerboatsTV",
            tiktok: "https://www.tiktok.com/@rangerboatsofficial" 
        }
        : modelUrl.includes("nitro") ? {
            name: "NITRO Boats",
            baseUrl: window.location.origin,
            facebook: "https://www.facebook.com/nitroboats",
            instagram: "https://www.instagram.com/nitroboats",
            youtube: "https://www.youtube.com/WeAreNITROBoats",
            tiktok: "https://www.tiktok.com/@nitroboatsofficial" 
        }
        : modelUrl.includes("tahoeboats") ? {
            name: "TAHOE Boats",
            baseUrl: window.location.origin,
            facebook: "https://www.facebook.com/tahoeboats",
            instagram: "https://www.instagram.com/tahoeboats",
            youtube: "https://www.youtube.com/@WeAreTAHOEBoats",
            tiktok: "https://www.tiktok.com/@tahoeboatsofficial" 
        }
        : modelUrl.includes("makoboats") ? {
            name: "MAKO Boats",
            baseUrl: window.location.origin,
            facebook: "https://www.facebook.com/makoboats",
            instagram: "https://www.instagram.com/makoboats",
            youtube: "https://www.youtube.com/c/makoboats",
            tiktok: "https://www.tiktok.com/@makoboatsofficial" 
        }
        : modelUrl.includes("tritonboats") ? {
            name: "TRITON Boats",
            baseUrl: window.location.origin,
            facebook: "https://www.facebook.com/tritonboats",
            instagram: "https://www.instagram.com/triton_boats_official",
            youtube: "https://www.youtube.com/@tritonboatsdotcom",
            tiktok: "https://www.tiktok.com/@tritonboatsofficial" 
        }
        : modelUrl.includes("regencyboats") ? {
            name: "REGENCY Pontoons",
            baseUrl: window.location.origin,
            facebook: "https://www.facebook.com/RegencyPontoonBoats",
            instagram: "https://www.instagram.com/regencyboats",
            youtube: "https://www.youtube.com/c/REGENCYBoats",
            tiktok: "" 
        }
        : modelUrl.includes("hatterasyachts") ? {
            name: "HATTERAS Yachts",
            baseUrl: window.location.origin,
            facebook: "https://www.facebook.com/HatterasYachts",
            instagram: "https://www.instagram.com/hatterasyachtsnc",
            youtube: "https://www.youtube.com/user/HatterasYachtsNC",
            tiktok: "" 
        }
        : ""

    const getModelSegment = () => {
        const segmentStart = modelPathname.indexOf('/') + 1;
        const segmentEnd = modelPathname.indexOf('/', segmentStart);
        return modelPathname
            .substring(segmentStart, segmentEnd)
            .replace(/-/g, ' ')
            .toUpperCase()
            .trim();
    }
    const getModelBodyType = () => {
        const bodyTypeStart = modelPathname.indexOf('/', 1) + 1;
        const bodyTypeEnd = modelPathname.indexOf('/', bodyTypeStart);
        return modelPathname
            .substring(bodyTypeStart, bodyTypeEnd)
            .replace(/-/g, ' ')
            .replace(/\//g, ' ')
            .toUpperCase()
            .trim();
    }
    const getModelFeatures = (feature) => {
        const modelFeaturesContainer = document.querySelector(".model-features");
        const modelFeatures = {}
        if (modelFeaturesContainer) {
            const categories = modelFeaturesContainer.querySelectorAll(".category .title");

            categories.forEach(category => {
                const featureTitle = category.textContent.trim();
                const featureList = category.nextElementSibling;
                if (featureList) {
                    const features = Array.from(featureList.querySelectorAll("li")).map(li => li.textContent.trim());
                    modelFeatures[featureTitle] = features;
                }
            })
        }
        return modelFeatures[feature]
    }

    const getMotorOptions = () => {
        const motorOptionsContainer = document.querySelector(".model-motors");
        const motorOptions = [];
        if (motorOptionsContainer) {
            let motorBrand = "";
            const motors = motorOptionsContainer.querySelectorAll("tr > td:first-of-type");

            motors.forEach(motor => {
                if (motor.classList.contains("motor-cat")) {
                    motorBrand = motor.textContent.trim();
                    return;
                }
                motorOptions.push({
                    "@type": "EngineSpecification",
                    "name": `${motorBrand} ${motor.textContent.trim()}`,
                    "engineType": "Outboard",
                    "fuelType": "Gasoline"
                })
            })
        }
        return motorOptions;
    }

    const getAdditionalProperty = () => {
        const specsContainer = document.querySelector(".model-specs");
        const additionalProperty = [];
        if (specsContainer) {
            const specLabels = specsContainer.querySelectorAll(".spec-label");
            let specValues = [];
            if (specsContainer.querySelector(".metric").style.display !== "none") {
                specValues = specsContainer.querySelectorAll(".metric");
            } else {
                specValues = specsContainer.querySelectorAll(".standard");
            }
            specLabels.forEach((label, index) => {
                const specName = label.textContent.trim();
                const specValue = specValues[index]?.textContent.trim();
                if (!specValue) return;
                additionalProperty.push({
                    "@type": "PropertyValue",
                    "name": specName,
                    "value": specValue
                })
            })
        }
        return additionalProperty;
    }

    const getBreadcrumbs = () => {
        const breadCrumbsContainer = document.querySelector("#breadcrumbs");
        if (!breadCrumbsContainer) return;
        const breadCrumbs = [];
        breadCrumbsContainer.querySelectorAll("a").forEach((breadCrumb, index) => {
            if (!breadCrumb) return;
            breadCrumbs.push({
                "@type": "ListItem",
                "position": index + 1,
                "name": breadCrumb.textContent,
                "item": breadCrumb.href
            })
        })
        const breadCrumText = breadCrumbsContainer.querySelector("p").textContent;
        if (breadCrumText) {
            const breadCrumbTextArr = breadCrumText.split("|");
            breadCrumbs.push({
                "@type": "ListItem",
                "position": breadCrumbTextArr.length,
                "name": breadCrumbTextArr.slice(-1)[0],
                "item": modelUrl
            })
        }
        return breadCrumbs
    }

    productData = {
        // baseUrl,
        url: modelUrl,
        image: featuredImage.currentSrc || featuredImage.src,
        year: modelYear,
        name: modelName,
        brand,
        price: modelPrice,
        currency: modelPriceCurrency,
        description: modelDescription,
        segment: getModelSegment(),
        bodyType: getModelBodyType(),
        package: modelPackage,
        motors: getMotorOptions() || [],
        interior: getModelFeatures("Interior") || [],
        additionalProperty: getAdditionalProperty() || [],
        breadcrumbs: getBreadcrumbs() || []
    };

    const schema = generateSchema(productData);
    console.log("Generated Schema:", schema);
    injectSchema(schema);
}

document.addEventListener("DOMContentLoaded", () => {
    getProductData();
});
