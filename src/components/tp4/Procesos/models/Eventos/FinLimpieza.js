import { Evento } from "./Evento";

export default class FinLimpieza extends Evento{
    constructor(reloj){
        super();
        this.reloj = reloj;
        this.type = "Fin Limpieza Cancha";

    }
}