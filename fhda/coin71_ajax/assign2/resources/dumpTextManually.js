// filename: dumpTextManually.js
// Contains functions that create an XMLHTTPRequest for Mozilla or IE, sends it
// and dumps the result to the browser window. The request is for a file that resides
// at the address stored in the global URL. Assumes that there is an element 
// in the html file with id = "console". This is where the text file will be 
// dumped. Code adapted from page 62 of "Ajax in Action"

var URL = "cities.xml";  // constant url of file that will be dumped to browser window
var req = null;    // the request object with which we communicate with the server
	
// Creates the request object, fills in its attributes and sends it to server.
function sendRequest(url, params, HttpMethod)
{	if (!HttpMethod)
	{	HttpMethod="GET";
	}
	req =initXMLHTTPRequest();  // creates the request object
	if (req)
	{	req.onreadystatechange=onReadyStateChange;  // fills in its attributes
		req.open(HttpMethod, url, true);
		req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		req.send(params);              // sends it to the server
	}
}

// Creates and returns an empty object that can be used to send our request 
// to the server, and to hold the reply when it comes back. This object 
// will be the correct type for the current platform, be it Mozilla or IE.
function initXMLHTTPRequest()
{	var newRequest = null;
	if (window.XMLHttpRequest)
	{	newRequest=new XMLHttpRequest();
	}
	else if (window.ActiveXObject)
	{	newRequest = new ActiveXObject ("Microsoft.XMLHTTP");
	}
	return newRequest;
}	

// Executes when the request's state has changed.
function onReadyStateChange()
{	var data = null;
	if (req.readyState == 4)   // READY_STATE_COMPLETE
	{	data = req.responseText;
	}
	else                       // req is still incomplete
	{	data = "loading...[" + req.readyState+"]";
	}
	toConsole(data);
}          

// writes data to the element named 'console'
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
{	sendRequest(URL);
}

	
