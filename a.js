
normalizarDatos(data);

var thisYear = (new Date()).getFullYear();

var personasEjeInfo = _.map(_.groupBy(data, function(d){return d.nombre}), function(value, key){ return key}).sort();
var personasPosition = _.reduce( personasEjeInfo , function(memo, value, index){ memo[value] = index; return memo; }, {});

var cargosInfo = getAlturasPorCargo(data);

var width = 2200;
var height = 4800;

var PIXELS_PER_YEAR = 20;
var OFFSET_Y = 30;
var PIXELS_H_OFFSET = 50;

var svg = d3.select('svg').attr("width", width)
  .attr("height", height);

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

  });

var ejeCargos = svg.select('#ejeCargos'); 

ejeCargos.selectAll('g').data(cargosInfo.eje).enter().append('g')
  .each(function(d){
    
    var g = d3.select(this);

    g.append('text')
        .attr('font-size', 10)
        .attr('y',16)
        .text(function(d){ return d.cargonominal; })

  })
  .attr('transform', function(d){ 
    var x = 0;
    var y =  d.altura * OFFSET_Y;
    return 'translate(' + x + ',' + y + ')'; 
  });

;

var ejePersonas = svg.select('#ejePersonas');

ejePersonas.selectAll('g').data(personasEjeInfo).enter().append('g')
  .each(function(d, ix){

    var g = d3.select(this);

    g.append('text')
        .attr('font-size', 10)
        .attr('y',16)
        .text(function(d){ return d; })
  })
  .attr('transform', function(d){ 
    var x = 0;
    var y =  personasPosition[d] * OFFSET_Y;
    return 'translate(' + x + ',' + y + ')'; 
  });


function mostrarPorNombre(avoidTransition){
  
  ejePersonas.transition().attr('fill-opacity', 1);
  ejeCargos.transition().attr('fill-opacity', 0);

  var what = avoidTransition ? groups : groups.transition();
  what.attr('transform', function(d){ 
    var x = (parseInt(d.fechainicioyear) - 1970) * PIXELS_PER_YEAR + PIXELS_H_OFFSET;
    var y =  personasPosition[d.nombre] * OFFSET_Y;
    return 'translate(' + x + ',' + y + ')'; 
  });
}

function mostrarPorCargo(){

  ejePersonas.transition().attr('fill-opacity', 0)
  ejeCargos.transition().attr('fill-opacity', 1);
  
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
