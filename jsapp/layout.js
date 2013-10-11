function layout(data, ejes, groups, tipoGrafico, filtro) {

	var altura = CHART_HEIGHT;

    if (tipoGrafico == "nombre") {
        mostrarPorNombre(data, ejes, groups, filtro);
        altura = ejes.alturaMaxPersonas * ALTO_BLOQUES + 100;
    } else {
        //Tipo Gráfico: "cargo"
        mostrarPorCargo(data, ejes, groups, filtro);
    }

    //Setear la altura
	svg = d3.select('svg').attr("height", altura);

}
