import React, { useState } from 'react'
import Histogram from "react-chart-histogram";



export const Histograma = (props) => {
    const [data, setData] = useState(props.data);
/*     const options = {
        xLabel: "az",
        fillColor: "#00B3C9",
        strokeColor: "#00B3C9"
      }; */
  return (
    <div>
{/*         <Histogram
                xLabels={labels}
                yValues={data}
                width="600"
                height="400"
                options={options}
        /> */}
    </div>
  )
}
