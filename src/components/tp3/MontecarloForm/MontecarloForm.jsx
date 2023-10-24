import React, { useState } from "react";
import { MontecarloContainer } from "./MontecarloContainer";
import { Button, Steps } from "antd";
import { StepGeneral } from "./Steps/StepGeneral";
import { StepPrimerBola } from "./Steps/StepPrimerBola";
import { StepSegundaBola } from "./Steps/StepSegundaBola";
import { generarProcesoSimuacion } from "../Procesos/procesoSimulacion";
import { MontecarloTable } from "./MontecarloTable";
import { MontecarloChart } from "./MontecarloChart";

const initialValues = {
  rondas: 10,
  filas: 100,
  puntosPrimerTiro: 20,
  puntosSegundoTiro: 15,
  tirosAcumular: 10,
  puntajeSuperar: 120,
  todasFilas: true,
  visualizarDesde: 1,
  visualizarHasta: 100,
  probabilidadesPrimerBola: {
    probSeis: 17,
    probSiete: 10,
    probOcho: 15,
    probNueve: 18,
    probDiez: 40,
  },
  probabilidadesSegundaBola: {
    seisPrimerTiro: {
      probCero: 10,
      probUno: 20,
      probDos: 30,
      probTres: 30,
      probCuatro: 10,
    },
    sietePrimerTiro: {
      probCero: 2,
      probUno: 10,
      probDos: 45,
      probTres: 43,
    },
    ochoPrimerTiro: {
      probCero: 4,
      probUno: 20,
      probDos: 76,
    },
    nuevePrimerTiro: {
      probCero: 6,
      probUno: 94,
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

  const generarDatosGrafico = () => {
    const datosPromedio = [];
    simulacion.forEach((sim) => {
      if(sim.numeroFila === 1 || sim.numeroFila % valores.tirosAcumular === 0) {
        datosPromedio.push(sim)
      }
    })
    let datos = datosPromedio.map((sim) => {
      return {
        ['Muestra']: sim.numeroFila,
        ["Promedio Acumulado"]: Number(sim.promedioAcumulado).toFixed(4),
      };
    });

    if (datos.length >= 2000) {
      const dataCortada = [];
      datos.forEach((sim, index) => {
        if(datos.length >= 20000) {
          if (index % 100 === 0) {
            dataCortada.push(sim);
          }
        } else {
        if (index % 10 === 0) {
          dataCortada.push(sim);
        }}
      });
      return dataCortada;
    }
    return datos;

    //return simulacion.length > 5000 ? [...datos.slice(0, 1000),...datos.slice(datos.length - 1001, datos.length - 1)] : datos
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
              justifyContent: "center"
            }}
          >
            <span style={{fontWeight:'bold', paddingTop: '3pt', marginRight: '5pt'}}>La probabilidad es de {(simulacion[simulacion.length -1].promedioAcumulado *100).toFixed(4)}%</span>
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
            <div style={{ display: "flex", justifyContent: "center", marginBottom: '10pt' }}>
              <MontecarloChart data={generarDatosGrafico()} />
            </div>
            <MontecarloTable desde={valores.visualizarDesde} hasta={valores.visualizarHasta} todas={valores.todasFilas} data={simulacion} />
          </div>
        </>
      )}
    </>
  );
};
