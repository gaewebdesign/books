// filename: dumpTextWContentLoader.js
// Uses ContentLoader to create an XMLHTTPRequest and dumps the result to the browser window. 
// The request is for a file that resides at the address stored in the global URL. 
// Assumes that there is an element in the html file with id = "console". 
// This is where the text file will be dumped.

var URL = "cities.xml";  // constant url of file that will be dumped to browser window
	
// Called when the request object is finished loading.
// Because a reference to this function is stored as an attribute of
// the ContentLoader object, it is called with a reference
// to the ContentLoader object, and so we can get access to the req.
function allLoaded()
{	toConsole(this.req.responseText);
}          

function toConsole(data)
{	var console = document.getElementById('console');
	if (console!=null)
	{	var newline = document.createElement("div");
		console.appendChild(newline);
		var txt = document.createTextNode(data);
		newline.appendChild(txt);
	}
}

window.onload=function()
{	var contentLoader = new net.ContentLoader(URL, allLoaded);
}

	
