/* eslint-disable max-nested-callbacks */
import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import TimerMixin from 'react-timer-mixin';
import reactMixin from 'react-mixin';

const window = Dimensions.get('window');

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> Hello, world</Text>
      </View>
    );
  }
}

reactMixin(App.prototype, TimerMixin);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: window.width,
    height: window.height
  }
});
