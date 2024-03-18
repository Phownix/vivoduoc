import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackIcon from '../icons/back';

export default function BackToHome({ children }) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.backContent} onPress={() => navigation.navigate('Home')}>
            <BackIcon/> 
            <Text style={styles.backText}>{children}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    backContent: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        paddingVertical: 10,
    },
    backText: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
    },	
});