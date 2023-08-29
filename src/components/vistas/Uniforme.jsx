import React, { useEffect, useState } from 'react'
import { DistribucionForm } from '../DistribucionForm/DistribucionForm'

export const Uniforme = () => {
    const [muestra, setMuestra] = useState(0);

    useEffect(() => {
        
    }, [muestra])
  return (
    <div>
        <DistribucionForm setValue={setMuestra}/>
    </div>
  )
}
