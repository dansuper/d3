var data = [

  { id: 1, nombre: "juan", cargo: "secretario", inicio: "70", fin : "72" }, 
  { id: 1, nombre: "juan", cargo: "ministro", inicio: "72", fin : "74" }, 
  { id: 1, nombre: "juan", cargo: "diputado", inicio: "74", fin : "76" }, 
  { id: 1, nombre: "juan", cargo: "senador", inicio: "76", fin : "78" }, 
  { id: 1, nombre: "juan", cargo: "presidente", inicio: "78", fin : "80" },
  { id: 2, nombre: "pepe", cargo: "secretario", inicio: "72", fin : "74" }, 
  { id: 2, nombre: "pepe", cargo: "ministro", inicio: "74", fin : "76" }, 
  { id: 2, nombre: "pepe", cargo: "diputado", inicio: "76", fin : "78" }, 
  { id: 2, nombre: "pepe", cargo: "senador", inicio: "78", fin : "80" }, 
  { id: 2, nombre: "pepe", cargo: "presidente", inicio: "80", fin : "82" },
  { id: 3, nombre: "ricardo", cargo: "secretario", inicio: "74", fin : "76" }, 
  { id: 3, nombre: "ricardo", cargo: "ministro", inicio: "76", fin : "78" }, 
  { id: 3, nombre: "ricardo", cargo: "diputado", inicio: "78", fin : "80" }, 
  { id: 3, nombre: "ricardo", cargo: "senador", inicio: "80", fin : "82" }, 
  { id: 3, nombre: "ricardo", cargo: "presidente", inicio: "82", fin : "84" }

];

var cargosPosition = _.reduce(_.map(_.groupBy(data, function(d){return d.cargo}), function(value, key){ return key;}), function(memo, value, index){ memo[value] = index; return memo;}, {});
var personasPosition = _.reduce(_.map(_.groupBy(data, function(d){return d.nombre}), function(value, key){ return key}).sort(), function(memo, value, index){ memo[value] = index; return memo; }, {});

var width = 900;
var height = 400;

var svg = d3.select('svg').attr("width", width)
  .attr("height", height);

var groups = svg.selectAll('g')
  .data(data)
  .enter()
  .append('g')

  .attr('transform', function(d){ 
    var x = (parseInt(d.inicio) - 70) * 40;
    var y = (parseInt(d.id) - 1) * 50;
    return 'translate(' + x + ',' + y + ')'; 
  })

  .each(function(d){

    var g = d3.select(this);
    
    g.append('rect')
      .attr('width', 70)
      .attr('height', 40)
      .attr('style', "stroke:black;stroke-width:1;fill:white")

    g.append('text')
      .attr('y', 12)
      .text(function(d){ return d.cargo; })

    g.append('text')
      .attr('y', 32)
      .text(function(d){ return d.nombre; })

  });

d3.select('#btn1').on('click', function(){
  //x:fn(persona)
  groups.transition().attr('transform', function(d){ 
    var x = (parseInt(d.inicio) - 70) * 40;
    var y =  personasPosition[d.nombre] * 50;
    return 'translate(' + x + ',' + y + ')'; 
  });
});

d3.select('#btn2').on('click', function(){
  //x:fn(cargo)
  groups.transition().attr('transform', function(d){ 
    var x = (parseInt(d.inicio) - 70) * 40;
    var y =  cargosPosition[d.cargo] * 50;
    return 'translate(' + x + ',' + y + ')'; 
  });
});

//ok


