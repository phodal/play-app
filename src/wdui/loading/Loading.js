import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ActivityIndicator} from 'react-native';

const Loading = ({text, transparent}) => (
  <View
    style={[
      transparent && {backgroundColor: 'rgba(255,255,255,0.75)'}
    ]}
  >
    <ActivityIndicator
      animating
      size={'large'}
      color={transparent ? '#000' : '#AAA'}
    />

    {!!text && <Text>{text}</Text>}
  </View>
);

Loading.propTypes = {text: PropTypes.string, transparent: PropTypes.bool};
Loading.defaultProps = {text: null, transparent: false};
Loading.componentName = 'Loading';

export default Loading;
