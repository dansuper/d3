
// "Constantes"
var CHART_WIDTH = 2200;
var CHART_HEIGHT = 4800;

var PIXELS_PER_YEAR = 20;
var OFFSET_Y = 30;
var PIXELS_H_OFFSET = 200;

var thisYear = (new Date()).getFullYear();

var mostrandoPor = "nombre";

normalizarDatos(data);

function drawViz(data){

	initSVG();

	// Inicialización de los datos de los ejes
	ejesInfo = {
		personasEjeInfo: getPersonasEjeInfo(data),
		cargosEjeInfo: getCargosEjeInfo(data)
	};

	//global ejes
	ejes = { 
		ejeCargos0: svg.select('#ejeCargos0'),
		ejeCargos1: svg.select('#ejeCargos1'), 
		ejePersonas: svg.select('#ejePersonas')
	};
	
	inicializarEjes(ejes, ejesInfo);

	// Esto inicializa los rectángulos que representan a los cargos
	groups = inicializarCargosBloques(data);

}


drawViz(data);

mostrarPorNombre(true);

setButtonsEventHandlers();


var filtro = d3.select('#filtro');
filtro.on('keyup', _.debounce(keyupHandler, 200));

function keyupHandler(){

	var filteredData;
	var filterValue = filtro[0][0].value.toLowerCase().trim();

	if(filterValue){
		filteredData = _.filter(data, function(d){
			return d.nombre.indexOf( filterValue ) > -1;
		});
	}else{
		filteredData = data; // no need to copy
	}

	drawViz(filteredData);


	if(mostrandoPor=="nombre"){
		mostrarPorNombre(true);
	}else{
		mostrarPorCargo(true);
	}
}

function initSVG(){

	document.getElementById('svgContainer').innerHTML = document.getElementById('svgTemplate').innerHTML;

	// Inicialización del svg
	 svg = d3.select('svg')
	  .attr("width", CHART_WIDTH)
	  .attr("height", CHART_HEIGHT);

}