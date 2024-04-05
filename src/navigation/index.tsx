import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from '../screens/login';
import Home from '../screens/home';
import Ava from '../screens/ava'
import Calendar from '../screens/calendar';
import Notes from '../screens/notes';
import Assistance from '../screens/assistance';
import Profile from '../screens/profile';
import Credential from '../screens/credential'

const Stack = createStackNavigator();

export default function Navigation() {
    const [initialRoute, setInitialRoute] = useState<string>('Login');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
      const checkTokenAndNavigate = async () => {
        try {
          const token = await AsyncStorage.getItem('access_token');
          if (token) {
            setInitialRoute('Home');
            setLoading(false);
          }
          setLoading(false);
        } catch (error) {
          console.error('Error al verificar el token:', error);
          setLoading(false);
        }
      };
    
      checkTokenAndNavigate();
    }, []);

    if(loading) return null;

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
            <Stack.Screen name="Login" component={Login} options={{ animationEnabled: true }}/>
            <Stack.Screen name="Home" component={Home}  options={{ animationEnabled: true }}/>
            <Stack.Screen name="Ava" component={Ava}  options={{ animationEnabled: false }}/>
            <Stack.Screen name="Calendar" component={Calendar} options={{ animationEnabled: false }}/>
            <Stack.Screen name="Notes" component={Notes} options={{ animationEnabled: false }}/>
            <Stack.Screen name="Assistance" component={Assistance} options={{ animationEnabled: false }}/>
            <Stack.Screen name="Profile" component={Profile} options={{ animationEnabled: false }}/>
            <Stack.Screen name="Credential" component={Credential} options={{ animationEnabled: true }}/>
        </Stack.Navigator>
    );
}