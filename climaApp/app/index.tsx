import React from 'react'
import LayoutParaPantallaPrincipalDelClima from '@/src/componentes/contenedor/LayoutParaPantallaPrincipalDelClima'
import BotonesDeNavegacionPorDias from '../src/componentes/contenido/NavegacionPorDias'
import { useFechas } from '../src/hooks/dias'
import ProveedorDeDatosClimatico from '@/src/componentes/contenedor/ProveedorDeClima'
import { View } from 'react-native'
import TarjetaParaDatosClimaticos from '@/src/componentes/contenido/TarjetaParaDatosClimaticos'
import usarLocalizacion from '@/src/hooks/localizacion'
import EncabezadoDeCiudad from '@/src/componentes/contenido/EncabezadoDeCiudad'
import usarPronosticoClimatico from '../src/hooks/clima'

const App = () => {
  const {fecha} = useFechas()
  const { coordenadas, coordenadasDisponibles } = usarLocalizacion();
  const clima = usarPronosticoClimatico({
    fecha: fecha().hoy,
    latitud: coordenadas().latitud,
    longitud: coordenadas().longitud,
    clave_de_api: process.env.EXPO_PUBLIC_API_KEY as string,
  });


  return (
    <ProveedorDeDatosClimatico >
      
      <LayoutParaPantallaPrincipalDelClima>

        <BotonesDeNavegacionPorDias 
          {...fecha()}
        />
        <EncabezadoDeCiudad ciudad={clima.ciudad()} />

        <TarjetaParaDatosClimaticos clima={clima} />

      </LayoutParaPantallaPrincipalDelClima>

    </ProveedorDeDatosClimatico>
  )
}

export default App