function filtrarCargo(cargo, filtro) {
    if (cargo.nombre.indexOf(filtro.nombre) > -1) {
        return true;
    }
    return false
}
