import usarPronosticoClimatico from '@/src/hooks/clima';
import React from 'react'
import { Text } from 'react-native'

const EncabezadoDeCiudad = ({ ciudad }: { ciudad: string }) => {

  return (
    <Text testID="header-city">{ciudad}</Text>
  )
}

export default EncabezadoDeCiudad