import { Table } from "antd";
import React from "react";

const columns = [
  { title: "Limite inferior", dataIndex: "start", key: "start" },
  { title: "Limite Superior", dataIndex: "end", key: "end" },
  { title: "Frecuencia Observada", dataIndex: "frecuencia", key: "frecuencia" },
];

export const TablaFrecuencias = (props) => {
  return (
    <Table
      columns={columns}
      dataSource={props.frecuencias.map((freq) => {
        return {
          frecuencia: freq.frecuencia,
          start: freq.start.toFixed(4),
          end: freq.end.toFixed(4),
        };
      })}
      size="small"
    />
  );
};
