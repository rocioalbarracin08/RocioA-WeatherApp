import React from 'react'
import LayoutParaPantallaPrincipalDelClima from '@/src/componentes/contenedor/LayoutParaPantallaPrincipalDelClima'
import BotonesDeNavegacionPorDias from '../src/componentes/contenido/NavegacionPorDias'
import { useFechas } from '../src/hooks/dias'
import ProveedorDeDatosClimatico from '@/src/componentes/contenedor/ProveedorDeClima'
import TarjetaParaDatosClimaticos from '@/src/componentes/contenido/TarjetaParaDatosClimaticos'
import useLocalizacion from '@/src/hooks/localizacion'
import EncabezadoDeCiudad from '@/src/componentes/contenido/EncabezadoDeCiudad'
import usePronosticoClimatico from '../src/hooks/clima'

const App = () => {
  const {fecha} = useFechas()
  const { coordenadas, coordenadasDisponibles } = useLocalizacion();
  const clima = usePronosticoClimatico({
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