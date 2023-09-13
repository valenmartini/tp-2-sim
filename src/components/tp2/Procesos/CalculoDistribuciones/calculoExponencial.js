export const generarDistribucionExponencial = (muestra, media) => {
  const distribucion = [];
  for (let i = 0; i < muestra; i++) {
    distribucion.push(
      Number(-Number(media) * Number(Math.log(1 - Number(Math.random()))))
    );
  }
  return distribucion;
};
