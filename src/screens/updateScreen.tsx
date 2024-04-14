import { View, Text } from "react-native"
import StyleSheet from 'react-native-media-query';
import { StatusBar } from "expo-status-bar";
import Constants from 'expo-constants';

export default function UpdateScreen() {
    return (
        <View style={styles.container}>
            <StatusBar style="dark"/>
            <View style={styles.main}>
                <Text>Actualizacion</Text>
            </View>
        </View>
    )
}

const { styles } = StyleSheet.create({
    container: {
        height: '100%'
    },
    main: {
        marginTop: Constants.statusBarHeight + 15,
    }
})