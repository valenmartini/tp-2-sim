import { Col } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";

export const DistribucionForm = (props) => {
  return (
    <Col span={10}>
      <div
        style={{
          margin: '15pt',
          marginTop: '30pt',
          padding: "40pt",
          paddingTop: '5pt',
          paddingBottom: "10pt",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
        }}
      >
        <Title level={3} style={{textAlign: 'center', marginBottom: '20pt'}}>{props.title}</Title>
        {props.children}
      </div>
    </Col>
  );
};
