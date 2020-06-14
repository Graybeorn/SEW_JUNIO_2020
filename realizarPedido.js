class RealizarPedido {
  constructor() {
    this.domicilio ="";
    this.recogida = "";
    this.boolDomicilio=true;
  }

  init(){
    $(".recogida").each(function(index){
      $(this).toggle();
    });
    $("#continuar").prop("disabled", true);
  }

  toggleView(){
    $(".domicilio").each(function(index){
      $(this).toggle();
    });
    $(".recogida").each(function(index){
      $(this).toggle();
    });
    this.boolDomicilio = !this.boolDomicilio;
    if((this.boolDomicilio && ! this.domicilio) || ( !this.boolDomicilio && !this.restaurante)){
      $("#continuar").prop("disabled", true);
    }
  }

  setDireccion(){
    let aux = $("#direccion").val();
    this.domicilio = "Entregar en: " + aux;
    $("#continuar").prop("disabled", false);
  }

  setRestaurante(){
    let aux = $("#restauranteRecogida").val();
    this.restaurante = "Recoger en: " + aux;
    $("#continuar").prop("disabled", false);
  }

  avanzar(){
    if(this.boolDomicilio){
      localStorage.setItem("tipoPedido", this.domicilio);
    } else {
      localStorage.setItem("tipoPedido", this.restaurante);
    }
    window.location.href = "./validar_pedido.html";
  }


}

let realizarPedido = new RealizarPedido();