/**
 * Crea los rectángulos que representan los cargos.
 *
 * Acá se setea el ancho (duración) y el offset X (el comienzo)
 *
 * @param {data} el array de cargos
 */

function inicializarCargosBloques(data) {

    var cargosBloques = svg.select('#cargos').selectAll('g')
        .data(data)
        .enter()
        .append('g')
        .attr('opacity', 0)
        .each(function(d) {

            var g = d3.select(this);

            g.append('rect')
                .attr('width', xScale(d.fechafinyear) - xScale(d.fechainicioyear) - 2)
                .attr('height', ALTO_BLOQUES - 4)
                .attr('class', function(d) {
                    return d.cargotipo;
                })

            g.append('text')
                .attr('y', 10)
                .attr('x', 2)
                .attr('font-size', 8)
                .attr('class', 'cargo')
                .text(function(d) {
                    return d.cargonominal;
                })

            g.append('text')
                .attr('y', 20)
                .attr('x', 2)
                .attr('font-size', 8)
                .attr('class', 'nombre')
                .text(function(d) {
                    return d.nombre;
                })

        })
        .on("mouseover", function(d) {
            showTooltip(d);
            highlight(this);
        })
        .on("mouseout", function(d) {
            hideTooltip();
            unhighlight(this);
        })
        .on("mousemove", function(d) {
            moveTooltip(d3.event);
        });

    return cargosBloques;
}

function highlight(el) {
    d3.select(el.childNodes[0]).transition().style('opacity', '1');
}

function unhighlight(el) {
    d3.select(el.childNodes[0]).transition().style('opacity', '0.5');
}
