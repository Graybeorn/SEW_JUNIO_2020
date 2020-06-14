class RealizarPedido {
  constructor() {
    $(".recogida").each(function(index){
      $(this).toggle();
    });
    this.domicilio ="";
    this.recogida = "";
    $("#continuar").arrt("disabled", "true");
    this.boolDomicilio=true;
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
      $("#continuar").arrt("disabled", "true");
    }
  }

  setDireccion(){
    let aux = $("#direccion").val();
    localStorage.removeItem("restaurante");
    this.domicilio = "Entregar en: " + aux;
    $("#continuar").arrt("disabled", "false");
  }

  setRestaurante(){
    let aux = $("#restauranteRecogida").val();
    localStorage.removeItem("domicilio");
    this.restaurante = "Recoger en: " + aux;
    $("#continuar").arrt("disabled", "false");
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