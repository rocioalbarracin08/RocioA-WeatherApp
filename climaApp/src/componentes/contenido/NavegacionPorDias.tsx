import { Text, Pressable, View } from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { useColorScheme } from "nativewind";

const ETIQUETAS = ['Ayer', 'Hoy', 'Mañana'];

export default function BotonesDeNavegacionPorDias({
  hoy, ayer, maniana, diaIndex, setDiaIndex
}: {
  hoy: Date; ayer: Date; maniana: Date;
  diaIndex: number; setDiaIndex: (n: number) => void;
}) {
  const { colorScheme } = useColorScheme();
  const color = colorScheme === 'dark' ? '#ffffff' : '#000000';
  const colorTenue = colorScheme === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';

  const dias = [ayer, hoy, maniana];
  const diaActual = dias[diaIndex];
  const hayAnterior = diaIndex > 0;
  const haySiguiente = diaIndex < 2;

  const formatear = (fecha: Date) => `${fecha.getDate()}/${fecha.getMonth() + 1}`;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 }}>

      {hayAnterior ? (
        <Pressable onPress={() => setDiaIndex(diaIndex - 1)} style={{ flexDirection: 'row', alignItems: 'center', gap: 4, width: 80 }}>
          <ChevronLeft size={20} color={color} />
          <View>
            <Text style={{ fontSize: 11, color: colorTenue }}>{ETIQUETAS[diaIndex - 1]}</Text>
            <Text style={{ fontSize: 13, color }}>{formatear(dias[diaIndex - 1])}</Text>
          </View>
        </Pressable>
      ) : (
        <View style={{ width: 80 }} />
      )}

      {/* Centro */}
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 13, color: colorTenue, fontWeight: '500' }}>{ETIQUETAS[diaIndex]}</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color }}>{formatear(diaActual)}</Text>
      </View>

      {haySiguiente ? (
        <Pressable onPress={() => setDiaIndex(diaIndex + 1)} style={{ flexDirection: 'row', alignItems: 'center', gap: 4, width: 80, justifyContent: 'flex-end' }}>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 11, color: colorTenue }}>{ETIQUETAS[diaIndex + 1]}</Text>
            <Text style={{ fontSize: 13, color }}>{formatear(dias[diaIndex + 1])}</Text>
          </View>
          <ChevronRight size={20} color={color} />
        </Pressable>
      ) : (
        <View style={{ width: 80 }} />
      )}

    </View>
  );
}