import React, { useEffect, useState } from "react";
import { Button, Form, Input, Row } from "antd";
import { DistribucionForm } from "../components/tp2/DistribucionForm/DistribucionForm";
import { generarDistribucionExponencial } from "../components/tp2/Procesos/CalculoDistribuciones/calculoExponencial";
import { exportToCsv } from "../components/tp2/ExportadorCSV/ExportadorCSV";
import { Histograma } from "../components/tp2/Histograma/Histograma";
import { AccordionTables } from "../components/tp2/AccordionTables/AccordionTables";


export const Exponencial = () => {
  const [muestra, setMuestra] = useState(0);
  const [media, setMedia] = useState();
  const [distribucion, setDistribucion] = useState();
  const [frecuencias, setFrecuencias] = useState();

  const generarDistribucion = () => {
    if (muestra <= 1000000 && muestra > 0 && media) {
      setDistribucion(generarDistribucionExponencial(muestra, media));
    }
  };

  return (
    <div>
      <Row gutter={16} justify={"center"} style={{ marginTop: "15pt" }}>
        <DistribucionForm title="Exponencial">
          <Form.Item label="Tamaño Muestra" name="Tamaño Muestra">
            <Input
              value={muestra}
              onChange={(e) => setMuestra(Number(e.target.value))}
            />
          </Form.Item>
          <Form.Item label="Media" name="media">
            <Input value={media} onChange={(e) => setMedia(e.target.value)} />
          </Form.Item>
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
