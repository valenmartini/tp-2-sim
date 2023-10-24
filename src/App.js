import "./App.css";
import { MenuBar } from "./components/MenuBar/MenuBar";
import { useEffect, useState } from "react";
import { BrowserRouter, redirect, Routes, Route } from "react-router-dom";
import { Inicio } from "./routes/Inicio";
import { Exponencial } from "./routes/Exponencial";
import { Normal } from "./routes/Normal";
import { Uniforme } from "./routes/Uniforme";
import { Montecarlo } from "./routes/Montecarlo";
import { Colas } from "./routes/Colas";

function App() {
  return (
    <>
      <BrowserRouter>
        <MenuBar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/tp-2/exponencial" element={<Exponencial />} />
          <Route path="/tp-2/normal" element={<Normal />} />
          <Route path="/tp-2/uniforme" element={<Uniforme />} />
          <Route path="/tp-3/montecarlo" element={<Montecarlo />} />
          <Route path="/tp-4/colas" element={<Colas/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
