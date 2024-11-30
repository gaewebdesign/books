     
            
           function node(name,  attribute, value )
           {
                 if(attribute=="")
                 document.write(  "<"+ name + ">");
                 else
                 document.write("<" + name + " " + attribute + " >");
                 
                 
                 document.write(  "" + value );  
                 
                     
                 document.writeln(  "</"+ name + ">");
          
           }
           
            
            
           function DoAtomNode( a )
           {
           
                var attr,str, rvalue,tag ;
                                           
                document.writeln(  a.childNodes(0).tagName  );
                document.writeln(  a.childNodes(1).tagName  );
                              
 //             document.write("child len =" + a.childNodes.length);
 
 
                for(i=0;i< a.childNodes.length;i++){
                  str="";
                  try{
                       
                       tag = a.childNodes(i).tagName;
                       
                       
//                                document.write("LEN = " +  a.getElementsByTagName("tag")[0].attributes.length );
                              try{
                                    attr = a.getElementsByTagName("tag")[0].attributes[0];
                                    document.writeln( "ATTRIBUTE LENGTH=" + attr.length );
                                    str =  attr.name  +  '="' +  attr.value + '"' ;
 //                                  node( tag, str ,a.getElementsByTagName(tag)[0].text  );
                                    
                                }catch(err0){
                                
                                }                  
                                          
                        node(tag,str,a.getElementsByTagName(tag)[0].text);   
                       
                   }catch(err){
                   
                   
                   }
                   
               
}
 
 
 /*              
                node("NAME","" ,a.getElementsByTagName("NAME")[0].text );
                node("ATOMIC_WEIGHT","", a.getElementsByTagName("ATOMIC_WEIGHT")[0].text );
 //             node.write( a.getElementsByTagName("ATOMIC_WEIGHT")[0].text  +  " ");
                node("ATOMIC_NUMBER","",  a.getElementsByTagName("ATOMIC_NUMBER")[0].text  );
                node("BOILING_POINT","",  a.getElementsByTagName("BOILING_POINT")[0].text );
                node( "ATOMIC_RADIUS","", a.getElementsByTagName("ATOMIC_RADIUS")[0].text  );
                node( "OXIDATION_STATES","",a.getElementsByTagName("OXIDATION_STATES")[0].text  );

                attr = a.getElementsByTagName("BOILING_POINT")[0].attributes[0];
                str =  attr.name  +  '="' +  attr.value + '"' ;
                node( "BOILING_POINT", str ,a.getElementsByTagName("BOILING_POINT")[0].text  );

                attr = a.getElementsByTagName("MELTING_POINT")[0].attributes[0];
                str =  attr.name  +  '="' +  attr.value + '"' ;
                node( "MELTING_POINT","",a.getElementsByTagName("MELTING_POINT")[0].text  +  " ");
                
                node( "SYMBOL","",a.getElementsByTagName("SYMBOL")[0].text  +  " ");             
                node( "DENSITY","",a.getElementsByTagName("DENSITY")[0].text  +  " ");
                node( "ELECTRON_CONFIGURATION","",a.getElementsByTagName("ELECTRON_CONFIGURATION")[0].text  +  " ");
                node( "ELECTRONEGATIVITY","",a.getElementsByTagName("ELECTRONEGATIVITY")[0].text  +  " ");
                
                
                attr = a.getElementsByTagName("ATOMIC_RADIUS")[0].attributes[0];
                str =  attr.name  +  '="' +  attr.value + '"' ;
                node( "ATOMIC_RADIUS","",a.getElementsByTagName("ATOMIC_RADIUS")[0].text  +  " ");
                
                
                attr = a.getElementsByTagName("ATOMIC_VOLUME")[0].attributes[0];
                str =  attr.name  +  '="' +  attr.value + '"' ;
                node( "ATOMIC_VOLUME",str ,a.getElementsByTagName("ATOMIC_VOLUME")[0].text  +  " ");
                
                node("IONIZATION_POTENTIAL","",  a.getElementsByTagName("IONIZATION_POTENTIAL")[0].text  +  " ");
                
                
                 attr = a.getElementsByTagName("SPECIFIC_HEAT_CAPACITY")[0].attributes[0];
                 str =  attr.name  +  '="' +  attr.value + '"' ;
                 node( "SPECIFIC_HEAT_CAPACITY","", a.getElementsByTagName("SPECIFIC_HEAT_CAPACITY")[0].text  +  " "); 

                               
                attr = a.getElementsByTagName("THERMAL_CONDUCTIVITY")[0].attributes[0];
                str =  attr.name  +  '="' +  attr.value + '"' ;
                
                   rvalue = a.getElementsByTagName("THERMAL_CONDUCTIVITY")[0].text;              
                   node( "THERMAL_CONDUCTIVITY","", value  +  " ");

*/

/*
            
                node(  a.getElementsByTagName("ATOMIC_RADIUS")[0].hasChildNodes(  ) +  "<br>");
*/               
                
 //             document.write( a + "<br>" );
 //           document.write( boilingpont +  "<br>");
            
            
            
           }
           
           
           
           
           function WriteXML(xmldoc) 
           {
                var atom ;
 
 //          Get a few values
             atom = xmldoc.getElementsByTagName("ATOM");
 //          atomicweight = xmldoc.getElementsByTagName("PERIODIC_TABLE/ATOM/ATOMIC_WEIGHT");          
//           document.writeln(" atoms = ",atom.length );           
 //          document.writeln(  atom[0].hasChildNodes(  ) );
           
           
//           document.writeln(" atomic weight = ",atomicweight.length  );                                 
           
            // LOOP THROUGH THE NODES
            for(var i = 0; i < atom.length , i< 10; i++) {
                  
                 document.writeln("<ATOM>");
                  
                 try{   
                        DoAtomNode( atom[i] );
                 }catch(err){
                
                       document.writeln("erred out ");
                 }
                
                document.writeln("</ATOM>");
                document.writeln("");
    }
    
}  

            
        function loadXML()
        {
            var source;
            var xmldoc;
            xmldoc = new ActiveXObject("Microsoft.XMLDOM");
            xmldoc.async=false;
 //         document.write("loading xml file <br>");
            xmldoc.load ( "elements.xml");
                     
            document.write("<xmp>");
            WriteXML( xmldoc );          
                     
            document.write("</xmp>");
            
        
        }       
        