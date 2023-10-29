export default class Cola {
  constructor() {
    this.cola = [];
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
}
