import { View, Text,Image, ScrollView, TouchableOpacity } from "react-native";
import { vh } from "react-native-expo-viewport-units";
import StyleSheet from 'react-native-media-query';
import { StatusBar } from "expo-status-bar";


import Test from '@/icons/test';

export default function UpdateScreen() {
    return (
        <View style={styles.container}>
          <StatusBar style="light" backgroundColor='#184f8a'/>
            <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                <Image 
                source={require('../../assets/logo_vivoduoc.png')}
                style={styles.logo}
              />
            </ScrollView>
          <View style={styles.footerMain}>
            <Text style={styles.title}>Parece que tienes una versión antigua de la aplicación. Actualiza ahora tener una mejor experiencia. </Text>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>ACTUALIZAR MI APP</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bg}>
            <Test/>
          </View>
        </View>
      );
    };

    
const { styles }= StyleSheet.create({
      container: {
        height: vh(105),
        backgroundColor: 'black',
      },
      logo: {
        '@media (max-width: 1024px)': {
          width: 320,
          height: 60,
        },
        '@media (max-width: 768px)': {
          width: 260,
          height: 50,
        },
        '@media (max-width: 430px)': {
          width: 185,
          height: 43,
        },
      },
      footerMain: {
        marginBottom: 25,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
      },
      title: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
      },
      btn: {
        backgroundColor: 'rgb(252, 189, 27)',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        width: '100%',
      },
      btnText: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
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