import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import BackToHome from '../components/backToHome';
import { StatusBar } from 'expo-status-bar';
import Nav from '../components/nav';

export default function App() {
  return (
    <>
        <StatusBar style="light" backgroundColor='#545353'/>
        <WebView
            style={styles.container}
            source={{ uri: 'https://campusvirtual.duoc.cl/' }}
        />
        <Nav/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});