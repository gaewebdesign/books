// filename: jsonExample.js
// Uses the data stored in cities.json file with cities in it and dumps the result to the browser window. 
// Assumes that there is an element in the html file with id = "console". 
// This is where the data from cities.json will be dumped.

// Prints all the data in the USCities object to console
function printAllCities()
{	var message = "";
	for ( i = 0; i < USCities.states.length; i++)    // for each state
	{	currentState = USCities.states[i];
		for (j = 0; j < currentState.cities.length; j++)
			message+= currentState.cities[j] + ", ";
	}
	toConsole(message);
}      

// prints just one city to console
function printOneCity()
{	toConsole(USCities.states[0].cities[0]);
}

// prints "data" to console
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
{	printOneCity();
	printAllCities();
}

