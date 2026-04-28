import usarPronosticoClimatico from '../../hooks/clima';
import { View, Text } from 'react-native';

type Props = Parameters<typeof usarPronosticoClimatico>[0];

const TarjetaParaDatosClimaticos = ({clima}: any) => {

  return (
    <View>
      <Text className="text-6xl">
        Temperatura: {clima.temperaturaEnGradosCelsius()}
      </Text>
    </View>
  );
};

export default TarjetaParaDatosClimaticos;