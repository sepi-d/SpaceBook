import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import {createDrawerNavigator} from '@react-navigation/drawer';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SignIn from './components/SignIn';
import SingUp from './components/Signup';
import Friends from './components/Friends';
import HomeScreen from './components/HomeScreen';

const Stack = createNativeStackNavigator();

class App extends Component{
  constructor(props){
    super(props);
  }
  render(){

    return(
      <NavigationContainer>
        <Stack.Navigator  initialRouteName='SigIn'>
          <Stack.Screen name= 'SignIn' component={SignIn}/>
          <Stack.Screen name='Signup' component={SingUp}/>
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='FreindList' component={Friends}/>
        
        </Stack.Navigator>
      </NavigationContainer>
     
   
    );
  }


}

export default App;

