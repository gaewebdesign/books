<?xml version="1.0"?>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

  <!--
  Table of Elemenets
  Atomic Number,Symbol,Name,AtomicWeight,Melting Point, Boiling Point, Atomic Radius ,State
 -->

  <xsl:variable name="srt" select ="298" />

  <xsl:template match="/">
    <xsl:apply-templates/>   
  </xsl:template>
    
  <xsl:template match="PERIODIC_TABLE">
    <head>
      <title>
        PERIODICAL TABLE
      </title>
    </head>
    <body>

      <H1>
        <center>
          PERIODICAL TABLE
        </center>
      </H1>

      <table border="1">
        <tr bgcolor="8080ff">
          <th>Atomic Number</th>
          <th>Symbol</th>
          <th>Name</th>
          <th>Atomic Weight</th>
          <th>
            Melting Point<br></br>

            <xsl:if test="ATOM/MELTING_POINT/@UNITS">
              (<xsl:value-of select="ATOM/MELTING_POINT/@UNITS"/>)
            </xsl:if>

          </th>
          <th>
            Boiling Point<br></br>
            <xsl:if test="ATOM/BOILING_POINT/@UNITS">
              (<xsl:value-of select="ATOM/BOILING_POINT/@UNITS"/>)
            </xsl:if>
          </th>
          <th>
            Atomic Radius<br></br>
            <xsl:if test="ATOM/ATOMIC_RADIUS/@UNITS">
              (<xsl:value-of select="ATOM/ATOMIC_RADIUS/@UNITS"/>)
            </xsl:if>
          </th>
          <th>State<br/>
          <xsl:text>SRT=</xsl:text>
          <xsl:value-of select="$srt"/>
          </th>
        </tr>
        <xsl:apply-templates select="//ATOM">
<!-- 
         <xsl:sort data-type="number" select="ATOMIC_NUMBER"/>
-->
         <xsl:sort data-type="text" select="SYMBOL"/>  
          </xsl:apply-templates>
      </table>
    </body>
  </xsl:template >


  <xsl:template match="ATOM">
    <tr>
      <xsl:choose>
        <xsl:when test="position() mod 2 = 0 ">
          <xsl:attribute name="bgcolor">#abcdef</xsl:attribute>
        </xsl:when>
        <xsl:otherwise>
          <xsl:attribute name="bgcolor">#abaaef</xsl:attribute>
        </xsl:otherwise>
      </xsl:choose>
      <td><xsl:apply-templates select="ATOMIC_NUMBER"/></td>
      <td><xsl:apply-templates select="SYMBOL"/></td>
      <td><xsl:apply-templates select="NAME"/></td>
      <td><xsl:apply-templates select="ATOMIC_WEIGHT"/></td>
      <td><xsl:apply-templates select="MELTING_POINT"/></td>
      <td><xsl:apply-templates select="BOILING_POINT"/></td>
      <xsl:apply-templates select="ATOMIC_RADIUS"/>

    <xsl:choose>
      <xsl:when test="position() = last( ) ">
        <tr bgcolor="abaaef">
          <td>
            <xsl:value-of select="last()"/> Elements
          </td>
          </tr>
      </xsl:when>
      <xsl:otherwise>
      </xsl:otherwise>
    </xsl:choose>
    </tr>
    
  </xsl:template>

  <xsl:template match ="ATOMIC_NUMBER">
    <xsl:value-of select="."/>
  </xsl:template>

  <xsl:template match ="SYMBOL">
    <xsl:value-of select="."/>
  </xsl:template>

  <xsl:template match ="NAME">
    <xsl:value-of select="."/>
  </xsl:template>

  <xsl:template match ="ATOMIC_WEIGHT">
    <xsl:value-of select="."/>
  </xsl:template>

  <xsl:template match ="MELTING_POINT">
    <xsl:value-of select="."/>
  </xsl:template>

  <xsl:template match ="BOILING_POINT">
    <xsl:value-of select="."/>   
  </xsl:template>


  <xsl:template match="ATOMIC_RADIUS">
      <xsl:variable name="meltingpoint" select="../MELTING_POINT"/>
      <xsl:variable name="boilingpoint" select="../BOILING_POINT"/>
      <xsl:variable name="radius" select="."/>  
      <xsl:variable name="atomicradius" select="$radius *10 "/>
    <td>
      <xsl:value-of select="$radius"/>
    </td>
    <td>
    <html xmlns:v="urn:schemas-microsoft-com:vml">
      <style>
        v\:*{behavior: url(#default#VML);}
      </style>

<!--   Melting Point and Boiling Point less than SRT 
       Reallly need only one compare since melting point is always less than boiling point
       But do both compares to check logical and

       Set the various values to set the oval
-->
 
      <xsl:choose>

        <xsl:when test="($meltingpoint &lt; $srt) and  ($boilingpoint &lt; $srt)">
          <v:oval style="width:{$atomicradius}px; height:{$atomicradius}px" filled="false" />
        </xsl:when>

        <xsl:when test =" ($meltingpoint &lt; $srt) and  ($boilingpoint &gt; $srt)">
          <v:oval style="width:{$atomicradius}px; height:{$atomicradius}px;" fillcolor="white"/>
        </xsl:when>

        <xsl:otherwise>
         <v:oval style="width:{$atomicradius}px; height:{$atomicradius}px;" fillcolor="blue"/>
          
       </xsl:otherwise>

      </xsl:choose>

    </html>


      </td>

    
  </xsl:template >
</xsl:stylesheet>