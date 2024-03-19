import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, ScrollView ,Text, Image, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Barcode } from 'expo-barcode-generator';
import BackToHome from '../components/backToHome';
import Logout from '../components/logout'
import Nav from '../components/nav';

export default function Profile() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
            setError(true);
          }
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
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
          <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="rgb(252, 189, 27)" />
          </ScrollView>
        ) : (
          data && data.nombreCompleto && (
            <>
              <View style={styles.profileContent}>
                <Image
                  style={styles.profileImage}
                  source={require('../../assets/profile.png')}
                />
                <View>
                  <Text style={styles.profileName}>{data?.nombreCompleto}</Text>
                  <Text style={styles.profileRut}>{rutFormateado}</Text>
                  <Text style={styles.profileCareer}>{data?.carreras[0].nomCarrera}</Text>
                </View>
              </View>
              <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 70 }}>
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
  main: {
    paddingHorizontal: 10,
  },
  profileContent: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#4a4a4a47',
    borderBottomWidth: 2,
    padding:10,
    
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    width: 200
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
  }
})