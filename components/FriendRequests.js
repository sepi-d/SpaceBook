import 'react-native-gesture-handler';
import React, { Component} from "react";
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, SectionList} from 'react-native';


import AsyncStorage from "@react-native-async-storage/async-storage";

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
            <View>
                <View>
                <Text>Friend Requests Lists : </Text>

                </View>

                <FlatList
                    keyExtractor={(item, index) => index}   
                    data = { this.state.friendRequestsList}
                    renderItem={({item}) =>
                    <View> 
                    <Text>
                        {item.first_name} {item.last_name} {item.user_id}
                        {/* {item.first_name +' '+ item.last_name +' ('+ item.email +')'}  */}
                    </Text>
                    <TouchableOpacity
                        onPress={() => this.AcceptFriendRequest(item.user_id)}
                    >
                        <Text>
                            Accept
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.RejectFriendRequest(item.user_id)}
                    >
                        <Text>
                            Reject
                        </Text>
                    </TouchableOpacity>
                    </View>
                    }
                    //renderItem ends
                />   


        

                
            </View>

        );

    }
}
export default FriendRequests; 