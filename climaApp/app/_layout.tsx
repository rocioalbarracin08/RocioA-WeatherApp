import '@/global.css';
import ProveedorDeTemaClaroOscuro from '@/src/tema_claro_oscuro';
import React from 'react';
export { FeedbackDeErrorPorDefecto as ErrorBoundry } from '../src/componentes/contenido/feedbacks/index';
import { Stack } from 'expo-router';
import ProveedorDeDatosClimatico from '@/src/componentes/contenedor/ProveedorDeClima';

export default function RootLayout() {
  return (
    <ProveedorDeDatosClimatico>
      <ProveedorDeTemaClaroOscuro>
        <Stack screenOptions={{ headerShown: false }} />
      </ProveedorDeTemaClaroOscuro>
    </ProveedorDeDatosClimatico>
  );
}