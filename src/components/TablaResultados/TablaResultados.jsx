import { Col, Table } from "antd";
import React from "react";

const columns = [{ title: "Valores", dataIndex: "valores", key: "valores" }];

export const TablaResultados = (props) => {
  return (
    <Col span={12} style={{marginTop: '30pt'}}>
    <Table
      columns={columns}
      dataSource={props.data.map((data, index) => {
        return { key: index, valores: Number(data).toFixed(4) };
      })}
      size="small"
    />
    </Col>
  );
};
