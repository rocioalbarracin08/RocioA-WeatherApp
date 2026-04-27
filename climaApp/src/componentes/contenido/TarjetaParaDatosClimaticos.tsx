import usarPronosticoClimatico from '../../hooks/clima';
import { View, Text } from 'react-native';

type Props = Parameters<typeof usarPronosticoClimatico>[0];

const TarjetaParaDatosClimaticos = (props: Props) => {
  const { ciudad, temperaturaEnGradosCelsius } = usarPronosticoClimatico(props);

  return (
    <View>
      <Text className="text-6xl">Ciudad: {ciudad()}</Text>
      <Text className="text-6xl">
        Temperatura: {temperaturaEnGradosCelsius()}
      </Text>
    </View>
  );
};

export default TarjetaParaDatosClimaticos;