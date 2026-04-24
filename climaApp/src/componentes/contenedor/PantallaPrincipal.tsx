import React, { PropsWithChildren } from 'react'
import { View } from 'react-native'

const PantallaPrincipal = ({ children }:  PropsWithChildren ) => {
  return (
    <View testID="screen-weather"> {children}
    </View>
  )
}

export default PantallaPrincipal