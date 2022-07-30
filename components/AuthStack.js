import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';

import AuthChecker from './AuthChecker';
import SignIn from './SignIn';
import HomeScreen from './HomeScreen';
import SingUp from './Signup';
import AppTab from './AppTab';

const Stack = createNativeStackNavigator();

class AuthStack extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
        <Stack.Navigator  initialRouteName='AuthChecker'>
          <Stack.Screen name= 'AuthChecker' component={AuthChecker}/>
          <Stack.Screen name= 'SignIn' component={SignIn}/>
          <Stack.Screen name='Home' component={AppTab}/>
          <Stack.Screen name='Signup' component={SingUp} />
        </Stack.Navigator>
            
        );
    }   
}
export default AuthStack;