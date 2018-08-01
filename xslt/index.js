const request = require('xslt-processor')
const fs = require('fs');
var xmlString = '<?xml version="1.0"?><?xml-stylesheet type="text/xsl" href="example.xsl"?><Article><Title>My Article</Title><Authors><Author>Mr. Foo</Author><Author>Mr. Bar</Author></Authors><Body>This is my article text.</Body></Article>'
var xsltString = '<?xml version="1.0"?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"><xsl:output method="text"/><xsl:template match="/">Article - <xsl:value-of select="/Article/Title"/>Authors: <xsl:apply-templates select="/Article/Authors/Author"/></xsl:template><xsl:template match="Author">- <xsl:value-of select="." /></xsl:template></xsl:stylesheet>'
const xml = request.xmlParse(xmlString); // xmlString: string of xml file contents
const xslt = request.xmlParse(xsltString); // xsltString: string of xslt file contents
const outXmlString = request.xsltProcess(xml, xslt); 
console.log(outXmlString);
var xmlfile = request.xmlParse(fs.readFileSync('sampleXML.xml', 'utf8'));
var xslTransform = request.xmlParse(fs.readFileSync('transformer.xsl', 'utf8'));
var outXml = request.xsltProcess(xmlfile, xslTransform);
console.log("========================" +  outXml);


