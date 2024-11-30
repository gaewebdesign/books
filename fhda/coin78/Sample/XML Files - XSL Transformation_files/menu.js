function toggleMenu(id) {
	element = document.getElementById(id);
	element.className = (element.className.toLowerCase() == 'expanded'?'collapsed':'expanded');
}

onload = function() {
	// collapse these menus
	toggleMenu('submenuid');
	toggleMenu('submenuid2');
	toggleMenu('submenuid3');
	toggleMenu('submenuid4');
	toggleMenu('submenuid5');
}
