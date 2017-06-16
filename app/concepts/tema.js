import Ember from "ember";

export default Ember.Object.extend({

  cantidadVotosTotales: Ember.computed('idsDeInteresados.[]', function () {
    return this.get('idsDeInteresados.length');
  }),
  colorVotos:Ember.computed('cantidadVotosPropios',function(){
      if(this.get('cantidadVotosPropios')>0){
        return 'green'
      }
      else{
      return 'grey'
      }
  }),
  cantidadVotosPropios: Ember.computed('idsDeInteresados.[]', 'usuarioActual', function () {
    var idDeUsuarioActual = this.get('usuarioActual.id');
    var votosDelUsuario = this.get('idsDeInteresados').filter(function (idDeInteresado) {
      return idDeInteresado === idDeUsuarioActual;
    });
   debugger;
      return votosDelUsuario.length.toString();

  }),

  puedeSerBorrado: Ember.computed('idDeAutor', 'usuarioActual.id', function () {
    var idDeAutor = this.get('idDeAutor');
    var idDelUsuarioActual = this.get('usuarioActual.id');
    return idDeAutor === idDelUsuarioActual;
  }),


  agregarInteresado(idDeInteresado){
    this.get('idsDeInteresados').pushObject(idDeInteresado);
  },

  quitarInteresado(idDeInteresado){
    var interesados = this.get('idsDeInteresados');
    var indice = interesados.indexOf(idDeInteresado);
    if (indice >= 0) {
      interesados.removeAt(indice);
    }
  }
});
