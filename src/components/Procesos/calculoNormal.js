export const generarDistribucionNormal = (muestra, media, desviacion) => {
  const distribucion = [];
  for (let i = 0; i < muestra; i++) {
    distribucion.push(
      Number(
        Math.sqrt(-2 * Math.log(Math.random())) *
          Math.cos(2 * Math.PI * Math.random()) *
          Number(desviacion) +
          Number(media)
      )
    );
  }
  return distribucion;
};
