import React, { useState } from 'react'
import LayoutParaPantallaPrincipalDelClima from '@/src/componentes/contenedor/LayoutParaPantallaPrincipalDelClima'
import PantallaPrincipal from '../src/componentes/contenedor/PantallaPrincipal'
import BotonesDeNavegacionPorDias from '../src/componentes/contenido/NavegacionPorDias'
import { useFechas } from '../src/hooks'

const App = () => {
  const {fecha} = useFechas()

  return (
    <LayoutParaPantallaPrincipalDelClima>

      <BotonesDeNavegacionPorDias 
        {...fecha()}
      />
      <PantallaPrincipal>
      </PantallaPrincipal>


    </LayoutParaPantallaPrincipalDelClima>
  )
}

export default App