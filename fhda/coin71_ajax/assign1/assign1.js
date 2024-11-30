// filename:  assign1.js
// Uses an event handler to take the value in an input box and convert the value from kph (kilometers/hour) to mph (miles/hour)
// The answer is displayed below the input box.


  
var inputName="kilos";         // name of the added node for the input box
window.onload= initialize;     // initialize onload  rouine to initialize( )
 
// Eventhandler:  initialize( ) is called after the page is loaded, adds the GUI elements
function initialize( )
{

   var pnode=document.getElementById("pid");

   addNode(pnode, "input", inputName,"23");						// input text box
   addNode(pnode,"text","textNode"," kph ","" );				// simple textnode (kph)
   addNode(pnode, "button", "pushme" , "to mph","inline();");	// click button to convert kph to mph

// Not used: calls routine that throws a alert box with the converted mph number
// Included for future reference
//   addNode(pnode, "button", "pushme" , "to mph","push();");


}


// Callback routiine : inline
// Called when user hits submit button
// Writes kph text and converted mph
function inline()
{

 var kph = 0; 
 var mph = 0;
 
 kph = document.getElementById(inputName).value; 
  
 kph = trimZero( kph );
 if(kph=="") kph=0;  

 mph=  kph /1.609344;   // *54.68 /88;   54.68 miles is 88 km

 
 // Most times just interested in the closest integer value (rounding up)
 mph = Math.round(mph);
 
// wries the text to a line beneath the input box 
 toLine( "" + kph + " kph  is " +  mph + " mph ");
 

}



// Function to remove leading zeros in a number
// Reference
// http://www.trans4mind.com/personal_development/JavaScript/longnumMultiply.htm#o8%20Removing%20Leading%20Zeros
function trimZero( theNumber)
{

   while( theNumber.charAt(0) == "0" )
         theNumber = theNumber.substring(1, theNumber.length );
		 
		 
   return theNumber;

}

// routine to add a node to parent
// parent:  the parent of this node
// element:  the type of node
// nameId:   the name of this node
// text:     the text of this node
// callback:  a callback function for this node
function addNode(parent, element, nameId, text,callback) 
{ 
 var newNode = document.createElement(element); 
 parent.appendChild(newNode); 
 newNode.setAttribute("id", nameId); 
 newNode.setAttribute("name", nameId); 
 if( callback !=""){
 
 newNode.setAttribute("onclick",callback);
 
 }
 
 if (text != "") 
 { var textNode = document.createTextNode(text); 
   newNode.appendChild(textNode); 
 } 
 
 return newNode; 
} 


// Callback routine: toLine
// Called when user hits submit button
// Writes converted 'data' to another id below the kph input button
function toLine( data )
{
      
	var node = document.getElementById('console');
	 	
	if (node!=null)
	{	
	
			// Create a text node to hold the information
	       if(node.childNodes.length == 1 ){
				var newline = document.createElement("div");			   
				node.appendChild(newline);
				var txt = document.createTextNode(data);
				newline.appendChild(txt);
		     }else // Node is already there, just insert the data
			 {
					// From above, traverse through div and textnode
					node.lastChild.lastChild.nodeValue= data;				 
			 }
	}

}


// Callback routine: push
// Called when user hits submit button
// Throws an alert that with the converted mph value 
// This routine is not used, but kept as an example of an alert box
function push( )
{

var kph = document.getElementById(inputName).value;
var mph =  ""+ kph * 54.66 /88;

 // Assumes no one is interested in the decimal portion
 mph = mph.split(".");
 
 alert(""+ kph + " kph = " + mph[0]+"."+ mph[1].substr(0,2)  + " mph" );

}

