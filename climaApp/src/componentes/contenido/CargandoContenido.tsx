import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { useColorScheme } from 'nativewind'

const CargandoContenido = () => {
  const { colorScheme } = useColorScheme();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator 
        size="large" 
        color={colorScheme === 'dark' ? '#ffffff' : '#000000'} 
      />
    </View>
  )
}

export default CargandoContenido