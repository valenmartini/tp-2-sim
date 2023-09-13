import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router";

const items = [
  {
    label: "Inicio",
    key: "inicio",
  },
  {
    label: "Trabajo Practico 2",
    key: "tp2",
    children: [
      {
        label: "Uniforme",
        key: "tp2-uniforme",
      },
      {
        label: "Normal",
        key: "tp2-normal",
      },
      {
        label: "Exponencial",
        key: "tp2-exponencial",
      },
    ],
  },
  {
    label: 'Trabajo Practico 3',
    key: 'tp3'
  }
];

const URI_SELECTOR = {
  ["inicio"]: "/",
  ["tp2-uniforme"]: "/tp-2/uniforme",
  ["tp2-normal"]: "/tp-2/normal",
  ["tp2-exponencial"]: "/tp-2/exponencial",
  ["tp3"]: "/tp-3/montecarlo"
};

export const MenuBar = () => {
  const navigate = useNavigate();
  const [dist, setDist] = useState(null);

  return (
    <Menu
      onClick={(e) => {
        setDist(e.key);
        navigate(URI_SELECTOR[e.key]);
      }}
      selectedKeys={dist}
      mode="horizontal"
      items={items}
    />
  );
};
