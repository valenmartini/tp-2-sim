export const generarDistribucionNormal = (media, desviacion, muestra = 1) => {
  const distribucion = [];
  for (let i = 0; i < (muestra / 2).toFixed(0); i++) {
    const rnd1 = Math.random();
    const rnd2 = Math.random();
    distribucion.push(
      Number(
        Math.sqrt(-2 * Math.log(1 - rnd1)) *
          Math.cos(2 * Math.PI * rnd2) *
          Number(desviacion) +
          Number(media)
      )
    );
    distribucion.push(
      Number(
        Math.sqrt(-2 * Math.log(1 - rnd1)) *
          Math.sin(2 * Math.PI * rnd2) *
          Number(desviacion) +
          Number(media)
      )
    );
  }
  return distribucion;
};
