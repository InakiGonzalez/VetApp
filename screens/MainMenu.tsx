import React, { useEffect, useState } from 'react';
import {View, FlatList, Button, Text, TouchableOpacity} from 'react-native';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function MainMenu({ navigation }){
    const [ animals, setAnimals] = useState([]);

    useEffect(() => {
        const fetchAnimals = async() => {
            const querySnapshot = await getDocs(collection(db, 'animals'));
            const animalList = [];
            querySnapshot.forEach((doc) =>{
                animalList.push({ id: doc.id, ...doc.data() });
            });
            setAnimals(animalList);
        };
        fetchAnimals();
    }, []);

    return(
        <View>
            <FlatList
                data={animals}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('AnimalDetail', { animal: item })}>
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
            <Button title="Add Animal" onPress={() => navigation.navigate('NewAnimal')} />
        </View>
    );
}