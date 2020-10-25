import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export function IconButton({name, style, onPress}) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <AntDesign name={name} size={24} color="purple" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
});
