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

var width = 900;
var height = 400;

var svg = d3.select('svg').attr("width", width)
  .attr("height", height);

svg.selectAll('rect')
  .data(data)
    .enter()
    .append('rect')
      .attr('x', function(d){ return (parseInt(d.inicio) - 70) * 40; })
      .attr('y', function(d){ return (parseInt(d.id) - 1) * 50; })
      .attr('width', 70)
      .attr('height', 40)
      .attr('style', "stroke:black;stroke-width:1;fill:white")

      ;

svg.selectAll('text')
  .data(data)
    .enter()
    .append('text')
      .attr('x', function(d){ return (parseInt(d.inicio) - 70) * 40; })
      .attr('y', function(d){ return (parseInt(d.id) ) * 50 - 20; })
      .text(function(d){ return d.cargo; })
      ;

