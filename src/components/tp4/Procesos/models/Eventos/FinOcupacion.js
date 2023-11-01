import { Evento } from "./Evento";

export default class FinOcupacion extends Evento{
    constructor(reloj){
        super();
        this.reloj = reloj;
        this.type = "Fin Ocupacion"
    }
}