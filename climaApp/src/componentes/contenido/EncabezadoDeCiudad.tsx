import { Text } from 'react-native';
import { useColorScheme } from 'nativewind';

const EncabezadoDeCiudad = ({ ciudad }: { ciudad: string | null }) => {
  const { colorScheme } = useColorScheme();

  return (
    <Text style={{
      fontSize: 30,
      fontWeight: '500',
      textAlign: 'center',
      color: colorScheme === 'dark' ? '#ffffff' : '#000000',
      opacity: 0.85,
    }} className="items-center my-3">
      {ciudad}
    </Text>
  );
};

export default EncabezadoDeCiudad;