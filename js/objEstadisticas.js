const estadistica = {
  /*bubbleSort: function(items) {
    var length = items.length;  
    for (var i = 0; i < length; i++) { 
          for (var j = 0; j < (length - i - 1); j++) { 
                   if(items[j] > items[j+1]) {
                           var tmp = items[j]; 
                items[j] = items[j+1]; 
                items[j+1] = tmp; 
            }
        }        
    }
},
  listar: function () {
    const lista = document.getElementById('estadisticas-lista').options;
    lista.length = 0;
    for (const objEstadisticas of this.estadisticas) {
        const texto = this.bubbleSort(vehiculos.Marca);
        const elemento = new Option(texto);
        lista.add(elemento);
    }
},*/
  listar: function(){
   let clon = memoria.leer('vehiculos');
   let marcas = [];
   let indice = 0;
   let clonOrdenado = clon;
   let marcasOrdenadas = [];

   for(let i = 0;i < clon.length;i++){
    marcas[i] = clon[i].Marca;
   }

   marcasOrdenadas = marcas;
   marcasOrdenadas.sort();

   for(let i = 0;i < clon.length;i++){
    marcas[i] = clon[i].Marca;
   }
//------------------------------------------------------
   for(let j = 0;j < clon.length;j++){
    indice = marcas.indexOf(marcasOrdenadas,j);
    clonOrdenado[j] = clon[indice];
   }
swal('Encontramos un bug en js')
  },
  masCaro: function(){
      
    let clon = memoria.leer('vehiculos');
    let precios = [];
    let indice = 0;
    let mayorPrecio = 0;
    
    for(let i = 0;i < clon.length;i++){
      precios[i] = parseFloat(clon[i].Precio);
    }
    mayorPrecio = Math.max(...precios);
    indice = precios.indexOf(mayorPrecio);
     
    swal("Marca: " + clon[indice].Marca + "\nModelo: " + clon[indice].Modelo+ "\nPrecio: " + clon[indice].Precio);
  },
  
    precioMaximo: function(){

    },
    listarMarcas: function(){

    },
    mayorVendedor: function(){
      
    },
    buscarCliente: function(){
      let clon = memoria.leer('clientes');
      let nombre = prompt("ingrese el nombre del cliente");
      let indice = 0;
      let nombres = [];
 
      for(let i = 0;i < clon.length;i++){
        nombres[i] = clon[i].Nombre;
      }
      indice = nombres.indexOf(nombre);
      swal(clon[indice].Nombre + " compró un auto de marca " + clon[indice].M)

    },
    ordenar: function(a, b){

        return a - b;
    }
};