import logo from "./logo.svg";
import "./App.css";
import { Histograma } from "./components/Histograma/Histograma";
import { MenuBar } from "./components/MenuBar/MenuBar";
import { Uniforme } from "./components/vistas/Uniforme";
import { Normal } from "./components/vistas/Normal";
import { Exponencial } from "./components/vistas/Exponencial";
import { useEffect, useState } from "react";
import { RouterProvider, redirect } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { Inicio } from "./routes/Inicio";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Inicio />,
  },
  {
    path: "/tp-1/exponencial",
    element: <Exponencial />,
  },
  {
    path: "/tp-1/normal",
    element: <Normal />,
  },
  {
    path: "/tp-1/uniforme",
    element: <Uniforme />,
  },
]);

const URI_SELECTOR = {
  0: "/tp-1/uniforme",
  1: "/tp-1/normal",
  2: "/tp-1/exponencial",
};

function App() {
  const [dist, setDist] = useState(null);

  useEffect(() => {
    if (!dist) {
      return;
    }
    console.log(URI_SELECTOR[dist]);
    return redirect(URI_SELECTOR[dist]);
  }, [dist]);

  return (
    <>
      <MenuBar dist={dist} setDist={setDist} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
