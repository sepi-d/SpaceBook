import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer} from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AuthChecker from './components/AuthChecker';
import SignIn from './components/SignIn';
import SingUp from './components/Signup';
import Friends from './components/Friends';
import HomeScreen from './components/HomeScreen';

import AppTab from './components/AppTab';
import AuthStack from './components/AuthStack';


class App extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <NavigationContainer>
        <AuthStack/>
      
      </NavigationContainer>
    );
  }


}

export default App;

