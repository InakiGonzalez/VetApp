import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import {useReducer, useState} from 'react';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{
  initializeAuth,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  UserCredential,
  getReactNativePersistence
}from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where
} from 'firebase/firestore';
import {
  getStorage,
  ref,getDownloadURL
} from 'firebase/storage';
import Navigation from './Navigaton';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGE_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
//const auth = getAuth(app);
const db = getFirestore(app);
const auth = initializeAuth(
  app,
  {persistence: getReactNativePersistence(ReactNativeAsyncStorage)}
);


export default function AppNavigation() {
  return(
    <Navigation/>
  );
}
export function App() {
  const[email,setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[name, setName] = useState("");
  const[breed, setBreed] = useState("");
  const [imageURL, setImageURL] = useState("");
  //target - get image uRL from firebase to display it
  //op1 - use a simple route from bucket

  var puppyRef = ref(storage, "gs://ad2024-501-js.appspot.com/perros/golden.jpg");


  getDownloadURL(puppyRef).then(url =>{
    console.log(url);
    setImageURL(url);
  }).catch(error =>{
    console.log(error.code);
  });

  onAuthStateChanged(auth, user=>{
    if(user){
      console.log("The user is validated: " + user.email);
    }else{
      console.log("Logged out");
    }
    });

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <TextInput
        placeholder='email'
        onChangeText={text => {
          setEmail(text)
        }}
      />
      <TextInput
        placeholder='password'
        secureTextEntry = {true}
        onChangeText={text => {
          setPassword(text)
        }}
      />
      <Button
        title = "sign up"
        onPress={()=>{
          createUserWithEmailAndPassword(auth, email, password).then((userCredential : UserCredential)=>{
            console.log("USER: " + userCredential.user)
          }).catch((error: any)=>{
            if(error.code == "auth/weak-password"){
              alert("The password is insecure!");
            }
            console.log("ERROR: " + error.message + " " + error.code);
          });
        }}
      />
        <Button
        title = "log in"
        onPress={()=>{
          signInWithEmailAndPassword(auth,email,password)
          .then((userCredential : UserCredential)=>{
            console.log(userCredential.user.email);
          })
          .catch((error: any)=>{
            console.log("ERROR: " + error.message + "  + error.code");
          });
        }}
      />
      <Button
        title = "log out"
        onPress={()=>{
          console.log("LOGGING OUT");
          auth.signOut();
        }}
      />
            <TextInput
        placeholder = "name"
        onChangeText={text=>{
          setName(text);
        }}
      />
            <TextInput
        placeholder = "breed"
        onChangeText={text=>{
          setBreed(text);
        }}
      />
      <Button
        title = "add"
        onPress={async ()=>{
         try{

          var perritosCollection = collection(db,"perritos");

          const newDoc = await addDoc(
            perritosCollection,
            {
              name: name,
              breed: breed
            }
          );
          console.log("ID of new perritos: "+ newDoc.id);
         }catch(e){
          console.log("EXCEPTION WHEN TRYING TO ADD AN ANIMAL: " + e)
         }
        }}
      />
      <Button
        title = "get all"
        onPress={async()=>{
          
          var snapshot = await getDocs(collection(db, "perritos"));
          snapshot.forEach(currentDocument =>{
            console.log(currentDocument.data());
          });
        }}
      />

      <Button
        title = "query"
        onPress={async ()=>{
          const perritos = collection(db ,'perritos');
          const q = query(perritos, where("breed","==","Labrador"));
          const snapshot = await getDocs(q);
          snapshot.forEach(currentDocument =>{
            console.log(currentDocument.data());
          });
        }}
      />
      {
        imageURL != "" ?
        <Image
        source = {{uri:imageURL}}
        style = {{width: 100, height: 100}}
        />
        :
        <Text>Loading Image ...</Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
