function layout(data, ejes, groups, tipoGrafico, filtro){
	if(tipoGrafico=="nombre"){
		mostrarPorNombre(data, ejes, groups, filtro);
	}else{
		//Tipo Gráfico: "cargo"
		mostrarPorCargo(data, ejes, groups, filtro);
	}
}