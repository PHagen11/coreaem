// import $ from 'jquery';
// import jQuery from 'jquery';
// import whatInput from 'what-input';

// window.$ = $;
// window.jQuery = jQuery;
//
// import Foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';


// $(document).foundation();

jQuery(document).ready(function($) {

    $('#gallery-1').lightGallery({
        selector: '.media-item',
        mode: 'lg-fade',
        thumbnail: true,
        loadYoutubeThumbnail: true,
        youtubeThumbSize: 'default',
        loadVimeoThumbnail: true,
        vimeoThumbSize: 'thumbnail_medium',
        youtubePlayerParams: {
            modestbranding: 0,
            showinfo: 0,
            rel: 0,
            controls: 0
        },
        vimeoPlayerParams: {
            byline: 0,
            portrait: 0,
            color: 'A90707'
        },

    });

    $('.mega-menu-trigger a').click(function() {
        var target = "."+$(this).data("target");
        $('.mega-menu-panel').not(target).removeClass('mega-menu-panel-open');
        $('.mega-menu-trigger a').not(this).removeClass('mega-menu-triggered');
        $(this).toggleClass('mega-menu-triggered');
        $(target).toggleClass('mega-menu-panel-open');
    });
});
