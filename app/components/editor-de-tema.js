import Ember from "ember";

export default Ember.Component.extend({

  guardarHabilitado: Ember.computed('tema.duracion', 'tema.titulo', function () {
    if (!this.get('tema.duracion') || !this.get('tema.titulo') ) {
      return true;
    }
    else {
      return false;
    }
  }),
});
