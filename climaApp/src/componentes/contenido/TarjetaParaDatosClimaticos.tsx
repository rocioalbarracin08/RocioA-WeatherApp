import type { ClimaPorDia } from '../../tipos/infoClima';
import { View, Text } from 'react-native';

const TarjetaParaDatosClimaticos = ({ clima }: { clima: ClimaPorDia | null }) => {
  if (!clima) return <Text>Cargando...</Text>;

  return (
    <View>
      <Text className="text-6xl">
        {clima.temperatura}°C
      </Text>

      <Text>
        Min: {clima.min}° / Max: {clima.max}°
      </Text>
    </View>
  );
};

export default TarjetaParaDatosClimaticos;