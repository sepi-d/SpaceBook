import React, { Component} from "react";
import { View, Text, StyleSheet, TextInput, FlatList} from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
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
        // this._unsubscribe = this.props.navigation.addListener('focus', () => {
        // });
        this.GetFriends();        
    }

    // Get list of friends from API
    GetFriends = async () => {
        // getting userid and token from AsyncStorage
        const token = await AsyncStorage.getItem('@session_token');
        const userID = await AsyncStorage.getItem('@user_id');

        return fetch("http://localhost:3333/api/1.0.0/user/"+userID+"/friends", {    
            headers: {
                'X-Authorization':  token
                }
            })
            .then((response) => {
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
                    //set is Loading to false
                    // set friendList to responseJson
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
           <View style={styles.container}>
    
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.buttons}
                        onPress={() => nav.navigate('FriendRequests')}
                    >
                        <Text style={styles.buttonText}>
                            Pending Friend Requests
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.friendsContainer}>
                    <Text style={styles.friendsTopicText}>List of friends : </Text>
                </View>

                <View>
                    <FlatList
                    keyExtractor={(item, index) => index}
                    data={this.state.friendList}
                    renderItem={({item}) =>
                    <View style={styles.friendsListContainer}>
                        <Text> {item.user_givenname} {item.user_familyname} ({item.user_email}) </Text>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.buttons}
                                // go to friend profile with friend given id
                                onPress={() => nav.navigate('FriendProfile', {userId: item.user_id})}
                            >
                                <Text style={styles.buttonText}>
                                    View Profile
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    }
                    />
                    </View>
            </View>

            


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

    friendsContainer:{
        marginTop: 20,
        marginBottom:20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',
        // flex:1,
    },
    friendsTopicText:{
        fontSize:30,
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

export default Friends; 