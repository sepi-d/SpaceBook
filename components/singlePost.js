import 'react-native-gesture-handler';
import React, { Component} from "react";
import { View, Text, StyleSheet, TextInput, Button, Image, Alert } from 'react-native';

import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList } from 'react-native-gesture-handler';
import HomeScreen from "./HomeScreen"

class SinglePost extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading:true,
            singlePost:[],
            //create a variable for text 
            text: '',
            // get post id from query
            post_id: props.route.params.post_id
            
        }
    }

    // postInput = (post) =>{
    //     this.setState({newPost: post})
    //     console.log(post)
    // }
    

    componentDidMount(){
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
        });
        this.GetSinglePost();        
    }

    textInput = (text) =>{
       this.setState({text: text});
        console.log(text)
    }

    GetSinglePost = async () => {
        const token = await AsyncStorage.getItem('@session_token');
        const userID = await AsyncStorage.getItem('@user_id');
        const postID = this.state.post_id;

        return fetch("http://localhost:3333/api/1.0.0/user/"+userID+"/post/"+postID, {    
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
                    singlePost: responseJson,
                    text: responseJson.text,
                });
                console.log(responseJson)
            })
            .catch((error) => {
                console.log(error);

            });

    }

    // edit a single post using patch request 
    EditPost= async()=> {
        //getting token and userid from async storage
        const postId = this.state.post_id ;
        const token = await AsyncStorage.getItem('@session_token');
        const userID = await AsyncStorage.getItem('@user_id');
        //update only the text of the post 
        this.state.singlePost.text = this.state.text;
        console.log(this.state.singlePost);
        
        return fetch("http://localhost:3333/api/1.0.0/user/"+userID+"/post/"+postId, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization':  token

            },
            body: JSON.stringify(this.state.singlePost)
        })
        .then((response) => {
            if(response.status === 200){
                return;
            }else if(response.status === 400){
                throw 'Bad request';
            }
            else if(response.status === 401){
                throw 'Unauthorised';
            }else if(response.status === 403){
                throw 'Forbiden-you can only update your own post';
            }else if(response.status === 404){
                throw 'Not Found';
            }else if(response.status === 500){
                throw 'Server Error';
            }else{
                throw 'Something went wrong';
            }
        })
        .then((responseJson) => {
            // test 
               console.log("post updated.");
            // navigate user to the homescreen
            this.props.navigation.navigate("profile");
        
        })
        .catch((error) => {
        //    console.log(JSON.stringify(this.state));
            console.log(error);
        })
    }
        render(){
            return(
                <View>
                        {/* <View>
                            <Text> {this.state.singlePost.text} </Text>
                        </View> */}

                        <View>
                        <TextInput
                            // style={styles.formInput}
                            placeholder="Post ..."
                            onChangeText={this.textInput }
                            value={this.state.text}
                        />
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={()=> this.EditPost()}
                            >
                                <Text> Update post </Text>
                            </TouchableOpacity>
                        </View>

                    </View>


    );

}
}
const styles = StyleSheet.create({
    // hline: {
    //     backgroundColor: '#808080',
    //     height: 2,
    //     width: 200,
    //     marginTop: 20,
    //     marginBottom: 20,
    //   },
});
export default SinglePost;