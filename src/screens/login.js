import { useState, useEffect, useCallback } from 'react';
import {ActivityIndicator, View, Image, TouchableOpacity, TextInput, Text, ScrollView} from 'react-native';
import StyleSheet from 'react-native-media-query';
import { ALERT_TYPE, AlertNotificationRoot, Toast } from '../components/notifications';
import Animated, { useSharedValue, withSpring, useAnimatedStyle, interpolate, Extrapolate, withTiming } from 'react-native-reanimated';
import Checkbox from 'expo-checkbox';
import { StatusBar } from 'expo-status-bar';
import { vh } from 'react-native-expo-viewport-units';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

import ProfileIco from '../icons/profile';
import PasswordIco from '../icons/password'
import ViewIcon from '../icons/view'
import View2Icon from '../icons/view2'
import LoginIcon from '../icons/login'
import Test from '../icons/test'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isViewPass, setIsViewPass] = useState(false);
  const [isSaveSession, setSaveSession] = useState(false);
  const [loading, setLoading] = useState(false);
  const scale = useSharedValue(0.5); 
  const translateY = useSharedValue(-100);
  const translateYFade = useSharedValue(-20);
  const opacity = useSharedValue(0); 
  const opacityFade = useSharedValue(0); 

  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const checkTokenAndNavigate = async () => {
        try {
          const expired  = await AsyncStorage.getItem('expired');

          if(expired){
            Toast.show({
              type: ALERT_TYPE.WARNING,
              title: 'Sesión expirada',
              textBody: 'Por favor inicie sesión nuevamente',
            })
            await AsyncStorage.removeItem('expired');
          }

          console.log(expired)

          const token = await AsyncStorage.getItem('access_token');

          if (token) {
            navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
          }

          const savedSession = await AsyncStorage.getItem('isSaveSession');
          if (savedSession === 'true') {
            const savedUsername = await AsyncStorage.getItem('username');
            const savedPassword = await AsyncStorage.getItem('password');
            setUsername(savedUsername || '');
            setPassword(savedPassword || '');
            setSaveSession(savedSession);
          } else if (savedSession === 'false') {
            await AsyncStorage.removeItem('username');
            await AsyncStorage.removeItem('password');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
    
      checkTokenAndNavigate();
    }, [])
  );

  useEffect(() => {
    scale.value = withSpring(1);
    translateY.value = withSpring(0, { damping: 10, stiffness: 100 });
    translateYFade.value = withTiming(0, { duration: 1000 });
    opacity.value = withSpring(1, { damping: 10, stiffness: 100 });
    opacityFade.value = withTiming(1, { duration: 1000 });
  }, []);

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

  function handleViewPass() {
    setIsViewPass(!isViewPass);
  }

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
              textBody: 'Su correo o contraseña ingresada es incorrecta',
            })
            setLoading(false); 
            return;
          }
        }
        return;
      }

      const responseData = await response.json();

      // Verificar la información del perfil
      const profileResponse = await fetchProfile(responseData.access_token);
      if (!profileResponse || !profileResponse.ok) {
        console.log('Error al obtener la información del perfil');
        setLoading(false); 
        return;
      }

      const profileData = await profileResponse.json();
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

      console.log('Sesion Iniciada con exito!')
            
      if (isSaveSession){
        await AsyncStorage.setItem('isSaveSession', 'true');
        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('password', password);
        console.log('Sesión guardada')
      } else {
        await AsyncStorage.setItem('isSaveSession', 'false');
        console.log('Sesión no guardada')
      }

      setUsername('');
      setPassword('');

      // Navegar a Home
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
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
                style={styles.logo}
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
                style={passwordFocused || password ? styles.inputPassSelected : styles.inputPass}
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={isViewPass ? false:true}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
              />
            <View style={styles.Icon}>
              <PasswordIco iconColor={`${passwordFocused || password ? "rgb(252, 189, 27)":"white"}`}/>
            </View>
            {password.length >= 1 && <TouchableOpacity style={styles.IconView} onPress={handleViewPass}>
              {isViewPass ? 
                <View2Icon iconColor={`${passwordFocused || password ? "rgb(252, 189, 27)":"white"}`}/>
                :
                <ViewIcon iconColor={`${passwordFocused || password ? "rgb(252, 189, 27)":"white"}`}/>
              }
            </TouchableOpacity>}
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

