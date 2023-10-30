export class Grupo {
    constructor(){
        this.porLlegar = true;
        this.tiempoEnEspera = 0;
        this.tiempoEntradaCola = null;
        this.rndLlegada = 0;
        this.rndOcupacion = 0;
        this.esperando = false;
        this.ocupando = false;
        this.tiempoOcupacion = 0;
        this.tiempoInicioOcupacion = 0;
        this.tiempoFinOcupacion = 0;
        this.tiempoALlegada = 0;
        this.tiempoLlegada = 0;
    }

    generarOcupacion(reloj){
        if(this.esperando){
            this.esperando = false;
            this.tiempoEnEspera = reloj - this.tiempoEntradaCola;
        }
        this.tiempoInicioOcupacion = reloj;
        this.ocupando = true;
        this.porLlegar = false;
    }

    entrarACola(reloj){
        this.esperando = true;
        this.tiempoEntradaCola = reloj;
    }

}