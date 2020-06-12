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
  }

  cargarPedidoDeArchivo(){

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
    aux +=      "<h4>Resumen del Pedido</h4>"
    aux +=      "<div class='listaProductosResumen'>"
    // Por cada producto:
    let array = this.productos.filter(p => p.cantidad > 0);
    let total = 0.0;
    array.forEach(p => {
      total += p.precio * p.cantidad;
      aux +=        "<div class='productoResumen' id='resumen" + p.id + "'>";
      aux +=          "<span> "+ p.nombre +"</span>";
      aux +=          "<span>"+ p.cantidad+"</span>";
      aux +=          "<span>"+ p.precio+"</span>";
      aux +=          "<button onclick=\"servicioPedidos.eliminarProducto('"+p.id+"')\">X</button>";
      aux +=        "</div>";
    });
    aux +=      "</div>";
    aux +=    "<span id='precioTotal'>Total: " + total + "€</span>";
    aux +=  "<button onclick='servicioPedidos.irAValidacion()'>Aceptar</button>";
    aux +="</div>";
    $("#resumenPedido").html(aux);
  }

  eliminarProducto(id){
    this.productos.filter(p => p.id.includes(id))[0].cantidad=0;
    this.resumenDelPedido();
  }
}


class Lector{
  constructor(){
      this.checkSupport();
  }

  checkSupport(){
      if (window.File && window.FileReader && window.FileList && window.Blob) {
      } else {
          $('#error').text('The File APIs are not fully supported in this browser.');
          $('button').disabled = true;
          $('input').disabled = true;
      }
  }0

  loadFile(file){
      if(file.name.match(".json$", "i")){
          var reader = new FileReader();
          reader.onload = this.loaded;
          reader.readAsText(file);
          reader.onload = () => {
            this.productos = JSON.parse(reader.result);
          }
      }else{
         alert("Ese archivo no es del tipo adecuado. Escoge un .json");
      }
  }
}

var servicioPedidos = new ServicioPedidos();