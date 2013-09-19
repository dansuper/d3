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
        cargo.primerNombre = cargo.nombre;
        cargo.nombre = (cargo.primerNombre + ' ' + cargo.apellido).trim().toLowerCase();
        cargo.cargonominal = cargo.cargo.trim().toLowerCase();
        cargo.fechainicioyear = parseInt( (cargo.fechainicio || '').substr(0,4) || "", 10);
        cargo.fechafinyear = parseInt( (cargo.fechafin || '').substr(0,4) || "", 10) || thisYear;
        cargo.cargotipo = cargo.cargotipo.toLowerCase();
        cargo.cargoclase = cargo.cargoclase.toLowerCase();
        cargo.__layout = {}; //Esto va a tener la info de layout
    });
}
