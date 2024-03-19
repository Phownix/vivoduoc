import React, { useState, useEffect } from 'react';
import { View,Image, TouchableOpacity, TextInput, Text, ScrollView , StyleSheet} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import ProfileIco from '../icons/profile';
import PasswordIco from '../icons/password'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const checkTokenAndNavigate = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        if (token) {
          navigation.navigate('Home');
        } else {
          console.log('No se encontró ningún token en AsyncStorage');
        }
      } catch (error) {
        console.error('Error al verificar el token:', error);
      }
    };
  
    checkTokenAndNavigate();
  }, []);

  const fetchProfile = async (token) => {
    const urlValidate = process.env.EXPO_PUBLIC_VALIDATE_USER;
    try {
      return await fetch(`${urlValidate}=${username}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Error al obtener la información del perfil:', error);
    }
  };

  const postData = async () => {
    try {
      const details = {
        client_id: 'bb866f59',
        client_secret: '348203126c1e175b7543c98cd347d910',
        grant_type: 'password',
        username: username,
        password: password,
      };

      let formBody = [];
      for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');

      const urlLogin = process.env.EXPO_PUBLIC_LOGIN_ENDPOINT;

      console.log(urlLogin)

      const response = await fetch(`${urlLogin}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
      });

      if (!response.ok) {
        console.error('Error en la solicitud POST:', response.status);
        return;
      }

      const responseData = await response.json();
      console.log(responseData);

      // Verificar la información del perfil
      const profileResponse = await fetchProfile(responseData.access_token);
      if (!profileResponse || !profileResponse.ok) {
        console.log('Error al obtener la información del perfil');
        return;
      }

      const profileData = await profileResponse.json();
      if (!profileData || !profileData.idAlumno || !profileData.codAlumno || !profileData.rut) {
        console.log('El perfil no contiene los datos necesarios');
        return;
      }

      // Guardar datos en AsyncStorage si el perfil es válido
      await AsyncStorage.setItem('access_token', responseData.access_token);
      await AsyncStorage.setItem('idAlumno', profileData.idAlumno.toString());
      await AsyncStorage.setItem('codAlumno', profileData.codAlumno);
      await AsyncStorage.setItem('rut', profileData.rut);

      setUsername('');
      setPassword('');

      // Navegar a Home
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light"/>
      <View style={styles.logoVivoDuoc}>
        <Image 
          source={require('../../assets/logo_vivoduoc.png')}
          style={{ width: 180, height: 43 }}
        />
      </View>
      <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View>
          <Text style={styles.inputText}>
              Correo
          </Text>
          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.input}
              onChangeText={(text) => setUsername(text)}
              value={username}
            />
            <View style={styles.Icon}>
              <ProfileIco iconColor="white"/>
            </View>
          </View>
          <Text style={styles.inputText}>
              Contraseña
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
            />
            <View style={styles.Icon}>
              <PasswordIco iconColor="white"/>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={postData}>
          <Text style={styles.loginText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.logoDuoc}>
        <Image 
          source={require('../../assets/logo_duoc_uc.png')}
          style={{ width: 180, height: 43 }}
        />
      </View>
      <View style={styles.background}>
        <Image
          source={require('../../assets/background.png')}
          style={{ width: '100%', height: '100%' }}
        />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    height: vh(105),
    backgroundColor: 'black',
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  input: {
    width: 300,
    height: 45,
    backgroundColor: '#012b56a2',
    paddingLeft: 40,
    borderRadius: 10,
    borderColor: '#012C56',
    borderWidth: 2,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  inputText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5
  },  
  Icon: {
    position: 'absolute',
    left: 10,
    top: 10,
    opacity: .8,
  },
  loginBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 300,
    height: 40,
    backgroundColor: 'rgb(252, 189, 27)',
    borderRadius: 10,
    marginTop: 10
  },
  loginText: {
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5
  },
  logoVivoDuoc: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 45
  },
  logoDuoc: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    opacity: 0.7
  }
});