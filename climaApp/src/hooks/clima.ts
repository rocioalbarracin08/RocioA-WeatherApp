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

    //un solo fetch para los 3 días, por eso no usamos diaIndex
    queryKey: [fecha.getDate(), latitud, longitud],

    queryFn: async (): Promise<ClimaPorDia[]> => {
      const resultado = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${clave_de_api}&q=${latitud},${longitud}&days=3`
      );
      const json = await resultado.json();
      console.log("RESPUESTA API:", JSON.stringify(json).slice(0, 300)); // ← agregá esto

      const dias = json.forecast.forecastday;

      return dias.map((dia: any, index: number) => ({
        ciudad: json.location.name,
        condicion: dia.day.condition.text,
        codigoCondicion: dia.day.condition.code,
        fecha: dia.date,
        temperatura: index === 0 ? json.current.temp_c : dia.day.avgtemp_c,
        min: dia.day.mintemp_c,
        max: dia.day.maxtemp_c,
        indicadores: [
          { tipo: "Humedad", valor: json.current.humidity, unidad: "%" },
          { tipo: "Viento", valor: json.current.wind_kph, unidad: "km/h" }
        ]
      }));
    },
  });

  return {
    estaPendiente: () => isPending,
    huboUnProblema: () => isError,
    descripcionDelProblema: () => (isError ? (error as Error).message : ''),

    clima: (): ClimaPorDia | null => {
      console.log("isFetched:", isFetched, "data:", data);
      return isFetched && data ? data[diaIndex] : null;
    },
  };
};

export default usePronosticoClimatico;