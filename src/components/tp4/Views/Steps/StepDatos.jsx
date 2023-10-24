import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row } from "antd";
import Title from "antd/es/typography/Title";
import React, { useEffect } from "react";

export const StepDatos = (props) => {
  const [form] = Form.useForm();

  useEffect(() => {

    form.setFieldsValue(convertData(props.valores.datosTiempo));
  }, []);

  function convertData(data, parentKeys = []) {
    let result = {};
  
    for (let key in data) {
      if (typeof data[key] === 'object') {
        // Es un objeto anidado, llamamos a la función recursivamente
        const nestedKeys = [...parentKeys, key];
        const nestedData = convertData(data[key], nestedKeys);
        result = { ...result, ...nestedData };
      } else {
        // Es un valor, construimos la clave en el formato deseado
        const keyString = [...parentKeys, key].join('-');
        result[keyString] = data[key];
      }
    }
  
    return result;
  }

  const handleChange = (e) => {
    const [tipo, disciplina, limite] = e.target.name.split("-");
    props.setValores((prev) => {
      prev.datosTiempo[tipo][disciplina][limite] = Number(e.target.value);
      console.log(prev);
      return prev;
    });
  };
  return (
    <div>
      <Title level={4} style={{ marginBottom: "26px" }}>
        Datos de Tiempo de Distribuciones
      </Title>
      <Title level={4} >Llegadas de grupo:</Title>
      <Form form={form} layout="inline">
        <Row gutter={[16, 16]} style={{ width: "100%" }}>
          <Col span={24}>
            <Form.Item name="llegadas-futbol" label="Futbol">
              <Input
                style={{ maxWidth: "186px" }}
                value={props.valores.datosTiempo.llegadas.futbol}
                name="llegadas-futbol"
                onChange={(e) => {
                  props.setValores((prev) => {
                    prev.datosTiempo.llegadas.futbol = e.target.value;
                    return prev;
                  });
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginTop: '20px',width: "100%" }}>
            <Col span={2}>
            <Title level={5} style={{margin: "0", marginTop: '4px'}}>HandBall:</Title>
            </Col>
          <Col span={5}>
            <Form.Item name="llegadas-handBall-inferior" label="Inferior">
              <Input
                style={{ maxWidth: "186px" }}
                value={props.valores.datosTiempo.llegadas.handBall.inferior}
                name="llegadas-handBall-inferior"
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item name="llegadas-handBall-superior" label="Superior">
              <Input
                style={{ maxWidth: "186px" }}
                value={props.valores.datosTiempo.llegadas.handBall.superior}
                name="llegadas-handBall-superior"
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginTop: '20px',width: "100%" }}>
            <Col span={2}>
            <Title level={5} style={{margin: "0", marginTop: '4px'}}>basketBall:</Title>
            </Col>
          <Col span={5}>
            <Form.Item name="llegadas-basketBall-inferior" label="Inferior">
              <Input
                style={{ maxWidth: "186px" }}
                value={props.valores.datosTiempo.llegadas.basketBall.inferior}
                name="llegadas-basketBall-inferior"
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item name="llegadas-basketBall-superior" label="Superior">
              <Input
                style={{ maxWidth: "186px" }}
                value={props.valores.datosTiempo.llegadas.basketBall.superior}
                name="llegadas-basketBall-superior"
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
        </Row>
        <Title level={4} >Tiempos de ocupacion:</Title>
        <Row gutter={[16, 16]} style={{width: "100%" }}>
            <Col span={2}>
            <Title level={5} style={{margin: "0", marginTop: '4px'}}>futbol:</Title>
            </Col>
          <Col span={5}>
            <Form.Item name="ocupacion-futbol-inferior" label="Inferior">
              <Input
                style={{ maxWidth: "186px" }}
                value={props.valores.datosTiempo.ocupacion.futbol.inferior}
                name="ocupacion-futbol-inferior"
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item name="ocupacion-futbol-superior" label="Superior">
              <Input
                style={{ maxWidth: "186px" }}
                value={props.valores.datosTiempo.ocupacion.futbol.superior}
                name="ocupacion-futbol-superior"
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{marginTop: '20px',width: "100%" }}>
            <Col span={2}>
            <Title level={5} style={{margin: "0", marginTop: '4px'}}>HandBall:</Title>
            </Col>
          <Col span={5}>
            <Form.Item name="ocupacion-handBall-inferior" label="Inferior">
              <Input
                style={{ maxWidth: "186px" }}
                value={props.valores.datosTiempo.ocupacion.handBall.inferior}
                name="ocupacion-handBall-inferior"
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item name="ocupacion-handBall-superior" label="Superior">
              <Input
                style={{ maxWidth: "186px" }}
                value={props.valores.datosTiempo.ocupacion.handBall.superior}
                name="ocupacion-handBall-superior"
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
          </Row>
          <Row gutter={[16, 16]} style={{marginTop: '20px',width: "100%" }}>
            <Col span={2}>
            <Title level={5} style={{margin: "0", marginTop: '4px'}}>BasketBall:</Title>
            </Col>
          <Col span={5}>
            <Form.Item name="ocupacion-basketBall-inferior" label="Inferior">
              <Input
                style={{ maxWidth: "186px" }}
                value={props.valores.datosTiempo.ocupacion.basketBall.inferior}
                name="ocupacion-basketBall-inferior"
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item name="ocupacion-basketBall-superior" label="Superior">
              <Input
                style={{ maxWidth: "186px" }}
                value={props.valores.datosTiempo.ocupacion.basketBall.superior}
                name="ocupacion-basketBall-superior"
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
        </Row>
        
      </Form>
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
            onClick={() => props.generarSimulacion()}
          >
            Generar Simulacion
          </Button>
        </div>
      </div>
    </div>
  );
};
