 const vendedor = {

    vendedores: [],

    crear: function (id, nombre, apellido) {
        return {
            Id: id,
            Nombre: nombre,
            Apellido: apellido
        };
    },

    alta: function () {
        const id = document.getElementById('vendedor-id').value;
        if (this.buscarPosicion(id) > -1) {
            swal('Error en alta: repetido.');
        } else {
            const nombre = document.getElementById('vendedor-nombre').value;
            const apellido = document.getElementById("vendedor-apellido").value;
            if(this.faltanDatos(id, nombre, apellido)){
				swal('Error en alta: faltan datos.');
			} else {
				const objVehiculo = this.crear(id, nombre, apellido);				
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

    modificar: function () {
        const id = document.getElementById('vendedor-id').value;
        const posicion = this.buscarPosicion(id);
        if (posicion < 0) {
            swal('Error en modificar: no existe.');
        } else {
            const objVendedor = this.vendedores[posicion];
            objVendedor.Nombre = document.getElementById('vendedor-nombre').value;
            objVendedor.Apellido = document.getElementById('vendedor-apellido').value;
            this.listar();
            this.reset();
            memoria.escribir('vendedores', this.vendedores);
        }
    },

    listar: function () {
        const lista = document.getElementById('vendedor-lista').options;
        lista.length = 0;
        for (const objVendedor of this.vendedores) {
            const texto = objVendedor.Id + ': ' + objVendedor.Nombre + ': ' + objVendedor.Apellido;
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
	
	faltanDatos: function (id, nombre, apellido){
	if(id == "" || apellido == "" || nombre == "")
		return true;
	else
		return false;
	},
	
    reset: function () {
       document.getElementById("vendedor-id").value = "";
       document.getElementById("vendedor-nombre").value = "";
       document.getElementById("vendedor-apellido").value = "";
    }
};