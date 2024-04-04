import { Text, TouchableOpacity } from 'react-native';
import StyleSheet from 'react-native-media-query';
import { useNavigation } from '@react-navigation/native';
import BackIcon from '../icons/back';

export default function BackToHome({ children, route }) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.backContent} onPress={() => navigation.navigate(route)}>
            <BackIcon/> 
            <Text style={styles.backText}>{children}</Text>
        </TouchableOpacity>
    );
}

const {styles} = StyleSheet.create({
    backContent: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        paddingVertical: 10,
    },
    backText: {
        color: '#000',
        fontWeight: 'bold',
        '@media (max-width: 1024px)': {
            fontSize: 26,
          },
        '@media (max-width: 412px)': {
            fontSize: 20,
          },
    },	
});