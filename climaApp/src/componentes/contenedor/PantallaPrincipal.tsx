import React, { ReactNode } from 'react'
import { View } from 'react-native'

const PantallaPrincipal = ({ children }: { children : ReactNode}) => {
  return (
    <View testID="screen-weather"> {children}
    </View>
  )
}

export default PantallaPrincipal