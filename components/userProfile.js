import 'react-native-gesture-handler';
import React, { Component} from "react";
import { View, Text, StyleSheet, TextInput, Button, Image, Alert } from 'react-native';

import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList } from 'react-native-gesture-handler';
import HomeScreen from "./HomeScreen"

class UserProfile extends Component{
    constructor(props){
        super(props);
        this.state = {
            // first_name: '',
            // last_name: '',
            //get the friend user id 
            userID: props.route.params.userId,
            isLoading:true,
            postList:[],
            newPost:'',
            userDetails:[],
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
        this.getUserDetails();

    }


    //
    getUserDetails = async () => {

        const token = await AsyncStorage.getItem('@session_token');
        const userID = this.state.userID

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
                // set userDetails to responseJson
                userDetails:responseJson,
               })
        })
        .catch((error) => {
            console.log(error);
        })
    }

    // gets all the friend saved posts (display friend posts on theor wall )
    GetSavedPost = async () => {
        const token = await AsyncStorage.getItem('@session_token');
        const userID = this.state.userID;
        console.log(userID)

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
        const userID = this.state.userID;
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

    
    // like a post 
    LikePost = async(post_id) => {
        const userID = this.state.userID;
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


    //delete like  from a  friend's post user liked 
    DeleteLike = async(post_id) => {
        const userID = this.state.userID;
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
                    <View style={styles.welcomeContainer}>
                        <Text style={styles.welcomeText}> Hello! </Text>
                        <Text >
                            Welcome to {this.state.userDetails.first_name}'s page
                        </Text>
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
                    <View style={styles.postTopicContainer}>
                        <Text>
                            POSTS on the Wall : 
                        </Text>
                    </View>

                    <View style={styles.allPostContainer}>
                        {/* display post on friend profile */}
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

                        />
                    </View>

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
    welcomeContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
        margin:30,
    },
    welcomeText:{
        // alignItems: 'center',
        // justifyContent: 'center',
        fontSize:20,

    },
    postInput:{
        height: 50,
        margin: 50,
        marginTop: 20,
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
)
export default UserProfile;
