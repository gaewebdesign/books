<?xml version="1.0"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:fo="http://www.w3.org/1999/XSL/Format">

  <xsl:template match="/">
    <fo:root xmlns:fo="http://www.w3.org/1999/XSL/Format">

      <fo:layout-master-set>

        <fo:simple-page-master master-name="elements"
           page-width="297mm"  page-height="210mm"
           margin-top="0.5in"  margin-bottom="0.5in"
           margin-left="0.5in" margin-right="0.5in">
          <fo:region-body margin-top="1.0in"
                          margin-bottom="1.0in" />
          <fo:region-before extent=".5in"/>
          <fo:region-after extent=".5in"/>
        </fo:simple-page-master>
        

      </fo:layout-master-set>

      <fo:page-sequence master-reference="elements" 
                        initial-page-number="1" language="en" country="us">

        <fo:static-content flow-name="xsl-region-after">
          <fo:block text-align="right" border-color="black">
            Pg. <fo:page-number/>
          </fo:block>
        </fo:static-content>



        <fo:flow flow-name="xsl-region-body">

          <fo:table border-collapse="collapse" font-size="10pt" font-family="Arial">

            <fo:table-column column-width="27mm" background-color="rgb(255,246,206)"/>
            <fo:table-column column-width="20mm" background-color="rgb(255,246,206)"/>
            <fo:table-column column-width="14mm" background-color="rgb(255,246,206)"/>
            <fo:table-column column-width="20mm" background-color="rgb(255,246,206)"/>
            <fo:table-column column-width="20mm" background-color="rgb(255,246,206)"/>
            <fo:table-column column-width="17mm" background-color="rgb(255,246,206)"/>
            <fo:table-column column-width="27mm" background-color="rgb(255,246,206)"/>
            <fo:table-column column-width="24mm" background-color="rgb(255,246,206)"/>
            <fo:table-column column-width="20mm" background-color="rgb(255,246,206)"/>
            <fo:table-column column-width="20mm" background-color="rgb(255,246,206)"/>
            <fo:table-column column-width="20mm" background-color="rgb(255,246,206)"/>
            <fo:table-column column-width="15mm" background-color="rgb(255,246,206)"/>
            <fo:table-column column-width="15mm" background-color="rgb(255,246,206)"/>

            <fo:table-header  color="rgb(18,11,55)" background-color="rgb(140,242,232)" 
                     font-weight="bold">

              <fo:table-row background-color="rgb(117,94,225)" font-size="10pt">
                <fo:table-cell padding="2pt">
                  <fo:block> Name </fo:block>
                </fo:table-cell>
                <fo:table-cell>
                  <fo:block> Symbol </fo:block>
                </fo:table-cell>
                <fo:table-cell>
                  <fo:block> Atomic Number </fo:block>
                </fo:table-cell>
                <fo:table-cell>
                  <fo:block> Atomic Weight </fo:block>
                </fo:table-cell>
                <fo:table-cell>
                  <fo:block> Oxidation States </fo:block>
                </fo:table-cell>
                <fo:table-cell>
                  <fo:block>Density
                    <xsl:if test="PERIODIC_TABLE/ATOM/DENSITY/@UNITS">
                      (<xsl:value-of select="PERIODIC_TABLE/ATOM/DENSITY/@UNITS"/>)
                    </xsl:if>
                  </fo:block>
                </fo:table-cell>
                <fo:table-cell>
                  <fo:block> Electronic Configuration </fo:block>
                </fo:table-cell>
                <fo:table-cell>
                  <fo:block> Electroneg </fo:block>
                </fo:table-cell>
                <fo:table-cell>
                  <fo:block> Atomic Radius       
                    <xsl:if test="PERIODIC_TABLE/ATOM/ATOMIC_RADIUS/@UNITS">
                      (<xsl:value-of select="PERIODIC_TABLE/ATOM/ATOMIC_RADIUS/@UNITS"/>)
                    </xsl:if>
                  </fo:block>                
                </fo:table-cell>
                <fo:table-cell>
                  <fo:block > Atomic Volume  
                  <xsl:text>      </xsl:text>
                  <xsl:if test="PERIODIC_TABLE/ATOM/ATOMIC_VOLUME/@UNITS">
                    (<xsl:value-of select="PERIODIC_TABLE/ATOM/ATOMIC_VOLUME/@UNITS"/>)                      
                  </xsl:if>
                  </fo:block>
                </fo:table-cell>
                <fo:table-cell>
                  <fo:block> Ionization Potential </fo:block>
                </fo:table-cell>
                <fo:table-cell>
                  <fo:block> Specific Heat                           
                 <xsl:if test="PERIODIC_TABLE/ATOM/SPECIFIC_HEAT_CAPACITY/@UNITS">
                    (<xsl:value-of select="PERIODIC_TABLE/ATOM/SPECIFIC_HEAT_CAPACITY/@UNITS"/>)                      
                  </xsl:if>                                   
                  </fo:block>
                </fo:table-cell>
                <fo:table-cell>
                  <fo:block> Thermal 
                  Conductivity
                  <xsl:if test="PERIODIC_TABLE/ATOM/THERMAL_CONDUCTIVITY/@UNITS">
                    (<xsl:value-of select="PERIODIC_TABLE/ATOM/THERMAL_CONDUCTIVITY/@UNITS"/>)                      
                  </xsl:if>) 
                 
                  </fo:block>
                </fo:table-cell>
              </fo:table-row>

            </fo:table-header>


            <fo:table-body>
              <xsl:apply-templates select="//ATOM">
                <xsl:sort data-type="text"
                  select="NAME"/>
 
              </xsl:apply-templates>
            </fo:table-body>

          </fo:table>
 <!--       
        </fo:table-and-caption>
  -->          
        </fo:flow>
        

      </fo:page-sequence>

    </fo:root>
  </xsl:template>

  <xsl:template match="ATOM">

