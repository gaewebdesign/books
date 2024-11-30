// filename: assign4.js
// 
// Uses url of a php servlet that takes an SQL query for the world db and returns an
// XML document with the reply.
// url = "http://krypton.fhda.edu/ajax/worldquery.php";
// The user selects from four topics and answers a question about world geography.
// The user may answer more than once and clicks buttons to make a guess or get the answer

// Object to keep some global values
// TREE		the XML data received back from the server
// TREE_TOPICS  topics,questions,query read from an XML file
// TOPICINDEX   the radio button selected (1,2,3 or 4)
// COUNTRYINDEX index into the TREE array
// GOTANSWER	is set when the answer is retrieved and cleared for each new topic question
var myGlobals = { TREE: null , TREE_TOPICS:null ,  TOPICINDEX:0 , COUNTRYINDEX:0 , GOTANSWER:0 };


// Compare the users guess against the possible solution(s)
// Return true if a solution is found
// guess/answers converted to lower case
// TOADD:  remove white space in guess,actual
// use regular expression to allow  guess to be less exact
// example,  Helinski was returned with two different spellings
function checkguess(guess, actual )
{

        var retval = false;
	guess = guess.toLowerCase( );
	actual = actual.toLowerCase( );

       if( guess == actual ) retval = true;

              return retval;
}


// Eventhandler that gets executed after the page is loaded
// allLoaded creates all the UI elements and installs event handlers
window.onload=function()
{	

    var URL,contentLoader;

    URL = "topics.xml";  // constant url of file that contains  the topics, questions and mysql queries
    // Do this if topics hasn't been read in yet.
    if(myGlobals.TREE_TOPICS == null )
    contentLoader = new net.ContentLoader(URL, readTopics);


    URL = "countrydata.xml";  // constant url of file that contains a subset of all the countries in the mysql database
    contentLoader = new net.ContentLoader(URL, allLoaded);


}

function readTopics( ) 
{

	var tree = this.req.responseXML;   
	var topic,question,query,len=0;


	topic		= tree.getElementsByTagName("topic");      
	question	= tree.getElementsByTagName("question");      
	query		= tree.getElementsByTagName("query");      
        len = topic.length;

        myGlobals.TREE_TOPICS = new Array(len);
        for( i = 0 ;  i< len ; i++ ) {
		myGlobals.TREE_TOPICS[i] = new Array(3)
                myGlobals.TREE_TOPICS[i][0] =    topic[i].firstChild.nodeValue ;
                myGlobals.TREE_TOPICS[i][1] =    question[i].firstChild.nodeValue ;
                myGlobals.TREE_TOPICS[i][2] =    query[i].firstChild.nodeValue ;

	}

/* Debugging Code
      for(i=0 ; i<len ; i++)
      		for(j=0 ; j<3 ; j++)
                toConsole( myGlobals.TREE_TOPICS[i][j] );
*/

}



// Create the text for each radio button, can be 0 based....
function GetTopic(index )
{
// Getter function to hide the array
// TODO: maybe look at this to also make it 1 based?
       return  myGlobals.TREE_TOPICS[index][0];
}



function GetQuestion (index )
{
// Getter function to hide the array
// Note that the radio buttons are 1 based, so subtract 1

        return  myGlobals.TREE_TOPICS[index-1][1];
}

// Note that the radio buttons are 1 based, so subtract 1
function GetQuery (index )
{
// Getter function to hide the array

        return  myGlobals.TREE_TOPICS[index-1][2];

}




// Called when the request object is finished loading.
// Because a reference to this function is stored as an attribute of
// the ContentLoader object, it is called with a reference
// to the ContentLoader object, and so we can get access to the req.
function allLoaded()
{
      
	// Save the XML country data into the tree global
        // This is the response from the server with all the country answers 
	myGlobals.TREE = this.req.responseXML;   

	// Create all the UI Elements
	CreateRadioButton( );      // Radio Buttons for user to click to select the topic
	CreateSubmitButton( );     // Button for user to click to get the question
	CreateAnswerTextBox( );    // Text box for user to enter answer
	CreateCheckGuessButton( ); // Button for user to click to check guess
	CreateAnswerButton( );     // Button for user to click to get the answer
   

}


