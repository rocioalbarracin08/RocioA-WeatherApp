import { renderHook } from '@testing-library/react-native';
import { useFechas } from '../../../src/hooks/dias';

describe('Yo como usuario quiero visualizar 3 fechas distintas y que cada una respete su orden cronológico', () => {

  it('hoy es la fecha actual', () => {
    const { result } = renderHook(() => useFechas());
    const { hoy } = result.current.fecha();
    const ahora = new Date();

    expect(hoy.getDate()).toBe(ahora.getDate());
    expect(hoy.getMonth()).toBe(ahora.getMonth());
    expect(hoy.getFullYear()).toBe(ahora.getFullYear());
  });

  it('ayer es exactamente un día antes que hoy', () => {
    const { result } = renderHook(() => useFechas());
    const { hoy, ayer } = result.current.fecha();

    const diferenciaDias = hoy.getDate() - ayer.getDate();
    expect(diferenciaDias).toBe(1);
  });

  it('mañana es exactamente un día después que hoy', () => {
    const { result } = renderHook(() => useFechas());
    const { hoy, maniana } = result.current.fecha();

    const diferenciaDias = maniana.getDate() - hoy.getDate();
    expect(diferenciaDias).toBe(1);
  });

  it('hoy, ayer y mañana son tres fechas distintas', () => {
    const { result } = renderHook(() => useFechas());
    const { hoy, ayer, maniana } = result.current.fecha();

    expect(hoy.getTime()).not.toBe(ayer.getTime());
    expect(hoy.getTime()).not.toBe(maniana.getTime());
    expect(ayer.getTime()).not.toBe(maniana.getTime());
  });

});