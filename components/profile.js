import 'react-native-gesture-handler';
import React, { Component} from "react";
import { View, Text, StyleSheet, TextInput, Button, Image } from 'react-native';

import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList } from 'react-native-gesture-handler';
import HomeScreen from "./HomeScreen"

class profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            // first_name: '',
            // last_name: '',
            isLoading:true,
            postList:[],
            newPost:'',
        }
    }

    postInput = (post) =>{
        this.setState({newPost: post})
        console.log(post)
    }
    

    componentDidMount(){
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
        });
        this.GetSavedPost();        
    }


    //
    GetSavedPost = async () => {
        const token = await AsyncStorage.getItem('@session_token');
        const userID = await AsyncStorage.getItem('@user_id');

        return fetch("http://localhost:3333/api/1.0.0/user/"+userID+"/post", {    
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
                this.setState({
                    isLoading:false,
                    postList: responseJson,
                });
                console.log(responseJson)
            })
            .catch((error) => {
                console.log(error);

            });

    }





    // save writen post in to the database using POST request 

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
            body: JSON.stringify({
                text:this.state.newPost
            })
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
            <ScrollView style={styles.container}>
                <View >
                    <View style={styles.editProfileButton}>
                        <Button
                            color="#841584"
                            title="  Edit "
                            textAlign= 'center'
        
                        />
                        <Button
                            color="#841584"
                            title="Friends"
                            textAlign= 'center'
                            alignItems= 'center'

                        />

                    </View>
                    <View>
                        <TextInput
                            style={styles.postInput}
                            placeholder='post...' 
                            onChangeText={this.postInput}
                            value= {this.state.text}
                            
                        />
                    </View>
                    <View style={{alignSelf:'center'}}>
                        <TouchableOpacity 
                            style={styles.postButton}
                            onPress={() => this.SavePost()}
                            // style={styles.postButton}
                            >
                                <Text> Post </Text>
                        </TouchableOpacity> 
                    </View>    
                    <View>
                        <Text>
                            POSTS on the Wall 
                        </Text>
                    </View>
                    <FlatList
                        data={this.state.postList}
                        renderItem={({item}) => 
                        <Text>{item.text}</Text>
                    }
                   // keyExtractor={({id},index => post_id )}                    

                    />
                    <View>

                    </View>
                </View>
        </ScrollView>
      
        );
    }



}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'antiquewhite',
        // alignItems: 'center',
        // justifyContent: 'center',
        
    },
    postInput:{
        height: 50,
        margin: 50,
        marginTop: 10,
        marginBottom:50,
        borderWidth:1,
        padding:20,

    },

    editProfileButton:{
        flexDirection:'row',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding:50
    },

    postButton:{
        textAlign:  'center',
        // flexDirection: 'row',
        height: 50,
        // elevation: 3,
        backgroundColor:'#841584',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width:100,
    },
    // posButtontDiv:{
    //     margin: 'auto',
    // }


    }
)
export default profile;
