class MenuLoader {

  constructor() {
    this.xml;
    this.xsl;
    this.xhttp
    console.log("MenuLoader created");
  }

  loadXMLDoc(filename) {
    if (window.XMLHttpRequest) {
      // code for modern browsers
      this.xhttp = new XMLHttpRequest();
    } else {
      // code for old IE browsers
      this.xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    this.xhttp.open("GET", filename, false);
    this.xhttp.send();
    return this.xhttp.responseXML; 
  }

  displayResult() {
    console.log("enter dispayResult");
    this.xml = this.loadXMLDoc("https://uo252376.github.io/SEW_JUNIO_2020/productos.xml");
    this.xsl = this.loadXMLDoc("https://uo252376.github.io/SEW_JUNIO_2020/carta.xsl");
    console.log(this.xml);
    // code for IE
    if (window.ActiveXObject || this.xhttp.responseType == "msxml-document") {
      let ex = this.xml.transformNode(this.xsl);
      document.getElementById("menuDisplay").innerHTML = ex;
    }
    // code for Chrome, Firefox, Opera, etc.
    else if (document.implementation && document.implementation.createDocument) {
      let xsltProcessor = new XSLTProcessor();
      xsltProcessor.importStylesheet(this.xsl);
      let resultDocument = xsltProcessor.transformToFragment(this.xml, document);
      document.getElementById("menuDisplay").appendChild(resultDocument);
    }
  }
}

let menuLoader = new MenuLoader();