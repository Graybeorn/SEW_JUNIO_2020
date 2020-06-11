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
    super("Menu", "14.50", id);
    this.pizza = pizza;
    this.entrante = entrante;
    this.bebida = bebida;
  }
}

class ServicioPedidos{
  constructor() {
    this.productos = [];
    this.checkSupport();
    this.recuperarPedido();
  }

  añadir(id){
    let producto = this.productos.filter(p => p.id.includes(id))[0];
    producto.cantidad++;
    this.guardarPedido();
    this.cambiarCantidad(producto.id, producto.cantidad);
  }

  retirar(id){
    let producto = this.productos.filter(p => p.id.includes(id))[0];
    if(producto.cantidad > 0){
      producto.cantidad--;
    }
    this.guardarPedido();
    this.cambiarCantidad(producto.id, producto.cantidad);
  }
  
  cambiarCantidad(id, cantidad){
    $("#" + id).attr('value', cantidad);
  }

  crearPizza(){
    let ingredientes = [];
    $(".ingredienteSeleccionado").each(index => {
      ingredientes.push($(this).value);
    })
    let nombre = "custom" + this.productos.length;
    let id = "custom" + this.productos.length;
    let precio = 9.50 + (ingredientes.length - 2) *0.40;
    this.productos.push(new Pizza(nombre, id, precio, ingredientes));
    this.añadir(id);
  }
   
  añadirMenu(){
    let pizza = $("#pizzaSeleccionada").value;
    let bebida = $("#bebidaSeleccionada").value;
    let entrante = $("#entranteSeleccionada").value;
    let id = "menu" + this.productos.length;
    this.productos.push(new Menu(id, pizza, entrante, bebida))
    this.añadir(id);
  }


  guardarPedido(){
    let json = JSON.stringify(this.productos);
    window.sessionStorage.setItem("productos", json);
  }

  recuperarPedido(){
    let json = window.sessionStorage.getItem("productos");
    if(json){
      this.productos = JSON.parse(json);
      this.productos.forEach( p => {
        this.cambiarCantidad(p.id, p.cantidad);
      })
    } else {
      this.cargarDeNuevo();
    }
  }

  cargarDeNuevo() {
    let xml = menuLoader.loadXMLDoc("https://uo252376.github.io/SEW_JUNIO_2020/productos.xml");
    console.log(xml);
    let prodArray = [];
    let pizzas = xml.getElementsByTagName("pizza")
    for (var i=0; i<pizzas.length; i++) {
      let ingXmlArray = pizzas.item(i).getElementsByTagName("ingrediente");
      let ingredientes = [];
      for(var j=0; j<ingXmlArray.length; j++){
        ingredientes.push(ingXmlArray.item(j).text);
      }
      prodArray.push(new Pizza(pizzas.item(i).getAttribute("nombre"), pizzas.item(i).getAttribute("id"),pizzas.item(i).getAttribute("precio"), ingredientes));
    }

    let childs = xml.getElementsByTagName("productos").item(0).childNodes;
    for (var i=1;i<childs.length;i++){
      if(childs.item(i).nodeType == 1){
        let xmlProds = childs.item(i).childNodes;
        for (var j=0;j<xmlProds.length;j++){
          if(xmlProds.item(j).nodeType==1) {
            prodArray.push(new Producto(xmlProds.item(j).getAttribute("nombre"),xmlProds.item(j).getAttribute("id"),xmlProds.item(j).getAttribute("precio"),))
          }
        }
      }
    }

    this.productos = prodArray;
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
  }

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