const { styles }= StyleSheet.create({
  container: {
    height: vh(105),
    backgroundColor: 'black',
  },
  logo: {
    '@media (max-width: 1024px)': {
      width: 320,
      height: 60,
    },
    '@media (max-width: 768px)': {
      width: 260,
      height: 50,
    },
    '@media (max-width: 430px)': {
      width: 185,
      height: 43,
    },
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
    '@media (max-width: 1024px)': {
      width: 450,
      height: 50,
      fontSize: 24,
    },
    '@media (max-width: 768px)': {
      width: 400,
      height: 45,
      fontSize: 20,
    },
    '@media (max-width: 430px)': {
      width: 300,
      height: 40,
      fontSize: 16,
    },
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
    '@media (max-width: 1024px)': {
      width: 450,
      height: 50,
      fontSize: 24,
    },
    '@media (max-width: 768px)': {
      width: 400,
      height: 45,
      fontSize: 20,
    },
    '@media (max-width: 430px)': {
      width: 300,
      height: 40,
      fontSize: 16,
    },
  },
  inputPass: {
    width: 300,
    height: 40,
    backgroundColor: '#ffffff24',
    paddingLeft: 40,
    paddingRight: 45,
    borderRadius: 6,
    borderColor: '#adadada2',
    borderLeftWidth: 3,
    borderRightWidth: 3,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    '@media (max-width: 1024px)': {
      width: 450,
      height: 50,
      fontSize: 24,
    },
    '@media (max-width: 768px)': {
      width: 400,
      height: 45,
      fontSize: 20,
    },
    '@media (max-width: 430px)': {
      width: 300,
      height: 40,
      fontSize: 16,
    }
  },
  inputPassSelected: {
    width: 300,
    height: 40,
    backgroundColor: '#ffffff24',
    paddingLeft: 40,
    paddingRight: 45,
    borderRadius: 6,
    borderColor: 'rgb(252, 189, 27)',
    borderLeftWidth: 3,
    borderRightWidth: 3,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    '@media (max-width: 1024px)': {
      width: 450,
      height: 50,
      fontSize: 24,
    },
    '@media (max-width: 768px)': {
      width: 400,
      height: 45,
      fontSize: 20,
    },
    '@media (max-width: 430px)': {
      width: 300,
      height: 40,
      fontSize: 16,
    }
  },
  inputTextSelected: {
    color: 'rgb(252, 189, 27)',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    '@media (max-width: 1024px)': {
      fontSize: 24,
    },
    '@media (max-width: 768px)': {
      fontSize: 20,
    },
    '@media (max-width: 430px)': {
      fontSize: 16,
    }
  },
  inputText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    '@media (max-width: 1024px)': {
      fontSize: 24,
    },
    '@media (max-width: 768px)': {
      fontSize: 20,
    },
    '@media (max-width: 430px)': {
      fontSize: 16,
    }
  },  
  Icon: {
    position: 'absolute',
    left: 10,
    top: 10,
    opacity: .8,
    '@media (max-width: 1024px)': {
      left: 10,
      top: 15,
    },
    '@media (max-width: 768px)': {
      left: 10,
      top: 12,
    },
    '@media (max-width: 430px)': {
      left: 10,
      top: 10,
    }
  },
  IconView: {
    position: 'absolute',
    right: 5,
    top: 0,
    opacity: .8,
    height: '100%',
    width: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
    opacity: .5,
    '@media (max-width: 1024px)': {
      width: 450,
      height: 55,
    },
    '@media (max-width: 768px)': {
      width: 400,
      height: 45,
    },
    '@media (max-width: 430px)': {
      width: 300,
      height: 40,
    }
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
    '@media (max-width: 1024px)': {
      width: 450,
      height: 55,
    },
    '@media (max-width: 768px)': {
      width: 400,
      height: 45,
    },
    '@media (max-width: 430px)': {
      width: 300,
      height: 40,
    }
  },
  loginIcon: {
    position: 'absolute',
    left: 10,
    top: 5,
    '@media (max-width: 1024px)': {
      top: 15,
    },
    '@media (max-width: 768px)': {
      top: 8,
    },
    '@media (max-width: 430px)': {
      top: 5,
    }
  },
  loginText: {
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
    '@media (max-width: 1024px)': {
      fontSize: 24,
    },
    '@media (max-width: 768px)': {
      fontSize: 20,
    },
    '@media (max-width: 430px)': {
      fontSize: 19,
    }
  },
  logoVivoDuoc: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 45
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
    '@media (max-width: 1024px)': {
      width: 450,
    },
    '@media (max-width: 768px)': {
      width: 400,
    },
    '@media (max-width: 430px)': {
      width: 300,
    }
  },
  saveSessionCheckbox: {
    borderRadius: 50,
    borderColor: '#eee',
  },
  saveSessionText: {
    color: '#eee',
    fontSize: 16,
    fontWeight: 'bold',
    '@media (max-width: 1024px)': {
      fontSize: 24,
    },
    '@media (max-width: 768px)': {
      fontSize: 20,
    },
    '@media (max-width: 430px)': {
      fontSize: 16,
    }
  }
});