import { useCallback } from 'react';
import { useFocusEffect,useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VerifyToken = (route) => {
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            const checkTokenAndNavigate = async () => {
                try {
                    const token = await AsyncStorage.getItem('access_token');
                    if (token) {
                        return;
                    }
                    navigation.reset({ index: 0, routes: [{ name: route }] });
                } catch (error) {
                    console.error('Error:', error);
                }
            };
            
            checkTokenAndNavigate();
        },[])
    );
};

export default VerifyToken;