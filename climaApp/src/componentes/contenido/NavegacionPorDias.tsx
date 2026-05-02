import { Text } from "@/components/ui/text";
import { Icon } from "@/components/ui/icon"; 
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { Pressable, View } from "react-native";

export default function BotonesDeNavegacionPorDias({
  hoy, ayer, maniana, diaIndex, setDiaIndex
}: {
  hoy: Date; ayer: Date; maniana: Date;
  diaIndex: number; setDiaIndex: (n: number) => void;
}) {
  const dias = [ayer, hoy, maniana];
  const diaActual = dias[diaIndex];
  const hayAnterior = diaIndex > 0;
  const haySiguiente = diaIndex < 2;

  return (
    <View className="flex-row items-center justify-between p-4">

      {hayAnterior ? (
        <Pressable onPress={() => setDiaIndex(diaIndex - 1)} className="items-center w-16">
          <Text>{`${dias[diaIndex - 1].getDate()}/${dias[diaIndex - 1].getMonth() + 1}`}</Text>          
          <Icon as={ChevronLeft} size={24} />
        </Pressable>
      ) : (
        <View className="w-16" /> 
      )}

      <View className="items-center">
        <Text className="text-2xl font-bold">
          {`${diaActual.getDate()}/${diaActual.getMonth() + 1}`}
        </Text>
      </View>

      {haySiguiente ? (
        <Pressable onPress={() => setDiaIndex(diaIndex + 1)} className="items-center w-16">
          <Text>{`${dias[diaIndex + 1].getDate()}/${dias[diaIndex + 1].getMonth() + 1}`}</Text>
          <Icon as={ChevronRight} size={24} />
        </Pressable>
      ) : (
        <View className="w-16" />
      )}

    </View>
  );
}