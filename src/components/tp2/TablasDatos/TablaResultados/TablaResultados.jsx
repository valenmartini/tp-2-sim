import { Col, Table } from "antd";
import React from "react";

const columns = [{ title: "Valores", dataIndex: "valores", key: "valores" }];

export const TablaResultados = (props) => {
  if (!props.data) return null;
  return (
    
      <Table
        columns={columns}
        dataSource={props.data.map((data, index) => {
          return { key: index, valores: Number(data).toFixed(4) };
        })}
        size="small"
      />
  );
};
