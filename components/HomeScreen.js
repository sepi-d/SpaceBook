import 'react-native-gesture-handler';
import React, { Component} from "react";
import { View, Text, StyleSheet, TextInput, ScrollView} from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AsyncStorage from "@react-native-async-storage/async-storage";

import SingUp from "./Signup";
import Friends from "./Friends";

const Tab = createBottomTabNavigator();

class HomeScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            user_id:'',
            first_name: '',
            last_name: '',
            email: '',

           
            
        }
    }

    componentDidMount(){
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getDetails();
        });        
    }

    getDetails = async () => {
        const token = await AsyncStorage.getItem('@session_token');
        const userID = await AsyncStorage.getItem('@user_id');

        return fetch("http://localhost:3333/api/1.0.0/user/"+userID, {
            headers: {
                'X-Authorization':  token
            }
        })
        .then((response) => {
           // console.log(response.json());
            if(response.status === 200){
                return response.json();
            

            }else if(response.status === 400){
                throw 'Failed validation';
            }else{
                throw 'Something went wrong';
            }
        })
        .then((responseJson) => {
            console.log(responseJson);
               this.setState({
                first_name: responseJson.first_name
               })
        })
        .catch((error) => {
            console.log(error);
        })
    }


    render(){
        return(
            <View style={styles.container}>
                <View style={styles.welcomeContainer}>
                     <Text style={styles.welcomeMessage}>
                        Hello {this.state.first_name}   
                    </Text>
                </View>
               
            </View>

    
        );
    }
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'antiquewhite',
    },

    welcomeContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
    },

    welcomeMessage:{
        fontSize:25,
    }
    

});


export default HomeScreen;