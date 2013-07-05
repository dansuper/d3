/**
 * Crea los nodos correspondientes a los valores de los ejes.
 * Se crean todos, pero permanecen ocultos (opacity=0) hasta
 * que se muestran los datos ordenados según alguno de los 
 * criterios.
 */
function inicializarEjes(){

  ejeCargos0.selectAll('g').data(cargosEjeInfo.eje0).enter().append('g')
    .each(function(d){
      
      var g = d3.select(this);

      g.append('text')
          .attr('font-size', 10)
          .attr('y',16)
          .text(function(d){ return d.label; })

    })
    .attr('transform', function(d){ 
      var x = 0;
      var y =  d.altura * OFFSET_Y;
      return 'translate(' + x + ',' + y + ')'; 
    })
  ;

  ejeCargos1.selectAll('g').data(cargosEjeInfo.eje1).enter().append('g')
    .each(function(d){
      
      var g = d3.select(this);

      g.append('text')
          .attr('font-size', 10)
          .attr('y',16)
          .text(function(d){ return d.label; })

    })
    .attr('transform', function(d){ 
      var x = 130;
      var y =  d.altura * OFFSET_Y;
      return 'translate(' + x + ',' + y + ')'; 
    })
  ;

  ejePersonas.selectAll('g').data(personasEjeInfo.personasYAltura).enter().append('g')
    .each(function(d, ix){

      var g = d3.select(this);

      g.append('text')
          .attr('font-size', 10)
          .attr('y',16)
          .text(function(d){ return d.nombre; })
    })
    .attr('transform', function(d){ 
      var x = 0;
      var y =  d.altura * OFFSET_Y;
      return 'translate(' + x + ',' + y + ')'; 
    });

}

function getPersonasEjeInfo(data){
  var listaPersonas = _.map(_.groupBy(data, function(d){return d.nombre}), function(value, key){ return key}).sort();
  var personasToAltura = _.reduce( listaPersonas , function(memo, value, index){ memo[value] = index; return memo; }, {});
  var personasYAltura = _.map(listaPersonas, function(el, ix){ return {nombre: el, altura: ix} });
  return {
    listaPersonas: listaPersonas,
    personasToAltura: personasToAltura, 
    personasYAltura : personasYAltura
  }
}

function activarEjePersonas(){
  ejePersonas.transition().attr('fill-opacity', 1);
  ejeCargos0.transition().attr('fill-opacity', 0);
  ejeCargos1.transition().attr('fill-opacity', 0);
}

function activarEjeCargos(){
  ejePersonas.transition().attr('fill-opacity', 0)
  ejeCargos0.transition().attr('fill-opacity', 1);
  ejeCargos1.transition().attr('fill-opacity', 1);
}
