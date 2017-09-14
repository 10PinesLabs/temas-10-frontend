import Ember from 'ember';

export function minutosDeDuracion(params/*, hash*/) {

  let nombre=params[0];
  let duraciones=params[1];
  let cantidadDeMinutos=duraciones.find((duracion)=>{
    return duracion.nombre===nombre;
  }).cantidadDeMinutos;
  return '('+ cantidadDeMinutos + ' minutos)';
}

export default Ember.Helper.helper(minutosDeDuracion);
