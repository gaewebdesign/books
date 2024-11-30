// filename:  assign1.js
// Uses an event handler to take the value in an input box and convert the value from kph (kilometers/hour) to mph (miles/hour)
// The answer is displayed below the input box.


  
window.onload= initialize;     // initialize onload  rouine to initialize( )
 
// Eventhandler:  initialize( ) is called after the page is loaded, adds the GUI elements
function initialize( )
{

   var pnode=document.getElementById("pid");
   var node;
   node = newNode(pnode, "input", "input2","textstuff");						// input text box
   node.type = 'radio';
   node.type = 'checkbox';

}


function newNode(parent, element, nameId, text) 
{ 

 var newNode = document.createElement(element); 
 parent.appendChild(newNode); 
// newNode.setAttribute("id", nameId); 
// newNode.setAttribute("name", nameId); 

 if (text != "") 
 { 
   var textNode = document.createTextNode(text); 
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

