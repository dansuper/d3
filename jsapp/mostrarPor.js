function mostrarPorNombre(data, ejes, groups, filtro){
  
  var nombresAMostrar = {};

  _.each(data, function(d){
    var display = hayQueMostrar(d, filtro);
    if(display) nombresAMostrar[d.nombre] = 1 ;
    d.__layout.nombre = {
      display: display
    };
  });

  var listaPersonas = _.map(nombresAMostrar, function(value, key){ return key}).sort();
  var personasToAltura = _.reduce( listaPersonas , function(memo, value, index){ memo[value] = index; return memo; }, {});

  updateEjePersonas(ejes, personasToAltura);

  groups
  .transition()
  .attr('opacity', function(d){ return d.__layout.nombre.display ? 1 : 0 } )
  .attr('transform', function(d){ 
    var x = (parseInt(d.fechainicioyear) - 1970) * PIXELS_PER_YEAR + PIXELS_H_OFFSET;
    var y =  personasToAltura[d.nombre] * OFFSET_Y || 0;
    return 'translate(' + x + ',' + y + ')'; 
  })
  ;
}

function mostrarPorCargo(filtro){

  mostrandoPor = 'cargo';

  var alturasPorCargo = ejesInfo.cargosEjeInfo.alturasPorCargo;
  
  activarEjeCargos();

  var gru = avoidTransition ? groups : groups.transition();
  gru.attr('transform', function(d){ 
    var x = (parseInt(d.fechainicioyear) - 1970) * PIXELS_PER_YEAR + PIXELS_H_OFFSET;
    var y = alturasPorCargo[d.rowNumber] * OFFSET_Y;
    return 'translate(' + x + ',' + y + ')'; 
  });
}

function setButtonsEventHandlers(){
  // Event handlers para los botones
  d3.select('#btn1').on('click', function(){
    mostrarPorNombre();
  });

  d3.select('#btn2').on('click', function(){
    mostrarPorCargo();
  });  
}

function hayQueMostrar(cargo, filtro){
  if(cargo.nombre.indexOf(filtro.nombre)>-1){
    return true;
  }
  return false
}