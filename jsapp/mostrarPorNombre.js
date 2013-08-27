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

