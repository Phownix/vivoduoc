import { useCallback, useState } from 'react';
import { ALERT_TYPE, AlertNotificationRoot, Toast } from '../components/notifications';
import * as LocalAuthentication from 'expo-local-authentication';
import * as FileSystem from 'expo-file-system';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Barcode } from 'expo-barcode-generator';
import VerifyToken from '../middleware/verifyToken';
import Constants from 'expo-constants';
import { vh } from 'react-native-expo-viewport-units';
import { StatusBar } from 'expo-status-bar';

import BackToHome from '../components/backToHome';
import PadLock from '../icons/padlock';
import Info from '../icons/info';

export default function Notes() {
  const navigation = useNavigation();
  const [authenticated, setAuthenticated] = useState(false);
  const [data, setData] = useState({});

  VerifyToken('Login');

  useFocusEffect(
    useCallback(() => {
        async function unLockScreen() {
            try {
                const isBiometricAvailable = await LocalAuthentication.isEnrolledAsync();
                const hasPasscode = await LocalAuthentication.hasHardwareAsync();

                if (!isBiometricAvailable && !hasPasscode) {
                    setAuthenticated(true);
                    Toast.show({
                      type: ALERT_TYPE.SUCCESS,
                      title: 'Acceso Permitido',
                      textBody: 'Ahora puedes ver tu credencial virtual.',
                    })
                    return;
                }

                const promptMessage = isBiometricAvailable
                    ? 'Desbloquea para ver el contenido'
                    : 'Por favor, ingresa tu contraseña, patrón o PIN';

                const { success, error } = await LocalAuthentication.authenticateAsync({
                    promptMessage,
                    fallbackLabel: 'Usar contraseña',
                });

                if (success) {
                    setAuthenticated(true);
                    Toast.show({
                      type: ALERT_TYPE.SUCCESS,
                      title: 'Acceso Permitido',
                      textBody: 'Ahora puedes ver tu credencial virtual.',
                    })
                  } else if (error === 'user_cancel') {
                    navigation.navigate('Profile');
                  } else {
                    console.log('Autenticación cancelada o error:', error);
                  }
            } catch (error) {
                console.error('Error al autenticar:', error);
            }
        }

        async function initData () {
            const directory = FileSystem.documentDirectory + 'data/';
            const fileName = 'profile.json';
            const filePath = directory + fileName;
            try {
              const directoryInfo = await FileSystem.getInfoAsync(directory);
              if (!directoryInfo.exists) {
                await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
              }
        
              const fileInfo = await FileSystem.getInfoAsync(filePath);
              if (fileInfo.exists) {
                const fileContent = await FileSystem.readAsStringAsync(filePath);
                const profileJson = JSON.parse(fileContent);
                console.log('Datos cargados desde el archivo JSON.');
                setData(profileJson);
              } else {
                console.log('El archivo JSON no existe en el directorio.');
                navigation.navigate('Profile');
              }
            } catch (error) {
              console.error('Error al inicializar los datos:', error);
              setError(true);
            }
          };

        initData();

        setTimeout(() => {
            unLockScreen();
        }, 500);
    }, [])
  )

  return (
    <View style={styles.container}>
      <StatusBar style="dark"/>
      <AlertNotificationRoot theme="light">
        <View style={styles.header}>
            <BackToHome route="Profile">Credencial Virtual</BackToHome>
            {authenticated && <TouchableOpacity onPress={() => {
              Alert.alert(
                'Información:',
                'Este código podría ser solicitado en el ingreso a la sede o la biblioteca',
                [
                  {
                    text: 'Aceptar',
                  },
                ],
                { cancelable: false }
              );
            }}>
                <Info/>
            </TouchableOpacity>}
        </View>
        {authenticated ? 
            <View style={styles.main}>
                <View style={styles.contentCode}>
                    <Barcode
                      value={`${data.rut}`}
                      options={{ format: 'CODE128',  displayValue: 'false'}}
                    />
                </View>
            </View>
            :
            <View style={styles.main}>
                <PadLock/>
            </View>
        }
      </AlertNotificationRoot>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Constants.statusBarHeight + 15,
    paddingHorizontal: 10,
  },
  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 10,
    height: vh(85),
  },
  credential: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
})