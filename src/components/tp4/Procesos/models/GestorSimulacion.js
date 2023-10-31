import Cancha from "./Cancha";
import Cola from "./Colas/Cola";
import FinSimulacion from "./Eventos/FinSimulacion";
import { Inicio } from "./Eventos/Inicio";
import { GrupoBasketBall } from "./Grupos/GrupoBasketBall";
import { GrupoFutbol } from "./Grupos/GrupoFutbol";
import { GrupoHandBall } from "./Grupos/GrupoHandBall";
import { Simulacion } from "./Simulacion";

const GROUP_MAPPER = {
  basketball: {
    CANT: "cantBasketBall",
    PROM: "promedioEsperaBasketBall",
  },
  futbol: {
    CANT: "cantFutbol",
    PROM: "promedioEsperaFutbol",
  },
  handball: {
    CANT: "cantHandBall",
    PROM: "promedioEsperaHandBall",
  },
};

export class GestorSimulacion {
  constructor(
    filas,
    tiempoFinSimulacion,
    tiempoLimpieza,
    valoresTiempo,
    triggerAbandono
  ) {
    this.simulaciones = [];
    this.reloj = 0;
    this.fila = 1;
    this.cola = new Cola();
    this.listaGrupos = new Cola();
    this.filas = filas;
    this.tiempoFinSimulacion = tiempoFinSimulacion;
    this.valoresTiempo = valoresTiempo;
    this.triggerAbandono = triggerAbandono;
    this.llegadaHandBall = null;
    this.llegadaFutbol = null;
    this.llegadaBasketBall = null;
    this.ocupacion = null;
    this.cancha = new Cancha();
    this.tiempoLimpieza = tiempoLimpieza;
    this.promedioEsperaFutbol = 0;
    this.promedioEsperaHandBall = 0;
    this.promedioEsperaBasketBall = 0;
    this.cantFutbol = 0;
    this.cantHandBall = 0;
    this.cantBasketBall = 0;
    this.contadorAbandono = 0;
  }

  iniciarSimulacion() {
    let proximoEvento = this.generarEventoInicio();
    this.reloj = proximoEvento.reloj;
    while (this.fila < this.filas && this.tiempoFinSimulacion > this.reloj) {
      proximoEvento = this.generarNuevaSimulacion(proximoEvento);
      this.reloj = proximoEvento.reloj;
    }
    return this.simulaciones;
  }

  generarNuevaSimulacion(evento) {
    try {
      this.validarAbandono(evento);
      this.fila += 1;
      console.log(this.cantBasketBall, this.cantFutbol, this.cantHandBall);
      console.log(
        "fila:",
        this.fila,
        "evento:",
        evento,
        "cola:",
        this.cola,
        "simulaciones:",
        this.simulaciones,
        this.promedioEsperaBasketBall,
        this.promedioEsperaFutbol,
        this.promedioEsperaHandBall
      );
      if (this.tiempoFinSimulacion <= this.reloj || this.fila == this.filas)
        evento = new FinSimulacion();
      this.calcularPromedios();
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
        this.ocupacion,
        this.cancha.tiempoLibre,
        this.cancha.tiempoLibreDiario,
        this.promedioEsperaFutbol,
        this.promedioEsperaHandBall,
        this.promedioEsperaBasketBall,
        this.contadorAbandono,
        this.cola.getCantidadEnCola()
      );
      this.simulaciones.push(simulacion);
      return simulacion.getNextEvento(this.tiempoLimpieza);
    } catch {
      console.log("falla");
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
      return simulacion.getNextEvento(this.tiempoLimpieza);
    }
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

    this.generarNuevaLlegada(proximaLlegada);
    if (this.cancha.ocupado) {
      proximaLlegada.entrarACola(this.reloj);
      this[GROUP_MAPPER[proximaLlegada.type].CANT] += 1;
      this.cola.add(proximaLlegada);
      return;
    }
    proximaLlegada.generarOcupacion(this.reloj, this.valoresTiempo.ocupacion);
    this.ocupacion = proximaLlegada;
    this.cancha.ocuparCancha(this.reloj, this.ocupacion);
  }

  generarEventoFinLimpieza() {
    this.listaGrupos.add({ ...this.ocupacion });

    if (this.cola.isEmpty()) {
      this.ocupacion = null;
      this.cancha.liberarCancha(this.reloj);
      return;
    }

    const nextToEnter = this.cola.getNextInLine();
    nextToEnter.generarOcupacion(this.reloj, this.valoresTiempo.ocupacion);
    this.ocupacion = nextToEnter;
    this.cancha.ocuparCancha(this.reloj, nextToEnter);
  }

  generarNuevaLlegada(proximaLlegada) {
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
  }

  calcularPromedios() {
    const { acumFutbol, acumBasket, acumHandBall } = this.cola.acumularTiempo(
      this.reloj
    );
    this.calcularPromedio(acumFutbol, "futbol");
    this.calcularPromedio(acumBasket, "basketball");
    this.calcularPromedio(acumHandBall, "handball");
  }

  calcularPromedio(acum, type) {
    const group = GROUP_MAPPER[type];
    if (this[group.CANT] === 0) return;
    if (acum === 0) return;
    console.log(acum, this[group.PROM], this[group.CANT]);
    this[group.PROM] = Number(
      Number(
        Number(this[group.PROM]) * Number(this[group.CANT] - 1) +
          Number(acum.toFixed(5))
      ) / this[group.CANT]
    );
    console.log(this[group.PROM]);
  }

  validarAbandono(proximoEvento) {
    if (
      proximoEvento.type != "Llegada" ||
      !this.cola.estaLlena(this.triggerAbandono)
    )
      return;
    this.contadorAbandono += 1;
    const proximaLlegada = [
      this.llegadaFutbol,
      this.llegadaBasketBall,
      this.llegadaHandBall,
    ].find((grupo) => {
      return grupo.tiempoLlegada == this.reloj;
    });

    this.generarNuevaLlegada(proximaLlegada);
    throw new Error();
  }
}
