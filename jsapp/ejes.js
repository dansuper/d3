/**
 * Crea los nodos correspondientes a los valores de los ejes.
 * Se crean todos, pero permanecen ocultos (opacity=0) hasta
 * que se muestran los datos ordenados según alguno de los 
 * criterios.
 */
function inicializarEjes(ejes, ejesInfo){

  ejes.ejeCargos0.selectAll('g').data(ejesInfo.cargosEjeInfo.eje0).enter().append('g')
    .each(function(d){
      
      var g = d3.select(this);

      g.append('text')
          .attr('y',18)
          .attr('x',5)
          .text(function(d){ return d.label; })

      g.append("line")
          .attr("x1",0)
          .attr("y1",-2)
          .attr("x2",CHART_WIDTH)
          .attr("y2",-2)
          .attr("stroke","#CCC");

    })
    .attr('transform', function(d){ 
      var x = 0;
      var y =  d.altura * OFFSET_Y;
      return 'translate(' + x + ',' + y + ')'; 
    })
  ;

  ejes.ejeCargos1.selectAll('g').data(ejesInfo.cargosEjeInfo.eje1).enter().append('g')
    .each(function(d){
      
      var g = d3.select(this);

      g.append('text')
          .attr('y',18)
          .text(function(d){ return d.label; })

    })
    .attr('transform', function(d){ 
      var x = 130;
      var y =  d.altura * OFFSET_Y;
      return 'translate(' + x + ',' + y + ')'; 
    })
  ;

  ejes.ejePersonas.selectAll('g').data(ejesInfo.personasEjeInfo.personasYAltura).enter().append('g')
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
  ejes.ejePersonas.transition().attr('opacity', 1);
  ejes.ejeCargos0.transition().attr('opacity', 0);
  ejes.ejeCargos1.transition().attr('opacity', 0);
}

function activarEjeCargos(){
  ejes.ejePersonas.transition().attr('opacity', 0)
  ejes.ejeCargos0.transition().attr('opacity', 1);
  ejes.ejeCargos1.transition().attr('opacity', 1);
}
