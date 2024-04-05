import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, Modal, Text, TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';
import TimeTable from './timetable';
import Close from '../icons/close';
import { StatusBar } from 'expo-status-bar';

interface Course {
  nombre: string;
  horaInicio: string;
  horaFin: string;
  seccion: string;
  profesor: string;
  sala: string;
  sede: string;
}

interface Day {
  dia: string;
  ramos: Course[];
}

interface Career {
  dias: Day[];
}

export default function HorarioPage() {
  const [eventSelected, setEventSelected] = useState<Course | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [Horario, setHorario] = useState<Career[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener la ruta del archivo JSON
        const directory = FileSystem.documentDirectory + 'data/';
        const fileName = 'horario.json';
        const filePath = directory + fileName;

        // Verificar si el archivo existe
        const fileInfo = await FileSystem.getInfoAsync(filePath);
        if (fileInfo.exists) {
          // Si el archivo existe, leer su contenido
          const fileContent = await FileSystem.readAsStringAsync(filePath);
          const jsonData = JSON.parse(fileContent);
          setHorario(jsonData);
        } else {
          console.log('El archivo horario.json no existe.');
        }
      } catch (error) {
        console.error('Error al leer el archivo:', error);
      } finally {
      }
    };

    fetchData();
  }, []);


  const convertSchedule = () => {
    let events = [];
  
    Horario.forEach(carrera => {
      carrera.dias.forEach(dia => {
        if (dia.dia !== '7') {
          dia.ramos.forEach(ramo => {
            events.push({
              courseId: ramo.nombre,
              day: parseInt(dia.dia),
              startTime: ramo.horaInicio,
              endTime: ramo.horaFin,
               color: '#005bb5',
            });
          });
        }
      });
    });
  
    return events;
  };

  const getEventInfo = event => {
    if (event) {
      const { courseId, day, startTime } = event;
      
      for (let carrera of Horario) {
        for (let dia of carrera.dias) {
          if (dia.dia === `${day}` && dia.dia !== '7') {
            for (let ramo of dia.ramos) {
              if (ramo.nombre === courseId && ramo.horaInicio === startTime) {
                return ramo;
              }
            }
          }
        }
      }
    }
    return null;
  };

  const EventDetail = ({ event }) => {
    if (event) {
      return (
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
            <View style={styles.modalMain}>
              <View>
                <View>
                  <Text style={styles.title}>Horario</Text>
                  <Text style={styles.subTitle}>{event.horaInicio} a {event.horaFin}</Text>
                </View>
                <View>
                  <Text style={styles.title}>Asignatura</Text>
                  <Text style={styles.subTitle}>{event.nombre}</Text>
                </View>
                <View>
                  <Text style={styles.title}>Sección</Text>
                  <Text style={styles.subTitle}>{event.seccion}</Text>
                </View>
                <View>
                  <Text style={styles.title}>Profesor</Text>
                  <Text style={styles.subTitle}>{event.profesor}</Text>
                </View>
                <View>
                  <Text style={styles.title}>Sala</Text>
                  <Text style={styles.subTitle}>{event.sala}</Text>
                </View>
                <View>
                  <Text style={styles.title}>Sede</Text>
                  <Text style={styles.subTitle}>{event.sede}</Text>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      );
    }
    return null;
  };

  return (
    <View>
      {modalVisible && <StatusBar style="dark" backgroundColor="rgba(0, 0, 0, 0.483)" />}
      <View style={styles.timeTableContainer}>
        <TimeTable
          theme={{ primary: '#012C56', accent: 'rgb(252, 189, 27)' }}
          configs={{ endHour: 23, numOfDays: 6 }}
          events={convertSchedule()}
          eventOnPress={event => {
            setEventSelected(event);
            setModalVisible(true);
          }}
        />
      </View>
      <EventDetail event={getEventInfo(eventSelected)} />
    </View>
  );
}

const styles = StyleSheet.create({
  horarioContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  timeTableContainer: {
    flex: 1,
    width: '100%',
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
    padding: 20
  },
  containerClose: {
    position: 'absolute',
    zIndex: 2,
    right: 20,
    top: 120,
    width: 64,
    height: 64,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subTitle: {
    color: '#fff',
    fontSize: 14,
    paddingVertical: 5,
  }
});