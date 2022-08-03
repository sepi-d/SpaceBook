import React, { Component} from "react";
import { View, Text, StyleSheet, TextInput, FlatList} from 'react-native';
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

class Friends extends Component{
    constructor(props){
        super(props);
        this.state={

            isLoading:true,
            friendList:[],

        }

    }

    componentDidMount(){
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
        });
        this.GetFriends();        
    }

    GetFriends = async () => {
        const token = await AsyncStorage.getItem('@session_token');
        const userID = await AsyncStorage.getItem('@user_id');
        //const searchUser = this.state.searchUser;

        return fetch("http://localhost:3333/api/1.0.0/user/"+userID+"/friends", {    
            headers: {
                'X-Authorization':  token
                }
            })

            .then((response) => {
                // console.log(response.json());
                 if(response.status === 200){
                     return response.json();
     
                 }else if(response.status === 400){
                     throw 'Bad ';
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
                    friendList: responseJson,
                });
                console.log(responseJson)
            })
            .catch((error) => {
                console.log(error);

            });

    }
    
    render(){
        const nav = this.props.navigation;

        return(
           <View>
            <View>
                <TouchableOpacity
                    onPress={() => nav.navigate('FriendRequests')}
                >
                    <Text>
                         Pending Friend Requests
                    </Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text>List of friends : </Text>
            </View>
           
            <FlatList
            keyExtractor={(item, index) => index}
            data={this.state.friendList}
            renderItem={({item}) =>
            <View>
                <Text> {item.user_givenname} {item.user_familyname} ({item.user_email}) </Text>
                {/* <TouchableOpacity>
                    <Text>
                        Add to Friends
                    </Text>
                </TouchableOpacity> */}
            </View>
            }
            />
            </View>

            


        );
    }
}

export default Friends; 