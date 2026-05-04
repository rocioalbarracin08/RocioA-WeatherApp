import type { ClimaPorDia } from '../../tipos/infoClima';
import { View, Text } from 'react-native';
import { useColorScheme } from 'nativewind';
import {
  Thermometer,
  Droplets,
  Wind,
  Sun,
  CloudRain,
} from 'lucide-react-native';

const mapaDeIconosPorMetrica: Record<string, any> = {
  "Sensacion termica": Thermometer,
  "Humedad":           Droplets,
  "Viento":            Wind,
  "Indice UV":         Sun,
  "Prob lluvia":       CloudRain,
};

const TarjetaParaDatosClimaticos = ({ clima, diaIndex }: { clima: ClimaPorDia | null, diaIndex: number }) => {
  const { colorScheme } = useColorScheme();
  const esDark = colorScheme === 'dark';
  const estilos = crearEstilos(esDark);
  const colorIconoTenue = esDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';

  if (!clima) return <Text style={estilos.textoBase}>Cargando...</Text>;

  return (
    <View style={estilos.contenedor}>

      <View style={estilos.filaMetricas}>
        {clima.indicadores.map((indicador) => {
          const IconoDeMetrica = mapaDeIconosPorMetrica[indicador.tipo];
          return (
            <View key={indicador.tipo} style={estilos.metricaSimple}>
              {IconoDeMetrica && (
                <IconoDeMetrica size={20} color={colorIconoTenue} />
              )}
              <Text style={estilos.valorIndicador}>
                {indicador.valor}{indicador.unidad}
              </Text>
            </View>
          );
        })}
      </View>

      <Text style={estilos.temperatura}>
        {Math.round(clima.temperatura)}°
      </Text>

      <View style={estilos.filaMiniMax}>
        <Text style={estilos.textoSecundario}>Mín ↓ {Math.round(clima.min)}°</Text>
        <Text style={estilos.textoSecundario}>  |  </Text>
        <Text style={estilos.textoSecundario}> Máx ↑ {Math.round(clima.max)}°</Text>
      </View>

    </View>
  );
};

const crearEstilos = (esDark: boolean) => {
  const colorTexto    = esDark ? '#ffffff'                : '#000000';
  const colorSubtexto = esDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';
  const colorTarjeta  = esDark ? 'rgba(255,255,255,0.08)': 'rgba(0,0,0,0.06)';

  return {
    contenedor: {
      alignItems: 'center' as const,
      paddingHorizontal: 24,
      gap: 25,
    },
    labelTemperatura: {
      fontSize: 12,
      color: colorSubtexto,
      letterSpacing: 1,
    },
    temperatura: {
      fontSize: 50,
      fontWeight: '400' as const,
      letterSpacing: -2,
      color: colorTexto,
      marginTop: 20,
    },
    filaMiniMax: {
      flexDirection: 'row' as const,
      gap: 8,
      marginBottom: 16,
    },
    textoBase: {
      color: colorTexto,
      textAlign: 'center' as const,
    },
    textoSecundario: {
      fontSize: 16,
      color: colorSubtexto,
    },
    filaMetricas: {
      flexDirection: 'row' as const,
      flexWrap: 'wrap' as const,
      justifyContent: 'center' as const,
      gap: 36,
      marginTop: 16,
      width: '100%' as const,
    },
    metricaSimple: {
      alignItems: 'center' as const,
      gap: 10,
    },
    valorIndicador: {
      fontSize: 13,
      fontWeight: '600' as const,
      color: colorTexto,
    },
    labelIndicador: {
      fontSize: 11,
      color: colorSubtexto,
      textAlign: 'center' as const,
    },
  };
};

export default TarjetaParaDatosClimaticos;