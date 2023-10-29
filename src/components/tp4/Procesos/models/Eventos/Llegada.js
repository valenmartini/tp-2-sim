import { Evento } from "./Evento";

export default class Llegada extends Evento {
    constructor(reloj, disciplina){
        super();
        this.reloj = reloj;
        this.type = "Llegada"
        this.disciplina = disciplina
    }
}