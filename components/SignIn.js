import React, { Component} from "react";
import { View, Text, StyleSheet, TextInput, Button, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SingUp from "./Signup";
import HomeScreen from "./HomeScreen"
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";


class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            email :'',
            password : '',
        };
    }

    emailInput = (email) =>{
        this.setState({email: email})
        console.log(email)
    }

    passwordInput = (password) =>{
        this.setState({password: password})
        console.log(password)
    }


    login = async () => {

        return fetch("http://localhost:3333/api/1.0.0/login", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
            })
            .then((response) => {
                if(response.status === 200){
                    return response.json()
                }else if(response.status === 400){
                    throw 'Invalid email or password';
                }else{
                    throw 'Something went wrong';
                }
         })
            .then(async (responseJson) => {
                    console.log(responseJson);
                    await AsyncStorage.setItem('@session_token', responseJson.token);
                    await AsyncStorage.setItem('@user_id', responseJson.id);

                    this.props.navigation.navigate("Home");
            })
            .catch((error) => {
                console.log(error);
            })
        }

    render(){
        const nav = this.props.navigation;
        return (
    
            <View style={styles.container}>
                <Image 
                     style={styles.logo}
                     source={require('../assets/spaceship.png')}
                />
               <View>
                 <TextInput
                    style={styles.input} 
                    placeholder='email...' 
                    onChangeText={this.emailInput }
                    value= {this.state.email}
                />
               </View>
               <View >
                <TextInput
                        style={styles.input}
                        placeholder='password'
                        onChangeText={this.passwordInput}
                        value={this.state.password}
                        secureTextEntry={true}
                    />
               </View>
                
                <Button
                    color="#841584"
                    onPress={() => this.login()}
                    title="Log In"
                    accessibillityLable="Log in to your space book account"
                    
                />
                <View style={styles.SignUpText}>
                    <Text>
                        If you don't have an account please 
                        <TouchableOpacity 
                        onPress={() => nav.navigate('Signup')} 
                        style={styles.SingUpButton}
                        >
                            <Text> Sign up</Text>
                        </TouchableOpacity> 
                    </Text>
                </View>
                
               

            </View>
            


        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'antiquewhite',
        alignItems: 'center',
        justifyContent: 'center',
       

    },

    logo: {
        width: 100,
        height: 100,
        marginBottom: 30
    },

    input:{
        height: 50,
        padding: 10,
        marginTop: 10,
        marginBottom:10,
        borderWidth:1,
        
    },
    SingUpButton:{
       color:"#841584"
    },

    SignUpText:{
        paddingTop:20
    }
    





})

export default SignIn ;

//<a href="https://www.flaticon.com/free-icons/spaceship" title="spaceship icons">Spaceship icons created by Freepik - Flaticon</a>