import React, { useEffect, useState } from "react";
import { DistribucionForm } from "../DistribucionForm/DistribucionForm";
import { generarDistribucionUniforme } from "../Procesos/calculoUniforme";
import { Button, Form, Input } from "antd";
import { Histograma } from "../Histograma/Histograma";
import { TablaResultados } from "../TablaResultados/TablaResultados";

export const Uniforme = () => {
  const [muestra, setMuestra] = useState(0);
  const [valoresUniformes, setValoresUniformes] = useState({ A: 0, B: 0 });
  const [distribucion, setDistribucion] = useState();

  const generarDistribucion = () => {
    console.log(muestra);
    if (muestra <= 1000000 && valoresUniformes.A < valoresUniformes.B) {
      setDistribucion(
        generarDistribucionUniforme(
          muestra,
          valoresUniformes.A,
          valoresUniformes.B
        )
      );
    }
  };

  console.log(distribucion);
  return (
    <>
      <DistribucionForm>
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
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" onClick={generarDistribucion}>
            Generar Distribucion
          </Button>
        </Form.Item>
      </DistribucionForm>
      {distribucion && (
        <div>
            <Histograma distribucion={distribucion} />
            <TablaResultados data={distribucion} />
        </div>
      )}
    </>
  );
};
