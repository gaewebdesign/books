import java.awt.*;
import java.awt.event.*;
import javax.xml.parsers.*;
import org.w3c.dom.*;
//import java.lang.*;


class PeriodicalTable
{
	
	String[] name,symbol;
	String[] atomic_number,atomic_weight;
	String[] melting_point, boiling_point,atomic_radius;
	int counter=0,length=0;
	final static int ATOMIC_NUMBER = 1;
	final static int SYMBOL = 2;
	final static int NAME = 3;
	final static int ATOMIC_WEIGHT = 4;
	final static int MELTING_POINT = 5;
	final static int BOILING_POINT = 6;
	final static int ATOMIC_RADIUS = 7;
	   
		   
public PeriodicalTable( int len)
{
	name = new String[len];
	symbol = new String[len];
	
	atomic_number = new String[len];
	atomic_weight = new String[len];
	melting_point = new String[len];	
	boiling_point = new String[len];
	atomic_radius = new String[len];
	length=len;
}

public void DisplayData(int r)
{
	
System.out.print("[" + r + "]" );
System.out.print( "" + name[r] );
System.out.print(", ");
System.out.print( symbol[r]);
System.out.print(", ");
System.out.print( atomic_number[r]);
System.out.print(", ");
System.out.print( atomic_weight[r]);
System.out.print(", ");
System.out.print( boiling_point[r]);
System.out.print(", [");
System.out.print( melting_point[r]);
System.out.print("], ");
System.out.print( atomic_radius[r]);
System.out.println(" ");
	
}


public String GetData(int r, int  index)
{
	String retval=" ";
	switch( index){
	case ATOMIC_NUMBER:
			retval = atomic_number[r]; 
	   break;
	case SYMBOL:
		   retval = symbol[r];
	   break;
	case NAME:
		   retval = name[r];
	   break;
	case ATOMIC_WEIGHT:
		   retval = atomic_weight[r] ;
	   break;
	case MELTING_POINT:
		   retval = melting_point[r] ;
	   break;
	case BOILING_POINT:
		   retval = boiling_point[r] ;
	   break;
	case ATOMIC_RADIUS:
		   retval = atomic_radius[r] ;
	   break;	   
	   default:
	   break;
	 	
	}
	if(retval==null) retval=" ";
	return retval;
	
	
}
public void EnterData(int r, String ename, String val)
{	
  
   if(ename == "ATOMIC_NUMBER") 	atomic_number[r] = val;  
   if(ename == "SYMBOL") 			symbol[r] = val;
   if(ename == "NAME") 				name[r] = val;
   if(ename == "ATOMIC_WEIGHT") 	atomic_weight[r] = val;
   if(ename == "MELTING_POINT") 	melting_point[r] = val;
   if(ename == "BOILING_POINT")  	boiling_point[r] = val;
   if(ename == "ATOMIC_RADIUS") 	atomic_radius[r] = val;
  
}


}


