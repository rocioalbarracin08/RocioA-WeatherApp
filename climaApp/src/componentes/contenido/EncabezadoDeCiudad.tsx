import { Text, View } from 'react-native';
import { useColorScheme } from 'nativewind';

const EncabezadoDeCiudad = ({ ciudad, region }: { ciudad: string | null, region: string | null }) => {
  const { colorScheme } = useColorScheme();
  const color = colorScheme === 'dark' ? '#ffffff' : '#000000';

  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ fontSize: 30, fontWeight: '500', color, opacity: 0.85, marginTop: 25 }}>
        {region}
      </Text>
      <Text style={{ fontSize: 17, color, opacity: 0.5 }}>
        {ciudad}
      </Text>
    </View>
  );
};

export default EncabezadoDeCiudad;