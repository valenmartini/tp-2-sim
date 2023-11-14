import React from 'react'
import { Col, Collapse } from 'antd';
import { TablaResultados } from '../TablasDatos/TablaResultados/TablaResultados';
import { TablaFrecuencias } from '../TablasDatos/TablaFrecuencias/TablaFrecuencias';

export const AccordionTables = (props) => {
    
const items = [
    {
      key: '1',
      label: 'Tabla de Resultados',
      children: <TablaResultados data={props.distribucion} />,
    },
    {
      key: '2',
      label: 'Tabla de Frecuencias',
      children: <TablaFrecuencias frecuencias={props.frecuencias}/>,
    }
  ];
  return (
    <Col span={12} style={{ marginTop: "30pt" }}>
    <Collapse accordion items={items} />
    </Col>
  )
}
