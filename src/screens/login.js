import React, { useState, useEffect } from 'react';
import {ActivityIndicator, View, Image, TouchableOpacity, TextInput, Text, ScrollView, StyleSheet} from 'react-native';
import { ALERT_TYPE, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import Animated, { useSharedValue, withSpring, useAnimatedStyle, interpolate, Extrapolate, withTiming } from 'react-native-reanimated';
import Checkbox from 'expo-checkbox';
import { StatusBar } from 'expo-status-bar';
import { vh } from 'react-native-expo-viewport-units';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import ProfileIco from '../icons/profile';
import PasswordIco from '../icons/password'
import LoginIcon from '../icons/login'
import Test from '../icons/test'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isSaveSession, setSaveSession] = useState(false);
  const [loading, setLoading] = useState(false);
  const scale = useSharedValue(0.5); 
  const translateY = useSharedValue(-100);
  const translateYFade = useSharedValue(-20);
  const opacity = useSharedValue(0); 
  const opacityFade = useSharedValue(0); 

  const navigation = useNavigation();

  useEffect(() => {
    scale.value = withSpring(1);
    translateY.value = withSpring(0, { damping: 10, stiffness: 100 });
    translateYFade.value = withTiming(0, { duration: 1000 });
    opacity.value = withSpring(1, { damping: 10, stiffness: 100 });
    opacityFade.value = withTiming(1, { duration: 1000 });
  }, []);

  // Estilo animado que se aplicará al View
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const animatedFade = useAnimatedStyle(() => {
    return {
      opacity: interpolate(opacityFade.value, [0, 1], [0, 1], Extrapolate.CLAMP),
      transform: [{ translateY: translateYFade.value }],
    };
  });

  const animatedTopStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: interpolate(opacity.value, [0, 1], [0, 1], Extrapolate.CLAMP),
    };
  });

  const fetchProfile = async (token) => {
    try {
      const urlValidate = process.env.EXPO_PUBLIC_VALIDATE_USER;

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
      setLoading(true);
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

        if (response.status === 401) {
          const errorResponse = await response.json();
          if (errorResponse.error === 'invalid_grant' && errorResponse.error_description === 'Invalid user credentials') {
            // Mostrar alerta de credenciales incorrectas
            Toast.show({
              type: ALERT_TYPE.WARNING,
              title: 'Datos Incorrectos',
              textBody: 'Usuario y/o contraseña incorrecta',
            })
            setLoading(false); 
            return;
          }
        }
        return;
      }

      const responseData = await response.json();
      console.log(responseData);

      // Verificar la información del perfil
      const profileResponse = await fetchProfile(responseData.access_token);
      if (!profileResponse || !profileResponse.ok) {
        console.log('Error al obtener la información del perfil');
        setLoading(false); 
        return;
      }

      const profileData = await profileResponse.json();
      console.log(profileData)
      if (!profileData || !profileData.idAlumno || !profileData.codAlumno || !profileData.rut) {
        console.log('El perfil no contiene los datos necesarios');
        setLoading(false); 
        return;
      }
      // Guardar datos en AsyncStorage si el perfil es válido
      await AsyncStorage.setItem('access_token', responseData.access_token);
      await AsyncStorage.setItem('idAlumno', profileData.idAlumno.toString());
      await AsyncStorage.setItem('codAlumno', profileData.codAlumno);
      await AsyncStorage.setItem('rut', profileData.rut);

      
      if (isSaveSession === true){
        await AsyncStorage.setItem('isSaveSession', 'true');
        console.log('Sesión guardada')
      }

      setUsername('');
      setPassword('');

      // Navegar a Home
      navigation.navigate('Home');
      setLoading(false); 
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      setLoading(false); 
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor='#184f8a'/>
      <AlertNotificationRoot theme="light">
        <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 50 }}>
          <View style={styles.logoVivoDuoc}>
            <Animated.View style={[animatedStyle]}>
              <Image 
                source={require('../../assets/logo_vivoduoc.png')}
                style={{ width: 185, height: 43 }}
              />
            </Animated.View>
          </View>
          <View>
            <Animated.Text style={[usernameFocused || username ? styles.inputTextSelected : styles.inputText, animatedFade]}>
                  Correo
            </Animated.Text>
            <Animated.View style={[styles.inputContainer, animatedFade]}>
              <TextInput 
                style={usernameFocused || username ? styles.inputSelected : styles.input}
                onChangeText={(text) => setUsername(text)}
                value={username}
                onFocus={() => setUsernameFocused(true)}
                onBlur={() => setUsernameFocused(false)}
              />
              <View style={styles.Icon}>
                <ProfileIco widthIcon={22} heightIcon={22} iconColor={`${usernameFocused || username ? "rgb(252, 189, 27)":"white"}`}/>
              </View>
            </Animated.View>
            <Animated.Text style={[passwordFocused || password ? styles.inputTextSelected : styles.inputText, animatedFade]}>
                Contraseña
            </Animated.Text>
            <Animated.View style={[styles.inputContainer, animatedFade]}>
              <TextInput
                style={passwordFocused || password ? styles.inputSelected : styles.input}
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={true}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
              />
            <View style={styles.Icon}>
              <PasswordIco iconColor={`${passwordFocused || password ? "rgb(252, 189, 27)":"white"}`}/>
            </View>
          </Animated.View>
        </View>
          <Animated.View style={[styles.saveSessionContent, animatedStyle]}>
            <Checkbox
              style={styles.saveSessionCheckbox}
              value={isSaveSession}
              onValueChange={setSaveSession}
              color={isSaveSession ? 'rgb(252, 189, 27)' : undefined}
            />
            <Text style={styles.saveSessionText}>Permanecer conectado</Text>
          </Animated.View>
          <Animated.View style={[animatedTopStyle]}>
            <TouchableOpacity style={!username || !password ? styles.loginDisabled : styles.loginBtn} onPress={postData}  disabled={!username || !password} >
              {loading ?
                <Text style={styles.loginText}>
                  <ActivityIndicator size="small" color="white" />
                </Text>
                :
                <>
                  <View style={styles.loginIcon}>
                    <LoginIcon/>
                  </View>
                  <Text style={styles.loginText}>
                      Iniciar Sesión
                  </Text>
                </>
              }
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </AlertNotificationRoot>
      <View style={styles.bg}>
        <Test/>
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
    height: 40,
    backgroundColor: '#ffffff24',
    paddingLeft: 40,
    borderRadius: 6,
    borderColor: '#adadada2',
    borderLeftWidth: 3,
    borderRightWidth: 3,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  inputSelected: {
    width: 300,
    height: 40,
    backgroundColor: '#ffffff24',
    paddingLeft: 40,
    borderRadius: 6,
    borderColor: 'rgb(252, 189, 27)',
    borderLeftWidth: 3,
    borderRightWidth: 3,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  inputTextSelected: {
    color: 'rgb(252, 189, 27)',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },  
  Icon: {
    position: 'absolute',
    left: 10,
    top: 10,
    opacity: .8,
  },
  loginDisabled: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 300,
    height: 40,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 7,
    marginTop: 15,
    opacity: .5
  },
  loginBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 300,
    height: 40,
    backgroundColor: 'rgba(252, 188, 27, 0.825)',
    borderColor: 'rgb(252, 189, 27)',
    borderWidth: 2,
    borderRadius: 7,
    marginTop: 15,
    position: 'relative',
  },
  loginIcon: {
    position: 'absolute',
    left: 10,
    top: 5,
  },
  loginText: {
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
  },
  logoVivoDuoc: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 45
  },
  logoDuoc: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  saveSessionContent: {
    width: 300,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
  },
  saveSessionCheckbox: {
    borderRadius: 50,
    borderColor: '#eee',
  },
  saveSessionText: {
    color: '#eee',
    fontSize: 16,
    fontWeight: 'bold',
  }
});