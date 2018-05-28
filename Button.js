import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const baseContainer = {
  alignItems: 'center',
  justifyContent: 'center',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...baseContainer,
    backgroundColor: '#fafafa',
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

const Button = ({ text, special }) => (
  <View style={special
    ? styles.specialContainer
    : styles.container}
  >
    <Text style={styles.text}>{text}</Text>
  </View>
);

export default Button;
