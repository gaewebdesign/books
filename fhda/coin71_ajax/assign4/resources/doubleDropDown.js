// filename: doubleDropDown.js
// author: Elaine Haight, COIN 71, Winter '07, 1 Feb 07
// Fills related double drop down lists for states and then cities from cities.json
// Uses an object for the drop down menus. The Object is called DropDown.

var cityMenu = null;

// a class that makes and updates a drop down menu containing "items" as the options,
// the menu is enclosed by "enclosingTagId" and has "callback" as its onchange event.
// this could be written "function DropDown(items, enclosingTagId, callBack)" or
// could be written "DropDown= function(items, enclosingTagId, callBack)"
function DropDown(items, enclosingTagId, callBack)
{	this.selectNode = document.getElementById(enclosingTagId);
	this.selectNode.onchange=callBack;
	this.updateItems(items);
}

// after the drop down menu is there, this changes the options on it to contain items
DropDown.prototype.updateItems=function(items)
{	this.selectNode.options.length = 0;  // get rid of old options in the select node
	for ( i = 0; i < items.length; ++i)
	{	addNode (this.selectNode, "option", items[i], items[i]);
	}
}

//creates a new element node, appends it to parent.
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

	if (cityMenu == null)   // first time making the city menu object 
		cityMenu = new DropDown(stateObject.cities, "selectCity"); // no callback needed here
	else                    // city menu already exists, so we just have to update its options
		cityMenu.updateItems(stateObject.cities);
}

// Creates the first drop down for States from the USCities var, which is in cities.json.
function makeStateMenu()
{	var stateList = new Array();     // will contain the words for our drop down menu
	for ( i = 0; i < USCities.states.length; ++i)
	{	stateList[i] = USCities.states[i].stateName;
	}
	new DropDown(stateList, "selectState", makeCityMenu);
}

window.onload=function()
{	makeStateMenu();
	makeCityMenu();
}

