import React, {Component} from 'react';
import { Image,TouchableOpacity,TextInput,StyleSheet, Text, View, ImageBackground } from 'react-native';

import bgImage from '../images/login_interface.jpg'

export default class Login extends Component {
  render(){
    return (

      <ImageBackground source={bgImage} style={styles.backgroundContainer}>   
        <View style={styles.container}>
            <Image style={{width:140, height:70}} source={require('../images/logo.png')}/>

            <Text style={styles.logoText}>Welcome</Text>
            <TextInput style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' 
            placeholder="Email" placeholderTextColor="#ffffff"/>

            <TextInput style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' 
            placeholder="Password"
            secureTextEntry={true} 
            placeholderTextColor="#ffffff"/>
          
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <View style={styles.signupTextCont}>
              <Text style={styles.signupText}> Don't have an account yet?</Text>
              <Text style={styles.signupButton}>Signup</Text>
            </View>

          </View> 
      </ImageBackground> 
    )
  }   
}
  

const styles = StyleSheet.create({
    backgroundContainer: {
    flexGrow: 1,
    width: null,
    height: null,
    alignItems: 'center',
    justifyContent: 'center'
  },

  container : {
    flexGrow:1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  logoText :{
    marginVertical:15,
    fontSize:18,
    color:'rgba(255, 255,255,0.7)'
  },

  inputBox:{
    width:300,
    backgroundColor:'rgba(255, 255,255,0.3)',
    borderRadius:25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#ffffff',
    marginVertical:10,
    
  },

  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  },

  button :{
    width:300,
    backgroundColor:'rgba(255, 255,255,0.3)',
    borderRadius:25,
    paddingVertical:13,
    marginVertical:10
  },
  signupTextCont: {
    flexGrow:0.2,
    alignItems:'flex-end',
    justifyContent:'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  signupText:{
    color:'rgba(255,255,255,0.6)',
    fontSize:16
  },
  signupButton:{
    color:'#ffffff',
    fontSize:16,
    fontWeight:'500'
  }


});
