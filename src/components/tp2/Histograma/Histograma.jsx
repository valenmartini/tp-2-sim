import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { generarFrecuencias } from "../Procesos/CalculoFrecuencias/CalculoFrecuencias";

const CustomTooltip = ({ payload, label, active }) => {
  if (active) {
    return (
      <div
        style={{
          backgroundColor: "rgb(255, 255, 255)",
          border: "1px solid rgb(204, 204, 204)",
          padding: "10px",
          whiteSpace: "nowrap",
        }}
      >
        <p className="label">{`intervalo (${
          payload[0].payload.start.toFixed(4) +
          " - " +
          payload[0].payload.end.toFixed(4)
        }] : ${payload[0].value}`}</p>
      </div>
    );
  }
};

export const Histograma = (props) => {
  const [intervalos, setIntervalos] = useState(10);

  useEffect(() => {
    props.setFrecuencias(generarFrecuencias(props.distribucion, intervalos));
  }, [props.distribucion]);

  useEffect(() => {
    props.setFrecuencias(generarFrecuencias(props.distribucion, intervalos));
  }, [intervalos]);

  return (
    <>
      {props.frecuencias && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "40px",
          }}
        >
          <BarChart width={1320} height={500} data={props.frecuencias}>
            <XAxis dataKey="marca de clase" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Bar dataKey="frecuencia" fill="#8884d8" barSize={120} />
          </BarChart>
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
