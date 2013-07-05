function getCargosEjeInfo(data){
	var cargosProcesados = ordenamientoPorCargo(data);

	cargosProcesados.sort(function(a,b){ return strCmp(a.nombre, b.nombre);});

	var alturasPorCargo = {};
	var eje0 = [];
	var eje1 = [];
	var alturaBase = 0;
	var prevCargo = null;

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

function ordenamientoPorCargo(data){
	
	var input = data.slice();
	var returnData = [];

	var agrupado = _.groupBy(input, function(cargo){ return cargo.cargonominal +  ' | ' + cargo.territorio; });

	_.each(agrupado, function(cargos, cargonominal){

		var procesados = [];
		var alturaMax = 0;
		
		ordenarPorNombreyFechaInicioYear(cargos);

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

		});
		
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
