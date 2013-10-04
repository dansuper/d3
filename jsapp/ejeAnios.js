function crearEjeAnios(data, svg, xScale) {

    var anios = getAniosMasUsados(data, 10);
    console.log(anios)
    anios.push(primerStartingYear, ultimoEndingYear);
    anios.push(1976, 1983);

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .tickFormat(d3.format("0"))
        .tickValues(anios);

    svg.append("g").attr("class", "axis")
        .attr("transform", "translate(0," + EJE_ANIOS_OFFSET_Y + ")")
        .call(xAxis);

}

function getAniosMasUsados(data, corte) {

    var ret;
    var toOrder = [];
    var i, count = {};
    var anios = data.cargos.map(function(cargo) {
        return parseInt(cargo['fechainicioyear'], 10)
    });

    anios.concat(data.cargos.map(function(cargo) {
        return parseInt(cargo['fechafinyear'], 10)
    }));

    for (i = 0; i < anios.length; i++) {
        if (count[anios[i]]) {
            count[anios[i]]++;
        } else {
            count[anios[i]] = 1;
        }
    }

    for (anios in count) {
        toOrder.push({
            anio: anios,
            veces: count[anios]
        });
    }

    ret = toOrder.sort(function(item1, item2) {
        return item2.veces - item1.veces
    }).slice(0, corte);

    return ret.map(function(item) {
        return item.anio;
    }).sort();
}
