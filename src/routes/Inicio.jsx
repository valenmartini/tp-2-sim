import React from "react";
import Logo from "../img/utnLogo.png";

export const Inicio = () => {
  return (
    <div style={{ justifyContent: "center", display: "flex", marginTop: "5%" }}>
      <div className="jumbotron">
        <div style={{ position: "relative" }}>
          <h1>UNIVERSIDAD TECNOLOGICA NACIONAL</h1>
          <h2>FACULTAD REGIONAL CORDOBA</h2>
          <b>Simulación 4k4 - Grupo 5</b>
          <ul>
            <li>81950 Fada Santiago</li>
            <li>94089 Maier Sananez Deborah</li>
            <li>88153 Ferraro Francisco</li>
            <li>89284 Oxley Analía</li>
            <li>93090 Quinteros Fabricio</li>
            <li>83012 Martini Valentin</li>
            <li>82624 Martin Backhaus</li>
          </ul>
          <img
            src={Logo}
            alt="logo utn"
            width={100}
            height={120}
            style={{ position: "absolute", right: "-25%", bottom: "0" }}
          />
        </div>
      </div>
    </div>
  );
};
