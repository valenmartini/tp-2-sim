import { generarDistribucionUniforme } from "../../../../tp2/Procesos/CalculoDistribuciones/calculoUniforme";
import { Grupo } from "./Grupo";

export class GrupoBasketBall extends Grupo {
  constructor(reloj, valoresTiempo) {
    super();
    this.type = "basketball";
    this.rndLlegada = Math.random();
    this.tiempoALlegada = parseFloat(
      generarDistribucionUniforme(
        valoresTiempo.inferior,
        valoresTiempo.superior,
        this.rndOcupacion
      )[0].toFixed(5)
    );
    this.tiempoLlegada = this.tiempoALlegada + reloj;
  }

  generarOcupacion(reloj, valoresTiempo) {
    super.generarOcupacion(reloj);
    this.rndOcupacion = Math.random();
    this.tiempoOcupacion = parseFloat(
      generarDistribucionUniforme(
        valoresTiempo.basketBall.inferior/60,
        valoresTiempo.basketBall.superior/60,
        this.rndOcupacion
      )[0].toFixed(5)
    );
    this.tiempoFinOcupacion = this.tiempoOcupacion + reloj;
  }

  entrarACola(reloj){
    super.entrarACola(reloj);
  }
}
