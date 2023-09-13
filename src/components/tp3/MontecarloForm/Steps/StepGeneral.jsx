import { Button, Divider, Form, Input, Row } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import { ArrowRightOutlined } from "@ant-design/icons";


export const StepGeneral = (props) => {
  const [form] = Form.useForm();
  return (
    <div>
      <div>
        <Title level={4}>Simulacion</Title>
        <Form form={form} layout="inline">
          <Form.Item label="Cantidad de Rondas">
            <Input />
          </Form.Item>
          <Form.Item label="Cantidad de filas">
            <Input />
          </Form.Item>
        </Form>
      </div>
      <Divider />
      <div>
        <Title level={4}>Valores del Problema</Title>
        <Form form={form} layout="inline">
          <Row gutter={[16, 24]}>
            <Form.Item label="Puntos en Primer Tiro">
              <Input />
            </Form.Item>
            <Form.Item label="Puntos en Segundo Tiro">
              <Input />
            </Form.Item>
            <Form.Item label="Cantidad de Tiros a Acumular">
              <Input />
            </Form.Item>
            <Form.Item label="Puntaje a Superar">
              <Input />
            </Form.Item>
          </Row>
        </Form>
      </div>
      <div
        style={{
          position: "relative",
          marginBottom: "10pt",
          marginTop: "20pt",
          height: "32px",
        }}
      >
        <div style={{ position: "absolute", right: "0" }}>
          <Button
            style={{ right: 0 }}
            type="primary"
            icon={<ArrowRightOutlined />}
            onClick={() => props.setStep(1)}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
};
