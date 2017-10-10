import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Dimensions,
  View
} from 'react-native';
import PhotoView from 'react-native-photo-view';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class WDPhotoView extends Component {
  static displayName = 'WDPhotoView';

  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  render() {
    const {source} = this.props;

    return (
      <View style={styles.container} >
        <PhotoView
          source={source}
          minimumZoomScale={1}
          maximumZoomScale={4}
          androidScaleType='center'
          onLoad={() => console.log('Image loaded!')}
          style={{width: deviceWidth, height: deviceHeight}} />
      </View>
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

export default WDPhotoView;
