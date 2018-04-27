console.log('loading imagecarousel.js');

$(document).ready(function() {
    console.log('HERE!');
    $('.owl-carousel').owlCarousel({
        center: true,
        lazyLoad: true,
        items: 1,
        loop: true,
        nav:true,
        navText:['<i aria-label="Next"></i>','<i aria-label="Previous"></i>']
    });
});
