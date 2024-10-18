
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import MainMenu from './screens/MainMenu';
import NewAnimal from './screens/NewAnimal';
import AnimalDetail from './screens/AnimalDetail';




const Stack = createNativeStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "Login">

        <Stack.Screen name ="Login" component = {Login}/>
        <Stack.Screen name ="SignUp" component = {SignUp}/>
        <Stack.Screen name ="MainMenu" component = {MainMenu}/>
        <Stack.Screen name ="NewAnimal" component = {NewAnimal}/>
        <Stack.Screen name ="AnimalDetail" component = {AnimalDetail}/>

      </Stack.Navigator>
    </NavigationContainer>
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
