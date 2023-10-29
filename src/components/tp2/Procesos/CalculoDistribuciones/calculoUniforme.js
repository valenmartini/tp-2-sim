export const generarDistribucionUniforme = (valorA, valorB,rnd = null,muestra = 1) => {
  const distribucion = [];
  for (let i = 0; i < muestra; ++i) {
    distribucion.push(
      Number(
        Number(valorA) +
          Number(rnd || Math.random()) * (Number(valorB) - Number(valorA))
      )
    );
  }
  return distribucion;
};