<!-- Alternate the colors (r,g,b) to (b,g,r )
 -->
         <xsl:variable name="r">     
         <xsl:choose>
        <xsl:when test="position() mod 2 = 1">169</xsl:when>
        <xsl:when test="position() mod 2 = 0">219</xsl:when>
        </xsl:choose>
        </xsl:variable>
        <xsl:variable name="g">
        <xsl:choose>
        <xsl:when test="position() mod 2 = 1">154</xsl:when>
        <xsl:when test="position() mod 2 = 0">163</xsl:when>
        </xsl:choose>
         </xsl:variable>    
        <xsl:variable name="b">
        <xsl:choose>
        <xsl:when test="position() mod 2 = 1">228</xsl:when>
        <xsl:when test="position() mod 2 = 0">220</xsl:when>
        </xsl:choose>
        </xsl:variable>

      <fo:table-row background-color="rgb({$r},{$g},{$b})">   
      
      <fo:table-cell>
        <fo:block>
          <xsl:value-of select="NAME"/>
        </fo:block>
      </fo:table-cell>
      <fo:table-cell>
        <fo:block>
          <xsl:value-of select="SYMBOL"/>
        </fo:block>
      </fo:table-cell>
      <fo:table-cell>
        <fo:block>
          <xsl:value-of select="ATOMIC_NUMBER"/>
        </fo:block>
      </fo:table-cell>
      <fo:table-cell>
        <fo:block>
          <xsl:value-of select="ATOMIC_WEIGHT"/>
        </fo:block>
      </fo:table-cell>
      <fo:table-cell>
        <fo:block>
          <xsl:value-of select="OXIDATION_STATES"/>
        </fo:block>
      </fo:table-cell>
      <fo:table-cell>
        <fo:block>
          <xsl:value-of select="DENSITY"/>
        </fo:block>
      </fo:table-cell>
      <fo:table-cell>
        <fo:block>
          <xsl:value-of select="ELECTRON_CONFIGURATION"/>
        </fo:block>
      </fo:table-cell>
      <fo:table-cell>
        <fo:block>
          <xsl:value-of select="ELECTRONEGATIVITY"/>
        </fo:block>
      </fo:table-cell>
      <fo:table-cell>
        <fo:block>
          <xsl:value-of select="ATOMIC_RADIUS"/>
        </fo:block>
      </fo:table-cell>
      <fo:table-cell>
        <fo:block>
          <xsl:value-of select="ATOMIC_VOLUME"/>
        </fo:block>
      </fo:table-cell>
      <fo:table-cell>
        <fo:block>
          <xsl:value-of select="IONIZATION_POTENTIAL"/>
        </fo:block>
      </fo:table-cell>
      <fo:table-cell>
        <fo:block>
          <xsl:value-of select="SPECIFIC_HEAT_CAPACITY"/>
        </fo:block>
      </fo:table-cell>
      <fo:table-cell>
        <fo:block>
          <xsl:value-of select="THERMAL_CONDUCTIVITY"/>
        </fo:block>
      </fo:table-cell>
    </fo:table-row>
  </xsl:template>

</xsl:stylesheet>