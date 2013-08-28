function mostrarPorNombre(data, ejes, groups, filtro){
  
  var nombresAMostrar = {};

  _.each(data, function(d){
    var display = filtrarCargo(d, filtro);
    if(display) nombresAMostrar[d.nombre] = 1 ;
    d.__layout.nombre = {
      display: display
    };
  });

  var listaPersonas = _.map(nombresAMostrar, function(value, key){ return key}).sort();
  var personasToAltura = _.reduce( listaPersonas , function(memo, value, index){ memo[value] = index; return memo; }, {});

  activarEjePersonas();

  updateEjePersonas(ejes, personasToAltura);

  groups
  .transition()
  .duration(TRANSITION_DELAY)
  .attr('opacity', function(d){ return d.__layout.nombre.display ? 1 : 0 } )
  .attr('transform', function(d){ 
    var x = (parseInt(d.fechainicioyear) - 1970) * PIXELS_PER_YEAR + PIXELS_H_OFFSET;
    var y =  personasToAltura[d.nombre] * OFFSET_Y || 0;
    return 'translate(' + x + ',' + y + ')'; 
  })
  ;
}

function updateEjePersonas(ejes, personasToAltura){
  ejes.ejePersonas.selectAll('g')
  .attr('transform', function(d){
    var x = 0;
    var y = personasToAltura[d.nombre] * OFFSET_Y || 0;
    return 'translate(' + x + ',' + y + ')'; 
  })
  .attr('opacity', function(d){
    return personasToAltura[d.nombre] !== undefined ? 1 : 0;
  })
  ;
}

function inicializarEjeNombre(ejes, ejesInfo){

  var dataEjePersonas = _.sortBy( _.map(_.groupBy(data, function(d){ return d.nombre}), function(v,k){ return {nombre: k};}) , 'nombre');

  ejes.ejePersonas.selectAll('g').data(dataEjePersonas).enter().append('g')
    .each(function(d, ix){

      var g = d3.select(this);

      g.append('text')
          .attr('y',18)
          .attr('x',5)
          .text(function(d){ return d.nombre; })

      g.append("line")
          .attr("x1",0)
          .attr("y1",OFFSET_Y - 3)
          .attr("x2",CHART_WIDTH)
          .attr("y2",OFFSET_Y - 3)
          .attr("stroke","#CCC");

    })
 
    ;

}
