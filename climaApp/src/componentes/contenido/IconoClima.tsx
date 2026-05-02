import { View } from "react-native";
import { Icon } from "@/components/ui/icon";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow
} from "lucide-react-native";

type Props = {
  codigo: number;
};

//Mapa de códigos: íconos
const mapaDeIconos: Record<number, any> = {
  1000: Sun, // soleado

  // nublado
  1003: Cloud,
  1006: Cloud,
  1009: Cloud,

  // lluvia
  1180: CloudRain,
  1183: CloudRain,
  1186: CloudRain,
  1189: CloudRain,

  // nieve
  1210: CloudSnow,
  1213: CloudSnow,
  1216: CloudSnow,
};

const obtenerIconoPorCodigo = (codigo: number) => {
  return mapaDeIconos[codigo] ?? Cloud; // fallback
};

const IconoClima = ({ codigo }: Props) => {
  const Icono = obtenerIconoPorCodigo(codigo);

  return (
    <View className="items-center my-8">
      <Icon as={Icono} size={110} />
    </View>
  );
};

export default IconoClima;