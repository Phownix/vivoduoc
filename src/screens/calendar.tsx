import React, { useState, useEffect } from 'react';
import { View, ScrollView, RefreshControl, Text } from 'react-native';
import StyleSheet from 'react-native-media-query';
import Constants from 'expo-constants';
import Loading from '../components/loading';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackToHome from '../components/backToHome';
import ClaseItem from '../components/classItem';
import Calendary from '../components/calendary';
import Dropdown from '../components/dropdown';
import Nav from '../components/nav';

const options: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Semana'];

interface INavigationProps {
  reset: (props: { index: number; routes: { name: string }[] }) => void;
  navigate: (name: string) => void;
}

const Calendar: React.FC = () => {
  const [horario, setHorario] = useState<any | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedDay, setSelectedDay] = useState<string>('Semana');
  const [error, setError] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const navigation = useNavigation<INavigationProps>();

  const onRefresh = () => {
    setRefreshing(true);
    setLoading(true);
    setHorario([]);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
    fetchData();
  };

  // Función para manejar el scroll
  const handleScroll = (event: any) => {
    const { contentOffset } = event.nativeEvent;
    if (contentOffset.y <= -100) {
      onRefresh();
    }
  };

  // Función para obtener los datos del horario desde la API
  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      const id = await AsyncStorage.getItem('idAlumno');

      console.log('consiguiendo datos del alumno en la API...');

      if (token && id) {
        const urlCalendary = process.env.EXPO_PUBLIC_CALENDAR_ENDPOINT;

        const response = await fetch(`${urlCalendary}=${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const jsonData = await response.json();
          setHorario(jsonData[0]);
          const directory = FileSystem.documentDirectory + 'data/';
          const fileName = 'horario.json';
          const filePath = directory + fileName;
          await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
          await FileSystem.writeAsStringAsync(filePath, JSON.stringify(jsonData));
          console.log('horario guardado en:', filePath);
        } else {
          console.error('Error al obtener los datos del alumno:', response.status);
          await AsyncStorage.setItem('expired', 'true');
          await AsyncStorage.multiRemove(['access_token', 'idAlumno', 'codAlumno', 'rut']);
          navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        }
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      setError(true);
      await AsyncStorage.multiRemove(['access_token', 'idAlumno', 'codAlumno', 'rut']);
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    } finally {
      setLoading(false);
    }
  };

  // Función para inicializar los datos
  useEffect(() => {
    const initData = async () => {
      const directory = FileSystem.documentDirectory + 'data/';
      const fileName = 'horario.json';
      const filePath = directory + fileName;
      try {
        const directoryInfo = await FileSystem.getInfoAsync(directory);
        if (!directoryInfo.exists) {
          await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
        }

        const fileInfo = await FileSystem.getInfoAsync(filePath);
        if (fileInfo.exists) {
          const fileContent = await FileSystem.readAsStringAsync(filePath);
          const horarioJson = JSON.parse(fileContent);
          console.log('Datos cargados desde el archivo JSON.');
          setHorario(horarioJson[0]);
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
  }, []);

  // Función para capitalizar la primera letra de una cadena
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Función para manejar el cambio en el dropdown
  const handleDropdownChange = (value: string) => {
    setSelectedDay(value);
  };

  // Función para obtener las clases del día seleccionado
  const getClassesForSelectedDay = () => {
    const dayIndex = options.findIndex(option => option === selectedDay);
    const dayClasses = horario.dias ? horario.dias.find(day => day.dia === (dayIndex + 1).toString()) : null;
    return dayClasses ? dayClasses.ramos : [];
  };

  const classes = getClassesForSelectedDay();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <BackToHome route="Home">Horario</BackToHome>
        {horario && horario.nomCarrera && <Dropdown options={options} selectedValue={selectedDay} onValueChange={handleDropdownChange} />}
      </View>
      {error ? (
        <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>No se ha podido conectar con el servidor de DuocUc. Por favor, inténtelo de nuevo más tarde.</Text>
        </ScrollView>
      ) : (
        loading ? (
          <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#012C56']}
                progressBackgroundColor="rgb(252, 189, 27)"
              />
            }
          >
            <Loading/>
          </ScrollView>
        ) : (
          horario && horario.nomCarrera && (
            <ScrollView 
              onScroll={handleScroll} 
              style={selectedDay === 'Semana' ? styles.mainWeek : styles.main} 
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={['#012C56']}
                  progressBackgroundColor="rgb(252, 189, 27)"
                />
              }
            >
              {selectedDay === 'Semana' ? (
                <Calendary />
              ) : (
                <View style={styles.classesContainer}>
                  {classes.length > 0 ? (
                    classes.map((classItem, index) => (
                      <ClaseItem key={index} classItem={classItem} />
                    ))
                  ) : (
                    <View style={styles.noClasses}>
                      <Text>No se registran clases programadas.</Text>
                    </View>
                  )}
                </View>
              )}
            </ScrollView>
          )
        )
      )}
      <Nav />
    </View>
  );
};

export default Calendar;

const { styles }= StyleSheet.create({
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
  mainWeek: {
    marginTop: 10
  },
  containerDrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedOptionContainer: {
    marginTop: 20,
  },
  classesContainer: {
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  noClasses: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  }
})