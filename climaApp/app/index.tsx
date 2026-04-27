import React from 'react'
import LayoutParaPantallaPrincipalDelClima from '@/src/componentes/contenedor/LayoutParaPantallaPrincipalDelClima'
import PantallaPrincipal from '../src/componentes/contenido/PantallaPrincipal'
import BotonesDeNavegacionPorDias from '../src/componentes/contenido/NavegacionPorDias'
import { useFechas } from '../src/hooks/dias'
import ProveedorDeDatosClimatico from '@/src/componentes/contenedor/ProveedorDeClima'

const App = () => {
  const {fecha} = useFechas()

  return (
    <ProveedorDeDatosClimatico >
      
      <LayoutParaPantallaPrincipalDelClima>

        <BotonesDeNavegacionPorDias 
          {...fecha()}
        />
        <PantallaPrincipal/>

      </LayoutParaPantallaPrincipalDelClima>

    </ProveedorDeDatosClimatico>
  )
}

export default App