import { Inicio } from "./Eventos/Inicio";

export class Simulacion {
    constructor(evento, reloj, fila) {
        this.evento = evento;
        this.reloj = reloj;
        this.fila = fila;
    }

    generar(){
        switch(this.evento.constructor.name) {
            case "Inicio":
                this.evento.getLlegadas();
                return;
        }
    }

    getNextEvento() {
        return new Inicio();
    }
}