import React, { useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';

const ClaseItem = ({ classItem, index }) => {
  const translateY = useSharedValue(100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      translateY.value = withTiming(0, { duration: 500 });
      opacity.value = withTiming(1, { duration: 500 });
    }, index * 500);
    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={[styles.classItem, animatedStyle]}>
      <Text style={styles.hour}>{classItem.horaInicio} a {classItem.horaFin}</Text>
      <Text style={styles.className}>{classItem.nombre}</Text>
      <Text style={styles.subText}>{classItem.seccion}</Text>
      <Text style={styles.subText}>Profesor: {classItem.profesor}</Text>
      <Text style={styles.subText}>Sala: {classItem.sala}</Text>
      <Text style={styles.subText}>Sede: {classItem.sede}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
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
});

export default ClaseItem;