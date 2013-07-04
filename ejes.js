
inicializarEjes();

function inicializarEjes(){

// var sss = _.reduce(_.groupBy(data, function(cargo){ return cargo.territorio; }), function(memo, item, key){ memo.push(key); return memo;  }, []);

  ejeCargos0.selectAll('g').data(cargosInfo.eje0).enter().append('g')
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

  ejeCargos1.selectAll('g').data(cargosInfo.eje1).enter().append('g')
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

}
