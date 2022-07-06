
const estadistica = {
  vehiculosLista: [],
  listar: function(){
   
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

      let precio = prompt("Ingrese el precio por el que quiere filtrar los vehiculos.");
      let clonVehiculos = memoria.leer('vehiculos');
      let largo = clonVehiculos.length;
      
      for(let i = 0;i < largo;i++){
      let x = parseInt(clonVehiculos[i].Precio);
        if( x > precio){
          clonVehiculos.splice(i,1);
        }
      }
      this.vehiculosLista = clonVehiculos;
      this.listarPMaximo();
    },

    listarPMaximo: function(){

      const lista = document.getElementById('listaEstadisticas1').options;
        lista.length = 0;

        for (const vehiculo of this.vehiculosLista) {
            
            const texto = "Id : " + vehiculo.Id + ' |Marca : ' + vehiculo.Marca  + ' |Modelo : ' +
           vehiculo.Modelo + " |Precio : " + vehiculo.Precio;

            const elemento = new Option(texto);
            lista.add(elemento);
        }

    },
    mayorVendedor: function(){
      
    },
    buscarCliente: function(){

      const cliente = prompt("Ingrese el apellido y después el nombre del cliente para buscar que vehículo compró.");
      let ventas = memoria.leer('ventas');
       
      for(let i = 0; i < ventas.length;i++){
        if(ventas[i].Cliente == cliente){
          swal("El vehículo que compró " + cliente + " es un : " + ventas[i].Vehiculo);
        }
      }
    },

};