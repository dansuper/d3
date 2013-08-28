function mostrarPorCargo(data, ejes, groups, filtro) {

    activarEjeCargos();

    ordenamientoPorCargo(data, filtro)

    groups
        .transition()
        .duration(TRANSITION_DURATION)
        .attr('opacity', function(d) {
            return d.__layout.cargo.display ? 1 : 0
        })
        .attr('transform', function(d) {
            var x = xScale(d.fechainicioyear);
            var y = d.__layout.cargo.display ? (d.__layout.cargo.altura * ALTO_BLOQUES || 0) + OFFSET_Y : ALTURA_OCULTAMIENTO;
            return 'translate(' + x + ',' + y + ')';
        });

    ejes.ejeCargos0
        .selectAll('g')
        .transition()
        .attr('opacity', function(d) {
            return d.display ? 1 : 0
        })
        .attr('transform', function(d) {
            var x = 0;
            var y = d.display ? (d.altura * ALTO_BLOQUES || 0) + OFFSET_Y : ALTURA_OCULTAMIENTO;
            return 'translate(' + x + ',' + y + ')';
        });

    ejes.ejeCargos1
        .selectAll('g')
        .transition()
        .attr('opacity', function(d) {
            return d.display ? 1 : 0
        })
        .attr('transform', function(d) {
            var x = 200;
            var y = d.display ? (d.altura * ALTO_BLOQUES || 0) + OFFSET_Y : ALTURA_OCULTAMIENTO;
            return 'translate(' + x + ',' + y + ')';
        });

    actualizarLayoutCurvas();

}


function inicializarDataEjesCargos(data, ejes, ejesCargoData) {

    _.each(data, function(d) {

        ejesCargoData.eje1[d.cargonominal] = {
            altura: 0,
            nombre: d.cargonominal,
            display: false
        };

        ejesCargoData.eje2[d.cargonominal + ' | ' + d.territorio] = {
            altura: 0,
            nombre: d.territorio,
            display: false,
            parentEje: ejesCargoData.eje1[d.cargonominal]
        };

    });

    ejes.ejeCargos0
        .selectAll('g')
        .data(_.map(ejesCargoData.eje1, function(d) {
            return d;
        }))
        .enter()
        .append('g')
        .attr('opacity', 0)
        .each(function(d) {

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

        });

    ejes.ejeCargos1
        .selectAll('g')
        .data(_.map(ejesCargoData.eje2, function(d) {
            return d;
        }))
        .enter()
        .append('g')
        .attr('opacity', 0)
        .each(function(d) {

            var g = d3.select(this);

            g.append('text')
                .attr('y', 18)
                .text(function(d) {
                    return d.nombre;
                })

        });


}

function ordenamientoPorCargo(data, filtro) {

    //Reset las alturas de los ejes
    _.each(ejesCargoData.eje1, function(d) {
        d.altura = 0;
        d.display = 0;
    });

    _.each(ejesCargoData.eje2, function(d) {
        d.altura = 0;
        d.display = 0;
    });

    //Reset todas las alturas de los cargos
    _.each(data, function(item) {
        item.__layout.cargo = {
            display: filtrarCargo(item, filtro),
            altura: 0
        };
    });

    var filteredData = _.filter(data, function(item) {
        return item.__layout.cargo.display;
    });

    var returnData = [];
    var alturaCargoNominal = 0;

    //Agrupar por cargo nominal
    var agrupado = _.sortBy(
        _.map(
            _.groupBy(filteredData,
                function(cargo) {
                    return cargo.cargonominal + ' | ' + cargo.territorio;
                }), function(el, key) {
                return {
                    nombre: key,
                    cargos: el
                }
            }), 'nombre');

    _.each(agrupado, function(item) {

        var cargonominal = item.nombre;
        var cargos = item.cargos;

        var procesados = [];
        var alturaMax = 0;

        ordenarPorNombreyFechaInicioYear(cargos);

        _.each(cargos, function(cargo) {

            cargo.altura = -1;
            var colision;

            do {
                colision = false;
                cargo.altura += 1;
                _.each(procesados, function(cargoProcesado) {
                    if (cargoProcesado.altura == cargo.altura && cargoProcesado.fechainicioyear < cargo.fechafinyear && cargoProcesado.fechafinyear > cargo.fechainicioyear) {
                        colision = true;
                    }
                });
            } while (colision);

            alturaMax = Math.max(alturaMax, cargo.altura);
            procesados.push(cargo);

            cargo.__layout.cargo.altura = alturaCargoNominal + cargo.altura; //Este es el offset Y total

            //Altura del label del eje2
            var keyEje2 = cargo.cargonominal + ' | ' + cargo.territorio;
            if (!ejesCargoData.eje2[keyEje2].display) {
                ejesCargoData.eje2[keyEje2].display = true;
                ejesCargoData.eje2[keyEje2].altura = cargo.__layout.cargo.altura;
                if (!ejesCargoData.eje1[cargo.cargonominal].display) {
                    ejesCargoData.eje1[cargo.cargonominal].display = true;
                    ejesCargoData.eje1[cargo.cargonominal].altura = cargo.__layout.cargo.altura;
                }
            }

        });

        alturaCargoNominal++;

        returnData.push({
            nombre: cargonominal,
            cargos: cargos,
            altura: alturaMax
        });

    });

    return returnData;
}

function strCmp(s1, s2) {
    if (s1 == s2) {
        return 0;
    } else {
        if (s1 > s2) {
            return 1;
        } else {
            return -1;
        }
    }
}

function ordenarPorNombreyFechaInicioYear(cargos) {
    cargos.sort(function(a, b) {
        return strCmp(a.nombre, b.nombre) || strCmp(a.territorio, b.territorio) || (a.fechainicioyear - b.fechainicioyear);
    });
}
