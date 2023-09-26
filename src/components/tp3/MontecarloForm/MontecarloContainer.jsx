import Title from 'antd/es/typography/Title'
import React from 'react'

export const MontecarloContainer = (props) => {
  return (
    <div
    style={{
      margin: '20pt',
      marginTop: '30pt',
      padding: "40pt",
      paddingTop: '5pt',
      paddingBottom: "10pt",
      boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
    }}
  >
    <Title level={3} style={{display: 'flex', justifyContent: 'center'}}>Simulación de Montecarlo</Title><br/>
    {props.children}
  </div>
  )
}
