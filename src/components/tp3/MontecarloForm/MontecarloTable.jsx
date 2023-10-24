import { Col, Table } from "antd";
import React from "react";

const columns = [
  { title: "Numero Fila", dataIndex: "numeroFila", key: "numeroFila" },
  { title: "Numero Partida", dataIndex: "nroRonda", key: "nroRonda" },
  { title: "N Random", dataIndex: "rndTiro", key: "rndTiro" },
  {
    title: "Pinos en primer Tiro",
    dataIndex: "cantPrimerTiro",
    key: "cantPrimerTiro",
  },
  {
    title: "Pinos en segundo Tiro",
    dataIndex: "cantSegundoTiro",
    key: "cantSegundoTiro",
  },
  { title: "Puntos", dataIndex: "puntos", key: "puntos" },
  {
    title: "Puntos Acumulados",
    dataIndex: "acumRondas",
    key: "acumRondas",
  },
  {
    title: "Partidas Ganadas",
    dataIndex: "acumRondasGanadas",
    key: "acumRondasGanadas",
  },
  {
    title: "Promedio Acumulado",
    dataIndex: "promedioAcumulado",
    key: "promedioAcumulado",
  },
];

export const MontecarloTable = (props) => {
  if (!props.data) return null;

  const cargaVisualizacionDatos = () => {
    const data = props.data.map((data, index) => {
      return {
        key: index,
        ...data,
        rndTiro: Number(data.rndTiro).toFixed(4),
        promedioAcumulado: Number(data.promedioAcumulado).toFixed(4),
      };
    });
    if (!props.todas) {
      console.log(data.slice(props.desde - 1, props.hasta),data);
      return [...data.slice(props.desde - 1, props.desde - 1 + props.hasta), data[data.length -1]];
    } else {
      return data;
    }
  };

  return (
    <Table
      columns={columns}
      dataSource={cargaVisualizacionDatos()}
      size="small"
    />
  );
};
