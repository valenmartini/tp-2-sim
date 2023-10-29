export const generarDistribucionExponencial = (media,rnd = null,muestra = 1) => {
  const distribucion = [];
  for (let i = 0; i < muestra; i++) {
    distribucion.push(
      Number(-Number(media) * Number(Math.log(1 - Number(rnd || Math.random()))))
    );
  }
  return distribucion;
};
