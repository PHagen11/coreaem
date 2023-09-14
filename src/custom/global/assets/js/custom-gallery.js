$(".gallery").each(function() {
  $(this).lightGallery({
    selector: '.media-item',
    mode: 'lg-fade',
    thumbnail: true,
    download: false,
    loadYouTubeThumbnail: true,
    youTubeThumbSize: 'default',
    loadVimeoThumbnail: true,
    vimeoThumbSize: 'thumbnail_medium',
    youTubePlayerParams: {
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