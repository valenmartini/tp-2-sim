import React, { useState } from "react";
import { ColasContainer } from "./ColasContainer";
import { Button, Steps } from "antd";
import { StepInicial } from "./Steps/StepInicial";
import { StepDatos } from "./Steps/StepDatos";
import { generarSimulacion } from "../Procesos/generacionSimulacion";
import { SimulacionTable } from "./ColaTables/SimulacionTable";
import { TableGrupos } from "./ColaTables/TableGrupos";
import Title from "antd/es/typography/Title";

const initialValues = {
  datosGenerales: {
    valorLimpiezaFutbol: 100,
    valorLimpiezaHandBall: 200,
    valorLimpiezaBasketBall: 300,
    unidadIntegracion: 1,
    triggerAbandono: 5,
    filas: 100,
    todasFilas: true,
    visualizarDesde: 0,
    visualizarHasta: 100,
    tiempo: 100,
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
  const [simulacion, setSimulacion] = useState();

  const handleGenerarSimulacion = () => {
    setSimulacion(generarSimulacion(valores));
  };

  return (
    <>
      <div style={{ display: simulacion ? "none" : "" }}>
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
      </div>
      {simulacion && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Button
              type="primary"
              onClick={() => {
                setSimulacion();
              }}
            >
              Volver a generar una simulacion
            </Button>
          </div>
          <Title
            level={3}
            style={{ display: "flex", justifyContent: "center" }}
          >
            Tabla de Simulaciones
          </Title>
          <div
            style={{ width: "100%", overflowX: "auto", whiteSpace: "nowrap" }}
          >
            <SimulacionTable
              desde={valores.datosGenerales.visualizarDesde}
              hasta={valores.datosGenerales.visualizarHasta}
              todas={valores.datosGenerales.todasFilas}
              simulacion={simulacion.simulaciones}
            />
          </div>
          <Title
            level={3}
            style={{ display: "flex", justifyContent: "center" }}
          >
            Tabla de Grupos
          </Title>
          <div>
            <TableGrupos
              grupos={simulacion?.listaGrupos.cola.map((val) => {
                const valRounded = {};
                Object.keys(val).forEach((key) => {
                  valRounded[key] =
                    typeof val[key] === "number"
                      ? parseFloat(val[key].toFixed(5))
                      : val[key];
                });
                return valRounded;
              })}
            />
          </div>
        </div>
      )}
    </>
  );
};
