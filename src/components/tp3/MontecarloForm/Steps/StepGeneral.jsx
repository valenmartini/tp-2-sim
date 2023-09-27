import { Button, Checkbox, Divider, Form, Input, Row } from "antd";
import Title from "antd/es/typography/Title";
import React, { useEffect } from "react";
import { ArrowRightOutlined } from "@ant-design/icons";

export const StepGeneral = (props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(props.valores);
  }, []);

  const handleChange = (e,isBoolean) => {
    props.setValores((prev) => {
      prev[e.target.name] = isBoolean
        ? e.target.checked
        : Number(e.target.value);
      console.log(prev);
      return prev;
    });
  };

  return (
    <div>
      <div>
        <Title level={4}>Simulacion</Title>
        <Form form={form} layout="inline">
          <Form.Item name="filas" label="Cantidad de filas">
            <Input
              value={props.valores.filas}
              name="filas"
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            name="todasFilas"
            label="Visualizar Todas las Filas"
            valuePropName="checked"
          >
            <Checkbox
              checked={props.valores.todasFilas}
              name="todasFilas"
              onChange={(e) => handleChange(e,true)}
            />
          </Form.Item>
          <Form.Item name="visualizarDesde" label="Visualizar Desde">
            <Input
              value={props.valores.visualizarDesde}
              name="visualizarDesde"
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item name="visualizarHasta" label="Cantidad de filas a visualizar">
            <Input
              value={props.valores.visualizarHasta}
              name="visualizarHasta"
              onChange={handleChange}
            />
          </Form.Item>
        </Form>
      </div>
      <Divider />
      <div>
        <Title level={4}>Valores del Problema</Title>
        <Form form={form} layout="inline">
          <Row gutter={[16, 24]}>
            <Form.Item name="puntosPrimerTiro" label="Puntos en Primer Tiro">
              <Input
                value={props.valores.puntosPrimerTiro}
                name="puntosPrimerTiro"
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item name="puntosSegundoTiro" label="Puntos en Segundo Tiro">
              <Input
                value={props.valores.puntosSegundoTiro}
                name="puntosSegundoTiro"
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item
              name="tirosAcumular"
              label="Cantidad de Tiros a Acumular"
            >
              <Input
                value={props.valores.tirosAcumular}
                name="tirosAcumular"
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item name="puntajeSuperar" label="Puntaje a Superar">
              <Input
                value={props.valores.puntajeSuperar}
                name="puntajeSuperar"
                onChange={handleChange}
              />
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
