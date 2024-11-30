// filename: assign2.js
// Uses ContentLoader to create an XMLHTTPRequest and dumps the result to the browser window. 
// The request is for a local file . 

    // GLOBAL variable to hold the XML file that is read in
    var tree ;


// Called when the request object is finished loading.
// Because a reference to this function is stored as an attribute of
// the ContentLoader object, it is called with a reference
// to the ContentLoader object, and so we can get access to the req.
function allLoaded()
{	

      // Save the XML data into the tree global
      tree = this.req.responseXML;
								
	  loadDepartment( );


}          



// Eventhandler:  Called when the department drop down list is selected, loads the course numbers in the next select box
function onDepartmentSelect( )
{

	loadCourseNumber( GetDepartmentSelected( ) );

} 


// Eventhandler:  Called when the course drop down list is selected
function onCourseSelect( )
{
    // When the course is selected, gets the selected department and course number and sends it to get displayed
	loadCourseTitle(GetDepartmentSelected( ) , GetCourseSelected ( ) );
}


// Function to get the department selected
function GetDepartmentSelected( )
{
    // node is a HTMLSelectElement
    var node = document.getElementById("selectDepartment");
	return node.value;

}


// Function to get the course number selected
function GetCourseSelected( )
{
 
	// node is a HTMLSelectElement    
	var node = document.getElementById("selectCourse");
	return node.value;

}




// Load the Department selection box with all the courses that are in the XML file
// This is called  from the event handler allLoaded( )
function loadDepartment( )
{

    var kids;	
	var option;
		
	var node = document.getElementById("selectDepartment");	
	
	
	node.setAttribute("onmouseup","onDepartmentSelect();");

	node.options[0]=null;

    // Get all the department names from the XML file
	kids = tree.getElementsByTagName("department");
	
	// Add to the node
	for(i=0; i<kids.length ; i++  ){
	  option = document.createElement('option');
	  option.text  = kids[i].attributes.getNamedItem("name").nodeValue ;
	  option.value = option.text ;
	  try{
			node.add( option , null); // for non-IE (Firefox) browsers
		}catch(ex){
		    node.add(option);		// lousy IE
		}

  }
  
}


// Load the Course number selection box with the courses relevant to the department	
// This is called from the eventhandler onDepartmentSelect
function loadCourseNumber( theDepartment )
{

	   var option;
	   var kids,targetNode ;//= findNode( tree,"department", "name", theDepartment );
    
			var node = document.getElementById("selectCourse");		
			
			node.setAttribute("onmouseup","onCourseSelect();");
			
			var len = node.options.length;
			
			// Clear previous option tags, dynamically deallocated so start from last
			for(i=len-1;i>=0;i--){
					node.options[i]=null;
			}
			
	   	    // Find the node in the XML file where "name" = theDepartment (CIS,COIN or CAST )
			targetNode = findNode( tree, "department","name",theDepartment);
			// Find all the courses that correspond to this node
			kids = targetNode.getElementsByTagName("course");
			
			// Now add all the courses to the drop down list
			for(i=0; i<kids.length ; i++  ){
				option = document.createElement('option');
				option.text  = kids[i].attributes.getNamedItem("number").nodeValue ;
				option.value = option.text;
				try {
						node.add( option , null); // for non-IE (Firefox) browsers
				}catch(ex){
						node.add(option);		// lousy IE
				}	   
			}
		

}// end of loadCourseNumber


function loadCourseTitle( department, courseNumber)
{
	var node=null, targetNode =null;
	
	targetNode= findNode( tree,"department", "name", department );
	
	node=findNode(targetNode,"course","number",courseNumber);
	
	if(node != null){
	  toLine(GetDepartmentSelected( ) +  " " + node.getAttribute("number") + "  " + node.firstChild.nodeValue);
	  
	}


}

window.onload=function()
{	
    var URL = "ctis_courses.xml";  // constant url of file that will be dumped to browser window

    var contentLoader = new net.ContentLoader(URL, allLoaded);
}




// --------------------------------------------------------------------------------------------------------------------------------------
function toLine( data )
{
      
	var node = document.getElementById('courseDescription');

//     var fchild= node.firstChild;
	 	
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



function toConsole(data)
{	var console = document.getElementById('console');
	if (console!=null)
	{	var newline = document.createElement("div");
		console.appendChild(newline);
		var txt = document.createTextNode(data);
		newline.appendChild(txt);
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
 
 
//Add a node with an optional callback routine (onclick)
//onselect
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
 
