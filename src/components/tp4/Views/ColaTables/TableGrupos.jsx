import { Table } from 'antd'
import React from 'react'

const columns = [
    {
        title: "Disciplina",dataIndex: "type", key: "type"
    },
    {
        title: "Tiempo de Llegada",dataIndex: "tiempoLlegada", key: "tiempoLlegada"
    },
    {
        title: "Tiempo de Espera",dataIndex: "tiempoEnEspera", key: "tiempoEnEspera"
    },
    {
        title: "Tiempo Inicio Ocupacion",dataIndex: "tiempoInicioOcupacion", key: "tiempoInicioOcupacion"
    },
    {
        title: "Tiempo Fin Ocupacion",dataIndex: "tiempoFinOcupacion", key: "tiempoFinOcupacion"
    },
]

export const TableGrupos = ({grupos}) => {
    
  return (
    <Table 
    style={{width: '200%', borderCollapse: 'collapse',margin: '10pt'}}
        columns={columns}
        dataSource={grupos}
        size='small'
    />
  )
}
