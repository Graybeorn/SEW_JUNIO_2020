
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
            servicioPedidos.cargarPedidoDeArchivo(reader.result);
          }
      }else{
         alert("Ese archivo no es del tipo adecuado. Escoge un .json");
      }
  }
}

let lector = new Lector();