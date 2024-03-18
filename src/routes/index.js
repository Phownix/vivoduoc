import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import Login from './login';
import Home from './home';
import Calendar from './calendar';
import Notes from './notes'
import Assistance from './assistance';
import Profile from './profile';

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <StatusBar style="dark"/>
            <Stack.Navigator
                initialRouteName="Login"
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