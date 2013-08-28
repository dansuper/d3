function activarEjePersonas(){
  ejes.ejePersonas.transition().attr('opacity', 1);
  ejes.ejeCargos0.transition().attr('opacity', 0);
  ejes.ejeCargos1.transition().attr('opacity', 0);
}

function activarEjeCargos(){
  ejes.ejePersonas.transition().attr('opacity', 0)
  ejes.ejeCargos0.transition().attr('opacity', 1);
  ejes.ejeCargos1.transition().attr('opacity', 1);
}
