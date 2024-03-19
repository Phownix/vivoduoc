import React, { useEffect, useState } from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './login';
import Home from './home';
import Calendar from './calendar';
import Notes from './notes'
import Assistance from './assistance';
import Profile from './profile';

const Stack = createStackNavigator();

export default function Routes() {
    const [tokenExists, setTokenExists] = useState(false);
    
    useEffect(() => {
        checkTokenAndNavigate();
    }, []);

    const checkTokenAndNavigate = async () => {
        try {
            const token = await AsyncStorage.getItem('access_token');
            setTokenExists(!!token); // !!token convierte el valor de token en un booleano
        } catch (error) {
            console.error('Error al verificar el token:', error);
        }
    };

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={tokenExists ? "Home" : "Login"}
                screenOptions={{ 
                    headerShown: false, 
                    animationEnabled: false,
                    cardStyle: {
                        backgroundColor: '#fff',
                    },
                }}
            >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Calendar" component={Calendar} />
                <Stack.Screen name="Notes" component={Notes} />
                <Stack.Screen name="Assistance" component={Assistance} />
                <Stack.Screen name="Profile" component={Profile} />
            </Stack.Navigator>

        </NavigationContainer>
    )
}