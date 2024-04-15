import { View,ScrollView, Text,TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useState, useCallback } from 'react';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';

import Loading from '@/components/loading';
import BackToHome from '@/components/backToHome';
import Nav from '@/components/nav';

import DropdownIcon from '@/icons/dropdown'
import DropdownReverseIcon from '@/icons/dropdown-reverse'

interface INotes {
  nomCarrera: string;
  asignaturas: {
    codAsignatura: string;
    nombre: string;
    promedio: string;
  }[];
}

export default function Notes() {
  const [data, setData] = useState<INotes[]>([]);
  const [selectedData, setSelectedData] = useState<INotes | null>(null);
  const [optionSelect, setOptionSelect] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      fetchData()
    } ,[])
  )

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      const codAlumno = await AsyncStorage.getItem('codAlumno');

      if (token && codAlumno) {
        const urlAssistance = process.env.EXPO_PUBLIC_NOTES_ENDPOINT;

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
        }
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark"/>
      <View style={styles.header}>
        <BackToHome route="Home">Notas</BackToHome>
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
        <ScrollView>
          <TouchableOpacity onPress={() => setOptionSelect(!optionSelect)} style={styles.titleHeaderContent}>
            <View style={styles.titleHeader}>
              <Text style={styles.titleHeaderText}>{selectedData?.nomCarrera}</Text>
              <View style={{ marginTop: optionSelect ? 0 : 5 }}>
                {optionSelect ? <DropdownReverseIcon /> : <DropdownIcon />}
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.asigMain}>
            {selectedData && selectedData.asignaturas.map((item, index) => (
              <TouchableOpacity style={styles.asignatureContainer} key={index}>
                <View>
                  <Text style={styles.titleAsignature}>{item.nombre}</Text>
                  <Text style={styles.subAsiganute}>{item.codAsignatura}</Text>
                  <Text style={styles.subAsiganute}>Promedio - {item.promedio = '0.0' ? '':item.promedio}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
      <Nav/>
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
    fontWeight: 'bold',
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
})