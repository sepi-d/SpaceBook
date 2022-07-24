import React, { Component} from "react";
import { View, Text, StyleSheet, TextInput, ScrollView} from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from "@react-native-async-storage/async-storage";
import SingUp from "./Signup";
// import SignIn from "./SignIn";
import Friends from "./Friends";
// import SearchFriends from "./SearchFriends";

const Tab = createBottomTabNavigator();

class HomeScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            
        }
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

export default HomeScreen;