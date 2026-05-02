import React from 'react'
import LayoutParaPantallaPrincipalDelClima from '@/src/componentes/contenedor/LayoutParaPantallaPrincipalDelClima'
import BotonesDeNavegacionPorDias from '@/src/componentes/contenido/NavegacionPorDias'
import TarjetaParaDatosClimaticos from '@/src/componentes/contenido/TarjetaParaDatosClimaticos'
import EncabezadoDeCiudad from '@/src/componentes/contenido/EncabezadoDeCiudad'
import IconoClima from '@/src/componentes/contenido/IconoClima'
import BotonDeTema from '@/src/tema_claro_oscuro/BotonTema'
import { usePantallaPrincipal } from '@/src/hooks/usePantallaPrincipal'
import CargandoContenido from '@/src/componentes/contenido/CargandoContenido'

const App = () => {

  const { fecha, diaIndex, setDiaIndex, datosClima, pantallaPuedeRenderizarse } = usePantallaPrincipal();

  if (!pantallaPuedeRenderizarse) return (
    <CargandoContenido/>
  );
  console.log("codigo condicion:", datosClima?.codigoCondicion);
  
  return (
    <LayoutParaPantallaPrincipalDelClima>
      <BotonesDeNavegacionPorDias {...fecha()} diaIndex={diaIndex} setDiaIndex={setDiaIndex} />

      <EncabezadoDeCiudad ciudad={datosClima?.ciudad ?? ""} region={datosClima?.region ?? ""} />

      <IconoClima codigo={datosClima?.codigoCondicion ?? 0} />

      <TarjetaParaDatosClimaticos clima={datosClima} diaIndex={diaIndex} />

      <BotonDeTema />
    </LayoutParaPantallaPrincipalDelClima>
  );
};

export default App