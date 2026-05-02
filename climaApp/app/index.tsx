import React, { useState } from 'react'
import LayoutParaPantallaPrincipalDelClima from '@/src/componentes/contenedor/LayoutParaPantallaPrincipalDelClima'
import BotonesDeNavegacionPorDias from '../src/componentes/contenido/NavegacionPorDias'
import { useFechas } from '../src/hooks/dias'
import TarjetaParaDatosClimaticos from '@/src/componentes/contenido/TarjetaParaDatosClimaticos'
import useLocalizacion from '@/src/hooks/localizacion'
import EncabezadoDeCiudad from '../src/componentes/contenido/EncabezadoDeCiudad'
import usePronosticoClimatico from '../src/hooks/clima'
import IconoClima from '../src/componentes/contenido/IconoClima'

const App = () => {
  const [diaIndex, setDiaIndex] = useState(0);
  const { fecha } = useFechas();
  const { coordenadas, coordenadasDisponibles } = useLocalizacion();

  //Los hooks siempre se llaman, sin importar condiciones
  const climaHook = usePronosticoClimatico({
    fecha: fecha().hoy,
    latitud: coordenadas().latitud,
    longitud: coordenadas().longitud,
    clave_de_api: process.env.EXPO_PUBLIC_API_KEY as string,
    diaIndex,
  });
  console.log("=== DEBUG ===");
  console.log("coordenadasDisponibles:", coordenadasDisponibles());
  console.log("coordenadas:", coordenadas());
  console.log("estaPendiente:", climaHook.estaPendiente());
  console.log("clima():", climaHook.clima());
  console.log("diaIndex:", diaIndex);

  //Returns condicionales DESPUÉS de todos los hooks
  if (!coordenadasDisponibles()) return null;
  if (climaHook.estaPendiente() && !climaHook.clima()) return null;

  const datosClima = climaHook.clima();

  return (
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
  );
};

export default App