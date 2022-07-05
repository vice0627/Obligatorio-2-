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
        const cliente = document.getElementById("cliente");
        const vendedor = document.getElementById("vendedor");
        const vehiculo = document.getElementById("vehiculo");

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
        for (const venta of this.ventas) {
            const texto = "Id : " + venta.Id + '|Fecha : ' + venta.Fecha  + '|Cliente : ' +
            venta.Cliente + '|Vendedor : ' + venta.Vendedor;
            const elemento = new Option(texto);
            lista.add(elemento);
        }
    },
    listaVehiculos : function() {
        const lista = document.getElementById('vehiculosEnVenta').options;
        lista.length = 0;
        for(const vehiculos of this.clonVehiculos){
         const texto = vehiculos.Id;
         const elemento = new Option(texto);
         lista.add(elemento);
     }
     },
     listaClientes : function() {
        const lista = document.getElementById('clientes').options;
        lista.length = 0;
        for(const clientes of this.clonClientes){
         const texto = clientes.Id;
         const elemento = new Option(texto);
         lista.add(elemento);
     }
     },
     listaVendedores : function() {
        const lista = document.getElementById('vendedoresVenta').options;
        lista.length = 0;
        for(const vendedores of this.clonVendedores){
         const texto = vendedores.Id;
         const elemento = new Option(texto);
         lista.add(elemento);
     }
     },
    reset: function () {
        document.getElementById("id").value = "";
        document.getElementById("fecha").value = "";
        document.getElementById("cliente").value = "";
        document.getElementById("vendedor").value = "";
        document.getElementById("vehiculo").value = "";
      
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
           alert('Error en seleccionar');
        }
        else{
          const objVentas = this.ventas[posicion];

          document.getElementById('id').value = objVentas.Id;
          document.getElementById('fecha').value = objVentas.Fecha;
          document.getElementById('cliente').value = objVentas.Cliente;
          document.getElementById('vendedor').value = objVentas.Vendedor;
          document.getElementById('vehiculo').value = objVentas.Vehiculo;
        }
     }
};