import '@/global.css';
import ProveedorDeTemaClaroOscuro from '@/src/tema_claro_oscuro';
import React from 'react';
import  StackPrincipal  from '../src/stacks/index';
export { FeedbackDeErrorPorDefecto as ErrorBoundry } from '../src/feedbacks/index';

export default function RootLayout() {
  return (
    <ProveedorDeTemaClaroOscuro>
      <StackPrincipal />
    </ProveedorDeTemaClaroOscuro>
  );
}
