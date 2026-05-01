import { useQuery } from '@tanstack/react-query';
import type { ClimaPorDia } from '../tipos/infoClima';

export const usePronosticoClimatico = ({
  fecha,latitud,longitud,clave_de_api, diaIndex}: {
  fecha: Date;
  latitud: number;
  longitud: number;
  clave_de_api: string;
  diaIndex: number;
}) => {
  const { isPending, isFetched, isError, error, data } = useQuery({
    //
    enabled: latitud !== 0 && longitud !== 0,

    queryKey: [fecha.getDate(), latitud, longitud, diaIndex], 

    queryFn: async (): Promise<ClimaPorDia> => {
      const resultado = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${clave_de_api}&q=${latitud},${longitud}&days=3`
      );

      const json = await resultado.json();

      const dias = json.forecast.forecastday;

      const diaSeleccionado = dias[diaIndex];
      
      return {
        ciudad: json.location.name,

        condicion: diaSeleccionado.day.condition.text,
        codigoCondicion: diaSeleccionado.day.condition.code,

        fecha: diaSeleccionado.date,

        temperatura:
          diaIndex === 0
            ? json.current.temp_c
            : diaSeleccionado.day.avgtemp_c,

        min: diaSeleccionado.day.mintemp_c,
        max: diaSeleccionado.day.maxtemp_c,

        indicadores: [
          {
            tipo: "Humedad",
            valor: json.current.humidity,
            unidad: "%"
          },
          {
            tipo: "Viento",
            valor: json.current.wind_kph,
            unidad: "km/h"
          }
        ]
      };
    },
  });

  return {
    estaPendiente: () => isPending,
    huboUnProblema: () => isError,
    descripcionDelProblema: () => (isError ? (error as Error).message : ''),

    clima: (): ClimaPorDia | null => (isFetched ? data : null),
  };
};

export default usePronosticoClimatico;