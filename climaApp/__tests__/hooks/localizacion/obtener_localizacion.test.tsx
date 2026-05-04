import useLocalizacion from '../../../src/hooks/localizacion';
import { renderHook, waitFor } from '@testing-library/react-native';

jest.mock('expo-location', () => {
  const obtenerLocalizacionActualFalsa = jest.fn(async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return { coords: { latitude: 10, longitude: 20 } };
  });

  const solicitarPermisosDeLocalizacionFalsa = jest.fn(async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return { status: 'granted' };
  });

  return {
    requestForegroundPermissionsAsync: solicitarPermisosDeLocalizacionFalsa,
    getCurrentPositionAsync: obtenerLocalizacionActualFalsa,
  };
});

describe('Yo como usuario quiero visualizar los datos del clima según la fecha para saber qué ponerme', () => {
  beforeAll(() => jest.useFakeTimers());
  afterAll(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });
  test('Es posible obtener las coordendas geograficas de mi localizacion', async () => {
    const resultado = renderHook(() => useLocalizacion());

    expect(resultado.result.current.coordenadas()).toEqual({
      latitud: 0,
      longitud: 0,
    });

    await waitFor(() => {
      expect(resultado.result.current.coordenadas()).toEqual({
        latitud: 10,
        longitud: 20,
      });
    });
  });
  test('si el permiso es denegado, usa las coordenadas de CABA por defecto', async () => {
  const { requestForegroundPermissionsAsync } = require('expo-location');
  requestForegroundPermissionsAsync.mockResolvedValueOnce({ status: 'denied' });

  const resultado = renderHook(() => useLocalizacion());

  await waitFor(() => {
    expect(resultado.result.current.coordenadas()).toEqual({
      latitud: -34.6037,
      longitud: -58.3816,
    });
  });

  expect(resultado.result.current.coordenadasDisponibles()).toBe(true);
});
});
