export default class Cancha {
  constructor() {
    this.ocupado = false;
    this.grupoOcupando = "";
    this.tiempoLibre = 0;
    this.tiempoLibreDiario = 0;
    this.ultimoMomentoOcupado = 0;
  }

  acumularTiempoLibre(reloj) {
    if (this.ocupado) return;
    console.log(
      reloj,
      this.ultimoMomentoOcupado,
      this.ocupado,
      this.tiempoLibre
    );
    this.tiempoLibre += Number((reloj - this.ultimoMomentoOcupado).toFixed(5));
    this.tiempoLibreDiario =
      this.tiempoLibre / ((reloj - (reloj % 24)) / 24 + 1);
  }

  ocuparCancha(grupoOcupando) {
    this.ocupado = true;
    this.grupoOcupando = grupoOcupando;
  }

  liberarCancha(reloj) {
    this.grupoOcupando = "";
    this.ocupado = false;
    this.ultimoMomentoOcupado = reloj;
  }
}
