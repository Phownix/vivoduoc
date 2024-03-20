import { View,ScrollView, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import BackToHome from '../components/backToHome';
import Nav from '../components/nav';

export default function Notes() {

  return (
    <View style={styles.container}>
      <StatusBar style="dark"/>
      <View style={styles.header}>
        <BackToHome>Notas</BackToHome>
      </View>
      <ScrollView style={styles.main}>

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
})