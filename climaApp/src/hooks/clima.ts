import { useQuery } from '@tanstack/react-query';
import type { ClimaPorDia } from '../tipos/infoClima';

const formatearFechaParaApi = (fecha: Date) => fecha.toISOString().split('T')[0];

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
      const ubicacionComoTexto = `${latitud},${longitud}`;

      const fechaDeAyer = new Date();
      fechaDeAyer.setDate(fechaDeAyer.getDate() - 1);
      const fechaDeAyerFormateada = formatearFechaParaApi(fechaDeAyer);

      const [respuestaDeAyer, respuestaDePronostico] = await Promise.all([
        fetch(`https://api.weatherapi.com/v1/history.json?key=${clave_de_api}&q=${ubicacionComoTexto}&dt=${fechaDeAyerFormateada}&lang=es`),
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=${clave_de_api}&q=${ubicacionComoTexto}&days=2&lang=es`)
      ]);

      const [datosDeAyer, datosDePronostico] = await Promise.all([
        respuestaDeAyer.json(),
        respuestaDePronostico.json()
      ]);

      const nombreDeCiudad = datosDePronostico.location.name;
      const nombreDeRegion = datosDePronostico.location.region;
      const datosDelDiaDeAyer = datosDeAyer.forecast.forecastday[0];

      const horaActual = new Date().getHours();
      const sensacionTermicaAEstaHoraDeAyer = Math.round(
        datosDelDiaDeAyer.hour?.[horaActual]?.feelslike_c ?? datosDelDiaDeAyer.day.avgtemp_c
      );

      const climaDeAyer: ClimaPorDia = {
        ciudad: nombreDeCiudad,
        region: nombreDeRegion,
        condicion: datosDelDiaDeAyer.day.condition.text,
        codigoCondicion: datosDelDiaDeAyer.day.condition.code,
        fecha: datosDelDiaDeAyer.date,
        temperatura: datosDelDiaDeAyer.day.avgtemp_c,
        min: datosDelDiaDeAyer.day.mintemp_c,
        max: datosDelDiaDeAyer.day.maxtemp_c,
        indicadores: [
          { tipo: "Sensacion termica", valor: sensacionTermicaAEstaHoraDeAyer,          unidad: "°C" },
          { tipo: "Humedad",           valor: datosDelDiaDeAyer.day.avghumidity,         unidad: "%" },
          { tipo: "Viento",            valor: datosDelDiaDeAyer.day.maxwind_kph,         unidad: "km/h" },
          { tipo: "Indice UV",         valor: datosDelDiaDeAyer.day.uv,                  unidad: "" },
          { tipo: "Prob lluvia",       valor: datosDelDiaDeAyer.day.daily_chance_of_rain, unidad: "%" },
        ]
      };

      const climaDeHoyYManiana: ClimaPorDia[] = datosDePronostico.forecast.forecastday.map(
        (diaDelPronostico: any, indiceDelDia: number) => {
          const esDiaDeHoy = indiceDelDia === 0;
          return {
            ciudad: nombreDeCiudad,
            region: nombreDeRegion,
            condicion: esDiaDeHoy ? datosDePronostico.current.condition.text : diaDelPronostico.day.condition.text,
            codigoCondicion: esDiaDeHoy ? datosDePronostico.current.condition.code : diaDelPronostico.day.condition.code,
            fecha: diaDelPronostico.date,
            temperatura: esDiaDeHoy ? datosDePronostico.current.temp_c : diaDelPronostico.day.avgtemp_c,
            min: diaDelPronostico.day.mintemp_c,
            max: diaDelPronostico.day.maxtemp_c,
            indicadores: [
              { tipo: "Sensacion termica", valor: Math.round(esDiaDeHoy ? datosDePronostico.current.feelslike_c : diaDelPronostico.day.avgtemp_c), unidad: "°C" },
              { tipo: "Humedad",           valor: esDiaDeHoy ? datosDePronostico.current.humidity : diaDelPronostico.day.avghumidity,              unidad: "%" },
              { tipo: "Viento",            valor: esDiaDeHoy ? datosDePronostico.current.wind_kph : diaDelPronostico.day.maxwind_kph,              unidad: "km/h" },
              { tipo: "Indice UV",         valor: diaDelPronostico.day.uv,                                                                         unidad: "" },
              { tipo: "Prob lluvia",       valor: diaDelPronostico.day.daily_chance_of_rain,                                                       unidad: "%" },
            ]
          };
        }
      );

      return [climaDeAyer, ...climaDeHoyYManiana];
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