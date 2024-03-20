import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Greeting() {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    let greeting = '';

    if (currentHour >= 20 || currentHour < 6) {
        greeting = 'Buenas Noches';
    } else if (currentHour >= 6 && currentHour < 12) {
        greeting = 'Buenos Días';
    } else {
        greeting = 'Buenas Tardes';
    }

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let formattedDate = currentDate.toLocaleDateString('es-ES', options);

    formattedDate = formattedDate.replace(/\b\w/g, (char) => char.toUpperCase());

    formattedDate = formattedDate.replace(/\bEl\b|\bDel\b|\bDe\b/g, (article) => article.toLowerCase());

    return (
        <View>
            <Text style={styles.hours}>{formattedDate}</Text>
            <Text style={styles.greeting}>{greeting}, {"${username}"}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    hours: {
        fontSize: 14,
    },
    greeting: {
        fontSize: 22,
        fontWeight: '600',
        paddingVertical: 5,
    }
});