
// Eventhandler that gets executed after the page is loaded
// allLoaded creates all the UI elements and installs event handlers
window.onload=function()
{	
    var URL = "topics.xml";  // constant url of file that contains a subset of all the countries in the mysql database

    var contentLoader = new net.ContentLoader(URL, allLoaded );

}


function allLoaded()
{
 
	var TREE = this.req.responseXML;   
	var kids,len;
	var subString;
	kids=TREE.getElementsByTagName("topic");      
        for(i=0  ; i< kids.length ; i++) toConsole( kids[i].firstChild.nodeValue) ;
	toConsole( "-");

	kids=TREE.getElementsByTagName("question");      
        for(i=0  ; i< kids.length ; i++) toConsole( kids[i].firstChild.nodeValue) ;
	toConsole( "--");

	kids=TREE.getElementsByTagName("query");      
        for(i=0  ; i< kids.length ; i++){ 	
	
		subString =  kids[i].firstChild.nodeValue.replace("XXX","Africa") ;
		toConsole( subString );

}




}


