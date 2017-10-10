import React, {PropTypes, Component} from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

class BleView extends Component {
  static displayName = 'BleView';

  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  render() {
    return (
      <View style={styles.container} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
});

export default BleView;
