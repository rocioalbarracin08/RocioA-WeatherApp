import { Text, Pressable, View } from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { useColorScheme } from "nativewind";

export default function BotonesDeNavegacionPorDias({
  hoy, ayer, maniana, diaIndex, setDiaIndex
}: {
  hoy: Date; ayer: Date; maniana: Date;
  diaIndex: number; setDiaIndex: (n: number) => void;
}) {
  const { colorScheme } = useColorScheme();
  const color = colorScheme === 'dark' ? '#ffffff' : '#000000';

  const dias = [ayer, hoy, maniana];
  const diaActual = dias[diaIndex];
  const hayAnterior = diaIndex > 0;
  const haySiguiente = diaIndex < 2;

  return (
    <View className="flex-row items-center justify-between p-4">

      {hayAnterior ? (
        <Pressable onPress={() => setDiaIndex(diaIndex - 1)} className="items-center w-16">
          <Text style={{ color }}>{`${dias[diaIndex - 1].getDate()}/${dias[diaIndex - 1].getMonth() + 1}`}</Text>
          <ChevronLeft size={24} color={color} />
        </Pressable>
      ) : (
        <View className="w-16" />
      )}

      <View className="items-center">
        <Text style={{ fontSize: 22, fontWeight: 'bold', color }}>
          {`${diaActual.getDate()}/${diaActual.getMonth() + 1}`}
        </Text>
      </View>

      {haySiguiente ? (
        <Pressable onPress={() => setDiaIndex(diaIndex + 1)} className="items-center w-16">
          <Text style={{ color }}>{`${dias[diaIndex + 1].getDate()}/${dias[diaIndex + 1].getMonth() + 1}`}</Text>
          <ChevronRight size={24} color={color} />
        </Pressable>
      ) : (
        <View className="w-16" />
      )}

    </View>
  );
}