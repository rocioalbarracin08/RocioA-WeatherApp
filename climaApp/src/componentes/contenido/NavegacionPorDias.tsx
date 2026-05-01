import { Text } from "@/components/ui/text";
import { Icon } from "@/components/ui/icon"; 
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { Pressable, View } from "react-native";

export default function BotonesDeNavegacionPorDias({
  hoy,
  ayer,
  maniana,
  diaIndex,
  setDiaIndex
}: {
  hoy: Date;
  ayer: Date;
  maniana: Date;
  diaIndex: number;
  setDiaIndex: (n: number) => void;
}) {
    return (
    <View className="flex-row items-center justify-between p-4">
      
        <Pressable onPress={() => diaIndex > 0 && setDiaIndex(diaIndex - 1)}>            
            <Icon as={ChevronLeft}/>
            <Text>{formatear_fecha(ayer)}</Text>
        </Pressable>
        
        <View>
            <Text className="text-2xl font-bold">{formatear_fecha(hoy)}</Text>
        </View>

        <Pressable onPress={() => diaIndex < 2 && setDiaIndex(diaIndex + 1)}>            
            <Text>{formatear_fecha(maniana)}</Text>
            <Icon as={ChevronRight}/>
        </Pressable>

    </View>
  )
}

const formatear_fecha = (fecha: Date) => {
    return `${fecha.getDate()}/${fecha.getMonth() + 1}`
}