import Ember from "ember";
import ReunionServiceInjected from "../mixins/reunion-service-injected";
import TemaServiceInjected from "../mixins/tema-service-injected";
import Tema from "../concepts/tema";

export default Ember.Controller.extend(ReunionServiceInjected, TemaServiceInjected, {

  proximaRoots: Ember.computed('model', function () {
    return this.get('model.proximaRoots');
  }),

  usuarioActual: Ember.computed('model', function () {
    return this.get('model.usuarioActual');
  }),

  mostrandoFecha: Ember.computed('editandoFecha', function () {
    return !this.get('editandoFecha');
  }),

  fechaObserver: Ember.observer('proximaRoots.fecha', function () {
    if (this.get('editandoFecha')) {
      this.set('editandoFecha', false);
      this._guardarCambios();
    }
  }),

  votosRestantes: Ember.computed('proximaRoots.temasPropuestos.@each.cantidadVotosPropios', function () {
    var temas = this.get('proximaRoots.temasPropuestos');
    var votosUsados = temas.reduce(function (previousValue, item) {
      return previousValue + item.get('cantidadVotosPropios');
    }, 0);
    return 3 - votosUsados;
  }),


  actions: {
    sumarVoto(tema){
      if (this.get('votosRestantes')) {
        this._votarPorTema(tema);
      }
    },
    restarVoto(tema){
      this._quitarVotoDeTema(tema);
    },
    mostrarFormulario(){
      this.set('mostrandoFormulario', true);
      this.set('nuevoTema', Tema.create({
        idDeReunion: this._idDeReunion(),
        idDeAutor: this._idDeUsuarioActual(),
        usuarioActual: this.get('model.usuarioActual')
        })
      );
    },
    agregarTema(){
      this._guardarTemaYRecargar();
    },
    quitarTema(tema){
      this._borrarTemaYRecargar(tema);
    },
    editarFecha(){
      this.set('editandoFecha', true);
    },
    cerrarVotacion(){
      this._cerrarReunion();
    }
  },

  _guardarCambios(){
    var reunion = this.get('proximaRoots');
    return this.reunionService().updateReunion(reunion)
      .then((reunionGuardada)=> {
        this.set('proximaRoots', reunionGuardada);
      });
  },

  _recargarReunion(){
    this.reunionService().getReunion(this._idDeReunion()).then((reunion)=> {
      this._usarInstanciasDeTemas(reunion, this.get('usuarioActual'));
      this.set('proximaRoots', reunion);
    });
  },


  _guardarTemaYRecargar: function () {
    var tema = this.get('nuevoTema');
    this.temaService().createTema(tema).then(()=> {
      this.set('mostrandoFormulario', false);
      this._recargarReunion();
    });
  },
  _borrarTemaYRecargar(tema){
    this.temaService().removeTema(tema).then(()=> {
      this._recargarReunion();
    });
  },

  _idDeReunion() {
    return this.get('proximaRoots.id');
  },

  _idDeUsuarioActual(){
    return this.get('usuarioActual.id');
  },

  _votarPorTema(tema){
    tema.agregarInteresado(this._idDeUsuarioActual());
    this.temaService().updateTema(tema).then(()=> {
      this._recargarReunion();
    });
  },

  _quitarVotoDeTema(tema){
    tema.quitarInteresado(this._idDeUsuarioActual());
    this.temaService().updateTema(tema).then(()=> {
      this._recargarReunion();
    });
  },

  _usarInstanciasDeTemas(reunion, usuarioActual){
    var temasPropuestos = reunion.get('temasPropuestos');
    for (var i = 0; i < temasPropuestos.length; i++) {
      var objetoEmber = temasPropuestos[i];
      objetoEmber.set('usuarioActual', usuarioActual);
      var tema = Tema.create(objetoEmber);
      temasPropuestos[i] = tema;
    }
  },

  _cerrarReunion(){
    var reunion = this.get('proximaRoots');
    this.reunionService().cerrarReunion(reunion)
      .then((cerrada)=> {
        this._usarInstanciasDeTemas(cerrada, this.get('usuarioActual'));
        this.set('proximaRoots', cerrada);
      });
  }

});