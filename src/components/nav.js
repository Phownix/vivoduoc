import { View, Text,TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import HomeIcon from '../icons/home'
import CalendarIcon from '../icons/calendar'
import NotesIcon from '../icons/notes'
import AssistanceIcon from '../icons/assistance'
import ProfileIcon from '../icons/profile'

export default function Nav() {
    const navigation = useNavigation();
    const route = useRoute()

    const options = [
        { 
            name: 'Home', 
            button: <TouchableOpacity onPress={() => navigation.navigate('Home')} style={route.name === 'Home' ? styles.btnActive :styles.btn}><HomeIcon iconColor={route.name === 'Home' ? "rgb(252, 189, 27)" : "#ffff"}/></TouchableOpacity>
        },
        { 
            name: 'Calendar', 
            button: <TouchableOpacity onPress={() => navigation.navigate('Calendar')} style={route.name === 'Calendar' ? styles.btnActive :styles.btn}><CalendarIcon iconColor={route.name === 'Calendar' ? "rgb(252, 189, 27)" : "#ffff"}/></TouchableOpacity>
        },
        { 
            name: 'Notes', 
            button: <TouchableOpacity onPress={() => navigation.navigate('Notes')} style={route.name === 'Notes' ? styles.btnActive :styles.btn}><NotesIcon iconColor={route.name === 'Notes' ? "rgb(252, 189, 27)" : "#ffff"}/></TouchableOpacity>
        },
        { 
            name: 'Assistance', 
            button: <TouchableOpacity onPress={() => navigation.navigate('Assistance')} style={route.name === 'Assistance' ? styles.btnActive :styles.btn}><AssistanceIcon iconColor={route.name === 'Assistance' ? "rgb(252, 189, 27)" : "#ffff"}/></TouchableOpacity>
        },
        { 
            name: 'Profile', 
            button: <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={route.name === 'Profile' ? styles.btnActive :styles.btn}><ProfileIcon iconColor={route.name === 'Profile' ? "rgb(252, 189, 27)" : "#ffff"}/></TouchableOpacity>
        },
    ]

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                {options.map((option, index) => (
                    <View key={index}>
                        {option.button}
                    </View>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#012C56',
        height: 65,
    },
    main: {
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    btn: {
        height: 100,
        width: 64,
        padding: 8,
        flexDirection: 'column',
        alignContent: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    btnActive: {
        height: 100,
        width: 64,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 8,
        borderTopWidth: 3,
        borderTopColor: 'rgb(252, 189, 27)',
    }
})