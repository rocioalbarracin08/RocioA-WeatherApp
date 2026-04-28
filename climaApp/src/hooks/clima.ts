import { useQuery } from '@tanstack/react-query';

export const usarPronosticoClimatico = ({
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
    
    queryKey: [fecha.getDate(), fecha.getHours(), latitud.toPrecision(2), longitud.toPrecision(2)],
    queryFn: async () => {
      console.log(process.env.EXPO_PUBLIC_WEATHER_API_KEY);
      const resultado = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${clave_de_api}&q=${latitud},${longitud}&days=3`
      );
      const data = await resultado.json();
      return data;
    },
  });

  return {
    estaPendiente: () => isPending,
    huboUnProblema: () => isError,
    consultaExitosa: () => isFetched,
    ciudad: () => data?.location?.name ?? '',
    condicionClimatica: () => (isFetched ? data.current.condition.text : ''),
    humedadEnPorcentaje: () => (isFetched ? data.current.humidity : 0),
    presionEnHectopascales: () => (isFetched ? data.current.pressure_mb : 0),
    velocidadDelVientoEnKilometrosPorHora: () => (isFetched ? data.current.wind_kph : 0),
    temperaturaEnGradosCelsius: () => (isFetched ? data.current.temp_c : 0),
    descripcionDelProblema: () => (isError ? (error as Error).message : ''),
    pronostico: () =>
      isFetched
        ? {
            condicion_climatica: data.current.condition.text,
            humedad_en_porcentaje: data.current.humidity,
            presion_en_hectopascales: data.current.pressure_mb,
            velocidad_del_viento_en_kilometros_por_hora: data.current.wind_kph,
            temperatura_en_grados_celsius: data.current.temp_c,
          }
        : null,
  };
};

export default usarPronosticoClimatico;
