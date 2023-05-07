<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<html> 
			<body>
			<h2>Lista produselor:</h2>
							
			<table border="1">
				<tr bgcolor="#2D5BA3">
					<th>Specie/Tip</th>
					<th>Pret initial</th>
					<th>Cantitate</th>
					<th>Descriere</th>
					<th>Greutate</th>
				</tr>
				<xsl:for-each select="petshop/produs_animal">
					<tr>
						<td>
							<xsl:value-of select="animal/@specie"/>
						</td>
						<td>
							<xsl:value-of select="pret_initial"/>
							<xsl:text> </xsl:text>
							<xsl:value-of select="pret_initial/@moneda"/>
						</td>
						<td>
							<xsl:value-of select="cantitate"/>
						</td>
						<td>
							<xsl:value-of select="descriere"/>
						</td>
						<td>
							<xsl:value-of select="greutate"/>
							<xsl:text> </xsl:text>
							<xsl:value-of select="greutate/@unitate"/>
						</td>
					</tr>
				</xsl:for-each>
				<xsl:for-each select="petshop/produs_hrana">
					<tr>
						<td>
							<xsl:value-of select="mancare/@tip"/>
						</td>
						<td>
							<xsl:value-of select="pret_initial"/>
							<xsl:text> </xsl:text>
							<xsl:value-of select="pret_initial/@moneda"/>
						</td>
						<td>
							<xsl:value-of select="cantitate"/>
						</td>
						<td>
							<xsl:value-of select="descriere"/>
						</td>
						<td>
							<xsl:value-of select="greutate"/>
							<xsl:text> </xsl:text>
							<xsl:value-of select="greutate/@unitate"/>
						</td>
					</tr>
				</xsl:for-each>
				
			</table>

			<h2>Animalele in ordinea produselor de mai sus</h2>
			<table border="1">
				<tr bgcolor="#2D5BA3">
					<th>Specie</th>
					<th>Rasa</th>
					<th>Anul nasterii</th>
					<th>Tip animal</th>
					<th>Sex</th>
				</tr>
				<xsl:for-each select="petshop/produs_animal">
					<tr>
						<td>
							<xsl:value-of select="animal/@specie"/>
						</td>
						<td>
							<xsl:value-of select="animal/rasa"/>
						</td>
						<td>
							<xsl:value-of select="animal/anul_nastere"/>
						</td>
						<td>
							<xsl:value-of select="animal/tip_animal"/>
						</td>
						<td>
							<xsl:value-of select="animal/sex"/>
						</td>
					</tr>
				</xsl:for-each>
			</table>

			<h2>Hrana pentru animalute:</h2>
			<table border="1">
				<tr bgcolor="#2D5BA3">
					<th>Tip hrana</th>
					<th>Animal destinat</th>
					<th>Marime animal</th>
					<th>Aroma</th>
					<th>Rasa</th>
				</tr>
				<xsl:for-each select="petshop/produs_hrana">
					<tr>
						<td>
							<xsl:value-of select="mancare/@tip"/>
						</td>
						<td>
							<xsl:value-of select="mancare/animal_destinat"/>
						</td>
						<td>
							<xsl:value-of select="mancare/marime_animal"/>
						</td>
						<td>
							<xsl:value-of select="mancare/aroma"/>
						</td>
						<td>
							<xsl:value-of select="mancare/rasa"/>
						</td>
					</tr>
				</xsl:for-each>
			</table>

			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
