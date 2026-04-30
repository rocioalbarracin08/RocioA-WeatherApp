import type { ClimaPorDia } from '../../tipos/infoClima';
import { Text } from 'react-native';

const EncabezadoDeCiudad = ({ ciudad }: { ciudad: string | null }) => {
  return (
    <Text>
      {ciudad}
    </Text>
  );
};
export default EncabezadoDeCiudad;