import React, { Component} from "react";
import { View, Text, StyleSheet, TextInput, FlatList} from 'react-native';
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

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
           <ScrollView style={styles.container}>

                <View style={styles.searchContainer}>
                    <Text style={styles.searchTopicText}>
                        to search for user please enter name or lastname :
                    </Text>
                    
                </View>
                <View style={styles.searchtInput}>
                    <TextInput
                        // style={styles.postInput}
                        placeholder='Seaech User'
                        onChangeText={this.searchInput}
                        value= {this.state.searchUser}
                    />
                    </View>

                <View style={styles.postButton}>
                    <TouchableOpacity
                        onPress={() => this.GetUser()}
                        >
                            <Text style={styles.buttonText}>
                                Search
                            </Text>
                    </TouchableOpacity> 
                </View>
             
                <View >
                    {/* flatlist to display the search results */}
                    <FlatList
                            keyExtractor={item => item.user_id}  
                            data={this.state.searchedUserList}
                            renderItem={({item}) => 
                            <View style={styles.searchListContainer}>
                                <Text> {item.user_givenname} {item.user_familyname} ({item.user_email}) </Text>
                                 <View style={styles.buttonContainer}> 
                                    <TouchableOpacity
                                        style={styles.buttons}
                                        onPress={() => this.SendFriendRequests(item.user_id)}
                                        >
                                        <Text style={styles.buttonText}>
                                            Add to Friends
                                        </Text>
                                     </TouchableOpacity>
                                </View>
                            </View>       
                        }    
                        />
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
    searchtInput:{
        margin: 20,
        borderWidth:1,
        padding:5,
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
        width:100,
        margin:20,
    },
    // posButtontDiv:{
    //     margin: 'auto',
    // }    

    buttonContainer:{
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
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

    searchContainer:{
        marginBottom:20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',
        // flex:1,
        margin:20,
    },
    searchTopicText:{
        fontSize:20,
    },

    searchListContainer:{
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        // flexDirection:'row',
        flex:1,
        marginLeft:20,

    },
    
    });

export default SearchUsers; 