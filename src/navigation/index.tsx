import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState, useCallback } from 'react';
import Constants from 'expo-constants';
import { createStackNavigator } from '@react-navigation/stack';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from '@/screens/login';
import Home from '@/screens/home';
import Ava from '@/screens/ava'
import Calendar from '@/screens/calendar';
import Notes from '@/screens/notes';
import Assistance from '@/screens/assistance';
import Profile from '@/screens/profile';
import Credential from '@/screens/credential';
import UpdateScreen from '@/screens/updateScreen';

import Loading from '@/screens/loading';

type RootStackNavigatorProps = {
  Home: undefined;
  Login: undefined;
  Ava: undefined;
  Calendar: undefined;
  Notes: undefined;
  Assistance: undefined;
  Profile: undefined;
  Credential: undefined;
  Update: undefined;
};

const Stack = createStackNavigator<RootStackNavigatorProps>();

export default function Navigation() {
  const [initialRoute, setInitialRoute] = useState<any>('Login');
  const [loading, setLoading] = useState<boolean>(true);
  const [isConnected, setIsConnected] = useState<boolean>(true);

  useFocusEffect(
    useCallback(() => {
      const checkConnected = async () => {
        try {
          const state = await NetInfo.fetch();
          setIsConnected(state.isConnected);
        } catch (error) {
          console.error('Error al obtener el estado de la conexión:', error);
          setIsConnected(false);
        }
      };
  
      checkConnected();
    } ,[])
  );

  useFocusEffect(
    useCallback(() => {
      const checkUpdateAndToken = async () => {
        try {
          const updateNeeded = await checkForUpdate();
  
          if (!updateNeeded) {
            const token = await AsyncStorage.getItem('access_token');
            if (token) {
              setInitialRoute('Home');
            }
          } else {
            setInitialRoute('Update');
          }
        } catch (error) {
          console.error('Error al verificar la actualización o el token:', error);
        } finally {
          setLoading(false);
        }
      };
  
      if (isConnected) {
        checkUpdateAndToken();
      } else {
        setInitialRoute('Home');
        setLoading(false);
      }
    }, [])
  );

  if (loading) return <Loading/>;

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{ 
        headerShown: false, 
        cardStyle: {
          backgroundColor: '#fff',
        },
      }}
    >
      <Stack.Screen name="Login" component={Login} options={{ animationEnabled: true }} />
      <Stack.Screen name="Home" component={Home} options={{ animationEnabled: true }} />
      <Stack.Screen name="Ava" component={Ava} options={{ animationEnabled: false }} />
      <Stack.Screen name="Calendar" component={Calendar} options={{ animationEnabled: false }} />
      <Stack.Screen name="Notes" component={Notes} options={{ animationEnabled: false }} />
      <Stack.Screen name="Assistance" component={Assistance} options={{ animationEnabled: false }} />
      <Stack.Screen name="Profile" component={Profile} options={{ animationEnabled: false }} />
      <Stack.Screen name="Credential" component={Credential} options={{ animationEnabled: true }} />
      <Stack.Screen name="Update" component={UpdateScreen} options={{ animationEnabled: true }} />
    </Stack.Navigator>
  );
}

async function checkForUpdate(): Promise<boolean> {
  try {
    const res = await fetch('https://raw.githubusercontent.com/evairx/vivoduoc/main/version.json');
    const data = await res.json();

    const appVersion = Constants?.expoConfig?.version || '';
    const version = data.version || '';

    return appVersion !== version;
  } catch (error) {
    console.error("Error al verificar la actualización:", error);
    return false;
  }
}