import React, { useState } from 'react'
import LayoutParaPantallaPrincipalDelClima from '@/src/componentes/contenedor/LayoutParaPantallaPrincipalDelClima'
import BotonesDeNavegacionPorDias from '../src/componentes/contenido/NavegacionPorDias'
import { useFechas } from '../src/hooks/dias'
import ProveedorDeDatosClimatico from '@/src/componentes/contenedor/ProveedorDeClima'
import TarjetaParaDatosClimaticos from '@/src/componentes/contenido/TarjetaParaDatosClimaticos'
import useLocalizacion from '@/src/hooks/localizacion'
import EncabezadoDeCiudad from '../src/componentes/contenido/EncabezadoDeCiudad'
import usePronosticoClimatico from '../src/hooks/clima'
import IconoClima from '../src/componentes/contenido/IconoClima'

const App = () => {
  
  const [diaIndex, setDiaIndex] = useState(0);
  const {fecha} = useFechas()

  const { coordenadas, coordenadasDisponibles } = useLocalizacion();

  if (!coordenadasDisponibles()) return null; // primero verificamos ubicación

  //ARMO UN OBJETO CON FUNCIONES DENTRO
  const climaHook = usePronosticoClimatico({
    fecha: fecha().hoy,
    latitud: coordenadas().latitud,
    longitud: coordenadas().longitud,
    clave_de_api: process.env.EXPO_PUBLIC_API_KEY as string,
    diaIndex
  });
  const datosClima = climaHook.clima();

  if (climaHook.estaPendiente()) return null; // luego verificamos datos
  
  return (
    <ProveedorDeDatosClimatico >
      
      <LayoutParaPantallaPrincipalDelClima>

        <BotonesDeNavegacionPorDias
          {...fecha()}
          diaIndex={diaIndex}
          setDiaIndex={setDiaIndex}
        />

        <EncabezadoDeCiudad ciudad={datosClima?.ciudad ?? ""} />
        <IconoClima codigo={datosClima?.codigoCondicion ?? 1000} />

        <TarjetaParaDatosClimaticos clima={datosClima} />

      </LayoutParaPantallaPrincipalDelClima>

    </ProveedorDeDatosClimatico>
  )
}

export default App