import type { ClimaPorDia } from '../../tipos/infoClima';
import { View, Text } from 'react-native';
import { useColorScheme } from 'nativewind';

const TarjetaParaDatosClimaticos = ({ clima }: { clima: ClimaPorDia | null }) => {
  const { colorScheme } = useColorScheme();
  const esDark = colorScheme === 'dark';

  const estilos = crearEstilos(esDark);

  if (!clima) return <Text style={estilos.textoBase}>Cargando...</Text>;

  return (
    <View style={estilos.contenedor}>

      <Text style={estilos.temperatura}>
        {Math.round(clima.temperatura)}°
      </Text>

      <View style={estilos.filaMiniMax}>
        <Text style={estilos.textoSecundario}>Mín   ↓    {Math.round(clima.min)}°      |</Text>
        <Text style={estilos.textoSecundario}>   Máx   ↑    {Math.round(clima.max)}°</Text>
      </View>

      <View style={estilos.grilla}>
        {clima.indicadores.map((indicador) => (
          <View key={indicador.tipo} style={estilos.tarjetaIndicador}>
            <Text style={estilos.valorIndicador}>
              {indicador.valor}{indicador.unidad}
            </Text>
            <Text style={estilos.labelIndicador}>{indicador.tipo}</Text>
          </View>
        ))}
      </View>

    </View>
  );
};

const crearEstilos = (esDark: boolean) => {
  const colorTexto     = esDark ? '#ffffff'               : '#000000';
  const colorSubtexto  = esDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';
  const colorTarjeta   = esDark ? 'rgba(255,255,255,0.08)': 'rgba(0,0,0,0.06)';

  return {
    contenedor: {
      alignItems: 'center' as const,
      paddingHorizontal: 24,
      gap: 35,
    },
    temperatura: {
      fontSize: 80,
      fontWeight: '200' as const,
      letterSpacing: -2,
      color: colorTexto,
    },
    filaMiniMax: {
      flexDirection: 'row' as const,
      gap: 14,
    },
    textoBase: {
      color: colorTexto,
      textAlign: 'center' as const,
    },
    textoSecundario: {
      fontSize: 16,
      color: colorSubtexto,
    },
    grilla: {
      flexDirection: 'row' as const,
      flexWrap: 'wrap' as const,
      justifyContent: 'center' as const,
      gap: 12,
      marginTop: 8,
      width: '100%' as const,
    },
    tarjetaIndicador: {
      alignItems: 'center' as const,
      gap: 4,
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderRadius: 16,
      backgroundColor: colorTarjeta,
      width: '30%' as const,
    },
    valorIndicador: {
      fontSize: 13,
      fontWeight: '600' as const,
      color: colorTexto,
    },
    labelIndicador: {
      fontSize: 12,
      color: colorSubtexto,
      textAlign: 'center' as const,
    },
  };
};

export default TarjetaParaDatosClimaticos;