import 'react-native-gesture-handler';
import React, { Component } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AuthChecker from './AuthChecker';
import SignIn from './SignIn';
import Friends from './Friends';
import HomeScreen from './HomeScreen';
import SingUp from './Signup';


const Tab = createBottomTabNavigator();


class AppTab extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(

        <Tab.Navigator>
            <Tab.Screen name="Friends" component={Friends} />
            <Tab.Screen name="Signup" component={SingUp} />
        </Tab.Navigator>

        );

    }
    




}
export default AppTab;