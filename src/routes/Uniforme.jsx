import React, { useEffect, useState } from "react";
import { Button, Form, Input, Row } from "antd";
import { generarDistribucionUniforme } from "../components/tp2/Procesos/CalculoDistribuciones/calculoUniforme";
import { DistribucionForm } from "../components/tp2/DistribucionForm/DistribucionForm";
import { exportToCsv } from "../components/tp2/ExportadorCSV/ExportadorCSV";
import { AccordionTables } from "../components/tp2/AccordionTables/AccordionTables";
import { Histograma } from "../components/tp2/Histograma/Histograma";

export const Uniforme = () => {
  const [muestra, setMuestra] = useState(0);
  const [valoresUniformes, setValoresUniformes] = useState({ A: 0, B: 0 });
  const [distribucion, setDistribucion] = useState();
  const [frecuencias, setFrecuencias] = useState();

  const generarDistribucion = () => {
    if (
      muestra <= 1000000 &&
      muestra > 0 &&
      valoresUniformes.A < valoresUniformes.B
    ) {
      setDistribucion(
        generarDistribucionUniforme(
          muestra,
          valoresUniformes.A,
          valoresUniformes.B
        )
      );
    }
  };

  return (
    <>
      <Row gutter={15} justify={"center"} style={{ marginTop: "15pt" }}>
        <DistribucionForm title="Uniforme">
          <Form.Item label="Tamaño Muestra" name="Tamaño Muestra">
            <Input
              value={muestra}
              onChange={(e) => setMuestra(Number(e.target.value))}
            />
          </Form.Item>
          <Form.Item label="Valor A" name="a">
            <Input
              value={valoresUniformes.A}
              onChange={(e) =>
                setValoresUniformes({
                  A: Number(e.target.value),
                  B: valoresUniformes.B,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Valor B" name="b">
            <Input
              value={valoresUniformes.B}
              onChange={(e) =>
                setValoresUniformes({
                  A: valoresUniformes.A,
                  B: Number(e.target.value),
                })
              }
            />
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
    </>
  );
};
