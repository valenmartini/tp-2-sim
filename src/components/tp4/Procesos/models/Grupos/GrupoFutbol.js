import { generarDistribucionExponencial } from "../../../../tp2/Procesos/CalculoDistribuciones/calculoExponencial";
import { generarDistribucionUniforme } from "../../../../tp2/Procesos/CalculoDistribuciones/calculoUniforme";
import { Grupo } from "./Grupo";

export class GrupoFutbol extends Grupo {
  constructor(reloj, valorTiempo) {
    super();
    this.type = "futbol";
    this.rndLlegada = Math.random();
    this.tiempoALlegada = parseFloat(generarDistribucionExponencial(
      valorTiempo,
      this.rndLlegada
    )[0].toFixed(5));
    this.tiempoLlegada = this.tiempoALlegada + reloj;
  }

  generarOcupacion(reloj, valoresTiempo) {
    super.generarOcupacion();
    this.rndOcupacion = Math.random();
    this.tiempoOcupacion = parseFloat(
      generarDistribucionUniforme(
        valoresTiempo.futbol.inferior/60,
        valoresTiempo.futbol.superior/60,
        this.rndOcupacion
      )[0].toFixed(5)
    );
    this.tiempoFinOcupacion = this.tiempoOcupacion + reloj;
  }
}
