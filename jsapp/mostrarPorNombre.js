function mostrarPorNombre(data, ejes, groups, filtro) {

    var nombresAMostrar = {};

    _.each(data, function(d) {
        var display = filtrarCargo(d, filtro);
        if (display) nombresAMostrar[d.nombre] = 1;
        d.__layout.nombre = {
            display: display
        };
    });

    var listaPersonas = _.map(nombresAMostrar, function(value, key) {
        return key
    }).sort();
    var personasToAltura = _.reduce(listaPersonas, function(memo, value, index) {
        memo[value] = index;
        return memo;
    }, {});

    activarEjePersonas();

    updateEjePersonas(ejes, personasToAltura);

    groups
        .transition()
        .duration(TRANSITION_DURATION)
        .attr('opacity', function(d) {
            return d.__layout.nombre.display ? 1 : 0
        })
        .attr('transform', function(d) {
            var x = xScale(d.fechainicioyear);
            var y = d.__layout.nombre.display ? (personasToAltura[d.nombre] * ALTO_BLOQUES || 0) + OFFSET_Y : ALTURA_OCULTAMIENTO;
            return 'translate(' + x + ',' + y + ')';
        });

    ocultarCurvas();
}

function updateEjePersonas(ejes, personasToAltura) {
    ejes.ejePersonas.selectAll('g')
        .attr('transform', function(d) {
            var x = 0;
            var y = personasToAltura[d.nombre] !== undefined ? (personasToAltura[d.nombre] * ALTO_BLOQUES || 0) + OFFSET_Y : ALTURA_OCULTAMIENTO;
            return 'translate(' + x + ',' + y + ')';
        })
        .attr('opacity', function(d) {
            return personasToAltura[d.nombre] !== undefined ? 1 : 0;
        });
}

function inicializarEjeNombre(ejes, ejesInfo) {

    var dataEjePersonas = _.sortBy(_.map(_.groupBy(data, function(d) {
        return d.nombre
    }), function(v, k) {
        return {
            nombre: k
        };
    }), 'nombre');

    ejes.ejePersonas.selectAll('g').data(dataEjePersonas).enter().append('g')
        .each(function(d, ix) {

            var g = d3.select(this);

            g.append('text')
                .attr('y', 18)
                .attr('x', 5)
                .text(function(d) {
                    return d.nombre;
                })

            g.append("line")
                .attr("x1", 0)
                .attr("y1", -2)
                .attr("x2", CHART_WIDTH)
                .attr("y2", -2)
                .attr("stroke", "#CCC");

        })

    ;

}
