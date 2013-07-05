function mostrarPorNombre(avoidTransition){

  activarEjePersonas(); 

  var gru = avoidTransition ? groups : groups.transition();
  gru.attr('transform', function(d){ 
    var x = (parseInt(d.fechainicioyear) - 1970) * PIXELS_PER_YEAR + PIXELS_H_OFFSET;
    var y =  personasEjeInfo.personasToAltura[d.nombre] * OFFSET_Y;
    return 'translate(' + x + ',' + y + ')'; 
  });
}

function mostrarPorCargo(){

  activarEjeCargos();

  var alturasPorCargo = cargosEjeInfo.alturasPorCargo;

  groups.transition().attr('transform', function(d){ 
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
