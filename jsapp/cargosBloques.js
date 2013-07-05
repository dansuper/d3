/**
 * Crea los rectángulos que representan los cargos.
 * 
 * Acá se setea el ancho (duración) y el offset X (el comienzo) 
 *
 * @param {data} el array de cargos
 */
function inicializarCargosBloques(data){

  var cargosBloques = svg.select('#cargos').selectAll('g')
  .data(data)
  .enter()
  .append('g')
  .each(function(d){

    var g = d3.select(this);
    
    g.append('rect')
      .attr('width', getDuracionCargo(d) * PIXELS_PER_YEAR - 3 )
      .attr('height', 25)
      .attr('style', "stroke:black;stroke-width:1;fill:white")

    g.append('text')
      .attr('y', 12)
      .attr('font-size', 10)
      .text(function(d){ return d.cargonominal; })

    g.append('text')
      .attr('y', 22)
      .attr('font-size', 10)
      .text(function(d){ return d.nombre; })

  })
  .on("mouseover", function(d){
    showTooltip(d);
    highlight(this);
  })
  .on("mouseout", function(d){
    hideTooltip();
    unhighlight(this);
  })
  .on("mousemove", function(d){
    moveTooltip(d3.event);
  })
  ;

  return cargosBloques;
}

function getDuracionCargo(d){
  var duracion = (parseInt(d.fechafinyear) || thisYear) - parseInt(d.fechainicioyear);
  return duracion ;
}

function highlight(el){ 
  d3.select(el.childNodes[0]).transition().style('fill', 'rgb(255,0,0)');
}

function unhighlight(el){
  d3.select(el.childNodes[0]).transition().style('fill', 'rgb(255,255,255)');
}

