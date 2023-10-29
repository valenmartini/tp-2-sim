import { Table } from 'antd'
import React from 'react'

const columns = [
    {
        title: "Disciplina",dataIndex: "type", key: "type"
    },
    {
        title: "RND Llegada",dataIndex: "rndLlegada", key: "rndLlegada"
    },
    {
        title: "Tiempo entre Llegada",dataIndex: "tiempoALlegada", key: "tiempoALlegada"
    },
    {
        title: "Tiempo de Llegada",dataIndex: "tiempoLlegada", key: "tiempoLlegada"
    },
    {
        title: "RND Ocupacion",dataIndex: "rndOcupacion", key: "rndOcupacion"
    },
    {
        title: "Tiempo en Ocupacion",dataIndex: "tiempoOcupacion", key: "tiempoOcupacion"
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
