import 'react-native-gesture-handler';
import React, { Component} from "react";
import { View, Text, StyleSheet, TextInput, Button, Image } from 'react-native';

import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HomeScreen from "./HomeScreen"

class profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            // first_name: '',
            // last_name: '',
            // post:[],
            text:'',
        }
    }

    postInput = (post) =>{
        this.setState({text: post})
        console.log(post)
    }
    

    componentDidMount(){
        this._unsubscribe = this.props.navigation.addListener('focus', () => {

       
        });        
    }

    SavePost = async() => {
        //Validation here...

        const userID = await AsyncStorage.getItem('@user_id');
        const token = await AsyncStorage.getItem('@session_token');


        console.log(token);

        return fetch("http://localhost:3333/api/1.0.0/user/"+userID+"/post", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization':  token
            },
            body: JSON.stringify(this.state)
        })
        .then((response) => {
            if(response.status === 201){
                return response.json()
            }else if(response.status === 401){
                throw 'Failed Unauthorised';
            }else if(response.status === 404)
            {
                throw 'Not Found';
            }else if(response.status === 500){
                throw 'Server Error';
            }else{
                throw ' something went wrong';
            }
        })
        .then((responseJson) => {
               console.log("post added ", responseJson);
               this.props.navigation.navigate("Home");
        })
        .catch((error) => {
            console.log(error);
        })
    }
    render(){
        return(
            <View style={styles.container}>
                <View>
                    <Button/>
                    <Button/>

                </View>
                <View>
                    <TextInput
                        style={styles.postInput}
                        placeholder='post...' 
                        onChangeText={this.postInput}
                        value= {this.state.text}
                    />

                    <Button
                    color="#841584"
                    onPress={() => this.SavePost()}
                    title="Post"        
                />
                    
                    
                </View>
            </View>
           

        );
    }



}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'antiquewhite',
        // alignItems: 'center',
        justifyContent: 'center',
    },
    postInput:{
        // height: 100,
        padding: 10,
        marginTop: 10,
        marginBottom:10,
        borderWidth:1,
        width: "100%",


    },

    }
)
export default profile;
