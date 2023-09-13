import { ArrowLeftOutlined, CalculatorOutlined } from "@ant-design/icons";
import { Button, Form, Input, Row } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";

export const StepSegundaBola = (props) => {
  const [form] = Form.useForm();
  return (
    <div>
      <Title level={4}>Probabilidades Segunda Bola</Title>
      <Form form={form} layout="inline">
        <Row gutter={[24, 12]}>
          <Row gutter={[1, 24]} style={{ margin: "120pt, 0, 12pt, 0" }}>
            <Form.Item>
              <Title level={5} style={{ margin: 0 }}>
                6 Pinos
              </Title>
            </Form.Item>
            <Form.Item label="Prob. 0 pinos">
              <Input />
            </Form.Item>
            <Form.Item label="Prob. 1 pinos">
              <Input />
            </Form.Item>
            <Form.Item label="Prob. 2 pinos">
              <Input />
            </Form.Item>
            <Form.Item label="Prob. 3 pinos">
              <Input />
            </Form.Item>
            <Form.Item label="Prob. 4 pinos">
              <Input />
            </Form.Item>
          </Row>

          <Row gutter={[1, 24]} style={{ margin: "120pt, 0, 12pt, 0" }}>
            <Form.Item>
              <Title level={5} style={{ margin: 0 }}>
                7 Pinos
              </Title>
            </Form.Item>
            <Form.Item label="Prob. 0 pinos">
              <Input />
            </Form.Item>
            <Form.Item label="Prob. 1 pinos">
              <Input />
            </Form.Item>
            <Form.Item label="Prob. 2 pinos">
              <Input />
            </Form.Item>
            <Form.Item label="Prob. 3 pinos">
              <Input />
            </Form.Item>
          </Row>
          <Row gutter={[1, 24]} style={{ margin: "120pt, 0, 12pt, 0" }}>
            <Form.Item>
              <Title level={5} style={{ margin: 0 }}>
                8 Pinos
              </Title>
            </Form.Item>
            <Form.Item label="Prob. 0 pinos">
              <Input />
            </Form.Item>
            <Form.Item label="Prob. 1 pinos">
              <Input />
            </Form.Item>
            <Form.Item label="Prob. 2 pinos">
              <Input />
            </Form.Item>
          </Row>
          <Row gutter={[1, 24]} style={{ margin: "120pt, 0, 12pt, 0" }}>
            <Form.Item>
              <Title level={5} style={{ margin: 0 }}>
                9 Pinos
              </Title>
            </Form.Item>
            <Form.Item label="Prob. 0 pinos">
              <Input />
            </Form.Item>
            <Form.Item label="Prob. 1 pinos">
              <Input />
            </Form.Item>
          </Row>
        </Row>
      </Form>
      <div
        style={{
          position: "relative",
          marginBottom: "20pt",
          marginTop: "10pt",
          height: "32px",
        }}
      >
        <div style={{ position: "absolute" }}>
          <Button
            style={{ right: 0 }}
            icon={<ArrowLeftOutlined />}
            onClick={() => props.setStep(1)}
          >
            Volver
          </Button>
        </div>
        <div style={{ position: "absolute", right: "0" }}>
          <Button
            style={{ right: 0 }}
            type="primary"
            icon={<CalculatorOutlined />}
            onClick={() => props.setStep(2)}
          >
            Generar Simulacion
          </Button>
        </div>
      </div>
    </div>
  );
};
