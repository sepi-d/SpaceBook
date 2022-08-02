import 'react-native-gesture-handler';
import React, { Component } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Friends from './Friends';
import HomeScreen from './HomeScreen';
import profile from './profile';
import SearchUsers from './SearchUsers';


const Tab = createBottomTabNavigator();


class AppTab extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(

        <Tab.Navigator>
            <Tab.Screen name="HomeScreen" component={HomeScreen} />
            <Tab.Screen name="Friends" component={Friends} />
            <Tab.Screen name= "Profile" component={profile}/>
            <Tab.Screen name= "Search" component={SearchUsers}/>
            

        </Tab.Navigator>

        );

    }
    




}
export default AppTab;