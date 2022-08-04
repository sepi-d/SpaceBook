import 'react-native-gesture-handler';
import React, { Component } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Friends from './Friends';
import HomeScreen from './HomeScreen';
import Profile from './Profile';
import SearchUsers from './SearchUsers';


const Tab = createBottomTabNavigator();


class AppTab extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(

        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Friends" component={Friends} />
            <Tab.Screen name= "Posts" component={Profile}/>
            <Tab.Screen name= "Search" component={SearchUsers}/>
            

        </Tab.Navigator>

        );

    }
    




}
export default AppTab;