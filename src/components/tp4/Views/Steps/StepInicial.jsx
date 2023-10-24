import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import Title from "antd/es/typography/Title";
import { useForm } from "rc-field-form";
import React, { useEffect } from "react";

export const StepInicial = (props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(props.valores.datosGenerales);
  }, []);

  const handleChange = (e, isBoolean) => {
    props.setValores((prev) => {
      prev.datosGenerales[e.target.name] = isBoolean
        ? e.target.checked
        : Number(e.target.value);
      console.log(prev);
      return prev;
    });
  };

  return (
    <div>
      <div>
        <Title level={4} style={{ marginBottom: "26px" }}>
          Datos Generales de la Simulacion
        </Title>
        <Form form={form} layout="inline">
          <Row gutter={[16, 16]} style={{width:'50%'}}>
            <Col span={11}>
              <Form.Item name="filas" label="Cantidad de filas">
                <Input
                style={{maxWidth: '186px'}}
                  value={props.valores.datosGenerales.filas}
                  name="filas"
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={13}>
              <Form.Item name="tiempo" label="Tiempo de la simulacion">
                <Input
                style={{maxWidth: '186px'}}
                  value={props.valores.datosGenerales.tiempo}
                  name="tiempo"
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ marginTop: "20px",width:'70%' }}>
          <Col span={5}>
            <Form.Item
              name="todasFilas"
              label="Visualizar Todas las Filas"
              valuePropName="checked"
            >
              <Checkbox
                checked={props.valores.datosGenerales.todasFilas}
                name="todasFilas"
                onChange={(e) => handleChange(e, true)}
              />
            </Form.Item>
            </Col>
            <Col span={8}>
            <Form.Item name="visualizarDesde" label="Visualizar Desde">
              <Input
              style={{maxWidth: '186px'}}
                value={props.valores.datosGenerales.visualizarDesde}
                name="visualizarDesde"
                onChange={handleChange}
              />
            </Form.Item>
            </Col>
            <Col span={10}>
            <Form.Item
              name="visualizarHasta"
              label="Cantidad de filas a visualizar"
            >
              <Input
                value={props.valores.datosGenerales.visualizarHasta}
                name="visualizarHasta"
                onChange={handleChange}
              />
            </Form.Item>
            </Col>
          </Row>
          <Row style={{ marginTop: "20px",width:'100%' }}>
            <Form.Item name="tiempoLimpieza" label="Tiempo ocupado en limpieza">
              <Input
                value={props.valores.datosGenerales.tiempoLimpieza}
                name="tiempoLimpieza"
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item
              name="triggerAbandono"
              label="Cantidad de grupos en cola para retirarse"
            >
              <Input
                value={props.valores.datosGenerales.triggerAbandono}
                name="triggerAbandono"
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
