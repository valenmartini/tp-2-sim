import { Inicio } from "./Eventos/Inicio";
import { Simulacion } from "./Simulacion";

export class GestorSimulacion {
    constructor(filas, tiempoFinSimulacion) {
        this.simulaciones = [];
        this.reloj = 0;
        this.fila = 1;
        this.cola = [];
        this.filas = filas;
        this.tiempoFinSimulacion = tiempoFinSimulacion
    }

    iniciarSimulacion(){
        let proximoEvento = this.generarNuevaSimulacion(new Inicio());
        while(this.fila <= this.filas && this.tiempoFinSimulacion > this.reloj) {
            
            console.log(this.fila);
            proximoEvento = this.generarNuevaSimulacion(proximoEvento);
            this.fila += 1;
        }
        return this.simulaciones;
    }

    generarNuevaSimulacion(evento) {
        if(this.tiempoFinSimulacion <= this.reloj) return;
        let simulacion = new Simulacion(evento, this.reloj, this.fila);
        simulacion.generar();
        this.simulaciones.push(simulacion);
        return simulacion.getNextEvento();
    }
}