const vehiculo = {

    vehiculos: [],

    crear: function (id, marca, modelo, precio, stock, modificado, nuevo) {
        return {
            Id: id,
            Marca: marca,
            Modelo: modelo,
            Precio: precio,
            Stock: stock,
            Modificado: modificado,
            Nuevo: nuevo
        };
    },

    alta: function () {
        const id = document.getElementById('vehiculo-id').value;
        if (this.buscarPosicion(id) > -1) {
            alert('Error en alta: repetido.');
        } else {
            const marca = document.getElementById('vehiculo-marca').value;
            const modelo = document.getElementById("vehiculo-modelo").value;
            const precio = document.getElementById("vehiculo-precio").value;
            const stock = document.getElementById("vehiculo-stock").value;
            const modificado = document.getElementById("vehiculo-modificado").value;
            const nuevo = document.getElementById("vehiculo-nuevo").value;
            if(this.faltanDatos(id, marca, modelo, precio, stock, modificado, nuevo)){
				alert('Error en alta: faltan datos.');
			} else {
				const objVehiculo = this.crear(id, marca, modelo, precio, stock, modificado, nuevo);				
				this.vehiculos.push(objVehiculo);
				this.listar();
				this.reset();
                memoria.escribir('vehiculos', this.vehiculos);
                alert('vehiculo ingresado con exito');
           }
		}
    },

    baja: function () {
        const id = document.getElementById('vehiculo-id').value;
        const posicion = this.buscarPosicion(id);
        if (posicion < 0) {
            alert('Error en baja: no existe.');
        } else {
            this.vehiculos.splice(posicion, 1);
            this.listar();
            this.reset();
            memoria.escribir('vehiculos', this.vehiculos);
            alert('El vehiculo a sido eliminado con exito');
        }
    },

    modificar: function () {
        const id = document.getElementById('vehiculo-id').value;
        const posicion = this.buscarPosicion(id);
        if (posicion < 0) {
            alert('Error en modificar: no existe.');
        } else {
            const objVehiculo = this.vehiculos[posicion];
            objVehiculo.Marca = document.getElementById('vehiculo-marca').value;
            objVehiculo.Modelo = document.getElementById('vehiculo-modelo').value;
            objVehiculo.Precio = document.getElementById('vehiculo-precio').value;
            objVehiculo.Stock = document.getElementById('vehiculo-stock').value;
            objVehiculo.Modificado = document.getElementById('vehiculo-modificado').value;
            objVehiculo.Nuevo = document.getElementById('vehiculo-nuevo').value;
            this.listar();
            this.reset();
            memoria.escribir('vehiculos', this.vehiculos);
        }
    },

    listar: function () {
        const lista = document.getElementById('vehiculo-lista').options;
        lista.length = 0;
        for (const objVehiculo of this.vehiculos) {
            const texto = objVehiculo.Id + ': ' + objVehiculo.Marca + ': ' + objVehiculo.Modelo + ': ' +
            objVehiculo.Precio + ': ' + objVehiculo.Stock + ': ' + objVehiculo.Modificado + ': ' + objVehiculo.Nuevo;
            const elemento = new Option(texto);
            lista.add(elemento);
        }
    },

    seleccionar: function(){
        const posicion = document.getElementById('vehiculo-lista').selectedIndex;
        if (posicion < 0) {
            alert('Error en seleccionar.');
        } else {
            const objVehiculo = this.vehiculos[posicion];
            document.getElementById('vehiculo-id').value = objVehiculo.Id;
            document.getElementById('vehiculo-marca').value = objVehiculo.Marca;
            document.getElementById('vehiculo-modelo').value = objVehiculo.Modelo;
            document.getElementById('vehiculo-precio').value = objVehiculo.Precio;
            document.getElementById('vehiculo-stock').value = objVehiculo.Stock;
            document.getElementById('vehiculo-modificado').value = objVehiculo.Modificado;
            document.getElementById('vehiculo-nuevo').value = objVehiculo.Nuevo
        }
    },

    buscarPosicion: function (id) {
        for (let posicion = 0; posicion < this.vehiculos.length; posicion++) {
            const objVehiculo = this.vehiculos[posicion];
            if (objVehiculo.Id == id) {
                return posicion;
            }
        }
        return -1;
    },
	
	inicializar: function () {
        this.vehiculos = memoria.leer('vehiculos');
        this.listar();
    },
	
	faltanDatos: function (id, marca, modelo, precio, stock, modificado, nuevo){
	if(id == "" || modelo == "" || marca == "" || precio == "" || stock == "" || modificado == "" || nuevo == "")
		return true;
	else
		return false;
	},
	
    reset: function () {
       document.getElementById("vehiculo-id").value = "";
       document.getElementById("vehiculo-marca").value = "";
       document.getElementById("vehiculo-modelo").value = "";
       document.getElementById("vehiculo-precio").value = "";
       document.getElementById("vehiculo-stock").value = "";
       document.getElementById("vehiculo-modificado").prop('checked',true); 
       document.getElementById("vehiculo-nuevo").prop('checked',true); 
    }
	
};