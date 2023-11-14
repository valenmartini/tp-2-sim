import Cancha from "./Cancha";
import Cola from "./Colas/Cola";
import FinSimulacion from "./Eventos/FinSimulacion";
import { Inicio } from "./Eventos/Inicio";
import { GeneradorTiempoLimpieza } from "./GeneradorTiempoLimpieza";
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
    valoresTiempo,
    triggerAbandono,
    valoresLimpieza
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
    this.tiempoFinLimpieza = null;
    this.promedioEsperaFutbol = 0;
    this.promedioEsperaHandBall = 0;
    this.promedioEsperaBasketBall = 0;
    this.cantFutbol = 0;
    this.cantHandBall = 0;
    this.cantBasketBall = 0;
    this.contadorAbandono = 0;
    this.valoresLimpieza = valoresLimpieza;
    this.cantidadLimpiezas = 0;
    this.generadorFinLimpieza = null;
    this.tiempoLimpieza = null;
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
    this.fila += 1;
    if (this.tiempoFinSimulacion <= this.reloj || this.fila == this.filas)
      evento = new FinSimulacion();
    this.calcularPromedios();
    this.cancha.acumularTiempoLibre(this.reloj);
    switch (evento.constructor.name) {
      case "Llegada":
        this.generarEventoLlegada();
        break;
      case "FinLimpieza":
        this.generarEventoFinLimpieza();
        break;
      case "FinOcupacion":
        this.generarEventoFinOcupacion();
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
      this.cola.getCantidadEnCola(),
      this.tiempoFinLimpieza,
      this.generadorFinLimpieza?.valoresTiempo,
      this.tiempoLimpieza
    );
    this.tiempoLimpieza = null;
    this.simulaciones.push(simulacion);
    let nextEvento = simulacion.getNextEvento();

    if (nextEvento.reloj >= this.tiempoFinSimulacion) {
      this.reloj = this.tiempoFinSimulacion;
      this.calcularPromedios();
      this.cancha.acumularTiempoLibre(this.reloj);
      simulacion = new Simulacion(
        new FinSimulacion(),
        this.tiempoFinSimulacion,
        this.fila,
        this.llegadaBasketBall,
        this.llegadaFutbol,
        this.llegadaHandBall,
        null,
        this.ocupacion,
        this.cancha.tiempoLibre,
        this.cancha.tiempoLibreDiario,
        this.promedioEsperaFutbol,
        this.promedioEsperaHandBall,
        this.promedioEsperaBasketBall,
        this.contadorAbandono,
        this.cola.getCantidadEnCola(),
        this.tiempoFinLimpieza
      );
      this.simulaciones.push(simulacion);
      nextEvento = simulacion.getNextEvento();
    }
    return nextEvento;
  }

  generarEventoInicio() {
    this.llegadaBasketBall = new GrupoBasketBall(
      this.reloj,
      this.valoresTiempo.llegadas.basketBall,
      this.valoresLimpieza.valorLimpiezaBasketBall
    );
    this.llegadaFutbol = new GrupoFutbol(
      this.reloj,
      this.valoresTiempo.llegadas.futbol,
      this.valoresLimpieza.valorLimpiezaFutbol
    );
    this.llegadaHandBall = new GrupoHandBall(
      this.reloj,
      this.valoresTiempo.llegadas.handBall,
      this.valoresLimpieza.valorLimpiezaHandBall
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
    return simulacion.getNextEvento();
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
    if (this.validarAbandono()) return;

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
    this.cantidadLimpiezas += 1;
    this.tiempoFinLimpieza = null;
    if (this.cola.isEmpty()) {
      this.cancha.liberarCancha(this.reloj);
      return;
    }

    const nextToEnter = this.cola.getNextInLine();
    nextToEnter.generarOcupacion(this.reloj, this.valoresTiempo.ocupacion);
    this.ocupacion = nextToEnter;
    this.cancha.ocuparCancha(this.reloj, nextToEnter);
  }

  generarEventoFinOcupacion() {
    this.listaGrupos.add({ ...this.ocupacion });
    this.generadorFinLimpieza = new GeneradorTiempoLimpieza(
      this.ocupacion.valorLimpieza,
      this.cantidadLimpiezas,
      this.valoresLimpieza.unidadIntegracion
    );
    this.tiempoLimpieza =
      this.generadorFinLimpieza.generarTiempoLimpieza() / 60;
    this.tiempoFinLimpieza = this.tiempoLimpieza + this.reloj;
    this.ocupacion = null;
  }

  generarNuevaLlegada(proximaLlegada) {
    switch (proximaLlegada.constructor.name) {
      case "GrupoBasketBall":
        this.llegadaBasketBall = new GrupoBasketBall(
          this.reloj,
          this.valoresTiempo.llegadas.basketBall,
          this.valoresLimpieza.valorLimpiezaBasketBall
        );
        break;
      case "GrupoFutbol":
        this.llegadaFutbol = new GrupoFutbol(
          this.reloj,
          this.valoresTiempo.llegadas.futbol,
          this.valoresLimpieza.valorLimpiezaFutbol
        );
        break;
      case "GrupoHandBall":
        this.llegadaHandBall = new GrupoHandBall(
          this.reloj,
          this.valoresTiempo.llegadas.handBall,
          this.valoresLimpieza.valorLimpiezaHandBall
        );
        break;
    }
  }

  calcularPromedios() {
    const { contFutbol, contBasket, contHandBall } =
      this.cola.contarDisciplinas(this.reloj);
    this.calcularPromedio(contFutbol, "futbol");
    this.calcularPromedio(contBasket, "basketball");
    this.calcularPromedio(contHandBall, "handball");
  }

  calcularPromedio(cont, type) {
    const group = GROUP_MAPPER[type];
    if (this[group.CANT] === 0) return;
    if (cont === 0) return;
    const tiempoAnterior = this.simulaciones.at(-1).reloj;
    this[group.PROM] = Number(
      Number(Number(this[group.PROM]) + (this.reloj - tiempoAnterior) * cont) /
        cont
    );
  }

  validarAbandono() {
    if (!this.cola.estaLlena(this.triggerAbandono)) return false;
    this.contadorAbandono += 1;
    return true;
  }
}
