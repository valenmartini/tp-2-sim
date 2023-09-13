import React, { useState } from "react";
import { MontecarloContainer } from "./MontecarloContainer";
import { Steps } from "antd";
import { StepGeneral } from "./Steps/StepGeneral";
import { StepPrimerBola } from "./Steps/StepPrimerBola";
import { StepSegundaBola } from "./Steps/StepSegundaBola";

export const MontecarloForm = () => {
  const [step, setStep] = useState(0);

  return (
    <div>
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
            <StepGeneral />
          ) : step === 1 ? (
            <StepPrimerBola />
          ) : (
            <StepSegundaBola />
          )}
      </MontecarloContainer>
    </div>
  );
};
