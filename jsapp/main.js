
// "Constantes"
var CHART_WIDTH = 2200;
var CHART_HEIGHT = 4800;

var PIXELS_PER_YEAR = 20;
var OFFSET_Y = 30;
var PIXELS_H_OFFSET = 200;
var TRANSITION_DELAY = 1500;

var thisYear = (new Date()).getFullYear();

var mostrandoPor = "nombre";

normalizarDatos(data);

resetSVGCanvas(); 

// Esto inicializa los rectángulos que representan a los cargos
groups = inicializarCargosBloques(data);

/*
// Inicialización de los datos de los ejes
ejesInfo = {
	personasEjeInfo: getPersonasEjeInfo(data),
	cargosEjeInfo: getCargosEjeInfo(data)
};

*/

//global ejes
ejes = { 
	ejeCargos0: svg.select('#ejeCargos0'),
	ejeCargos1: svg.select('#ejeCargos1'), 
	ejePersonas: svg.select('#ejePersonas')
};

inicializarEjes(ejes, data);

tipoGrafico = "nombre"; // posibles valores: ['nombre', 'cargo']

filtro = {
	nombre: ''
};

layout(data, ejes, groups, tipoGrafico, filtro);

//mostrarPorNombre();

//setButtonsEventHandlers();

var filtroInput = d3.select('#filtro');
filtroInput.on('keyup', _.debounce(keyupHandler, 200));

function keyupHandler(){

	filtro.nombre = filtroInput[0][0].value.toLowerCase().trim();

	console.log(filtro)

	layout(data, ejes, groups, tipoGrafico, filtro);	

	// if(mostrandoPor=="nombre"){
	// 	mostrarPorNombre(true);
	// }else{
	// 	mostrarPorCargo(true);
	// }
}

function resetSVGCanvas(){

	document.getElementById('svgContainer').innerHTML = document.getElementById('svgTemplate').innerHTML;

	// Inicialización del svg
	 svg = d3.select('svg')
	  .attr("width", CHART_WIDTH)
	  .attr("height", CHART_HEIGHT);

}