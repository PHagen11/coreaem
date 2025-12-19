const imageBefore = document.querySelector('.image-before')
const imageAfter = document.querySelector('.image-after')
const sliderComponent = document.querySelector('.image-slider-container')
const sliderContainer = document.querySelector('.slider-container')
const sliderHandle = document.querySelector('.slider-handle')

const DEFAULT_SLIDER_CONTAINER_STYLES = {
    desktop: {
        position: 'absolute',
        top: '0',
        left: '50%',
        width: '3px',
        height: '100%',
    },
    mobile: {
        position: 'absolute',
        top: '50%',
        left: '0',
        width: '100%',
        height: '3px',
    }
}

let isDragging = false
let preloadedDesktopImages = []
let preloadedMobileImages = []

// const sliderDesktopImages = {
//     before: 'https://dev.rangerboats.test/content/dam/wrmg/ranger-fiberglass/2025/z-comanche-series/z521r/studio/25_R_Z521R_OH001.png',
//     after: 'https://dev.rangerboats.test/content/dam/wrmg/ranger-fiberglass/2025/z-comanche-series/z521r/studio/25_R_Z521R_OH005.png',
// }

// const sliderMobileImages = {
//     before: 'https://dev.rangerboats.test/content/dam/wrmg/ranger-fiberglass/2025/z-comanche-series/z521r/studio/25_R_Z521R_OH001-mobile.png',
//     after: 'https://dev.rangerboats.test/content/dam/wrmg/ranger-fiberglass/2025/z-comanche-series/z521r/studio/25_R_Z521R_OH005-mobile.png'
// }

const drag = (e) => {
    if (!isDragging) return

    const containerRect = sliderComponent.getBoundingClientRect()
    const cursorPosition = e.touches && e.view.innerWidth <= 600 ? e.touches[0].clientY
    : e.touches && e.view.innerWidth >= 601 ? e.touches[0].clientX 
    : e.clientX
    let x = e.type === "touchmove" && e.view.innerWidth <= 600 ? cursorPosition - containerRect.top : cursorPosition - containerRect.left

    if (x < 0) x = 0
    if ((e.type === "mousemove" || e.view.innerWidth >= 601) && x > containerRect.width) {
        x = containerRect.width
    } else if ((e.type === "touchmove" && e.view.innerWidth <= 600) && x > containerRect.height) {
        x = containerRect.height
    }

    if (e.view.innerWidth <= 600) {
        imageBefore.style.clipPath = `inset(${x}px 0 0 0)`
        sliderContainer.style.top = `${x}px`
    } else {
        imageBefore.style.clipPath = `inset(0 0 0 ${x}px)`
        sliderContainer.style.left = `${x}px`
    }
}

const showLoading = () => {
    const el = document.getElementById('image-slider-loading');
    if (el) el.style.display = 'flex';
}
const hideLoading = () => {
    const el = document.getElementById('image-slider-loading');
    if (el) el.style.display = 'none';
}

const loadSliderImages = (beforeSrc, afterSrc, callback) => {
    showLoading();
    let loaded = 0;
    const checkLoaded = () => {
        loaded++;
        if (loaded === 2) {
            hideLoading();
            if (callback) callback();
        }
    };
    imageBefore.onload = checkLoaded;
    imageAfter.onload = checkLoaded;
    imageBefore.src = beforeSrc;
    imageAfter.src = afterSrc;
}

const setSliderImagesForViewport = () => {
    if (window.innerWidth <= 600) {
        loadSliderImages(preloadedMobileImages[0], preloadedMobileImages[1], drag);
        imageBefore.style.clipPath = 'inset(50% 0 0 0)';
    } else {
        loadSliderImages(preloadedDesktopImages[0], preloadedDesktopImages[1], drag);
        imageBefore.style.clipPath = 'inset(0 0 0 50%)';
    }
}

const preloadImages = (desktopImages, mobileImages) => {
    preloadedDesktopImages = Object.values(desktopImages).map(image => {
        const img = new Image()
        return img.src = image
    })
    preloadedMobileImages = Object.values(mobileImages).map(image => {
        const img = new Image()
        return img.src = image
    })
    setSliderImagesForViewport()
}

document.addEventListener('DOMContentLoaded', () => {
    preloadImages(sliderDesktopImages, sliderMobileImages)
    if (window.innerWidth <= 600) {
        Object.keys(DEFAULT_SLIDER_CONTAINER_STYLES.mobile).forEach(key => {
            sliderContainer.style[key] = DEFAULT_SLIDER_CONTAINER_STYLES.mobile[key]
        })
    } else {
        Object.keys(DEFAULT_SLIDER_CONTAINER_STYLES.desktop).forEach(key => {
            sliderContainer.style[key] = DEFAULT_SLIDER_CONTAINER_STYLES.desktop[key]
        })
    }
})

window.addEventListener('resize', () => {
    if (window.innerWidth <= 600) {
        Object.keys(DEFAULT_SLIDER_CONTAINER_STYLES.mobile).forEach(key => {
            sliderContainer.style[key] = DEFAULT_SLIDER_CONTAINER_STYLES.mobile[key]
        })
    } else {
        Object.keys(DEFAULT_SLIDER_CONTAINER_STYLES.desktop).forEach(key => {
            sliderContainer.style[key] = DEFAULT_SLIDER_CONTAINER_STYLES.desktop[key]
        })
    }
    setSliderImagesForViewport()
})

sliderHandle.addEventListener('mousedown', () => {
    isDragging = true
})

document.addEventListener('mouseup', () => {
    isDragging = false
})

document.addEventListener('mousemove', drag)

sliderHandle.addEventListener('touchstart', (e) => {
    e.preventDefault()
    isDragging = true
}, { passive: false })

document.addEventListener('touchend', () => {
    isDragging = false
})

document.addEventListener('touchmove', drag, { passive: false })
