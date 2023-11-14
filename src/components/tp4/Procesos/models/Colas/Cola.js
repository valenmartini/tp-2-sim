export default class Cola {
  constructor() {
    this.cola = [];
    this.tiempoUltimaAcumulacion = 0;
  }

  add(item) {
    this.cola.push(item);
  }

  isEmpty() {
    return this.cola.length === 0;
  }

  getNextInLine() {
    if (this.cola.length == 1) return this.cola.shift();
    this.cola.sort((menor, actual) => {
      return menor.tiempoLlegada > actual.tiempoLlegada;
    });
    const filterHandBall = this.cola.filter(
      (grupo) => grupo.tpye != "handBall"
    );
    if (filterHandBall.length > 0) {
      let index = this.cola.indexOf(filterHandBall[0]);
      this.cola.splice(index, 1);
      return filterHandBall[0];
    } else {
      return this.cola.shift();
    }
  }

  contarDisciplinas(){
    let contBasket = 0, contFutbol = 0, contHandBall = 0;

    this.cola.forEach((grupo)=>{
      switch(grupo.type){
        case 'basketball':
          contBasket += 1;
          break;
        case 'futbol':
          contFutbol += 1;
          break;
        case 'handball':
          contHandBall += 1;
      }
    })
    return {contBasket, contFutbol, contHandBall}
  }

  acumularTiempo(reloj){
    let acumBasket = 0,acumFutbol = 0, acumHandBall = 0;

    this.cola.forEach((grupo) => {
      switch (grupo.type){
        case 'basketball':
          acumBasket += (reloj - grupo.tiempoLlegada) - (this.tiempoUltimaAcumulacion - grupo.tiempoLlegada);
          break;
        case 'futbol':
          acumFutbol += (reloj - grupo.tiempoLlegada) - (this.tiempoUltimaAcumulacion - grupo.tiempoLlegada);
          break;
        case 'handball':
          acumHandBall += (reloj - grupo.tiempoLlegada) - (this.tiempoUltimaAcumulacion - grupo.tiempoLlegada);
      }
    });
    if(acumBasket < 0 ) acumBasket = 0;
    if(acumFutbol < 0 ) acumFutbol = 0;
    if(acumHandBall < 0 ) acumHandBall = 0;
    this.tiempoUltimaAcumulacion = reloj;

    return {acumBasket,acumFutbol, acumHandBall}
  }

  estaLlena(triggerAbandono) {
    return this.cola.length >= triggerAbandono;
  }

  getCantidadEnCola(){
    return this.cola.length;
  }
}
