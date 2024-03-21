import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from '../screens/login';
import Home from '../screens/home';
import Calendar from '../screens/calendar';
import Notes from '../screens/notes';
import Assistance from '../screens/assistance';
import Profile from '../screens/profile';

const Stack = createStackNavigator();

export default function Routes() {
    const [initialRoute, setInitialRoute] = useState('Login');
    const [loading, setLoading] = useState(true);

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
                animationEnabled: false,
                cardStyle: {
                    backgroundColor: '#fff',
                },
            }}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Calendar" component={Calendar} />
            <Stack.Screen name="Notes" component={Notes} />
            <Stack.Screen name="Assistance" component={Assistance} />
            <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
    );
}