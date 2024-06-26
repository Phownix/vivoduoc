import { Text, TouchableOpacity } from 'react-native';
import StyleSheet from 'react-native-media-query';
import { useNavigation } from '@react-navigation/native';
import BackIcon from '@/icons/back';

interface IRouteProps {
    route: string;
    children: React.ReactNode;
}

interface INavigationProps {
    reset: (props: { index: number; routes: { name: string }[] }) => void;
    navigate: (name: string) => void;
}

export default function BackToHome({ children, route }: IRouteProps) {
    const navigation = useNavigation<INavigationProps>();

    return (
        <TouchableOpacity style={styles.backContent} onPress={() => navigation.navigate(route)}>
            <BackIcon /> 
            <Text style={styles.backText}>{children}</Text>
        </TouchableOpacity>
    );
};

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