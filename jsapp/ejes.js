/**
 * Crea los nodos correspondientes a los valores de los ejes.
 * Se crean todos, pero permanecen ocultos (opacity=0) hasta
 * que se muestran los datos ordenados según alguno de los 
 * criterios.
 */
function inicializarEjes(ejes, ejesInfo){

  /*
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
  */

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