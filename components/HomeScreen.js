import React, { Component} from "react";
import { View, Text, StyleSheet, TextInput, ScrollView} from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";

class HomeScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            
        }
    }

    render(){
        return(
            <View>
                <Text>
                    Hello
                </Text>
            </View>
        );
    }
}

export default HomeScreen;