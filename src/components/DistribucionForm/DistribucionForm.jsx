import { Button, Form, Input } from "antd";
import React, { useState } from "react";

export const DistribucionForm = ({ value, setValue }) => {
    const [muestra, setMuestra] = useState(0);

    const generarDistribucion = () => {
        console.log(muestra);
        if(muestra <= 1000000) {
            setValue(muestra)
        }
    }
  return (
    <div style={{margin: '5% 38% 0 38%', padding: '40pt',paddingBottom: '10pt', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px'}}>
      <Form.Item label="Tamaño Muestra" name="Tamaño Muestra">
        <Input value={muestra} onChange={(e) => setMuestra(e.target.value)} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" onClick={generarDistribucion}>
        Generar Distribucion
      </Button>
    </Form.Item>
    </div>
  );
};
