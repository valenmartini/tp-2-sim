import { GestorSimulacion } from "./models/GestorSimulacion";

export const generarSimulacion = (valores) => {
    let gestorSimulacion = new GestorSimulacion(valores.datosGenerales.filas,valores.datosGenerales.tiempo);
    console.log(gestorSimulacion.iniciarSimulacion());
}