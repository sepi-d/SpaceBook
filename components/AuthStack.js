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
import SinglePost from './SinglePost';
import Profile from './Profile';
import UpdateDetails from './UpdateDetails';
const Stack = createNativeStackNavigator();

class AuthStack extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
        <Stack.Navigator  
            initialRouteName='AuthChecker'
            // screenOptions={{
            //     headerShown :false
            // }}
        >
          <Stack.Screen name= 'AuthChecker' component={AuthChecker} options={{title:false}}/>
          <Stack.Screen name= 'SignIn' component={SignIn} options={{title:false}}/>
          <Stack.Screen name='Home' component={AppTab} options={{title:false}}/>
          <Stack.Screen name='Signup' component={SingUp} options={{title:false}} />
          <Stack.Screen name= 'FriendRequests' component ={FriendRequests} options={{title:false}}/>
          <Stack.Screen name = 'Friends' component={Friends} options={{title:false}}/>
          <Stack.Screen name = 'FriendProfile' component={UserProfile} options={{title:false}}/>
          <Stack.Screen name ="Edit" component={UpdateDetails} options={{title:false}}/>
          <Stack.Screen name = "singlePost" component={SinglePost} options={{title:false}}/>
          <Stack.Screen name = "profile" component={Profile} options={{title:false}}/>
        </Stack.Navigator>
            
        );
    }   
}
export default AuthStack;