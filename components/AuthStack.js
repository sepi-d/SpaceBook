import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import AuthChecker from './AuthChecker';
import SignIn from './SignIn';
import HomeScreen from './HomeScreen';
import SingUp from './Signup';
import AppTab from './AppTab';
import FriendRequests from './FriendRequests';
import Friends from './Friends';
import UserProfile from './userProfile';
import updateDetails from './updateDetails';
import singlePost from './singlePost';

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
          <Stack.Screen name= 'FriendRequests' component ={FriendRequests}/>
          <Stack.Screen name = 'Friends' component={Friends}/>
          <Stack.Screen name = 'FriendProfile' component={UserProfile}/>
          <Stack.Screen name ="Edit" component={updateDetails}/>
          <Stack.Screen name = "singlePost" component={singlePost}/>
        </Stack.Navigator>
            
        );
    }   
}
export default AuthStack;