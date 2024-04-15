import React, { useEffect, useState } from 'react';
import { TouchableOpacity, RefreshControl ,Modal ,View, ScrollView ,Text, StyleSheet, FlatList } from 'react-native';
import * as FileSystem from 'expo-file-system';
import Constants from 'expo-constants';
import Loading from '@/components/loading';
import VerifyToken from '@/middleware/verifyToken';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BackToHome from '@/components/backToHome';
import Nav from '@/components/nav';
import Close from '@/icons/close';

import DropdownIcon from '@/icons/dropdown'
import DropdownReverseIcon from '@/icons/dropdown-reverse'

interface ICarrera {
  nomCarrera: string;
  asistenciaAsignaturas: {
    cabecera: {
      nomAsignatura: string;
      codAsignatura: string;
      porcentaje: number;
      clasesAsistente: number;
      clasesRealizadas: number;
    };
    detalle?: {
      fechaLarga: string;
      asistencia: string;
    }[];
  }[];
}


interface INavigationProps {
  reset: (props: { index: number; routes: { name: string }[] }) => void;
  navigate: (name: string) => void;
}

export default function Assistance() {
  const [data, setData] = useState<ICarrera[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedData, setSelectedData] = useState<ICarrera | null>(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [optionSelect, setOptionSelect] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const navigation = useNavigation<INavigationProps>();

  VerifyToken('Login');
  const onRefresh = () => {
    setRefreshing(true);
    setLoading(true);
    setData([]);
    setSelectedData(null)
    setSelectedItem(null)

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

  useEffect(() => {
    const initData = async () => {
      const directory = FileSystem.documentDirectory + 'data/';
      const fileName = 'assistance.json';
      const filePath = directory + fileName;
      try {
        const directoryInfo = await FileSystem.getInfoAsync(directory);

        if (!directoryInfo.exists) {
          await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
        }
  
        const fileInfo = await FileSystem.getInfoAsync(filePath);
        if (fileInfo.exists) {
          const fileContent = await FileSystem.readAsStringAsync(filePath);
          const assistanceJson = JSON.parse(fileContent);
          console.log('Datos cargados desde el archivo JSON.');
          setData(assistanceJson);
          setSelectedData(assistanceJson[0]);
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
  }, [])

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      const codAlumno = await AsyncStorage.getItem('codAlumno');

      if (token && codAlumno) {
        const urlAssistance = process.env.EXPO_PUBLIC_ASSISTANCE_ENDPOINT;

        const response = await fetch(`${urlAssistance}=${codAlumno}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.ok) {
          const jsonData = await response.json();
          setSelectedData(jsonData[0]);
          setData(jsonData);
          const directory = FileSystem.documentDirectory + 'data/';
          const fileName = 'assistance.json';
          const filePath = directory + fileName;
          await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
          await FileSystem.writeAsStringAsync(filePath, JSON.stringify(jsonData));
          console.log('assistance guardado en:', filePath);
        } else {
          console.error('Error al obtener los datos del alumno:', response.status);
          await AsyncStorage.setItem('expired', 'true');
          await AsyncStorage.removeItem('access_token');
          await AsyncStorage.removeItem('idAlumno');
          await AsyncStorage.removeItem('codAlumno');
          await AsyncStorage.removeItem('rut');
          navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        }
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      setError(true);
      await AsyncStorage.removeItem('access_token');
      await AsyncStorage.removeItem('idAlumno');
      await AsyncStorage.removeItem('codAlumno');
      await AsyncStorage.removeItem('rut');
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    } finally {
      setLoading(false);
    }
  };

  const handlePress = (index:any) => {
    setModalVisible(true)
    setSelectedItem(selectedItem === index ? null : index);
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark" />
      {modalVisible && <StatusBar style="dark" backgroundColor="rgba(0, 0, 0, 0.483)" />}
      <View style={styles.header}>
        <BackToHome route="Home">Asistencias</BackToHome>
      </View>
      {error && !selectedData ? (
        <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>No se ha podido conectar con el servidor de DuocUc. Por favor, inténtelo de nuevo más tarde.</Text>
        </ScrollView>
      ) : loading ? (
        <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Loading />
        </ScrollView>
      ) : (
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
          <TouchableOpacity onPress={() => setOptionSelect(!optionSelect)} style={styles.titleHeaderContent}>
            <View style={styles.titleHeader}>
              <Text style={styles.titleHeaderText}>{selectedData?.nomCarrera}</Text>
              <View style={{ marginTop: optionSelect ? 0 : 5 }}>
                {optionSelect ? <DropdownReverseIcon /> : <DropdownIcon />}
              </View>
            </View>
          </TouchableOpacity>
          
          <View style={styles.asigMain}>
            {selectedData && selectedData.asistenciaAsignaturas.map((item, index) => (
              <TouchableOpacity style={styles.asignatureContainer} key={index} onPress={() => handlePress(index)}>
                <View>
                <Text style={styles.titleAsignature}>{item.cabecera.nomAsignatura}</Text>
                <Text style={styles.subAsiganute}>{item.cabecera.codAsignatura}</Text>
                <Text style={styles.porcentajeAsignature}>{item.cabecera.porcentaje}% ({item.cabecera.clasesAsistente} de {item.cabecera.clasesRealizadas} clases)</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <TouchableOpacity
              style={styles.containerClose}
              onPress={() => setModalVisible(false)}
            >
              <Close />
            </TouchableOpacity>
            <View style={styles.modalContainer}>
              <ScrollView style={styles.modalMain}>
                  {selectedData && selectedData.asistenciaAsignaturas.map((item, index) => (
                    selectedItem === index && (
                      <View key={index} style={{marginBottom: 35}}>
                        <Text style={styles.titleAsig}>{item.cabecera.nomAsignatura}</Text>
                          <View style={{...styles.contentData, marginBottom: 10}}>
                            <Text style={styles.titleData}>Fecha</Text>
                            <Text style={styles.titleData}>Asistencia</Text>
                          </View>
                          {item.detalle.map((detalleItem, detalleIndex) => (
                            <View key={detalleIndex} style={{...styles.contentData, marginBottom: 10}}>
                              <Text style={{maxWidth: '40%', color: 'white',  fontSize: 11}}>{detalleItem.fechaLarga}</Text>
                              <Text style={{color: 'white'}}>{detalleItem.asistencia = 1 ? 'Presente':'Ausente'}</Text>
                            </View>
                          ))}
                      </View>
                    )
                  ))}
              </ScrollView>
            </View>
          </Modal>

        </ScrollView>
      )}
      <Nav />
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
  titleHeaderContent:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  titleHeader: {
    width: '90%',
    backgroundColor: '#012C56',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleHeaderText: {
    padding: 8,
    borderRadius: 10,
    color: '#ffff',
    fontSize: 15,
  },
  asigMain: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  asignatureContainer: {
    borderLeftColor: '#012C56',
    borderLeftWidth: 5,
    borderBottomColor: '#012C56',
    borderBottomWidth: 2,
    marginTop: 7,
    marginBottom: 7,
    width: '90%',
    padding: 10,
    borderRadius: 10,
  },
    titleAsignature: {
    fontWeight: 'bold',
    paddingBottom: 2,
  },
  subAsiganute: {
    color: '#737373',
    fontSize: 12,
  },
  porcentajeAsignature: {
    paddingTop: 2,
  },
  contentData: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalContainer: {
    paddingHorizontal: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.483) ',
  },
  modalMain: {
    backgroundColor: '#012C56',
    width: '100%',
    borderRadius: 20,
    padding: 20,
    maxHeight: '60%',
  },
  containerClose: {
    position: 'absolute',
    zIndex: 2,
    right: 20,
    top: 60,
    width: 64,
    height: 64,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  titleAsig: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  titleData: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
})