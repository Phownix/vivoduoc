import { View, ScrollView ,Text, StyleSheet } from 'react-native';
import BackToHome from '../components/backToHome';
import Nav from '../components/nav';

export default function Assistance() {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackToHome>Asistencia</BackToHome>
      </View>
      <ScrollView style={styles.main}>
        <Text>Asistencia</Text>
      </ScrollView>
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
})