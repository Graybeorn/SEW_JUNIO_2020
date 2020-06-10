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
}


function start() {
  var api = new Location();
}