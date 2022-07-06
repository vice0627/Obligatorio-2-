const venta = {
    
    ventas : [],
    clonVehiculos: [],
    clonClientes: [],
    clonVendedores: [],

    crear: function(id,fecha,cliente,vendedor,vehiculo){
      return {

        Id: id,
        Fecha: fecha,
        Cliente: cliente,
        Vendedor: vendedor,
        Vehiculo: vehiculo
      };
    },
    alta: function(){

        const id = document.getElementById("id").value;
        const fecha = document.getElementById("fecha").value;
        const cliente = document.getElementById("clientes").value;
        const vendedor = document.getElementById("vendedoresVenta").value;
        const vehiculo = document.getElementById("vehiculosEnVenta").value;

  if(id == "" || cliente == "" || vendedor == "" || vehiculo == ""){
   swal("Faltan datos.");
}
else{
        if(this.buscarPosicion(id) == -1){

            const venta = this.crear(id,fecha,cliente,vendedor,vehiculo);
            this.ventas.push(venta);
            this.listar();
            this.reset();
            memoria.escribir('ventas', this.ventas);
            swal("Venta ingresada con exito!!");
        }
        else if(this.buscarPosicion(id) > -1){
            swal("Error.La venta ya existe.");
        }
}
    },
    baja: function(){
        const id = document.getElementById('id').value;
        const posicion = this.buscarPosicion(id);
        if(posicion < 0){
            swal("Error el id de la venta no existe.");
        }else{
            this.ventas.splice(posicion, 1);
            this.reset();
            this.listar();
            swal("Venta eliminada con exito.");
            memoria.escribir('ventas', this.ventas);
        }
    },
    modificar : function (){
        const id = document.getElementById('id').value;
        const indice = this.buscarPosicion(id);
        
        if(indice > -1){

            const venta = this.ventas[indice];

            const fecha = document.getElementById("fecha").value;
            const cliente = document.getElementById("clientes").value;
            const vendedor = document.getElementById("vendedoresVenta").value;
            const vehiculo = document.getElementById("vehiculosEnVenta").value;
          
            venta.Cliente = cliente;
            venta.Vendedor = vendedor;
            venta.Vehiculo = vehiculo;
            venta.Fecha = fecha;

            this.reset();
            this.listar();
            swal("Venta modificada con exito!!");
            memoria.escribir('ventas', this.ventas);
        }
        else{
            swal("Error el id de la venta no existe.");
        }
     },
    buscarPosicion: function (id) {
        for (let posicion = 0; posicion < this.ventas.length; posicion++) {
            const objVenta = this.ventas[posicion];
            if (objVenta.Id == id) {
                return posicion;
            }
        }
        return -1;
    },
    listar: function(){
        
        const lista = document.getElementById('listaVentas').options;
        lista.length = 0;
        vehiculo = document.getElementById("vehiculosEnVenta").value;

        for (const venta of this.ventas) {
            
            const texto = "Id : " + venta.Id + ' |Fecha : ' + venta.Fecha  + ' |Cliente : ' +
            venta.Cliente + ' |Vendedor : ' + venta.Vendedor + " |Marca y modelo : " + venta.Vehiculo;

            const elemento = new Option(texto);
            lista.add(elemento);
        }
    },
    listaVehiculos : function() {
        const lista = document.getElementById('vehiculosEnVenta').options;
        lista.length = 0;
        for(const vehiculos of this.clonVehiculos){
         const texto = vehiculos.Marca + " " + vehiculos.Modelo;
         const elemento = new Option(texto);
         lista.add(elemento);
     }
     },
     listaClientes : function() {
        const lista = document.getElementById('clientes').options;
        lista.length = 0;
        for(const clientes of this.clonClientes){
         const texto = clientes.Apellido + " " + clientes.Nombre;
         const elemento = new Option(texto);
         lista.add(elemento);
     }
     },
     listaVendedores : function() {
        const lista = document.getElementById('vendedoresVenta').options;
        lista.length = 0;
        for(const vendedores of this.clonVendedores){
         const texto = vendedores.Apellido + " " + vendedores.Nombre;
         const elemento = new Option(texto);
         lista.add(elemento);
     }
     },
    reset: function () {
        document.getElementById("id").value = "";
        document.getElementById("fecha").value = "";
     },

     inicializar: function () {

        this.ventas = memoria.leer('ventas');
        this.clonVendedores = memoria.leer('vendedores');
        this.clonClientes = memoria.leer('clientes');
        this.clonVehiculos  = memoria.leer('vehiculos');

        this.listar();
        this.listaVehiculos();
        this.listaClientes();
        this.listaVendedores();
       },

     seleccionar: function(){
        const posicion = document.getElementById('listaVentas').selectedIndex;
        if(posicion < 0){
           swal('Error en seleccionar');
        }
        else{
          const venta = this.ventas[posicion];

          document.getElementById('id').value = venta.Id;
          document.getElementById('fecha').value = venta.Fecha;
          document.getElementById('cliente').value = venta.Cliente;
          document.getElementById('vendedor').value = venta.Vendedor;
          document.getElementById('vehiculo').value = venta.Vehiculo;
        }
     }
};