class Location {
  constructor(){
      this.infoWindow;
      this.map;
      this.initMap();
  }
  initMap(){
      this.map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 6
      });
      this.loadRestaurants();   
      this.infoWindow = new google.maps.InfoWindow;
      if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(this.showPosition.bind(this), this.showError.bind(this));
      } else {
          $("#info").text("Este buscador no ofrece soporte para geolocalizacion.");
      }
  }
  showPosition(position) {
      var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
      };

      var marker = new google.maps.Marker({position: pos, map: this.map});
      this.map.setCenter(pos);
  }

  showError(error) {
      switch(error.code) {
        case error.PERMISSION_DENIED:
            $("#info").text("Acceso denegado a Geolocalizacion");
          break;
        case error.POSITION_UNAVAILABLE:
            $("#info").text("Informacion no disponible.");
          break;
        case error.TIMEOUT:
            $("#info").text("La solicitud de permisos ha caducado.");
          break;
        case error.UNKNOWN_ERROR:
            $("#info").text("Ha sucedido un error desconocido.");
          break;
      }
  }

  resizeMap() {
    google.maps.event.trigger(this.map,'resize');
    this.map.setZoom( this.map.getZoom() );
  }

  loadRestaurants(){
    // Crear marker por cada restaurante
    let arr = [
      {x: 43.3833306, y: -5.6666694444444445},
      {x: 43.2916, y: -5.699380555555556},
      {x:43.3602889, y: -5.844761111111111},
      {x:43.4333306, y: -5.883330555555556},
      {x:43.5293111, y: -5.677319444444445},
      {x:43.5666694, y: -5.933330555555556}
    ];
    
    arr.forEach(rest => {
      new google.maps.Marker({
        map: this.map,
        position: {lat: rest.x, lng: rest.y},
        icon: "https://uo252376.github.io/SEW_JUNIO_2020/resources/blue-dot.png"
      });
    });
  }

}


function start() {
  var api = new Location();
  api.resizeMap();
}