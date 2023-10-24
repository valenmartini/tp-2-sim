import { GrupoBasketBall } from "../Grupos/GrupoBasketBall";
import { GrupoFutbol } from "../Grupos/GrupoFutbol";
import { GrupoHandBall } from "../Grupos/GrupoHandBall";
import { Evento } from "./Evento";

export class Inicio extends Evento {
    constructor() {
        super();
    }

    getLlegadas(){
        this.grupoHandBall = new GrupoHandBall();
        this.grupoFutbol = new GrupoFutbol();
        this.grupoBasketBall = new GrupoBasketBall();
    }
}