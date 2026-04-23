import ProveedorDeTemaClaroOscuro from '../src/componentes/contenido/tema_claro_oscuro/index';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

const App = () => {
  return (  
    <ProveedorDeTemaClaroOscuro>
      <Text style={{ color: 'red' }}>Hola</Text>
    </ProveedorDeTemaClaroOscuro>
  );
};


export default App;
