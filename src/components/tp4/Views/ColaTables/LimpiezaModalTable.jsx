import { Button, Table } from "antd";
import Modal from "antd/es/modal/Modal";
import React from "react";

const columns = [
  {
    title: "Fila",
    dataIndex: "contador",
    key: "contador",
  },
  {
    title: "Tiempo (min)",
    dataIndex: "tiempoLimpieza",
    key: "tiempoLimpieza",
  },
  {
    title: "Valor",
    dataIndex: "valor",
    key: "valor",
    render: (_,record) => {
        return <b>{record.valor}</b>
    }
  },
  {
    title: "Derivada",
    dataIndex: "derivada",
    key: "derivada",
  },
  {
    title: "Valor Proximo",
    dataIndex: "nuevoValor",
    key: "nuevoValor",
  },
];

export const LimpiezaModalTable = ({ show, tableToShow, setShow }) => {
  return (
    <Modal
      open={show}
      title="Tabla Euler Limpieza"
      width={1000}
      footer={[
        <Button
          type="primary"
          onClick={() => {
            setShow(false);
          }}
        >
          Volver
        </Button>,
      ]}
    >
      <Table
        style={{ width: "200%", borderCollapse: "collapse", margin: "10pt" }}
        columns={columns}
        bordered
        dataSource={tableToShow}
        size="small"
      />
    </Modal>
  );
};
