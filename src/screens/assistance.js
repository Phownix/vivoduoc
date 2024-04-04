import React, { useEffect, useState } from 'react';
import { TouchableOpacity, TouchableWithoutFeedback ,Modal ,View, ScrollView ,Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Loading from '../components/loading';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BackToHome from '../components/backToHome';
import Nav from '../components/nav';

import DropdownIcon from '../icons/dropdown'
import DropdownReverseIcon from '../icons/dropdown-reverse'

export default function Assistance () {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedData, setSelectedData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
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

    fetchData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <BackToHome route="Home">Asistencias</BackToHome>
      </View>
      {error && selectedData ? (
        <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.errorText}>No se ha podido conectar con el servidor de DuocUc. Por favor, inténtelo de nuevo más tarde.</Text>
        </ScrollView>
      ) : (
        loading ? (
          <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Loading />
          </ScrollView>
        ) : (
          <ScrollView>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.titleHeaderContent}>
              <View style={styles.titleHeader}>
                <Text style={styles.titleHeaderText}>{selectedData.nomCarrera}</Text>
                <View style={{ marginTop: modalVisible ? 0 : 5 }}>
                  {modalVisible ? <DropdownReverseIcon /> : <DropdownIcon />}
                </View>
              </View>
            </TouchableOpacity>

            <View style={styles.asigMain}>
              {selectedData.asistenciaAsignaturas && selectedData.asistenciaAsignaturas.map((asignatura, index) => (
                <TouchableOpacity key={index} style={styles.asignatureContainer}>
                  <Text style={styles.titleAsignature}>{asignatura.cabecera.nomAsignatura}</Text>
                  <Text style={styles.subAsiganute}>{asignatura.cabecera.codAsignatura}</Text>
                  <Text style={styles.porcentajeAsignature}>{asignatura.cabecera.porcentaje}% ({asignatura.cabecera.clasesAsistente} de {asignatura.cabecera.clasesRealizadas} clases)</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                <View style={styles.modalOverlay}>
                  <View style={styles.optionsContainer}>
                    <View style={styles.modalContent}>
                      <Text style={styles.titleModal}>Selecciona una carrera:</Text>
                      <ScrollView style={{ marginTop: 10 }}>
                        {data.map((carrera, index) => (
                          <TouchableOpacity
                            key={index}
                            style={styles.optionBtn}
                            onPress={() => {
                              setSelectedData(carrera);
                              setModalVisible(false);
                            }}
                          >
                            <Text style={selectedData.nomCarrera === carrera.nomCarrera ? styles.optionTextActive : styles.optionText}>{carrera.nomCarrera}</Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          </ScrollView>
        )
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
  modalOverlay: {
    height: '100%',
  },
  optionsContainer:{
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 120,
  },
  modalContent: {
    backgroundColor: '#012C56',
    height: 200,
    width: '90%',
    borderRadius: 10,
    padding: 10,
  },
  titleModal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffff',
    textAlign: 'center',
  },
  optionBtn: {
    paddingVertical: 5,
  },
  optionText: {
    color: '#ffff',
    fontSize: 18,
    textAlign: 'center',
  },
  optionTextActive: {
    color: 'rgb(252, 189, 27)',
    fontSize: 18,
    textAlign: 'center',
  },
  asigMain: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
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
  }
})