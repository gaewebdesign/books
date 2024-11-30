// filename: library.js
// Library Routines to use in projects


// Return a random number less than 'x'
function Random( x )
{

     return Math.floor( Math.random( ) * x );


}

// --------------------------------------------------------------------------------------------------------------------------------------
// Sends text to a particular 'tag' composed of the textual 'data'.
// Erases previous text
function toLine( tag, data )
{
      
	var node = document.getElementById(tag, data);

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

// Writes 'data' to a 'console' tag
function debug( data )
{

// Comment out the toConsole( ) to turn off debug
   toConsole( data );
   
}

// Writes to a 'console' tag
function toConsole(data)
{
	var console = document.getElementById('console');
	if (console!=null)
	{	var newline = document.createElement("div");
		console.appendChild(newline);
		var txt = document.createTextNode(data);
		newline.appendChild(txt);
	}
}

 
// Erase the console contents
function eraseConsole ()
{

	var console = document.getElementById('console');
	if (console!=null){

              var kids = console.childNodes; 
              toConsole("console obj = " + console );
              toConsole("kids = " + kids.length );    
              for(i= kids.length-1 ; i>=0 ; i--)
			console.removeChild( kids[i] );

	}


}



// Looks through an xml "tree" to find a node with a "tagname" and  
// a particular "attribute" / "value" pair. Returns the node if found 
// and returns null if no such node is found. 
function findNode (tree, tagName, attribute, value) 
{ var targetNode = null; 
 var nodeArray = tree.getElementsByTagName(tagName);  
 

 // find the first node in nodeArray with attribute == value 
 for (i = 0; i < nodeArray.length && targetNode==null; ++i) 
 { 
		if (nodeArray[i].getAttribute(attribute) == value)     
		{ 
				targetNode = nodeArray[i]; 
		} 
  
 } 
 return targetNode; 
} 
 
 
function addNode(parent, element, nameId, text,callback) 
{ 
 var newNode = document.createElement(element); 
 parent.appendChild(newNode); 
 newNode.setAttribute("id", nameId); 
 newNode.setAttribute("name", nameId); 
 
 if (text != "") 
 { var textNode = document.createTextNode(text); 
   newNode.appendChild(textNode); 
 } 
 
 if( callback !=""){
 
 newNode.setAttribute("onclick",callback);
 
 }

 
 
 return newNode; 
}

// -----------------------------------------------
// Code to traverse the XML file and display contents
// Only used in aid to learn to process the XML file
function Traverse( )
{

  
	var targetNode = findNode( tree,"department", "name", "CIS" );
    if( targetNode != null){
           toConsole( "1) " + targetNode.nodeName );
		   var kids = targetNode.getElementsByTagName("course");
		   
		   for(i=0 ; i < kids.length ; i++){
			   var className = kids.item(i).firstChild.nodeValue;
			   var classNumber = kids.item(i).attributes.getNamedItem("number").nodeValue;
			   toConsole( classNumber + ") " + className );
		   }
	}


}
 





