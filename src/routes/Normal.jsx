import React, { useEffect, useState } from "react";
import { Button, Form, Input, Row } from "antd";
import { DistribucionForm } from "../components/DistribucionForm/DistribucionForm";
import { AccordionTables } from "../components/AccordionTables/AccordionTables";
import { Histograma } from "../components/Histograma/Histograma";
import { exportToCsv } from "../components/ExportadorCSV/ExportadorCSV";
import { generarDistribucionNormal } from "../components/Procesos/CalculoDistribuciones/calculoNormal";

export const Normal = () => {
  const [muestra, setMuestra] = useState(0);
  const [media, setMedia] = useState();
  const [valores, setValores] = useState({ desviacion: 0, varianza: 0 });
  const [distribucion, setDistribucion] = useState();
  const [frecuencias, setFrecuencias] = useState();

  const generarDistribucion = () => {
    if (
      muestra <= 1000000 &&
      muestra > 0 &&
      media &&
      Number(valores.desviacion) > 0
    ) {
      setDistribucion(
        generarDistribucionNormal(muestra, media, Number(valores.desviacion))
      );
    }
  };

  const handleChangeDesviacion = (e) => {
    let { value } = e.target;
    value = value.replace(",", ".");
    const varianz = Number(Math.pow(Number(value), 2));
    const parsedValue = parseFloat(varianz);
    const hasDecimals = parsedValue % 1 !== 0;
    const varianzaPaseada = hasDecimals
      ? Number(parsedValue.toFixed(4))
      : Number(parsedValue);
    setValores({
      varianza: varianzaPaseada,
      desviacion: value,
    });
  };

  const handleChangeVarianza = (e) => {
    let { value } = e.target;
    value = value.replace(",", ".");
    const desv = Number(Math.sqrt(Number(value)));
    const parsedValue = parseFloat(desv);
    const hasDecimals = parsedValue % 1 !== 0;
    const desviacionParseada = hasDecimals
      ? Number(parsedValue.toFixed(4))
      : Number(parsedValue);
    setValores({
      varianza: value,
      desviacion: desviacionParseada,
    });
  };

  return (
    <div>
      <Row gutter={16} justify={"center"} style={{ marginTop: "15pt" }}>
        <DistribucionForm title="Normal">
          <Form.Item label="Tamaño Muestra" name="Tamaño Muestra">
            <Input
              value={muestra}
              onChange={(e) => setMuestra(Number(e.target.value))}
            />
          </Form.Item>
          <Form.Item label="Media" name="media">
            <Input value={media} onChange={(e) => setMedia(e.target.value)} />
          </Form.Item>
          <div className="wrapper">
            <label name="desviacion">Desviacion:</label>
            <Input
              type="text"
              value={valores.desviacion}
              onChange={handleChangeDesviacion}
            />
          </div>
          <div className="wrapper">
            <label name="varianza">Varianza:</label>
            <Input
              type="text"
              value={valores.varianza}
              onChange={handleChangeVarianza}
            />
          </div>
          <div style={{ position: "relative", height: "40px" }}>
            <Form.Item style={{ position: "absolute", right: "0" }}>
              {distribucion && (
                <Button
                  type="link"
                  onClick={() => {
                    exportToCsv(distribucion);
                  }}
                >
                  Exportar CSV
                </Button>
              )}
              <Button type="primary" onClick={generarDistribucion}>
                Generar Distribucion
              </Button>
            </Form.Item>
          </div>
        </DistribucionForm>
        {distribucion && frecuencias && (
          <AccordionTables
            distribucion={distribucion}
            frecuencias={frecuencias}
          />
        )}
      </Row>
      {distribucion && (
        <Row>
          <Histograma
            distribucion={distribucion}
            frecuencias={frecuencias}
            setFrecuencias={setFrecuencias}
          />
        </Row>
      )}
    </div>
  );
};
