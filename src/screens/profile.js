import { useEffect, useState } from 'react';
import { View, ScrollView ,Text, Image,Alert } from 'react-native';
import StyleSheet from 'react-native-media-query';
import Constants from 'expo-constants';
import Loading from '../components/loading';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Barcode } from 'expo-barcode-generator';
import VerifyToken from '../middleware/verifyToken';
import BackToHome from '../components/backToHome';
import Logout from '../components/logout'
import Nav from '../components/nav';

export default function Profile() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const navigation = useNavigation();

  VerifyToken('Login');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        const id = await AsyncStorage.getItem('idAlumno');

        if (token && id) {
          const urlProfile = process.env.EXPO_PUBLIC_PROFILE_ENDPOINT;
          const response = await fetch(`${urlProfile}=${id}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (response.ok) {
            const jsonData = await response.json();
            setData(jsonData);
            console.log('Datos del alumno:', jsonData);
          } else {
            console.error('Error al obtener los datos del alumno:', response.status);
            await AsyncStorage.setItem('expired', 'true');
            await AsyncStorage.removeItem('access_token');
            await AsyncStorage.removeItem('idAlumno');
            await AsyncStorage.removeItem('codAlumno');
            await AsyncStorage.removeItem('rut');
            navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
            setError(true);
          }
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        await AsyncStorage.removeItem('access_token');
        await AsyncStorage.removeItem('idAlumno');
        await AsyncStorage.removeItem('codAlumno');
        await AsyncStorage.removeItem('rut');
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function formatearRUT(rut) {
    rut = rut.replace(/[^\dKk]/g, '');
    var rutSinDV = rut.slice(0, -1);
    var dv = rut.slice(-1).toUpperCase();
    rutFormateado = rutSinDV.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '-' + dv;
    return rutFormateado;
  }

  let rutFormateado = '';

  if (data && data.rut) { 
    rutFormateado = formatearRUT(data.rut);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark"/>
      <View style={styles.header}>
        <BackToHome>Perfil Duoc</BackToHome>
        <Logout/>
      </View>
      {error ? (
        <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.errorText}>No se ha podido conectar con el servidor de DuocUc. Por favor, inténtelo de nuevo más tarde.</Text>
        </ScrollView>
      ) : (
        loading ? (
          <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Loading/>
          </ScrollView>
        ) : (
          data && data.nombreCompleto && (
            <>
              <View style={styles.main}>
                <View style={styles.profileContent}>
                  <Image
                    style={styles.profileImage}
                    source={require('../../assets/profile.png')}
                  />
                  <View>
                    <Text style={styles.profileName}>{data?.nombreCompleto}</Text>
                    <Text style={styles.profileRut}>{rutFormateado}</Text>
                  </View>
                </View>
              </View>
              <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 90 }}>
                <View style={styles.contentCode}>
                  <Text style={styles.credential}>Credencial Virtual</Text>
                  <Barcode
                    value={`${data.rut}`}
                    options={{ format: 'CODE128', displayValue: 'false'  }}
                  />
                </View>
              </ScrollView>
            </>
          )
        )
      )}
      <Nav/>
    </View>
  );
}

const { styles } = StyleSheet.create({
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
    paddingHorizontal: 10,
  },
  profileContent: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#012C56',
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderRadius: 10,
    paddingVertical: 20,
    marginTop: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    '@media (max-width: 360px)': {
      width: 80,
      height: 80,
    },
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    '@media (max-width: 479px)': {
      width: 250,
    },
    '@media (max-width: 360px)': {
      width: 170,
    },
  },
  profileRut: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  profileCareer: {
    fontSize: 14,
    marginTop: 5,
  },
  contentCode: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  credential: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 10,
  }
})