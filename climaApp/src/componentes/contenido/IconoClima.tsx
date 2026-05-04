import { View } from "react-native";
import { useColorScheme } from "nativewind";
import { Sun, Cloud, CloudRain, CloudSnow } from "lucide-react-native";

type Props = { codigo: number };

const mapaDeIconos: Record<number, any> = {
  1000: Sun,
  1003: Cloud, 1006: Cloud, 1009: Cloud, 1030: Cloud,
  1063: CloudRain, 1180: CloudRain, 1183: CloudRain, 1186: CloudRain,
  1189: CloudRain, 1192: CloudRain, 1195: CloudRain, 1198: CloudRain,
  1201: CloudRain, 1240: CloudRain, 1243: CloudRain, 1246: CloudRain,
  1066: CloudSnow, 1210: CloudSnow, 1213: CloudSnow, 1216: CloudSnow,
  1219: CloudSnow, 1222: CloudSnow, 1225: CloudSnow, 1255: CloudSnow,
  1258: CloudSnow,
  1087: Cloud, 1273: CloudRain, 1276: CloudRain,
};

const obtenerIconoPorCodigo = (codigo: number) => mapaDeIconos[codigo] ?? Cloud;

const IconoClima = ({ codigo }: Props) => {
  const { colorScheme } = useColorScheme();
  const colorDelIcono = colorScheme === 'dark' ? '#ffffff' : '#000000';
  const Icono = obtenerIconoPorCodigo(codigo);

  return (
    <View style={{ alignItems: 'center', marginVertical: 40, marginTop: 45 }}>
      <Icono size={190} color={colorDelIcono} />
    </View>
  );
};

export default IconoClima;