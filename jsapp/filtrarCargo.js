function filtrarCargo(cargo, filtro) {
    var i;
    if(filtro.personas){
    	return !!filtro.personas[cargo.persona_id];
    }else{
    	return true;
    }
}
