import Ember from 'ember';

export default Ember.Component.extend({
  tagName:"tr",
  classNameBindings: ["classStile"],
  classStile: Ember.computed('ultimoTema',function () {
    debugger;
    if(this.get('tema') === this.get('ultimoTema')) {
      return "ultimo-tema-stile";
    }
    return "";
  }),
  cantDeMinutosDeDuracionDeTema:Ember.computed('tema',function(){
    var duraciones= this.get('duraciones');
    var unTema=this.get('tema');
    return duraciones.find(function (duracion) {
      return duracion.nombre===unTema.duracion;
    }).cantidadDeMinutos;
  }),
});
