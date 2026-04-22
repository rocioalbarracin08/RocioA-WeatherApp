import '@/global.css';

import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import ProveedorDeTemaClaroOscuro from '@/src/tema_claro_oscuro';


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  return (
    <ProveedorDeTemaClaroOscuro>
      <Stack />
      <PortalHost />
    </ProveedorDeTemaClaroOscuro>
  );
}
