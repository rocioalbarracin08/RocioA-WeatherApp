import { useFechas } from '@/src/hooks/dias';
import usarLocalizacion from '../../hooks/localizacion';
import { View } from 'react-native';
import TarjetaParaDatosClimaticos from '../contenido/TarjetaParaDatosClimaticos';

const PantallaPrincipal = () => {
  const { fecha } = useFechas();
  const { coordenadas, coordenadasDisponibles } = usarLocalizacion();

  const dataFechas = fecha();
  const coords = coordenadas();
  const disponible = coordenadasDisponibles();

  return (
    <View>
      {disponible && (
        <TarjetaParaDatosClimaticos
          fecha={dataFechas.hoy}
          latitud={coords.latitud}
          longitud={coords.longitud}
          clave_de_api={process.env.EXPO_PUBLIC_API_KEY as string}
        />
      )}
    </View>
  );
};

export default PantallaPrincipal;