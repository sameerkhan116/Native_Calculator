import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const baseContainer = {
  alignItems: 'center',
  justifyContent: 'center',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...baseContainer,
    backgroundColor: '#f2f2f2',
  },
  text: {
    fontSize: 30,
  },
  specialContainer: {
    flex: 2,
    backgroundColor: '#9bc23c',
    ...baseContainer,
  },
});

const Button = ({ text, special, onPress }) => (
  <TouchableOpacity
    onPress={() => onPress(text)}
    style={special
    ? styles.specialContainer
    : styles.container}
  >
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
);

export default Button;
