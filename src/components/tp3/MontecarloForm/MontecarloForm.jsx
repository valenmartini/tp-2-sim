import React, { useState } from "react";
import { MontecarloContainer } from "./MontecarloContainer";
import { Button, Steps } from "antd";
import { StepGeneral } from "./Steps/StepGeneral";
import { StepPrimerBola } from "./Steps/StepPrimerBola";
import { StepSegundaBola } from "./Steps/StepSegundaBola";
import { generarProcesoSimuacion } from "../Procesos/procesoSimulacion";
import { MontecarloTable } from "./MontecarloTable";

const initialValues = {
  rondas: 10,
  filas: 100,
  puntosPrimerTiro: 20,
  puntosSegundoTiro: 15,
  tirosAcumular: 10,
  puntajeSuperar: 200,
  probabilidadesPrimerBola: {
    probSeis: 20,
    probSiete: 20,
    probOcho: 20,
    probNueve: 20,
    probDiez: 20,
  },
  probabilidadesSegundaBola: {
    seisPrimerTiro: {
      probCero: 20,
      probUno: 20,
      probDos: 20,
      probTres: 20,
      probCuatro: 20,
    },
    sietePrimerTiro: {
      probCero: 25,
      probUno: 25,
      probDos: 25,
      probTres: 25,
    },
    ochoPrimerTiro: {
      probCero: 30,
      probUno: 30,
      probDos: 40,
    },
    nuevePrimerTiro: {
      probCero: 50,
      probUno: 50,
    },
  },
};

export const MontecarloForm = () => {
  const [valores, setValores] = useState(initialValues);
  const [step, setStep] = useState(0);
  const [simulacionProcesada, setSimulacionProcesada] = useState(false);
  const [simulacion, setSimulacion] = useState([]);

  const generarSimulacion = () => {
    console.log(valores);
    setSimulacion(generarProcesoSimuacion(valores));

    setSimulacionProcesada(true);
  };

  return (
    <>
      <div className={simulacionProcesada ? "box fade" : "box"}>
        <MontecarloContainer>
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
                  title: "1ra Bola",
                  status: step < 1 ? "wait" : step === 1 ? "process" : "finish",
                },
                {
                  title: "2da Bola",
                  status: step < 2 ? "wait" : "process",
                },
              ]}
            />
          </div>
          {step === 0 ? (
            <StepGeneral
              setStep={setStep}
              valores={valores}
              setValores={setValores}
            />
          ) : step === 1 ? (
            <StepPrimerBola
              setStep={setStep}
              valores={valores}
              setValores={setValores}
            />
          ) : (
            <StepSegundaBola
              setStep={setStep}
              valores={valores}
              setValores={setValores}
              generarSimulacion={generarSimulacion}
            />
          )}
        </MontecarloContainer>
      </div>
      {simulacionProcesada && (
        <>
          <div
            style={{
              margin: "20pt",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              type="primary"
              onClick={() => {
                setStep(0);
                setSimulacionProcesada(false);
              }}
            >
              Generar nueva simulacion
            </Button>
          </div>
          <div
            style={{
              margin: "20pt",
            }}
          >
            <MontecarloTable data={simulacion} />
          </div>
        </>
      )}
    </>
  );
};
