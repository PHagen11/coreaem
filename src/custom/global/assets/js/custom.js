
//Custom function to update footer copyright year to current year.
window.onload = updateCopyright;
function updateCopyright() {
    try {
        var copyright = document.createTextNode("\u00a9");
        var div = document.getElementsByClassName("copyright")[0];
        div.innerText = div.innerText.replace(/\d/g, '').replace(/\u00a9/g, copyright.textContent + (new Date().getFullYear()));
    }
    catch
    {
    }
}

// jquery(document).ready(function() {

// 	$(".gallery").each(function() {
// 		$(this).lightGallery({
// 			selector: '.media-item',
// 			mode: 'lg-fade',
// 			thumbnail: true,
// 			download: false,
// 			loadYouTubeThumbnail: true,
// 			youTubeThumbSize: 'default',
// 			loadVimeoThumbnail: true,
// 			vimeoThumbSize: 'thumbnail_medium',
// 			youTubePlayerParams: {
// 				modestbranding: 0,
// 				showinfo: 0,
// 				rel: 0,
// 				controls: 0
// 			},
// 			vimeoPlayerParams: {
// 				byline: 0,
// 				portrait: 0,
// 				color: 'A90707'
// 			},
// 		});
// 	});
	
// });