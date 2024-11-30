<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>

    <script language="javascript">
        function readXMLDocument( )
        {      
            var xmldoc,periodicTable,atoms,node;
            var name;
            
            document.write("HELLO ");
            xmldoc = document.all("elementsXML").XMLDocument;
            if(xmldoc == null ) document.write("xmldoc == null ");
            else
                document.write("xmldoc = " + xmldoc + "<br>");
               
            periodicTable = xmldoc.documentElement;
            
            document.write("<b>parse xml elements </b><br/>\n");
            atoms = periodicTable.firstChild;
            
            name = atoms.getElementsByTagName("NAME" );
            document.write("----- <br/>" );
 //           node = atoms.lastChild;
            
            document.write("=  " + periodicTable + "<br>" );
            document.write("=  " + name.item(0).nodeValue );
        }
        
</head>
</html>

