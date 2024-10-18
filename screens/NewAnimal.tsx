import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Firestore reference

export default function NewAnimal({ navigation }) {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [imageURL, setImageURL] = useState('');

    const handleAddAnimal = async() => {
        try {
            await addDoc(collection(db, 'animals'), {name, age, imageURL});
            navigation.navigate('MainMenu');
        } catch (error){
            Alert.alert('Error', 'Could not add animal');
        }
    };

    return(
        <View>
            <TextInput placeholder="Name" onChangeText={setName} value={name} />
            <TextInput placeholder="Age" onChangeText={setAge} value={age} />
            <TextInput placeholder="Image URL" onChangeText={setImageURL} value={imageURL} />
            <Button title="Add Animal" onPress={handleAddAnimal} />
        </View>
    );
}