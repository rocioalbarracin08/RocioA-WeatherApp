import React, { ReactNode } from 'react'
import { View } from 'react-native'

const PantallaPrincipal = ({ children }: { children : ReactNode}) => {
//Si genera error, revisar cambiar el tipo de children a "PropsWithChildren"

  return (
    <View testID="screen-weather"> {children}
    </View>
  )
}

export default PantallaPrincipal