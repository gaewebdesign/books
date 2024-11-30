// filename: assign3.js
// Uses JSON to load a file (*.json) of content.
// Read the content and put into two drop-down menu tags
// The first tag is a list of CTIS Departments
// The second tag is a list of classes in each department
// When the second tag is selected, a course description is displayed 
// The request is for a local file. 

     
// Called when the request object is finished loading.
// 
function allLoaded()
{	
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


// Function to get the department selected, the value returned is the position in the menu (0,1,...)
function GetDepartmentSelected( )
{
    // node is a HTMLSelectElement
    var node = document.getElementById("selectDepartment");
	return node.value;

}


// Function to get the course number selected, the value returned is the position in the menu (0,1,2...)
function GetCourseSelected( )
{
 
	// node is a HTMLSelectElement    
	var node = document.getElementById("selectCourse");
	return node.value;

}


// loads the departments (COIN,CTIS,CAST) into the first drop-down menu
function loadDepartment( )
{

	var option;
	
	// Get the department in the .html file
	var node = document.getElementById("selectDepartment");	
		
	node.setAttribute("onmouseup","onDepartmentSelect();");

	// Quick way to clear out the options
	node.options.length=0;
	
	// Add to the node
	for(i=0; i<CTISCourses.departments.length ; i++  ){
	  option = document.createElement('option');
	  option.text  = CTISCourses.departments[i].name;
	  option.value = i ;    // use the index into the array (instead of the department name )
	  try{
			node.add( option , null); // for non-IE (Firefox) browsers
		}catch(ex){
		    node.add(option);		// for IE
		}

  }
  
}



// Load the Course number selection box with the courses relevant to the department	
// This is called from the eventhandler onDepartmentSelect
// index is the position of the department selected 
function loadCourseNumber( index )
{

	   var option;
	   var kids,targetNode;
    
			var node = document.getElementById("selectCourse");		
			
			node.setAttribute("onmouseup","onCourseSelect();");
			
			// quick way to remove previous options
			node.options.length=0;		
							
			// Now add all the courses to the drop down list
			for(j=0; j<CTISCourses.departments[index].courses.length ; j++  ){
				option = document.createElement('option');
				option.text  = CTISCourses.departments[index].courses[j].number ;
				option.value = j;                 // value will be 0,1,2...
				try {
						node.add( option , null); // for non-IE (Firefox) browsers
				}catch(ex){
						node.add(option);		// lousy IE
				}	   
			}
		

}// end of loadCourseNumber

// Display the 'department' and 'courseNumber' number and the title of the course 
function loadCourseTitle( department, courseNumber)
{
		
	var dept,number,title;

      dept = CTISCourses.departments[department].name;
	  number = CTISCourses.departments[department].courses[courseNumber].number;
	  title = CTISCourses.departments[department].courses[courseNumber].description;
	  toLine( dept + " " + number + " " + title );



}

window.onload=function()
{	

     allLoaded( );
}




// --------------------------------------------------------------------------------------------------------------------------------------
function toLine( data )
{
      
	var node = document.getElementById('courseDescription');
	 	
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


// Debugging (essentially  printf )
function toConsole(data)
{	var console = document.getElementById('console');
	if (console!=null)
	{	var newline = document.createElement("div");
		console.appendChild(newline);
		var txt = document.createTextNode(data);
		newline.appendChild(txt);
	}
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


// Traverse the CTISCourses array (initial code to learn syntax)
function Traverse( )
{
  var dept,name,desc;
  for(i=0 ; i < CTISCourses.departments.length ; i++){
            dept =  CTISCourses.departments[i].name
             
			toConsole( dept );
			for(j =0 ; j < CTISCourses.departments[i].courses.length ; j++) {
			    name =  CTISCourses.departments[i].courses[j].number ;
				desc =  CTISCourses.departments[i].courses[j].description; 
				toConsole(name + " " + desc);
			}
  
  }



}

