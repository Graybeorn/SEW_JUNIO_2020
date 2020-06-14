class Divisas {
  constructor() {
      this.url1 = "https://currency-converter5.p.rapidapi.com/currency/historical/2018-02-09?format=json&to=";
      this.url2 = "&from=EUR&amount=1"
      this.par = {
          async: true,
          crossDomain: true,
          url: "",
          method: "GET",
          success: function(data){
              this.setData(data);
          }.bind(this),
          error: function() {
              console.log("Error personalizado");
          },
          headers: {
              "x-rapidapi-host": "currency-converter5.p.rapidapi.com",
              "x-rapidapi-key": "49e9a7cb4bmshe0c4a371ccaeac9p1b087ejsnfabb0d1a4810"
          }
      }
      this.getCurrency();
  }

  getCurrency(){
      this.par.url = this.url1 + "USD" + this.url2;
      $.ajax(this.par);
      this.par.url = this.url1 + "JPY" + this.url2;
      $.ajax(this.par);
      this.par.url = this.url1 + "GBP " + this.url2;
      $.ajax(this.par);
      this.par.url = this.url1 + "CNY" + this.url2;
      $.ajax(this.par);
      this.par.url = this.url1 + "KRW" + this.url2;
      $.ajax(this.par);
  }

  setData(data){
      console.log(data);
      $('#table tr:last').after('<tr><td>'+data.rates[Object.keys(data.rates)[0]].currency_name+'</td><td>'+data.rates[Object.keys(data.rates)[0]].rate
      +'</td></tr>');

      // Set the data in the selector with the names and multipliers on change
  }
}

var climate = new Divisas();