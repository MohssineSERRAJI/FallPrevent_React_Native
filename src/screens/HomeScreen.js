import React from 'react';
import {View, StyleSheet, Text, Alert } from 'react-native';
import {HeaderIconButton} from '../components/HeaderIconButton';
import {Loading} from '../components/Loading';
import {AuthContext} from '../contexts/AuthContext';
import {UserContext} from '../contexts/UserContext';

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";


export function HomeScreen({navigation}) {
  const {logout, notifications} = React.useContext(AuthContext);
  const state = React.useContext(UserContext);


  React.useEffect(() => {
    notifications(state.user.email)
    navigation.setOptions({
      headerRight: () => (
        <HeaderIconButton
          name={'logout'}
          onPress={() => {
            logout();
          }}
        />
      ), 
    });
    notifications(state.user.email);
    console.log(state);
  }, [navigation, logout]);


  if(state.loadingNotis){
    
    return (
      <View style={styles.container}>
        <Home taskList = {state.notifications.list} username={state.user.name}/>
      </View>
    );
  }
  else{
    const list = [];
    return (
      <View style={styles.container}>
        <Home taskList = {list} username={state.user.name}/>
        <Loading loading={true} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const colors = {
  themeColor: "purple",
  white: "#fff",
  background: "#f4f6fc",
  greyish: "#a4a4a4",
  tint: "#431c53"
};


const width_proportion = '92%';

const Task = ({ task, icon, stamp, id }) => {

  const myAlert = () => {
    Alert.alert(
      "Warning",
      "Are you sure to delete this notification",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK" }
      ],
      { cancelable: false }
    );
  }

  return (
    <View
      style={{
        backgroundColor: colors.white,
        flexDirection: "row",
        marginHorizontal: 14,
        marginVertical: 4,
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 24,
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <MaterialCommunityIcons
          name={icon}
          size={30}
          style={{ color: "purple", marginRight: 5}}
        />
        <View style={{ width: width_proportion }}>
          <Text style={{ fontSize: 17, marginBottom: 5 }}>{task}</Text>
          <Text style={{ color: colors.greyish }}>{stamp}</Text>
        </View>
      </View>

      <View style={{ flexDirection: "row" }}>
        <MaterialCommunityIcons
          name="trash-can"
          size={30}
          style={{ color: "purple", marginLeft: 5 }}
          onPress= {() => myAlert()}
        />
      </View>
    </View>
  );
};


export default function Home({taskList ,username}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.themeColor
      }}
    >
      <View style={{ backgroundColor: colors.themeColor }}>
        <View style={{ padding: 16 }}>
          <Text style={{ color: colors.white, fontSize: 30 }}>
            {"Hello, " +username}
          </Text>
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 6,
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: colors.tint,
              borderRadius: 20,
              marginVertical: 20,
              alignItems: "center"
            }}
          >
            <MaterialCommunityIcons
              name="magnify" //
              size={30}
              style={{ color: colors.white }}
            />
          </View>
        </View>
      </View>


      <View
        style={{
          padding: 20,
          flexDirection: "row",
          backgroundColor: colors.background,
          justifyContent: "space-between",
          alignItems: "center",
          borderTopLeftRadius: 20
        }}
      >
        <Text style={{ fontSize: 24 }}>Notifications</Text>
      </View>

      <ScrollView
        style={{
          backgroundColor: colors.background
        }}
      >
        {taskList.map(task => (
          <Task
            task={task.message}
            stamp={task.date}
            id = {task.id}
          />
        ))}
      </ScrollView>


    </View>
  );
}