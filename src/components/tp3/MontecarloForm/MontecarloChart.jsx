import React from "react";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

export const MontecarloChart = (props) => {

  return (
    <LineChart
      width={830}
      height={250}
      data={props.data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="Muestra" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="Promedio Acumulado" stroke="#8884d8" />
    </LineChart>
  );
};
