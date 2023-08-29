import { Menu } from 'antd'
import React from 'react'

const items = [
    {
      label: 'Uniforme',
      key: 0
    },
    {
      label: 'Normal',
      key: 1
    },
    {
        label: 'Exponencial',
        key: 2
      },
  ];

export const Inicio = (props) => {
  return (
    <Menu onClick={(e)=> props.setDist(e.key)} selectedKeys={props.dist} mode="horizontal" items={items} />
  )
}
