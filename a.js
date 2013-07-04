
normalizarDatos(data);

var thisYear = (new Date()).getFullYear();

var personasEjeInfo = _.map(_.groupBy(data, function(d){return d.nombre}), function(value, key){ return key}).sort();
var personasPosition = _.reduce( personasEjeInfo , function(memo, value, index){ memo[value] = index; return memo; }, {});

var cargosInfo = getAlturasPorCargo(data);

var width = 2200;
var height = 4800;

var PIXELS_PER_YEAR = 20;
var OFFSET_Y = 30;
var PIXELS_H_OFFSET = 200;

var svg = d3.select('svg')
  .attr("width", width)
  .attr("height", height);

var ejeCargos0 = svg.select('#ejeCargos0'); 
var ejeCargos1 = svg.select('#ejeCargos1'); 

var ejePersonas = svg.select('#ejePersonas');

var groups = svg.select('#cargos').selectAll('g')
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

function highlight(el){ 
  d3.select(el.childNodes[0]).transition().style('fill', 'rgb(255,0,0)');
}
function unhighlight(el){
  d3.select(el.childNodes[0]).transition().style('fill', 'rgb(255,255,255)');
}


function mostrarPorNombre(avoidTransition){
  
  ejePersonas.transition().attr('fill-opacity', 1);
  ejeCargos0.transition().attr('fill-opacity', 0);
  ejeCargos1.transition().attr('fill-opacity', 0);

  var what = avoidTransition ? groups : groups.transition();
  what.attr('transform', function(d){ 
    var x = (parseInt(d.fechainicioyear) - 1970) * PIXELS_PER_YEAR + PIXELS_H_OFFSET;
    var y =  personasPosition[d.nombre] * OFFSET_Y;
    return 'translate(' + x + ',' + y + ')'; 
  });
}

function mostrarPorCargo(){

  ejePersonas.transition().attr('fill-opacity', 0)
  ejeCargos0.transition().attr('fill-opacity', 1);
  ejeCargos1.transition().attr('fill-opacity', 1);
  
  var alturasPorCargo = cargosInfo.alturasPorCargo;

  groups.transition().attr('transform', function(d){ 
    var x = (parseInt(d.fechainicioyear) - 1970) * PIXELS_PER_YEAR + PIXELS_H_OFFSET;
    var y = alturasPorCargo[d.rowNumber] * OFFSET_Y;
    return 'translate(' + x + ',' + y + ')'; 
  });
}

function getDuracionCargo(d){
  var duracion = (parseInt(d.fechafinyear) || thisYear) - parseInt(d.fechainicioyear);
  return duracion ;
}

function normalizarDatos(data){
  _.each(data,function(cargo){
    cargo.territorio = cargo.territorio.trim().toLowerCase();
    cargo.nombre = cargo.nombre.trim().toLowerCase();
    cargo.cargonominal = cargo.cargonominal.trim().toLowerCase();
    cargo.fechainicioyear = parseInt(cargo.fechainicioyear);
    cargo.fechafinyear = parseInt(cargo.fechafinyear) || thisYear;
  });
}

d3.select('#btn1').on('click', function(){
  mostrarPorNombre();
});

d3.select('#btn2').on('click', function(){
  mostrarPorCargo();
});

mostrarPorNombre(true);

//ok
