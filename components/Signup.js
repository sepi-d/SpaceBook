import React, { Component} from "react";
import { View, Text, StyleSheet, TextInput, ScrollView} from 'react-native';
import { Button } from "react-native-web";
import AsyncStorage from "@react-native-async-storage/async-storage";

class SingUp extends Component{
    constructor(props){

        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPass:''
            
        }
    }

    signUp = () => {
            
        return fetch("http://localhost:3333/api/1.0.0/user", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then((response) => {
            if(response.status === 201){
                return response.json()
            }else if(response.status === 400){
                throw 'Failed validation';
            }else{
                throw 'Something went wrong';
            }
        })
        .then((responseJson) => {
               console.log("User created with ID: ", responseJson);
               this.props.navigation.navigate("SignIn");
        })
        .catch((error) => {
            console.log(error);
        })
    }
          
    
    render(){
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.formTitle}>To create an account please fill the form</Text>
                        <View>
                            <Text> First name: </Text>
                            <TextInput
                                style={styles.formInput}
                                placeholder="enter first name..."
                                onChangeText={(firstName) => this.setState({firstName})}
                                value={this.state.firstName}/>
                        </View>

                        <View>
                            <Text> Last name: </Text>
                            <TextInput
                                style={styles.formInput}
                                placeholder="enter Last name ..."
                                onChangeText={(lastName) => this.setState({lastName})}
                                value={this.state.lastName}
                            />
                        </View>

                        <View>
                            <Text>Email:</Text>
                            <TextInput
                                style={styles.formInput}
                                placeholder="enter Email..."
                                onChangeText={(email) => this.setState({email})}
                                value={this.state.email}
                            />

                        </View>

                        <View>
                            <Text>Password:</Text>
                            <TextInput
                                style={styles.formInput}
                                placeholder="choose a password..."
                                onChangeText={(password) => this.setState({password})}
                                value={this.state.password}
                                secureTextEntry={true}
                            />
                        </View>

                        <View>
                            <Text> Confirm Password:</Text>
                            <TextInput
                                style={styles.formInput}
                                placeholder="repeat a choosen pasword..."
                                onChangeText={(confirmPass) => this.setState({confirmPass})}
                                secureTextEntry={true}
                            
                            />

                        </View>

                        <Button
                            title='Sign up'
                            onPress={() => this.signUp() }

                        />

                        

                       
            

                </ScrollView>
                
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
    formTitle:{
        backgroundColor:'',
        paddingTop:30,
        paddingBottom:20,
        fontSize:25
    },
    formItem:{
        

    },

    formLabel:{

    },

    formInput:{
        height: 50,
        padding: 10,
        marginTop: 10,
        marginBottom:10,
        borderWidth:1,

    },

})



export default SingUp;