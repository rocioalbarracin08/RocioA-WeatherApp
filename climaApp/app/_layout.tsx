import '@/global.css';
import React from 'react';
export { FeedbackDeErrorPorDefecto as ErrorBoundry } from '../src/componentes/contenido/feedbacks/index';
import { Stack } from 'expo-router';
import ProveedorDeDatosClimatico from '@/src/componentes/contenedor/ProveedorDeClima';
import ProveedorDeTemaClaroOscuro from '@/src/tema_claro_oscuro/ProveedorDeTemaClaroOscuro';

export default function RootLayout() {
  return (
    <ProveedorDeDatosClimatico>
      <ProveedorDeTemaClaroOscuro>
        <Stack screenOptions={{ headerShown: false }} />
      </ProveedorDeTemaClaroOscuro>
    </ProveedorDeDatosClimatico>
  );
}