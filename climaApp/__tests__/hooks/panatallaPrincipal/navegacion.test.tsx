import { renderHook, act } from '@testing-library/react-native';
import { usePantallaPrincipal } from '../../../src/hooks/usePantallaPrincipal';

jest.mock('../../../src/hooks/localizacion', () => ({
  __esModule: true,
  default: () => ({
    coordenadas: () => ({ latitud: -34.7, longitud: -58.48 }),
    coordenadasDisponibles: () => true,
  }),
}));

jest.mock('../../../src/hooks/clima', () => ({
  __esModule: true,
  default: () => ({
    estaPendiente: () => false,
    clima: () => null,
  }),
}));

describe('usePantallaPrincipal - navegación por días', () => {

  it('arranca mostrando el día de hoy (índice 1)', () => {
    const { result } = renderHook(() => usePantallaPrincipal());
    expect(result.current.diaIndex).toBe(1);
  });

  it('avanza al día siguiente cuando se llama setDiaIndex con 2', () => {
    const { result } = renderHook(() => usePantallaPrincipal());

    act(() => {
      result.current.setDiaIndex(2);
    });

    expect(result.current.diaIndex).toBe(2);
  });

  it('retrocede al día anterior cuando se llama setDiaIndex con 0', () => {
    const { result } = renderHook(() => usePantallaPrincipal());

    act(() => {
      result.current.setDiaIndex(0);
    });

    expect(result.current.diaIndex).toBe(0);
  });

});