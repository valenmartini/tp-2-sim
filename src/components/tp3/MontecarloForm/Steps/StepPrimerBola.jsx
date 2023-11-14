import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button, Form, Input, Row } from "antd";
import Title from "antd/es/typography/Title";
import React, { useEffect } from "react";

export const StepPrimerBola = (props) => {
  const [form] = Form.useForm();
  
  useEffect(() => {
    form.setFieldsValue(props.valores.probabilidadesPrimerBola)
  },[])

  const handleChange = (e) => {
    props.setValores((prev) => {
      prev.probabilidadesPrimerBola[e.target.name] = Number(e.target.value);
      form.setFieldValue(e.target.name, e.target.value)
      return prev;
    });
  };

  return (
    <div>
      <div>
        <Title level={4}>Probabilidades Primera Bola</Title>
        <Form form={form} layout="inline">
          <Row gutter={[16, 24]}>
            <Form.Item name="probSeis" label="Prob. 6 pinos">
              <Input
                value={props.valores.probabilidadesPrimerBola.probSeis}
                name="probSeis"
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item name="probSiete" label="Prob. 7 pinos">
              <Input
                value={props.valores.probabilidadesPrimerBola.probSiete}
                name="probSiete"
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item name="probOcho" label="Prob. 8 pinos">
              <Input
                value={props.valores.probabilidadesPrimerBola.probOcho}
                name="probOcho"
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item name="probNueve" label="Prob. 9 pinos">
              <Input
                value={props.valores.probabilidadesPrimerBola.probNueve}
                name="probNueve"
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item name="probDiez" label="Prob. 10 pinos">
              <Input
                value={props.valores.probabilidadesPrimerBola.probDiez}
                name="probDiez"
                onChange={handleChange}
              />
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
