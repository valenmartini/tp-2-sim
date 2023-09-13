import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button, Form, Input, Row } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";

export const StepPrimerBola = (props) => {
  const [form] = Form.useForm();
  return (
    <div>
      <div>
        <Title level={4}>Probabilidades Primera Bola</Title>
        <Form form={form} layout="inline">
          <Row gutter={[16, 24]}>
            <Form.Item label="Prob. 6 pinos">
              <Input />
            </Form.Item>
            <Form.Item label="Prob. 7 pinos">
              <Input />
            </Form.Item>
            <Form.Item label="Prob. 8 pinos">
              <Input />
            </Form.Item>
            <Form.Item label="Prob. 9 pinos">
              <Input />
            </Form.Item>
            <Form.Item label="Prob. 10 pinos">
              <Input />
            </Form.Item>
          </Row>
        </Form>
      </div>
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
            onClick={() => props.setStep(0)}
          >
            Volver
          </Button>
        </div>
        <div style={{ position: "absolute", right: "0" }}>
          <Button
            style={{ right: 0 }}
            type="primary"
            icon={<ArrowRightOutlined />}
            onClick={() => props.setStep(2)}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
};
