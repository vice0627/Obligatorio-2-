const memoria = {
	leer: function (clave) {
		const datos = sessionStorage.getItem(clave);
		if(datos){
			return JSON.parse(datos);
		}else{
			this.escribir(clave, []);
			return [];
		}		
	},
	
	escribir: function (clave, lista){
		sessionStorage.setItem(clave, JSON.stringify(lista));
	},	
}