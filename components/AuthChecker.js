import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, Text} from 'react-native';

import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from './HomeScreen';
import SignIn from './SignIn';

class AuthChecker extends Component{

constructor(props){
    super(props);
    
}

componentDidMount(){
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
        this.CheckUserStatus();
    });        
}

CheckUserStatus = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    if(value !== null) {
      this.props.navigation.navigate("Home");
    } else {
        this.props.navigation.navigate("SignIn");
    }
}


render(){
    return(

        <View>
            <Text>
                Loading ...
            </Text>
        </View>

    );
}

}

export default AuthChecker;