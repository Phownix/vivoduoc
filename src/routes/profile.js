import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, ScrollView ,Text, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Barcode } from 'expo-barcode-generator';
import BackToHome from '../components/backToHome';
import Logout from '../components/logout'
import Nav from '../components/nav';

export default function Profile() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

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

  function formatearRUT(rut) {
    // Eliminar caracteres que no sean números ni el guion
    rut = rut.replace(/[^\dKk]/g, '');
    
    // Separar el RUT y el dígito verificador
    var rutSinDV = rut.slice(0, -1);
    var dv = rut.slice(-1).toUpperCase();
    
    // Formatear el RUT con puntos y el guion
    rutFormateado = rutSinDV.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '-' + dv;
    
    return rutFormateado;
  }

  let rutFormateado = '';

  if (data && data.rut) { 
    rutFormateado = formatearRUT(data.rut);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackToHome>Perfil Duoc</BackToHome>
        <Logout/>
      </View>
      {loading ? ( // Verifica si se está cargando, muestra un indicador de carga
        <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="rgb(252, 189, 27)" />
        </ScrollView>
      ) : ( // Si no hay datos o no se pudo cargar, no renderiza
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
            <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
    fontSize: 22,
    fontWeight: 'bold',
    width: 200
  },
  profileRut: {
    fontSize: 16,
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