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
                <TouchableOpacity
                    // go to friend profile with friend given id
                    onPress={() => nav.navigate('FriendProfile', {userId: item.user_id})}
                >
                    <Text>
                        View Profile
                    </Text>
                </TouchableOpacity>
            </View>
            }
            />
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

    friendTitle:{

    },


    
    });

export default Friends; 