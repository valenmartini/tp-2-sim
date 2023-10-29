export class Grupo {
    constructor(){
        this.porLlegar = true;
        this.rndLlegada = 0;
        this.rndOcupacion = 0;
        this.ocupando = false;
        this.tiempoOcupacion = 0;
        this.tiempoFinOcupacion = 0;
        this.tiempoALlegada = 0;
        this.tiempoLlegada = 0;
    }

    generarOcupacion(){
        this.ocupando = true;
        this.porLlegar = false;
    }
}