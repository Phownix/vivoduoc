import { useCallback } from 'react';
import { View,Text, ScrollView, Image,Linking,Button, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';
import StyleSheet from 'react-native-media-query';
import { StatusBar } from 'expo-status-bar';

import Greeting from '../components/greeting';

import Nav from '../components/nav';
import Bars from '../icons/bars';
import Spotify from '../icons/spotify';

const podcastURL = 'https://open.spotify.com/show/2qhwWynrwdxnAeFCZZndGx';

export default function Home() {
  const navigation = useNavigation();

  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(podcastURL);

    if (supported) {
      await Linking.openURL(podcastURL);
    }
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor='#012C56'/>
      <View style={styles.header}>
        <View>
          <Image 
            source={require('../../assets/vivoduoc.png')}
            style={{ width: 145, height: 25 }}
          />
        </View>
        <TouchableOpacity>
          <Bars/>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.main}>
          <Greeting/>
          <View style={styles.podcastContent}>
            <Text style={styles.podcastTitle}>Podcast ¡Vida en Curso!</Text>
            <Text style={styles.podcastDescription}>Hecho por estudiantes para estudiantes. Escucha el primer capítulo para aprender técnicas de estudio de manera entretenida.</Text>
            <View style={styles.poscastButtonContent}>
              <TouchableOpacity style={styles.podcastButton} onPress={handlePress}>
                <Spotify/>
                <Text style={styles.podcastButtonText}>Escuchar en Spotify</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.podcastButton} onPress={() => {
                navigation.navigate('Ava');
            }}>
                <Text>IR A AVA</Text>
              </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Nav/>
    </View>
  );
}

const {styles} = StyleSheet.create({
  container: {
    height: '100%'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    position: 'relative',
    marginTop: Constants.statusBarHeight,
    paddingVertical: 20,
    backgroundColor: '#012C56',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  main: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  podcastContent: {
    padding: 10,
    borderColor: 'rgba(0, 0, 0, 0.305)',
    borderRadius: 10,
    borderWidth: 2,
    marginTop: 25,
  },
  podcastTitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    paddingBottom: 10,
  },
  podcastDescription:{
    textAlign: 'center',
    paddingBottom: 10,
  },
  poscastButtonContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  podcastButton: {
    backgroundColor: '#1db954',
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  podcastButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});