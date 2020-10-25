import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {HeaderIconButton} from '../components/HeaderIconButton';
import {AuthContext} from '../contexts/AuthContext';
import {UserContext} from '../contexts/UserContext';

import StackCardList from 'react-native-notification-stack-card';


export function HomeScreen({navigation}) {
  const {logout} = React.useContext(AuthContext);
  const user = React.useContext(UserContext);
  React.useEffect(() => {
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
  }, [navigation, logout]);

  data = ["mohssine", "hajar"]

  return (
    <View style={styles.container}>
      <Text>Welcome to the products list</Text>
      <Text>{user.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
