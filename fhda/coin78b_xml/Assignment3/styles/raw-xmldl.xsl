<?xml version="1.0"?>
<!-- Generic stylesheet for viewing XML -->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    
  <!--
 This template will always be executed, even if this stylesheet is not run on the document root 
-->

  <xsl:template>

    <DIV STYLE="font-family:Courier; font-size:10pt; margin-bottom:2em">

      <!--
 Scoped templates are used so they don't interfere with the "kick-off" template. 
-->

      <xsl:apply-templates select=".">

        <xsl:template>
          <xsl:apply-templates/>
        </xsl:template>

        <xsl:template match="*">

          <DIV STYLE="margin-left:1em; color:gray">

            <
            <xsl:node-name/>
            <xsl:apply-templates select="@*"/>
            />

          </DIV>
        </xsl:template>

        <xsl:template match="*[node()]">

          <DIV STYLE="margin-left:1em">

            <SPAN STYLE="color:gray">
              <
              <xsl:node-name/>
              <xsl:apply-templates select="@*"/>
              >
            </SPAN>
            <xsl:apply-templates select="node()"/>

            <SPAN STYLE="color:gray">
              </
              <xsl:node-name/>
              >
            </SPAN>
          </DIV>
        </xsl:template>

        <xsl:template match="@*">

          <SPAN STYLE="color:navy">
            <xsl:node-name/>
            ="
            −
            <SPAN STYLE="color:black">
              <xsl:value-of/>
            </SPAN>
            "
          </SPAN>
        </xsl:template>

        <xsl:template match="pi()">

          <DIV STYLE="margin-left:1em; color:maroon">
            <?
<xsl:node-name/>
<xsl:apply-templates select="@*"/>
?>
          </DIV>
        </xsl:template>

        <xsl:template match="cdata()">

          <pre>
            <![CDATA[
<xsl:value-of/>
]]>
          </pre>
        </xsl:template>

        <xsl:template match="textNode()">
          <xsl:value-of/>
        </xsl:template>
      </xsl:apply-templates>
    </DIV>
  </xsl:template>

</xsl:stylesheet>