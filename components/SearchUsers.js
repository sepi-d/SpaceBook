import React, { Component} from "react";
import { View, Text, StyleSheet, TextInput, FlatList} from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";

import AsyncStorage from "@react-native-async-storage/async-storage";

class SearchUsers extends Component{
    constructor(props){
        super(props);
        this.state={
            searchUser:'',
            isLoading:true,
            searchedUserList:[],
            userID:'',
            sendFriendRequest:[],
        }

    }


    searchInput = (text) =>{
        this.setState({searchUser: text})
        console.log(text)
    }


    // search fo users 
    GetUser = async () => {
        const token = await AsyncStorage.getItem('@session_token');
        const userID = await AsyncStorage.getItem('@user_id');
        const searchUser = this.state.searchUser;

        return fetch("http://localhost:3333/api/1.0.0/search?q="+searchUser+"&search_in=all&limit=20", {    
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
                    searchedUserList: responseJson,
                });
                console.log(responseJson)
            })
            .catch((error) => {
                console.log(error);

            });

    }

    // (post request) to send a friend request based on spesific user id

    SendFriendRequests = async(user_id) => {
        console.log(userID);

        const userID = await AsyncStorage.getItem('@user_id');
        const token = await AsyncStorage.getItem('@session_token');
        console.log(token);

        return fetch("http://localhost:3333/api/1.0.0/user/"+user_id+"/friends", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization':  token
            },
            body: JSON.stringify({
                user_id: this.state.sendFriendRequest

            })
        })
        .then((response) => {
            if(response.status === 200){
                return response.json()
            }else if(response.status === 401){
                throw 'Unauthorised';
            }else if(response.status === 403){
                throw '	User is already added as a friend';
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
               console.log("post friend friend request sent ", responseJson);
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
                    <Text>
                        to search for user please enter name or lastname :
                    </Text>
                    <TextInput
                        // style={styles.postInput}
                        placeholder='Seaech User'
                        onChangeText={this.searchInput}
                        value= {this.state.searchUser}
                        
                    />
                </View>
                <TouchableOpacity
                onPress={
                    () => this.GetUser()}
                >
                    <Text>
                        Search
                    </Text>


                </TouchableOpacity>
                

                
                <FlatList
                        data={this.state.searchedUserList}
                        renderItem={({item}) => 
                        <View>
                        <Text> {item.user_givenname} {item.user_familyname} ({item.user_email}) </Text>
                        <TouchableOpacity
                        onPress={() => this.SendFriendRequests(item.user_id)}
                        // value={this.setState.userID}
                        >
                            <Text>
                                Add to Friends
                            </Text>
                        </TouchableOpacity>
                        </View>
                                 

                    }
                        keyExtractor={item => item.user_id}           
                    />

            </View>
            


        );
    }





}

export default SearchUsers; 