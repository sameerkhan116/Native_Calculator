import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-animatable';

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

class Button extends Component {
  render() {
    const { text, special, onPress } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          this.text.rubberBand(500);
          onPress(text);
        }}
        style={special
        ? styles.specialContainer
        : styles.container}
      >
        <Text
          ref={(ref) => {
          this.text = ref;
        }}
          style={styles.text}
        >{text}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default Button;
