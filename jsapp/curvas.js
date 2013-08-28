var curvas;
var curvasData = [];

function inicializarCurvas(data) {

    var personas = _.groupBy(data, function(d) {
        return d.nombre;
    });

    _.each(personas, function(d) {
        var i;
        var cargosDeLaPersona = _.sortBy(d, 'fechainicioyear')

        for (i = 0; i < cargosDeLaPersona.length - 1; i++) {
            curvasData.push({
                izq: cargosDeLaPersona[i],
                der: cargosDeLaPersona[i + 1]
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
        .attr('stroke', 'red');

}

function actualizarLayoutCurvas() {
    var controlLenght = 100;
    var OFFSET_Y_CURVAS = 10;

    curvas
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
        .attr('opacity', 1);
}

function ocultarCurvas() {
    curvas.attr('opacity', 0);
}
