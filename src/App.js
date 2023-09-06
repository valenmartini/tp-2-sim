import logo from "./logo.svg";
import "./App.css";
import { Histograma } from "./components/Histograma/Histograma";
import { MenuBar } from "./components/MenuBar/MenuBar";
import { useEffect, useState } from "react";
import { BrowserRouter, redirect, Routes, Route } from "react-router-dom";
import { Inicio } from "./routes/Inicio";
import { Exponencial } from "./routes/Exponencial";
import { Normal } from "./routes/Normal";
import { Uniforme } from "./routes/Uniforme";


function App() {


  return (
    <>
      <BrowserRouter>
        <MenuBar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/tp-2/exponencial" element={<Exponencial/>} />
          <Route path="/tp-2/normal" element={<Normal />} />
          <Route path="/tp-2/uniforme" element={<Uniforme />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
