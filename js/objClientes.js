const cliente = {

    clientes: [],

    crear: function (id, nombre, edad, localidad) {
        return {
            Id: id,
            Nombre: nombre,
            Edad: edad,
            Localidad: localidad
        };
    },

    alta: function () {
        const id = document.getElementById('cliente-id').value;
        if (this.buscarPosicion(id) > -1) {
            alert('Error en alta: repetido.');
        } else {
            const nombre = document.getElementById('cliente-nombre').value;
            const edad = document.getElementById("cliente-edad").value;
            const localidad = document.getElementById("cliente-localidad").value;
            if(this.faltanDatos(id, nombre, edad, localidad)){
				alert('Error en alta: faltan datos.');
			} else {
				const objCliente = this.crear(id, nombre, edad, localidad);				
				this.clientes.push(objCliente);
				this.listar();
				this.reset();
                memoria.escribir('clientes', this.clientes);
                alert('cliente ingresado con exito');
           }
		}
    },

    baja: function () {
        const id = document.getElementById('cliente-id').value;
        const posicion = this.buscarPosicion(id);
        if (posicion < 0) {
            alert('Error en baja: no existe.');
        } else {
            this.clientes.splice(posicion, 1);
            this.listar();
            this.reset();
            memoria.escribir('clientes', this.clientes);
            alert('El cliente a sido eliminado con exito');
        }
    },

    modificar: function () {
        const id = document.getElementById('cliente-id').value;
        const posicion = this.buscarPosicion(id);
        if (posicion < 0) {
            alert('Error en modificar: no existe.');
        } else {
            const objCliente = this.clientes[posicion];
            objCliente.Nombre = document.getElementById('cliente-nombre').value;
            objCliente.Edad = document.getElementById('cliente-edad').value;
            objCliente.Localidad = document.getElementById('cliente-localidad').value;
            this.listar();
            this.reset();
            memoria.escribir('clientes', this.clientes);
            alert('Cliente modificado con exito')
        }
    },

    listar: function () {
        const lista = document.getElementById('cliente-lista').options;
        lista.length = 0;
        for (const objCliente of this.clientes) {
            const texto = objCliente.Id + ': ' + objCliente.Nombre + ': ' + objCliente.Edad + ': ' +
            objCliente.Localidad;
            const elemento = new Option(texto);
            lista.add(elemento);
        }
    },

    seleccionar: function(){
        const posicion = document.getElementById('cliente-lista').selectedIndex;
        if (posicion < 0) {
            alert('Error en seleccionar.');
        } else {
            const objCliente = this.clientes[posicion];
            document.getElementById('cliente-id').value = objCliente.Id;
            document.getElementById('cliente-nombre').value = objCliente.Nombre;
            document.getElementById('cliente-edad').value = objCliente.Edad;
            document.getElementById('cliente-localidad').value = objCliente.Localidad;
        }
    },

    buscarPosicion: function (id) {
        for (let posicion = 0; posicion < this.clientes.length; posicion++) {
            const objCliente = this.clientes[posicion];
            if (objCliente.id == id) {
                return posicion;
            }
        }
        return -1;
    },
	
	inicializar: function () {
        this.clientes = memoria.leer('clientes');
        this.listar();
    },
	
	faltanDatos: function (id, nombre, edad, localidad){
	if(id == "" || edad == "" || nombre == "" || localidad == "")
		return true;
	else
		return false;
	},
	
    reset: function () {
        document.getElementById('pClientes').reset();
    }
	
};