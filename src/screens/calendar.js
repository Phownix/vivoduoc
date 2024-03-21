import { useState, useEffect } from 'react';
import { ActivityIndicator, View ,ScrollView, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackToHome from '../components/backToHome';
import Calendary from '../components/calendary';
import Dropdown from '../components/dropdown';
import Nav from '../components/nav';

const options = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Semana'];

const Calendar = () => {
  const [horario, setHorario] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState('Semana');
  const [error, setError] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        const id = await AsyncStorage.getItem('idAlumno');

        if (token && id) {
          const urlCalendary = process.env.EXPO_PUBLIC_CALENDAR_ENDPOINT;

          const response = await fetch(`${urlCalendary}=${id}`,  {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (response.ok) {
            const jsonData = await response.json();
            setHorario(jsonData[0]);
            const directory = FileSystem.documentDirectory + 'data/';
            console.log(directory)
            const fileName = 'horario.json';
            const filePath = directory + fileName;
            await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
            await FileSystem.writeAsStringAsync(filePath, JSON.stringify(jsonData));
          } else {
            console.error('Error al obtener los datos del alumno:', response.status);
          }
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        setError(true)
        await AsyncStorage.removeItem('access_token');
        await AsyncStorage.removeItem('idAlumno');
        await AsyncStorage.removeItem('codAlumno');
        await AsyncStorage.removeItem('rut');
        navigation.navigate('Login');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const today = new Date();
    const options = { weekday: 'long', locale: 'es' };
    const dayOfWeek = today.getDay();

    if (dayOfWeek === 0) {
      setSelectedDay('Semana');
    } else {
      setSelectedDay(capitalizeFirstLetter(today.toLocaleDateString('es', options)));
    }
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleDropdownChange = (value) => {
    setSelectedDay(value);
  };

  const getClassesForSelectedDay = () => {
    const dayIndex = options.findIndex(option => option === selectedDay);
    const dayClasses = horario.dias ? horario.dias.find(day => day.dia === (dayIndex + 1).toString()) : null;
    return dayClasses ? dayClasses.ramos : [];
  };

  const classes = getClassesForSelectedDay();

  return (
    <View style={styles.container}>
      <StatusBar style="dark"/>
      <View style={styles.header}>
        <BackToHome style={styles.backText}>Horario</BackToHome>
        {horario && horario.nomCarrera && <Dropdown options={options} selectedValue={selectedDay} onValueChange={handleDropdownChange} />}
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
          horario && horario.nomCarrera && (
            <ScrollView style={selectedDay === 'Semana' ? styles.mainWeek : styles.main}>
              {selectedDay === 'Semana' ? (
                <Calendary horario={horario} />
              ) : (
                <View style={styles.classesContainer}>
                  {classes.length > 0 ? (
                    classes.map((classItem, index) => (
                      <View key={index} style={styles.classItem}>
                        <Text style={styles.hour}>{classItem.horaInicio} a {classItem.horaFin}</Text>
                        <Text style={styles.className}>{classItem.nombre}</Text>
                        <Text style={styles.subText}>{classItem.seccion}</Text>
                        <Text style={styles.subText}>Profesor: {classItem.profesor}</Text>
                        <Text style={styles.subText}>Sala: {classItem.sala}</Text>
                        <Text style={styles.subText}>Sede: {classItem.sede}</Text>
                      </View>
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
  classItem: {
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
  hour: {
    fontSize: 12,
    fontWeight: '900',
  },
  className: { 
    fontSize: 14,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 11,
    paddingVertical: 2,
  },
  noClasses: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  }
})