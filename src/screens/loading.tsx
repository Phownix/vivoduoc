import { View } from 'react-native'
import { vh } from "react-native-expo-viewport-units";
import StyleSheet from 'react-native-media-query';

import Test from '@/icons/test'

export default function Loading() {
    return (
        <View style={styles.container}>
            <View style={styles.bg}>
                <Test/>
            </View>
        </View>
    )
};

const { styles }= StyleSheet.create({
    container: {
      height: vh(105),
    },
    bg: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1,
    },

});