import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Nav from '@/components/nav';

export default function App() {
  return (
    <>
        <StatusBar style="dark"/>
        <WebView
            style={styles.container}
            source={{ uri: 'https://campusvirtual.duoc.cl/' }}
        />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});