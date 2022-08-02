import 'react-native-gesture-handler';
import React, { Component} from "react";
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity} from 'react-native';


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
        //const searchUser = this.state.searchUser;

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
        console.log(userID);

        const userID = await AsyncStorage.getItem('@user_id');
        const token = await AsyncStorage.getItem('@session_token');

        console.log(token);

        return fetch("http://localhost:3333/api/friendrequests/"+user_id, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization':  token
            },
            body: JSON.stringify({
                user_id: this.state.acceptRequest
            })
        })
        .then((response) => {
            if(response.status === 200){
                return response.json()
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



     //RejectFriendRequest()

     



    render(){
        return(
            <View>
                <View>
                <Text>Friend Requests Lists</Text>

                </View>

                <FlatList
                    data = { this.state.friendRequestsList}
                    renderItem={({item}) =>
                    <View> 
                    <Text>
                        {item.user_givenname} {item.user_familyname} 
                    </Text>
                    <TouchableOpacity
                    onPress={() => this.AcceptFriendRequest(item.user_id)}
                    >
                        <Text>

                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text>

                        </Text>
                    </TouchableOpacity>
                    </View>
                    }
                />  
                {/* flat lists ends */}
            </View>

        );

    }
}
export default FriendRequests; 