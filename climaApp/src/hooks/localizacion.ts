import { useEffect, useState } from 'react';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

export const useLocalizacion = () => {

  const [coordenadas, cambiarCoordenadas] = useState<{ latitud: number; longitud: number }>({
    latitud: 0,
    longitud: 0,
  });

  const [permiso, cambiarEstadoDeLosPermisos] = useState<{ habilitado: boolean }>({
    habilitado: false,
  });

  
  useEffect(() => {
    async function obtenerLocalizacionActual() {
      const { status: habilitado } = await requestForegroundPermissionsAsync();
      if (habilitado !== 'granted') {
        return;
      }

      let localizacion = await getCurrentPositionAsync({});
    //redondear coordenadas para que no cambien en cada GPS update
    cambiarCoordenadas({
      latitud: Math.round(localizacion.coords.latitude * 100) / 100,
      longitud: Math.round(localizacion.coords.longitude * 100) / 100,
    });
      cambiarEstadoDeLosPermisos({ habilitado: true });
    }

    obtenerLocalizacionActual();
  }, []);
  return {
    coordenadas: () => coordenadas,
    coordenadasComoTexto: () => `${coordenadas.latitud},${coordenadas.longitud}`,
    coordenadasDisponibles: () => permiso.habilitado,
  };
};

export default useLocalizacion;
