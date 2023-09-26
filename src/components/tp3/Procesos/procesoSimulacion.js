import { generarProbabilidadesAcumuladas } from "./probabilidadesAcumuladas";

export const generarProcesoSimuacion = (valores) => {

  const { tirosAcumular, puntajeSuperar } = valores;
    //genero array con las probabilidades conjuntas y sus valores
  const arrayProbabilidadesConjuntas = generarProbabilidadesAcumuladas(valores);

  //defino variables
  let arrayResultados = [];
  let acumRondas = 0;
  let acumRondasGanadas = 0;
  //genero ciclo de filas de simulacion
  for (let i = 0; i < valores.filas; i++) {
    //busco los datos segun un random generado
    const fila = generarFilaSimulacion(
      i,
      arrayProbabilidadesConjuntas
    );
    //verifico acumulacion
    if (fila.numeroFila % tirosAcumular === 0) {
      if (acumRondas >= puntajeSuperar) {
        acumRondasGanadas += 1;
      }
      acumRondas = fila.puntos;
    } else {
      acumRondas += fila.puntos;
    }
    //agrego fila a array de resultados
    arrayResultados.push({acumRondas, acumRondasGanadas, ...fila})
  }
  console.log(arrayResultados);
  return arrayResultados;
};

const generarFilaSimulacion = (
  indice,
  arrayProbabilidadesConjuntas,
) => {
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
