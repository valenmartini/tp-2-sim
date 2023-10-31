import { GestorSimulacion } from "./models/GestorSimulacion";

export const generarSimulacion = (valores) => {
  let gestorSimulacion = new GestorSimulacion(
    valores.datosGenerales.filas,
    valores.datosGenerales.tiempo,
    valores.datosGenerales.tiempoLimpieza,
    valores.datosTiempo,
    valores.datosGenerales.triggerAbandono
  );
  gestorSimulacion.iniciarSimulacion();
  console.log(gestorSimulacion);
  return gestorSimulacion;
};
