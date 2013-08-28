/**
 * Corrige un poco las inconsistencias de los datos,
 * con el objetivo de simplificar las funciones de
 * agrupamiento y ordenamiento posteriores.
 *
 * @param {data} lista de cargos
 */

function normalizarDatos(data) {
    _.each(data, function(cargo) {
        cargo.territorio = cargo.territorio.trim().toLowerCase();
        cargo.nombre = cargo.nombre.trim().toLowerCase();
        cargo.cargonominal = cargo.cargonominal.trim().toLowerCase();
        cargo.fechainicioyear = parseInt(cargo.fechainicioyear);
        cargo.fechafinyear = parseInt(cargo.fechafinyear) || thisYear;
        cargo.__layout = {}; //Esto va a tener la info de layout
    });
}
