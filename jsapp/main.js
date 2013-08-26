
// "Constantes"
var CHART_WIDTH = 2200;
var CHART_HEIGHT = 4800;

var PIXELS_PER_YEAR = 20;
var OFFSET_Y = 30;
var PIXELS_H_OFFSET = 200;

var thisYear = (new Date()).getFullYear();

normalizarDatos(data);

// Inicialización de los datos de los ejes
var personasEjeInfo = getPersonasEjeInfo(data);
var cargosEjeInfo = getCargosEjeInfo(data);

// Inicialización del svg
var svg = d3.select('svg')
  .attr("width", CHART_WIDTH)
  .attr("height", CHART_HEIGHT);

// Esto inicializa los rectángulos que representan a los cargos
var groups = inicializarCargosBloques(data);

var ejeCargos0 = svg.select('#ejeCargos0'); 
var ejeCargos1 = svg.select('#ejeCargos1'); 
var ejePersonas = svg.select('#ejePersonas');

inicializarEjes();

setButtonsEventHandlers();

//Inicialmente mostrar los cargos ordenados por nombre
mostrarPorNombre(true);
