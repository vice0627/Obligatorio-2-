const cliente = {

    clientes: [],

    crear: function (id, nombre, apellido, localidad) {
        return {
            Id: id,
            Nombre: nombre,
            Apellido: apellido,
            Localidad: localidad
        };
    },

    alta: function () {
        const id = document.getElementById('cliente-id').value;
        if (this.buscarPosicion(id) > -1) {
            swal('Error en alta: repetido.');
        } else {
            const nombre = document.getElementById('cliente-nombre').value;
            const apellido = document.getElementById("cliente-apellido").value;
            const localidad = document.getElementById("cliente-localidad").value;
            if(this.faltanDatos(id, nombre, apellido, localidad)){
				swal('Error en alta: faltan datos.');
			} else {
				const objCliente = this.crear(id, nombre, apellido, localidad);				
				this.clientes.push(objCliente);
				this.listar();
				this.reset();
                memoria.escribir('clientes', this.clientes);
                swal('cliente ingresado con exito');
           }
		}
    },

    baja: function () {
        const id = document.getElementById('cliente-id').value;
        const posicion = this.buscarPosicion(id);
        if (posicion < 0) {
            swal('Error en baja: no existe.');
        } else {
            this.clientes.splice(posicion, 1);
            this.listar();
            this.reset();
            memoria.escribir('clientes', this.clientes);
            swal('El cliente a sido eliminado con exito');
        }
    },

    modificar: function () {
        const id = document.getElementById('cliente-id').value;
        const posicion = this.buscarPosicion(id);
        if (posicion < 0) {
            swal('Error en modificar: no existe.');
        } else {
            const objCliente = this.clientes[posicion];
            objCliente.Nombre = document.getElementById('cliente-nombre').value;
            objCliente.Apellido = document.getElementById('cliente-apellido').value;
            objCliente.Localidad = document.getElementById('cliente-localidad').value;
            this.listar();
            this.reset();
            memoria.escribir('clientes', this.clientes);
            swal('Cliente modificado con exito')
        }
    },

    listar: function () {
        const lista = document.getElementById('cliente-lista').options;
        lista.length = 0;
        for (const objCliente of this.clientes) {
            const texto = objCliente.Id + ': ' + objCliente.Nombre + ': ' + objCliente.Apellido + ': ' +
            objCliente.Localidad;
            const elemento = new Option(texto);
            lista.add(elemento);
        }
    },

    seleccionar: function(){
        const posicion = document.getElementById('cliente-lista').selectedIndex;
        if (posicion < 0) {
            swal('Error en seleccionar.');
        } else {
            const objCliente = this.clientes[posicion];
            document.getElementById('cliente-id').value = objCliente.Id;
            document.getElementById('cliente-nombre').value = objCliente.Nombre;
            document.getElementById('cliente-apellido').value = objCliente.Apellido;
            document.getElementById('cliente-localidad').value = objCliente.Localidad;
        }
    },

    buscarPosicion: function (id) {
        for (let posicion = 0; posicion < this.clientes.length; posicion++) {
            const objCliente = this.clientes[posicion];
            if (objCliente.Id == id) {
                return posicion;
            }
        }
       return -1;
    },
	
	inicializar: function () {
        this.clientes = memoria.leer('clientes');
        this.listar();
    },
	
	faltanDatos: function (id, nombre, apellido, localidad){
	if(id == "" || apellido == "" || nombre == "" || localidad == "")
		return true;
	else
		return false;
	},
	
    reset: function () {
        document.getElementById("cliente-id").value = "";
        document.getElementById("cliente-nombre").value = "";
        document.getElementById("cliente-apellido").value = "";
        document.getElementById("cliente-localidad").value = "";   
    }
	
};