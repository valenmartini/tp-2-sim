import React, { useState } from "react";
import { ColasContainer } from "./ColasContainer";
import { Steps } from "antd";
import { StepInicial } from "./Steps/StepInicial";
import { StepDatos } from "./Steps/StepDatos";
import { generarSimulacion } from "../Procesos/generacionSimulacion";

const initialValues = {
  datosGenerales: {
    tiempoLimpieza: 10,
    triggerAbandono: 5,
    filas: 100,
    todasFilas: true,
    visualizarDesde: 0,
    visualizarHasta: 100,
    tiempo: 100
  },
  datosTiempo: {
    llegadas: {
      futbol: 10,
      handBall: {
        inferior: 10,
        superior: 14,
      },
      basketBall: {
        inferior: 6,
        superior: 10,
      },
    },
    ocupacion: {
      futbol: {
        inferior: 80,
        superior: 100,
      },
      handBall: {
        inferior: 60,
        superior: 100,
      },
      basketBall: {
        inferior: 70,
        superior: 130,
      },
    },
  },
};

export const ColasForm = () => {
  const [step, setStep] = useState(0);
  const [valores, setValores] = useState(initialValues);
  const [simulacion, setSimulacion] = useState([]);

  const handleGenerarSimulacion = () => {
    console.log(valores);
    generarSimulacion(valores)
  };

  return (
    <ColasContainer>
      <div style={{ margin: "0 30pt 20pt 30pt" }}>
        <Steps
          type="navigation"
          size="small"
          current={step}
          onChange={(value) => setStep(value)}
          items={[
            {
              title: "General",
              status: step === 0 ? "process" : "finish",
            },
            {
              title: "Datos de tiempo",
              status: step < 1 ? "wait" : step === 1 ? "process" : "finish",
            },
          ]}
        />
      </div>
      {step === 0 && (
        <StepInicial
          setStep={setStep}
          valores={valores}
          setValores={setValores}
        />
      )}

      {step === 1 && (
        <StepDatos
          setStep={setStep}
          valores={valores}
          setValores={setValores}
          generarSimulacion={handleGenerarSimulacion}
        />
      )}
    </ColasContainer>
  );
};
