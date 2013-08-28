function filtrarCargo(cargo, filtro) {
    var i;
    if (filtro.nombre.length === 0) {
        return true;
    } else {
        for (i = 0; i < filtro.nombre.length; i++) {
            if (cargo.nombre.indexOf(filtro.nombre[i]) > -1) {
                return true;
            }
        }
        return false;
    }
}
