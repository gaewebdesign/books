
<?xml version='1.0'?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/TR/WD-xsl">



<xsl:template match="/">

         <address_book_nested>    
       <xsl:for-each select="address_book_nested/record">

         <record >  
           
           
         <firstname>
        <xsl:value-of select="name/first_name "/>
         </firstname>
         
         <lastname>
        <xsl:value-of select="name/last_name"/>
         </lastname>

         <nickname>
        <xsl:value-of select="name/nick_name"/>
         </nickname>

         <sex>
        <xsl:value-of select="name/sex"/>
         </sex>
        <xsl:value-of select="game/worldranking"/>
        
            
         </record >    

      </xsl:for-each>

           </address_book_nested>
  
 

 
 
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

  