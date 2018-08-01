<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"

    xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl"

>
  <xsl:output method="xml" indent="yes" version="1.0" />

  <!-- Code used to convert to upper case. XSLT 1.0 lacks a predefined function for this. -->
  <xsl:variable name="smallcase" select="'abcdefghijklmnopqrstuvwxyz'" />
  <xsl:variable name="uppercase" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'" />
  <xsl:template name="to-upper">
    <xsl:param name="input" />
    <xsl:value-of select="translate($input, $smallcase, $uppercase)" />
  </xsl:template>
  
  <xsl:template match="item_authorizes">
    <tempering_tables xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 

    xsi:noNamespaceSchemaLocation="tempering_table.xsd">
      <xsl:apply-templates select="item_authorize" />
    </tempering_tables>
  </xsl:template>

  <xsl:template match="item_authorize">
    <tempering_table>
      <xsl:attribute name="id">
        <xsl:value-of select="id"/>
      </xsl:attribute>
      <xsl:apply-templates select="enchant_attr_list" />
    </tempering_table>
  </xsl:template>

  <xsl:template match="enchant_attr_list">
    <xsl:apply-templates select="data" mode="new" />
  </xsl:template>

  <xsl:template match="data" mode="new">
    <modifiers>
      <xsl:attribute name="level">
        <xsl:value-of select="level"/>
      </xsl:attribute>
      <xsl:apply-templates select="node()" />
    </modifiers>
  </xsl:template>

  <xsl:template match="node()">
    <xsl:if test="substring(name(.), 1, 4) = 'attr'">
      <add>
        <xsl:attribute name="name">
          <xsl:call-template name="to-upper">
            <xsl:with-param name="input">
              <xsl:value-of select="substring-before(.,' ')"/>
            </xsl:with-param>
          </xsl:call-template>
        </xsl:attribute>
        <xsl:attribute name="value">
          <xsl:value-of select="substring-after(.,' ')"/>
        </xsl:attribute>
        <xsl:attribute name="bonus">
          <xsl:text>true</xsl:text>
        </xsl:attribute>
      </add>
    </xsl:if>
  </xsl:template>
</xsl:stylesheet>