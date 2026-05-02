import React, { PropsWithChildren } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const LayoutParaPantallaPrincipalDelClima = ({ children }: PropsWithChildren) => {
  return (
    <SafeAreaView style={{ flex: 1, position: 'relative' }}>
      {children}
    </SafeAreaView>
  )
}

export default LayoutParaPantallaPrincipalDelClima