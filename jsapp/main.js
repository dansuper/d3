// "Constantes"
var CHART_WIDTH = 1300;
var CHART_HEIGHT = 4800; //Not a constant anymore, hay que renombrar

var PIXELS_PER_YEAR = 20;
var ALTO_BLOQUES = 30; //Alto de los bloques
var PIXELS_H_OFFSET = 200;
var TRANSITION_DURATION = 1500;
var OFFSET_Y = 40; // USado para mover verticalmente los  blques y el eje vertical
var EJE_ANIOS_OFFSET_Y = 8;

var ALTURA_OCULTAMIENTO = CHART_HEIGHT; // Los elementos se van a mover acá cuando no se muestren

var thisYear = (new Date()).getFullYear();

var mostrandoPor = "nombre";

var svg;

//Estos 2 valores se recalculan después
var primerStartingYear = 2000;
var ultimoEndingYear = 2000;

data = __cargos_data;
normalizarDatos(data);

CHART_HEIGHT = ALTO_BLOQUES * _.size(_.groupBy(data.cargos, function(d){return d.persona_id})) + 50;

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
    personas : null
};

inicializarCurvas(data);

layout(data, ejes, groups, tipoGrafico, filtro);

setButtonsEventHandlers();

var filtroInput = d3.select('#filtro');
filtroInput.on('keyup', _.debounce(function() {
    var nombres = _.filter(_.map(filtroInput[0][0].value.toLowerCase().split(','), function(v) {
        return v.trim()
    }), function(v) {
        return v !== ""
    })

    var personasQueVan = _.filter(data.personas, function(p){
        var nombre = (p.nombre + ' ' + p.apellido).toLowerCase();
        for(var i = 0; i<nombres.length ; i++){
            if(nombre.indexOf(nombres[i]) > -1){
                return true;
            }
        }
        return false;
    });

    filtro.personas = personasQueVan.length ? 
        _.reduce(personasQueVan, function(memo, p){ memo[p.id] = p; return memo; }, {}) : 
        null;
    console.log(filtro.personas)

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

    _.each(data.cargos, function(d) {
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

//*** CIRCULITO QUE MARCA EL AÑO CUANDO EL MOUSE SE MUEVE 
var yearMarker = svg.append("g")
    .attr("class", "yearMarker")
    .style("display", "none");

yearMarker.append("circle")
    .attr("r", 5);

svg
    .on("mouseover", function() {
        yearMarker.style("display", null);
    })
    .on("mouseout", function() {
        yearMarker.style("display", "none");
    })
    .on("mousemove", mousemove);

function mousemove() {
    yearMarker.attr("transform", "translate(" + d3.mouse(this)[0] + ", " + EJE_ANIOS_OFFSET_Y + ")");
}
