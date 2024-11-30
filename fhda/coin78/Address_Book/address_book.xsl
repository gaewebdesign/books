<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<html>
			<body bgcolor="#efefef" text="#000000">
				<table border="0" cellpadding="2" cellspacing="1" width="610" align="center">
					<xsl:for-each select="address_book/record">
						<xsl:sort select="name/last"/>
						<tr bgcolor="#a7a7a7" valign="top">
							<td rowspan="3" style="color:#ffffff">
								<b>
									<xsl:value-of select="name/heading"/>
								</b>:</td>
							<td bgcolor="#bfbabf">First Name:</td>
							<td bgcolor="#dfd8df">
								<xsl:value-of select="name/first"/>
							</td>
						</tr>
						<tr bgcolor="#a7a7a7" valign="top">
							<td bgcolor="#bfbabf">Middle Name:</td>
							<td bgcolor="#dfd8df">
								<xsl:value-of select="name/middle"/>
							</td>
						</tr>
						<tr bgcolor="#a7a7a7" valign="top">
							<td bgcolor="#bfbabf">Last Name:</td>
							<td bgcolor="#dfd8df">
								<xsl:value-of select="name/last"/>
							</td>
						</tr>
						<tr bgcolor="#a7a7a7" valign="top">
							<td rowspan="5" style="color:#ffffff">
								<b>
									<xsl:value-of select="address/heading"/>
								</b>:</td>
							<td bgcolor="#bfbabf">Street:</td>
							<td bgcolor="#dfd8df">
								<xsl:value-of select="address/street"/>
							</td>
						</tr>
						<tr bgcolor="#a7a7a7" valign="top">
							<td bgcolor="#bfbabf">Appt. #:</td>
							<td bgcolor="#dfd8df">
								<xsl:value-of select="address/apt"/>
							</td>
						</tr>
						<tr bgcolor="#a7a7a7" valign="top">
							<td bgcolor="#bfbabf">City:</td>
							<td bgcolor="#dfd8df">
								<xsl:value-of select="address/city"/>
							</td>
						</tr>
						<tr bgcolor="#a7a7a7" valign="top">
							<td bgcolor="#bfbabf">State:</td>
							<td bgcolor="#dfd8df">
								<xsl:value-of select="address/state"/>
							</td>
						</tr>
						<tr bgcolor="#a7a7a7" valign="top">
							<td bgcolor="#bfbabf">Zip Code:</td>
							<td bgcolor="#dfd8df">
								<xsl:value-of select="address/zip"/>
							</td>
						</tr>
						<tr bgcolor="#a7a7a7" valign="top">
							<td rowspan="5" style="color:#ffffff">
								<b>
									<xsl:value-of select="contact/heading"/>
								</b>:</td>
							<td bgcolor="#bfbabf">Home Phone:</td>
							<td bgcolor="#dfd8df">
								<xsl:value-of select="contact/phone_home"/>
							</td>
						</tr>
						<tr bgcolor="#a7a7a7" valign="top">
							<td bgcolor="#bfbabf">Work Phone:</td>
							<td bgcolor="#dfd8df">
								<xsl:value-of select="contact/phone_work"/>
							</td>
						</tr>
						<tr bgcolor="#a7a7a7" valign="top">
							<td bgcolor="#bfbabf">Cell Phone:</td>
							<td bgcolor="#dfd8df">
								<xsl:value-of select="contact/phone_cell"/>
							</td>
						</tr>
						<tr bgcolor="#a7a7a7" valign="top">
							<td bgcolor="#bfbabf">Email:</td>
							<td bgcolor="#dfd8df" style="color:#0000ff">
								<xsl:apply-templates select="contact/email"/>
							</td>
						</tr>
						<tr bgcolor="#a7a7a7" valign="top">
							<td bgcolor="#bfbabf">website:</td>
							<td bgcolor="#dfd8df" style="color:#0000ff">
								<xsl:apply-templates select="contact/website"/>
							</td>
						</tr>
						<tr bgcolor="#a7a7a7" valign="top">
							<td rowspan="2" style="color:#ffffff">
								<b>
									<xsl:value-of select="details/heading"/>
								</b>:</td>
							<td bgcolor="#bfbabf">Comment:</td>
							<td bgcolor="#dfd8df">
								<xsl:value-of select="details/comment"/>
							</td>
						</tr>
						<tr bgcolor="#a7a7a7" valign="top">
							<td bgcolor="#bfbabf">DOB:</td>
							<td bgcolor="#dfd8df">
								<xsl:value-of select="details/dob"/>
							</td>
						</tr>
						<tr>
							<td>
								<br/>
							</td>
						</tr>
					</xsl:for-each>
				</table>
			</body>
		</html>
	</xsl:template>
	<xsl:template match="email">
		<a>
			<xsl:attribute name="href">mailto:<xsl:value-of select="."/></xsl:attribute>
			<xsl:attribute name="title"><xsl:value-of select="."/></xsl:attribute>
			<xsl:value-of select="."/>
		</a>
	</xsl:template>
	<xsl:template match="website">
		<a>
			<xsl:attribute name="href"><xsl:value-of select="."/></xsl:attribute>
			<xsl:attribute name="title"><xsl:value-of select="."/></xsl:attribute>
			<xsl:attribute name="target">_blank</xsl:attribute>
			<xsl:value-of select="."/>
		</a>
	</xsl:template>
</xsl:stylesheet>
