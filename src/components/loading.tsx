import { useRef } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';

export default function Loading() {
    const animation = useRef(null);

    return (
        <View>
            <LottieView
                autoPlay
                ref={animation}
                style={{
                    width: 200,
                    height: 200,
                }}
                source={require('../../assets/animations/loading.json')}
            />
        </View>
    )
    
}