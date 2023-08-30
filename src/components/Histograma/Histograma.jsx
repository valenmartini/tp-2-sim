import { Select } from "antd";
import React, { useEffect, useState } from "react";
import Histogram from "react-chart-histogram";

const inicializarHistograma = (data, intervalos, setAmplitudIntervalos) => {
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
  const recorrido = Number(max) - Number(min);
  const amplitud = Number(Number(recorrido) / Number(intervalos));
  //setAmplitudIntervalos(amplitud);
  const interv = crearIntervalos(data, intervalos, amplitud, min);
  return interv;
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
      count: cargarIntervalo(data, start, start + amplitud),
    });
  }
  return interv;
};

const cargarIntervalo = (data, min, max) => {
  return data.reduce(
    (counter, value) => (value >= min && value <= max ? counter + 1 : counter),
    0
  );
};

export const Histograma = (props) => {
  const [data, setData] = useState(props.distribucion);
  const [intervalos, setIntervalos] = useState(10);
  const [amplitudIntervalo, setAmplitudIntervalos] = useState();
  const [dataHistograma, setDataHistograma] = useState();
  const options = {
    xLabel: "az",
    fillColor: "#00B3C9",
    strokeColor: "#00B3C9",
  };

  useEffect(() => {
    setDataHistograma(
      inicializarHistograma(data, intervalos, setAmplitudIntervalos)
    );
  }, [data]);

  useEffect(() => {
    setData(props.distribucion);
  }, [props.distribucion]);

  useEffect(() => {
    setDataHistograma(
      inicializarHistograma(data, intervalos, setAmplitudIntervalos)
    );
  }, [intervalos]);

  return (
    <>
      {dataHistograma && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Histogram
            xLabels={dataHistograma.map((data) =>
              (Number(data.start + data.end) / 2).toFixed(4)
            )}
            yValues={dataHistograma.map((data) => data.count)}
            width="810"
            height="500"
            options={options}
          />
          <Select
            defaultValue={10}
            style={{ width: 160 }}
            onChange={(value) => setIntervalos(value)}
            options={[
              { value: 10, label: "10 intervalos" },
              { value: 15, label: "15 intervalos" },
              { value: 20, label: "20 intervalos" },
              { value: 25, label: "25 intervalos" },
            ]}
          />
        </div>
      )}
    </>
  );
};
