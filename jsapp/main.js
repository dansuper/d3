
// "Constantes"
var width = 2200;
var height = 4800;

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
  .attr("width", width)
  .attr("height", height);

// Esto inicializa los rectángulos que representan a los cargos
var groups = inicializarCargosBloques(data);

var ejeCargos0 = svg.select('#ejeCargos0'); 
var ejeCargos1 = svg.select('#ejeCargos1'); 
var ejePersonas = svg.select('#ejePersonas');

inicializarEjes();

setButtonsEventHandlers();

//Inicialmente mostrar los cargos ordenados por nombre
mostrarPorNombre(true);
