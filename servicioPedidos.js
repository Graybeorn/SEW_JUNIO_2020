class Producto{
  constructor(nombre,id, precio){
    this.nombre = nombre;
    this.id = id;
    this.precio = precio;
    this.cantidad = 0;
  }
}

class Pizza extends Producto{
  constructor(nombre, id, precio, ingredientes){
    super(nombre, id, precio);
    this.ingredientes = ingredientes;
  }
}

class Menu extends Producto {
  constructor(id, pizza, entrante, bebida){
    super("Menu", id,  "14.50");
    this.pizza = pizza;
    this.entrante = entrante;
    this.bebida = bebida;
  }
}

class ServicioPedidos{
  constructor() {
    this.productos = [];
    this.checkSupport();
  }

  añadir(id){
    let producto = this.productos.filter(p => p.id.includes(id))[0];
    producto.cantidad++;
    this.guardarPedido();
    this.cambiarCantidad(producto.id, producto.cantidad);
    this.resumenDelPedido();
  }

  retirar(id){
    let producto = this.productos.filter(p => p.id.includes(id))[0];
    if(producto.cantidad > 0){
      producto.cantidad--;
    }
    this.guardarPedido();
    this.cambiarCantidad(producto.id, producto.cantidad);
    this.resumenDelPedido();
  }
  
  cambiarCantidad(id, cantidad){
    $("#" + id).attr('value', cantidad);
  }

  guardarPedido(){
    let json = JSON.stringify(this.productos);
    window.sessionStorage.setItem("productos", json);
  }

  recuperarPedido(){
    let json = window.sessionStorage.getItem("productos");
    if(json){
      this.productos = JSON.parse(json)
      for(let i=0;i<this.productos.length;i++){
        console.log(this.productos[i].id +' '+ this.productos[i].cantidad);
        this.cambiarCantidad(this.productos[i].id, this.productos[i].cantidad);
      }
    } else {
      this.cargarDeNuevo();
    }
  }

  cargarDeNuevo() {
    
    console.log("carga de 0");
    let xml = menuLoader.loadXMLDoc("https://uo252376.github.io/SEW_JUNIO_2020/productos.xml");
    console.log(xml);
    let prodArray = [];

    let childs = xml.getElementsByTagName("productos").item(0).childNodes;
    for (var i=0;i<childs.length;i++){
      if(childs.item(i).nodeType == 1){
        let xmlProds = childs.item(i).childNodes;
        for (var j=0;j<xmlProds.length;j++){
          if(xmlProds.item(j).nodeType==1) {
            console.log(xmlProds.item(j).tagName);
            if(xmlProds.item(j).tagName.includes("pizza")){
              let ingredientesXmlArray = xmlProds.item(j).getElementsByTagName("ingrediente");
              let ingredientes = [];
              for(let k=0; k<ingredientesXmlArray; k++){
                ingredientes.push(ingredientesXmlArray.item(k).textContent);
              }
              prodArray.push(new Pizza(xmlProds.item(j).getAttribute("nombre"), xmlProds.item(j).getAttribute("id"),xmlProds.item(j).getAttribute("precio"), ingredientes));
            } else {
              prodArray.push(new Producto(xmlProds.item(j).getAttribute("nombre"),xmlProds.item(j).getAttribute("id"),xmlProds.item(j).getAttribute("precio")));
            }
          }
        }
      }
    }

    this.productos = prodArray;
    this.productos.forEach(p=>{
      this.cambiarCantidad(p.id, p.cantidad);
    })
    this.guardarPedido();
    
  }

  guardarPedidoEnArchivo(){
     //Convert JSON Array to string.
     var json = JSON.stringify(this.productos);
     //Convert JSON string to BLOB.
     json = [json];
     var blob1 = new Blob(json, { type: "text/plain;charset=utf-8" });
     //Check the Browser.
     var isIE = false || !!document.documentMode;
     if (isIE) {
         window.navigator.msSaveBlob(blob1, "Pedido.json");
     } else {
         var url = window.URL || window.webkitURL;
         let link = url.createObjectURL(blob1);
         var a = document.createElement("a");
         a.download = "Pedido.json";
         a.href = link;
         document.body.appendChild(a);
         a.click();
         document.body.removeChild(a);
     }
  }

  cargarPedidoDeArchivo(string){
    this.productos = JSON.parse(string);
    this.guardarPedido();
    this.resumenDelPedido();
  }

  
  checkSupport(){
    if (window.File && window.FileReader && window.FileList && window.Blob) {
    } else {
      alert("Tu buscador no ofrece soporte para la carga de archivos, por lo que no podrás recuperar tu pedido.")
      $('#file').disabled = true;
    }
  }

  resumenDelPedido(){
    let aux = "<div>"
    aux +=      "<h2>Resumen del Pedido</h2>"
    aux +=      "<div class='listaProductosResumen'>"
    // Por cada producto:
    let array = this.productos.filter(p => p.cantidad > 0);
    let total = 0.0;
    array.forEach(p => {
      total += p.precio * p.cantidad;
      aux +=        "<div class='productoResumen' id='resumen" + p.id + "'>";
      aux +=          "<span> "+ p.nombre +"</span>";
      aux +=          "<span>"+ p.cantidad +"</span>";
      aux +=          "<span>"+ p.precio+"</span>";
      aux +=          "<button onclick=\"servicioPedidos.eliminarProducto('"+p.id+"')\">X</button>";
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
    aux +=    "<span id='precioTotal'>Total: " + total.toFixed(2) + "€</span>";
    aux +=  "<button onclick='servicioPedidos.irAValidacion()'>Aceptar</button>";
    aux +="</div>";
    $("#resumenPedido").html(aux);
  }

  eliminarProducto(id){
    this.productos.filter(p => p.id.includes(id))[0].cantidad=0;
    this.guardarPedido();
    this.resumenDelPedido();
  }
}

var servicioPedidos = new ServicioPedidos();