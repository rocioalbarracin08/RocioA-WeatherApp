import { ErrorBoundaryProps } from 'expo-router'
import React from 'react'
import { Text } from '@/components/ui/text'
import { View } from 'react-native'

export const FeedbackDeErrorPorDefecto = ({ error, retry }: ErrorBoundaryProps) => {
  return (
    <View>
        <Text>¡Ops! Algo salió mal</Text>
    </View>
  );
}

export default FeedbackDeErrorPorDefecto