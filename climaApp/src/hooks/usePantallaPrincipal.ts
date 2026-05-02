import { useState } from 'react';
import { useFechas } from './dias';
import useLocalizacion from './localizacion';
import usePronosticoClimatico from './clima';

export const usePantallaPrincipal = () => {
  const [diaIndex, setDiaIndex] = useState(1);
  const { fecha } = useFechas();
  const { coordenadas, coordenadasDisponibles } = useLocalizacion();

  const climaHook = usePronosticoClimatico({
    fecha: fecha().hoy,
    latitud: coordenadas().latitud,
    longitud: coordenadas().longitud,
    clave_de_api: process.env.EXPO_PUBLIC_API_KEY as string,
    diaIndex,
  });

  const pantallaPuedeRenderizarse = coordenadasDisponibles() && !climaHook.estaPendiente();

  return {
    fecha,
    diaIndex,
    setDiaIndex,
    datosClima: climaHook.clima(),
    pantallaPuedeRenderizarse,
  };
};