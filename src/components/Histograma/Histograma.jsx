import { Select } from "antd";
import React, { useEffect, useState } from "react";
import Histogram from "react-chart-histogram";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

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
  console.log(interval);
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

const CustomTooltip = ({payload, label, active}) => {
  if(active) {
    console.log(payload);
    return(
      <div style={{backgroundColor: "rgb(255, 255, 255)",
        border: "1px solid rgb(204, 204, 204)", padding: '10px', whiteSpace: 'nowrap'}}>
      <p className="label">{`intervalo (${payload[0].payload.start.toFixed(4) +" - "+ payload[0].payload.end.toFixed(4)}] : ${payload[0].value}`}</p>
    </div>
    )
  }
}

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

  const prueba = () => {
    let data = [...dataHistograma];
    data.push({ count: 0 });
    return data.map((data) => data.count);
  };

  return (
    <>
      {dataHistograma && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "40px",
          }}
        >
          <BarChart width={1320} height={500} data={dataHistograma}>
            <XAxis dataKey="marca de clase" />
            <YAxis />
            <Tooltip  content={<CustomTooltip/>}  />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Bar dataKey="frecuencia" fill="#8884d8" barSize={30} />
          </BarChart>
          {/*           <Histogram
            xLabels={dataHistograma.map((data) =>
              (Number(data.start + data.end) / 2).toFixed(4)
            )}
            yValues={prueba()}
            width="810"
            height="500"
            options={options}
          /> */}
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
