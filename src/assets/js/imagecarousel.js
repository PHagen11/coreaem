
jQuery(document).ready(function() {
    jQuery('.owl-carousel').owlCarousel({
        thumbs: true,
        thumbsPrerendered: true,
        center: true,
        lazyLoad: true,
        items: 1,
        loop: true,
        nav:true,
        autoHeight: true,
        dots:false,
        navText:['<i aria-label="Next"></i>','<i aria-label="Previous"></i>']
    });
});
