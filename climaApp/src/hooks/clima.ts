import { useQuery } from '@tanstack/react-query';
import type { ClimaPorDia } from '../tipos/infoClima';

export const usePronosticoClimatico = ({
  fecha,
  latitud,
  longitud,
  clave_de_api,
}: {
  fecha: Date;
  latitud: number;
  longitud: number;
  clave_de_api: string;
}) => {

  const { isPending, isFetched, isError, error, data } = useQuery({
    enabled: latitud !== 0 && longitud !== 0,

    queryKey: [fecha.getDate(), latitud, longitud],

    queryFn: async (): Promise<ClimaPorDia> => {
      const resultado = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${clave_de_api}&q=${latitud},${longitud}&days=1`
      );

      const json = await resultado.json();
      
      return {
        ciudad: json.location.name,
        condicion: json.current.condition.text,
        codigoCondicion: json.current.condition.code,
        fecha: json.location.localtime,
        temperatura: json.current.temp_c,
        min: json.forecast.forecastday[0].day.mintemp_c,
        max: json.forecast.forecastday[0].day.maxtemp_c,
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