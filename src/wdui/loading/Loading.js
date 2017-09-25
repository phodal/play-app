import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-native-spinkit';
import {
  View,
  Text,
  Platform,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  spinner: {
    marginBottom: 50
  }
});

const Loading = ({text}) => (
  <View style={styles.container}>
    <Spinner style={styles.spinner}
             size={24}
             type={Platform.OS === 'ios' ? 'FadingCircle' : 'FadingCircleAlt'}
             color={'#000'}/>
    {!!text && <Text>{text}</Text>}
  </View>
);

Loading.propTypes = {text: PropTypes.string, transparent: PropTypes.bool};
Loading.defaultProps = {text: null, transparent: false};
Loading.componentName = 'Loading';

export default Loading;
