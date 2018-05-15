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

jQuery(document).ready(function() {

    jQuery('#gallery-1').lightGallery({
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
});
