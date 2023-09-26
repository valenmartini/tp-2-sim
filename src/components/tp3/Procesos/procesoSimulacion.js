import { generarProbabilidadesAcumuladas } from "./probabilidadesAcumuladas";

export const generarProcesoSimuacion = (valores) => {
  const { tirosAcumular, puntajeSuperar } = valores;
  //genero array con las probabilidades conjuntas y sus valores
  const arrayProbabilidadesConjuntas = generarProbabilidadesAcumuladas(valores);
console.log(arrayProbabilidadesConjuntas);
  //defino variables
  let arrayResultados = [];
  let acumRondas = 0;
  let acumRondasGanadas = 0;
  let nroRonda = 1;
  //genero ciclo de filas de simulacion
  for (let i = 0; i < valores.filas; i++) {
    //busco los datos segun un random generado
    const fila = generarFilaSimulacion(i, arrayProbabilidadesConjuntas);
    let promedioAcumulado = arrayResultados[arrayResultados.length - 1]
      ? arrayResultados[arrayResultados.length - 1].promedioAcumulado
      : 0;
    //verifico acumulacion
    if (i != 0 && i % tirosAcumular === 0) {
      nroRonda += 1;
      if (acumRondas >= puntajeSuperar) {
        acumRondasGanadas += 1;

        promedioAcumulado =
          (arrayResultados[arrayResultados.length - 1].acumRondasGanadas + 1) /
          (i / tirosAcumular);
      } else {
        promedioAcumulado =
          arrayResultados[arrayResultados.length - 1].acumRondasGanadas /
          (i / tirosAcumular);
      }
      acumRondas = fila.puntos;
    } else {
      acumRondas += fila.puntos;
    }
    //agrego fila a array de resultados
    arrayResultados.push({
      acumRondas,
      acumRondasGanadas,
      promedioAcumulado,
      nroRonda,
      ...fila,
    });
  }
  console.log(arrayResultados);
  return arrayResultados;
};

const generarFilaSimulacion = (indice, arrayProbabilidadesConjuntas) => {
  const numeroFila = indice + 1;
  const rndTiro = Math.random();
  const valorObtenido = arrayProbabilidadesConjuntas.find(
    (prob) => prob.probabilidad >= rndTiro
  );

  return {
    numeroFila,
    rndTiro,
    ...valorObtenido,
  };
};
