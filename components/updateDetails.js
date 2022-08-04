import React, { Component} from "react";
import { View, Text, StyleSheet, TextInput, ScrollView} from 'react-native';
import { Button } from "react-native-web";
import AsyncStorage from "@react-native-async-storage/async-storage";

class UpdateDetails extends Component{
    constructor(props){

        super(props);

        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            // edit_firstName:'',
            // edit_lastName:'',
            // edit_email:'',
            // edit_password:'',

        }
    }


    componentDidMount(){
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getDetails();
        });        
    }

    getDetails = async () => {

        //getting token and userid from async storage
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
        
                // error displaying using the .yml file 
            }else if(response.status === 400){
                throw 'Failed validation';
            }else{
                throw 'Something went wrong';
            }
        })
        .then((responseJson) => {
            console.log(responseJson);
               this.setState({
                //set all the states to the response from json
                first_name: responseJson.first_name,
                last_name: responseJson.last_name,
                email: responseJson.email,
               })
        })
        .catch((error) => {
            console.log(error);
        })
    }

    // edit user profile using a patch request and user_id
    EditProfile= async()=> {
        //getting token and userid from async storage
        const token = await AsyncStorage.getItem('@session_token');
        const userID = await AsyncStorage.getItem('@user_id');
        
        return fetch("http://localhost:3333/api/1.0.0/user/"+userID, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization':  token

            },
            body: JSON.stringify(this.state)
        })
        .then((response) => {
            if(response.status === 200){
                return;
            }else if(response.status === 400){
                throw 'Bad request';
            }
            else if(response.status === 401){
                throw 'Unauthorised';
            }else if(response.status === 403){
                throw 'Forbiden';
            }else if(response.status === 404){
                throw 'Not Found';
            }else if(response.status === 500){
                throw 'Server Error';
            }else{
                throw 'Something went wrong';
            }
        })
        .then((responseJson) => {
            // test 
               console.log("User details updated  ", responseJson);
            // navigate user to the homescreen
               this.props.navigation.navigate("Home");
        })
        .catch((error) => {
            console.log(JSON.stringify(this.state));
            console.log(error);
        })
    }

    render(){

        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.formTitle}>Edit your details:</Text>
                        <View>
                            <Text> First name: </Text>
                            <TextInput
                                style={styles.formInput}
                                placeholder="enter first name..."
                                onChangeText={(first_name) => this.setState({first_name})}
                                value={this.state.first_name}/>
                        </View>

                        <View>
                            <Text> Last name: </Text>
                            <TextInput
                                style={styles.formInput}
                                placeholder="enter Last name ..."
                                onChangeText={(last_name) => this.setState({last_name})}
                                value={this.state.last_name}
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

                        <Button
                            title='Update'
                            onPress={() =>this.EditProfile() }

                        />

                        

                       
            

                </ScrollView>
                
            </View>

            

            
        );
    }
    }

// style 
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







export default UpdateDetails;