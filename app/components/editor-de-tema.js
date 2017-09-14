import Ember from "ember";

export default Ember.Component.extend({

  guardarHabilitado: Ember.computed('tema.duracion', 'tema.titulo','tema.actionItems', function () {
    if (!this.get('tema.duracion') || !this.get('tema.titulo') ) {
      return "disabled";
    }
    else {
      return "";
    }
  }),
});
