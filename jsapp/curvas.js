var curvas;
var curvasData = [];
var color = d3.scale.category20();
var ii = 0;

function inicializarCurvas(data) {

    var personas = _.groupBy(data, function(d) {
        return d.nombre;
    });

    _.each(personas, function(d,index) {
        var i;
        var cargosDeLaPersona = _.sortBy(d, 'fechainicioyear')


        for (i = 0; i < cargosDeLaPersona.length - 1; i++) {
            curvasData.push({
                izq: cargosDeLaPersona[i],
                der: cargosDeLaPersona[i + 1],
                colorStroke: color(index)
            });
        }

    });

    curvas = svg.select('#curvas')
        .selectAll('path')
        .data(curvasData)
        .enter()
        .append('path')
        .attr('opacity', 0)
        .attr('fill', 'none')
        .attr('stroke', 'red')
        .attr('stroke-width', '2px');

}

function actualizarLayoutCurvas() {
    var controlLenght = 20;
    var OFFSET_Y_CURVAS = 10;

    curvas
        .attr('opacity', 1)
        .transition()
        .duration(TRANSITION_DURATION)
        .attr('d', function(d) {

            var fromX = xScale(d.izq.fechafinyear) - 2;
            var fromY = d.izq.__layout.cargo.display ? (d.izq.__layout.cargo.altura * ALTO_BLOQUES || 0) + OFFSET_Y + OFFSET_Y_CURVAS : ALTURA_OCULTAMIENTO;

            var control1X = fromX + controlLenght;
            var control1Y = fromY;

            var toX = xScale(d.der.fechainicioyear);
            var toY = d.der.__layout.cargo.display ? (d.der.__layout.cargo.altura * ALTO_BLOQUES || 0) + OFFSET_Y + OFFSET_Y_CURVAS : ALTURA_OCULTAMIENTO;

            var contorl2X = toX - controlLenght;
            var control2Y = toY;

            //"M100,200 C10,10 400,10 400,200";
            return "M" + fromX + "," + fromY + " C" + control1X + "," + control1Y + " " + contorl2X + "," + control2Y + " " + toX + "," + toY;

        })
        .attr('stroke', function(d){return d.colorStroke})
        ;
}

function ocultarCurvas() {
    curvas.attr('opacity', 0)
}
