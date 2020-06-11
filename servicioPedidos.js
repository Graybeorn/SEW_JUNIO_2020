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
    this.productos.filter(p => p.id == id)[0].cantidad++;
    this.guardarPedido();
  }

  retirar(id){
    let producto = this.productos.filter(p => p.id == id)[0];
    if(producto.cantidad > 0){
      producto.cantidad--;
    }
    this.guardarPedido();
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
    json = window.sessionStorage.getItem("productos");
    if(json){
      this.productos = JSON.parse(json);
    } else {
      cargarDeNuevo();
    }
  }

  cargarDeNuevo() {
    let xml = menuLoader.loadXMLDoc("https://uo252376.github.io/SEW_JUNIO_2020/productos.xml");
    console.log(xml);
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