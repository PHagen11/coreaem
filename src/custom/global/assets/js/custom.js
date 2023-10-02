
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