// Get the user's guess to the topic question entered in the text box
function GetGuess()
{

  var guess="";

  guess =  document.getElementById("inputGuess" ).value ;

  return guess;

}

// Erase the guess in the textbox, called when the next topic  button clicked
function eraseGuess ( )
{

  document.getElementById("inputGuess" ).value = "";

}


// Eventhandler: Give the user feedback on the guess
function makeGuessBox (  )
{

        var XMLStream = this.req.responseXML;			// query response from the server
	var kids = XMLStream.getElementsByTagName("item");	// parse through the file and get the item nodes which contain the countries
        var len = kids.length;					// get the number of answers
        var found=false;
        var guess,solution="";

       // Get the guess from the input text box
       guess = GetGuess( ); 

       // Iterate through all the possible answwers 
       for(i=0 ; i < len && found==false ; i++ ){
		
		solution = kids[i].firstChild.nodeValue;          // iterate through all the answers
		found = checkguess(guess, solution );             // if match is found, loop kicks out
	}

        if(len==0 && guess=="") found = true;			// not always an answer

	if( found == true ){
        guess = guess + " is correct ";
        }else
        guess = guess + " is incorrect, you may try again  ";                

	if(myGlobals.GOTANSWER == true) 
		guess +=  " (you already have the answer )";
	


	toLine("guess", guess );				// finally give user feedback

}




// Creates the ContentLoader object that contains the query and sends it along to the servlet
// Take the mysql 'QUERY' and then calls the 'eventhandler'
// This gets called when the user wants the answers or makes the guess 
function makeAndSendQuery(QUERY, eventhandler )
{
	var URL = "http://krypton.fhda.edu/ajax/worldquery.php";
	var contentLoadper = new net.ContentLoader(URL, eventhandler, errorFunction, "POST", QUERY);

}

// Display the response from the servlet. Because makeAnswerBox is the callback function for the 
// ContentLoader object, it is ContentLoader that calls this function when the response is ready. 
// Therefore, "this" refers to the ContentLoader object, which has the attribute "req.responseText".
function makeAnswerBox()
{
 
	// Don't let user get answer before solving
	myGlobals.GOTANSWER= true ;

        extractAnswers( this.req.responseXML);

//	var divTag = document.getElementById("answer");
//	divTag.firstChild.nodeValue += this.req.responseText;

//	This is already done, the XML data in req.responseXML gets parsed
//       Note that in your Assignment #5, you will want to look at req.responseXML

}


// called by the ContentLoader when there is an error with the request
function errorFunction()
{
	var divTag = document.getElementById("answer");
	divTag.firstChild.nodeValue += "ERROR ACCESSING DATABASE: " + this.req.responseText;

}




// function to construct the mysql query to the world datatbase
function constructQuery( )
{

        var query;
	// Get all the country names from the XML file
	var kids = myGlobals.TREE.getElementsByTagName("item");
	// Use the same COUNTRYINDEX for the question
	var country = kids[ myGlobals.COUNTRYINDEX ].firstChild.nodeValue ;


	// DONE:  read query from an XML file 
        // this was done once at startup and is saved in an array
        query = GetQuery(myGlobals.TOPICINDEX);

        // replace XXX in the query with 'country' (note the quotes )
        query = query.replace("XXX","'" + country + "'");

	return "q=" + query;

}




// Return the selected radio button (1,2,...)
function GetRadioButtonSelected( )
{

	var pnode,checked=false;
	  
	pnode =  document.getElementsByName("topicName");

//        debug("pnode is " + pnode );		  // pnode is a HTMLCollection object
//	  debug("pnode[0] is " + pnode[0] );   	  // pnode[0] is a HTMLInputElement object

          // iterate until the first checked button
	for(i=0 ; i< pnode.length && checked==false ; i++){
	     checked = pnode[i].checked;

	 }
	   
	   return i;
}

