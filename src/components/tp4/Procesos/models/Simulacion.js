import FinLimpieza from "./Eventos/FinLimpieza";
import { Inicio } from "./Eventos/Inicio";
import Llegada from "./Eventos/Llegada";

const parseNumber = (number) => {
  if (isNaN(number)) return number;
  return Number(number.toFixed(5));
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
    ocupacion = null,
    tiempoLibreCancha = 0,
    tiempoLibreCanchaDiario = 0,
    promedioEsperaFutbol = 0,
    promedioEsperaHandBall = 0,
    promedioEsperaBasketBall = 0,
    contadorAbandono = 0,
    cola = 0,
  ) {
    this.evento = evento;
    this.disciplina = disciplina;
    this.eventType = this.evento.type;
    this.reloj = parseNumber(reloj);
    this.cola = cola;
    this.fila = fila;
    this.llegadaFutbol = parseNumber(llegadaFutbol);
    this.llegadaBasketBall = parseNumber(llegadaBasketBall);
    this.llegadaHandBall = parseNumber(llegadaHandBall);
    this.rndLlegadaFutbol = parseNumber(llegadaFutbol.rndLlegada);
    this.rndLlegadaHandBall = parseNumber(llegadaHandBall.rndLlegada);
    this.rndLlegadaBasketBall = parseNumber(llegadaBasketBall.rndLlegada);
    this.tiempoALlegarFutbol = parseNumber(llegadaFutbol.tiempoALlegada);
    this.tiempoALlegarHandBall = parseNumber(llegadaHandBall.tiempoALlegada);
    this.tiempoALlegarBasketBall = parseNumber(
      llegadaBasketBall.tiempoALlegada
    );
    this.tiempoLlegadaFutbol = parseNumber(llegadaFutbol.tiempoLlegada);
    this.tiempoLlegadaHandBall = parseNumber(llegadaHandBall.tiempoLlegada);
    this.tiempoLlegadaBasketBall = parseNumber(llegadaBasketBall.tiempoLlegada);
    this.tiempoLibreCancha = parseNumber(tiempoLibreCancha);
    this.tiempoLibreCanchaDiario = parseNumber(tiempoLibreCanchaDiario);
    if (ocupacion) {
      this.ocupacion = ocupacion;
      switch (ocupacion.type) {
        case "basketball":
          this.rndOcupacionBasketBall = parseNumber(ocupacion.rndOcupacion);
          this.tiempoOcupacionBasketBall = parseNumber(
            ocupacion.tiempoOcupacion
          );
          this.tiempoFinOcupacionBasketBall = parseNumber(
            ocupacion.tiempoFinOcupacion
          );
          break;
        case "handball":
          this.rndOcupacionHandBall = parseNumber(ocupacion.rndOcupacion);
          this.tiempoOcupacionHandBall = parseNumber(ocupacion.tiempoOcupacion);
          this.tiempoFinOcupacionHandBall = parseNumber(
            ocupacion.tiempoFinOcupacion
          );
          break;
        case "futbol":
          this.rndOcupacionFutbol = parseNumber(ocupacion.rndOcupacion);
          this.tiempoOcupacionFutbol = parseNumber(ocupacion.tiempoOcupacion);
          this.tiempoFinOcupacionFutbol = parseNumber(
            ocupacion.tiempoFinOcupacion
          );
          break;
      }
    }
    this.promedioEsperaBasketBall = parseNumber(promedioEsperaBasketBall);
    this.promedioEsperaFutbol = parseNumber(promedioEsperaFutbol);
    this.promedioEsperaHandBall = parseNumber(promedioEsperaHandBall);
    this.tiempoFinLimpieza = null;
    this.tiempoOcupacion = this.ocupacion ? parseNumber(this.ocupacion.tiempoFinOcupacion) : null;
    this.contadorAbandono = contadorAbandono;
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
        parseNumber(this.ocupacion.tiempoFinOcupacion +
        (tiempoLimpieza / 60));
      return new FinLimpieza(
        parseNumber(this.ocupacion.tiempoFinOcupacion +
          (tiempoLimpieza / 60))
      );
    }
    return new Llegada(proximaLlegada.tiempoLlegada, proximaLlegada.type);
  }
}
