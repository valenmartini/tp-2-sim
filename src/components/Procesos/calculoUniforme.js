export const generarDistribucionUniforme = (muestra, valorA, valorB) => {
  const distribucion = [];
  for (let i = 0; i < muestra; ++i) {
    distribucion.push(
      Number(
        Number(valorA) +
          Number(Math.random()) * (Number(valorB) - Number(valorA))
      )
    );
  }
  return distribucion;
};
