import 'react-native-gesture-handler';
import React, { Component} from "react";
import { View, Text, StyleSheet, TextInput, Button, Image, Alert } from 'react-native';

import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList } from 'react-native-gesture-handler';
import HomeScreen from "./HomeScreen"

class Profile extends Component{
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
        // this._unsubscribe = this.props.navigation.addListener('focus', () => {
        // });
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
                this.GetSavedPost();
                return ;
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
               console.log("post added ");
               return;
               //this.props.navigation.navigate("Home");
        })
        .catch((error) => {
            console.log(error);
        })
    }

    // Delete saved posts 

    DeletePost = async(post_id) => {
        const userID = await AsyncStorage.getItem('@user_id');
        const token = await AsyncStorage.getItem('@session_token');

        return fetch("http://localhost:3333/api/1.0.0/user/"+userID+"/post/"+post_id, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization':  token
            },
        })
        .then((response) => {
            if(response.status === 200){
                this.GetSavedPost();
                return ;
            }else if(response.status === 401){
                throw 'Unauthorised';
            }else if(response.status === 403)
            {
                throw 'Forbidden - you can only delete your own posts';

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
               console.log("post deleted ", responseJson);
               //this.props.navigation.navigate("Home");
        })
        .catch((error) => {
            console.log(error);
        })
    }

    // like a single post using post id and user id 
    LikePost = async(post_id) => {
        const userID = await AsyncStorage.getItem('@user_id');
        const token = await AsyncStorage.getItem('@session_token');

        return fetch("http://localhost:3333/api/1.0.0/user/"+userID+"/post/"+post_id+"/like", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization':  token
            },
        })
        .then((response) => {
           
            if(response.status === 200){
                this.GetSavedPost();
                return ;
            }else if(response.status === 401){
                throw 'Unauthorised';
            }else if(response.status === 403)
            {
                Alert.alert("Can only unlike the posts of your friends");
                throw 'Forbidden - you already liked this post';

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
               console.log("post liked ", responseJson);
               //this.props.navigation.navigate("Home");
               Alert.alert("Thank you! post liked ");
        })
        .catch((error) => {
            console.log(error);
        })
    }       


    //delete like 
    DeleteLike = async(post_id) => {
        const userID = await AsyncStorage.getItem('@user_id');
        const token = await AsyncStorage.getItem('@session_token');

        return fetch("http://localhost:3333/api/1.0.0/user/"+userID+"/post/"+post_id+"/like", {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization':  token
            },
        })
        .then((response) => {
            if(response.status === 200){
                this.GetSavedPost();
                return ;
            }else if(response.status === 401){
               
                throw 'Unauthorised';
            }else if(response.status === 403)
            {   
                
                throw 'Forbidden - you already liked this post';

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
               console.log("post unlike ", responseJson);
               Alert.alert("Thank you! post Unliked ");
               //this.props.navigation.navigate("Home");
        })
        .catch((error) => {
            console.log(error);
        })
    }    




    render(){
        return(
            <ScrollView style={styles.container}>
                <View >
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
                                <Text style={styles.buttonText}> Post </Text>
                        </TouchableOpacity> 
                    </View>    
                    <View style={styles.postTopicContainer}>
                        <Text>
                            Posts on your wall : 
                        </Text>
                    </View>

                    <View style={styles.allPostContainer}>
                        <FlatList
                            keyExtractor={(item, index) => index}   
                            data={this.state.postList}
                            renderItem={({item}) => 
                            <View style={styles.postListContainer}>
                                <View> 
                                    <Text>{item.text}</Text>
                                </View>
                                <View style={styles.buttonContainer}>
                                   
                                <TouchableOpacity
                                    // navigate to singlePost component
                                    style={styles.buttons}
                                    onPress={()=> this.props.navigation.navigate("singlePost", {post_id: item.post_id})}
                                >
                                    <Text style={styles.buttonText}> View Post </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.buttons}
                                    onPress={()=>this.DeletePost(item.post_id)}
                                >
                                    <Text style={styles.buttonText}> Delete  </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.buttons}
                                    onPress={()=>this.LikePost(item.post_id)}
                                >
                                    <Text style={styles.buttonText}> Like {item.numLikes}  </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                     style={styles.buttons}
                                    onPress={()=>this.DeleteLike(item.post_id)}
                                >
                                    <Text style={styles.buttonText}> Delete Like </Text>
                                </TouchableOpacity>
                                </View>
                                
                            </View>
                        }
                        // keyExtractor={({id},index => post_id )}                    

                        />
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
        marginTop: 100,
        marginBottom:50,
        borderWidth:1,
        padding:20,


    },
    // editProfileButton:{
    //     flexDirection:'row',
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     padding:50
    // },

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
        width:100,
        margin:20,
    },
    // posButtontDiv:{
    //     margin: 'auto',
    // }    

    allPostContainer:{
        marginBottom:100,
        marginRight:20,
        margin:10,

    },
    postTopicContainer:{
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',
        flex:1,
    },
    postTopicText:{
        fontSize:30,
    },

    postListContainer:{
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        // flexDirection:'row',
        flex:1,
        marginLeft:20,

    },

    buttonContainer:{
        flexDirection:'row',
        flex:1,

    },
    buttons:{
        textAlign:  'center',
        // flexDirection: 'row',
        padding: 5,
        // elevation: 3,
        backgroundColor:'#841584',
        alignItems: 'center',
        // justifyContent: 'center',
        elevation: 8,
        borderRadius: 10,
        // width:100,
        margin:10,
    },
    
    buttonText:{
        color:"white",
    }


    
    }
);
export default Profile;
