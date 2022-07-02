 const vendedor = {

    vendedores: [],

    crear: function (id, nombre, apellido, ventas) {
        return {
            Id: id,
            Nombre: nombre,
            Apellido: apellido,
            Ventas: ventas,
        };
    },
//cosas que estan random  en medio del codigo porque puedo y quiero lol frescaso estoy
//jijijaja
    alta: function () {
        const id = document.getElementById('vendedor-id').value;
        if (this.buscarPosicion(id) > -1) {
            swal('Error en alta: repetido.');
        } else {
            const nombre = document.getElementById('vendedor-nombre').value;
            const apellido = document.getElementById("vendedor-apellido").value;
            const ventas = document.getElementById("vendedor-nDeVentas").value;
            if(this.faltanDatos(id, nombre, apellido, ventas)){
				swal('Error en alta: faltan datos.');
			} else {
				const objVehiculo = this.crear(id, nombre, apellido, ventas);				
				this.vendedores.push(objVehiculo);
				this.listar();
				this.reset();
                memoria.escribir('vendedores', this.vendedores);
                swal('vendedor ingresado con exito');
           }
		}
    },

    baja: function () {
        const id = document.getElementById('vendedor-id').value;
        const posicion = this.buscarPosicion(id);
        if (posicion < 0) {
            swal('Error en baja: no existe.');
        } else {
            this.vendedores.splice(posicion, 1);
            this.listar();
            this.reset();
            memoria.escribir('vendedores', this.vendedores);
            swal('El vendedor a sido eliminado con exito');
        }
    },
//que? pensaste que no habia otro comentario
    modificar: function () {
        const id = document.getElementById('vendedor-id').value;
        const posicion = this.buscarPosicion(id);
        if (posicion < 0) {
            swal('Error en modificar: no existe.');
        } else {
            const objVendedor = this.vendedores[posicion];
            objVendedor.Nombre = document.getElementById('vendedor-nombre').value;
            objVendedor.Apellido = document.getElementById('vendedor-apellido').value;
            objVendedor.Ventas = document.getElementById('vendedor-nDeVentas').value;
            this.listar();
            this.reset();
            memoria.escribir('vendedores', this.vendedores);
        }
    },

    listar: function () {
        const lista = document.getElementById('vendedor-lista').options;
        lista.length = 0;
        for (const objVendedor of this.vendedores) {
            const texto = objVendedor.Id + ': ' + objVendedor.Nombre + ': ' + objVendedor.Apellido + ': ' +
            objVendedor.Ventas;
            const elemento = new Option(texto);
            lista.add(elemento);
        }
    },

    seleccionar: function(){
        const posicion = document.getElementById('vendedor-lista').selectedIndex;
        if (posicion < 0) {
            swal('Error en seleccionar.');
        } else {
            const objVendedor = this.vendedores[posicion];
            document.getElementById('vendedor-id').value = objVendedor.Id;
            document.getElementById('vendedor-nombre').value = objVendedor.Nombre;
            document.getElementById('vendedor-apellido').value = objVendedor.Apellido;
            document.getElementById('vendedor-nDeVentas').value = objVendedor.Ventas;
        }
    },

    buscarPosicion: function (id) {
        for (let posicion = 0; posicion < this.vendedores.length; posicion++) {
            const objVendedor = this.vendedores[posicion];
            if (objVendedor.Id == id) {
                return posicion;
            }
        }
        return -1;
    },
	
	inicializar: function () {
        this.vendedores = memoria.leer('vendedores');
        this.listar();
    },
	
	faltanDatos: function (id, nombre, apellido, ventas){
	if(id == "" || apellido == "" || nombre == "" || ventas == "")
		return true;
	else
		return false;
	},
	
    reset: function () {
       document.getElementById("vendedor-id").value = "";
       document.getElementById("vendedor-nombre").value = "";
       document.getElementById("vendedor-apellido").value = "";
       document.getElementById("vendedor-nDeVentas").value = "";
    }
};