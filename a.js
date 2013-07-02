
var thisYear = (new Date()).getFullYear();
var cargosPosition = _.reduce(_.map(_.groupBy(data, function(d){return d.cargonominal}), function(value, key){ return key;}), function(memo, value, index){ memo[value] = index; return memo;}, {});
var personasPosition = _.reduce(_.map(_.groupBy(data, function(d){return d.nombre}), function(value, key){ return key}).sort(), function(memo, value, index){ memo[value] = index; return memo; }, {});

var width = 2200;
var height = 4800;

var PIXELS_PER_YEAR = 20;
var OFFSET_Y = 30;

var cargosPosition2 = getAlturasPorCargo(data);

var svg = d3.select('svg').attr("width", width)
  .attr("height", height);

var groups = svg.selectAll('g')
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

  });

function mostrarPorNombre(avoidTransition){
  var what = avoidTransition ? groups : groups.transition();
  what.attr('transform', function(d){ 
    var x = (parseInt(d.fechainicioyear) - 1970) * PIXELS_PER_YEAR;
    var y =  personasPosition[d.nombre] * OFFSET_Y;
    return 'translate(' + x + ',' + y + ')'; 
  });
}

function mostrarPorCargo(){
  groups.transition().attr('transform', function(d){ 
    var x = (parseInt(d.fechainicioyear) - 1970) * PIXELS_PER_YEAR;
    var y =  cargosPosition2[d.rowNumber] * OFFSET_Y;
    return 'translate(' + x + ',' + y + ')'; 
  });
}

function getDuracionCargo(d){
  return (parseInt(d.fechafinyear) || thisYear) - parseInt(d.fechainicioyear);
}

d3.select('#btn1').on('click', function(){
  mostrarPorNombre();
});

d3.select('#btn2').on('click', function(){
  mostrarPorCargo();
});

mostrarPorNombre(true);

//ok
