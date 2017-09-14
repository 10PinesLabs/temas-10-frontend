import Ember from 'ember';
import FileSaver from 'npm:file-saver'
import CreadorDeTxtDeMinuta from '../helpers/creador-de-txt-de-minuta'
export default Ember.Component.extend({

  textoMinuta: Ember.computed('minuta', function (){
    return CreadorDeTxtDeMinuta.crearTxt(this.get('minuta'));
  }),

  actions: {
    descargarTxt() {
      let minuta = this.get('minuta');
      let nombreArchivo = "Minuta " + minuta.fecha + ".txt";
      let blob = new Blob([this.get("textoMinuta")], {type: "text/plain;charset=utf-8"});
      FileSaver.saveAs(blob, nombreArchivo);
    }
  }

});
