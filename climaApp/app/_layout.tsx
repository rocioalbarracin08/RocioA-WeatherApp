import '@/global.css';
import ProveedorDeTemaClaroOscuro from '@/src/tema_claro_oscuro';
import React from 'react';
export { FeedbackDeErrorPorDefecto as ErrorBoundry } from '../src/componentes/contenido/feedbacks/index';
import { Stack } from 'expo-router'


export default function RootLayout() {
  return (
    <ProveedorDeTemaClaroOscuro>
      <Stack />
    </ProveedorDeTemaClaroOscuro>
  );
}
