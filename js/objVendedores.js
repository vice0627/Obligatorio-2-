 const vendedor = {

    vendedores: [],

    crear: function (id, nombre, edad, salario) {
        return {
            Id: id,
            Nombre: nombre,
            Edad: edad,
            Salario: salario,
        };
    },
//cosas que estan random  en medio del codigo porque puedo y quiero lol frescaso estoy
//jijijaja
    alta: function () {
        const id = document.getElementById('vendedor-id').value;
        if (this.buscarPosicion(id) > -1) {
            alert('Error en alta: repetido.');
        } else {
            const nombre = document.getElementById('vendedor-nombre').value;
            const edad = document.getElementById("vendedor-edad").value;
            const salario = document.getElementById("vendedor-salario").value;
            if(this.faltanDatos(id, nombre, edad, salario)){
				alert('Error en alta: faltan datos.');
			} else {
				const objVehiculo = this.crear(id, nombre, edad, salario);				
				this.vendedores.push(objVehiculo);
				this.listar();
				this.reset();
                memoria.escribir('vendedores', this.vendedores);
                alert('vendedor ingresado con exito');
           }
		}
    },

    baja: function () {
        const id = document.getElementById('vendedor-id').value;
        const posicion = this.buscarPosicion(id);
        if (posicion < 0) {
            alert('Error en baja: no existe.');
        } else {
            this.vendedores.splice(posicion, 1);
            this.listar();
            this.reset();
            memoria.escribir('vendedores', this.vendedores);
            alert('El vendedor a sido eliminado con exito');
        }
    },
//que? pensaste que no habia otro comentario
    modificar: function () {
        const id = document.getElementById('vendedor-id').value;
        const posicion = this.buscarPosicion(id);
        if (posicion < 0) {
            alert('Error en modificar: no existe.');
        } else {
            const objVendedor = this.vendedores[posicion];
            objVendedor.Nombre = document.getElementById('vendedor-nombre').value;
            objVendedor.Edad = document.getElementById('vendedor-edad').value;
            objVendedor.Salario = document.getElementById('vendedor-salario').value;
            this.listar();
            this.reset();
            memoria.escribir('vendedores', this.vendedores);
        }
    },

    listar: function () {
        const lista = document.getElementById('vendedor-lista').value;
        lista.length = 0;
        for (const objVendedor of this.vendedores) {
            const texto = objVendedor.Id + ': ' + objVendedor.Nombre + ': ' + objVendedor.Edad + ': ' +
            objVendedor.Salario;
            const elemento = new Option(texto);
            lista.add(elemento);
        }
    },

    seleccionar: function(){
        const posicion = document.getElementById('vendedor-lista').selectedIndex;
        if (posicion < 0) {
            alert('Error en seleccionar.');
        } else {
            const objVendedor = this.vendedores[posicion];
            document.getElementById('vendedor-id').value = objVendedor.Id;
            document.getElementById('vendedor-nombre').value = objVendedor.Nombre;
            document.getElementById('vendedor-edad').value = objVendedor.Edad;
            document.getElementById('vendedor-salario').value = objVendedor.Salario;
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
	
	faltanDatos: function (id, nombre, edad, salario){
	if(id == "" || edad == "" || nombre == "" || salario == "")
		return true;
	else
		return false;
	},
	
    reset: function () {
        document.getElementById('pVendedores').reset();
    }
	
};