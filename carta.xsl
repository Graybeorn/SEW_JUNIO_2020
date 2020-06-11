<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="5.0" encoding="UTF-8" indent="yes"/>
  
  <xsl:template match="/">
      <section>
        <h3>Pizzas</h3>
        <xsl:for-each select="productos/pizzas/pizza">
        <div>
          <table>
            <tr>
              <td rowspan="4" colspan="4"><img alt="No se puede mostrar la imagen">
                <xsl:attribute name="src">
                  <xsl:value-of select="@imagen"/>
                </xsl:attribute></img>
              </td>
              <td colspan="6"><xsl:value-of select="@nombre"/></td>
              <td class="dropdown">?
                <xsl:for-each select="valorNutricional">
                  <div class="dropdown-content">
                      <span>kcal: <xsl:value-of select="@kcal"/> <br/>proteinas: <xsl:value-of select="@proteinas"/> <br/>grasas: <xsl:value-of select="@grasas"/> <br/>saturadas: <xsl:value-of select="@saturadas"/> <br/>azúcares: <xsl:value-of select="@azucares"/></span>
                  </div>
                </xsl:for-each>
              </td>
            </tr>
            <tr>
              <td rowspan="3" colspan="6">
                <p>Ingredientes: 
                <xsl:for-each select="ingrediente">
                  <xsl:value-of select="."/>                                    
                  <xsl:choose>
                    <xsl:when test="position() != last()">, </xsl:when>
                  </xsl:choose>
                </xsl:for-each>
                </p>
              </td>
              <td>
                <button onclick="servicioPedidos.añadir('{@id}')">+</button>
              </td>
            </tr>
            <tr>
              <td>
                <input>                
                  <xsl:attribute name="readonly">readonly</xsl:attribute>
                  <xsl:attribute name="id">
                    <xsl:value-of select="@id"/>
                  </xsl:attribute>
                </input>
              </td>
            </tr>
            <tr>
              <td>
                <button onclick="servicioPedidos.retirar('{@id}')">-</button>
              </td>
            </tr>
          </table>
        </div>

        </xsl:for-each>
      </section>

      <section>
        <h3>Bebidas</h3>
        <xsl:for-each select="productos/bebidas/bebida">
          <div>
            <table>
              <tr>
                <th colspan="4">
                  <xsl:value-of select="@nombre"/>
                </th>
              </tr>
              <tr>
                <td class="dropdown">?
                  <xsl:for-each select="valorNutricional">
                    <div class="dropdown-content">
                      <span>kcal: <xsl:value-of select="@kcal"/> <br/>proteinas: <xsl:value-of select="@proteinas"/> <br/>grasas: <xsl:value-of select="@grasas"/> <br/>saturadas: <xsl:value-of select="@saturadas"/> <br/>azúcares: <xsl:value-of select="@azucares"/></span>
                    </div>
                  </xsl:for-each>
                </td>
                <td>
                  <button onclick="servicioPedidos.retirar('{@id}')">-</button>
                </td>
                <td>
                  <input>
                    <xsl:attribute name="readonly">readonly</xsl:attribute>
                    <xsl:attribute name="id">
                      <xsl:value-of select="@id"/>
                    </xsl:attribute>
                  </input>
                </td>
                <td>
                  <button onclick="servicioPedidos.añadir('{@id}')">+</button>
                </td>
              </tr>
            </table>
          </div>
        </xsl:for-each>
      </section>
      
      <section>
        <h3>Entrantes</h3>
        <xsl:for-each select="productos/entrantes/entrante">
          <div>
            <table>
              <tr>
                <th colspan="4">
                  <xsl:value-of select="@nombre"/>
                </th>
              </tr>
              <tr>
                <td class="dropdown">?
                  <xsl:for-each select="valorNutricional">
                    <div class="dropdown-content">
                      <span>kcal: <xsl:value-of select="@kcal"/> <br/>proteinas: <xsl:value-of select="@proteinas"/> <br/>grasas: <xsl:value-of select="@grasas"/> <br/>saturadas: <xsl:value-of select="@saturadas"/> <br/>azúcares: <xsl:value-of select="@azucares"/></span>
                    </div>
                  </xsl:for-each>
                </td>
                <td>
                  <button onclick="servicioPedidos.retirar('{@id}')">-</button>
                </td>
                <td>
                  <input>
                    <xsl:attribute name="readonly">readonly</xsl:attribute>
                    <xsl:attribute name="id">
                      <xsl:value-of select="@id"/>
                    </xsl:attribute>
                  </input>
                </td>
                <td>
                  <button onclick="servicioPedidos.añadir('{@id}')">+</button>
                </td>
              </tr>
            </table>
          </div>
        </xsl:for-each>
      </section>
      
      <section>
        <h3>Postres</h3>
        <xsl:for-each select="productos/postres/postre">
          <div>
            <table>
              <tr>
                <th colspan="4">
                  <xsl:value-of select="@nombre"/>
                </th>
              </tr>
              <tr>
                <td class="dropdown">?
                  <xsl:for-each select="valorNutricional">
                    <div class="dropdown-content">
                      <span>kcal: <xsl:value-of select="@kcal"/> <br/>proteinas: <xsl:value-of select="@proteinas"/> <br/>grasas: <xsl:value-of select="@grasas"/> <br/>saturadas: <xsl:value-of select="@saturadas"/> <br/>azúcares: <xsl:value-of select="@azucares"/></span>
                    </div>
                  </xsl:for-each>
                </td>
                <td>
                  <button onclick="servicioPedidos.retirar('{@id}')">-</button>
                </td>
                <td>
                  <input>
                    <xsl:attribute name="readonly">readonly</xsl:attribute>
                    <xsl:attribute name="id">
                      <xsl:value-of select="@id"/>
                    </xsl:attribute>
                  </input>
                </td>
                <td>
                  <button onclick="servicioPedidos.añadir('{@id}')">+</button> 
                </td>
              </tr>
            </table>
          </div>
        </xsl:for-each>
      </section>

  </xsl:template>  
</xsl:stylesheet>