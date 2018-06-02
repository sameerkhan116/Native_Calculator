import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { enter, pressNum, operation, clear, swap, toggleNegative } from './reducer';
import Button from './Button';

const baseNumber = {
  backgroundColor: '#424242',
  textAlign: 'right',
  padding: 10,
  fontSize: 30,
  fontWeight: 'bold',
  borderBottomWidth: 1,
  borderColor: '#fff',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    paddingTop: 20,
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
  },
});

const App = ({
  calculatorState: { stack, inputState },
  pressNumWithDispatch,
  enterAction,
  operationAction,
  clearAction,
  swapAction,
  toggleNegativeAction,
}) => (
  <View style={styles.container}>
    <View style={styles.top}>
      <TouchableOpacity onPress={() => toggleNegativeAction(2)}>
        <Text style={styles.append}>{stack[2] || 0}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => toggleNegativeAction(1)}>
        <Text style={styles.append}>{stack[1] || 0}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => toggleNegativeAction(0)}>
        <Text style={styles[inputState]}>{stack[0] || 0}</Text>
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
        <Button text="+" onPress={operationAction} />
      </View>
      <View style={styles.row}>
        <Button text="0" onPress={pressNumWithDispatch} />
        <Button text="." onPress={pressNumWithDispatch} />
        <Button text="enter" onPress={enterAction} special />
      </View>
    </View>
  </View>
);

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
