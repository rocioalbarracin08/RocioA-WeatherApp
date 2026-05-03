import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePronosticoClimatico } from '../../../src/hooks/clima';
import React from 'react';

const respuestaFalsaDeLaApi = {
  location: { name: "Villa Celina", region: "Buenos Aires" },
  current: {
    temp_c: 18.5,
    feelslike_c: 17.0,
    humidity: 79,
    wind_kph: 11.2,
    precip_mm: 0,
    uv: 0,
  },
  forecast: {
    forecastday: [
      {
        date: "2026-04-29",
        day: {
          avgtemp_c: 18.0,
          mintemp_c: 15.0,
          maxtemp_c: 21.0,
          avghumidity: 75,
          maxwind_kph: 20.0,
          totalprecip_mm: 0.2,
          daily_chance_of_rain: 86,
          uv: 3.9,
          condition: { text: "Partly Cloudy", code: 1003 },
        },
      },
      {
        date: "2026-04-30",
        day: {
          avgtemp_c: 20.0,
          mintemp_c: 16.0,
          maxtemp_c: 23.0,
          avghumidity: 70,
          maxwind_kph: 18.0,
          totalprecip_mm: 0.0,
          daily_chance_of_rain: 10,
          uv: 4.0,
          condition: { text: "Sunny", code: 1000 },
        },
      },
    ],
  },
};

// Wrapper necesario porque useQuery requiere QueryClientProvider
const crearWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }, // sin reintentos en tests
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('Como usuario debo poder obtener todos los datos de la API climática según el día', () => {

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('no hace fetch cuando las coordenadas son 0,0', async () => {
    renderHook(
      () => usePronosticoClimatico({
        fecha: new Date(2026, 3, 29),
        latitud: 0,        
        longitud: 0,
        clave_de_api: 'test-key',
        diaIndex: 0,
      }),
      { wrapper: crearWrapper() }
    );

    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('devuelve los datos del día correcto según diaIndex', async () => {
  
    const respuestaFalsaDeHistorial = {
      forecast: {
        forecastday: [
          {
            date: "2026-04-28",
            day: {
              avgtemp_c: 15.0,
              mintemp_c: 12.0,
              maxtemp_c: 18.0,
              avghumidity: 80,
              maxwind_kph: 15.0,
              daily_chance_of_rain: 20,
              uv: 2.0,
              condition: { text: "Cloudy", code: 1006 },
            },
          },
        ],
      },
    };

    const respuestaFalsaDePronostico = {
      location: { name: "Villa Celina", region: "Buenos Aires" },
      current: {
        temp_c: 18.5,
        feelslike_c: 17.0,
        humidity: 79,
        wind_kph: 11.2,
        uv: 0,
        condition: { text: "Partly Cloudy", code: 1003 },
      },
      forecast: {
        forecastday: [
          {
            date: "2026-04-29",
            day: {
              avgtemp_c: 18.0,
              mintemp_c: 15.0,
              maxtemp_c: 21.0,
              avghumidity: 75,
              maxwind_kph: 20.0,
              daily_chance_of_rain: 86,
              uv: 3.9,
              condition: { text: "Partly Cloudy", code: 1003 },
            },
          },
          {
            date: "2026-04-30",
            day: {
              avgtemp_c: 20.0,
              mintemp_c: 16.0,
              maxtemp_c: 23.0,
              avghumidity: 70,
              maxwind_kph: 18.0,
              daily_chance_of_rain: 10,
              uv: 4.0,
              condition: { text: "Sunny", code: 1000 },
            },
          },
        ],
      },
    };

    //primer fetch = history (ayer), segundo fetch = forecast (hoy+mañana)
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({ json: async () => respuestaFalsaDeHistorial })
      .mockResolvedValueOnce({ json: async () => respuestaFalsaDePronostico });

    const { result } = renderHook(
      () => usePronosticoClimatico({
        fecha: new Date(2026, 3, 29),
        latitud: -34.7,
        longitud: -58.48,
        clave_de_api: 'test-key',
        diaIndex: 1, // hoy = índice 1
      }),
      { wrapper: crearWrapper() }
    );

    await waitFor(() => {
      expect(result.current.estaPendiente()).toBe(false);
    });

    const clima = result.current.clima();

    expect(clima?.ciudad).toBe("Villa Celina");
    expect(clima?.region).toBe("Buenos Aires");
    expect(clima?.temperatura).toBe(18.5); // current.temp_c de hoy
    expect(clima?.codigoCondicion).toBe(1003); // current.condition.code de hoy
  });
});