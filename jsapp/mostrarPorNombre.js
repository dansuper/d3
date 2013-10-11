function mostrarPorNombre(data, ejes, groups, filtro) {

    var nombresAMostrar = {};

    //Filtrar los cargos
    _.each(data.cargos, function(d) {
        var display = filtrarCargo(d, filtro);
        if (display) nombresAMostrar[d.persona_id] = 1;
        d.__layout.nombre = {
            display: display
        };
    });

    //Acá va el ordenamiento de las personas
    var listaPersonas = _.sortBy(_.map(nombresAMostrar, function(value, key) {
        return key
    }),function(persona_id){ return data.hashPersonas[persona_id].nombre + ' ' + data.hashPersonas[persona_id].apellido });

    var cargosAMostrar = _.filter(data.cargos, function(d){
        return d.__layout.nombre.display;
    });

    var cargosPorPersonas = _.groupBy(cargosAMostrar, function(c){
        return c.persona_id;
    });

    var alturasPersona = {};

    var alturaTotal = 0;
    _.each(listaPersonas, function(persona_id, ix){


        alturasPersona[persona_id] = 0;
        var currentAltura = 0;
        var cargos = cargosPorPersonas[persona_id];
        if(!cargos) return;

        cargos.sort(function(a,b){return a.fechainicioyear - b.fechainicioyear ;});

        var cargo;
        var processedCargos = [];
        var i;

        while(cargo = cargos.shift()){

            var collision = false;
            for(i=0;i<processedCargos.length;i++){
                var cargoProcesado = processedCargos[i];
                if(cargoProcesado.fechafinyear > cargo.fechainicioyear){
                    collision = true;
                }
            }

            if(collision) {
                currentAltura++;
            }
            cargo.altura = currentAltura;
            processedCargos.push(cargo);
        }
        
        alturasPersona[persona_id] = currentAltura;

    });

    activarEjePersonas();

    var personasToAltura = {}; 
    var acumH = 0;

    _.each(listaPersonas,  function(persona_id){
        personasToAltura[persona_id] = acumH;
        acumH += (1 + alturasPersona[persona_id]);
    });

    updateEjePersonas(ejes, personasToAltura);
    ejes.alturaMaxPersonas = acumH;
    groups
        .transition()
        .duration(TRANSITION_DURATION)
        .attr('opacity', function(d) {
            return d.__layout.nombre.display ? 1 : 0
        })
        .attr('transform', function(d) {
            var x = xScale(d.fechainicioyear);
            var y = d.__layout.nombre.display ? ( (personasToAltura[d.persona_id] + d.altura) * ALTO_BLOQUES || 0) + OFFSET_Y : ALTURA_OCULTAMIENTO;
            return 'translate(' + x + ',' + y + ')';
        });

    ocultarCurvas();
}

function updateEjePersonas(ejes, personasToAltura) {
    ejes.ejePersonas.selectAll('g')
        .attr('transform', function(d) {
            var x = 0;
            var y = personasToAltura[d.id] !== undefined ? (personasToAltura[d.id] * ALTO_BLOQUES || 0) + OFFSET_Y : ALTURA_OCULTAMIENTO;
            return 'translate(' + x + ',' + y + ')';
        })
        .attr('opacity', function(d) {
            return personasToAltura[d.id] !== undefined ? 1 : 0;
        });
}

function inicializarEjeNombre(ejes, ejesInfo) {

    var dataEjePersonas = _.sortBy(data.personas, function(p){ return p.nombre + ' ' + p.apellido });

    ejes.ejePersonas.selectAll('g').data(dataEjePersonas).enter().append('g')
        .each(function(d, ix) {

            var g = d3.select(this);

            g.append('text')
                .attr('y', 18)
                .attr('x', 5)
                .text(function(d) {
                    return d.nombre + ' ' + d.apellido;
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