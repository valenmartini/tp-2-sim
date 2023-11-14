const parseNumber = (number) => {
  if (isNaN(number)) return number;
  return Number(number.toFixed(5));
};

export class GeneradorTiempoLimpieza {
  constructor(valorInicial, cantidadLimpiezas, unidadIntegracion) {
    this.valorInicial = valorInicial;
    this.unidadIntegracion = unidadIntegracion;
    this.cantidadLimpiezas = cantidadLimpiezas;
    this.valoresTiempo = [];
    this.tiempoLimpieza = 0;
  }

  generarTiempoLimpieza = () => {
    let contador = 0;
    let valor = this.valorInicial;
    let derivada = 0.6 * this.cantidadLimpiezas - this.tiempoLimpieza;
    let nuevoValor = valor + this.unidadIntegracion * derivada;
    this.valoresTiempo.push({
      tiempoLimpieza: this.tiempoLimpieza,
      contador,
      valor: parseNumber(valor),
      derivada: parseNumber(derivada),
      nuevoValor: parseNumber(nuevoValor),
    });
    while (valor > 0) {
      contador += 1;
      this.tiempoLimpieza = this.tiempoLimpieza + this.unidadIntegracion;
      valor = nuevoValor;
      derivada = 0.6 * this.cantidadLimpiezas - this.tiempoLimpieza;
      nuevoValor = valor + this.unidadIntegracion * derivada;
      this.valoresTiempo.push({
        tiempoLimpieza: this.tiempoLimpieza,
        contador,
        valor: parseNumber(valor),
        derivada: parseNumber(derivada),
        nuevoValor: parseNumber(nuevoValor),
      });
    }
    return this.tiempoLimpieza;
  };
}
