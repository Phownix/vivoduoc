import { useState,useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, ScrollView ,Text,RefreshControl, Image,TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';
import StyleSheet from 'react-native-media-query';
import Constants from 'expo-constants';
import Loading from '@/components/loading';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VerifyToken from '@/middleware/verifyToken';
import BackToHome from '@/components/backToHome';
import Logout from '@/components/logout'
import Nav from '@/components/nav';

import CredentialIcon from '@/icons/credential';
import HelIcon from '@/icons/help'

interface IDataProps {
  nombreCompleto: string;
  rut: string;
  avatar: string;
  carreras: {
    escuela: string;
    nomCarrera: string;
  }[];
}

interface INavigationProps {
  reset: (props: { index: number; routes: { name: string }[] }) => void;
  navigate: (name: string) => void;
}

export default function Profile () {
  const [data, setData] = useState<IDataProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const navigation = useNavigation<INavigationProps>();
  
  VerifyToken('Login');

  useFocusEffect(
    useCallback(() => {
      const initData = async () => {
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
            setLoading(false);
          } else {
            console.log('El archivo JSON no existe en el directorio.');
            fetchData();
          }
        } catch (error) {
          console.error('Error al inicializar los datos:', error);
          setError(true);
        }
      };
      initData();
    },[])
  )

  const onRefresh = () => {
    setRefreshing(true);
    setLoading(true);
    setData(null);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
    fetchData();
  };

  const handleScroll = (event: any) => {
    const { contentOffset } = event.nativeEvent;
    if (contentOffset.y <= -100) {
      onRefresh();
    }
  };

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
          const directory = FileSystem.documentDirectory + 'data/';
          const fileName = 'profile.json';
          const filePath = directory + fileName;
          await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
          await FileSystem.writeAsStringAsync(filePath, JSON.stringify(jsonData));
          console.log('profile guardado en:', filePath);
        } else {
          console.error('Error al obtener los datos del alumno:', response.status);
          await AsyncStorage.setItem('expired', 'true');
          await AsyncStorage.multiRemove(['access_token', 'idAlumno', 'codAlumno', 'rut']);
          navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
          setError(true);
        }
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      await AsyncStorage.multiRemove(['access_token', 'idAlumno', 'codAlumno', 'rut']);
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const formatearRUT = (rut: string) => {
    rut = rut.replace(/[^\dKk]/g, '');
    const rutSinDV = rut.slice(0, -1);
    const dv = rut.slice(-1).toUpperCase();
    const rutFormateado = rutSinDV.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '-' + dv;
    return rutFormateado;
  };

  let rutFormateado = '';

  if (data && data.rut) {
    rutFormateado = formatearRUT(data.rut);
  }

  let shortName = '';

  if (data && data.nombreCompleto) {
    const fullName = data?.nombreCompleto;
    const nameParts = fullName.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts[2] : '';
    shortName = `${firstName} ${lastName}`;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <BackToHome route="Home">Perfil Academico</BackToHome>
      </View>
      {error ? (
        <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.errorText}>No se ha podido conectar con el servidor de DuocUc. Por favor, inténtelo de nuevo más tarde.</Text>
        </ScrollView>
      ) : (
        loading ? (
        <ScrollView
          contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#012C56']}
              progressBackgroundColor="rgb(252, 189, 27)"
            />
          }
        >
          <Loading />
        </ScrollView>
      ) : (
        data && data.nombreCompleto && (
          <ScrollView
            onScroll={handleScroll}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#012C56']}
                progressBackgroundColor="rgb(252, 189, 27)"
                />
            }
          >
            <View style={styles.main}>
              <View style={styles.profileContent}>
                <View>
                  <Text style={styles.profileName}>{shortName}</Text>
                  <Text>{rutFormateado}</Text>
                </View>
                {data && data?.avatar ?
                  <Image
                    style={styles.profileImage}
                    source={{
                      uri: data.avatar,
                    }}
                  />
                  :
                  <Image
                    style={styles.profileImage}
                    source={require('../../assets/profile.png')}
                  />
                }
              </View>
              <View>
            </View>
                <View style={styles.degreeContent}>
                  <Text style={styles.school}>{data.carreras[0].escuela}</Text>
                  <Text style={styles.degree}>{data.carreras[0].nomCarrera}</Text>
                </View>
              </View>
              <View style={styles.subMain}>
                <TouchableOpacity style={styles.btn} onPress={() => {
                    navigation.navigate('Credential');
                }}>
                  <CredentialIcon />
                  <Text style={styles.textBtn}>Credencial Virtual</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                  <HelIcon />
                  <Text style={styles.textBtn}>Ayuda</Text>
                </TouchableOpacity>
                <Logout />
              </View>
            </ScrollView>
          )
        )
      )}
      <Nav />
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
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  profileImage: {
    borderRadius: 100,
    '@media (max-width: 1024px)': {
      width: 150,
      height: 150,
      borderRadius: 100,
    },
    '@media (max-width: 820px)': {
      width: 100,
      height: 100,
      borderRadius: 100,
    },
    '@media (max-width: 650px)': {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    '@media (max-width: 412px)': {
      width: 80,
      height: 80,
    },
  },
  profileName: {
    fontSize: 32,
    fontWeight: 'bold',
    '@media (max-width: 1024px)': {
      fontSize: 32,
    },
    '@media (max-width: 820px)': {
      fontSize: 26,
    },
    '@media (max-width: 479px)': {
      fontSize: 24,
      width: 250,
    },
    '@media (max-width: 412px)': {
      fontSize: 22,
      width: 170,
    },
  },
  degreeContent: {
    width: '100%',
    backgroundColor: '#012C56',
    padding: 5,
    marginTop: 20,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  school: {
    fontSize: 13,
    fontWeight: '500',
    color: '#dededefe',
    marginBottom: 2,
  },
  degree: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileRut: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    '@media (max-width: 820px)': {
      fontSize: 20,
    },
    '@media (max-width: 479px)': {
      fontSize: 16,
    },
    '@media (max-width: 412px)': {
      fontSize: 14,
    },
  },
  profileCareer: {
    fontSize: 14,
    marginTop: 5,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  contentBlur: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleBlur: {
    fontSize: 14,
    marginBottom: 10,
  },
  subMain: {
    paddingHorizontal: 10,
    marginTop: 30,
    borderTopColor: 'rgba(220, 220, 220, 0.586) ',
    borderTopWidth: 5,
  },
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
    marginLeft: 2,
  }
})