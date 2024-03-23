import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import LogoutIcon from '../icons/logout'

const Logout = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      // Eliminar los datos de acceso del AsyncStorage
      await AsyncStorage.removeItem('access_token');
      await AsyncStorage.removeItem('idAlumno');
      await AsyncStorage.removeItem('codAlumno');
      await AsyncStorage.removeItem('rut');

      // Redirigir al usuario a la pantalla de inicio de sesión
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <TouchableOpacity onPress={handleLogout}>
      <LogoutIcon/>
    </TouchableOpacity>
  );
};

export default Logout;