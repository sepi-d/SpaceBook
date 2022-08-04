import 'react-native-gesture-handler';
import React, { Component} from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';


import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from 'react-native-gesture-handler';

class FriendRequests extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoading:true,
            friendRequestsList:[],
            acceptRequest:'',


        }
    }
    


    componentDidMount(){
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
        });
        this.GetAllFriendRequests();        
    }

// (Get request) to get all the friend requests pending 

    GetAllFriendRequests = async () => {
        const token = await AsyncStorage.getItem('@session_token');
        const userID = await AsyncStorage.getItem('@user_id');
        return fetch("http://localhost:3333/api/1.0.0/friendrequests", {    
            headers: {
                'X-Authorization':  token
            }
            })
            .then((response) => {
                // console.log(response.json());
                 if(response.status === 200){
                     return response.json();
     
                 }else if(response.status === 401){
                    throw 'Unauthorised';
                 }else if(response.status === 500){
                    throw 'Server Error';
                 }
                 else{
                     throw 'Something went wrong';
                 }
             })
            .then((responseJson) => {
                this.setState({
                    isLoading:false,
                    friendRequestsList: responseJson,
                });
                console.log(responseJson)
            })
            .catch((error) => {
                console.log(error);
            });
        }

     // accept friend requests
    
     AcceptFriendRequest = async(user_id) => {
        // console.log(user_id);

        // const userID = await AsyncStorage.getItem('@user_id');
        const token = await AsyncStorage.getItem('@session_token');

        console.log(token);

        return fetch("http://localhost:3333/api/1.0.0/friendrequests/"+user_id, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization':  token
            },
        })
        .then((response) => {
            if(response.status === 200){
                // update requests lists
                this.GetAllFriendRequests();
                return;
            }else if(response.status === 401){
                throw 'Unauthorised';
            }else if(response.status === 404){
                throw '	NotFound';
            }else if(response.status === 500){
                throw 'Server Error';
            }else{
                throw ' something went wrong';
            }
        })
        .then((responseJson) => {
               console.log("post friend added ", responseJson);
            //    this.props.navigation.navigate("Home");
        })
        .catch((error) => {
            console.log(error);
        })
    }



     RejectFriendRequest = async(user_id) =>{
        //user token
        const token = await AsyncStorage.getItem('@session_token');
        return fetch("http://localhost:3333/api/1.0.0/friendrequests/"+user_id, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization':  token
            },
        })
        .then((response) => {
            if(response.status === 200){
                // update requests lists
                this.GetAllFriendRequests();
                return; // nav to friend page 
            }else if(response.status === 401){
                throw 'Unauthorised';
            }else if(response.status === 404){
                throw '	NotFound';
            }else if(response.status === 500){
                throw 'Server Error';
            }else{
                throw ' something went wrong';
            }
        })
        .then((responseJson) => {
               console.log("delete(friend request rejected) ", responseJson);
            //    this.props.navigation.navigate("Home");
        })
        .catch((error) => {
            console.log(error);
        })
    }



    render(){
        return(
            <ScrollView style={styles.container}>
                <View> 
                    <View style={styles.friendreqContainer}>
                        <Text style={styles.friendReqTopicText}>Friend Requests Lists : </Text>
                    </View>
                    <View>
                        <FlatList
                            keyExtractor={(item, index) => index}   
                            data = { this.state.friendRequestsList}
                            renderItem={({item}) =>
                            <View style={styles.friendsListContainer}> 
                                <Text> 
                                    {/* {item.first_name} {item.last_name} {item.user_id} */}
                                    {item.first_name +' '+ item.last_name +' ('+ item.email +')'} 
                                </Text>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        style={styles.buttons}
                                        onPress={() => this.AcceptFriendRequest(item.user_id)}
                                    >
                                        <Text styles={styles.buttonText}>
                                            Accept
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.buttons}
                                        onPress={() => this.RejectFriendRequest(item.user_id)}
                                    >
                                        <Text styles={styles.buttonText}>
                                            Reject
                                        </Text>
                                    </TouchableOpacity> 
                                </View>
                            </View>
                            }
                            //renderItem ends
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

    buttonContainer:{
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',


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
    },

    friendreqContainer:{
        marginTop: 20,
        marginBottom:20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',
        // flex:1,
    },
    friendReqTopicText:{
        fontSize:20,
    },

    friendsListContainer:{
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        // flexDirection:'row',
        flex:1,
        marginLeft:20,

    },

    
    });
export default FriendRequests; 