import { Table } from "antd";
import React, { useState } from "react";
import { ExportOutlined } from "@ant-design/icons";
import { LimpiezaModalTable } from "./LimpiezaModalTable";

export const SimulacionTable = ({ simulacion, todas, desde, hasta }) => {
  const [show, setShow] = useState(false);
  const [tableToShow, setTableToShow] = useState([]);

  const columns = [
    {
      title: "Fila",
      dataIndex: "fila",
      key: "fila",
    },
    {
      title: "Evento",
      dataIndex: "eventType",
      key: "eventType",
    },
    {
      title: "Disciplina",
      dataIndex: "disciplina",
      key: "disciplina",
    },
    {
      title: "Reloj",
      dataIndex: "reloj",
      key: "reloj",
    },
    {
      title: "Cola",
      dataIndex: "cola",
      key: "cola",
    },
    {
      title: "Llegadas",
      children: [
        {
          title: "RND Llegada Futbol",
          dataIndex: "rndLlegadaFutbol",
          key: "rndLlegadaFutbol",
        },
        {
          title: "Tiempo entre Llegada Futbol",
          dataIndex: "tiempoALlegarFutbol",
          key: "tiempoALlegarFutbol",
        },
        {
          title: "Tiempo Llegada Futbol",
          dataIndex: "tiempoLlegadaFutbol",
          key: "tiempoLlegadaFutbol",
        },
        {
          title: "RND Llegada HandBall",
          dataIndex: "rndLlegadaHandBall",
          key: "rndLlegadaHandBall",
        },
        {
          title: "Tiempo entre Llegada HandBall",
          dataIndex: "tiempoALlegarHandBall",
          key: "tiempoALlegarHandBall",
        },
        {
          title: "Tiempo Llegada HandBall",
          dataIndex: "tiempoLlegadaHandBall",
          key: "tiempoLlegadaHandBall",
        },
        {
          title: "RND Llegada BasketBall",
          dataIndex: "rndLlegadaBasketBall",
          key: "rndLlegadaBasketBall",
        },
        {
          title: "Tiempo entre Llegada BasketBall",
          dataIndex: "tiempoALlegarBasketBall",
          key: "tiempoALlegarBasketBall",
        },
        {
          title: "Tiempo Llegada BasketBall",
          dataIndex: "tiempoLlegadaBasketBall",
          key: "tiempoLlegadaBasketBall",
        },
      ],
    },
    {
      title: "Ocupacion",
      children: [
        {
          title: "RND Ocupacion Futbol",
          dataIndex: "rndOcupacionFutbol",
          key: "rndOcupacionFutbol",
        },
        {
          title: "Tiempo de Ocupacion Futbol",
          dataIndex: "tiempoOcupacionFutbol",
          key: "tiempoOcupacionFutbol",
        },
        {
          title: "Tiempo Fin Ocupacion Futbol",
          dataIndex: "tiempoFinOcupacionFutbol",
          key: "tiempoFinOcupacionFutbol",
        },
        {
          title: "RND Ocupacion HandBall",
          dataIndex: "rndOcupacionHandBall",
          key: "rndOcupacionHandBall",
        },
        {
          title: "Tiempo de Ocupacion HandBall",
          dataIndex: "tiempoOcupacionHandBall",
          key: "tiempoOcupacionHandBall",
        },
        {
          title: "Tiempo Fin Ocupacion HandBall",
          dataIndex: "tiempoFinOcupacionHandBall",
          key: "tiempoFinOcupacionHandBall",
        },
        {
          title: "RND Ocupacion BasketBall",
          dataIndex: "rndOcupacionBasketBall",
          key: "rndOcupacionBasketBall",
        },
        {
          title: "Tiempo de Ocupacion BasketBall",
          dataIndex: "tiempoOcupacionBasketBall",
          key: "tiempoOcupacionBasketBall",
        },
        {
          title: "Tiempo Fin Ocupacion BasketBall",
          dataIndex: "tiempoFinOcupacionBasketBall",
          key: "tiempoFinOcupacionBasketBall",
        },
        {
          title: "Tiempo Fin Ocupacion",
          dataIndex: "tiempoOcupacion",
          key: "tiempoOcupacion",
        },
        {
          title: "Tiempo de Limpieza",
          dataIndex: "tiempoLimpieza",
          key: "tiempoLimpieza",
          render: (_, record) => (
            <div
              style={{ color: "#1677FF", cursor: "pointer" }}
              onClick={() => {
                setShow(true);
                setTableToShow(record.valoresLimpiezaTiempo);
              }}
            >
              {record.tiempoLimpieza && (
                <div>
                  {record.tiempoLimpieza}
                  <ExportOutlined style={{ marginLeft: "5pt" }} />
                </div>
              )}
            </div>
          ),
        },
        {
          title: "Tiempo Fin Limpieza",
          dataIndex: "tiempoFinLimpieza",
          key: "tiempoFinLimpieza",
        },
      ],
    },
    {
      title: "Metricas",
      children: [
        {
          title: "Acumulado de tiempo Libre de Cancha",
          dataIndex: "tiempoLibreCancha",
          key: "tiempoLibreCancha",
        },
        {
          title: "Tiempo Libre de Cancha Diario",
          dataIndex: "tiempoLibreCanchaDiario",
          key: "tiempoLibreCanchaDiario",
        },
        {
          title: "Promedio Espera Futbol",
          dataIndex: "promedioEsperaFutbol",
          key: "promedioEsperaFutbol",
        },
        {
          title: "Promedio Espera BasketBall",
          dataIndex: "promedioEsperaBasketBall",
          key: "promedioEsperaBasketBall",
        },
        {
          title: "Promedio Espera HandBall",
          dataIndex: "promedioEsperaHandBall",
          key: "promedioEsperaHandBall",
        },
        {
          title: "Cantidad de grupos Abandono",
          dataIndex: "contadorAbandono",
          key: "contadorAbandono",
        },
      ],
    },
  ];
  const generarTabla = () => {
    if (!todas) {
      return [...simulacion.filter((sim) => sim.reloj >= desde)].slice(
        0,
        hasta
      );
    } else {
      return simulacion;
    }
  };

  return (
    <div style={{ width: "maxContent" }}>
      <LimpiezaModalTable show={show} tableToShow={tableToShow} setShow={setShow} />
      <Table
        style={{ width: "200%", borderCollapse: "collapse", margin: "10pt" }}
        columns={columns}
        bordered
        dataSource={generarTabla()}
        size="small"
      />
    </div>
  );
};
