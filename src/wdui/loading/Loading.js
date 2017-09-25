import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-native-spinkit';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    marginBottom: 50
  },
  btn: {
    marginTop: 20
  },
  text: {
    color: 'white'
  }
});

const Loading = ({text}) => (
  <View style={styles.container}>
    <Spinner style={styles.spinner} size={20} type={'Circle'} color={'#000'}/>
    {!!text && <Text>{text}</Text>}
  </View>
);

Loading.propTypes = {text: PropTypes.string, transparent: PropTypes.bool};
Loading.defaultProps = {text: null, transparent: false};
Loading.componentName = 'Loading';

export default Loading;
