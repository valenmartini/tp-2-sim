export const generarProbabilidadesAcumuladas = (valores) => {
    //manejo de valores del segundo tiro a traves de array para simplificar recorrido
    const arraySegundoTiro = [
      valores.probabilidadesSegundaBola.seisPrimerTiro,
      valores.probabilidadesSegundaBola.sietePrimerTiro,
      valores.probabilidadesSegundaBola.ochoPrimerTiro,
      valores.probabilidadesSegundaBola.nuevePrimerTiro,
    ];
    //inicializo variables
    let arrayResultados = [];
    let acum = 0;
    let index = 0;
    //recorro todas las probabilidades del primer tiro
    Object.entries(valores.probabilidadesPrimerBola).forEach(
      (entryPrimerTiro) => {
        let cantSegundoTiro = -1;
        //verifico si es la ultima probabilidad, porque no tengo que recorrer la segunda bola si son 10
        if (entryPrimerTiro[0] === "probDiez") {
          //agrego una entrada al array con la probabilidad
          arrayResultados.push({
            cantPrimerTiro: 10,
            cantSegundoTiro: 0,
            probabilidad: acum + entryPrimerTiro[1] / 100,
            puntos: valores.puntosPrimerTiro,
          });
        } else {
          //recorro las probabilidades del segundo tiro
          Object.entries(arraySegundoTiro[index]).forEach((entrySegundoTiro) => {
            //defino variables para guardarlas en el array de resultados
            let cantPrimerTiro = index + 6;
            cantSegundoTiro += 1;
            //verifico si la suma de pinos da 10, sino sumo la cantidad tirada
            let puntos =
              cantPrimerTiro + cantSegundoTiro === 10
                ? valores.puntosSegundoTiro
                : 6 + index + cantSegundoTiro;
            acum += ((entryPrimerTiro[1] / 100) * entrySegundoTiro[1]) / 100;
            let probabilidad = acum;
            //agrego una entrada al array
            arrayResultados.push({
              cantPrimerTiro,
              cantSegundoTiro,
              probabilidad,
              puntos,
            });
          });
          index += 1;
        }
      }
    );
  
    return arrayResultados;
  };