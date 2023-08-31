import React, { useEffect, useState } from "react";
import { DistribucionForm } from "../DistribucionForm/DistribucionForm";
import { Button, Form, Input } from "antd";
import { generarDistribucionNormal } from "../Procesos/calculoNormal";
import { Histograma } from "../Histograma/Histograma";
import { TablaResultados } from "../TablaResultados/TablaResultados";

export const Normal = () => {
  const [muestra, setMuestra] = useState(0);
  const [media, setMedia] = useState();
  const [valores, setValores] = useState({ desviacion: 0, varianza: 0 });
  const [distribucion, setDistribucion] = useState();

  const generarDistribucion = () => {
    if (
      muestra <= 1000000 &&
      muestra > 0 &&
      media > 0 &&
      valores.desviacion > 0
    ) {
      setDistribucion(generarDistribucionNormal(muestra, media, valores.desviacion));
    }
  };
console.log(distribucion);
  const handleChangeDesviacion = (e) => {
    const { value } = e.target;
    const varianz = Number(Math.pow(Number(value), 2));
    const parsedValue = parseFloat(varianz);
    const hasDecimals = parsedValue % 1 !== 0;
    const varianzaPaseada = hasDecimals
      ? Number(parsedValue.toFixed(4))
      : Number(parsedValue);
    setValores({
      varianza: varianzaPaseada,
      desviacion: Number(value),
    });
  };

  const handleChangeVarianza = (e) => {
    const { value } = e.target;
    const desv = Number(Math.sqrt(Number(value)));
    const parsedValue = parseFloat(desv);
    const hasDecimals = parsedValue % 1 !== 0;
    const desviacionParseada = hasDecimals
      ? Number(parsedValue.toFixed(4))
      : Number(parsedValue);
    setValores({
      varianza: Number(value),
      desviacion: desviacionParseada,
    });
  };

  console.log(valores);

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
    </div>
  );
};
