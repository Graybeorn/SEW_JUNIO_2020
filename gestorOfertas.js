class GestorOfertas {

  constructor(){
    // Definir un selector estandar de ingrediente
    this.contadorSelector = 0;
    this.arrayIngredientes = [ 
      "Tomate natural",
      "Bonito",
      "Bacon",
      "Pollo",
      "Pollo picante",
      "Pimiento",
      "Aceitunas",
      "Aceitunas negras",
      "Gouda",
      "Mozzarella",
      "Jamón serrano",
      "Cabrales",
      "Pepperoni",
      "Alcaparras",
      "Anchoas",
      "Jamón york",
      "Piña",
      "Jalapeños",
      "Queso de cabra",
      "Cebolla",
      "Orégano",
      "Salsa barbacoa",
      "Nata",
    ];
  }

  start() {
    $(".selectorIngrediente").append(this.opcionesParaSelectorIngrediente());
    // Cargar opciones en los selectores de bebida, pizza y entrante
    this.opcionesParaSelectoresMenu();
  
  }

  opcionesParaSelectorIngrediente(){
    let aux = "<option value='' disabled selected>Selecciona un ingrediente</option>";
    this.arrayIngredientes.forEach(ing => {
      aux += "<option value='" + ing + "'>" + ing + "</option>";
    });
    return aux;
  }

  opcionesParaSelectoresMenu(){
    let aux = "<option value='' disabled selected>Selecciona una pizza</option>";
    servicioPedidos.productos.filter(p => p.id.includes("pizza")).forEach(pizza => {
      aux += "<option value='" + pizza.nombre + "'>" + pizza.nombre + "</option>";
    });
    $("#selectorPizza").append(aux);

    aux = "<option value='' disabled selected>Selecciona una bebida</option>";
    servicioPedidos.productos.filter(p => p.id.includes("bebida")).forEach(bebida => {
      aux += "<option value='" + bebida.nombre + "'>" + bebida.nombre + "</option>";
    });
    $("#selectorBebida").append(aux);
    
    aux = "<option value='' disabled selected>Selecciona un entrante</option>";
    servicioPedidos.productos.filter(p => p.id.includes("entrante")).forEach(entrante => {
      aux += "<option value='" + entrante.nombre + "'>" + entrante.nombre + "</option>";
    });
    $("#selectorEntrante").append(aux);
  }

  crearSelectorIngrediente(){
    let aux = "<div id='ingrediente" + this.contadorSelector + "'>" + 
        "<span>Ingrediente:</span>" + 
        "<select class='selectorIngrediente'>" +
          this.opcionesParaSelectorIngrediente() +      
        "</select>" + 
        "<button onclick=\"gestorOfertas.eliminarSelectorIngrediente('ingrediente" + this.contadorSelector + "')\">x</button></div>";
    $("#creadorPizza").append(aux);
  }

  eliminarSelectorIngrediente(id){
    $("#"+id).remove();
  }

  crearPizza(){
    let ingredientes = [];
    $(".selectorIngrediente").each( function(index){
      if($(this).val()) ingredientes.push($(this).val());
    });
    let nombre = "custom" + servicioPedidos.productos.length;
    let id = nombre;
    let precio = ingredientes.length > 2 ? 9.50 + (ingredientes.length - 2) * 0.40 : 9.50;
    servicioPedidos.productos.push(new Pizza(nombre, id, precio, ingredientes));
    servicioPedidos.añadir(id);
  }
   
  añadirMenu(){
    let pizza = $("#selectorPizza").val();
    let bebida = $("#selectorBebida").val();
    let entrante = $("#selectorEntrante").val();
    let id = "menu" + servicioPedidos.productos.length;
    servicioPedidos.productos.push(new Menu(id, pizza, entrante, bebida))
    servicioPedidos.añadir(id);
  }


  
}

var gestorOfertas = new GestorOfertas();