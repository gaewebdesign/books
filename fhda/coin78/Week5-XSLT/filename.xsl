<?xml version='1.0'?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/TR/WD-xsl">



<xsl:template match="/">
<html>
<body>
    <table border="1" bgcolor="ffeeaa">
      <tr>
        <th>Name</th>
        <th>Nickname</th>
        <th>Sex</th>      
        <th>Ranking</th>      
        <th>Address</th>      
        <th>Strength</th>      
        <th>Favorite Shot</th>      
        <th>Email</th>      
      </tr>
  
       <xsl:for-each select="address_book_nested/record">
      <tr>
      
        <td><xsl:value-of select="name/first_name "/>
        <xsl:value-of select="name/last_name"/></td>
        <td><xsl:value-of select="name/nick_name"/></td>
        <td><xsl:value-of select="name/sex"/></td>
        <td><xsl:value-of select="game/worldranking"/></td>
        
        <td>
        <xsl:value-of select="address/street_address "/>
        <xsl:value-of select="address/street_address_detail "/>
        <xsl:value-of select="address/city "/>
        <xsl:value-of select="address/state "/>      
        <xsl:value-of select="address/country"/>
        </td>        
        
        <td><xsl:value-of select="game/strength"/></td>
        <td><xsl:value-of select="game/favoriteshot"/></td>
        <td><xsl:value-of select="contact/email_address"/></td>
      </tr>
      </xsl:for-each>
      
      </table>
  
 
</body>  
</html> 
 
 
 <!--     
      
<score id="{@id}" film="{film}" composer="{composer}" releasedate="{year}" />
<xsl:apply-templates/>
</xsl:template>


<xsl:template match="grade"/>
<xsl:template match="film"/>
<xsl:template match="year"/>
<xsl:template match="composer"/>


<xsl:template match="scores">
  <scores>
  <xsl:apply-templates/>
  </scores>
-->
</xsl:template>
</xsl:stylesheet>

  