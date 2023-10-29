import Cancha from "./Cancha";
import Cola from "./Colas/Cola";
import { Inicio } from "./Eventos/Inicio";
import { GrupoBasketBall } from "./Grupos/GrupoBasketBall";
import { GrupoFutbol } from "./Grupos/GrupoFutbol";
import { GrupoHandBall } from "./Grupos/GrupoHandBall";
import { Simulacion } from "./Simulacion";

export class GestorSimulacion {
  constructor(filas, tiempoFinSimulacion, tiempoLimpieza, valoresTiempo) {
    this.simulaciones = [];
    this.reloj = 0;
    this.fila = 1;
    this.cola = new Cola();
    this.listaGrupos = new Cola();
    this.filas = filas;
    this.tiempoFinSimulacion = tiempoFinSimulacion;
    this.valoresTiempo = valoresTiempo;
    this.llegadaHandBall = null;
    this.llegadaFutbol = null;
    this.llegadaBasketBall = null;
    this.ocupacion = null;
    this.cancha = new Cancha();
    this.tiempoLimpieza = tiempoLimpieza;
  }

  iniciarSimulacion() {
    let proximoEvento = this.generarEventoInicio();
    this.reloj = proximoEvento.reloj;
    while (this.fila < this.filas && this.tiempoFinSimulacion > this.reloj) {
      this.fila += 1;
      proximoEvento = this.generarNuevaSimulacion(proximoEvento);
      this.reloj = proximoEvento.reloj;
    }
    return this.simulaciones;
  }

  generarNuevaSimulacion(evento) {
    console.log("fila:",this.fila,"evento:",evento, "cola:", this.cola, "simulaciones:", this.simulaciones);
    if (this.tiempoFinSimulacion <= this.reloj) return;
    switch (evento.constructor.name) {
      case "Llegada":
        this.generarEventoLlegada();
        break;
      case "FinLimpieza":
        this.generarEventoFinLimpieza();
        break;
    }

    let simulacion = new Simulacion(
      evento,
      this.reloj,
      this.fila,
      this.llegadaBasketBall,
      this.llegadaFutbol,
      this.llegadaHandBall,
      evento.disciplina || null,
      this.ocupacion
    );
    this.simulaciones.push(simulacion);
    return simulacion.getNextEvento(this.tiempoLimpieza);
  }

  generarEventoInicio() {
    this.llegadaBasketBall = new GrupoBasketBall(
      this.reloj,
      this.valoresTiempo.llegadas.basketBall
    );
    this.llegadaFutbol = new GrupoFutbol(
      this.reloj,
      this.valoresTiempo.llegadas.futbol
    );
    this.llegadaHandBall = new GrupoHandBall(
      this.reloj,
      this.valoresTiempo.llegadas.handBall
    );
    const simulacion = new Simulacion(
      new Inicio(),
      this.reloj,
      this.fila,
      this.llegadaBasketBall,
      this.llegadaFutbol,
      this.llegadaHandBall
    );
    this.simulaciones.push(simulacion);
    return simulacion.getNextEvento(this.tiempoLimpieza);
  }

  generarEventoLlegada() {
    //buscamos el evento que llega
    const proximaLlegada = [
      this.llegadaFutbol,
      this.llegadaBasketBall,
      this.llegadaHandBall,
    ].find((grupo) => {
      return grupo.tiempoLlegada == this.reloj;
    });

    switch (proximaLlegada.constructor.name) {
      case "GrupoBasketBall":
        this.llegadaBasketBall = new GrupoBasketBall(
          this.reloj,
          this.valoresTiempo.llegadas.basketBall
        );
        break;
      case "GrupoFutbol":
        this.llegadaFutbol = new GrupoFutbol(
          this.reloj,
          this.valoresTiempo.llegadas.futbol
        );
        break;
      case "GrupoHandBall":
        this.llegadaHandBall = new GrupoHandBall(
          this.reloj,
          this.valoresTiempo.llegadas.handBall
        );
        break;
    }
    if (this.cancha.ocupado) {
      this.cola.add(proximaLlegada);
      return;
    }
    proximaLlegada.generarOcupacion(this.reloj, this.valoresTiempo.ocupacion);
    this.ocupacion = proximaLlegada;
    this.cancha.grupoOcupando = this.ocupacion;
    this.cancha.ocupado = true;
  }

  generarEventoFinLimpieza() {
    this.listaGrupos.add({...this.ocupacion});
    if (this.cola.isEmpty()) {
      this.ocupacion = null;
      this.cancha.grupoOcupando = null;
      this.cancha.ocupado = false;
      return;
    }

    const nextToEnter = this.cola.getNextInLine();
    nextToEnter.generarOcupacion(this.reloj, this.valoresTiempo.ocupacion);
    this.ocupacion = nextToEnter;
    this.cancha.grupoOcupando = nextToEnter;
  }
}
