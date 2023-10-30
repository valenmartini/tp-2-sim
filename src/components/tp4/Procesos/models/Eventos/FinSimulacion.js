import { Evento } from "./Evento";

export default class FinSimulacion extends Evento {
    constructor(){
        super();
        this.type="Fin Simulacion"
    }
}