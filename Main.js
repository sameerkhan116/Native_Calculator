import React, { Component } from 'react';
import { Platform, StyleSheet, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Text } from 'react-native-animatable';

import { enter, pressNum, operation, clear, swap, toggleNegative } from './reducer';
import Button from './Button';

const baseNumber = {
  backgroundColor: '#424242',
  textAlign: 'right',
  padding: 10,
  fontSize: 30,
  fontWeight: 'bold',
  borderColor: '#fff',
};

const styles = StyleSheet.create({
  bottomBorder: {
    borderBottomWidth: 1,
    borderColor: '#fff',
  },
  container: {
    flex: 1,
  },
  top: {
    paddingTop: Platform.OS === 'ios' ? 32 : 20,
    backgroundColor: '#333',
  },
  bottom: {
    flex: 1,
  },
  append: {
    color: '#fff',
    ...baseNumber,
  },
  replace: {
    color: '#2e71e5',
    ...baseNumber,
  },
  push: {
    color: '#9bc23c',
    ...baseNumber,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#fff',
  },
});

class App extends Component {
  render() {
    const {
      calculatorState: { stack, inputState },
      pressNumWithDispatch,
      enterAction,
      operationAction,
      clearAction,
      swapAction,
      toggleNegativeAction,
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <TouchableOpacity style={styles.bottomBorder} onPress={() => toggleNegativeAction(2)}>
            <Text
              numberOfLines={1}
              ref={(ref) => {
                this.text1 = ref;
              }}
              style={styles.append}
            >{'  '}{stack[2] || 0}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomBorder} onPress={() => toggleNegativeAction(1)}>
            <Text
              numberOfLines={1}
              ref={(ref) => {
                this.text2 = ref;
              }}
              style={styles.append}
            >{'  '}{stack[1] || 0}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomBorder} onPress={() => toggleNegativeAction(0)}>
            <Text
              numberOfLines={1}
              ref={(ref) => {
                this.text3 = ref;
              }}
              style={styles[inputState]}
            >{'  '}{stack[0] || 0}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottom}>
          <View style={styles.row}>
            <Button text="clear" onPress={clearAction} />
            <Button text="pow" onPress={operationAction} />
            <Button text="swap" onPress={swapAction} />
            <Button text="/" onPress={operationAction} />
          </View>
          <View style={styles.row}>
            <Button text="9" onPress={pressNumWithDispatch} />
            <Button text="8" onPress={pressNumWithDispatch} />
            <Button text="7" onPress={pressNumWithDispatch} />
            <Button text="*" onPress={operationAction} />
          </View>
          <View style={styles.row}>
            <Button text="6" onPress={pressNumWithDispatch} />
            <Button text="5" onPress={pressNumWithDispatch} />
            <Button text="4" onPress={pressNumWithDispatch} />
            <Button text="-" onPress={operationAction} />
          </View>
          <View style={styles.row}>
            <Button text="3" onPress={pressNumWithDispatch} />
            <Button text="2" onPress={pressNumWithDispatch} />
            <Button text="1" onPress={pressNumWithDispatch} />
            <Button
              text="+"
              onPress={(x) => {
                operationAction(x);
                this.text3.flash(400);
              }}
            />
          </View>
          <View style={styles.row}>
            <Button text="0" onPress={pressNumWithDispatch} />
            <Button text="." onPress={pressNumWithDispatch} />
            <Button text="enter" onPress={enterAction} special />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({ calculatorState: state });
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    pressNumWithDispatch: pressNum,
    enterAction: enter,
    operationAction: operation,
    clearAction: clear,
    swapAction: swap,
    toggleNegativeAction: toggleNegative,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
