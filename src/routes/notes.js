import { View,ScrollView, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Nav from '../components/nav';

export default function Notes() {

  return (
    <View style={styles.container}>
      <StatusBar style="dark"/>
      <ScrollView style={styles.main}>
        <Text>Notas</Text>
      </ScrollView>
      <Nav/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  main: {
    marginTop: 50,
    paddingHorizontal: 10,
  },
})