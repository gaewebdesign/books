<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/TR/WD-xsl">

 <!--
  Table of Elemenets
  Atomic Number,Symbol,Name,AtomicWeight,Melting Point, Boiling Point, Atomic Radius ,State
 -->
  <xsl:template match="/">
    <html>
      <xsl:apply-templates/>
    </html>
  </xsl:template >

  <xsl:template match="PERIODIC_TABLE">
    <html>
    <table border="1">
      <tr>
        <th>Atomic Number</th>
        <th>Symbol</th>
        <th>Atomic Weight</th>
        <th>Melting Point</th>
        <th>Boiling Point</th>
        <th>Atomic Radius</th>
        <th>State</th>
      </tr>
      <xsl:apply-templates/>
    </table>
    </html>
  </xsl:template >


  <xsl:template match="ATOM">
    <tr>
      <td>
    <xsl:value-of select="ATOMIC_NUMBER"/>
     </td>
      
     <td>
        <xsl:value-of select="SYMBOL"/>
     </td>
       
     <td>
          <xsl:value-of select="NAME"/>
     </td>
       
      <td>
            <xsl:value-of select="ATOMIC_WEIGHT"/>
     </td>
      
      <td>
            <xsl:value-of select="MELTING_POINT"/>
      </td>
      
      <td>
                <xsl:value-of select="BOILING_POINT"/>
      </td>
                
      <td>
                  <xsl:value-of select="ATOMIC_RADIUS"/>
      </td>
       
      <td>
                  <xsl:value-of select="STATE"/>
     </td>
      
    </tr>

  </xsl:template >
  
  


</xsl:stylesheet>