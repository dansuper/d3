function getAlturasPorCargo(data){
	var cargosProcesados = ordenamientoPorCargo(data);

	var alturasPorCargo = {};
	var alturaBase = 0;

	_.each(cargosProcesados, function(cargonominal){

		_.each(cargonominal.cargos, function(cargo){
			alturasPorCargo[cargo.rowNumber] = cargo.altura + alturaBase;
		});

		alturaBase += cargonominal.altura + 1;
	});

	return alturasPorCargo;

}

function ordenamientoPorCargo(data){
	
	var input = data.slice();
	var returnData = {};
	input = convertirAñosAEnteros(input);

	var agrupadoPorCargo = _.groupBy(input, function(cargo){ return cargo.cargonominal; });

	_.each(agrupadoPorCargo, function(cargos, cargonominal){

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
		
		returnData[cargonominal] = {
			cargos : cargos, 
			altura: alturaMax
		};

	});

	return returnData;
}

function ordenarPorCargoYNombre(data){
	data.sort(function(a,b){
		return strCmp(a.cargonominal, b.cargonominal) 
		|| strCmp(a.nombre, b.nombre) 
		|| (a.fechainicioyear - b.fechainicioyear)
	});
}

function strCmp(string1, string2){
	var s1 = string1.toLowerCase();
	var s2 = string2.toLowerCase();
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
		return strCmp(a.nombre, b.nombre) || (a.fechainicioyear - b.fechainicioyear);
	});
}

function convertirAñosAEnteros(cargos){
	var thisYear = (new Date()).getFullYear();
	return _.map(cargos, function(cargo){ 
		cargo.fechainicioyear = parseInt(cargo.fechainicioyear);
		cargo.fechafinyear = parseInt(cargo.fechafinyear) || thisYear;
		return cargo; 
	});
}