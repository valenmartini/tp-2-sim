const generarMinMax = (data) => {
    let max = 0;
    let min = 0;
    if (data.length > 500000) {
      const max1 = Math.max(...data.slice(0, Number(data.length / 2).toFixed(0)));
      const max2 = Math.max(
        ...data.slice(Number(data.length / 2).toFixed(0), data.length)
      );
      max = max1 >= max2 ? max1 : max2;
      const min1 = Math.min(...data.slice(0, Number(data.length / 2).toFixed(0)));
      const min2 = Math.min(
        ...data.slice(Number(data.length / 2).toFixed(0), data.length)
      );
      min = min1 <= min2 ? min1 : min2;
    } else {
      max = Math.max(...data);
      min = Math.min(...data);
    }
    return {min, max}
}

export const generarFrecuencias = (data, intervalos) => {
    const {min, max} = generarMinMax(data);
    const recorrido = Number(max) - Number(min);
    const amplitud = Number(Number(recorrido) / Number(intervalos));
    //setAmplitudIntervalos(amplitud);
    let interv = crearIntervalos(data, intervalos, amplitud, min);
  
    const interval = interv.map((interval) => {
      return {
        frecuencia: interval.count,
        "marca de clase": Number(
          ((interval.end + interval.start) / 2).toFixed(4)
        ),
        start: interval.start,
        end: interval.end
      };
    });
    return interval;
  };
  
  const crearIntervalos = (data, intervalos, amplitud, min) => {
    let interv = [];
    for (let i = 0; i < intervalos; i++) {
      let start = min;
      if (i != 0) {
        start = interv[i - 1].end;
      }
      interv.push({
        start: start,
        end: start + amplitud,
        count: cargarIntervalo(i, data, start, start + amplitud),
      });
    }
    return interv;
  };
  
  const cargarIntervalo = (index, data, min, max) => {
    return data.reduce((counter, value) => {
      return index == 0
        ? value >= min && value <= max
          ? counter + 1
          : counter
        : value > min && value <= max
        ? counter + 1
        : counter;
    }, 0);
  };