// EventHandlers ***************************************************************
// Eventhander:  GetAnswer is attached to CreateAnswerButtton( )
function CreateAnswerHandler( )
{

   var query ;

   // Construct the query based on the topic selected
   query =  constructQuery( );

   eraseConsole( );

   // Send the query and let makeAnswerBox handle the return 
   makeAndSendQuery( query , makeAnswerBox);


}


//Eventhandler:   called when the user clicks on the CheckGuess box
function CheckGuessHandler( )
{
	var  query;

        query = constructQuery( );

	// Send the query off and return to another handler (checkguessBox)
        makeAndSendQuery( query, makeGuessBox); 

}


// EventHandler:  called when the Submit Button is selected
// This is where COUNTRYINDEX and TOPICINDEX values get updated
// Gets the country and topic index values, and creates the question
function constructQuestionHandler( )
{

        var question;

//	Get all the department names from the XML file
	var kids = myGlobals.TREE.getElementsByTagName("item");

	// Add to the node
	myGlobals.COUNTRYINDEX = Random( kids.length );
	var country = kids[myGlobals.COUNTRYINDEX].firstChild.nodeValue ;


//	DONE: Replace this with reading the question from an XML file
	myGlobals.TOPICINDEX =  GetRadioButtonSelected ( );

	
	// Get the question (has XXX instead of country)
	question = GetQuestion(myGlobals.TOPICINDEX );

	// Repplace XXX with the actual country name 
	question = question.replace("XXX", country );


    myGlobals.GOTANSWER = 0;		// Clear out flag
    toLine('questionTag', question);	// Send out the question
    toLine('guess',"");			// Erase the previous guess feedback to the user
    eraseConsole( );			// Erase the previous solutions
    eraseGuess ( );			// Erase the previous guess from the input box


}


// UI Elements ******************************************************************	

// UI Element;  Create the submit button when the user wants to check guess
function CreateSubmitButton( )
{
   var pnode,theNode;
   
   var pnode = document.getElementById("submitButton");
   
   theNode = addNode(pnode, "button", "SubmitButtonName", "Generate Topic Question","constructQuestionHandler();");


}




// UI Element:  Create the input answer text box
function CreateAnswerTextBox( )
{

	var pnode=document.getElementById("pid");

	addNode(pnode, "input", "inputGuess","23");				// input text box


}



// UI Element:  Create the radio buttons for the topics
function CreateRadioButton( )
{
	var pnode;
	var breakElement;
	var theNode;
	
	var topics = new Array( 'World Capitals' , 'World Continents', 'World Languages', 'World Population');

//	TODO:  read the topic questions from XML file
	
	// Get the pnode location in the html file
	pnode=document.getElementById('topic');
	
	for(i=0 ; i < topics.length ; i++){
	
	 // Add a radio button
         theNode = addNode(pnode, 'input', 'topicName','23');	
	 theNode.type = 'radio';
	 if(i==0) theNode.checked = "true";	 
	 
	 // Add the text and a line break
	 addNode(pnode,"text","Country", GetTopic(i) );
	 breakElement = document.createElement('br');
	 pnode.appendChild( breakElement );
			
	}
	
	
}

// UI Element: Button for the user to click to get all the answers
function CreateAnswerButton( )
{

   var pnode,theNode;
   
   var pnode = document.getElementById("getanswerButton");
   
   theNode = addNode(pnode, "button", "GetAnswerButtonName", "Get the Answer(s)");
   theNode.onclick = CreateAnswerHandler;


}


// UI Element: Button for user to click to check guess
function CreateCheckGuessButton( )
{

   var pnode,theNode;
   
   var pnode = document.getElementById("checkguessButton");
   
   theNode = addNode(pnode, "button", "CheckGuessButtonName", "Check Your Guess");
   theNode.onclick = CheckGuessHandler;


}


// Extract the answers from the XMLSTREAM and send to console
function extractAnswers( XMLStream )
{
	var kids = XMLStream.getElementsByTagName("item");
        var len = kids.length;

        for(i=0  ; i< len ; i++){
		toConsole( kids[i].firstChild.nodeValue) ;
	}

       if(len==0)
		toConsole( "none");

}


