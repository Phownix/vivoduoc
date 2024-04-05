import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import LogoutIcon from '@/icons/logout'
import StyleSheet from 'react-native-media-query';

interface INavigationProps {
  reset: (props: { index: number; routes: { name: string }[] }) => void;
  navigate: (name: string) => void;
}

const Logout = () => {
  const navigation = useNavigation<INavigationProps>();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('access_token');
      await AsyncStorage.removeItem('idAlumno');
      await AsyncStorage.removeItem('codAlumno');
      await AsyncStorage.removeItem('rut');
      
      navigation.reset({ index: 0, routes: [{ name: 'Login' }]});
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <TouchableOpacity style={styles.btn} onPress={handleLogout}>
      <LogoutIcon/>
      <Text style={styles.textBtn}>Cerrar Sesión</Text>
    </TouchableOpacity>
  );
};

export default Logout;

const { styles } = StyleSheet.create({
  btn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRadius: 10,
    marginTop: 20,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderColor: '#adadad',
    gap: 7,
    paddingHorizontal: 10,
  },
  textBtn: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  }
})