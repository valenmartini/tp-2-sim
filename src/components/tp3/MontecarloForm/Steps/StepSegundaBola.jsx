import { ArrowLeftOutlined, CalculatorOutlined } from "@ant-design/icons";
import { Button, Form, Input, Row } from "antd";
import Title from "antd/es/typography/Title";
import React, { useEffect } from "react";

const ATRIBUTE_MAPPER = {
  0: "Cero",
  1: "Uno",
  2: "Dos",
  3: "Tres",
  4: "Cuatro",
  5: "Cinco",
  6: "Seis",
  7: "Siete",
  8: "Ocho",
  9: "Nueve",
};

export const StepSegundaBola = (props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    for (let i = 6; i <= 9; i++) {
      for (let j = 0; i + j <= 10; j++) {
        form.setFieldValue(
          `${ATRIBUTE_MAPPER[i].toLowerCase()}PrimerTiro-prob${
            ATRIBUTE_MAPPER[j]
          }`,
          props.valores.probabilidadesSegundaBola[
            `${ATRIBUTE_MAPPER[i].toLowerCase()}PrimerTiro`
          ][`prob${ATRIBUTE_MAPPER[j]}`]
        );
      }
    }
  });

  const handleChange = (primerTiro, e) => {
    props.setValores((prev) => {
      prev.probabilidadesSegundaBola[primerTiro][e.target.name] =
        Number(e.target.value);
      return prev;
    });
  };

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
            <Form.Item name='seisPrimerTiro-probCero' label="Prob. 0 pinos">
              <Input
                value={
                  props.valores.probabilidadesSegundaBola.seisPrimerTiro
                    .probCero
                }
                name="probCero"
                onChange={(e) => handleChange("seisPrimerTiro", e)}
              />
            </Form.Item>
            <Form.Item name='seisPrimerTiro-probUno' label="Prob. 1 pinos">
              <Input
                value={
                  props.valores.probabilidadesSegundaBola.seisPrimerTiro.probUno
                }
                name="probUno"
                onChange={(e) => handleChange("seisPrimerTiro", e)}
              />
            </Form.Item>
            <Form.Item name='seisPrimerTiro-probDos' label="Prob. 2 pinos">
              <Input
                value={
                  props.valores.probabilidadesSegundaBola.seisPrimerTiro.probDos
                }
                name="probDos"
                onChange={(e) => handleChange("seisPrimerTiro", e)}
              />
            </Form.Item>
            <Form.Item name='seisPrimerTiro-probTres' label="Prob. 3 pinos">
              <Input
                value={
                  props.valores.probabilidadesSegundaBola.seisPrimerTiro
                    .probTres
                }
                name="probTres"
                onChange={(e) => handleChange("seisPrimerTiro", e)}
              />
            </Form.Item>
            <Form.Item name='seisPrimerTiro-probCuatro' label="Prob. 4 pinos">
              <Input
                value={
                  props.valores.probabilidadesSegundaBola.seisPrimerTiro
                    .probCuatro
                }
                name="probCuatro"
                onChange={(e) => handleChange("seisPrimerTiro", e)}
              />
            </Form.Item>
          </Row>

          <Row gutter={[1, 24]} style={{ margin: "120pt, 0, 12pt, 0" }}>
            <Form.Item>
              <Title level={5} style={{ margin: 0 }}>
                7 Pinos
              </Title>
            </Form.Item>
            <Form.Item name='sietePrimerTiro-probCero' label="Prob. 0 pinos">
              <Input
                value={
                  props.valores.probabilidadesSegundaBola.sietePrimerTiro
                    .probCero
                }
                name="probCero"
                onChange={(e) => handleChange("sietePrimerTiro", e)}
              />
            </Form.Item>
            <Form.Item name='sietePrimerTiro-probUno' label="Prob. 1 pinos">
              <Input
                value={
                  props.valores.probabilidadesSegundaBola.sietePrimerTiro
                    .probUno
                }
                name="probUno"
                onChange={(e) => handleChange("sietePrimerTiro", e)}
              />
            </Form.Item>
            <Form.Item name='sietePrimerTiro-probDos' label="Prob. 2 pinos">
              <Input
                value={
                  props.valores.probabilidadesSegundaBola.sietePrimerTiro
                    .probDos
                }
                name="probDos"
                onChange={(e) => handleChange("sietePrimerTiro", e)}
              />
            </Form.Item>
            <Form.Item name='sietePrimerTiro-probTres' label="Prob. 3 pinos">
              <Input
                value={
                  props.valores.probabilidadesSegundaBola.sietePrimerTiro
                    .probTres
                }
                name="probTres"
                onChange={(e) => handleChange("sietePrimerTiro", e)}
              />
            </Form.Item>
          </Row>
          <Row gutter={[1, 24]} style={{ margin: "120pt, 0, 12pt, 0" }}>
            <Form.Item>
              <Title level={5} style={{ margin: 0 }}>
                8 Pinos
              </Title>
            </Form.Item>
            <Form.Item name='ochoPrimerTiro-probCero' label="Prob. 0 pinos">
              <Input
                value={
                  props.valores.probabilidadesSegundaBola.ochoPrimerTiro
                    .probCero
                }
                name="probCero"
                onChange={(e) => handleChange("ochoPrimerTiro", e)}
              />
            </Form.Item>
            <Form.Item name='ochoPrimerTiro-probUno' label="Prob. 1 pinos">
              <Input
                value={
                  props.valores.probabilidadesSegundaBola.ochoPrimerTiro.probUno
                }
                name="probUno"
                onChange={(e) => handleChange("ochoPrimerTiro", e)}
              />
            </Form.Item>
            <Form.Item name='ochoPrimerTiro-probDos' label="Prob. 2 pinos">
              <Input
                value={
                  props.valores.probabilidadesSegundaBola.ochoPrimerTiro.probDos
                }
                name="probDos"
                onChange={(e) => handleChange("ochoPrimerTiro", e)}
              />
            </Form.Item>
          </Row>
          <Row gutter={[1, 24]} style={{ margin: "120pt, 0, 12pt, 0" }}>
            <Form.Item>
              <Title level={5} style={{ margin: 0 }}>
                9 Pinos
              </Title>
            </Form.Item>
            <Form.Item name='nuevePrimerTiro-probCero' label="Prob. 0 pinos">
              <Input
                value={
                  props.valores.probabilidadesSegundaBola.nuevePrimerTiro
                    .probCero
                }
                name="probCero"
                onChange={(e) => handleChange("nuevePrimerTiro", e)}
              />
            </Form.Item>
            <Form.Item name='nuevePrimerTiro-probUno' label="Prob. 1 pinos">
              <Input
                value={
                  props.valores.probabilidadesSegundaBola.nuevePrimerTiro
                    .probUno
                }
                name="probUno"
                onChange={(e) => handleChange("nuevePrimerTiro", e)}
              />
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
            onClick={() => props.generarSimulacion()}
          >
            Generar Simulacion
          </Button>
        </div>
      </div>
    </div>
  );
};
