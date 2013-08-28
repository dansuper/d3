// "Constantes"
var CHART_WIDTH = 1300;
var CHART_HEIGHT = 4800;

var PIXELS_PER_YEAR = 20;
var OFFSET_Y = 30;
var PIXELS_H_OFFSET = 200;
var TRANSITION_DELAY = 1500;

var thisYear = (new Date()).getFullYear();

var mostrandoPor = "nombre";

var svg;

var primerStartingYear = 2000;
var ultimoEndingYear = 2000;


normalizarDatos(data);

resetSVGCanvas();

var xScale = buildxScale(data);

// Esto inicializa los rectángulos que representan a los cargos
groups = inicializarCargosBloques(data);

initTooltip();

//global ejes
ejes = {
    ejeCargos0: svg.select('#ejeCargos0'),
    ejeCargos1: svg.select('#ejeCargos1'),
    ejePersonas: svg.select('#ejePersonas')
};

inicializarEjeNombre(ejes, data); //Eje por nombre

var ejesCargoData = {
    eje1: {},
    eje2: {}
};

inicializarDataEjesCargos(data, ejes, ejesCargoData);

tipoGrafico = "nombre"; // posibles valores: ['nombre', 'cargo']

filtro = {
    nombre: ''
};

layout(data, ejes, groups, tipoGrafico, filtro);

setButtonsEventHandlers();

var filtroInput = d3.select('#filtro');
filtroInput.on('keyup', _.debounce(function() {
    filtro.nombre = filtroInput[0][0].value.toLowerCase().trim();
    layout(data, ejes, groups, tipoGrafico, filtro);
}, 400));

crearEjeAnios(data, svg, xScale);

function resetSVGCanvas() {

    document.getElementById('svgContainer').innerHTML = document.getElementById('svgTemplate').innerHTML;

    // Inicialización del svg
    svg = d3.select('svg')
        .attr("width", CHART_WIDTH)
        .attr("height", CHART_HEIGHT);

}

function setButtonsEventHandlers() {
    // Event handlers para los botones
    d3.select('#radAgrupar-persona').on('click', function() {
        tipoGrafico = "nombre";
        layout(data, ejes, groups, tipoGrafico, filtro);
    });

    d3.select('#radAgrupar-cargo').on('click', function() {
        tipoGrafico = "cargo";
        layout(data, ejes, groups, tipoGrafico, filtro);
    });
}


function buildxScale(data) {
    // Armar el xScale

    _.each(data, function(d) {
        if (d.fechainicioyear < primerStartingYear) {
            primerStartingYear = d.fechainicioyear;
        }
        if (ultimoEndingYear < d.fechafinyear) {
            ultimoEndingYear = d.fechafinyear;
        }
    });

    var xScale = d3.scale.linear() // DEFINE ESCALA/RANGO DE EJE X
    .domain([primerStartingYear - 2, ultimoEndingYear + 2]) // RANGO DE AÃ‘OS DE ENTRADA
    .rangeRound([
	    PIXELS_H_OFFSET, // Límite izquierdo pixels
	    CHART_WIDTH //Limite derecho en pixels
    ]); 

    return xScale;

}
