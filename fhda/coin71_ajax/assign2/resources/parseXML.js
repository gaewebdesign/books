// filename: parseXML.js
// Uses ContentLoader to create an XMLHTTPRequest and sends one node of the resulting
// XML doc to the browser window. 
// The request is for a file that resides at the address stored in the global URL. 
// Assumes that there is an element in the html file with id = "console". 
// This is where the text file will be dumped.

var URL = "cities.xml";  // constant url of file that will be parsed 

// Called when the request object is finished loading.
// Because a reference to this function is stored as an attribute of
// the ContentLoader object, it is called with a reference
// to the ContentLoader object, and so we can get access to the req.
function allLoaded()
{	// this time we use responseXML instead of responseText
	var xmlDoc = this.req.responseXML;

	// stateArray contains all the nodes that have tag "state"
	var stateArray = xmlDoc.getElementsByTagName("state");

	// DRILL DOWN FURTHER IN THE XML TREE
	// cityArray has all nodes in the 1st State that have tag "city"
	cityArray = stateArray[0].getElementsByTagName("city");

	// note that to get the text between the tags you must use 
	// firstChild.data
	display = cityArray[0].firstChild.data;
	toConsole(display);
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

	
