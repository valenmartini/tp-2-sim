import FinLimpieza from "./Eventos/FinLimpieza";
import { Inicio } from "./Eventos/Inicio";
import Llegada from "./Eventos/Llegada";

const EVENT_MAPPER = {
  Inicio: Inicio,
};

export class Simulacion {
  constructor(
    evento,
    reloj,
    fila,
    llegadaBasketBall,
    llegadaFutbol,
    llegadaHandBall,
    disciplina = null,
    ocupacion = null
  ) {
    this.evento = evento;
    this.disciplina = disciplina;
    this.eventType = this.evento.type;
    this.reloj = reloj;
    this.fila = fila;
    this.llegadaFutbol = llegadaFutbol;
    this.llegadaBasketBall = llegadaBasketBall;
    this.llegadaHandBall = llegadaHandBall;
    this.rndLlegadaFutbol = parseFloat(llegadaFutbol.rndLlegada.toFixed(5));
    this.rndLlegadaHandBall = parseFloat(llegadaHandBall.rndLlegada.toFixed(5));
    this.rndLlegadaBasketBall = parseFloat(
      llegadaBasketBall.rndLlegada.toFixed(5)
    );
    this.tiempoALlegarFutbol = llegadaFutbol.tiempoALlegada;
    this.tiempoALlegarHandBall = llegadaHandBall.tiempoALlegada;
    this.tiempoALlegarBasketBall = llegadaBasketBall.tiempoALlegada;
    this.tiempoLlegadaFutbol = llegadaFutbol.tiempoLlegada;
    this.tiempoLlegadaHandBall = llegadaHandBall.tiempoLlegada;
    this.tiempoLlegadaBasketBall = llegadaBasketBall.tiempoLlegada;
    if (ocupacion) {
      this.ocupacion = ocupacion;
      switch (ocupacion.type) {
        case "basketball":
          this.rndOcupacionBasketBall = parseFloat(ocupacion.rndOcupacion.toFixed(5));
          this.tiempoOcupacionBasketBall = ocupacion.tiempoOcupacion;
          this.tiempoFinOcupacionBasketBall = ocupacion.tiempoFinOcupacion;
          break;
        case "handball":
          this.rndOcupacionHandBall = parseFloat(ocupacion.rndOcupacion.toFixed(5));
          this.tiempoOcupacionHandBall = ocupacion.tiempoOcupacion;
          this.tiempoFinOcupacionHandBall = ocupacion.tiempoFinOcupacion;
          break;
        case "futbol":
          this.rndOcupacionFutbol = parseFloat(ocupacion.rndOcupacion.toFixed(5));
          this.tiempoOcupacionFutbol = ocupacion.tiempoOcupacion;
          this.tiempoFinOcupacionFutbol = ocupacion.tiempoFinOcupacion;
          break;
      }
    }

    this.tiempoFinLimpieza = null;
  }

  getNextEvento(tiempoLimpieza) {
    const arrayLlegadas = [
      this.llegadaFutbol,
      this.llegadaBasketBall,
      this.llegadaHandBall,
    ];
    const proximaLlegada = arrayLlegadas.sort((menor, actual) => {
      return menor.tiempoLlegada > actual.tiempoLlegada;
    })[0];

    if (
      this.ocupacion &&
      this.ocupacion.tiempoFinOcupacion +
        parseFloat((tiempoLimpieza / 60).toFixed(5)) <=
        proximaLlegada.tiempoLlegada
    ) {
      this.tiempoFinLimpieza =
        this.ocupacion.tiempoFinOcupacion +
        parseFloat((tiempoLimpieza / 60).toFixed(5));
      return new FinLimpieza(
        this.ocupacion.tiempoFinOcupacion +
          parseFloat((tiempoLimpieza / 60).toFixed(5))
      );
    }
    return new Llegada(proximaLlegada.tiempoLlegada, proximaLlegada.type);
  }
}
