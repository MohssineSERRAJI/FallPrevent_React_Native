import React, {Component} from 'react';
import { Image,TouchableOpacity,TextInput,StyleSheet, Text, View, ImageBackground } from 'react-native';

import Login from './src/Login'

export default class App extends Component {
  render(){
    return (

      <View  style={styles.container}>
        <Login />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flexGrow: 1,
  }

});