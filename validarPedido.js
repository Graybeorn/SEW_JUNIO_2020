class ValidarPedido {
  constructor(){
    this.configDivisa();
    this.total;
  }

  pendienteConfirmacion() {
    let productos = JSON.parse(sessionStorage.getItem("productos"));
    console.log(productos);
    let aux = "<div>"
    aux +=      "<h2>Resumen del Pedido</h2>"
    aux +=      "<div class='listaProductosResumen'>"
    // Por cada producto:
    let array = productos.filter(p => p.cantidad > 0);
    this.total = 0.0;
    array.forEach(p => {
      this.total += p.precio * p.cantidad;
      aux +=        "<div class='productoResumen' id='resumen" + p.id + "'>";
      aux +=          "<span> "+ p.nombre +"</span>";
      aux +=          "<span>"+ p.cantidad +"</span>";
      aux +=          "<span>"+ p.precio+"</span>";
      aux +=        "</div>";
      if(p.id.includes("custom")){
        aux += "<div class='resumenIngredientes'>"
        p.ingredientes.forEach(ing => {
          aux += "<span class='resumenIngrediente'>" + ing + "</span>";
        });
        aux += "</div>"
      }
      if(p.id.includes("menu")){
        aux += "<div class='resumenIngredientes'>"
        aux += "<span class='resumenIngrediente'>" + p.pizza + "</span>";
        aux += "<span class='resumenIngrediente'>" + p.bebida + "</span>";
        aux += "<span class='resumenIngrediente'>" + p.entrante + "</span>";
        aux += "</div>"
      }
    });
    aux +=      "</div>";
    aux +="</div>";
    aux += "<div class='menuDivisas'>";
    aux += "<span id='precioTotal'>Total: " + this.total.toFixed(2) + "EUR</span>";
    aux += "<select id='selectorDivisa' onchange=\"validarPedido.getDivisa()\" >";
    aux +=    "<option value=\"EUR\">EUR</option>"
    aux +=    "<option value=\"USD\">USD</option>"
    aux +=    "<option value=\"JPY\">JPY</option>"
    aux +=    "<option value=\"GBP\">GBP</option>"
    aux +=    "<option value=\"CNY\">CNY</option>"
    aux +=    "<option value=\"KRW\">KRW</option>"
    aux += "</select>";
    aux += "</div>";
    aux += "<div class='menuDivisas'>";
    aux +=  "<span>" + localStorage.getItem("tipoPedido") + "</span>";
    aux +=   "<button onclick=\"validarPedido.terminar()\">Terminar</button>";
    aux += "</div>";
    $("#resumenPedido").html(aux);
  }

  getDivisa(){
    let string = $("#selectorDivisa").val();
    this.par.url = this.url1 + string + this.url2;
    $.ajax(this.par);
  }

  setDivisa(mult){
    console.log(mult);
    let val = $('#selectorDivisa').val();
    $("#precioTotal").text("Total: " + (this.total * mult).toFixed(2) + " " + val);
  }

  terminar(){
    alert("¡Terminado!");
  }

  configDivisa(){
    this.url1 = "https://currency-converter5.p.rapidapi.com/currency/historical/2018-02-09?format=json&to=";
    this.url2 = "&from=EUR&amount=1"
    this.par = {
      async: true,
      crossDomain: true,
      url: "",
      method: "GET",
      success: function(data){
        console.log(data);
        this.setDivisa(data.rates[Object.keys(data.rates)[0]].rate);
      }.bind(this),
      error: function() {
        console.log("Error personalizado");
      },
      headers: {
        "x-rapidapi-host": "currency-converter5.p.rapidapi.com",
        "x-rapidapi-key": "49e9a7cb4bmshe0c4a371ccaeac9p1b087ejsnfabb0d1a4810"
      }
    }
  }
}

let validarPedido = new ValidarPedido();