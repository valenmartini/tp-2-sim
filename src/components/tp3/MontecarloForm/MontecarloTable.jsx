import { Col, Table } from "antd";
import React from "react";

const columns = [
    { title: "Numero", dataIndex: "numeroFila", key: "numeroFila" },
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
      title: "Rondas Ganadas",
      dataIndex: "acumRondasGanadas",
      key: "acumRondasGanadas",
    },
  ];

export const MontecarloTable = (props) => {
  if (!props.data) return null;
  return (
    
    <Table
      columns={columns}
      dataSource={props.data.map((data, index) => {
        return {
          key: index,
          ...data,
          rndTiro: Number(data.rndTiro).toFixed(4),
        };
      })}
      size="small"
    />
  );
};