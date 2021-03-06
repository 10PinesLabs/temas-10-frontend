
export default class CreadorDeTxtDeMinuta{
	static crearTxt(minuta){
		 let tab = "    ";
    let enter = "\n";

    let fecha = "Fecha: " + minuta.fecha + enter;
    let minuteador = "Minuteador: " + minuta.minuteador + enter;

    let asistentes = "Asistentes:" + enter;
    minuta.asistentes.forEach(function(asistente){
      asistentes += tab + "* " + asistente.name + enter;
    });

    let temasPropuestos = "Temas propuestos:" + enter;
    minuta.temas.forEach(function(tema){
      temasPropuestos += tab + "- " + tema.tema.titulo + enter;
    });

    let temasTratados = "Detalle de los temas hablados:" + enter;
    let temaTratado = "";
    minuta.temas.forEach(function(tema, index){
      let indice = index + 1;
      temaTratado = tab + indice + ". " + tema.tema.titulo + enter;
      temaTratado += tab + tab + "Conclusión:" + enter;
      let conclusionIdentada = tema.conclusion.replace(/\n/g, "\n" + tab + tab + tab);
      temaTratado += tab + tab + tab + conclusionIdentada + enter;
      temaTratado += tab + tab + "Action Items:" + enter;

      tema.actionItems.forEach(function(actionItem){
        temaTratado += tab + tab + tab + "- " + actionItem.descripcion + enter;
        temaTratado += tab + tab + tab + "  Responsables:" + enter;

        actionItem.responsables.forEach(function(responsable){
          temaTratado += tab + tab + tab + tab + "* " + responsable.name + enter;
        });
      });

      temasTratados += temaTratado + enter;
    });

    return fecha + enter + minuteador + enter + asistentes + enter + temasPropuestos + enter + temasTratados;
	}
}