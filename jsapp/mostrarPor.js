function mostrarPorNombre(avoidTransition){

  mostrandoPor = 'nombre';

  activarEjePersonas(); 

  var gru = avoidTransition ? groups : groups.transition();
  gru.attr('transform', function(d){ 
    var x = (parseInt(d.fechainicioyear) - 1970) * PIXELS_PER_YEAR + PIXELS_H_OFFSET;
    var y =  ejesInfo.personasEjeInfo.personasToAltura[d.nombre] * OFFSET_Y;
    return 'translate(' + x + ',' + y + ')'; 
  });
}

function mostrarPorCargo(avoidTransition){

  mostrandoPor = 'cargo';

  activarEjeCargos();

  var alturasPorCargo = ejesInfo.cargosEjeInfo.alturasPorCargo;

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
