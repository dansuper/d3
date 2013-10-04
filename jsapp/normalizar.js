/**
 * Corrige un poco las inconsistencias de los datos,
 * con el objetivo de simplificar las funciones de
 * agrupamiento y ordenamiento posteriores.
 *
 * @param {data} lista de cargos
 */

function normalizarDatos(data) {
    // en realidad, desnormaliza los datos.

    data.hashPersonas = _.reduce(data.personas, function(memo, p){ memo[p.id]= p; return memo; },{});
    data.hashCargosNominales = _.reduce(data.cargosnominales, function(memo, p){ memo[p.id]= p; return memo; },{});
    data.hashPartidos = _.reduce(data.partidos, function(memo, p){ memo[p.id]= p; return memo; },{});
    data.hashTerritorios = _.reduce(data.territorios, function(memo, p){ memo[p.id]= p; return memo; },{});

    _.each(data.cargos, function(cargo) {
        cargo.fechainicioyear = parseInt( (cargo.fechainicio || '').substr(0,4) || "", 10);
        cargo.fechafinyear = parseInt( (cargo.fechafin || '').substr(0,4) || "", 10) || thisYear;
        cargo.__layout = {}; //Esto va a tener la info de layout
        cargo.persona = data.hashPersonas[cargo.persona_id];
        cargo.nominal = data.hashCargosNominales[cargo.cargo_nominal_id];
        cargo.partido = data.hashPartidos[cargo.partido_id];
        cargo.territorio = data.hashPartidos[cargo.territorio_id];
    });


}
