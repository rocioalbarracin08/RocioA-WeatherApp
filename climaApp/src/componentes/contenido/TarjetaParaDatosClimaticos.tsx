import type { ClimaPorDia } from '../../tipos/infoClima';
import { View, Text } from 'react-native';

const TarjetaParaDatosClimaticos = ({ clima }: { clima: ClimaPorDia | null }) => {
  if (!clima) return <Text>Cargando...</Text>;

  return (
    <View>
      <Text style={{ fontSize: 64 }}>
        {clima.temperatura}°C
      </Text>

      <Text>
        Min: {clima.min}° / Max: {clima.max}°
      </Text>

      <View>
        {clima.indicadores.map((indicador) => (
          <Text key={indicador.tipo}>
            {indicador.tipo}: {indicador.valor}{indicador.unidad}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default TarjetaParaDatosClimaticos;