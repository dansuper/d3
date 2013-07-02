
inicializarEjes();

function inicializarEjes(){

// var sss = _.reduce(_.groupBy(data, function(cargo){ return cargo.territorio; }), function(memo, item, key){ memo.push(key); return memo;  }, []);

  
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
