import { useEffect, useState } from 'react';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

const COORDENADAS_POR_DEFECTO_CABA = { latitud: -34.6037, longitud: -58.3816 };

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
      const { status } = await requestForegroundPermissionsAsync();

      //Si el permiso es denegado, usamos CABA como ubicación por defecto
      if (status !== 'granted') {
        cambiarCoordenadas(COORDENADAS_POR_DEFECTO_CABA);
        cambiarEstadoDeLosPermisos({ habilitado: true });
        return;
      }

      const localizacion = await getCurrentPositionAsync({});
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