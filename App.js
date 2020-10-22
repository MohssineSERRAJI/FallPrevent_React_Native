import React, {Component} from 'react';
import { Image,TouchableOpacity,TextInput,StyleSheet, Text, View, ImageBackground } from 'react-native';

import bgImage from './images/login_interface.jpg'
import Login from './src/Login'

export default class App extends Component {
  render(){
    return (

      <View>
        <Login />
      </View>
    )
  }
}