import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, ScrollView ,Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BackToHome from '../components/backToHome';
import Nav from '../components/nav';

export default function Assistance() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

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
            setData(jsonData[0]);
            console.log(jsonData[0])
          } else {
            console.error('Error al obtener los datos del alumno:', response.status);
          }
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      } finally {
        setLoading(false); // Finaliza el estado de carga, independientemente del resultado
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="dark"/>
      <View style={styles.header}>
        <BackToHome>Asistencias</BackToHome>
      </View>
      {loading ? (
        <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="rgb(252, 189, 27)" />
        </ScrollView>
      ) : (
        <ScrollView>
          <View style={styles.titleHeader}>
            <Text style={styles.titleHeaderText}>
              {data.nomCarrera}
            </Text>
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
    marginTop: 50,
    paddingHorizontal: 10,
  },
  titleHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  titleHeaderText: {
    backgroundColor: '#012C56',
    width: '90%',
    textAlign: 'center',
    padding: 8,
    borderRadius: 10,
    color: '#ffff',
    fontSize: 15,
  },
  main: {
    paddingHorizontal: 10,
  },	
})