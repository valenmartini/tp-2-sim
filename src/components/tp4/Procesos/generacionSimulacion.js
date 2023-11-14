import { GestorSimulacion } from "./models/GestorSimulacion";

export const generarSimulacion = (valores) => {
  let gestorSimulacion = new GestorSimulacion(
    valores.datosGenerales.filas,
    valores.datosGenerales.tiempo,
    valores.datosTiempo,
    valores.datosGenerales.triggerAbandono,
    {
      valorLimpiezaFutbol: valores.datosGenerales.valorLimpiezaFutbol,
      valorLimpiezaHandBall: valores.datosGenerales.valorLimpiezaHandBall,
      valorLimpiezaBasketBall: valores.datosGenerales.valorLimpiezaBasketBall,
      unidadIntegracion: valores.datosGenerales.unidadIntegracion,
    }
  );
  gestorSimulacion.iniciarSimulacion();
  return gestorSimulacion;
};
