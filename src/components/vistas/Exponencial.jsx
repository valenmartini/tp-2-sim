import React, { useEffect, useState } from "react";
import { DistribucionForm } from "../DistribucionForm/DistribucionForm";
import { Button, Form, Input } from "antd";
import { generarDistribucionExponencial } from "../Procesos/calculoExponencial";
import { Histograma } from "../Histograma/Histograma";
import { TablaResultados } from "../TablaResultados/TablaResultados";
import { exportToCsv } from "../ExportadorCVS/ExportadorCVS";

export const Exponencial = () => {
  const [muestra, setMuestra] = useState(0);
  const [media, setMedia] = useState();
  const [distribucion, setDistribucion] = useState();

  const generarDistribucion = () => {
    if (muestra <= 1000000 && muestra > 0 && media > 0) {
      setDistribucion(generarDistribucionExponencial(muestra, media));
    }
  };

  return (
    <div>
      <DistribucionForm>
        <Form.Item label="Tamaño Muestra" name="Tamaño Muestra">
          <Input
            value={muestra}
            onChange={(e) => setMuestra(Number(e.target.value))}
          />
        </Form.Item>
        <Form.Item label="Media" name="media">
          <Input value={media} onChange={(e) => setMedia(e.target.value)} />
        </Form.Item>
        <div style={{position: 'relative', height: '40px'}}>
        <Form.Item style={{ position: 'absolute', right: '0' }}>
          {distribucion && (
            <Button type="link" onClick={()=>{exportToCsv(distribucion)}}>
              Exportar CVS
            </Button>
          )}
          <Button type="primary" onClick={generarDistribucion}>
            Generar Distribucion
          </Button>
        </Form.Item>
        </div>
      </DistribucionForm>
      {distribucion && (
        <div>
          <Histograma distribucion={distribucion} />
          <TablaResultados data={distribucion} />
        </div>
      )}
    </div>
  );
};
