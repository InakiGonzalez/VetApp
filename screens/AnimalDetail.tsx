import React from 'react';
import { View, Text, Image } from 'react-native';

export default function AnimalDetail({ route }) {
    const{ animal } = route.params;

    return (
        <View>
            <Text>Name: {animal.name}</Text>
            <Text>Age: {animal.age}</Text>
            <Image source={{ uri: animal.imageURL }} style={{ width: 100, height: 100 }} />
        </View>
    );
}