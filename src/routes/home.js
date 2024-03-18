import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Nav from '../components/nav';

export default function Home() {
  const [accessToken, setAccessToken] = useState('');
  const [idAlumno, setIdAlumno] = useState('');

  useEffect(() => {
    const getAccessTokenAndIdAlumno = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        const id = await AsyncStorage.getItem('idAlumno');

        setAccessToken(token || '');
        setIdAlumno(id || '');
      } catch (error) {
        console.error('Error al recuperar el token o el idAlumno:', error);
      }
    };

    getAccessTokenAndIdAlumno();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView nestedScrollEnabled={true} style={styles.main}>
        <Text>Access Token: {accessToken}</Text>
        <Text>ID Alumno: {idAlumno}</Text>
      </ScrollView>
      <Nav/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  main: {
    marginTop: 50,
    paddingHorizontal: 20,
  },
});