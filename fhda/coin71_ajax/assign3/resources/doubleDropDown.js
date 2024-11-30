// filename: doubleDropDown.js
// author: Elaine Haight, COIN 71, Winter '07
// Fills related double drop down lists for states and then cities from cities.json
// Assumes: html doc has two select nodes in it: selectState and selectCity
// Assumes: cities.json defines var USCities that contains an array of states containing cities.

// Inside an existing select node, this makes a drop down menu containing "items" as the options,
// the menu is enclosed by "enclosingTagId" (the select node's id) and has "callback" as its onchange event.
function makeDropDown(items, enclosingTagId, callBack)
{	var selectNode = document.getElementById(enclosingTagId);
	selectNode.setAttribute("onchange", callBack);
	selectNode.options.length = 0;  // get rid of old options in the select node
	for ( i = 0; i < items.length; ++i)
	{	addNode (selectNode, "option", items[i], items[i]);
	}
}

//Creates a new element node, appends it to parent.
// if text != "", this also creates a text node with text in it and appends it to element.
//sets the name and id attributes to nameId.
//adapted From page 48 of Crane and Pescarello.
function addNode(parent, element, nameId, text)
{	var childEl = document.createElement(element);
	childEl.setAttribute("id", nameId);
	childEl.setAttribute("name", nameId);
	if (text != "")
	{	textNode = document.createTextNode(text);
		childEl.appendChild(textNode);
	}
	parent.appendChild(childEl);
	return childEl;
}

// looks through an array of objects to find the object with  
// a particular attribute/value pair. Returns the object.
function findObject (array, attribute, value)
{	var targetObject = null;
	// find the object in array with attribute == value
	for (i = 0; i < array.length && targetObject==null; ++i)
	{	if (eval("array[i]."+attribute) == value)
		{	targetObject = array[i];
		}
	}
	return targetObject;
}

// creates or modifies the drop down list containing the city names that depend on the
// state that the user chose.
function makeCityMenu()
{	var chosenState = document.getElementById("selectState").value;    // chosenState = "Oregon"
	// this is the "stateName" of the object I want to get the cities from in the array
	
	var stateObject = findObject(USCities.states, "stateName", chosenState);
	//now stateObject is the sub-object of USCities matching chosenState
	//so stateObject.cities is an array of strings containing just the cities in the chosenState

	var cityMenu = makeDropDown(stateObject.cities, "selectCity");
	// no callback function needed since we aren't doing anything with the city once chosen
}

// Creates the first drop down for States from the USCities var, which is in cities.json.
function makeStateMenu()
{	var stateList = new Array();     // will contain the words for our drop down menu
	for ( i = 0; i < USCities.states.length; ++i)
	{	stateList[i] = USCities.states[i].stateName;
	}
	var statesMenu = makeDropDown(stateList, "selectState", "makeCityMenu()");
}

window.onload=function()
{	makeStateMenu();
}

