import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Nav from '../components/nav';

export default function Home() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark"/>
      <ScrollView nestedScrollEnabled={true} style={styles.main}>
 
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