import { useQuery } from '@tanstack/react-query';
import type { ClimaPorDia } from '../tipos/infoClima';

export const usePronosticoClimatico = ({
  fecha, latitud, longitud, clave_de_api, diaIndex
}: {
  fecha: Date;
  latitud: number;
  longitud: number;
  clave_de_api: string;
  diaIndex: number;
}) => {
  const { isPending, isFetched, isError, error, data } = useQuery({
    enabled: latitud !== 0 && longitud !== 0,
    queryKey: [fecha.getDate(), latitud, longitud],
    queryFn: async (): Promise<ClimaPorDia[]> => {
      const resultado = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${clave_de_api}&q=${latitud},${longitud}&days=3`
      );
      const json = await resultado.json();
      const dias = json.forecast.forecastday;

      return dias.map((dia: any, index: number) => ({
        ciudad: json.location.name,
        region: json.location.region,
        condicion: dia.day.condition.text,
        codigoCondicion: dia.day.condition.code,
        fecha: dia.date,
        temperatura: index === 0 ? json.current.temp_c : dia.day.avgtemp_c,
        min: dia.day.mintemp_c,
        max: dia.day.maxtemp_c,
        indicadores: [
          { tipo: "Sensación térmica",      valor: Math.round(index === 0 ? json.current.feelslike_c : dia.day.avgtemp_c), unidad: "°C" },
          { tipo: "Humedad",        valor: index === 0 ? json.current.humidity : dia.day.avghumidity,              unidad: "%" },
          { tipo: "Viento",         valor: index === 0 ? json.current.wind_kph : dia.day.maxwind_kph,             unidad: "km/h" },
          { tipo: "Lluvia",         valor: index === 0 ? json.current.precip_mm : dia.day.totalprecip_mm,         unidad: "mm" },
          { tipo: "Prob. lluvia",   valor: dia.day.daily_chance_of_rain,                                          unidad: "%" },
        ]
      }));
    },
  });

  return {
    estaPendiente: () => isPending,
    huboUnProblema: () => isError,
    descripcionDelProblema: () => (isError ? (error as Error).message : ''),
    clima: (): ClimaPorDia | null => (isFetched && data ? data[diaIndex] : null),
  };
};

export default usePronosticoClimatico;