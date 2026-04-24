import { Text } from "@/components/ui/text";
import { Icon } from "@/components/ui/icon"; 
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { Pressable, View } from "react-native";

export default function BotonesDeNavegacionPorDias({hoy, ayer, maniana}: {hoy:Date, ayer:Date, maniana:Date}) {
  return (
    <View className="flex-row items-center justify-between p-4">
      
        <Pressable className="flex-row items-center space-x-2">
            <Icon as={ChevronLeft}/>
            <Text>{formatear_fecha(ayer)}</Text>
        </Pressable>
        
        <View>
            <Text className="text-2xl font-bold">{formatear_fecha(hoy)}</Text>
        </View>

        <Pressable className="flex-row items-center space-x-2">
            <Text>{formatear_fecha(maniana)}</Text>
            <Icon as={ChevronRight}/>
        </Pressable>

    </View>
  )
}

const formatear_fecha = (fecha: Date) => {
    return `${fecha.getDate()}/${fecha.getMonth() + 1}`
}