class winListener extends java.awt.event.WindowAdapter
{
	
public void windowClosing(WindowEvent e){
	System.exit(0);
		
}
	

}

	
public class cten extends Canvas
{

static PeriodicalTable theTable;

	
public static void  displayDocument( String url)
{
		
	Document doc=null;
	NodeList nodes;
	int len=0;
    Node atomNode, propNode;
    String nodeName, nodeValue ;
			
    DocumentBuilderFactory dbf =  DocumentBuilderFactory.newInstance();
    DocumentBuilder db=null;
    
    try{
    		db = dbf.newDocumentBuilder();
    }catch(ParserConfigurationException pce){}
    
    
    try{
    	doc = db.parse(url);
    }catch(Exception e){}		
			
    nodes=doc.getElementsByTagName("ATOM");
      
	   len = nodes.getLength();
//	   len /= 10;
		  	      
		    theTable = new PeriodicalTable( len);
		  // Go through all ATOM elements   
		  for(int i=0 ;i<len ; i++){
			  nodeName="";
			  nodeValue="";
			  atomNode = nodes.item(i);
			  NodeList propList = atomNode.getChildNodes();	    	     
			  	    	  	    	     	
			  for(int j=0 ; j<propList.getLength()  ; j++){
			    	 propNode = propList.item(j);

			    	 if( propNode.getNodeType() == Node.ELEMENT_NODE){    	    	 
			           nodeName = propNode.getNodeName().trim();
			    	 }
			         
			 	    NamedNodeMap attr=null;	    	    	 	    	         
			    	 // Use to get unit attributes
			         if( propNode.hasAttributes() ){
			    	    	 attr = propNode.getAttributes();	    	        	 
//			    	    	 System.out.println("ATTR= "  + propNode.getAttributes().item(0).getTextContent() );    	        	 
			         }

			         
			         NodeList qNodes =propNode.getChildNodes();	 
			         if(qNodes.getLength() != 0)    	        	 
			         for(int k =0 ; k<qNodes.getLength( ) ; k++){
			        	if(qNodes.item(k).getNodeType() == Node.TEXT_NODE){
			        		nodeValue =  qNodes.item(k).getNodeValue().trim();
			        		theTable.EnterData(i, nodeName, nodeValue);

			        	}

			         }
			         
			  }// end of inner for loop
			  
		}// end of outer for loop 	
				
    
 
}
  
    
public void paint(Graphics g)
{
	
Color white			= new Color(187,187,187);	
Color blue			= new Color(75,83,243);
Color lightblue		= new Color(177,184,224);
Color violet		= new Color(251,218,252);
Color black			= new Color(0,0,0);
Color theColor      = white;

final int WIDTH=110, HEIGHT=29;
String []title={"ATOMIC NUMBER","SYMBOL","NAME","ATOMIC WEIGHT","MELTING POINT","BOILING POINT","ATOMIC RADIUS","STATE"};
int row,col;
String text;
Double radius,meltingpt,boilingpt,srt=new Double(200.);
			  		   		   

g.setFont( new Font("Sans-Serif", Font.PLAIN, 12 ));




try{
g.setColor(violet);
g.fillRect(WIDTH/2, 2*HEIGHT ,8*WIDTH,HEIGHT*112);
g.setColor(black);
}catch(Exception e){}

//Write the Header
g.setColor(lightblue);
g.fillRect(WIDTH/2, HEIGHT ,8*WIDTH,40);
g.setColor(black);


for(col = 0 ; col<title.length ; col++)
	g.drawString(title[col], (col+1)*WIDTH , HEIGHT+20);


// Write out each row of the periodical table
for(  row = 0 ; row< theTable.length ; row++ ){
	
	// Write the element properties
	for( col = 1 ; col< 8 ; col++){	
		 text = theTable.GetData( row, col);
	     g.drawString(text, col*WIDTH,  3*HEIGHT+  row*HEIGHT);		     
	}
		

	// Draw the STATE Oval
	try{
			    
		meltingpt = Double.valueOf( theTable.GetData( row, PeriodicalTable.MELTING_POINT));
		boilingpt = Double.valueOf( theTable.GetData( row, PeriodicalTable.BOILING_POINT));
		radius =  Double.valueOf( theTable.GetData( row, PeriodicalTable.ATOMIC_RADIUS));
				
		radius = radius * 10;     // Note: this requires JDK Ver 1.6
		
		int r=radius.intValue();
		// Hollow:  melting pt, boiling point < 298 Kelvin (SRT)
		// White:   melting pt < SRT < boiling point
		// Dark blue :  SRT <  melting point  & boiling point 
		
  		if(  boilingpt.compareTo(srt) < 0 ){
		    g.drawArc( col*WIDTH, 3*HEIGHT + row*HEIGHT -HEIGHT/2, r,r,0,360 );						
		}else if( meltingpt.compareTo(srt)<0 && boilingpt.compareTo( srt) >0 ){			
		    g.setColor(white);
		    g.fillArc( col*WIDTH, 3*HEIGHT + row*HEIGHT -HEIGHT/2, r,r,0,360 );			
		}else{			
	       g.setColor(blue);
	       g.fillArc( col*WIDTH, 3*HEIGHT + row*HEIGHT -HEIGHT/2, r,r,0,360 );
		} 	
		
		g.setColor(black);
		
	}catch(Exception e){
		
		
	}
	

}
	
		  

}

	
public static void main( String[] args)
{
 /*
		winListener w;      
         w = new winListener( );         
		AppFrame f = new AppFrame("Creating Window");
		f.setSize(1068, 768);
		f.setVisible(true);
		f.addWindowListener( w );
*/	
	  winListener w;      
      w = new winListener( );   
      
	  Frame f  = new Frame( );
	  f.setBounds(0,0,1080,700);
	  f.add ( new cten( ) );
	  f.addWindowListener(w);
	  f.setVisible(true);
	  
//	  displayDocument("http://153.18.145.30/~okamotor/elements.xml" );		
	  displayDocument( "elements.xml");
	  
//	   for(int index=0 ; index < theTable.length ; index++)
//	 	   theTable.DisplayData(index);
   	  
	  
	  

}	    	  

}
