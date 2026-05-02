import { Pressable } from "react-native";
import { Icon } from "@/components/ui/icon";
import { Sun, Moon } from "lucide-react-native";
import { useColorScheme } from "nativewind";

export default function BotonDeTema() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Pressable
      onPress={toggleColorScheme}
      style={{
        position: 'absolute',
        bottom: 32,
        right: 24,
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: colorScheme === 'dark' ? '#ffffff20' : '#00000015',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon as={colorScheme === 'dark' ? Sun : Moon} size={22} />
    </Pressable>
  );
}