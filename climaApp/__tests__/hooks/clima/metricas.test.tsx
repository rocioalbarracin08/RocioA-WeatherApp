import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePronosticoClimatico } from '../../../src/hooks/clima';
import React from 'react';

const respuestaFalsaDeHistorial = {
  forecast: {
    forecastday: [{
      date: "2026-04-28",
      day: {
        avgtemp_c: 15.0, mintemp_c: 12.0, maxtemp_c: 18.0,
        avghumidity: 80, maxwind_kph: 15.0,
        daily_chance_of_rain: 20, uv: 2.0,
        condition: { text: "Cloudy", code: 1006 },
      },
    }],
  },
};

const respuestaFalsaDePronostico = {
  location: { name: "Villa Celina", region: "Buenos Aires" },
  current: {
    temp_c: 18.5, feelslike_c: 17.0, humidity: 79,
    wind_kph: 11.2, uv: 0,
    condition: { text: "Partly Cloudy", code: 1003 },
  },
  forecast: {
    forecastday: [{
      date: "2026-04-29",
      day: {
        avgtemp_c: 18.0, mintemp_c: 15.0, maxtemp_c: 21.0,
        avghumidity: 75, maxwind_kph: 20.0,
        daily_chance_of_rain: 86, uv: 3.9,
        condition: { text: "Partly Cloudy", code: 1003 },
      },
    },
    {
      date: "2026-04-30",
      day: {
        avgtemp_c: 20.0, mintemp_c: 16.0, maxtemp_c: 23.0,
        avghumidity: 70, maxwind_kph: 18.0,
        daily_chance_of_rain: 10, uv: 4.0,
        condition: { text: "Sunny", code: 1000 },
      },
    }],
  },
};

const TIPOS_DE_METRICAS_ESPERADOS = [
  "Sensacion termica",
  "Humedad",
  "Viento",
  "Indice UV",
  "Prob lluvia",
];

const crearWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

const configurarFetchFalso = () => {
  global.fetch = jest.fn();
  (global.fetch as jest.Mock)
    .mockResolvedValueOnce({ json: async () => respuestaFalsaDeHistorial })
    .mockResolvedValueOnce({ json: async () => respuestaFalsaDePronostico });
};

const renderizarHookDeClima = (diaIndex: number) => renderHook(
  () => usePronosticoClimatico({
    fecha: new Date(2026, 3, 29),
    latitud: -34.7,
    longitud: -58.48,
    clave_de_api: 'test-key',
    diaIndex,
  }),
  { wrapper: crearWrapper() }
);

describe('Los datos climáticos recibidos de la API deben ser exactamente los que la app necesita mostrar', () => {

  beforeEach(() => configurarFetchFalso());
  afterEach(() => jest.resetAllMocks());

  it('se reciben exactamente 5 métricas, ni más ni menos', async () => {
    const { result } = renderizarHookDeClima(1);
    await waitFor(() => expect(result.current.estaPendiente()).toBe(false));

    expect(result.current.clima()?.indicadores.length).toBe(5);
  });

  it('los tipos de métricas recibidos son exactamente los esperados', async () => {
    const { result } = renderizarHookDeClima(1);
    await waitFor(() => expect(result.current.estaPendiente()).toBe(false));

    const tiposRecibidos = result.current.clima()?.indicadores.map(indicador => indicador.tipo);
    expect(tiposRecibidos).toEqual(TIPOS_DE_METRICAS_ESPERADOS);
  });

  it('cada métrica tiene tipo, valor numérico y unidad', async () => {
    const { result } = renderizarHookDeClima(1);
    await waitFor(() => expect(result.current.estaPendiente()).toBe(false));

    result.current.clima()?.indicadores.forEach(indicador => {
      expect(typeof indicador.tipo).toBe('string');
      expect(typeof indicador.valor).toBe('number');
      expect(typeof indicador.unidad).toBe('string');
    });
  });

  it('si la API falla, huboUnProblema devuelve true', async () => {
    jest.resetAllMocks(); // ← limpiamos el mock del beforeEach primero
    global.fetch = jest.fn();
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Error de red'));

    const { result } = renderizarHookDeClima(1);
    await waitFor(() => expect(result.current.estaPendiente()).toBe(false));

    expect(result.current.huboUnProblema()).toBe(true);
  });

  it('si la API falla, descripcionDelProblema devuelve el mensaje de error', async () => {
    jest.resetAllMocks(); // ← limpiamos el mock del beforeEach primero
    global.fetch = jest.fn();
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Error de red'));

    const { result } = renderizarHookDeClima(1);
    await waitFor(() => expect(result.current.estaPendiente()).toBe(false));

    expect(result.current.descripcionDelProblema()).toBe('Error de red');
  });

});