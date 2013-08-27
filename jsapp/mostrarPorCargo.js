function mostrarPorCargo(data, ejes, groups, filtro){

  activarEjeCargos();

  ordenamientoPorCargo(data, filtro)
  
  groups
  .transition()
  .duration(TRANSITION_DELAY)
  .attr('opacity', function(d){ return d.__layout.cargo.display ? 1 : 0 } )
  .attr('transform', function(d){ 
    var x = (parseInt(d.fechainicioyear) - 1970) * PIXELS_PER_YEAR + PIXELS_H_OFFSET;
    var y = d.__layout.cargo.altura * OFFSET_Y || 0;
    return 'translate(' + x + ',' + y + ')'; 
  });
}

var ejesCargoData = {
  init: false,
  eje1: {}, 
  eje2: {}
}

function ordenamientoPorCargo(data, filtro){

  if(!ejesCargoData.init){
    _.each(data, function(d){
      
      ejesCargoData.eje1[d.cargonominal] = {
        altura:0, nombre:d.cargonominal, 
        display: 0
      };
      
      ejesCargoData.eje2[d.cargonominal +  ' | ' + d.territorio] = {
        altura:0, 
        nombre:d.territorio, 
        display: 0, 
        parentEje: ejesCargoData.eje1[d.cargonominal]
      };

    });
  }

  //Reset todas las alturas
  _.each(data, function(item){ 
    item.__layout.cargo = {display: filtrarCargo(item, filtro), altura: 0}; 
  });

  var filteredData = _.filter(data, function(item){
    return item.__layout.cargo.display;
  });

  var returnData = [];
  var alturaCargoNominal = 0;

  //Agrupar por cargo nominal
  var agrupado = _.sortBy(
    _.map(
      _.groupBy(filteredData, 
        function(cargo){ 
          return cargo.cargonominal +  ' | ' + cargo.territorio; 
        })
      , function(el, key){ 
        return { nombre: key, cargos: el } 
      })
    , 'nombre');

  _.each(agrupado, function(item){

    var cargonominal = item.nombre;
    var cargos = item.cargos;

    var procesados = [];
    var alturaMax = 0;
    
    ordenarPorNombreyFechaInicioYear(cargos);
    console.log(cargos)
    _.each(cargos, function(cargo){
      
      cargo.altura = -1;
      var colision;

      do{
        colision = false;
        cargo.altura+=1;
        _.each( procesados, function( cargoProcesado ){
          if( cargoProcesado.altura == cargo.altura 
           && cargoProcesado.fechainicioyear < cargo.fechafinyear
           && cargoProcesado.fechafinyear > cargo.fechainicioyear
          ){
            colision = true;
          }
        });
      }while( colision );

      alturaMax = Math.max(alturaMax, cargo.altura);
      procesados.push(cargo);

      cargo.__layout.cargo.altura = alturaCargoNominal + cargo.altura; //Este es el offset Y total

    });
    
    alturaCargoNominal++;

    returnData.push({
      nombre: cargonominal,
      cargos : cargos, 
      altura: alturaMax
    });

  });

  return returnData;
}

function strCmp(s1, s2){
  if(s1 == s2){
    return 0;
  }else{
    if(s1 > s2){
      return 1;
    }else{
      return -1;
    }
  }
}

function ordenarPorNombreyFechaInicioYear(cargos){
  cargos.sort(function(a,b){ 
    return strCmp(a.nombre, b.nombre) ||  strCmp(a.territorio, b.territorio) || (a.fechainicioyear - b.fechainicioyear);
  });
}

function getCargosEjeInfo(data){
  var cargosProcesados = ordenamientoPorCargo(data);

  cargosProcesados.sort(function(a,b){ return strCmp(a.nombre, b.nombre);});

  var alturasPorCargo = {};
  var eje0 = [];
  var eje1 = [];
  var alturaBase = 0;
  var prevCargo = null;
  var cantSubItems = 0;

  _.each(cargosProcesados, function(agrupado){
    
    var s = agrupado.nombre.split(' | ');
    var cargonominal = s[0];
    var territorio = s[1];

    _.each(agrupado.cargos, function(cargo){
      alturasPorCargo[cargo.rowNumber] = cargo.altura + alturaBase;
    });
    
    if(cargonominal !== prevCargo){
      eje0.push({
        label: cargonominal, 
        altura: alturaBase
      });
      prevCargo = cargonominal;
      cantSubItems = 0;
    }

    eje1.push({
      label: territorio, 
      altura: alturaBase
    });

    alturaBase += agrupado.altura + 1;
  });

  return {
    alturasPorCargo: alturasPorCargo, 
    eje0: eje0, 
    eje1: eje1
  } ;

}

function updateEjesCargo(){

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
}

