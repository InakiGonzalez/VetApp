import React, { useState } from 'react';
import {View, TextInput, Button, Text, Alert} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function SignUp({ navigation }){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = () =>{
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            navigation.navigate('MainMenu');
        })
        .catch((error) => {
            Alert.alert("Sign up was unsuccessful", error.message);
        });
    };

    return(
        <View>
            <TextInput placeholder = "Email" onChangeText={setEmail} value={email} />
            <TextInput placeholder = "Password" onChangeText={setPassword} value={password} />
            <Button title="Sign Up" onPress={handleSignUp} />
        </View>
    );
}