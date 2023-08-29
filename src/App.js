import logo from "./logo.svg";
import "./App.css";
import { Histograma } from "./components/Histograma/Histograma";
import { Inicio } from "./components/vistas/Inicio";
import { Uniforme } from "./components/vistas/Uniforme";
import { Normal } from "./components/vistas/Normal";
import { Exponencial } from "./components/vistas/Exponencial";
import { useState } from "react";

function App() {
  const [dist, setDist] = useState(null);
  return (
    <>
      <Inicio dist={dist} setDist={setDist} />
      {dist && (
        <>
          {dist == 0 && (
            <>
              <Uniforme />
            </>
          )}
          {dist == 1 && (
            <>
              <Normal />
            </>
          )}
          {dist == 2 && (
            <>
              <Exponencial />
            </>
          )}
        </>
      )}
    </>
  );
}

export default App;
