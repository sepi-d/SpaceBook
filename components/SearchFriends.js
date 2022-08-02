import React, { Component} from "react";
import { View, Text, StyleSheet, TextInput, FlatList} from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";

import AsyncStorage from "@react-native-async-storage/async-storage";

class SearchFriends extends Component{
    constructor(props){
        super(props);
        this.state={
            searchUser:'',
            isLoading:true,
            searchedUserList:[],
        }

    }


    searchInput = (text) =>{
        this.setState({searchUser: text})
        console.log(text)
    }

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
                onPress={() => this.GetUser()}
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
                        </View>
                                 

                    }
                        keyExtractor={item => item.user_id}           
                    />

            </View>
            


        );
    }





}

export default SearchFriends; 